import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Badge', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/badge/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('number demo works fine', () => {
    const demo = require('@/examples/badge/demos/number.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('custom demo works fine', () => {
    const demo = require('@/examples/badge/demos/custom.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shape demo works fine', () => {
    const demo = require('@/examples/badge/demos/shape.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('offset demo works fine', () => {
    const demo = require('@/examples/badge/demos/offset.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('size demo works fine', () => {
    const demo = require('@/examples/badge/demos/size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
