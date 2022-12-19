import { Ref, onMounted, onBeforeUnmount } from 'vue';

export default function useResizeObserver(
  container: Ref<HTMLElement>,
  callback: (data: [ResizeObserverEntry]) => void,
) {
  let containerObserver: ResizeObserver = null;

  const observeContainer = () => {
    if (!container || !container.value || !window || !window.ResizeObserver) {
      containerObserver?.unobserve(container.value);
      containerObserver?.disconnect();
    } else {
      containerObserver = new ResizeObserver(callback);
      containerObserver.observe(container.value);
    }
  };

  onMounted(() => {
    observeContainer();
  });

  onBeforeUnmount(() => {
    containerObserver?.unobserve(container.value);
    containerObserver?.disconnect();
  });
}
