import { mount } from '@vue/test-utils';
import base from '@/examples/textarea/demos/base.vue';
import type from '@/examples/textarea/demos/type.vue';
import events from '@/examples/textarea/demos/events.vue';
import maxlength from '@/examples/textarea/demos/maxlength.vue';

describe('Textarea', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('type demo works fine', () => {
    const wrapper = mount(type);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('events demo works fine', () => {
    const wrapper = mount(events);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('maxlength demo works fine', () => {
    const wrapper = mount(maxlength);
    expect(wrapper.element).toMatchSnapshot();
  });
});
