import { mount } from '@vue/test-utils';
import base from '@/examples/alert/demos/base.vue';
import icon from '@/examples/alert/demos/icon.vue';
import close from '@/examples/alert/demos/close.vue';
import operation from '@/examples/alert/demos/operation.vue';
import title from '@/examples/alert/demos/title.vue';
import collapse from '@/examples/alert/demos/collapse.vue';
import swiper from '@/examples/alert/demos/swiper.vue';

describe('Alert', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('icon demo works fine', () => {
    const wrapper = mount(icon);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('close demo works fine', () => {
    const wrapper = mount(close);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('operation demo works fine', () => {
    const wrapper = mount(operation);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('title demo works fine', () => {
    const wrapper = mount(title);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('collapse demo works fine', () => {
    const wrapper = mount(collapse);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('swiper demo works fine', () => {
    const wrapper = mount(swiper);
    expect(wrapper.element).toMatchSnapshot();
  });
});
