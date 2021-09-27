import { mount } from '@vue/test-utils';
import demo from '@/examples/time-picker/demos/base.vue';

// unit test for component in examples.
describe('Time-picker', () => {
  it('base demo works fine', () => {
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
