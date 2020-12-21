import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Tabs', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/tabs/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('ban demo works fine', () => {
    const demo = require('@/examples/tabs/demos/ban.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('operation demo works fine', () => {
    const demo = require('@/examples/tabs/demos/custom.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('position demo works fine', () => {
    const demo = require('@/examples/tabs/demos/position.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('combination demo works fine', () => {
    const demo = require('@/examples/tabs/demos/combination.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const demo = require('@/examples/tabs/demos/size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('custom demo works fine', () => {
    const demo = require('@/examples/tabs/demos/custom.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
