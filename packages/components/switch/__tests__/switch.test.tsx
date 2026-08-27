import { flushPromises, mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Switch, { type SwitchProps, type SwitchValue } from '@tdesign/components/switch';
import switchProps from '@tdesign/components/switch/props';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Switch', () => {
  describe('props', () => {
    it(':beforeChange[function]', async () => {
      const beforeChange = vi.fn(() => true);
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: { beforeChange, defaultValue: false, onChange },
      });

      await wrapper.get('.t-switch').trigger('click');
      await flushPromises();

      expect(beforeChange).toHaveBeenCalledOnce();
      expect(beforeChange).toHaveBeenCalledWith();
      expect(wrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });

      await wrapper.setProps({ beforeChange: () => false });
      await wrapper.get('.t-switch').trigger('click');
      await flushPromises();

      expect(wrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledOnce();

      const error = new Error('guard failed');
      const errorHandler = vi.fn();
      const errorWrapper = mount(Switch, {
        props: {
          beforeChange: () => {
            throw error;
          },
        },
        global: { config: { errorHandler } },
      });

      errorWrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(errorHandler.mock.calls[0][0]).toBe(error);
    });

    it('onChange should use the latest handler after parent re-render', async () => {
      const initialOnChange = vi.fn();
      const latestOnChange = vi.fn();
      const onChange = ref(initialOnChange);
      const wrapper = mount({
        setup: () => () => <Switch value={false} onChange={onChange.value} />,
      });

      onChange.value = latestOnChange;
      await nextTick();
      await wrapper.get('.t-switch').trigger('click');

      expect(initialOnChange).not.toHaveBeenCalled();
      expect(latestOnChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });
      wrapper.unmount();
    });

    it(':beforeChange[Promise]', async () => {
      let resolveGuard!: (value: boolean) => void;
      const beforeChange = vi.fn(
        () =>
          new Promise<boolean>((resolve) => {
            resolveGuard = resolve;
          }),
      );
      const wrapper = mount(Switch, {
        props: { beforeChange, defaultValue: false },
      });

      await wrapper.get('.t-switch').trigger('click');
      expect(wrapper.get('.t-switch').classes()).not.toContain('t-is-checked');

      resolveGuard(true);
      await flushPromises();
      expect(wrapper.get('.t-switch').classes()).toContain('t-is-checked');

      const onChange = vi.fn();
      const falseWrapper = mount(Switch, {
        props: { beforeChange: () => Promise.resolve(false), defaultValue: true, onChange },
      });

      await falseWrapper.get('.t-switch').trigger('click');
      await flushPromises();
      expect(falseWrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':beforeChange[Promise rejection]', async () => {
      const rejection = new Error('denied');
      const errorHandler = vi.fn();
      const onChange = vi.fn();
      const rejectedWrapper = mount(Switch, {
        props: {
          beforeChange: () => Promise.reject(rejection),
          defaultValue: false,
          onChange,
        },
        global: { config: { errorHandler } },
      });

      await rejectedWrapper.get('.t-switch').trigger('click');
      await flushPromises();

      expect(rejectedWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
      expect(onChange).not.toHaveBeenCalled();
      expect(errorHandler).not.toHaveBeenCalled();
    });

    it(':beforeChange[Promise continuation error]', async () => {
      const error = new Error('onChange failed');
      const errorHandler = vi.fn();
      const onChange = vi.fn(() => {
        throw error;
      });
      const wrapper = mount(Switch, {
        props: {
          beforeChange: () => Promise.resolve(true),
          defaultValue: false,
          onChange,
        },
        global: { config: { errorHandler } },
      });

      wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();

      expect(wrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledOnce();
      expect(errorHandler.mock.calls[0][0]).toBe(error);
    });

    it(':customValue[array]', async () => {
      const numberChange = vi.fn();
      const numberWrapper = mount(Switch, {
        props: { customValue: [1, 0], defaultValue: 0, onChange: numberChange },
      });

      await numberWrapper.get('.t-switch').trigger('click');
      expect(numberWrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(numberChange).toHaveBeenLastCalledWith(1, { e: expect.any(MouseEvent) });

      await numberWrapper.get('.t-switch').trigger('click');
      expect(numberWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
      expect(numberChange).toHaveBeenLastCalledWith(0, { e: expect.any(MouseEvent) });

      const stringChange = vi.fn();
      const stringWrapper = mount(Switch, {
        props: { customValue: ['open', 'closed'], defaultValue: 'open', onChange: stringChange },
      });

      expect(stringWrapper.get('.t-switch').classes()).toContain('t-is-checked');
      await stringWrapper.get('.t-switch').trigger('click');
      expect(stringChange).toHaveBeenCalledWith('closed', { e: expect.any(MouseEvent) });

      const booleanChange = vi.fn();
      const emptyWrapper = mount(Switch, {
        props: { customValue: [], defaultValue: false, onChange: booleanChange },
      });

      await emptyWrapper.get('.t-switch').trigger('click');
      expect(booleanChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });

      const updatedWrapper = mount(Switch, {
        props: { customValue: ['open', 'closed'], defaultValue: 'open' },
      });
      await updatedWrapper.setProps({ customValue: ['yes', 'no'] });
      await updatedWrapper.get('.t-switch').trigger('click');
      expect(updatedWrapper.get('.t-switch').classes()).toContain('t-is-checked');

      expect(() =>
        mount(Switch, {
          props: { customValue: [1, 0], defaultValue: 2 },
        }),
      ).toThrow('value is 2 not in [1,0]');
    });

    it(':disabled[boolean]', async () => {
      const wrapper = mount(Switch);
      expect(wrapper.get('.t-switch').classes()).not.toContain('t-is-disabled');

      const beforeChange = vi.fn(() => true);
      const onChange = vi.fn();
      const disabledWrapper = mount(Switch, {
        props: { beforeChange, disabled: true, onChange },
      });

      expect(disabledWrapper.get('.t-switch').classes()).toContain('t-is-disabled');
      expect(disabledWrapper.get('.t-switch__handle').classes()).toContain('t-is-disabled');
      expect(disabledWrapper.get('.t-switch__content').classes()).toContain('t-is-disabled');
      await disabledWrapper.get('.t-switch').trigger('click');
      expect(beforeChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      const formDisabledWrapper = mount(Switch, {
        global: {
          provide: {
            formDisabled: { disabled: ref(true) },
          },
        },
      });
      expect(formDisabledWrapper.get('.t-switch').classes()).toContain('t-is-disabled');

      const overrideWrapper = mount(Switch, {
        props: { disabled: false },
        global: {
          provide: {
            formDisabled: { disabled: ref(true) },
          },
        },
      });
      expect(overrideWrapper.get('.t-switch').classes()).not.toContain('t-is-disabled');
    });

    it(':label[array<string>]', async () => {
      const wrapper = mount(Switch, {
        props: { defaultValue: false, label: ['On', 'Off'] },
      });

      expect(wrapper.get('.t-switch__content').text()).toBe('Off');
      await wrapper.get('.t-switch').trigger('click');
      expect(wrapper.get('.t-switch__content').text()).toBe('On');

      const precedenceWrapper = mount(Switch, {
        props: { defaultValue: true, label: ['Prop on', 'Prop off'] },
        slots: { label: () => <span class="slot-label">Slot</span> },
      });
      expect(precedenceWrapper.get('.t-switch__content').text()).toBe('Prop on');
      expect(precedenceWrapper.find('.slot-label').exists()).toBe(false);

      const emptyItemWrapper = mount(Switch, {
        props: {
          defaultValue: true,
          label: ['', 'Off'],
        },
        slots: { label: () => <span class="slot-label">Slot fallback</span> },
      });
      expect(emptyItemWrapper.get('.t-switch__content').text()).toBe('');
      expect(emptyItemWrapper.find('.slot-label').exists()).toBe(false);
    });

    it(':label[array<function>]', async () => {
      const activeLabel = () => <span class="active-label">Enabled</span>;
      const inactiveLabel = () => <span class="inactive-label">Disabled</span>;
      const wrapper = mount(Switch, {
        props: { defaultValue: false, label: [activeLabel, inactiveLabel] },
      });

      expect(wrapper.get('.inactive-label').text()).toBe('Disabled');
      await wrapper.get('.t-switch').trigger('click');
      expect(wrapper.get('.active-label').text()).toBe('Enabled');
      expect(wrapper.find('.inactive-label').exists()).toBe(false);
    });

    it(':label[slot/function]', async () => {
      const label = vi.fn((createElement: typeof h, context: { value: SwitchValue }) =>
        createElement('span', { class: 'function-label' }, String(context.value)),
      );
      const functionWrapper = mount(Switch, {
        props: { defaultValue: true, label },
      });

      expect(functionWrapper.get('.function-label').text()).toBe('true');
      expect(label).toHaveBeenLastCalledWith(expect.any(Function), { value: true });
      await functionWrapper.get('.t-switch').trigger('click');
      expect(functionWrapper.get('.function-label').text()).toBe('false');
      expect(label).toHaveBeenLastCalledWith(expect.any(Function), { value: false });

      const labelSlot = vi.fn(({ value }: { value: SwitchValue }) => (
        <span class="slot-label">slot:{String(value)}</span>
      ));
      const slotWrapper = mount(Switch, {
        props: { defaultValue: false, label: [] },
        slots: { label: labelSlot },
      });

      expect(slotWrapper.get('.slot-label').text()).toBe('slot:false');
      await slotWrapper.get('.t-switch').trigger('click');
      expect(slotWrapper.get('.slot-label').text()).toBe('slot:true');
      expect(labelSlot).toHaveBeenLastCalledWith({ value: true });
    });

    it(':label[string]', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const wrapper = mount(Switch, {
        props: { label: 'Always visible' as unknown as SwitchProps['label'] },
      });

      expect(wrapper.get('.t-switch__content').text()).toBe('Always visible');
      expect(warnSpy.mock.calls.flat().join(' ')).toContain('type check failed for prop "label"');
    });

    it(':loading[boolean]', async () => {
      const wrapper = mount(Switch);
      expect(wrapper.get('.t-switch').classes()).not.toContain('t-is-loading');

      const beforeChange = vi.fn(() => true);
      const label = vi.fn(() => <span>Label</span>);
      const onChange = vi.fn();
      const loadingWrapper = mount(Switch, {
        props: { beforeChange, label, loading: true, onChange },
      });

      expect(loadingWrapper.get('.t-switch').classes()).toContain('t-is-loading');
      expect(loadingWrapper.get('.t-switch__handle').classes()).toContain('t-is-loading');
      expect(loadingWrapper.get('.t-loading').classes()).toContain('t-size-s');
      expect(loadingWrapper.get('.t-switch__content').text()).toBe('');
      expect(label).not.toHaveBeenCalled();

      await loadingWrapper.get('.t-switch').trigger('click');
      expect(beforeChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':size[string]', async () => {
      const validateSize = switchProps.size.validator as (value?: string) => boolean;
      expect(validateSize()).toBe(true);
      expect(validateSize('')).toBe(true);
      expect(validateSize('small')).toBe(true);
      expect(validateSize('medium')).toBe(true);
      expect(validateSize('large')).toBe(true);
      expect(validateSize('extra-large')).toBe(false);

      const wrapper = mount(Switch);
      expect(wrapper.get('.t-switch').classes()).toContain('t-size-m');
      expect(wrapper.get('.t-switch__handle').classes()).toEqual(['t-switch__handle']);
      expect(wrapper.get('.t-switch__content').classes()).toEqual(['t-switch__content', 't-size-m']);

      for (const [size, className] of [
        ['small', 't-size-s'],
        ['medium', 't-size-m'],
        ['large', 't-size-l'],
      ] as const) {
        await wrapper.setProps({ size });
        expect(wrapper.get('.t-switch').classes()).toContain(className);
        expect(wrapper.get('.t-switch__content').classes()).toContain(className);
      }
    });

    it(':value[string/number/boolean]', async () => {
      const booleanWrapper = mount(Switch, { props: { value: false } });
      await booleanWrapper.get('.t-switch').trigger('click');
      expect(booleanWrapper.emitted('update:value')).toEqual([[true]]);
      expect(booleanWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
      await booleanWrapper.setProps({ value: true });
      expect(booleanWrapper.get('.t-switch').classes()).toContain('t-is-checked');

      const numberWrapper = mount(Switch, {
        props: { customValue: [1, 0], value: 1 },
      });
      expect(numberWrapper.get('.t-switch').classes()).toContain('t-is-checked');
      await numberWrapper.get('.t-switch').trigger('click');
      expect(numberWrapper.emitted('update:value')).toEqual([[0]]);

      const stringWrapper = mount(Switch, {
        props: { customValue: ['open', 'closed'], value: 'closed' },
      });
      expect(stringWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
      await stringWrapper.setProps({ value: 'open' });
      expect(stringWrapper.get('.t-switch').classes()).toContain('t-is-checked');
    });

    it(':defaultValue[string/number/boolean]', () => {
      const booleanWrapper = mount(Switch, { props: { defaultValue: true } });
      expect(booleanWrapper.get('.t-switch').classes()).toContain('t-is-checked');

      const numberWrapper = mount(Switch, {
        props: { customValue: [1, 0], defaultValue: 1 },
      });
      expect(numberWrapper.get('.t-switch').classes()).toContain('t-is-checked');

      const stringWrapper = mount(Switch, {
        props: { customValue: ['open', 'closed'], defaultValue: 'closed' },
      });
      expect(stringWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
    });

    it(':modelValue[string/number/boolean]', async () => {
      const booleanWrapper = mount(Switch, { props: { modelValue: true } });
      await booleanWrapper.get('.t-switch').trigger('click');
      expect(booleanWrapper.emitted('update:modelValue')).toEqual([[false]]);
      expect(booleanWrapper.emitted('update:value')).toBeUndefined();
      expect(booleanWrapper.get('.t-switch').classes()).toContain('t-is-checked');
      await booleanWrapper.setProps({ modelValue: false });
      expect(booleanWrapper.get('.t-switch').classes()).not.toContain('t-is-checked');

      const numberWrapper = mount(Switch, {
        props: { customValue: [1, 0], modelValue: 0 },
      });
      await numberWrapper.get('.t-switch').trigger('click');
      expect(numberWrapper.emitted('update:modelValue')).toEqual([[1]]);

      const stringWrapper = mount(Switch, {
        props: { customValue: ['open', 'closed'], modelValue: 'open' },
      });
      expect(stringWrapper.get('.t-switch').classes()).toContain('t-is-checked');

      const priorityWrapper = mount(Switch, {
        props: { modelValue: false, value: true },
      });
      await priorityWrapper.get('.t-switch').trigger('click');
      expect(priorityWrapper.emitted('update:modelValue')).toEqual([[true]]);
      expect(priorityWrapper.emitted('update:value')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, { props: { onChange } });

      await wrapper.get('.t-switch').trigger('click');
      expect(wrapper.get('.t-switch').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenLastCalledWith(true, { e: expect.any(MouseEvent) });

      await wrapper.get('.t-switch').trigger('click');
      expect(wrapper.get('.t-switch').classes()).not.toContain('t-is-checked');
      expect(onChange).toHaveBeenLastCalledWith(false, { e: expect.any(MouseEvent) });
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    // Current behavior is tracked by #6849. Update this case when keyboard support is implemented.
    it('keydown', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, { props: { defaultValue: false, onChange } });
      const root = wrapper.get('.t-switch');

      expect(root.attributes('role')).toBeUndefined();
      expect(root.attributes('aria-checked')).toBeUndefined();
      expect(root.attributes('tabindex')).toBeUndefined();

      await root.trigger('keydown', { key: ' ' });
      await root.trigger('keydown', { key: 'Enter' });
      expect(root.classes()).not.toContain('t-is-checked');
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
