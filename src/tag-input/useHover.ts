import { ref } from 'vue';
import { TdTagInputProps } from './type';

export default function useHover(props: TdTagInputProps) {
  const isHover = ref<boolean>(false);

  const addHover = (context: Parameters<TdTagInputProps['onMouseenter']>[0]) => {
    if (props.readonly || props.disabled) return;
    isHover.value = true;
    props.onMouseenter?.(context);
  };

  const cancelHover = (context: Parameters<TdTagInputProps['onMouseleave']>[0]) => {
    if (props.readonly || props.disabled) return;
    isHover.value = false;
    props.onMouseleave?.(context);
  };

  return { isHover, addHover, cancelHover };
}
