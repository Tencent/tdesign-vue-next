import { mount } from '@vue/test-utils';
import base from '@/examples/breadcrumbItem/demos/base.vue';
import overlay from '@/examples/breadcrumbItem/demos/overlay.vue';

// unit test for component in examples.
describe('Breadcrumb-item', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('base demo works fine', () => {
    const wrapper = mount(overlay);
    expect(wrapper.element).toMatchSnapshot();
  });
});
