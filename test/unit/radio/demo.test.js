import { mount } from '@vue/test-utils';
import base from '@/examples/radio/demos/base.vue';
import group from '@/examples/radio/demos/group.vue';
import button from '@/examples/radio/demos/button.vue';
import size from '@/examples/radio/demos/size.vue';

// unit test for component in examples.
describe('Radio', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio group demo works fine', () => {
    const wrapper = mount(group);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button demo works fine', () => {
    const wrapper = mount(button);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('radio button size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
});

