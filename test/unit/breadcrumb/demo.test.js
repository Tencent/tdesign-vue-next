import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Breadcrumb', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/breadcrumb/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('custom demo works fine', () => {
    const demo = require('@/examples/breadcrumb/demos/custom.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('to demo works fine', () => {
    const demo = require('@/examples/breadcrumb/demos/to.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
