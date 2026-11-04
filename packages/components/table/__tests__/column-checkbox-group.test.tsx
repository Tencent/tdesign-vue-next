import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import ColumnCheckboxGroup from '@tdesign/components/table/components/column-checkbox-group';

describe('ColumnCheckboxGroup', () => {
  const options = [
    { label: 'Name', value: 'name' },
    { label: 'Status', value: 'status' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ];

  function mountGroup(props = {}) {
    return mount(ColumnCheckboxGroup, {
      props: {
        label: 'Columns',
        options,
        value: [],
        checkboxProps: {},
        ...props,
      },
    });
  }

  describe('props', () => {
    it(':label[string]', () => {
      const wrapper = mountGroup();
      expect(wrapper.find('.t-checkbox__label').text()).toBe('Columns');
    });

    it(':uniqueKey[string]', () => {
      const wrapper = mountGroup({ uniqueKey: 'basic' });
      expect(wrapper.classes()).toContain('t-table__basic');
    });

    it(':options[array] supports value, label fallback, primitive and disabled options', () => {
      const wrapper = mountGroup({
        options: [
          { label: 'Name', value: 'name' },
          { label: 'Label Key' },
          'primitive',
          { label: 'Disabled', value: 'disabled', disabled: true },
        ],
        value: ['name', 'Label Key', 'primitive'],
      });
      const checkboxes = wrapper.findAll('input[type="checkbox"]');
      expect(checkboxes).toHaveLength(5);
      expect((checkboxes[0].element as HTMLInputElement).checked).toBe(true);
      expect((checkboxes[4].element as HTMLInputElement).disabled).toBe(true);
    });

    it(':options[array] disables select-all when no option can be selected', () => {
      const wrapper = mountGroup({ options: [{ label: 'Disabled', value: 'disabled', disabled: true }] });
      expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).disabled).toBe(true);
    });

    it(':options[array] defaults to an empty list', () => {
      const wrapper = mount(ColumnCheckboxGroup, { props: { value: [], checkboxProps: {} } });
      expect(wrapper.findAll('.t-checkbox')).toHaveLength(1);
      expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).disabled).toBe(true);
    });

    it(':value[array] renders checked and indeterminate select-all states', async () => {
      const wrapper = mountGroup({ value: ['name'] });
      expect(wrapper.find('.t-checkbox').classes()).toContain('t-is-indeterminate');

      await wrapper.setProps({ value: ['name', 'status'] });
      expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true);
      expect(wrapper.find('.t-checkbox').classes()).not.toContain('t-is-indeterminate');
    });

    it(':checkboxProps[object]', () => {
      const wrapper = mountGroup({ checkboxProps: { disabled: true } });
      const checkboxes = wrapper.findAll('input[type="checkbox"]');
      expect(checkboxes.slice(1).every((item) => (item.element as HTMLInputElement).disabled)).toBe(true);
    });
  });

  describe('events', () => {
    it('onChange checks every enabled column without duplicating existing values', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroup({ value: ['name', 'external'], onChange });
      await wrapper.find('input[type="checkbox"]').setValue(true);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(['name', 'external', 'status']);
      expect(onChange.mock.calls[0][1].type).toBe('check');
    });

    it('onChange unchecks only the columns owned by the group', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroup({ value: ['name', 'status', 'external'], onChange });
      await wrapper.find('input[type="checkbox"]').setValue(false);

      expect(onChange.mock.calls[0][0]).toEqual(['external']);
      expect(onChange.mock.calls[0][1].type).toBe('uncheck');
    });

    it('onChange forwards an individual checkbox change', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroup({ onChange });
      await wrapper.findAll('input[type="checkbox"]')[1].setValue(true);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(['name']);
      expect(onChange.mock.calls[0][1].current).toBe('name');
    });
  });
});
