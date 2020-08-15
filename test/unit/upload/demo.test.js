import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Upload', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/upload/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
