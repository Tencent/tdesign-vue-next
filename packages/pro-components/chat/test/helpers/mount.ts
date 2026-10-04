import { mount, type MountingOptions } from '@vue/test-utils';
import type { Component } from 'vue';

/**
 * chat 组件统一挂载入口。
 *
 * 统一处理：挂载到真实 document（保证自定义元素 / 观察器行为一致），
 * 避免各处用例重复书写环境相关配置。
 */
export const mountChat = <T extends Component>(component: T, options: MountingOptions<any> = {}) =>
  mount(
    component as any,
    {
      attachTo: document.body,
      ...(options as any),
      global: {
        ...((options as any).global || {}),
      },
    } as any,
  );

/** 等待一个 tick（含微任务 + 可能的异步渲染） */
export const flush = async (times = 2) => {
  for (let i = 0; i < times; i += 1) {
    await Promise.resolve();
  }
};

/**
 * 读取组件实例上暴露的 API（expose / ref）。
 * 用于验证「组合类 API」在迁移前后保持一致。
 */
export const exposedKeysOf = (instance: any): string[] => {
  const source = instance?.$.exposed || instance?.exposed || {};
  const keys = Object.keys(source).filter((key) => !key.startsWith('$'));
  return keys.sort();
};
