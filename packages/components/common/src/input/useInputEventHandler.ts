import { Ref } from '@td/adapter-vue';
import { TdInputProps } from '@td/intel/input/type';
import { getOutputValue } from './useInput';

export default function useInputEventHandler(props: TdInputProps, isHover: Ref<Boolean>) {
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const { code } = e;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    if (/enter/i.test(code) || /enter/i.test(e.key)) {
      props.onEnter?.(tmpValue, { e });
    } else {
      props.onKeydown?.(tmpValue, { e });
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    props.onKeyup?.(tmpValue, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    props.onKeypress?.(tmpValue, { e });
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
    isHover,
    handleKeydown,
    handleKeyUp,
    handleKeypress,
    onHandlePaste,
    onHandleMousewheel,
    onInputMouseenter,
    onInputMouseleave,
  };
}
