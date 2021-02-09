import { mount } from '@vue/test-utils';
import base from '@/examples/divider/demos/base.vue';
import text from '@/examples/divider/demos/text.vue';
import vertical from '@/examples/divider/demos/vertical.vue';

// unit test for component in examples.
describe('Divider', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('text demo works fine', () => {
    const wrapper = mount(text);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('vertical demo works fine', () => {
    const wrapper = mount(vertical);
    expect(wrapper.element).toMatchSnapshot();
  });
});
