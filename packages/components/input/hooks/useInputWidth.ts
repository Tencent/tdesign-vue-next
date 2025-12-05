import { onMounted, Ref, ref, watch, nextTick, onBeforeUnmount, toRefs } from 'vue';
import { useResizeObserver } from '@tdesign/shared-hooks';
import { InputValue, TdInputProps } from './../type';
import { useIntersectionObserver } from '@vueuse/core';

const ANIMATION_TIME = 100;

export function useInputWidth(props: TdInputProps, inputRef: Ref<HTMLInputElement>, innerValue: Ref<InputValue>) {
  const { autoWidth, placeholder } = toRefs(props);
  const inputPreRef = ref<HTMLSpanElement>(null);
  const observerTimer = ref(null);

  const updateInputWidth = () => {
    if (!inputPreRef.value || !inputRef.value) return;
    // 使用 getComputedStyle 规避 transform 带来的影响
    inputRef.value.style.width = getComputedStyle(inputPreRef.value).width;
  };

  useResizeObserver(inputPreRef, () => {
    if (autoWidth.value) {
      observerTimer.value = setTimeout(() => {
        updateInputWidth();
        clearTimeout(observerTimer.value);
      }, ANIMATION_TIME);
    }
  });

  const { stop } = useIntersectionObserver(inputPreRef, ([{ isIntersecting }]) => {
    // 当 dom 元素不存在于文档流时，getComputedStyle 会得到 width === ''
    // width === '' 会使得 input 恢复到默认的宽度，在 auto-width 的 fit-content 模式下，这会导致宽度异常
    // 因此当元素重新出现在可视区域内时，触发一次计算
    if (isIntersecting && props.autoWidth) {
      nextTick(() => {
        updateInputWidth();
      });
    }
  });

  onBeforeUnmount(() => {
    stop();
    clearTimeout(observerTimer.value);
  });

  const addListeners = () => {
    watch(
      [innerValue, placeholder],
      () => {
        if (!autoWidth.value) return;
        nextTick(() => {
          updateInputWidth();
        });
      },
      { immediate: true },
    );
  };

  onMounted(() => {
    if (autoWidth.value) {
      addListeners();
    }
  });

  return {
    inputPreRef,
  };
}
