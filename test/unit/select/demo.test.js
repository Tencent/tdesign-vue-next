import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Select', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/select/demos/base.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
