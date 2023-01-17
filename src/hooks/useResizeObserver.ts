import type { Ref } from 'vue';
import { watch } from 'vue';

export default function useResizeObserver(
  container: Ref<HTMLElement>,
  callback: (data: ResizeObserverEntry[]) => void,
) {
  const isSupport = window && window.ResizeObserver;
  if (!isSupport) {
    console.warn('ResizeObserver is not supported in this browser');
    return;
  }

  let ro: ResizeObserver = null;

  const cleanupObserver = () => {
    if (ro) {
      ro.disconnect();
      ro = null;
    }
  };

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
