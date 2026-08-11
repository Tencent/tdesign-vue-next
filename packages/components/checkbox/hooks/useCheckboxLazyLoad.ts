import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue';
import observe from '@tdesign/common-js/utils/observe';

export function useCheckboxLazyLoad(labelRef: Ref<HTMLElement>, lazyLoad: Ref<boolean>) {
  const ioObserver = ref<IntersectionObserver>();
  const showCheckbox = ref(true);
  const clearObserver = () => {
    if (ioObserver.value && labelRef.value) {
      ioObserver.value.unobserve(labelRef.value);
    }
    ioObserver.value = undefined;
  };
  const handleLazyLoad = () => {
    clearObserver();
    if (!lazyLoad.value) {
      showCheckbox.value = true;
      return;
    }
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

  onBeforeUnmount(clearObserver);

  return {
    showCheckbox,
  };
}

export default useCheckboxLazyLoad;
