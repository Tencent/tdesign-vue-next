import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Menu', () => {
  it('head-menu demo works fine', () => {
    const demo = require('@/examples/menu/demos/head-menu.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
