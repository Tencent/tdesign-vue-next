import { onBeforeUnmount, onMounted, Ref, unref } from 'vue';

/**
 * 用于订阅Listener事件
 * @param updateSize
 */
export function useListener(type: string, listener: () => void): void {
  onMounted(() => {
    window.addEventListener(type, listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener(type, listener);
  });
}

export function useResize(listener: () => void, observer?: HTMLElement | Ref<HTMLElement>) {
  useListener('resize', listener);

  let resizeObserver: ResizeObserver = null;

  onMounted(() => {
    // 调用方常在 setup 阶段传入 ref.value，此时元素还没挂载，取到的是 undefined。
    // 挂载后再解一次，才能拿到真实元素。
    const target = unref(observer);
    if (!window.ResizeObserver || !target) return;
    resizeObserver = new window.ResizeObserver(listener);
    resizeObserver.observe(target);
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
  });
}
