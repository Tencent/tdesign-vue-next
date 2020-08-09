import { mount } from '@vue/test-utils';

describe('Alert', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/alert/demos/base.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('icon demo works fine', () => {
    const demo = require('@/examples/alert/demos/icon.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('close demo works fine', () => {
    const demo = require('@/examples/alert/demos/close.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('operation demo works fine', () => {
    const demo = require('@/examples/alert/demos/operation.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('title demo works fine', () => {
    const demo = require('@/examples/alert/demos/title.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('collapse demo works fine', () => {
    const demo = require('@/examples/alert/demos/collapse.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('swiper demo works fine', () => {
    const demo = require('@/examples/alert/demos/swiper.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
