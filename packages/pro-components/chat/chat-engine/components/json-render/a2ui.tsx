/* eslint-disable no-console, vue/one-component-per-file */
import { defineComponent, h, onBeforeUnmount, ref, shallowRef, watch, type PropType, type Ref } from 'vue';
import {
  applyA2UIUpdates,
  convertA2UIMessagesToJsonRender,
  extractSurfaceId,
  groupMessagesBySurface,
  surfaceStateManager,
  type A2UIMessage,
  type JsonRenderSchema,
} from '@tdesign/web-components-chat/chat-engine';
import { JsonRenderActivityRenderer } from './renderer';
import type { ActionHandlers, ComponentRegistry, JsonRenderActivityProps } from './types';

const updateExistingSurface = (surfaceId: string, messages: A2UIMessage[]) => {
  let schema = surfaceStateManager.getSchema(surfaceId);
  let schemaDirty = false;

  messages.forEach((message) => {
    if (message.updateComponents && schema) {
      schema = applyA2UIUpdates(schema, message.updateComponents.components);
      schemaDirty = true;
    } else if (message.updateDataModel) {
      const { path, op, value } = message.updateDataModel;
      surfaceStateManager.updateData(surfaceId, path, op || 'replace', value);
    }
  });

  if (schemaDirty && schema) surfaceStateManager.updateSchema(surfaceId, schema);
};

export interface A2UISurfaceController {
  surfaceIds: Ref<string[]>;
  processMessages: (messages: A2UIMessage[]) => void;
  clearAllSurfaces: () => void;
  hasSurface: (surfaceId: string) => boolean;
}

export interface UseA2UISurfaceOptions {
  debug?: boolean;
}

export const useA2UISurface = (options: UseA2UISurfaceOptions = {}): A2UISurfaceController => {
  const surfaceIds = ref<string[]>([]);
  const pendingMessages = new Map<string, A2UIMessage[]>();

  const addSurface = (surfaceId: string) => {
    if (!surfaceIds.value.includes(surfaceId)) surfaceIds.value = [...surfaceIds.value, surfaceId];
  };

  const processMessages = (messages: A2UIMessage[]) => {
    if (!messages?.length) return;

    groupMessagesBySurface(messages).forEach((surfaceMessages, surfaceId) => {
      if (surfaceMessages.some((message) => message.deleteSurface)) {
        surfaceStateManager.deleteSurface(surfaceId);
        pendingMessages.delete(surfaceId);
        surfaceIds.value = surfaceIds.value.filter((id) => id !== surfaceId);
        return;
      }

      if (surfaceStateManager.hasSurface(surfaceId)) {
        updateExistingSurface(surfaceId, surfaceMessages);
        addSurface(surfaceId);
        return;
      }

      const pending = [...(pendingMessages.get(surfaceId) || []), ...surfaceMessages];
      const schema = convertA2UIMessagesToJsonRender(pending);
      if (!schema) {
        pendingMessages.set(surfaceId, pending);
        return;
      }

      const catalogId = pending.find((message) => message.createSurface)?.createSurface?.catalogId;
      surfaceStateManager.registerSurface(surfaceId, schema, catalogId);
      pendingMessages.delete(surfaceId);
      addSurface(surfaceId);
      if (options.debug) console.log('[useA2UISurface] registered:', surfaceId);
    });
  };

  const clearAllSurfaces = () => {
    surfaceIds.value.forEach((surfaceId) => surfaceStateManager.deleteSurface(surfaceId));
    surfaceIds.value = [];
    pendingMessages.clear();
  };

  onBeforeUnmount(clearAllSurfaces);

  return {
    surfaceIds,
    processMessages,
    clearAllSurfaces,
    hasSurface: (surfaceId) => surfaceStateManager.hasSurface(surfaceId),
  };
};

export const A2UISurfaceRenderer = defineComponent({
  name: 'A2UISurfaceRenderer',
  props: {
    surfaceId: { type: String, required: true },
    registry: { type: Object as PropType<ComponentRegistry>, required: true },
    actionHandlers: { type: Object as PropType<ActionHandlers>, default: () => ({}) },
  },
  setup(props) {
    const schema = shallowRef<JsonRenderSchema | null>(null);
    let unsubscribe: (() => void) | undefined;

    watch(
      () => props.surfaceId,
      (surfaceId) => {
        unsubscribe?.();
        schema.value = surfaceStateManager.getSchema(surfaceId);
        unsubscribe = surfaceStateManager.subscribe(surfaceId, () => {
          schema.value = surfaceStateManager.getSchema(surfaceId);
        });
      },
      { immediate: true },
    );
    onBeforeUnmount(() => unsubscribe?.());

    return () =>
      schema.value ? (
        <JsonRenderActivityRenderer
          activityType="a2ui-surface"
          content={schema.value}
          messageId={props.surfaceId}
          registry={props.registry}
          actionHandlers={props.actionHandlers}
          onDataChange={(path, value) => {
            surfaceStateManager.updateData(props.surfaceId, path, 'replace', value);
          }}
        />
      ) : null;
  },
});

export interface A2UIJsonRenderActivityRendererProps extends Omit<JsonRenderActivityProps, 'content'> {
  content: {
    messages?: A2UIMessage[];
  };
  registry: ComponentRegistry;
  actionHandlers?: ActionHandlers;
  debug?: boolean;
}

export const A2UIJsonRenderActivityRenderer = defineComponent({
  name: 'A2UIJsonRenderActivityRenderer',
  props: {
    activityType: { type: String, required: true },
    content: {
      type: Object as PropType<A2UIJsonRenderActivityRendererProps['content']>,
      required: true,
    },
    messageId: { type: String, default: '' },
    registry: { type: Object as PropType<ComponentRegistry>, required: true },
    actionHandlers: { type: Object as PropType<ActionHandlers>, default: () => ({}) },
    debug: Boolean,
  },
  setup(props) {
    const schema = shallowRef<JsonRenderSchema | null>(null);
    const isOwner = ref(false);
    const ownerToken = Symbol(`A2UIRenderer:${props.messageId || 'anonymous'}`);
    const processedCount = ref(0);
    const pending = ref<A2UIMessage[]>([]);
    const surfaceId = ref<string>();
    let unsubscribeSurface: (() => void) | undefined;
    let unsubscribeOwnership: (() => void) | undefined;

    const subscribeSurface = (id: string) => {
      unsubscribeSurface?.();
      unsubscribeOwnership?.();
      unsubscribeSurface = surfaceStateManager.subscribe(id, () => {
        schema.value = surfaceStateManager.getSchema(id);
      });
      unsubscribeOwnership = surfaceStateManager.subscribeOwnership(id, ownerToken, (owned) => {
        isOwner.value = owned;
        if (!owned) schema.value = null;
      });
    };

    watch(
      () => props.content.messages || [],
      (messages) => {
        if (messages.length < processedCount.value) {
          processedCount.value = 0;
          pending.value = [];
        }
        const slice = messages.slice(processedCount.value);
        processedCount.value = messages.length;
        if (!slice.length) return;

        surfaceId.value ||= extractSurfaceId(messages) || undefined;
        const id = surfaceId.value;
        if (!id) return;

        if (slice.some((message) => message.deleteSurface)) {
          surfaceStateManager.deleteSurface(id);
          schema.value = null;
          isOwner.value = false;
          return;
        }

        if (surfaceStateManager.hasSurface(id)) {
          updateExistingSurface(id, slice);
        } else {
          pending.value.push(...slice);
          const nextSchema = convertA2UIMessagesToJsonRender(pending.value);
          if (nextSchema) {
            const catalogId = pending.value.find((message) => message.createSurface)?.createSurface?.catalogId;
            surfaceStateManager.registerSurface(id, nextSchema, catalogId);
            pending.value = [];
          }
        }

        if (surfaceStateManager.hasSurface(id)) {
          if (!unsubscribeSurface) subscribeSurface(id);
          if (!isOwner.value) isOwner.value = surfaceStateManager.claimOwnership(id, ownerToken);
          schema.value = surfaceStateManager.getSchema(id);
        }
      },
      { immediate: true, deep: true },
    );

    onBeforeUnmount(() => {
      unsubscribeSurface?.();
      unsubscribeOwnership?.();
      if (surfaceId.value) surfaceStateManager.releaseOwnership(surfaceId.value, ownerToken);
    });

    return () =>
      isOwner.value && schema.value ? (
        <JsonRenderActivityRenderer
          activityType={props.activityType}
          content={schema.value}
          messageId={props.messageId}
          registry={props.registry}
          actionHandlers={props.actionHandlers}
          onDataChange={(path, value) => {
            if (surfaceId.value) surfaceStateManager.updateData(surfaceId.value, path, 'replace', value);
          }}
        />
      ) : null;
  },
});

export const createA2UISurfaceRenderer = (registry: ComponentRegistry, actionHandlers: ActionHandlers = {}) =>
  defineComponent({
    name: 'ConfiguredA2UISurfaceRenderer',
    props: { surfaceId: { type: String, required: true } },
    setup: (props) => () =>
      h(A2UISurfaceRenderer, {
        surfaceId: props.surfaceId,
        registry,
        actionHandlers,
      }),
  });
