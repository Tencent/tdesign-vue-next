import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue';

import observe from '../../_common/js/utils/observe';

export function useCheckboxLazyLoad(labelRef: Ref<HTMLElement>, lazyLoad: Ref<boolean>) {
  const ioObserver = ref<IntersectionObserver>();
  const showCheckbox = ref(true);
  const handleLazyLoad = () => {
    if (!lazyLoad.value) return;
    showCheckbox.value = false;
    const io = observe(
      labelRef.value,
      null,
      () => {
        showCheckbox.value = true;
      },
      0,
    );
    ioObserver.value = io;
  };

  onMounted(handleLazyLoad);

  watch([lazyLoad, labelRef], handleLazyLoad);

  onBeforeUnmount(() => {
    if (!lazyLoad.value) return;
    ioObserver.value.unobserve(labelRef.value);
  });

  return {
    showCheckbox,
  };
}

export default useCheckboxLazyLoad;
