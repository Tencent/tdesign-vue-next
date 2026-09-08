/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, shallowRef, watch, type Component, type PropType, type VNode } from 'vue';
import { evaluateVisibility, type ActionBinding, type UIElement } from '@json-render/core';
import type { JsonRenderSchema } from '@tdesign/web-components-chat/chat-engine';
import {
  JsonRenderDataStore,
  provideJsonRenderActions,
  provideJsonRenderData,
  provideJsonRenderValidation,
} from './context';
import type {
  ActionHandlers,
  ComponentRegistry,
  ComponentRenderer,
  JsonRenderActivityProps,
  RendererProps,
} from './types';

const ElementRenderer: Component = defineComponent({
  name: 'JsonRenderElementNode',
  props: {
    elementKey: { type: String, required: true },
    tree: { type: Object as PropType<JsonRenderSchema>, required: true },
    registry: { type: Object as PropType<ComponentRegistry>, required: true },
    fallback: { type: [Object, Function] as PropType<ComponentRenderer>, default: undefined },
    loading: Boolean,
    dataStore: { type: Object as PropType<JsonRenderDataStore>, required: true },
    onAction: { type: Function as PropType<(action: ActionBinding) => void>, required: true },
  },
  setup(props) {
    return (): VNode | null => {
      const element = props.tree.elements[props.elementKey] as UIElement | undefined;
      if (!element) return null;

      const visible = evaluateVisibility(element.visible, {
        stateModel: props.dataStore.data.value,
      });
      if (!visible) return null;

      const component = props.registry[element.type] || props.fallback;
      if (!component) {
        console.warn(`[json-render] Unknown component type: ${element.type}`);
        return null;
      }

      const children: VNode[] | undefined = element.children?.map((elementKey) =>
        h(ElementRenderer, {
          key: elementKey,
          elementKey,
          tree: props.tree,
          registry: props.registry,
          fallback: props.fallback,
          loading: props.loading,
          dataStore: props.dataStore,
          onAction: props.onAction,
        }),
      );

      return h(
        component,
        {
          element,
          children,
          loading: props.loading,
          onAction: props.onAction,
        },
        { default: () => children },
      );
    };
  },
});

export const JsonRenderElement = defineComponent({
  name: 'JsonRenderElement',
  props: {
    tree: { type: Object as PropType<JsonRenderSchema | null>, default: null },
    registry: { type: Object as PropType<ComponentRegistry>, required: true },
    fallback: { type: [Object, Function] as PropType<ComponentRenderer>, default: undefined },
    loading: Boolean,
    actionHandlers: { type: Object as PropType<ActionHandlers>, default: () => ({}) },
    onDataChange: {
      type: Function as PropType<(path: string, value: unknown) => void>,
      default: undefined,
    },
  },
  setup(props) {
    const store = new JsonRenderDataStore((props.tree?.data || {}) as Record<string, unknown>);
    provideJsonRenderData(store);
    const actions = provideJsonRenderActions(store, props.actionHandlers);
    provideJsonRenderValidation({}, store);

    watch(
      () => props.tree?.data,
      (data) => store.replaceData((data || {}) as Record<string, unknown>),
      { deep: true },
    );
    watch(
      () => props.onDataChange,
      (callback) => store.setOnDataChange(callback),
      { immediate: true },
    );

    return () => {
      if (!props.tree?.root) return null;
      return h(ElementRenderer, {
        elementKey: props.tree.root,
        tree: props.tree,
        registry: props.registry,
        fallback: props.fallback,
        loading: props.loading,
        dataStore: store,
        onAction: actions.execute,
      });
    };
  },
});

export interface JSONUIProviderProps {
  initialData?: Record<string, unknown>;
  actionHandlers?: ActionHandlers;
  navigate?: (path: string) => void;
  onDataChange?: (path: string, value: unknown) => void;
}

export const JSONUIProvider = defineComponent({
  name: 'JSONUIProvider',
  props: {
    initialData: { type: Object as PropType<Record<string, unknown>>, default: () => ({}) },
    actionHandlers: { type: Object as PropType<ActionHandlers>, default: () => ({}) },
    navigate: { type: Function as PropType<(path: string) => void>, default: undefined },
    onDataChange: {
      type: Function as PropType<(path: string, value: unknown) => void>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const store = new JsonRenderDataStore(props.initialData, props.onDataChange);
    provideJsonRenderData(store);
    provideJsonRenderActions(store, props.actionHandlers, props.navigate);
    provideJsonRenderValidation({}, store);
    watch(
      () => props.initialData,
      (data) => store.replaceData(data),
      { deep: true },
    );
    return () => slots.default?.();
  },
});

export interface JsonRenderActivityRendererProps extends JsonRenderActivityProps {
  registry: ComponentRegistry;
  actionHandlers?: ActionHandlers;
  debug?: boolean;
  onDataChange?: (path: string, value: unknown) => void;
}

export const JsonRenderActivityRenderer = defineComponent({
  name: 'JsonRenderActivityRenderer',
  props: {
    activityType: { type: String, required: true },
    content: { type: Object as PropType<JsonRenderSchema>, required: true },
    messageId: { type: String, default: '' },
    registry: { type: Object as PropType<ComponentRegistry>, required: true },
    actionHandlers: { type: Object as PropType<ActionHandlers>, default: () => ({}) },
    debug: Boolean,
    onDataChange: {
      type: Function as PropType<(path: string, value: unknown) => void>,
      default: undefined,
    },
  },
  setup(props) {
    const lastValidContent = shallowRef<JsonRenderSchema | null>(null);
    watch(
      () => props.content,
      (content) => {
        if (content?.root && content.elements?.[content.root]) lastValidContent.value = content;
      },
      { immediate: true, deep: true },
    );

    return () => {
      const content = lastValidContent.value;
      if (!content) return null;
      return (
        <div data-activity-type={props.activityType} data-message-id={props.messageId}>
          <JsonRenderElement
            tree={content}
            registry={props.registry}
            actionHandlers={props.actionHandlers}
            onDataChange={props.onDataChange}
          />
        </div>
      );
    };
  },
});

export const createRendererFromCatalog = (_catalog: unknown, registry: ComponentRegistry) =>
  defineComponent({
    name: 'CatalogRenderer',
    props: {
      tree: { type: Object as PropType<RendererProps['tree']>, default: null },
      loading: Boolean,
      fallback: { type: [Object, Function] as PropType<ComponentRenderer>, default: undefined },
    },
    setup: (props) => () =>
      <JsonRenderElement tree={props.tree} registry={registry} loading={props.loading} fallback={props.fallback} />,
  });
