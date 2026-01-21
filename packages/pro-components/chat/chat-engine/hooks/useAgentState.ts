import { ref, onMounted, onUnmounted, computed, provide, inject, watch, type Ref, type InjectionKey } from 'vue';
import { stateManager } from 'tdesign-web-components/lib/chat-engine';

/**
 * 状态订阅相关类型定义
 */

export interface StateActionOptions {
  /**
   * 初始状态
   */
  initialState?: Record<string, any>;
  /**
   * 只订阅特定key的变化
   */
  subscribeKey?: string;
}

export interface UseStateActionReturn {
  /**
   * 全量状态Map - 包含所有stateKey的状态
   * 格式: { [stateKey]: stateData }
   */
  stateMap: Ref<Record<string, any>>;
  /**
   * 当前最新的状态key
   */
  currentStateKey: Ref<string | null>;
  /**
   * 设置状态Map，用于加载历史对话消息中的state数据
   */
  setStateMap: (stateMap: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void;
  /**
   * 获取当前完整状态的方法
   */
  getCurrentState: () => Record<string, any>;
  /**
   * 获取特定 key 状态的方法
   */
  getStateByKey: (key: string) => any;
}

export const useAgentState = <T = any>(options: StateActionOptions = {}): UseStateActionReturn => {
  const { initialState, subscribeKey } = options;
  const stateMap = ref<Record<string, any>>(initialState || {});
  const currentStateKey = ref<string | null>(null);

  // 使用 ref 来避免不必要的重新渲染
  const stateMapRef = ref(stateMap.value);

  // 订阅管理
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = stateManager.subscribeToLatest((newState: T, newStateKey: string) => {
      // 如果指定了 subscribeKey，只有匹配时才更新状态
      if (subscribeKey && newStateKey !== subscribeKey) {
        // 仍然更新内部状态，但不触发重新渲染
        stateMapRef.value = {
          ...stateMapRef.value,
          [newStateKey]: newState,
        };
        return;
      }

      stateMap.value = {
        ...stateMap.value,
        [newStateKey]: newState,
      };
      currentStateKey.value = newStateKey;
      stateMapRef.value = stateMap.value;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  // 监听 subscribeKey 变化
  watch(
    () => subscribeKey,
    () => {
      // 重新订阅
      if (unsubscribe) {
        unsubscribe();
      }

      unsubscribe = stateManager.subscribeToLatest((newState: T, newStateKey: string) => {
        if (subscribeKey && newStateKey !== subscribeKey) {
          stateMapRef.value = {
            ...stateMapRef.value,
            [newStateKey]: newState,
          };
          return;
        }

        stateMap.value = {
          ...stateMap.value,
          [newStateKey]: newState,
        };
        currentStateKey.value = newStateKey;
        stateMapRef.value = stateMap.value;
      });
    },
  );

  const setStateMap = (newStateMap: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
    if (typeof newStateMap === 'function') {
      stateMap.value = newStateMap(stateMap.value);
    } else {
      stateMap.value = newStateMap;
    }
    stateMapRef.value = stateMap.value;
  };

  return {
    stateMap,
    currentStateKey,
    setStateMap,
    getCurrentState: () => stateMapRef.value,
    getStateByKey: (key: string) => stateMapRef.value[key],
  };
};

// 创建 InjectionKey 用于 Provide/Inject
export const AgentStateKey: InjectionKey<UseStateActionReturn> = Symbol('AgentState');

// 提供 AgentState 到后代组件
export const provideAgentState = (state: UseStateActionReturn) => {
  provide(AgentStateKey, state);
};

// 简化的状态选择器，支持响应式 stateKey
export const useAgentStateDataByKey = (stateKey?: Ref<string | undefined> | string) => {
  const contextState = inject<UseStateActionReturn | null>(AgentStateKey, null);

  // 解析 stateKey，支持 Ref 和普通字符串
  const resolvedKey = computed(() => {
    if (stateKey === undefined) return undefined;
    if (typeof stateKey === 'string') return stateKey;
    return stateKey.value;
  });

  // 独立状态订阅（当没有 Provider 时使用）
  const stateMap = ref<Record<string, any>>({});
  const currentStateKey = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = stateManager.subscribeToLatest((newState: any, newStateKey: string) => {
      stateMap.value = {
        ...stateMap.value,
        [newStateKey]: newState,
      };
      currentStateKey.value = newStateKey;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return computed(() => {
    const key = resolvedKey.value;

    if (contextState) {
      // 有 Provider，使用 Provide 状态
      const { stateMap: contextStateMap } = contextState;
      return key ? contextStateMap.value[key] : contextStateMap.value;
    }

    // 没有 Provider，使用独立状态
    return key ? stateMap.value[key] : stateMap.value;
  });
};

// 导出 Provide Hook
export const useAgentStateContext = (): UseStateActionReturn => {
  const context = inject<UseStateActionReturn | null>(AgentStateKey, null);

  if (!context) {
    throw new Error('useAgentState must be used within AgentStateProvider (component that calls provideAgentState)');
  }

  return context;
};
