import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Drawer', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/drawer/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
