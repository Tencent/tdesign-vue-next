import { Ref, watch, onBeforeUnmount } from 'vue';

export default function useResizeObserver(
  container: Ref<HTMLElement>,
  callback: (data: ResizeObserverEntry[]) => void,
) {
  const isSupport = window && window.ResizeObserver;
  if (!isSupport) {
    const env = process.env.NODE_ENV;
    !['test-unit', 'test-snap'].includes(env) && console.warn('ResizeObserver is not supported in this browser');
    return;
  }

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
