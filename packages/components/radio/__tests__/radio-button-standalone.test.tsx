// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { RadioButton } from '@tdesign/components/radio';

describe('RadioButton standalone', () => {
  it('renders checked state when used without RadioGroup', () => {
    const wrapper = mount(
      <RadioButton value="1" checked={true}>
        按钮
      </RadioButton>,
    );
    expect(wrapper.find('.t-is-checked').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('renders defaultChecked initial state when used without RadioGroup', () => {
    const wrapper = mount(
      <RadioButton value="1" defaultChecked={true}>
        按钮
      </RadioButton>,
    );
    expect(wrapper.find('.t-is-checked').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('keeps selected after uncontrolled click', async () => {
    const wrapper = mount(<RadioButton value="1">按钮</RadioButton>);
    expect(wrapper.find('.t-is-checked').exists()).toBeFalsy();
    await wrapper.find('.t-radio-button').trigger('click');
    await nextTick();
    expect(wrapper.find('.t-is-checked').exists()).toBeTruthy();
    wrapper.unmount();
  });
});
