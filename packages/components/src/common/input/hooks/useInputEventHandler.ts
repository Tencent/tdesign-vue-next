import type { Ref } from '@td/adapter-vue';
import type { TdInputProps } from '@td/intel/components/input/type';
import { getOutputValue } from './useInput';
import { useEmitEvent } from '@td/adapter-hooks';


export default function useInputEventHandler(props: TdInputProps, isHover: Ref<Boolean>) {
  const emitEvent = useEmitEvent()

  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const { code } = e;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    if (/enter/i.test(code) || /enter/i.test(e.key)) {
      emitEvent('enter', tmpValue, { e })
    } else {
      emitEvent('keydown', tmpValue, { e })
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    emitEvent('keyup', tmpValue, { e })
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const tmpValue = getOutputValue((e.currentTarget as HTMLInputElement).value, props.type);
    emitEvent('keypress', tmpValue, { e })
  };

  const onHandlePaste = (e: ClipboardEvent) => {
    if (props.disabled) return;
    // @ts-ignore
    const clipData = e.clipboardData || window.clipboardData;
    emitEvent('paste', { e, pasteValue: clipData?.getData('text/plain') })
  };

  const mouseEvent = (v: boolean) => (isHover.value = v);

  const onHandleMousewheel = (e: WheelEvent) => emitEvent('wheel', { e });

  const onInputMouseenter = (e: MouseEvent) => {
    mouseEvent(true);
    emitEvent('mouseenter', { e });
  };

  const onInputMouseleave = (e: MouseEvent) => {
    mouseEvent(false);
    emitEvent('mouseleave', { e });
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
