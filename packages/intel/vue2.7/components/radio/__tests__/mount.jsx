import { mount } from '@vue/test-utils';
import { Radio } from '..';

// options 写法
export function getRadioGroupDefaultMount(RadioGroup, props, events) {
  const options = [
    { label: 'Radio1', value: 1 },
    { label: 'Radio2', value: '2', allowUncheck: true },
    { label: (h) => <span class="custom-node">Radio3</span>, value: 3 },
    { label: 'Radio4', value: 4, disabled: true },
  ];
  return mount(RadioGroup, {
    propsData: {
      ...props,
      options,
    },
    listeners: events,
  });
}

// 子组件写法
export function getRadioGroupKidsMount(RadioGroup, props, events) {
  return mount({
    render() {
      return (
        <RadioGroup props={props} on={events}>
          <Radio value={1}>Radio1</Radio>
          <Radio value="2" allowUncheck>
            Radio2
          </Radio>
          <Radio value="3">Radio3</Radio>
          <Radio value="4" disabled>
            Radio4
          </Radio>
        </RadioGroup>
      );
    },
  });
}
