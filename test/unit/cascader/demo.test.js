import { mount } from '@vue/test-utils';
import base from '@/examples/cascader/demos/base.vue';

// unit test for component in examples.
describe('Cascader', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
});
