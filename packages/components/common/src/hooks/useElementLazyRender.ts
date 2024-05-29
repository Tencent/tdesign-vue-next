import type { Ref } from '@td/adapter-vue';
import { onBeforeUnmount, onMounted, ref, watch } from '@td/adapter-vue';
import observe from '@td/common/js/utils/observe';

export function useElementLazyRender(labelRef: Ref<HTMLElement>, lazyLoad: Ref<boolean>) {
  const ioObserver = ref<IntersectionObserver>();
  const showElement = ref(true);

  const handleLazyLoad = () => {
    if (!lazyLoad.value || !labelRef.value || ioObserver.value) {
      return;
    }
    showElement.value = false;
    const io = observe(
      labelRef.value,
      null,
      () => {
        showElement.value = true;
      },
      10,
    );
    ioObserver.value = io;
  };

  onMounted(handleLazyLoad);

  lazyLoad.value && watch([lazyLoad, labelRef], handleLazyLoad);

  onBeforeUnmount(() => {
    if (!lazyLoad.value) {
      return;
    }
    ioObserver.value?.unobserve?.(labelRef.value);
  });

  return {
    showElement,
  };
}

export default useElementLazyRender;
