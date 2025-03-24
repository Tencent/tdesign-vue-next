import { onMounted, Ref, ref, watch, nextTick, onBeforeUnmount, toRefs } from 'vue';
import useResizeObserver from '../../hooks/useResizeObserver';
import { InputValue, TdInputProps } from './../type';

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
