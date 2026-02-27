import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { ActivityConfig } from '../components/activity/types';
import { activityRegistry } from '../components/activity/registry';

export interface UseAgentActivityReturn {
  register: (config: ActivityConfig | ActivityConfig[]) => void;
  unregister: (activityTypes: string | string[]) => void;
  isRegistered: (activityType: string) => boolean;
  getRegistered: () => string[];
}

/**
 * Activity 注册管理 Hook，专门用于 Activity 组件的注册管理
 *
 * 支持两种使用模式：
 * 1. 自动注册模式：传入配置，自动注册和清理
 * 2. 手动注册模式：不传配置，返回注册方法由业务控制
 */
export function useAgentActivity<TContent = any>(
  config?: ActivityConfig<TContent> | ActivityConfig<TContent>[] | null | undefined,
): UseAgentActivityReturn {
  const registeredTypesRef = ref<Set<string>>(new Set());
  const autoRegisteredTypesRef = ref<Set<string>>(new Set());

  // 手动注册方法
  const register = (newConfig: ActivityConfig | ActivityConfig[]) => {
    if (!newConfig) {
      console.warn('[useAgentActivity] 配置为空，跳过注册');
      return;
    }

    const configs = Array.isArray(newConfig) ? newConfig : [newConfig];

    configs.forEach((cfg) => {
      if (activityRegistry.has(cfg.activityType)) {
        console.warn(`[useAgentActivity] Activity 类型 "${cfg.activityType}" 已存在于注册表中，将被覆盖`);
      }

      activityRegistry.register(cfg);
      registeredTypesRef.value.add(cfg.activityType);
    });
  };

  // 手动取消注册方法
  const unregister = (activityTypes: string | string[]) => {
    const typeArray = Array.isArray(activityTypes) ? activityTypes : [activityTypes];

    typeArray.forEach((activityType) => {
      activityRegistry.unregister(activityType);
      registeredTypesRef.value.delete(activityType);
      autoRegisteredTypesRef.value.delete(activityType);
    });
  };

  // 检查是否已注册
  const isRegistered = (activityType: string) =>
    registeredTypesRef.value.has(activityType) || autoRegisteredTypesRef.value.has(activityType);

  // 获取所有已注册的 Activity 类型
  const getRegistered = () => Array.from(new Set([...registeredTypesRef.value, ...autoRegisteredTypesRef.value]));

  // 自动注册逻辑（当传入配置时）
  onMounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];

    configs.forEach((cfg) => {
      if (activityRegistry.has(cfg.activityType)) {
        console.warn(`[useAgentActivity] Activity 类型 "${cfg.activityType}" 已存在于注册表中，将被覆盖`);
      }

      activityRegistry.register(cfg);
      autoRegisteredTypesRef.value.add(cfg.activityType);
    });
  });

  onUnmounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];
    // 清理函数：取消注册自动注册的配置
    configs.forEach((cfg) => {
      activityRegistry.unregister(cfg.activityType);
      autoRegisteredTypesRef.value.delete(cfg.activityType);
    });
  });

  // 监听配置变化
  watch(
    () => config,
    (newConfig) => {
      // 如果配置发生变化，重新注册
      if (newConfig) {
        const configs = Array.isArray(newConfig) ? newConfig : [newConfig];

        // 先清理旧的自动注册
        autoRegisteredTypesRef.value.forEach((type) => {
          activityRegistry.unregister(type);
        });
        autoRegisteredTypesRef.value.clear();

        // 重新注册新的配置
        configs.forEach((cfg) => {
          activityRegistry.register(cfg);
          autoRegisteredTypesRef.value.add(cfg.activityType);
        });
      }
    },
    { deep: true },
  );

  return {
    register,
    unregister,
    isRegistered,
    getRegistered,
  };
}
