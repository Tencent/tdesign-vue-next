import useResizeObserver from '../hooks/useResizeObserver';
import { onMounted, Ref, ref, watch, nextTick, onBeforeUnmount, toRefs } from 'vue';
import { InputValue, TdInputProps } from './type';

const ANIMATION_TIME = 100;

export default function useInputWidth(
  props: TdInputProps,
  inputRef: Ref<HTMLInputElement>,
  innerValue: Ref<InputValue>,
) {
  const { autoWidth, placeholder } = toRefs(props);
  const inputPreRef = ref<HTMLSpanElement>(null);
  const observerTimer = ref(null);

  const updateInputWidth = () => {
    if (!inputPreRef.value || !inputRef.value) return;
    // 使用 offsetWidth，会丢失精度，但是在配合 transform 的场景下，不会受到 scale 影响从而设置到错误的宽度
    const width = inputPreRef.value.offsetWidth;
    inputRef.value.style.width = `${width || 0}px`;
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
