import { onMounted, Ref, ref, watch, nextTick, onBeforeUnmount, toRefs } from 'vue';
import { useResizeObserver } from '@tdesign/shared-hooks';
import { InputValue, TdInputProps } from './../type';

const ANIMATION_TIME = 100;

export function useInputWidth(props: TdInputProps, inputRef: Ref<HTMLInputElement>, innerValue: Ref<InputValue>) {
  const { autoWidth, placeholder } = toRefs(props);
  const inputPreRef = ref<HTMLSpanElement>();
  const observerTimer = ref(null);

  const updateInputWidth = () => {
    if (!inputPreRef.value || !inputRef.value) return;
    // 使用 getComputedStyle 规避 transform 带来的影响
    const computedWidth = getComputedStyle(inputPreRef.value).width;
    // 当计算宽度为 auto 或无效值时，如果输入框没有内容，应设置为 0px 以避免换行
    if (computedWidth === 'auto' || !computedWidth) {
      inputRef.value.style.width = !innerValue.value && !placeholder.value ? '0px' : computedWidth;
    } else {
      inputRef.value.style.width = computedWidth;
    }
  };

  useResizeObserver(inputPreRef, () => {
    if (autoWidth.value) {
      observerTimer.value = setTimeout(() => {
        updateInputWidth();
        clearTimeout(observerTimer.value);
      }, ANIMATION_TIME);
    }
  });

  onBeforeUnmount(() => {
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
