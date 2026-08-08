import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { expect, vi } from 'vitest';

import { useKeyboard } from '@tdesign/components/radio/hooks';

function mountKeyboard(setValue = vi.fn()) {
  const TestComponent = defineComponent({
    setup() {
      const root = ref<HTMLElement>();
      useKeyboard(root, setValue);
      return () => (
        <label ref={root}>
          <input type="radio" data-value="1" />
          <span class="label">Radio</span>
        </label>
      );
    },
  });

  return { setValue, wrapper: mount(TestComponent) };
}

function dispatchKeyboard(target: Element, init: KeyboardEventInit) {
  const event = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(event);
  return event;
}

describe('Radio hooks', () => {
  describe('useKeyboard', () => {
    it('keydown[Enter/Space]', () => {
      const { setValue, wrapper } = mountKeyboard();
      const input = wrapper.get<HTMLInputElement>('input').element;

      input.dataset.value = '2';
      const enterEvent = dispatchKeyboard(wrapper.element, { key: 'Enter' });
      expect(enterEvent.defaultPrevented).toBe(true);
      expect(setValue).toHaveBeenLastCalledWith(2, { e: enterEvent });

      input.dataset.value = "'radio-value'";
      const spaceEvent = dispatchKeyboard(wrapper.element, { code: 'Space' });
      expect(spaceEvent.defaultPrevented).toBe(true);
      expect(setValue).toHaveBeenLastCalledWith('radio-value', { e: spaceEvent });
    });

    it('value[boolean]', () => {
      const { setValue, wrapper } = mountKeyboard();
      const input = wrapper.get<HTMLInputElement>('input').element;

      input.dataset.value = 'true';
      const trueEvent = dispatchKeyboard(wrapper.element, { code: 'Space' });
      expect(setValue).toHaveBeenLastCalledWith(true, { e: trueEvent });

      // Current behavior is tracked by #6882. The false mapping falls back to the original string.
      input.dataset.value = 'false';
      const falseEvent = dispatchKeyboard(wrapper.element, { code: 'Space' });
      expect(setValue).toHaveBeenLastCalledWith('false', { e: falseEvent });
    });

    it('allowUncheck[boolean]', () => {
      const { setValue, wrapper } = mountKeyboard();
      const input = wrapper.get<HTMLInputElement>('input').element;
      input.checked = true;
      input.dataset.allowUncheck = 'true';

      const event = dispatchKeyboard(wrapper.element, { code: 'Space' });
      expect(setValue).toHaveBeenCalledWith(undefined, { e: event });
    });

    it('other keys and targets', () => {
      const { setValue, wrapper } = mountKeyboard();

      const tabEvent = dispatchKeyboard(wrapper.element, { code: 'Tab', key: 'Tab' });
      expect(tabEvent.defaultPrevented).toBe(false);
      expect(setValue).not.toHaveBeenCalled();

      const labelEvent = dispatchKeyboard(wrapper.get('.label').element, { code: 'Space' });
      expect(labelEvent.defaultPrevented).toBe(false);
      expect(setValue).not.toHaveBeenCalled();
    });

    it('lifecycle', () => {
      const { setValue, wrapper } = mountKeyboard();
      const root = wrapper.element;

      wrapper.unmount();
      const event = dispatchKeyboard(root, { code: 'Space' });
      expect(event.defaultPrevented).toBe(false);
      expect(setValue).not.toHaveBeenCalled();
    });
  });
});
