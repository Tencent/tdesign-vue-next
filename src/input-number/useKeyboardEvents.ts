import { Ref } from 'vue';
import { TdInputNumberProps } from './type';

export default function useKeyboardEvents(props: TdInputNumberProps, innerValue: Ref<number>) {
  const handleKeydownEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    props.onEnter(innerValue.value, { e });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    props.onKeydown(innerValue.value, { e });
    handleKeydownEnter(e);
  };

  const handleKeyup = (e: KeyboardEvent) => {
    props.onKeyup(innerValue.value, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    props.onKeypress(innerValue.value, { e });
  };

  return {
    handleKeydownEnter,
    handleKeydown,
    handleKeyup,
    handleKeypress,
  };
}
