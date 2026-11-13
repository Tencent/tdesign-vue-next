import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue';
import observe from '@tdesign/common-js/utils/observe';

export function useElementLazyRender(labelRef: Ref<HTMLElement>, lazyLoad: Ref<boolean>) {
  const ioObserver = ref<IntersectionObserver>();
  const showElement = ref(true);

  const handleLazyLoad = () => {
    if (!lazyLoad.value || !labelRef.value || ioObserver.value) return;
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

  // watch 必须无条件注册：lazyLoad 可能在挂载后才被打开，
  // 条件注册会让这条路径永远不生效。
  watch([lazyLoad, labelRef], handleLazyLoad);

  onBeforeUnmount(() => {
    if (!lazyLoad.value) return;
    ioObserver.value?.unobserve?.(labelRef.value);
  });

  return {
    showElement,
  };
}

export default useElementLazyRender;
