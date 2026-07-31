import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, expect, vi } from 'vitest';

import Radio from '@tdesign/components/radio';

const RADIO = '.t-radio';
const INPUT = 'input.t-radio__former';
const LABEL = '.t-radio__label';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Radio', () => {
  describe('props', () => {
    it(':allowUncheck[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Radio, {
        props: { checked: true, onChange },
      });

      expect(wrapper.get(INPUT).attributes('data-allow-uncheck')).toBeUndefined();
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.setProps({ allowUncheck: true });
      expect(wrapper.get(INPUT).attributes('data-allow-uncheck')).toBe('true');
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).toHaveBeenCalledWith(false, { e: expect.any(MouseEvent) });

      const uncheckedChange = vi.fn();
      const uncheckedWrapper = mount(Radio, {
        props: { allowUncheck: true, onChange: uncheckedChange },
      });
      await uncheckedWrapper.get(RADIO).trigger('click');
      expect(uncheckedChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });
    });

    it(':checked[boolean]', async () => {
      const wrapper = mount(Radio, { props: { checked: false } });

      expect(wrapper.classes()).not.toContain('t-is-checked');
      expect(wrapper.get<HTMLInputElement>(INPUT).element.checked).toBe(false);

      await wrapper.get(RADIO).trigger('click');
      expect(wrapper.emitted('update:checked')).toEqual([[true]]);
      expect(wrapper.classes()).not.toContain('t-is-checked');

      await wrapper.setProps({ checked: true });
      expect(wrapper.classes()).toContain('t-is-checked');
      expect(wrapper.get<HTMLInputElement>(INPUT).element.checked).toBe(true);
    });

    it(':defaultChecked[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: { allowUncheck: true, defaultChecked: true },
      });

      expect(wrapper.classes()).toContain('t-is-checked');
      await wrapper.get(RADIO).trigger('click');
      expect(wrapper.classes()).not.toContain('t-is-checked');
      expect(wrapper.emitted('update:checked')).toBeUndefined();
    });

    it(':modelValue[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: { allowUncheck: true, checked: false, modelValue: true },
      });

      expect(wrapper.classes()).toContain('t-is-checked');
      await wrapper.get(RADIO).trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
      expect(wrapper.emitted('update:checked')).toBeUndefined();
      expect(wrapper.classes()).toContain('t-is-checked');

      await wrapper.setProps({ modelValue: false });
      expect(wrapper.classes()).not.toContain('t-is-checked');

      const value = ref(false);
      const modelWrapper = mount(() => <Radio v-model={value.value} />);
      await modelWrapper.get(RADIO).trigger('click');
      await nextTick();
      expect(value.value).toBe(true);
      expect(modelWrapper.get(RADIO).classes()).toContain('t-is-checked');
    });

    it(':default[string]', () => {
      const wrapper = mount(Radio, { props: { default: 'Default content' } });
      expect(wrapper.get(LABEL).text()).toBe('Default content');
    });

    it(':default[slot/function]', () => {
      const functionWrapper = mount(Radio, {
        props: { default: () => <span class="function-content">Function content</span> },
      });
      expect(functionWrapper.get('.function-content').text()).toBe('Function content');

      const slotWrapper = mount(Radio, {
        props: { label: 'Label content' },
        slots: { default: () => <span class="slot-content">Slot content</span> },
      });
      expect(slotWrapper.get('.slot-content').text()).toBe('Slot content');
      expect(slotWrapper.get(LABEL).text()).not.toContain('Label content');
    });

    it(':disabled[boolean]', async () => {
      const onChange = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(Radio, {
        props: { disabled: true, onChange, onClick },
      });

      expect(wrapper.classes()).toContain('t-is-disabled');
      expect(wrapper.attributes('tabindex')).toBeUndefined();
      expect(wrapper.get(INPUT).attributes('disabled')).toBeDefined();
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();

      const formDisabledWrapper = mount(Radio, {
        global: {
          provide: { formDisabled: { disabled: ref(true) } },
        },
      });
      expect(formDisabledWrapper.classes()).toContain('t-is-disabled');

      const overrideWrapper = mount(Radio, {
        props: { disabled: false },
        global: {
          provide: { formDisabled: { disabled: ref(true) } },
        },
      });
      expect(overrideWrapper.classes()).not.toContain('t-is-disabled');
      expect(overrideWrapper.attributes('tabindex')).toBe('0');
    });

    it(':label[string]', () => {
      const wrapper = mount(Radio, { props: { label: 'Label content' } });
      expect(wrapper.get(LABEL).text()).toBe('Label content');
    });

    it(':label[slot/function]', () => {
      const functionWrapper = mount(Radio, {
        props: { label: () => <span class="function-label">Function label</span> },
      });
      expect(functionWrapper.get('.function-label').text()).toBe('Function label');

      const slotWrapper = mount(Radio, {
        slots: { label: () => <span class="slot-label">Slot label</span> },
      });
      expect(slotWrapper.get('.slot-label').text()).toBe('Slot label');
    });

    it(':name[string]', () => {
      const wrapper = mount(Radio, { props: { name: 'radio-name' } });
      expect(wrapper.get(INPUT).attributes('name')).toBe('radio-name');
    });

    it(':readonly[boolean]', async () => {
      const onChange = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(Radio, {
        props: { onChange, onClick, readonly: true },
      });

      expect(wrapper.get(INPUT).attributes('readonly')).toBeDefined();
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();

      const formReadonlyWrapper = mount(Radio, {
        global: {
          provide: { formReadonly: { readonly: ref(true) } },
        },
      });
      expect(formReadonlyWrapper.get(INPUT).attributes('readonly')).toBeDefined();

      const overrideWrapper = mount(Radio, {
        props: { readonly: false },
        global: {
          provide: { formReadonly: { readonly: ref(true) } },
        },
      });
      expect(overrideWrapper.get(INPUT).attributes('readonly')).toBeUndefined();
    });

    it(':value[string/number/boolean]', () => {
      const stringWrapper = mount(Radio, { props: { value: 'radio-value' } });
      expect(stringWrapper.get<HTMLInputElement>(INPUT).element.value).toBe('radio-value');
      expect(stringWrapper.get(INPUT).attributes('data-value')).toBe("'radio-value'");

      const numberWrapper = mount(Radio, { props: { value: 1 } });
      expect(numberWrapper.get(INPUT).attributes('data-value')).toBe('1');

      const booleanWrapper = mount(Radio, { props: { value: false } });
      expect(booleanWrapper.get(INPUT).attributes('data-value')).toBe('false');

      const wrapperAttrs = mount(Radio, { attrs: { 'data-testid': 'radio' } });
      expect(wrapperAttrs.attributes('data-testid')).toBe('radio');
      expect(wrapperAttrs.get(INPUT).attributes('data-testid')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Radio, { props: { onChange } });

      await wrapper.get(LABEL).trigger('click');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });
      expect(wrapper.classes()).toContain('t-is-checked');

      const inputChange = vi.fn();
      const inputWrapper = mount(Radio, { props: { onChange: inputChange } });
      await inputWrapper.get(INPUT).trigger('click');
      expect(inputChange).not.toHaveBeenCalled();
    });

    it('click', async () => {
      const onChange = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(Radio, {
        props: { checked: true, onChange, onClick },
      });

      await wrapper.get(RADIO).trigger('click');
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      expect(onChange).not.toHaveBeenCalled();
    });

    // Current behavior is tracked by #6844. These listeners should be bound to the input after the source is fixed.
    it('focus/blur/keydown/keyup', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onKeydown = vi.fn();
      const onKeyup = vi.fn();
      const wrapper = mount(Radio, {
        attrs: { onBlur, onFocus, onKeydown, onKeyup },
      });
      const input = wrapper.get(INPUT);

      expect(input.attributes('keydown')).toBeDefined();
      expect(wrapper.attributes('onfocus')).toBeUndefined();

      await input.trigger('focus');
      await input.trigger('blur');
      await input.trigger('keydown', { key: 'Enter' });
      await input.trigger('keyup', { key: 'Enter' });

      expect(onFocus).not.toHaveBeenCalled();
      expect(onBlur).not.toHaveBeenCalled();
      expect(onKeydown).not.toHaveBeenCalled();
      expect(onKeyup).not.toHaveBeenCalled();
    });
  });
});
