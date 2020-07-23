import { mount } from '@vue/test-utils';

describe('Button', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/input/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('addon demo works fine', () => {
    const demo = require('@/examples/input/demos/addon.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('group demo works fine', () => {
    const demo = require('@/examples/input/demos/group.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon demo works fine', () => {
    const demo = require('@/examples/input/demos/icon.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('disabled demo works fine', () => {
    const demo = require('@/examples/input/demos/disabled.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('status demo works fine', () => {
    const demo = require('@/examples/input/demos/status.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const demo = require('@/examples/input/demos/size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
