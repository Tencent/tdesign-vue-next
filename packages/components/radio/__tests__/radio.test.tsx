// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { Radio, RadioGroup, RadioButton } from '@tdesign/components/radio';
import { getRadioGroupKidsMount, getRadioGroupDefaultMount } from './mount';

describe('Radio Component', () => {
  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio checked={true} allowUncheck={true} onChange={onChangeFn}></Radio>);
    wrapper.findComponent(Radio).trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(false);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.checked works fine', () => {
    // checked default value is false
    const wrapper1 = mount(<Radio></Radio>);
    expect(wrapper1.classes('t-is-checked')).toBeFalsy();
    // checked = true
    const wrapper2 = mount(<Radio checked={true}></Radio>);
    expect(wrapper2.classes('t-is-checked')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // checked = false
    const wrapper3 = mount(<Radio checked={false}></Radio>);
    expect(wrapper3.classes('t-is-checked')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it(`props.checked is equal to true`, () => {
    const wrapper = mount(<Radio checked={true}></Radio>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.checked).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Radio default={() => <span class="custom-node">TNode</span>}></Radio>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Radio v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Radio>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled works fine', () => {
    // disabled default value is undefined
    const wrapper1 = mount(<Radio>Text</Radio>);
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Radio disabled={true}>Text</Radio>);
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // disabled = false
    const wrapper3 = mount(<Radio disabled={false}>Text</Radio>);
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.disabled works fine', async () => {
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

  it('props.name works fine', () => {
    const wrapper = mount(<Radio name={'radio-gender-name'}></Radio>).find('input');
    expect(wrapper.attributes('name')).toBe('radio-gender-name');
  });

  it('Events.change: checked default value is false, click radio and trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio onChange={onChangeFn}></Radio>);
    wrapper.find('.t-radio__label').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(true);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: checked value is true, without allowUncheck, click radio and can not trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio checked={true} onChange={onChangeFn}></Radio>);
    wrapper.find('.t-radio__label').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });
});

describe('RadioGroup Component', () => {
  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount({ value: 1, allowUncheck: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount({ value: 1, allowUncheck: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.disabled is equal true', () => {
    const wrapper = getRadioGroupDefaultMount({ disabled: true });
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled is equal true', () => {
    const wrapper = getRadioGroupKidsMount({ disabled: true });
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Props.disabled: disabled radio can not trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount({ disabled: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it('Props.disabled: disabled radio can not trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount({ disabled: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it(`props.name is equal to 'custom-radio-name'`, () => {
    const wrapper = getRadioGroupDefaultMount({ name: 'custom-radio-name' });
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('name')).toBe('custom-radio-name');
    expect(wrapper.element).toMatchSnapshot();
  });

  it(`props.name is equal to 'custom-radio-name'`, () => {
    const wrapper = getRadioGroupKidsMount({ name: 'custom-radio-name' });
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('name')).toBe('custom-radio-name');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.options works fine. `{".t-radio":4}` should exist', () => {
    const wrapper = getRadioGroupDefaultMount();
    expect(wrapper.findAll('.t-radio').length).toBe(4);
  });

  it('props.options works fine. `".custom-node"` should exist', () => {
    const wrapper = getRadioGroupDefaultMount();
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.options works fine. `{".t-radio.t-is-disabled":1}` should exist', () => {
    const wrapper = getRadioGroupDefaultMount();
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(1);
  });

  it(`props.value is equal to '2'`, () => {
    const wrapper = getRadioGroupDefaultMount({ value: '2' });
    const domWrapper = wrapper.find('.t-radio.t-is-checked input');
    expect(domWrapper.element.value).toBe('2');
  });

  it(`props.value is equal to '2'`, () => {
    const wrapper = getRadioGroupKidsMount({ value: '2' });
    const domWrapper = wrapper.find('.t-radio.t-is-checked input');
    expect(domWrapper.element.value).toBe('2');
  });

  const variantClassNameList = ['t-radio-group__outline', 't-radio-group--primary-filled', 't-radio-group--filled'];
  ['outline', 'primary-filled', 'default-filled'].forEach((item, index) => {
    it(`props.variant is equal to ${item}`, () => {
      const wrapper = mount(<RadioGroup variant={item}></RadioGroup>);
      if (typeof variantClassNameList[index] === 'string') {
        expect(wrapper.classes(variantClassNameList[index])).toBeTruthy();
      } else if (typeof variantClassNameList[index] === 'object') {
        const classNameKey = Object.keys(variantClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('Events.change: default value is 2, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount({ value: 2 }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: default value is empty, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount({}, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('Events.change: default value is 2, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount({ value: 2 }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: default value is empty, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount({}, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
});

describe('Radio', () => {
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

describe('RadioGroup', () => {
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
    it(':theme', () => {
      const wrapper = mount(() => (
        <RadioGroup theme="radio">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));
      expect(wrapper.findComponent(Radio)).toBeTruthy();
      const wrapper2 = mount(() => (
        <RadioGroup theme="button">
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
        </RadioGroup>
      ));

      expect(wrapper2.findComponent(RadioButton)).toBeTruthy();
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
