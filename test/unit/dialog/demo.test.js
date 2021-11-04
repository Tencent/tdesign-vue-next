import { mount } from '@vue/test-utils';
import base from '@/examples/dialog/demos/base.vue';
import icon from '@/examples/dialog/demos/icon.vue';
import custom from '@/examples/dialog/demos/custom.vue';
import warning from '@/examples/dialog/demos/warning.vue';
import async from '@/examples/dialog/demos/async.vue';
import modal from '@/examples/dialog/demos/modal.vue';
import position from '@/examples/dialog/demos/position.vue';
import attach from '@/examples/dialog/demos/attach.vue';
import drag from '@/examples/dialog/demos/drag.vue';
import plugin from '@/examples/dialog/demos/plugin.vue';

// unit test for component in examples.
describe('Dialog', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon demo works fine', () => {
    const wrapper = mount(icon);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('custom demo works fine', () => {
    const wrapper = mount(custom);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('warning demo works fine', () => {
    const wrapper = mount(warning);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('async demo works fine', () => {
    const wrapper = mount(async);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('modal demo works fine', () => {
    const wrapper = mount(modal);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('position demo works fine', () => {
    const wrapper = mount(position);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('attach demo works fine', () => {
    const wrapper = mount(attach);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('drag demo works fine', () => {
    const wrapper = mount(drag);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('plugin demo works fine', () => {
    const wrapper = mount(plugin);
    expect(wrapper.element).toMatchSnapshot();
  });
});
