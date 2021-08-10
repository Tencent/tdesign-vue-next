import { mount } from '@vue/test-utils';
import base from '@/examples/textarea/demos/base.vue';
import blur from '@/examples/textarea/demos/blur.vue';
import disabled from '@/examples/textarea/demos/disabled.vue';
import keypress from '@/examples/textarea/demos/keypress.vue';
import maxlength from '@/examples/textarea/demos/maxlength.vue';
import readonly from '@/examples/textarea/demos/readonly.vue';

describe('Textarea', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('blur demo works fine', () => {
    const wrapper = mount(blur);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('disabled demo works fine', () => {
    const wrapper = mount(disabled);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('keypress demo works fine', () => {
    const wrapper = mount(keypress);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('maxlength demo works fine', () => {
    const wrapper = mount(maxlength);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('readonly demo works fine', () => {
    const wrapper = mount(readonly);
    expect(wrapper.element).toMatchSnapshot();
  });
});
