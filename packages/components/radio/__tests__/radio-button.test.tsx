import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';

import { RadioButton, RadioGroup } from '@tdesign/components/radio';
import type { RadioProps } from '@tdesign/components/radio';

const RADIO_BUTTON = '.t-radio-button';
const INPUT = 'input.t-radio-button__former';
const LABEL = '.t-radio-button__label';

describe('RadioButton', () => {
  describe('props', () => {
    it(':allowUncheck[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { allowUncheck: true, modelValue: true, onChange },
      });

      expect(wrapper.get(INPUT).attributes('data-allow-uncheck')).toBe('true');
      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onChange).toHaveBeenCalledWith(false, { e: expect.any(MouseEvent) });
    });

    // Current behavior is tracked by #6844. RadioButton forwards undefined modelValue and overrides checked state.
    it(':checked[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { checked: true, onChange },
      });

      expect(wrapper.get(RADIO_BUTTON).classes()).not.toContain('t-is-checked');
      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });
      expect(wrapper.get(RADIO_BUTTON).classes()).not.toContain('t-is-checked');
    });

    // Current behavior is tracked by #6844. The forwarded undefined modelValue also takes priority over defaultChecked.
    it(':defaultChecked[boolean]', () => {
      const wrapper = mount(RadioButton, {
        props: { defaultChecked: true },
      });
      expect(wrapper.get(RADIO_BUTTON).classes()).not.toContain('t-is-checked');
    });

    it(':modelValue[boolean]', async () => {
      const wrapper = mount(RadioButton, {
        props: { modelValue: true },
      });

      expect(wrapper.get(RADIO_BUTTON).classes()).toContain('t-is-checked');
      await wrapper.setProps({ modelValue: false });
      expect(wrapper.get(RADIO_BUTTON).classes()).not.toContain('t-is-checked');
    });

    it(':default[string]', () => {
      const wrapper = mount(RadioButton, {
        props: { default: 'Default content' },
      });
      expect(wrapper.get(LABEL).text()).toBe('Default content');
    });

    it(':default[slot/function]', () => {
      const functionWrapper = mount(RadioButton, {
        props: { default: () => <span class="function-content">Function content</span> },
      });
      expect(functionWrapper.get('.function-content').text()).toBe('Function content');

      const slotWrapper = mount(RadioButton, {
        slots: { default: () => <span class="slot-content">Slot content</span> },
      });
      expect(slotWrapper.get('.slot-content').text()).toBe('Slot content');
    });

    it(':disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { disabled: true, onChange },
      });

      expect(wrapper.get(RADIO_BUTTON).classes()).toContain('t-is-disabled');
      expect(wrapper.get(INPUT).attributes('disabled')).toBeDefined();
      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':label[string]', () => {
      const wrapper = mount(RadioButton, {
        props: { label: 'Label content' },
      });
      expect(wrapper.get(LABEL).text()).toBe('Label content');
    });

    it(':label[slot/function]', () => {
      const functionWrapper = mount(RadioButton, {
        props: { label: () => <span class="function-label">Function label</span> },
      });
      expect(functionWrapper.get('.function-label').text()).toBe('Function label');

      const slotWrapper = mount(RadioButton, {
        slots: { label: () => <span class="slot-label">Slot label</span> },
      });
      expect(slotWrapper.get('.slot-label').text()).toBe('Slot label');

      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const objectSlotWrapper = mount(RadioButton, {
        props: {
          label: {
            default: () => <span class="object-slot-label">Object slot label</span>,
          } as unknown as RadioProps['label'],
        },
      });
      expect(objectSlotWrapper.get('.object-slot-label').text()).toBe('Object slot label');
      warn.mockRestore();
    });

    it(':name[string]', () => {
      const wrapper = mount(RadioButton, {
        props: { name: 'radio-button-name' },
      });
      expect(wrapper.get(INPUT).attributes('name')).toBe('radio-button-name');
    });

    it(':readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { onChange, readonly: true },
      });

      expect(wrapper.get(INPUT).attributes('readonly')).toBeDefined();
      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':value[string/number/boolean]', async () => {
      const wrapper = mount(
        <RadioGroup value="second">
          <RadioButton value="first">First</RadioButton>
          <RadioButton value="second" data-testid="second-button">
            Second
          </RadioButton>
        </RadioGroup>,
      );
      const buttons = wrapper.findAll(RADIO_BUTTON);

      expect(buttons).toHaveLength(2);
      expect(buttons[0].classes()).not.toContain('t-is-checked');
      expect(buttons[1].classes()).toContain('t-is-checked');
      expect(buttons[1].attributes('data-testid')).toBe('second-button');
      expect(buttons[1].get<HTMLInputElement>(INPUT).element.value).toBe('second');

      const numberWrapper = mount(RadioButton, { props: { value: 1 } });
      expect(numberWrapper.get(INPUT).attributes('data-value')).toBe('1');

      const booleanWrapper = mount(RadioButton, { props: { value: false } });
      expect(booleanWrapper.get(INPUT).attributes('data-value')).toBe('false');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { onChange, value: 'button' },
      });

      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });

      const groupChange = vi.fn();
      const groupWrapper = mount(
        <RadioGroup value="first" onChange={groupChange}>
          <RadioButton value="first">First</RadioButton>
          <RadioButton value="second">Second</RadioButton>
        </RadioGroup>,
      );
      await groupWrapper.findAll(RADIO_BUTTON)[1].trigger('click');
      expect(groupChange).toHaveBeenCalledWith('second', {
        e: expect.any(MouseEvent),
        name: '',
      });
    });

    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(RadioButton, {
        props: { onClick },
      });

      await wrapper.get(RADIO_BUTTON).trigger('click');
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(RadioButton, {
        attrs: { onFocus },
      });

      await wrapper.get(INPUT).trigger('focus');
      expect(onFocus).not.toHaveBeenCalled();
    });
  });
});
