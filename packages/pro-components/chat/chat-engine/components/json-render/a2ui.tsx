/* eslint-disable no-console, vue/one-component-per-file */
import { defineComponent, h, onBeforeUnmount, ref, shallowRef, watch, type PropType, type Ref } from 'vue';
import {
  applyA2UIUpdates,
  convertA2UIMessagesToJsonRender,
  extractSurfaceId,
  surfaceStateManager,
  type A2UIMessage,
  type JsonRenderSchema,
} from '@tdesign/web-components-chat/chat-engine';
import { JsonRenderActivityRenderer } from './renderer';
import type { ActionHandlers, ComponentRegistry, JsonRenderActivityProps } from './types';

/* ------------------------------------------------------------------ */
/* 分帧处理状态 & 纯函数式核心处理器（与 React 侧完全对齐）             */
/* ------------------------------------------------------------------ */

/**
 * 单个 renderer 实例内部的分帧处理状态
 * 每个实例持有独立的一份，跨 watch 回调持久化
 */
interface FrameState {
  /** 已处理到 messages 数组的哪个 index（切片起点） */
  lastProcessedIndex: number;
  /** 已识别到的 surfaceId（createSurface / extractSurfaceId 后确定） */
  surfaceId: string | null;
  /** 已识别到的 catalogId */
  catalogId: string | undefined;
  /** 当前 Surface 生命周期阶段 */
  phase: 'idle' | 'pending' | 'registered' | 'deleted';
  /** 当前生命周期中、注册前收到的消息 */
  pendingMessages: A2UIMessage[];
}

const createInitialFrameState = (): FrameState => ({
  lastProcessedIndex: 0,
  surfaceId: null,
  catalogId: undefined,
  phase: 'idle',
  pendingMessages: [],
});

/**
 * 处理一批新增消息切片
 *
 * ⚠️ 关键语义：A2UI 协议本身是"消息独立且按序处理"，但被外层 AG-UI 协议 batch 后，
 *   一个 slice 内可能出现"生命周期粘连"的合法组合，例如：
 *     1) update → delete → create（同 id 重开）
 *     2) delete 目标是另一个 surface（不是本 renderer 关注的）
 *   因此这里**必须按 slice 出现顺序，逐条消息处理**，让 create/update/delete 都是独立的
 *   原子动作，而不是"发现 delete 就整批 return"（那会误伤 delete 之后的 create/update
 *   以及跨 surface 的其他消息）。
 *
 * @param slice        本次新增的消息（未曾处理过）
 * @param state        分帧状态（会被 mutate）
 * @param bumpRender   触发外层重新读取 schema 的回调
 * @param debug        调试开关
 */
function processIncrementalSlice(
  slice: A2UIMessage[],
  state: FrameState,
  bumpRender: () => void,
  debug: boolean,
): void {
  // 已注册期用于合并 updateComponents 的快照 & 脏标记
  let mergedSchema: JsonRenderSchema | null =
    state.phase === 'registered' && state.surfaceId ? surfaceStateManager.getSchema(state.surfaceId) : null;
  let schemaDirty = false;

  const flushSchemaDirty = () => {
    if (schemaDirty && mergedSchema && state.surfaceId) {
      surfaceStateManager.updateSchema(state.surfaceId, mergedSchema);
      schemaDirty = false;
    }
  };

  // 仅使用当前生命周期的 pending 消息建 schema，避免 delete 前的历史消息参与重建。
  const tryBuildAndRegisterFromPending = () => {
    if (!state.surfaceId) return;
    if (surfaceStateManager.hasSurface(state.surfaceId)) return;
    const schema = convertA2UIMessagesToJsonRender(state.pendingMessages);
    if (schema) {
      surfaceStateManager.registerSurface(state.surfaceId, schema, state.catalogId);
      state.phase = 'registered';
      state.pendingMessages = [];
      mergedSchema = schema;
      bumpRender();
      if (debug) {
        console.log('[A2UI Adapter] Surface 注册成功:', {
          surfaceId: state.surfaceId,
          elementsCount: Object.keys(schema.elements).length,
          allElementIds: Object.keys(schema.elements),
          dataKeys: Object.keys(schema.data || {}),
        });
      }
    } else if (debug) {
      console.log('[A2UI Adapter] Surface 尚未凑齐 root 组件，等待后续切片:', state.surfaceId, {
        pendingMessagesCount: state.pendingMessages.length,
      });
    }
  };

  for (const msg of slice) {
    // ---------- deleteSurface ----------
    if (msg.deleteSurface) {
      const { surfaceId: delId } = msg.deleteSurface;
      // 先把已注册期未落盘的组件更新 flush 出去（触发订阅副作用后再删除）
      if (state.phase === 'registered' && state.surfaceId === delId) {
        flushSchemaDirty();
      }
      surfaceStateManager.deleteSurface(delId);
      if (state.surfaceId === delId) {
        // 本 renderer 关注的 surface 被删：复位状态，允许同 slice 内后续 createSurface 重开
        state.phase = 'deleted';
        state.pendingMessages = [];
        mergedSchema = null;
        schemaDirty = false;
        // 触发一次外层重渲染，让 UI 卸载
        bumpRender();
      }
      if (debug) console.log('[A2UI Adapter] 删除 Surface:', delId);
      continue;
    }

    // ---------- createSurface ----------
    if (msg.createSurface) {
      const { surfaceId: newId, catalogId } = msg.createSurface;
      // 仅在本 renderer 尚未绑定 surface 或前一个已被 delete 时接受新 surface
      if (!state.surfaceId || state.phase !== 'registered') {
        state.surfaceId = newId;
        state.catalogId = catalogId;
        state.phase = 'pending';
        state.pendingMessages = [msg];
        if (debug) console.log('[A2UI Adapter] 识别 Surface:', state.surfaceId);
        tryBuildAndRegisterFromPending();
      }
      continue;
    }

    // 单个 renderer 内，delete 后必须由新的 createSurface 开启下一生命周期。
    if (state.phase === 'deleted') {
      if (debug) console.log('[A2UI Adapter] Surface 已删除，忽略 createSurface 之前的更新:', msg);
      continue;
    }

    // ---------- updateComponents / updateDataModel 前置：确定 surfaceId ----------
    if (!state.surfaceId) {
      // 兼容极端场景：切片内没有 createSurface 直接 updateComponents
      state.surfaceId = extractSurfaceId([msg]) || extractSurfaceId(slice) || null;
      if (!state.surfaceId) {
        if (debug) console.log('[A2UI Adapter] 消息无 surfaceId，跳过:', msg);
        continue;
      }
    }

    // Attach 到已存在的 Surface（A2UI 规范：surfaceId 全局唯一，跨会话 attach）
    if (state.phase !== 'registered' && surfaceStateManager.hasSurface(state.surfaceId)) {
      state.phase = 'registered';
      state.pendingMessages = [];
      mergedSchema = surfaceStateManager.getSchema(state.surfaceId);
      bumpRender();
      if (debug) console.log('[A2UI Adapter] Attach 到已存在的 Surface:', state.surfaceId);
    }

    // 没有 createSurface，且全局也不存在可 attach 的 Surface：该更新不构成新生命周期。
    if (state.phase === 'idle') {
      if (debug) console.log('[A2UI Adapter] Surface 尚未创建，忽略更新:', msg);
      continue;
    }

    // ---------- updateComponents ----------
    if (msg.updateComponents) {
      if (state.phase === 'registered') {
        if (!mergedSchema) mergedSchema = surfaceStateManager.getSchema(state.surfaceId);
        if (mergedSchema) {
          mergedSchema = applyA2UIUpdates(mergedSchema, msg.updateComponents.components as any[]);
          schemaDirty = true;
          if (debug) {
            console.log('[A2UI Adapter] 增量合并组件:', {
              surfaceId: state.surfaceId,
              componentsCount: msg.updateComponents.components?.length,
              incomingIds: msg.updateComponents.components?.map((c: any) => c.id),
              allElementIds: Object.keys(mergedSchema.elements),
            });
          }
        }
      } else {
        state.pendingMessages.push(msg);
        tryBuildAndRegisterFromPending();
      }
      continue;
    }

    // ---------- updateDataModel ----------
    if (msg.updateDataModel) {
      if (state.phase === 'registered') {
        // 保序：先把组件更新落盘再更新数据
        flushSchemaDirty();
        const { path, op, value } = msg.updateDataModel;
        surfaceStateManager.updateData(state.surfaceId, path, op || 'replace', value);
      } else {
        state.pendingMessages.push(msg);
        tryBuildAndRegisterFromPending();
      }
      continue;
    }
  }

  // 循环结束后统一 flush 组件树变化
  flushSchemaDirty();
}

/* ------------------------------------------------------------------ */
/* useA2UISurface：多 Surface Hook（升级为按序独立处理）                 */
/* ------------------------------------------------------------------ */

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
  // 每个 surfaceId 维护一份独立的生命周期状态。
  const stateMap = new Map<string, FrameState>();

  const addSurface = (surfaceId: string) => {
    if (!surfaceIds.value.includes(surfaceId)) surfaceIds.value = [...surfaceIds.value, surfaceId];
  };
  const removeSurface = (surfaceId: string) => {
    surfaceIds.value = surfaceIds.value.filter((id) => id !== surfaceId);
  };

  const processMessages = (messages: A2UIMessage[]) => {
    if (!messages?.length) return;

    // 严格按照输入的原始顺序逐条处理，避免按 Surface 分桶后改变跨 Surface 的事件顺序。
    const touchedSurfaceIds = new Set<string>();
    for (const msg of messages) {
      const id =
        msg.createSurface?.surfaceId ||
        msg.updateComponents?.surfaceId ||
        msg.updateDataModel?.surfaceId ||
        msg.deleteSurface?.surfaceId;
      if (!id) continue;
      touchedSurfaceIds.add(id);

      if (!stateMap.has(id)) stateMap.set(id, createInitialFrameState());
      const state = stateMap.get(id);
      if (!state) continue;
      processIncrementalSlice([msg], state, () => {}, options.debug || false);
      if (state.phase === 'deleted') stateMap.delete(id);
    }

    // 只暴露整批消息处理完成后的最终状态，避免同步 watcher 观察到 delete → recreate 的中间态。
    for (const id of touchedSurfaceIds) {
      if (stateMap.get(id)?.phase === 'registered') addSurface(id);
      else removeSurface(id);
    }
  };

  const clearAllSurfaces = () => {
    surfaceIds.value.forEach((surfaceId) => surfaceStateManager.deleteSurface(surfaceId));
    surfaceIds.value = [];
    stateMap.clear();
  };

  onBeforeUnmount(clearAllSurfaces);

  return {
    surfaceIds,
    processMessages,
    clearAllSurfaces,
    hasSurface: (surfaceId) => surfaceStateManager.hasSurface(surfaceId),
  };
};

/* ------------------------------------------------------------------ */
/* A2UISurfaceRenderer：按 surfaceId 挂载 UI                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* A2UIJsonRenderActivityRenderer：单 activity 块内的增量分帧渲染器       */
/* ------------------------------------------------------------------ */

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
    // 分帧状态（跨 watch 回调持久化，等价于 React 的 useRef）
    let frameState: FrameState = createInitialFrameState();

    // Ownership token（本 renderer 实例的唯一身份）
    const ownerToken = Symbol(`A2UIRenderer:${props.messageId || 'anon'}`);

    const schema = shallowRef<JsonRenderSchema | null>(null);
    const isOwner = ref(false);
    // 用于触发 schema 重新读取的版本号（processIncrementalSlice 完成 / 订阅回调都会 bump）
    const renderVersion = ref(0);
    const bumpRender = () => {
      renderVersion.value += 1;
    };

    let unsubscribeSchema: (() => void) | undefined;
    let unsubscribeOwnership: (() => void) | undefined;
    let subscribedSurfaceId: string | null = null;

    const subscribeSurface = (id: string) => {
      if (subscribedSurfaceId === id) return;
      unsubscribeSchema?.();
      unsubscribeOwnership?.();

      if (props.debug) console.log('[A2UI Adapter] 订阅 Surface 状态 + Ownership:', id);

      unsubscribeSchema = surfaceStateManager.subscribe(id, () => {
        if (props.debug) console.log('[A2UI Adapter] 收到 surface 状态更新通知，触发重渲染');
        bumpRender();
      });
      unsubscribeOwnership = surfaceStateManager.subscribeOwnership(id, ownerToken, (nowIsOwner) => {
        if (props.debug) console.log('[A2UI Adapter] Ownership 变化:', { surfaceId: id, isOwner: nowIsOwner });
        isOwner.value = nowIsOwner;
      });
      // 主动同步一次
      isOwner.value = surfaceStateManager.isOwner?.(id, ownerToken) ?? isOwner.value;
      subscribedSurfaceId = id;
    };

    // messageId 变化时重置状态（activity 块换了实例）
    watch(
      () => props.messageId,
      () => {
        frameState = createInitialFrameState();
        isOwner.value = false;
        schema.value = null;
        subscribedSurfaceId = null;
      },
    );

    // 核心：增量处理 content.messages
    watch(
      () => props.content.messages || [],
      (messages) => {
        if (!Array.isArray(messages) || messages.length === 0) return;

        // 长度回退：重置分帧状态从头处理
        if (messages.length < frameState.lastProcessedIndex) {
          if (props.debug) console.log('[A2UI Adapter] messages 长度回退，重置分帧状态');
          frameState = createInitialFrameState();
        }

        const slice = messages.slice(frameState.lastProcessedIndex);
        if (slice.length === 0) return;

        if (props.debug) {
          console.log('[A2UI Adapter] 增量处理切片:', {
            messageId: props.messageId,
            fromIndex: frameState.lastProcessedIndex,
            sliceLength: slice.length,
            sliceTypes: slice.map(
              (m) =>
                Object.keys(m).filter((k) =>
                  ['createSurface', 'updateComponents', 'updateDataModel', 'deleteSurface'].includes(k),
                )[0],
            ),
          });
        }

        processIncrementalSlice(slice, frameState, bumpRender, props.debug || false);

        // 更新游标
        frameState.lastProcessedIndex = messages.length;

        // 认领 ownership（"先到先得"）
        if (frameState.phase === 'registered' && frameState.surfaceId) {
          subscribeSurface(frameState.surfaceId);
          if (!isOwner.value) {
            isOwner.value = surfaceStateManager.claimOwnership(frameState.surfaceId, ownerToken);
          }
          bumpRender();
        }
      },
      { immediate: true, deep: true },
    );

    // 派生 schema：renderVersion / isOwner 变化时重新读取
    watch(
      [renderVersion, isOwner],
      () => {
        if (frameState.phase !== 'registered' || !frameState.surfaceId || !isOwner.value) {
          schema.value = null;
          return;
        }
        schema.value = surfaceStateManager.getSchema(frameState.surfaceId);
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      unsubscribeSchema?.();
      unsubscribeOwnership?.();
      if (frameState.surfaceId) surfaceStateManager.releaseOwnership(frameState.surfaceId, ownerToken);
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
            if (frameState.surfaceId) surfaceStateManager.updateData(frameState.surfaceId, path, 'replace', value);
          }}
        />
      ) : null;
  },
});

/* ------------------------------------------------------------------ */
/* createA2UISurfaceRenderer：便利工厂                                  */
/* ------------------------------------------------------------------ */

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
