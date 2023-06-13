import { Ref } from 'vue';
import { TdInputProps } from './type';

export default function useInputEventHandler(props: TdInputProps, isHover: Ref<Boolean>) {
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return;
    const { code } = e;
    if (/enter/i.test(code) || /enter/i.test(e.key)) {
      props.onEnter?.((e.currentTarget as HTMLInputElement).value, { e });
    } else {
      props.onKeydown?.((e.currentTarget as HTMLInputElement).value, { e });
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (props.disabled) return;
    props.onKeyup?.((e.currentTarget as HTMLInputElement).value, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (props.disabled) return;
    props.onKeypress?.((e.currentTarget as HTMLInputElement).value, { e });
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
