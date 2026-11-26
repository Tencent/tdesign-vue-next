import { enableAutoUnmount, mount, flushPromises, type MountingOptions } from '@vue/test-utils';
import { afterAll, afterEach, vi } from 'vitest';
import { nextTick, type Component } from 'vue';

enableAutoUnmount(afterEach);

// List and Attachments create an observer on mount; API tests do not drive resize events.
if (typeof globalThis.ResizeObserver === 'undefined') {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  afterAll(async () => {
    // Attachments schedules observer creation in a frame; let it finish before restoring the dependency.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    vi.unstubAllGlobals();
  });
}

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
    await nextTick();
    await flushPromises();
  }
};
