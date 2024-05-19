import { onBeforeUnmount, watch } from '@td/adapter-vue';
import type { Ref } from '@td/adapter-vue';

export function useResizeObserver(
  container: Ref<HTMLElement>,
  callback: (data: ResizeObserverEntry[]) => void,
) {
  const isSupport = typeof window !== 'undefined' && window.ResizeObserver;
  // unit tests do not need any warn console; too many warns influence focusing on more important log info
  if (!isSupport) {
    return;
  }

  let containerObserver: ResizeObserver = null;

  const cleanupObserver = () => {
    if (!containerObserver || !container.value) {
      return;
    }
    containerObserver.unobserve(container.value);
    containerObserver.disconnect();
    containerObserver = null;
  };

  const addObserver = (el: HTMLElement) => {
    containerObserver = new ResizeObserver(callback);
    containerObserver.observe(el);
  };

  // can not use container.value to judge
  container
  && watch(
    container,
    (el) => {
      cleanupObserver();
      el && addObserver(el);
    },
    { immediate: true, flush: 'post' },
  );

  onBeforeUnmount(() => {
    cleanupObserver();
  });
}
