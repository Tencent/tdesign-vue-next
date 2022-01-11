import { ref } from 'vue';
import { TdTagInputProps } from './type';

export default function useHover(props: TdTagInputProps) {
  const isHoverRef = ref<boolean>(false);

  const addHover = (context: Parameters<TdTagInputProps['onMouseenter']>[0]) => {
    if (props.readonly || props.disabled) return;
    isHoverRef.value = true;
    props.onMouseenter?.(context);
  };

  const cancelHover = (context: Parameters<TdTagInputProps['onMouseleave']>[0]) => {
    if (props.readonly || props.disabled) return;
    isHoverRef.value = false;
    props.onMouseleave?.(context);
  };

  return { isHoverRef, addHover, cancelHover };
}
