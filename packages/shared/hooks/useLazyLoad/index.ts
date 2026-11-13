import { ref, onMounted, onBeforeUnmount, computed, nextTick, Ref, UnwrapRef } from 'vue';
import observe from '@tdesign/common-js/utils/observe';
import { isServer } from '@tdesign/shared-utils';

export type UseLazyLoadParams = UnwrapRef<{
  type: 'lazy' | 'virtual';
  rowHeight?: number;
  bufferSize?: number;
}>;

export function useLazyLoad(containerRef: Ref<HTMLElement>, childRef: Ref<HTMLElement>, params: UseLazyLoadParams) {
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

  let io: IntersectionObserver = null;

  onMounted(() => {
    if (params?.type !== 'lazy') return;
    nextTick(() => {
      const bufferSize = Math.max(10, params.bufferSize || 10);
      const height = tRowHeight.value * bufferSize;
      if (!childRef?.value || !containerRef?.value) return;
      io = observe(childRef.value, containerRef.value, init, height);
    });
  });

  // 元素在卸载前始终没有进入视口时，observe 内部的 unobserve 不会执行，
  // observer 会一直持有 DOM 引用，需要在卸载时主动断开。
  onBeforeUnmount(() => {
    io?.disconnect?.();
    io = null;
  });

  return {
    hasLazyLoadHolder,
    tRowHeight,
  };
}
