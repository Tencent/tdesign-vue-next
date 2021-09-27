import { mount } from '@vue/test-utils';
import base from '@/examples/breadcrumb/demos/base.vue';
import custom from '@/examples/breadcrumb/demos/custom.vue';
import to from '@/examples/breadcrumb/demos/to.vue';
import href from '@/examples/breadcrumb/demos/href.vue';
import option from '@/examples/breadcrumb/demos/option.vue';

// unit test for component in examples.
describe('Breadcrumb', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('custom demo works fine', () => {
    const wrapper = mount(custom);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('to demo works fine', () => {
    const wrapper = mount(to);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('href demo works fine', () => {
    const wrapper = mount(href);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('option demo works fine', () => {
    const wrapper = mount(option);
    expect(wrapper.element).toMatchSnapshot();
  });
});
