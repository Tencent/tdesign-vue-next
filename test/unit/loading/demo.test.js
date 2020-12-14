import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Loading', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/loading/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('delay demo works fine', () => {
    const demo = require('@/examples/loading/demos/delay.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('fullscreen demo works fine', () => {
    const demo = require('@/examples/loading/demos/fullscreen.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('indicatorFunc demo works fine', () => {
    const demo = require('@/examples/loading/demos/indicatorFunc.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('indicatorSlot demo works fine', () => {
    const demo = require('@/examples/loading/demos/indicatorSlot.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('preventScrollThrough demo works fine', () => {
    const demo = require('@/examples/loading/demos/preventScrollThrough.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('service demo works fine', () => {
    const demo = require('@/examples/loading/demos/service.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const demo = require('@/examples/loading/demos/size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('text demo works fine', () => {
    const demo = require('@/examples/loading/demos/text.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('wrap demo works fine', () => {
    const demo = require('@/examples/loading/demos/wrap.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
