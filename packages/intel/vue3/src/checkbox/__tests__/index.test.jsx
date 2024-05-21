import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import Checkbox, { CheckboxGroup } from 'tdesign-vue-next';

describe('checkbox', () => {
  describe(':props', () => {
    it(':checked', () => {
      const checked = ref(true);
      const wrapper = mount(() => <Checkbox v-model={checked.value} />);
      const checkbox = wrapper.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-checked');
    });

    it(':defaultChecked', () => {
      const checked = ref(true);
      const wrapper = mount(() => <Checkbox defaultChecked={checked.value} />);
      const checkbox = wrapper.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-checked');
    });

    it(':default', () => {
      const checked = ref(true);
      const wrapper = mount(() => <Checkbox defaultChecked={checked.value} default="checkbox" />);
      const label = wrapper.find('.t-checkbox__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('checkbox');
    });

    it(':disabled', () => {
      const wrapper = mount(() => <Checkbox disabled default="checkbox" />);
      const checkbox = wrapper.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-disabled');
    });

    it(':indeterminate', () => {
      const wrapper = mount(() => <Checkbox indeterminate default="checkbox" />);
      const checkbox = wrapper.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-indeterminate');
    });

    it(':label', () => {
      const wrapper = mount(() => <Checkbox label="label" />);
      const label = wrapper.find('.t-checkbox__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':name', () => {
      const wrapper = mount(() => <Checkbox name="name" />);
      const input = wrapper.find('.t-checkbox input');
      expect(input.element.getAttribute('name')).toBe('name');
    });
  });
  describe(': events', () => {
    it(':onChange', async () => {
      const checked = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Checkbox v-model={checked.value} label="label" onChange={fn} />);
      const input = wrapper.find('input');
      await input.trigger('change');
      expect(fn).toBeCalled();
      expect(checked.value).toBeFalsy();
    });
  });
});

describe('checkboxGroup', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox');
      expect(checkboxs.length).toBe(2);
    });

    it(':disabled', () => {
      const wrapper = mount(() => (
        <CheckboxGroup disabled>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox');
      expect(checkboxs[0].classes()).toContain('t-is-disabled');
      expect(checkboxs[1].classes()).toContain('t-is-disabled');
    });

    it(':name', () => {
      const wrapper = mount(() => (
        <CheckboxGroup name="name">
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox input');
      expect(checkboxs[0].element.getAttribute('name')).toBe('name');
      expect(checkboxs[1].element.getAttribute('name')).toBe('name');
    });

    it(':value', () => {
      const checked = ref(['1']);
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value}>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox');
      expect(checkboxs[0].classes()).toContain('t-is-checked');
      expect(checkboxs[1].classes()).not.toContain('t-is-checked');
    });

    it(':value', () => {
      const defaultValue = ref(['1']);
      const wrapper = mount(() => (
        <CheckboxGroup defaultValue={defaultValue.value}>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox');
      expect(checkboxs[0].classes()).toContain('t-is-checked');
      expect(checkboxs[1].classes()).not.toContain('t-is-checked');
    });

    it(':options', () => {
      const defaultValue = ref(['1']);
      const options = [
        {
          label: '选项一',
          value: '1',
        },
        {
          label: '选项二',
          value: '2',
        },
      ];
      const wrapper = mount(() => <CheckboxGroup defaultValue={defaultValue.value} options={options}></CheckboxGroup>);
      const checkboxs = wrapper.findAll('.t-checkbox');
      expect(checkboxs.length).toBe(2);
      expect(checkboxs[0].classes()).toContain('t-is-checked');
      expect(checkboxs[1].classes()).not.toContain('t-is-checked');
    });
  });

  describe(':events', () => {
    it(':checkAll', async () => {
      const checked = ref([]);
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value}>
          <Checkbox checkAll>全选</Checkbox>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox input');
      await checkboxs[0].trigger('change');
      expect(checked.value).toEqual(['1', '2']);
    });

    it(':onChange', async () => {
      const checked = ref(['1']);
      const fn = vi.fn();
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value} onChange={fn}>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox input');
      await checkboxs[1].trigger('change');
      expect(fn).toBeCalled();
      expect(checked.value).toEqual(['1', '2']);
    });
  });
});
