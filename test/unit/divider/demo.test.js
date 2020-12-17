import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Divider', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/divider/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('text demo works fine', () => {
    const demo = require('@/examples/divider/demos/text.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('vertical demo works fine', () => {
    const demo = require('@/examples/divider/demos/vertical.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
