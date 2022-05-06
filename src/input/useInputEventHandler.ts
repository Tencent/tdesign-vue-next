import { Ref } from 'vue';
import { InputValue, TdInputProps } from './type';

export default function useInputEventHandler(props: TdInputProps, isHover: Ref<Boolean>, innerValue: Ref<InputValue>) {
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const { code } = e;
    if (code === 'Enter' || code === 'NumpadEnter') {
      props.onEnter?.(innerValue.value, { e });
    } else {
      props.onKeydown?.(innerValue.value, { e });
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (props.disabled) return;
    props.onKeyup?.(innerValue.value, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (props.disabled) return;
    props.onKeypress?.(innerValue.value, { e });
  };

  const onHandlePaste = (e: ClipboardEvent) => {
    if (props.disabled) return;
    // @ts-ignore
    const clipData = e.clipboardData || window.clipboardData;
    props.onPaste?.({ e, pasteValue: clipData?.getData('text/plain') });
  };

  const mouseEvent = (v: boolean) => (isHover.value = v);

  const onHandleMousewheel = (e: WheelEvent) => props.onWheel?.({ e });

  const onInputMouseenter = (e: MouseEvent) => {
    mouseEvent(true);
    props.onMouseenter?.({ e });
  };

  const onInputMouseleave = (e: MouseEvent) => {
    mouseEvent(false);
    props.onMouseleave?.({ e });
  };

  return {
    handleKeydown,
    handleKeyUp,
    handleKeypress,
    onHandlePaste,
    onHandleMousewheel,
    onInputMouseenter,
    onInputMouseleave,
  };
}
