import { CHECKED_CODE_REG } from '@td/shared/_common/js/common';

export function useKeyboardEvent(handleChange: (e: Event) => void) {
  const keyboardEventListener = (e: KeyboardEvent) => {
    const isCheckedCode = CHECKED_CODE_REG.test(e.key) || CHECKED_CODE_REG.test(e.code);
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
