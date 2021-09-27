import { mount } from '@vue/test-utils';
import base from '@/examples/affix/demos/base.vue';
import container from '@/examples/affix/demos/container.vue';

describe('Affix', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('container demo works fine', () => {
    const wrapper = mount(container);
    expect(wrapper.element).toMatchSnapshot();
  });
});
