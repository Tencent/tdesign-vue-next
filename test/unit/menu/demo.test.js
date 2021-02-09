import { mount } from '@vue/test-utils';
import demo from '@/examples/menu/demos/single.vue';

// unit test for component in examples.
describe('Menu', () => {
  it('single demo works fine', () => {
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
