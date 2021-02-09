import { mount } from '@vue/test-utils';
import base from '@/examples/badge/demos/base.vue';
import number from '@/examples/badge/demos/number.vue';
import custom from '@/examples/badge/demos/custom.vue';
import shape from '@/examples/badge/demos/shape.vue';
import offset from '@/examples/badge/demos/offset.vue';
import size from '@/examples/badge/demos/size.vue';

// unit test for component in examples.
describe('Badge', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('number demo works fine', () => {
    const wrapper = mount(number);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('custom demo works fine', () => {
    const wrapper = mount(custom);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shape demo works fine', () => {
    const wrapper = mount(shape);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('offset demo works fine', () => {
    const wrapper = mount(offset);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
});
