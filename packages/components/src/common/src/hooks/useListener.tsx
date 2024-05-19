import { onBeforeUnmount, onMounted } from 'vue';

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

export function useResize(listener: () => void, observer?: HTMLElement) {
  useListener('resize', listener);

  let resizeObserver: ResizeObserver = null;

  onMounted(() => {
    if (!window.ResizeObserver || !observer) return;
    resizeObserver = new window.ResizeObserver(listener);
    resizeObserver.observe(observer);
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
  });
}
