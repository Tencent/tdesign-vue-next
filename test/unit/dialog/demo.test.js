import { mount } from '@vue/test-utils';
import base from '@/examples/dialog/demos/base.vue';
import others from '@/examples/dialog/demos/others.vue';
import plugin from '@/examples/dialog/demos/plugin.vue';
import position from '@/examples/dialog/demos/position.vue';

// unit test for component in examples.
describe('Dialog', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('others demo works fine', () => {
    const wrapper = mount(others);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('plugin demo works fine', () => {
    const wrapper = mount(plugin);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('position demo works fine', () => {
    const wrapper = mount(position);
    expect(wrapper.element).toMatchSnapshot();
  });
});
