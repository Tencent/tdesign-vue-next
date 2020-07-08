import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Radio', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/radio/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('default checked demo works fine', () => {
    const demo = require('@/examples/radio/demos/default-checked.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('disabled demo works fine', () => {
    const demo = require('@/examples/radio/demos/disabled.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio group demo works fine', () => {
    const demo = require('@/examples/radio/demos/radio-group.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button demo works fine', () => {
    const demo = require('@/examples/radio/demos/radio-button.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button size demo works fine', () => {
    const demo = require('@/examples/radio/demos/radio-button-size.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});

