import { onMounted, Ref, ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { InputValue, TdInputProps } from './type';

export default function useInputWidth(
  props: TdInputProps,
  inputRef: Ref<HTMLInputElement>,
  innerValue: Ref<InputValue>,
) {
  const inputPreRef = ref<HTMLSpanElement>(null);

  const composing = ref(false);
  const updateInputWidth = () => {
    if (!inputPreRef.value) return;
    const width = inputPreRef.value.offsetWidth;
    if (width === 0) return;
    inputRef.value.style.width = `${width}px`;
  };

  const addListeners = () => {
    watch(
      () => innerValue.value + props.placeholder,
      () => {
        if (!props.autoWidth) return;
        nextTick(() => {
          updateInputWidth();
        });
      },
      { immediate: true },
    );
  };

  onMounted(() => {
    composing.value = false;
    if (props.autoWidth) {
      addListeners();
    }
  });

  const resizeObserver = ref<ResizeObserver>(null);
  // 当元素默认为 display: none 状态，无法提前准确计算宽度，因此需要监听元素宽度变化。比如：Tabs 场景切换。
  const addTableResizeObserver = (element: Element) => {
    // IE 11 以下使用设置 minWidth 兼容；IE 11 以上使用 ResizeObserver
    if (typeof window.ResizeObserver === 'undefined' || !element) return;
    resizeObserver.value = new window.ResizeObserver(() => {
      updateInputWidth();
    });
    resizeObserver.value.observe(element);
  };

  onMounted(() => {
    addTableResizeObserver(inputPreRef.value);
  });

  onBeforeUnmount(() => {
    resizeObserver.value?.unobserve(inputPreRef.value);
    resizeObserver.value?.disconnect();
  });

  return {
    inputPreRef,
  };
}
