import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Dialog', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/dialog/demos/base.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('others demo works fine', () => {
    const demo = require('@/examples/dialog/demos/others.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('plugin demo works fine', () => {
    const demo = require('@/examples/dialog/demos/plugin.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('position demo works fine', () => {
    const demo = require('@/examples/dialog/demos/position.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
