import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { AgentToolcallConfig, ToolcallComponentProps } from '../components/toolcall/types';
import { agentToolcallRegistry } from '../components/toolcall/registry';

export interface UseAgentToolcallReturn {
  register: (config: AgentToolcallConfig | AgentToolcallConfig[]) => void;
  unregister: (names: string | string[]) => void;
  isRegistered: (name: string) => boolean;
  getRegistered: () => string[];
  config: Ref<any>;
}

/**
 * 统一的、智能的 Agent Toolcall 适配器 Hook，
 * 注册管理：负责工具配置的注册、取消注册、状态跟踪；生命周期管理：自动清理、防止内存泄漏
 * 支持两种使用模式：
 * 1. 自动注册模式：传入配置，自动注册和清理
 * 2. 手动注册模式：不传配置或传入null，返回注册方法由业务控制
 */
export function useAgentToolcall<TArgs extends object = any, TResult = any, TResponse = any>(
  config?:
    | AgentToolcallConfig<TArgs, TResult, TResponse>
    | AgentToolcallConfig<TArgs, TResult, TResponse>[]
    | null
    | undefined,
): UseAgentToolcallReturn {
  const registeredNamesRef = ref<Set<string>>(new Set());
  const autoRegisteredNamesRef = ref<Set<string>>(new Set());
  const configRef = ref(config);

  // 手动注册方法
  const register = (newConfig: AgentToolcallConfig | AgentToolcallConfig[]) => {
    if (!newConfig) {
      console.warn('[useAgentToolcall] 配置为空，跳过注册');
      return;
    }

    const configs = Array.isArray(newConfig) ? newConfig : [newConfig];

    configs.forEach((cfg) => {
      if (agentToolcallRegistry.get(cfg.name)) {
        console.warn(`[useAgentToolcall] 配置名称 "${cfg.name}" 已存在于注册表中，将被覆盖`);
      }

      agentToolcallRegistry.register(cfg);
      registeredNamesRef.value.add(cfg.name);
    });
  };

  // 手动取消注册方法
  const unregister = (names: string | string[]) => {
    const nameArray = Array.isArray(names) ? names : [names];

    nameArray.forEach((name) => {
      agentToolcallRegistry.unregister(name);
      registeredNamesRef.value.delete(name);
      autoRegisteredNamesRef.value.delete(name);
    });
  };

  // 检查是否已注册
  const isRegistered = (name: string) => registeredNamesRef.value.has(name) || autoRegisteredNamesRef.value.has(name);

  // 获取所有已注册的配置名称
  const getRegistered = () => Array.from(new Set([...registeredNamesRef.value, ...autoRegisteredNamesRef.value]));

  // 自动注册逻辑（当传入配置时）
  onMounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];
    configs.forEach((cfg) => {
      if (agentToolcallRegistry.get(cfg.name)) {
        console.warn(`[useAgentToolcall] 配置名称 "${cfg.name}" 已存在于注册表中，将被覆盖`);
      }

      agentToolcallRegistry.register(cfg);
      autoRegisteredNamesRef.value.add(cfg.name);
    });
  });

  onUnmounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];
    // 清理函数：取消注册自动注册的配置
    configs.forEach((cfg) => {
      agentToolcallRegistry.unregister(cfg.name);
      autoRegisteredNamesRef.value.delete(cfg.name);
    });
  });

  // 监听配置变化
  watch(
    () => config,
    (newConfig) => {
      // 更新配置引用
      configRef.value = newConfig;
    },
    { deep: true },
  );

  return {
    register,
    unregister,
    isRegistered,
    getRegistered,
    config: configRef,
  };
}

// 创建带状态感知的工具配置（带状态变化事件），状态注入，自动为组件注入 agentState
export interface ToolConfigWithStateOptions<TArgs extends object = any, TResult = any> {
  name: string;
  description: string;
  parameters: Array<{ name: string; type: string }>;
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
  component: new (props: ToolcallComponentProps<TArgs, TResult> & { agentState?: Record<string, any> }) => any;
}
