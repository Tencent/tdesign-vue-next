import { ref } from '@td/adapter-vue';

export interface UseHoverParams {
  readonly: boolean;
  disabled: boolean;
  onMouseenter: (context: { e: MouseEvent }) => void;
  onMouseleave: (context: { e: MouseEvent }) => void;
}

export default function useHover(props: UseHoverParams) {
  const { disabled, readonly, onMouseenter, onMouseleave } = props;
  const isHover = ref<boolean>(false);

  const addHover = (context: { e: MouseEvent }) => {
    if (readonly || disabled) return;
    isHover.value = true;
    onMouseenter?.(context);
  };

  const cancelHover = (context: { e: MouseEvent }) => {
    if (readonly || disabled) return;
    isHover.value = false;
    onMouseleave?.(context);
  };

  return { isHover, addHover, cancelHover };
}
