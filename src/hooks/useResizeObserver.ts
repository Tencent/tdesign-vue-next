import { Ref, watch, onBeforeUnmount } from 'vue';

export default function useResizeObserver(
  container: Ref<HTMLElement>,
  callback: (data: ResizeObserverEntry[]) => void,
) {
  if (typeof window === 'undefined') return;

  const isSupport = window && (window as Window & typeof globalThis).ResizeObserver;
  // unit tests do not need any warn console; too many warns influence focusing on more important log info
  if (!isSupport) return;

  let containerObserver: ResizeObserver = null;

  const cleanupObserver = () => {
    if (!containerObserver) return;
    containerObserver.unobserve(container.value);
    containerObserver.disconnect();
    containerObserver = null;
  };

  const addObserver = (el: HTMLElement) => {
    containerObserver = new ResizeObserver(callback);
    containerObserver.observe(el);
  };

  if (container) {
    watch(
      container,
      (el) => {
        cleanupObserver();
        el && addObserver(el);
      },
      { immediate: true, flush: 'post' },
    );
  }

  onBeforeUnmount(() => {
    cleanupObserver();
  });
}
