import { ref, toRefs } from 'vue';
import { TdTagInputProps } from './type';

export default function useHover(props: TdTagInputProps) {
  const { disabled, readonly, onMouseenter, onMouseleave } = toRefs(props);
  const isHover = ref<boolean>(false);

  const addHover = (context: Parameters<TdTagInputProps['onMouseenter']>[0]) => {
    if (readonly.value || disabled.value) return;
    isHover.value = true;
    onMouseenter.value?.(context);
  };

  const cancelHover = (context: Parameters<TdTagInputProps['onMouseleave']>[0]) => {
    if (readonly.value || disabled.value) return;
    isHover.value = false;
    onMouseleave.value?.(context);
  };

  return { isHover, addHover, cancelHover };
}
