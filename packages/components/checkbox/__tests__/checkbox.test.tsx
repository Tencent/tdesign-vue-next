import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import Checkbox, { CheckboxGroup } from '@tdesign/components/checkbox';

describe('Checkbox', () => {
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

describe('CheckboxGroup', () => {
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

    it(':value=null allows checking checkboxes', async () => {
      const checked = ref(null);
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value}>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox input');
      await checkboxs[0].trigger('change');
      expect(checked.value).toEqual(['1']);
    });

    it(':value=undefined allows checking checkboxes', async () => {
      const checked = ref(undefined);
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value}>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      const checkboxs = wrapper.findAll('.t-checkbox input');
      await checkboxs[0].trigger('change');
      expect(checked.value).toEqual(['1']);
    });
  });

  describe(':variant (button style)', () => {
    it('renders default checkbox class when variant is not set (no regression)', () => {
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      expect(wrapper.find('.t-checkbox').exists()).toBeTruthy();
      expect(wrapper.find('.t-checkbox-button').exists()).toBeFalsy();
    });

    it('switches children to t-checkbox-button when variant is set', () => {
      const wrapper = mount(() => (
        <CheckboxGroup variant="outline">
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
        </CheckboxGroup>
      ));
      expect(wrapper.find('.t-checkbox').exists()).toBeFalsy();
      expect(wrapper.findAll('.t-checkbox-button').length).toBe(2);
    });

    it.each([
      ['outline', 't-checkbox-group__outline'],
      ['default-filled', 't-checkbox-group--filled'],
      ['primary-filled', 't-checkbox-group--primary-filled'],
    ])('applies %s modifier class %s on the group root', (variant, expectedClass) => {
      const wrapper = mount(() => (
        <CheckboxGroup variant={variant as 'outline' | 'default-filled' | 'primary-filled'}>
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      const group = wrapper.find('.t-checkbox-group');
      expect(group.classes()).toContain(expectedClass);
    });

    it('primary-filled also carries the shared --filled modifier', () => {
      const wrapper = mount(() => (
        <CheckboxGroup variant="primary-filled">
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      const group = wrapper.find('.t-checkbox-group');
      expect(group.classes()).toContain('t-checkbox-group--filled');
      expect(group.classes()).toContain('t-checkbox-group--primary-filled');
    });

    it('applies size class on the group root, defaulting to medium', () => {
      const wrapper = mount(() => (
        <CheckboxGroup variant="outline">
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      expect(wrapper.find('.t-checkbox-group').classes()).toContain('t-size-m');
    });

    it('applies --vertical modifier only when variant is also set', () => {
      const withVariant = mount(() => (
        <CheckboxGroup variant="outline" direction="vertical">
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      expect(withVariant.find('.t-checkbox-group').classes()).toContain('t-checkbox-group--vertical');

      const withoutVariant = mount(() => (
        <CheckboxGroup direction="vertical">
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      expect(withoutVariant.find('.t-checkbox-group').classes()).not.toContain('t-checkbox-group--vertical');
    });

    it('warns in dev when direction=vertical is set without variant', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      mount(() => (
        <CheckboxGroup direction="vertical">
          <Checkbox value="1">选项一</Checkbox>
        </CheckboxGroup>
      ));
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('`direction` only takes effect when `variant` is set'),
      );
      warnSpy.mockRestore();
    });

    it('keeps checked/disabled/indeterminate state classes under button style', () => {
      const checked = ref(['1']);
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked.value} variant="outline">
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2" disabled>
            选项二
          </Checkbox>
          <Checkbox value="3" indeterminate>
            选项三
          </Checkbox>
        </CheckboxGroup>
      ));
      const buttons = wrapper.findAll('.t-checkbox-button');
      expect(buttons[0].classes()).toContain('t-is-checked');
      expect(buttons[1].classes()).toContain('t-is-disabled');
      expect(buttons[2].classes()).toContain('t-is-indeterminate');
    });
  });
});
