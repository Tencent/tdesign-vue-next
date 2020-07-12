import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Breadcrumb-item', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/breadcrumb-item/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('base demo works fine', () => {
    const demo = require('@/examples/breadcrumb-item/demos/overlay.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
