import { mount } from '@vue/test-utils';
import base from '@/examples/tag/demos/base.vue';
import plain from '@/examples/tag/demos/plain.vue';
import selectable from '@/examples/tag/demos/selectable.vue';
import deleteDemo from '@/examples/tag/demos/delete.vue';
import icon from '@/examples/tag/demos/icon.vue';
import longText from '@/examples/tag/demos/long-text.vue';
import size from '@/examples/tag/demos/size.vue';
import shape from '@/examples/tag/demos/shape.vue';

describe('Tag', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('plain demo works fine', () => {
    const wrapper = mount(plain);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('selectable demo works fine', () => {
    const wrapper = mount(selectable);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('delete demo works fine', () => {
    const wrapper = mount(deleteDemo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('icon demo works fine', () => {
    const wrapper = mount(icon);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('long-text demo works fine', () => {
    const wrapper = mount(longText);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('shape demo works fine', () => {
    const wrapper = mount(shape);
    expect(wrapper.element).toMatchSnapshot();
  });
});
