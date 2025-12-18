import type { Component } from 'vue';
import { defineComponent, h } from 'vue';
import type { AgentToolcallConfig, AgentToolcallRegistry, ToolcallComponentProps } from './types';

/**
 * 全局 Agent Toolcall 注册表
 */
class AgentToolcallRegistryManager {
  private registry: AgentToolcallRegistry = {};

  // 添加组件渲染函数缓存（使用 defineComponent 来memoize Vue 组件）
  private renderFunctionCache = new Map<string, Component>();

  /**
   * 注册一个 Agent Toolcall
   */
  register<TArgs extends object = any, TResult = any, TResponse = any>(
    config: AgentToolcallConfig<TArgs, TResult, TResponse>,
  ): void {
    const existingConfig = this.registry[config.name];

    // 如果组件发生变化，清除旧的缓存
    if (existingConfig && existingConfig.component !== config.component) {
      this.renderFunctionCache.delete(config.name);
    }
    this.registry[config.name] = config;
    window.dispatchEvent(
      new CustomEvent('toolcall-registered', {
        detail: { name: config.name },
      }),
    );
  }

  /**
   * 获取指定名称的 Agent Toolcall 配置
   */
  get(name: string): AgentToolcallConfig | undefined {
    return this.registry[name];
  }

  /**
   * 获取或创建缓存的组件渲染函数
   */
  getRenderFunction(name: string): Component | null {
    const config = this.registry[name];
    if (!config) return null;

    // 检查缓存
    let memoizedComponent = this.renderFunctionCache.get(name);

    if (!memoizedComponent) {
      // 创建 Vue 组件的包装器并缓存
      memoizedComponent = defineComponent({
        name: `Memoized${name}`,
        props: {
          status: String,
          args: Object,
          result: [Object, String, Number, Boolean],
          error: Object,
          respond: Function,
          agentState: Object,
        },
        setup(props) {
          return () => h(config.component as Component, props);
        },
      });

      // 缓存组件
      this.renderFunctionCache.set(name, memoizedComponent);
    }

    return memoizedComponent;
  }

  /**
   * 获取所有已注册的 Agent Toolcall
   */
  getAll(): AgentToolcallRegistry {
    return { ...this.registry };
  }

  /**
   * 取消注册指定的 Agent Toolcall
   */
  unregister(name: string): void {
    delete this.registry[name];
    this.renderFunctionCache.delete(name);
  }

  /**
   * 清空所有注册的 Agent Toolcall
   */
  clear(): void {
    this.registry = {};
    this.renderFunctionCache.clear();
  }
}

// 导出单例实例
export const agentToolcallRegistry = new AgentToolcallRegistryManager();
