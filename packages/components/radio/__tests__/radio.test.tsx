// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { Radio, RadioGroup, RadioButton } from '@tdesign/components/radio';
import { getRadioGroupKidsMount, getRadioGroupDefaultMount } from './mount';

describe('Radio', () => {
  describe('props', () => {
    it(':allowUncheck', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Radio checked={true} allowUncheck={true} onChange={onChangeFn}></Radio>);
      wrapper.findComponent(Radio).trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(false);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':checked[false]', () => {
      const wrapper = mount(<Radio></Radio>);
      expect(wrapper.classes('t-is-checked')).toBeFalsy();
    });

    it(':checked[true]', () => {
      const wrapper = mount(<Radio checked={true}></Radio>);
      expect(wrapper.classes('t-is-checked')).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':checked[false] explicit', () => {
      const wrapper = mount(<Radio checked={false}></Radio>);
      expect(wrapper.classes('t-is-checked')).toBeFalsy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':checked input element', () => {
      const wrapper = mount(<Radio checked={true}></Radio>);
      const domWrapper = wrapper.find('input');
      expect(domWrapper.element.checked).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultChecked', () => {
      const wrapper = mount(() => <Radio checked></Radio>);
      const radio = wrapper.find('.t-radio');
      expect(radio.exists()).toBeTruthy();
      expect(radio.classes()).toContain('t-is-checked');
    });

    it(':default[function]', () => {
      const wrapper = mount(<Radio default={() => <span class="custom-node">TNode</span>}></Radio>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':default[slot]', () => {
      const wrapper = mount(<Radio v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Radio>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':default[string]', () => {
      const wrapper = mount(() => <Radio default="label"></Radio>);
      const label = wrapper.find('.t-radio__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':disabled[false]', () => {
      const wrapper = mount(<Radio>Text</Radio>);
      expect(wrapper.classes('t-is-disabled')).toBeFalsy();
    });

    it(':disabled[true]', () => {
      const wrapper = mount(<Radio disabled={true}>Text</Radio>);
      expect(wrapper.classes('t-is-disabled')).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled[false] explicit', () => {
      const wrapper = mount(<Radio disabled={false}>Text</Radio>);
      expect(wrapper.classes('t-is-disabled')).toBeFalsy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled prevents onChange', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(
        <Radio disabled={true} onChange={onChangeFn}>
          Text
        </Radio>,
      );
      wrapper.findComponent(Radio).trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it(':label', () => {
      const wrapper = mount(() => <Radio label="label"></Radio>);
      const label = wrapper.find('.t-radio__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':name', () => {
      const wrapper = mount(<Radio name={'radio-gender-name'}></Radio>).find('input');
      expect(wrapper.attributes('name')).toBe('radio-gender-name');
    });

    it(':name attribute', () => {
      const wrapper = mount(() => <Radio name="name"></Radio>);
      const input = wrapper.find('.t-radio input');
      expect(input.element.getAttribute('name')).toBe('name');
    });
  });

  describe('events', () => {
    it(':onChange when unchecked', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Radio onChange={onChangeFn}></Radio>);
      wrapper.find('.t-radio__label').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(true);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':onChange when checked without allowUncheck', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Radio checked={true} onChange={onChangeFn}></Radio>);
      wrapper.find('.t-radio__label').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it(':onChange with allowUncheck', async () => {
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

    it(':onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Radio onClick={fn}>label</Radio>);
      await wrapper.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });
  });
});

describe('RadioGroup', () => {
  describe('props', () => {
    it(':allowUncheck with options', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupDefaultMount({ value: 1, allowUncheck: true }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':allowUncheck with children', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupKidsMount({ value: 1, allowUncheck: true }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
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

    it(':disabled with options', () => {
      const wrapper = getRadioGroupDefaultMount({ disabled: true });
      expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled with children', () => {
      const wrapper = getRadioGroupKidsMount({ disabled: true });
      expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled with children (JSX)', () => {
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

    it(':disabled prevents onChange with options', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupDefaultMount({ disabled: true }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it(':disabled prevents onChange with children', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupKidsMount({ disabled: true }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it(':name with options', () => {
      const wrapper = getRadioGroupDefaultMount({ name: 'custom-radio-name' });
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('name')).toBe('custom-radio-name');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':name with children', () => {
      const wrapper = getRadioGroupKidsMount({ name: 'custom-radio-name' });
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('name')).toBe('custom-radio-name');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':name with children (JSX)', () => {
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

    it(':options render radios', () => {
      const wrapper = getRadioGroupDefaultMount();
      expect(wrapper.findAll('.t-radio').length).toBe(4);
    });

    it(':options with custom node', () => {
      const wrapper = getRadioGroupDefaultMount();
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':options with disabled item', () => {
      const wrapper = getRadioGroupDefaultMount();
      expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(1);
    });

    it(':options with data', () => {
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

    it(':theme[radio]', () => {
      const wrapper = mount(() => (
        <RadioGroup theme="radio">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.findComponent(Radio)).toBeTruthy();
    });

    it(':theme[button]', () => {
      const wrapper = mount(() => (
        <RadioGroup theme="button">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.findComponent(RadioButton)).toBeTruthy();
    });

    it(':theme[button] with options renders RadioButton', () => {
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' },
      ];
      const wrapper = mount(() => <RadioGroup theme="button" options={options} defaultValue="1"></RadioGroup>);
      const radioButtons = wrapper.findAllComponents(RadioButton);
      expect(radioButtons.length).toBe(3);
      expect(radioButtons[0].classes()).toContain('t-is-checked');
    });

    it(':theme[radio] with options renders Radio', () => {
      const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
      ];
      const wrapper = mount(() => <RadioGroup theme="radio" options={options}></RadioGroup>);
      const radios = wrapper.findAllComponents(Radio);
      expect(radios.length).toBe(2);
    });

    it(':options with number or string values', () => {
      const options = [1, 2, 'three', 4];
      const wrapper = mount(() => <RadioGroup options={options} defaultValue={2}></RadioGroup>);
      const radios = wrapper.findAll('.t-radio');
      expect(radios.length).toBe(4);
      expect(radios[1].classes()).toContain('t-is-checked');
      expect(radios[1].text()).toBe('2');
    });

    it(':variant outline does not render background block', () => {
      const wrapper = mount(() => (
        <RadioGroup variant="outline" defaultValue="1" theme="button">
          <RadioButton value="1">选项一</RadioButton>
          <RadioButton value="2">选项二</RadioButton>
        </RadioGroup>
      ));
      expect(wrapper.find('.t-radio-group__bg-block').exists()).toBeFalsy();
    });

    it(':value with options', () => {
      const wrapper = getRadioGroupDefaultMount({ value: '2' });
      const domWrapper = wrapper.find('.t-radio.t-is-checked input');
      expect(domWrapper.element.value).toBe('2');
    });

    it(':value with children', () => {
      const wrapper = getRadioGroupKidsMount({ value: '2' });
      const domWrapper = wrapper.find('.t-radio.t-is-checked input');
      expect(domWrapper.element.value).toBe('2');
    });

    it(':variant[outline]', () => {
      const wrapper = mount(<RadioGroup variant="outline"></RadioGroup>);
      expect(wrapper.classes('t-radio-group__outline')).toBeTruthy();
    });

    it(':variant[primary-filled]', () => {
      const wrapper = mount(<RadioGroup variant="primary-filled"></RadioGroup>);
      expect(wrapper.classes('t-radio-group--primary-filled')).toBeTruthy();
    });

    it(':variant[default-filled]', () => {
      const wrapper = mount(<RadioGroup variant="default-filled"></RadioGroup>);
      expect(wrapper.classes('t-radio-group--filled')).toBeTruthy();
    });

    it(':variant with children (outline)', () => {
      const wrapper = mount(() => (
        <RadioGroup variant="outline">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.find('.t-radio-group').classes()).toContain(`t-radio-group__outline`);
    });

    it(':variant with children (primary-filled)', () => {
      const wrapper = mount(() => (
        <RadioGroup variant="primary-filled">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.find('.t-radio-group').classes()).toContain(`t-radio-group--primary-filled`);
    });

    it(':variant with children (default-filled)', () => {
      const wrapper = mount(() => (
        <RadioGroup variant="default-filled">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.find('.t-radio-group').classes()).toContain(`t-radio-group--filled`);
    });

    it(':variant filled bar style calculation', async () => {
      const value = ref('1');
      const wrapper = mount(() => (
        <RadioGroup variant="primary-filled" v-model={value.value}>
          <RadioButton value="1">选项一</RadioButton>
          <RadioButton value="2">选项二</RadioButton>
        </RadioGroup>
      ));
      await nextTick();
      const bgBlock = wrapper.find('.t-radio-group__bg-block');
      expect(bgBlock.exists()).toBeTruthy();

      // Change value to trigger bar style recalculation
      value.value = '2';
      await nextTick();
      expect(bgBlock.exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it(':onChange with options (value: 2)', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupDefaultMount({ value: 2 }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(1);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':onChange with options (empty value)', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupDefaultMount({}, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(1);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':onChange with children (value: 2)', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupKidsMount({ value: 2 }, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(1);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':onChange with children (empty value)', async () => {
      const onChangeFn = vi.fn();
      const wrapper = getRadioGroupKidsMount({}, { onChange: onChangeFn });
      wrapper.find('.t-radio').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(1);
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    });

    it(':onChange with v-model', async () => {
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

describe('RadioButton', () => {
  describe('props', () => {
    it(':defaultChecked', () => {
      const wrapper = mount(<RadioButton defaultChecked={true}>Button</RadioButton>);
      expect(wrapper.text()).toBe('Button');
    });

    it(':disabled', () => {
      const wrapper = mount(<RadioButton disabled={true}>Disabled Button</RadioButton>);
      expect(wrapper.find('.t-radio-button').classes()).toContain('t-is-disabled');
    });
  });
});

describe('RadioGroup Keyboard', () => {
  it('keyboard Enter key to select radio', async () => {
    const wrapper = mount(() => (
      <RadioGroup defaultValue="1">
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
        <Radio value="3">选项三</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[1].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(radioList[1].classes()).toContain('t-is-checked');
  });

  it('keyboard with allowUncheck', async () => {
    const wrapper = mount(() => (
      <RadioGroup defaultValue="1" allowUncheck>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    expect(radioList[0].classes()).toContain('t-is-checked');

    // Press Enter on checked radio with allowUncheck should uncheck it
    await radioList[0].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(radioList[0].classes()).not.toContain('t-is-checked');
  });

  it('keyboard with number value', async () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio value={1}>选项一</Radio>
        <Radio value={2}>选项二</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[0].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(radioList[0].classes()).toContain('t-is-checked');
  });

  it('keyboard with boolean value', async () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio value={true}>True</Radio>
        <Radio value={false}>False</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[0].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(radioList[0].classes()).toContain('t-is-checked');
  });

  it('keyboard with string value', async () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio value="option1">选项一</Radio>
        <Radio value="option2">选项二</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[1].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(radioList[1].classes()).toContain('t-is-checked');
  });

  it('keyboard with quoted string value', async () => {
    const fn = vi.fn();
    const wrapper = mount(() => (
      <RadioGroup onChange={fn}>
        <Radio value="'quoted'">Quoted</Radio>
        <Radio value="normal">Normal</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[0].trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(fn).toHaveBeenCalled();
  });

  it('keyboard event should not trigger when target has no input', async () => {
    const wrapper = mount(() => (
      <RadioGroup defaultValue="1">
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
      </RadioGroup>
    ));
    await nextTick();

    // Trigger keydown on the group itself, not on radio
    await wrapper.find('.t-radio-group').trigger('keydown', { key: 'Enter' });
    await nextTick();

    // Value should remain unchanged
    const radioList = wrapper.findAll('.t-radio');
    expect(radioList[0].classes()).toContain('t-is-checked');
  });

  it('keyboard with non-checked keys should not trigger', async () => {
    const fn = vi.fn();
    const wrapper = mount(() => (
      <RadioGroup onChange={fn}>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
      </RadioGroup>
    ));
    await nextTick();

    const radioList = wrapper.findAll('.t-radio');
    await radioList[0].trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(fn).not.toHaveBeenCalled();
  });
});
