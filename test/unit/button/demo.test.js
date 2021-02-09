import { mount } from '@vue/test-utils';
import base from '@/examples/button/demos/base.vue';
import block from '@/examples/button/demos/block.vue';
import icon from '@/examples/button/demos/icon.vue';
import loading from '@/examples/button/demos/loading.vue';
import size from '@/examples/button/demos/size.vue';
import theme from '@/examples/button/demos/theme.vue';

describe('Button', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('block demo works fine', () => {
    const wrapper = mount(block);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon demo works fine', () => {
    const wrapper = mount(icon);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('loading demo works fine', () => {
    const wrapper = mount(loading);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('theme demo works fine', () => {
    const wrapper = mount(theme);
    expect(wrapper.element).toMatchSnapshot();
  });
});
