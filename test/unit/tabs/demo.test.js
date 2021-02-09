import { mount } from '@vue/test-utils';
import base from '@/examples/tabs/demos/base.vue';
import ban from '@/examples/tabs/demos/ban.vue';
import operation from '@/examples/tabs/demos/operation.vue';
import position from '@/examples/tabs/demos/position.vue';
import combination from '@/examples/tabs/demos/combination.vue';
import size from '@/examples/tabs/demos/size.vue';
import custom from '@/examples/tabs/demos/custom.vue';

// unit test for component in examples.
describe('Tabs', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('ban demo works fine', () => {
    const wrapper = mount(ban);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('operation demo works fine', () => {
    const wrapper = mount(operation);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('position demo works fine', () => {
    const wrapper = mount(position);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('combination demo works fine', () => {
    const wrapper = mount(combination);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('custom demo works fine', () => {
    const wrapper = mount(custom);
    expect(wrapper.element).toMatchSnapshot();
  });
});
