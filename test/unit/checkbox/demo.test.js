import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Checkbox', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/checkbox/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('indeterminate demo works fine', () => {
    const demo = require('@/examples/checkbox/demos/indeterminate.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('checkbox group demo works fine', () => {
    const demo = require('@/examples/checkbox/demos/checkbox-group.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
