import { mount } from '@vue/test-utils';
import base from '@/examples/anchor/demos/base.vue';
import nested from '@/examples/anchor/demos/nested.vue';
import target from '@/examples/anchor/demos/target.vue';

// unit test for component in examples.

const props = {
  mocks: {
    $route: {
      path: 'http://example.com',
    },
  },
};

describe('Anchor', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base, props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('bounds demo works fine', () => {
    const wrapper = mount(nested, props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('target demo works fine', () => {
    const wrapper = mount(target, props);
    expect(wrapper.element).toMatchSnapshot();
  });
});
