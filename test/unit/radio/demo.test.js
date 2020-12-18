import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Radio', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/radio/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio group demo works fine', () => {
    const demo = require('@/examples/radio/demos/group.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button demo works fine', () => {
    const demo = require('@/examples/radio/demos/button.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button size demo works fine', () => {
    const demo = require('@/examples/radio/demos/size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});

