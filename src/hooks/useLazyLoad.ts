import { ref, onMounted, computed, nextTick, Ref, UnwrapRef } from 'vue';
import observe from '../_common/js/utils/observe';
import { isServer } from '../utils/dom';

export type UseLazyLoadParams = UnwrapRef<{
  type: 'lazy' | 'virtual';
  rowHeight?: number;
  bufferSize?: number;
}>;

export default function useLazyLoad(
  containerRef: Ref<HTMLElement>,
  childRef: Ref<HTMLElement>,
  params: UseLazyLoadParams,
) {
  const tRowHeight = computed(() => Math.max(params.rowHeight || 48, 48));
  const isInit = ref(false);
  const hasLazyLoadHolder = computed(() => params?.type === 'lazy' && !isInit.value);

  const requestAnimationFrame = (!isServer && window.requestAnimationFrame) || ((cb) => setTimeout(cb, 16.6));

  const init = () => {
    if (!isInit.value) {
      requestAnimationFrame(() => {
        isInit.value = true;
      });
    }
  };

  onMounted(() => {
    if (params?.type !== 'lazy') return;
    nextTick(() => {
      const bufferSize = Math.max(10, params.bufferSize || 10);
      const height = tRowHeight.value * bufferSize;
      observe(childRef.value, containerRef.value, init, height);
    });
  });

  return {
    hasLazyLoadHolder,
    tRowHeight,
  };
}
