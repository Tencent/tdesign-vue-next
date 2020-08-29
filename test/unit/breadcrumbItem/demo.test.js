import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Breadcrumb-item', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/breadcrumbItem/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('base demo works fine', () => {
    const demo = require('@/examples/breadcrumbItem/demos/overlay.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
