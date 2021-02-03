import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Time-picker', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/time-picker/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
