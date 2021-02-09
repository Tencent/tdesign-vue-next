import { mount } from '@vue/test-utils';
import base from '@/examples/input/demos/base.vue';
import addon from '@/examples/input/demos/addon.vue';
import group from '@/examples/input/demos/group.vue';
import password from '@/examples/input/demos/password.vue';
import disabled from '@/examples/input/demos/disabled.vue';
import status from '@/examples/input/demos/status.vue';
import size from '@/examples/input/demos/size.vue';

describe('Input', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('addon demo works fine', () => {
    const wrapper = mount(addon);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('group demo works fine', () => {
    const wrapper = mount(group);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('password demo works fine', () => {
    const wrapper = mount(password);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('disabled demo works fine', () => {
    const wrapper = mount(disabled);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('status demo works fine', () => {
    const wrapper = mount(status);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
});
