export function useKeyboardEvent(handleChange: (e: Event) => void) {
  const keyboardEventListener = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      const { disabled } = (e.currentTarget as HTMLElement).querySelector('input');
      !disabled && handleChange(e);
    }
  };

  const onCheckboxFocus = (e: FocusEvent) => {
    e.currentTarget.addEventListener('keydown', keyboardEventListener);
  };

  const onCheckboxBlur = (e: FocusEvent) => {
    e.currentTarget.removeEventListener('keydown', keyboardEventListener);
  };

  return {
    onCheckboxFocus,
    onCheckboxBlur,
  };
}

export default useKeyboardEvent;
