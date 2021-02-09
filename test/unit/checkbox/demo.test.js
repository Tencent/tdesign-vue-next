import { mount } from '@vue/test-utils';
import base from '@/examples/checkbox/demos/base.vue';
import indeterminate from '@/examples/checkbox/demos/indeterminate.vue';
import group from '@/examples/checkbox/demos/checkbox-group.vue';

// unit test for component in examples.
describe('Checkbox', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('indeterminate demo works fine', () => {
    const wrapper = mount(indeterminate);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('checkbox group demo works fine', () => {
    const wrapper = mount(group);
    expect(wrapper.element).toMatchSnapshot();
  });
});
