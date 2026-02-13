import type { Component } from 'vue';
import { h, defineComponent } from 'vue';

/**
 * 基础配置接口 - 所有注册配置必须包含组件
 */
export interface BaseConfig {
  component: Component;
}

/**
 * Registry 配置选项
 */
export interface RegistryOptions<TConfig extends BaseConfig> {
  /** 从配置中获取唯一标识符的函数 */
  getKey: (config: TConfig) => string;
  /** 注册事件名称 */
  eventName: string;
  /** 事件 detail 中的键名 */
  eventDetailKey: string;
}

/**
 * 泛型 Registry 管理器接口
 */
export interface IRegistryManager<TConfig extends BaseConfig, TProps> {
  register(config: TConfig): boolean;
  get(key: string): TConfig | undefined;
  getRenderFunction(key: string): Component | null;
  getAll(): Record<string, TConfig>;
  unregister(key: string): void;
  clear(): void;
  has(key: string): boolean;
  getRegisteredKeys(): string[];
}

/**
 * 创建泛型 Registry 管理器
 * 用于统一管理 Activity 和 Toolcall 的注册逻辑
 */
export function createRegistryManager<TConfig extends BaseConfig, TProps>(
  options: RegistryOptions<TConfig>,
): IRegistryManager<TConfig, TProps> {
  const { getKey, eventName, eventDetailKey } = options;

  // 内部状态
  const registry: Record<string, TConfig> = {};
  const renderFunctionCache = new Map<string, Component>();

  return {
    /**
     * 注册配置
     * @returns 是否成功注册（如果已存在相同配置则返回 false）
     */
    register(config: TConfig): boolean {
      const key = getKey(config);
      const existingConfig = registry[key];

      // 如果已存在且组件相同，跳过注册（真正的防重复）
      if (existingConfig && existingConfig.component === config.component) {
        return false;
      }

      // 如果组件发生变化，清除旧的缓存
      if (existingConfig) {
        renderFunctionCache.delete(key);
      }

      registry[key] = config;

      // 只在真正有变化时触发注册事件
      window.dispatchEvent(
        new CustomEvent(eventName, {
          detail: { [eventDetailKey]: key },
        }),
      );

      return true;
    },

    /**
     * 获取指定 key 的配置
     */
    get(key: string): TConfig | undefined {
      return registry[key];
    },

    /**
     * 获取或创建缓存的组件渲染函数
     */
    getRenderFunction(key: string): Component | null {
      const config = registry[key];
      if (!config) return null;

      let cachedComponent = renderFunctionCache.get(key);

      if (!cachedComponent) {
        // 创建包装组件，Vue3 会自动处理组件的缓存和优化
        cachedComponent = defineComponent({
          name: `Cached_${key}`,
          setup(props) {
            return () => h(config.component, props);
          },
        });

        // 缓存组件
        renderFunctionCache.set(key, cachedComponent);
      }

      return cachedComponent;
    },

    /**
     * 获取所有已注册的配置
     */
    getAll(): Record<string, TConfig> {
      return { ...registry };
    },

    /**
     * 取消注册
     */
    unregister(key: string): void {
      delete registry[key];
      renderFunctionCache.delete(key);
    },

    /**
     * 清空所有注册
     */
    clear(): void {
      Object.keys(registry).forEach((key) => delete registry[key]);
      renderFunctionCache.clear();
    },

    /**
     * 检查指定 key 是否已注册
     */
    has(key: string): boolean {
      return key in registry;
    },

    /**
     * 获取所有已注册的 key
     */
    getRegisteredKeys(): string[] {
      return Object.keys(registry);
    },
  };
}
