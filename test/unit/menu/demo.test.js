import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Menu', () => {
  it('single demo works fine', () => {
    const demo = require('@/examples/menu/demos/single.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
