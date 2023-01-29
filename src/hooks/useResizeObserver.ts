import type { Ref } from 'vue';
import { watch } from 'vue';

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

  let ro: ResizeObserver = null;

  const cleanupObserver = () => {
    if (ro) {
      ro.disconnect();
      ro = null;
    }
  };

  container &&
    watch(
      container,
      (el) => {
        cleanupObserver();
        if (el) {
          ro = new ResizeObserver(callback);
          ro.observe(el);
        }
      },
      {
        immediate: true,
        flush: 'post',
      },
    );
}
