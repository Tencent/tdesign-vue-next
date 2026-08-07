import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Checkbox from '..';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Checkbox', () => {
  describe('props', () => {
    it(':checkAll[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { checkAll: true, onChange } });

      expect(wrapper.get('label').classes()).not.toContain('t-is-checked');

      await wrapper.get('input').trigger('change');

      expect(wrapper.get('label').classes()).not.toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(Event) });
    });

    it(':checked[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { checked: false, onChange } });
      const root = wrapper.get('label.t-checkbox');
      const input = root.get('input.t-checkbox__former');

      expect(root.attributes('tabindex')).toBe('0');
      expect(root.classes()).not.toEqual(
        expect.arrayContaining(['t-is-checked', 't-is-disabled', 't-is-indeterminate']),
      );
      expect(input.attributes('type')).toBe('checkbox');
      expect(input.attributes('tabindex')).toBe('-1');
      expect((input.element as HTMLInputElement).checked).toBe(false);
      expect(root.get('.t-checkbox__input').element.tagName).toBe('SPAN');
      expect(root.get('.t-checkbox__label').text()).toBe('');

      await input.trigger('change');

      expect(wrapper.emitted('update:checked')).toEqual([[true]]);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(Event) });
      expect(root.classes()).not.toContain('t-is-checked');

      await wrapper.setProps({ checked: true });

      expect(root.classes()).toContain('t-is-checked');
      expect((input.element as HTMLInputElement).checked).toBe(true);
    });

    it(':modelValue[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { modelValue: true } });

      await wrapper.get('input').trigger('change');

      expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
      expect(wrapper.emitted('update:checked')).toBeUndefined();
      expect(wrapper.get('label').classes()).toContain('t-is-checked');

      await wrapper.setProps({ modelValue: false, checked: true });

      expect(wrapper.get('label').classes()).not.toContain('t-is-checked');

      await wrapper.get('input').trigger('change');

      expect(wrapper.emitted('update:modelValue')).toEqual([[false], [true]]);
      expect(wrapper.emitted('update:checked')).toBeUndefined();
    });

    it(':defaultChecked[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { defaultChecked: true } });

      expect(wrapper.get('label').classes()).toContain('t-is-checked');

      await wrapper.get('input').trigger('change');

      expect(wrapper.get('label').classes()).not.toContain('t-is-checked');
    });

    it(':default[string/slot/function]', () => {
      const byString = mount(Checkbox, { props: { default: 'Default content' } });
      const byFunction = mount(Checkbox, {
        props: { default: () => <strong data-testid="default-node">Function content</strong> },
      });
      const bySlot = mount(Checkbox, {
        props: { label: 'Label fallback' },
        slots: { default: () => <span data-testid="default-slot">Slot content</span> },
      });
      const propBeforeSlot = mount(Checkbox, {
        props: { default: 'Default prop', label: 'Label prop' },
        slots: { default: () => <span data-testid="ignored-slot">Slot content</span> },
      });

      expect(byString.get('.t-checkbox__label').text()).toBe('Default content');
      expect(byFunction.get('[data-testid="default-node"]').text()).toBe('Function content');
      expect(bySlot.get('[data-testid="default-slot"]').text()).toBe('Slot content');
      expect(propBeforeSlot.get('.t-checkbox__label').text()).toBe('Default prop');
      expect(propBeforeSlot.find('[data-testid="ignored-slot"]').exists()).toBe(false);
    });

    it(':disabled[boolean]', async () => {
      const onChange = vi.fn();
      const disabled = mount(Checkbox, { props: { disabled: true, onChange } });
      const inherited = mount(Checkbox, {
        global: { provide: { formDisabled: { disabled: ref(true) } } },
      });
      const overridden = mount(Checkbox, {
        props: { disabled: false },
        global: { provide: { formDisabled: { disabled: ref(true) } } },
      });

      expect(disabled.get('label').classes()).toContain('t-is-disabled');
      expect(disabled.get('label').attributes('tabindex')).toBeUndefined();
      expect(disabled.get('input').attributes('disabled')).toBeDefined();
      expect(inherited.get('label').classes()).toContain('t-is-disabled');
      expect(overridden.get('label').classes()).not.toContain('t-is-disabled');

      await disabled.get('input').trigger('change');

      expect(onChange).not.toHaveBeenCalled();
      expect(disabled.get('label').classes()).not.toContain('t-is-checked');
    });

    it(':indeterminate[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { indeterminate: true } });
      const input = wrapper.get('input');

      expect(wrapper.get('label').classes()).toContain('t-is-indeterminate');
      expect((input.element as HTMLInputElement).indeterminate).toBe(true);

      await wrapper.setProps({ indeterminate: false });

      expect(wrapper.get('label').classes()).not.toContain('t-is-indeterminate');
      expect((input.element as HTMLInputElement).indeterminate).toBe(false);
    });

    it(':label[string/function]', () => {
      const byString = mount(Checkbox, { props: { label: 'Label content' } });
      const byFunction = mount(Checkbox, {
        props: { label: () => <strong data-testid="label-node">Node content</strong> },
      });

      expect(byString.get('.t-checkbox__label').text()).toBe('Label content');
      expect(byFunction.get('[data-testid="label-node"]').text()).toBe('Node content');
    });

    it(':lazyLoad[boolean]', () => {
      vi.stubGlobal('IntersectionObserver', undefined);
      const immediate = mount(Checkbox, { props: { lazyLoad: false } });
      const lazy = mount(Checkbox, { props: { lazyLoad: true } });

      expect(immediate.find('input').exists()).toBe(true);
      expect(lazy.find('input').exists()).toBe(true);
    });

    it(':name[string]', async () => {
      const wrapper = mount(Checkbox, { props: { name: 'first-name' } });

      expect(wrapper.get('input').attributes('name')).toBe('first-name');

      await wrapper.setProps({ name: 'second-name' });

      expect(wrapper.get('input').attributes('name')).toBe('second-name');
    });

    it(':readonly[boolean]', async () => {
      const onChange = vi.fn();
      const readonly = mount(Checkbox, { props: { readonly: true, onChange } });
      const formReadonly = ref(true);
      const inherited = mount(Checkbox, {
        global: { provide: { formReadonly: { readonly: formReadonly } } },
      });
      const overridden = mount(Checkbox, {
        props: { readonly: false },
        global: { provide: { formReadonly: { readonly: formReadonly } } },
      });

      expect(readonly.get('input').attributes('readonly')).toBeDefined();
      expect(inherited.get('input').attributes('readonly')).toBeDefined();
      expect(overridden.get('input').attributes('readonly')).toBeUndefined();

      await readonly.get('input').trigger('change');

      expect(onChange).not.toHaveBeenCalled();

      formReadonly.value = false;
      await inherited.vm.$nextTick();

      expect(inherited.get('input').attributes('readonly')).toBeUndefined();
    });

    it(':title[string]', async () => {
      const wrapper = mount(Checkbox, { props: { title: 'Checkbox title' } });

      expect(wrapper.get('label').attributes('title')).toBe('Checkbox title');

      await wrapper.setProps({ title: '' });

      expect(wrapper.get('label').attributes('title')).toBeUndefined();
    });

    it(':value[string/number/boolean]', () => {
      const stringValue = mount(Checkbox, { props: { value: 'alpha' } });
      const numberValue = mount(Checkbox, { props: { value: 7 } });
      const booleanValue = mount(Checkbox, { props: { value: true } });

      expect(stringValue.get('input').attributes('value')).toBe('alpha');
      expect(numberValue.get('input').attributes('value')).toBe('7');
      expect(booleanValue.get('input').attributes('value')).toBe('true');

      // Current behavior tracked by #6851: documented falsy values are omitted from the native input.
      for (const value of [0, false, ''] as const) {
        const wrapper = mount(Checkbox, { props: { value } });
        expect(wrapper.get('input').attributes('value')).toBeUndefined();
      }
    });

    it(':needRipple[boolean]', () => {
      vi.useFakeTimers();
      const wrapper = mount(Checkbox, { props: { needRipple: true } });
      const root = wrapper.get('label');

      root.element.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, button: 0 }));
      expect(root.element.children).toHaveLength(4);

      root.element.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
      vi.runAllTimers();

      expect(root.element.children).toHaveLength(3);
    });

    it(':stopLabelTrigger[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { stopLabelTrigger: true, onChange } });
      const stoppedEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

      wrapper.get('label').element.dispatchEvent(stoppedEvent);
      expect(stoppedEvent.defaultPrevented).toBe(true);

      await wrapper.get('.t-checkbox__input').trigger('click');
      expect(wrapper.get('label').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });

      await wrapper.setProps({ stopLabelTrigger: false });
      const nativeEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      wrapper.get('label').element.dispatchEvent(nativeEvent);

      expect(nativeEvent.defaultPrevented).toBe(false);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { onChange } });

      await wrapper.get('input').trigger('change');

      expect(wrapper.get('label').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(Event) });

      await wrapper.get('input').trigger('change');

      expect(wrapper.get('label').classes()).not.toContain('t-is-checked');
      expect(onChange).toHaveBeenLastCalledWith(false, { e: expect.any(Event) });
    });

    it('click', async () => {
      const onParentClick = vi.fn();
      const wrapper = mount(() => (
        <div onClick={onParentClick}>
          <Checkbox />
        </div>
      ));

      await wrapper.get('input').trigger('click');

      expect(onParentClick).not.toHaveBeenCalled();
    });
  });
});
