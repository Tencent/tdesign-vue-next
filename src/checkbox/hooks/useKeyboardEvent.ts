export const CHECKED_CODE = ['Enter', 'Space'];

export function useKeyboardEvent(handleChange: (e: Event) => void) {
  const keyboardEventListener = (e: KeyboardEvent) => {
    const isCheckedCode = CHECKED_CODE.includes(e.key) || CHECKED_CODE.includes(e.code);
    if (isCheckedCode) {
      e.preventDefault();
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
