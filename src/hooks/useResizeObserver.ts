import { Ref, onMounted, onBeforeUnmount, watch } from 'vue';

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
      containerObserver.observe(container.value);
    }
  };

  watch([container], () => {
    observeContainer();
  });

  onMounted(() => {
    if (window?.ResizeObserver !== undefined) {
      containerObserver = new ResizeObserver(callback);
    }
  });

  onBeforeUnmount(() => {
    containerObserver?.unobserve(container.value);
    containerObserver?.disconnect();
  });
}
