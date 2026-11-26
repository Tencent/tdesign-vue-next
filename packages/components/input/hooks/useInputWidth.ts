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
    // 当计算宽度为 auto 或空字符串时，设置为 0px 以避免在多选等场景下换行
    // 正常情况下 getComputedStyle 应该返回具体的像素值
    if (computedWidth === 'auto' || computedWidth === '') {
      inputRef.value.style.width = '0px';
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
