import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import Radio, { RadioGroup } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('radio', () => {
  // test props api
  describe(':props', () => {
    it(':checked', () => {
      const wrapper = mount(() => <Radio checked></Radio>);
      const radio = wrapper.find('.t-radio');
      expect(radio.exists()).toBeTruthy();
      expect(radio.classes()).toContain('t-is-checked');
    });
    it(':defaultChecked', () => {
      const wrapper = mount(() => <Radio checked></Radio>);
      const radio = wrapper.find('.t-radio');
      expect(radio.exists()).toBeTruthy();
      expect(radio.classes()).toContain('t-is-checked');
    });
    it(':disabled', () => {
      const wrapper = mount(() => <Radio disabled></Radio>);
      const radio = wrapper.find('.t-radio');
      expect(radio.classes()).toContain('t-is-disabled');
    });
    it(':name', () => {
      const wrapper = mount(() => <Radio name="name"></Radio>);
      const input = wrapper.find('.t-radio input');
      expect(input.element.getAttribute('name')).toBe('name');
    });
    it(':default', () => {
      const wrapper = mount(() => <Radio default="label"></Radio>);
      const label = wrapper.find('.t-radio__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });
    it(':label', () => {
      const wrapper = mount(() => <Radio label="label"></Radio>);
      const label = wrapper.find('.t-radio__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });
    it(':allowUncheck', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Radio allowUncheck onChange={fn}>
          label
        </Radio>
      ));
      const radio = wrapper.find('.t-radio');
      await radio.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });
  });
  describe(':events', () => {
    it(':onChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Radio onChange={fn}>label</Radio>);
      const radio = wrapper.find('.t-radio');
      await radio.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Radio onClick={fn}>label</Radio>);
      await wrapper.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });
  });
});

describe('radioGroup', () => {
  describe(':props', () => {
    it(':disabled', () => {
      const wrapper = mount(() => (
        <RadioGroup disabled>
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      const radioList = wrapper.findAll('.t-radio');
      radioList.forEach((radio) => {
        expect(radio.classes()).toContain('t-is-disabled');
      });
    });

    it(':name', () => {
      const wrapper = mount(() => (
        <RadioGroup name="name">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      const inputList = wrapper.findAll('.t-radio input');
      inputList.forEach((input) => {
        expect(input.element.getAttribute('name')).toBe('name');
      });
    });

    it(':size', () => {
      const sizeList = ['small', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => (
          <RadioGroup size={size}>
            <Radio value="1">选项一</Radio>
            <Radio value="2">选项二</Radio>
          </RadioGroup>
        ));
        expect(wrapper.find('.t-radio-group').classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':defaultValue', () => {
      const defaultValue = ref('1');
      const wrapper = mount(() => (
        <RadioGroup defaultValue={defaultValue.value}>
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      const inputList = wrapper.findAll('.t-radio');
      expect(inputList[0].classes()).toContain('t-is-checked');
      expect(inputList[1].classes()).not.toContain('t-is-checked');
    });
    it(':options', () => {
      const options = [
        {
          value: '1',
          label: '选项一',
          disabled: true,
        },
        {
          value: '2',
          label: '选项二',
        },
      ];
      const defaultValue = ref('1');
      const wrapper = mount(() => <RadioGroup defaultValue={defaultValue.value} options={options}></RadioGroup>);
      const inputList = wrapper.findAll('.t-radio');
      expect(inputList.length).toBe(2);
      expect(inputList[0].classes()).toContain('t-is-checked');
      expect(inputList[1].classes()).not.toContain('t-is-checked');
    });

    it(':variant', () => {
      const variantList = ['outline', 'primary-filled', 'default-filled'];
      const wrapper1 = mount(() => (
        <RadioGroup variant="outline">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper1.find('.t-radio-group').classes()).toContain(`t-radio-group__outline`);
      const wrapper2 = mount(() => (
        <RadioGroup variant="primary-filled">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper2.find('.t-radio-group').classes()).toContain(`t-radio-group--primary-filled`);
      const wrapper3 = mount(() => (
        <RadioGroup variant="default-filled">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper3.find('.t-radio-group').classes()).toContain(`t-radio-group--filled`);
    });
  });

  describe(':events', () => {
    it(':onChange', async () => {
      const defaultValue = ref('1');
      const fn = vi.fn();
      const wrapper = mount(() => (
        <RadioGroup v-model={defaultValue.value} onChange={fn}>
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      const radioList = wrapper.findAll('.t-radio');
      expect(radioList[0].classes()).toContain('t-is-checked');
      await radioList[1].trigger('click');
      expect(fn).toBeCalled();
      expect(radioList[1].classes()).toContain('t-is-checked');
      expect(defaultValue.value).toBe('2');
    });
  });
});
