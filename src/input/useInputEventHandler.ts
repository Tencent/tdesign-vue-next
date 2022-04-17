import { Ref } from 'vue';
import { useEmitEvent } from '../hooks/event';
import { InputValue, TdInputProps } from './type';

export default function useInputEventHandler(props: TdInputProps, isHover: Ref<Boolean>, innerValue: Ref<InputValue>) {
  const emitEvent = useEmitEvent();

  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const { code } = e;
    if (code === 'Enter' || code === 'NumpadEnter') {
      emitEvent('enter', innerValue.value, { e });
    } else {
      emitEvent('keydown', innerValue.value, { e });
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (props.disabled) return;
    emitEvent('keyup', innerValue.value, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (props.disabled) return;
    emitEvent('keypress', innerValue.value, { e });
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
