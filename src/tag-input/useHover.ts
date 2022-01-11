import { ref } from 'vue';
import { TdTagInputProps } from './type';

export default function useHover(props: TdTagInputProps) {
  const isHoverRef = ref<boolean>(false);

  const onRootMouseenter = (context: Parameters<TdTagInputProps['onMouseenter']>[0]) => {
    isHoverRef.value = true;
    props.onMouseenter?.(context);
  };

  const onRootMouseleave = (context: Parameters<TdTagInputProps['onMouseleave']>[0]) => {
    isHoverRef.value = false;
    props.onMouseleave?.(context);
  };

  return { isHoverRef, onRootMouseenter, onRootMouseleave };
}
