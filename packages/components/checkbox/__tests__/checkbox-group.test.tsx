import { mount, shallowMount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Checkbox, CheckboxGroup } from '..';
import type { CheckboxGroupValue, CheckboxOptionObj } from '../type';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CheckboxGroup', () => {
  describe('props', () => {
    it(':default[slot]', () => {
      const wrapper = mount(CheckboxGroup, {
        slots: {
          default: () => [<Checkbox value="a">Alpha</Checkbox>, <Checkbox value="b">Beta</Checkbox>],
        },
      });
      const emptyOptions = mount(CheckboxGroup, {
        props: { options: [] },
        slots: { default: () => <Checkbox value="slot-value">Slot option</Checkbox> },
      });
      const childWithoutProps = mount(CheckboxGroup, {
        slots: { default: () => <Checkbox>Unconfigured option</Checkbox> },
      });

      const group = wrapper.get('.t-checkbox-group');
      expect(group.attributes('role')).toBe('group');
      expect(group.attributes('aria-label')).toBe('checkbox-group');
      expect(group.findAll('.t-checkbox__label').map((item) => item.text())).toEqual(['Alpha', 'Beta']);
      expect(emptyOptions.get('.t-checkbox__label').text()).toBe('Slot option');
      expect(childWithoutProps.get('.t-checkbox__label').text()).toBe('Unconfigured option');
    });

    it('onChange should use the latest handler after parent re-render', async () => {
      const initialOnChange = vi.fn();
      const latestOnChange = vi.fn();
      const onChange = ref(initialOnChange);
      const wrapper = mount({
        setup: () => () => <CheckboxGroup value={[]} options={['a']} onChange={onChange.value} />,
      });

      onChange.value = latestOnChange;
      await nextTick();
      await wrapper.get('input').trigger('change');

      expect(initialOnChange).not.toHaveBeenCalled();
      expect(latestOnChange).toHaveBeenCalledWith(
        ['a'],
        expect.objectContaining({ type: 'check', e: expect.any(Event) }),
      );
      wrapper.unmount();
    });

    it(':disabled[boolean]', () => {
      const disabled = mount(CheckboxGroup, { props: { options: ['a', 'b'], disabled: true } });
      const childOverride = mount(CheckboxGroup, {
        props: { disabled: true },
        slots: {
          default: () => [
            <Checkbox value="a">Inherited</Checkbox>,
            <Checkbox value="b" disabled={false}>
              Overridden
            </Checkbox>,
          ],
        },
      });
      const formInherited = mount(CheckboxGroup, {
        props: { options: ['a'] },
        global: { provide: { formDisabled: { disabled: ref(true) } } },
      });
      const groupOverride = mount(CheckboxGroup, {
        props: { options: ['a'], disabled: false },
        global: { provide: { formDisabled: { disabled: ref(true) } } },
      });

      expect(disabled.findAll('label').every((item) => item.classes().includes('t-is-disabled'))).toBe(true);
      expect(disabled.findAll('input').every((item) => item.attributes('disabled') !== undefined)).toBe(true);
      expect(childOverride.findAll('label')[0].classes()).toContain('t-is-disabled');
      expect(childOverride.findAll('label')[1].classes()).not.toContain('t-is-disabled');
      expect(formInherited.get('label').classes()).toContain('t-is-disabled');
      expect(groupOverride.get('label').classes()).not.toContain('t-is-disabled');
    });

    it(':lazyLoad[boolean]', () => {
      const wrapper = shallowMount(CheckboxGroup, {
        props: { lazyLoad: true, options: ['a', 'b'] },
      });

      expect(wrapper.findAllComponents(Checkbox).map((item) => item.props('lazyLoad'))).toEqual([true, true]);
    });

    describe(':max[number]', () => {
      it('disables only unchecked options after reaching max', async () => {
        const onChange = vi.fn();
        const wrapper = mount(CheckboxGroup, {
          props: { options: ['a', 'b'], defaultValue: ['a'], max: 1, onChange },
        });

        expect(wrapper.findAll('label')[0].classes()).not.toContain('t-is-disabled');
        expect(wrapper.findAll('label')[1].classes()).toContain('t-is-disabled');

        await wrapper.findAll('input')[1].trigger('change');
        expect(onChange).not.toHaveBeenCalled();

        await wrapper.findAll('input')[0].trigger('change');
        expect(wrapper.findAll('label')[1].classes()).not.toContain('t-is-disabled');
      });

      // Current behavior tracked by #6852: maxExceeded checks equality, so an invalid controlled value can grow.
      it('currently allows selection when a controlled value already exceeds max', async () => {
        const wrapper = mount(CheckboxGroup, {
          props: { options: ['a', 'b', 'c'], value: ['a', 'b'], max: 1 },
        });

        expect(wrapper.findAll('label')[2].classes()).not.toContain('t-is-disabled');

        await wrapper.findAll('input')[2].trigger('change');

        expect(wrapper.emitted('update:value')).toEqual([[['a', 'b', 'c']]]);
      });

      // Current behavior tracked by #6852: check-all evaluates max against the old value, not the collected result.
      it('currently lets check-all bypass max', async () => {
        const onChange = vi.fn();
        const maxOne = mount(CheckboxGroup, {
          props: {
            max: 1,
            onChange,
            options: [
              { label: 'All', checkAll: true },
              { label: 'Alpha', value: 'a' },
              { label: 'Beta', value: 'b' },
            ],
          },
        });
        const maxZeroChange = vi.fn();
        const maxZero = mount(CheckboxGroup, {
          props: {
            max: 0,
            onChange: maxZeroChange,
            options: [
              { label: 'All', checkAll: true },
              { label: 'Alpha', value: 'a' },
              { label: 'Beta', value: 'b' },
            ],
          },
        });

        await maxOne.findAll('input')[0].trigger('change');
        await maxZero.findAll('input')[0].trigger('change');

        expect(onChange).toHaveBeenCalledWith(
          ['a', 'b'],
          expect.objectContaining({ current: undefined, option: undefined, type: 'check', e: expect.any(Event) }),
        );
        expect(maxZeroChange).toHaveBeenCalledWith(
          ['a'],
          expect.objectContaining({ current: undefined, option: undefined, type: 'check', e: expect.any(Event) }),
        );
      });
    });

    it(':name[string]', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          name: 'group-name',
          options: [
            { label: 'Inherited', value: 'a' },
            { label: 'Own', value: 'b', name: 'own-name' },
          ],
        },
      });

      expect(wrapper.findAll('input').map((item) => item.attributes('name'))).toEqual(['group-name', 'own-name']);
    });

    it(':options[array<string/number>]', () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['Alpha', 0, 2] } });

      expect(wrapper.findAll('.t-checkbox__label').map((item) => item.text())).toEqual(['Alpha', '0', '2']);
      // The missing value for 0 is the Checkbox source behavior tracked by #6851.
      expect(wrapper.findAll('input').map((item) => item.attributes('value'))).toEqual(['Alpha', undefined, '2']);
    });

    it(':options[array<object>]', async () => {
      const options: CheckboxOptionObj[] = [
        { label: 'Alpha', value: 'a', title: 'Alpha title' },
        { label: 'Beta', value: 'b', disabled: true },
      ];
      const wrapper = mount(CheckboxGroup, { props: { options, defaultValue: ['a'] } });

      expect(wrapper.findAll('label')[0].classes()).toContain('t-is-checked');
      expect(wrapper.findAll('label')[0].attributes('title')).toBe('Alpha title');
      expect(wrapper.findAll('label')[1].classes()).toContain('t-is-disabled');

      await wrapper.setProps({ options: ['Gamma', 'Delta'] });

      expect(wrapper.findAll('.t-checkbox__label').map((item) => item.text())).toEqual(['Gamma', 'Delta']);
    });

    it(':options[array<object>] checkAll', () => {
      const partial = mount(CheckboxGroup, {
        props: {
          defaultValue: ['a'],
          options: [
            { label: 'All', checkAll: true },
            { label: 'Alpha', value: 'a' },
            { label: 'Beta', value: 'b' },
          ],
        },
      });
      const ignoresInactive = mount(CheckboxGroup, {
        props: {
          defaultValue: ['enabled'],
          options: [
            { label: 'All', checkAll: true },
            { label: 'Disabled', value: 'disabled', disabled: true },
            { label: 'Readonly', value: 'readonly', readonly: true },
            { label: 'Enabled', value: 'enabled' },
          ],
        },
      });

      const checkAll = partial.findAll('label')[0];
      expect(checkAll.classes()).toContain('t-is-indeterminate');
      expect((checkAll.get('input').element as HTMLInputElement).indeterminate).toBe(true);
      expect(checkAll.classes()).not.toContain('t-is-checked');
      expect(ignoresInactive.findAll('label')[0].classes()).toContain('t-is-checked');
    });

    it(':readonly[boolean]', async () => {
      const onChange = vi.fn();
      const readonly = mount(CheckboxGroup, {
        props: { options: ['a', 'b'], readonly: true, onChange },
      });
      const childOverride = mount(CheckboxGroup, {
        props: { readonly: true, onChange },
        slots: {
          default: () => (
            <Checkbox value="a" readonly={false}>
              Overridden
            </Checkbox>
          ),
        },
      });

      expect(readonly.findAll('input').every((item) => item.attributes('readonly') !== undefined)).toBe(true);
      expect(childOverride.get('input').attributes('readonly')).toBeUndefined();

      await readonly.findAll('input')[0].trigger('change');
      expect(onChange).not.toHaveBeenCalled();

      await childOverride.get('input').trigger('change');
      expect(onChange).toHaveBeenCalledWith(
        ['a'],
        expect.objectContaining({ current: 'a', type: 'check', e: expect.any(Event) }),
      );
    });

    it(':value[array]', async () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['a', 'b'], value: ['a'] } });

      await wrapper.findAll('input')[1].trigger('change');

      expect(wrapper.emitted('update:value')).toEqual([[['a', 'b']]]);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(wrapper.findAll('label')[1].classes()).not.toContain('t-is-checked');

      await wrapper.setProps({ value: ['a', 'b'] });

      expect(wrapper.findAll('label')[1].classes()).toContain('t-is-checked');
    });

    it(':value[undefined/non-array]', async () => {
      const undefinedValue = mount(CheckboxGroup, { props: { options: ['a'], value: undefined } });
      const invalidValue = mount(CheckboxGroup, {
        props: { options: ['a'], value: null as unknown as CheckboxGroupValue },
      });

      await undefinedValue.get('input').trigger('change');
      await invalidValue.get('input').trigger('change');

      expect(undefinedValue.emitted('update:value')).toEqual([[['a']]]);
      expect(invalidValue.emitted('update:value')).toEqual([[['a']]]);
    });

    it(':defaultValue[array]', async () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['a', 'b'], defaultValue: ['a'] } });

      expect(wrapper.findAll('label')[0].classes()).toContain('t-is-checked');
      expect(wrapper.findAll('label')[1].classes()).not.toContain('t-is-checked');

      await wrapper.findAll('input')[1].trigger('change');

      expect(wrapper.findAll('label')[1].classes()).toContain('t-is-checked');
    });

    it(':modelValue[array]', async () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['a', 'b'], modelValue: ['a'] } });

      await wrapper.findAll('input')[0].trigger('change');

      expect(wrapper.emitted('update:modelValue')).toEqual([[[]]]);
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.findAll('label')[0].classes()).toContain('t-is-checked');

      await wrapper.setProps({ modelValue: ['b'], value: ['a'] });

      expect(wrapper.findAll('label')[0].classes()).not.toContain('t-is-checked');
      expect(wrapper.findAll('label')[1].classes()).toContain('t-is-checked');

      await wrapper.findAll('input')[0].trigger('change');

      expect(wrapper.emitted('update:modelValue')).toEqual([[[]], [['b', 'a']]]);
      expect(wrapper.emitted('update:value')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CheckboxGroup, {
        props: { options: ['a', 'b'], defaultValue: ['a'], onChange },
      });

      await wrapper.findAll('input')[1].trigger('change');

      expect(onChange).toHaveBeenNthCalledWith(
        1,
        ['a', 'b'],
        expect.objectContaining({ e: expect.any(Event), current: 'b', type: 'check' }),
      );
      expect(onChange.mock.calls[0][1].option).toEqual(expect.objectContaining({ value: 'b', label: 'b' }));

      await wrapper.findAll('input')[0].trigger('change');

      expect(onChange).toHaveBeenNthCalledWith(
        2,
        ['b'],
        expect.objectContaining({ e: expect.any(Event), current: 'a', type: 'uncheck' }),
      );
    });

    it('change[checkAll]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CheckboxGroup, {
        props: {
          onChange,
          options: [
            { label: 'All', checkAll: true },
            { label: 'Alpha', value: 'a' },
            { label: 'Beta', value: 'b' },
          ],
        },
      });

      await wrapper.findAll('input')[0].trigger('change');

      expect(wrapper.findAll('label').every((item) => item.classes().includes('t-is-checked'))).toBe(true);
      expect(onChange).toHaveBeenLastCalledWith(
        ['a', 'b'],
        expect.objectContaining({ current: undefined, option: undefined, type: 'check' }),
      );

      await wrapper.findAll('input')[0].trigger('change');

      expect(wrapper.findAll('label').every((item) => !item.classes().includes('t-is-checked'))).toBe(true);
      expect(onChange).toHaveBeenLastCalledWith(
        [],
        expect.objectContaining({ current: undefined, option: undefined, type: 'uncheck' }),
      );
    });

    it('change[checkAll disabled/readonly options]', async () => {
      const selectChange = vi.fn();
      const select = mount(CheckboxGroup, {
        props: {
          onChange: selectChange,
          options: [
            { label: 'All', checkAll: true },
            { label: 'Disabled', value: 'disabled', disabled: true },
            { label: 'Readonly', value: 'readonly', readonly: true },
            { label: 'Enabled', value: 'enabled' },
          ],
        },
      });
      const unselectChange = vi.fn();
      const unselect = mount(CheckboxGroup, {
        props: {
          defaultValue: ['disabled', 'readonly', 'enabled'],
          onChange: unselectChange,
          options: [
            { label: 'All', checkAll: true },
            { label: 'Disabled', value: 'disabled', disabled: true },
            { label: 'Readonly', value: 'readonly', readonly: true },
            { label: 'Enabled', value: 'enabled' },
          ],
        },
      });

      await select.findAll('input')[0].trigger('change');
      await unselect.findAll('input')[0].trigger('change');

      expect(selectChange).toHaveBeenCalledWith(
        ['enabled'],
        expect.objectContaining({ current: undefined, option: undefined, type: 'check' }),
      );
      expect(unselectChange).toHaveBeenCalledWith(
        ['disabled', 'readonly'],
        expect.objectContaining({ current: undefined, option: undefined, type: 'uncheck' }),
      );
    });

    it('change[slot checkAll]', async () => {
      const emptyValue = ref<CheckboxGroupValue>([]);
      const emptyAttribute = { 'check-all': '' };
      const emptyWrapper = mount(() => (
        <CheckboxGroup v-model={emptyValue.value}>
          <Checkbox {...emptyAttribute}>All</Checkbox>
          <Checkbox value="a">Alpha</Checkbox>
          <Checkbox value="b">Beta</Checkbox>
        </CheckboxGroup>
      ));
      const booleanValue = ref<CheckboxGroupValue>([]);
      const booleanAttribute = { 'check-all': true };
      const booleanWrapper = mount(() => (
        <CheckboxGroup v-model={booleanValue.value}>
          <Checkbox {...booleanAttribute}>All</Checkbox>
          <Checkbox value="a">Alpha</Checkbox>
        </CheckboxGroup>
      ));

      await emptyWrapper.findAll('input')[0].trigger('change');
      await booleanWrapper.findAll('input')[0].trigger('change');

      expect(emptyValue.value).toEqual(['a', 'b']);
      expect(booleanValue.value).toEqual(['a']);
    });
  });
});
