import { mount } from '@vue/test-utils';
import base from '@/examples/loading/demos/base.vue';
import delay from '@/examples/loading/demos/delay.vue';
import fullscreen from '@/examples/loading/demos/fullscreen.vue';
import iconText from '@/examples/loading/demos/iconText.vue';
import indicatorSlot from '@/examples/loading/demos/indicatorSlot.vue';
import preventScrollThrough from '@/examples/loading/demos/preventScrollThrough.vue';
import service from '@/examples/loading/demos/service.vue';
import size from '@/examples/loading/demos/size.vue';
import text from '@/examples/loading/demos/text.vue';
import wrap from '@/examples/loading/demos/wrap.vue';

// unit test for component in examples.
describe('Loading', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('delay demo works fine', () => {
    const wrapper = mount(delay);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('fullscreen demo works fine', () => {
    const wrapper = mount(fullscreen);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('iconText demo works fine', () => {
    const wrapper = mount(iconText);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('indicatorSlot demo works fine', () => {
    const wrapper = mount(indicatorSlot);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('preventScrollThrough demo works fine', () => {
    const wrapper = mount(preventScrollThrough);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('service demo works fine', () => {
    const wrapper = mount(service);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('size demo works fine', () => {
    const wrapper = mount(size);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('text demo works fine', () => {
    const wrapper = mount(text);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('wrap demo works fine', () => {
    const wrapper = mount(wrap);
    expect(wrapper.element).toMatchSnapshot();
  });
});
