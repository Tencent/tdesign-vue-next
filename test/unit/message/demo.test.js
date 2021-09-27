import { mount } from '@vue/test-utils';
import type from '@/examples/message/demos/type.vue';
import close from '@/examples/message/demos/close.vue';
import closeAll from '@/examples/message/demos/close-all.vue';
import offset from '@/examples/message/demos/offset.vue';
import placement from '@/examples/message/demos/placement.vue';
import plugin from '@/examples/message/demos/plugin.vue';
import toggle from '@/examples/message/demos/toggle.vue';

// unit test for component in examples.
describe('Message', () => {
  it('type demo works fine', () => {
    const wrapper = mount(type);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('close demo works fine', () => {
    const wrapper = mount(close);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('closeAll demo works fine', () => {
    const wrapper = mount(closeAll);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('offset demo works fine', () => {
    const wrapper = mount(offset);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('placement demo works fine', () => {
    const wrapper = mount(placement);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('plugin demo works fine', () => {
    const wrapper = mount(plugin);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('toggle demo works fine', () => {
    const wrapper = mount(toggle);
    expect(wrapper.element).toMatchSnapshot();
  });
});
