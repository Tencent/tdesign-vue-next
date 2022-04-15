import { Ref } from 'vue';
import { useEmitEvent } from '../hooks/event';

export default function useKeyboardEvents(innerValue: Ref<number>) {
  const emitEvent = useEmitEvent();

  const handleKeydownEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    emitEvent('keydown-enter', innerValue.value, { e });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    emitEvent('keydown', innerValue.value, { e });
    handleKeydownEnter(e);
  };

  const handleKeyup = (e: KeyboardEvent) => {
    emitEvent('keyup', innerValue.value, { e });
  };

  const handleKeypress = (e: KeyboardEvent) => {
    emitEvent('keypress', innerValue.value, { e });
  };

  return {
    handleKeydownEnter,
    handleKeydown,
    handleKeyup,
    handleKeypress,
  };
}
