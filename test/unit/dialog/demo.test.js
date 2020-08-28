import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Dialog', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/dialog/demos/base.vue').default;
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
