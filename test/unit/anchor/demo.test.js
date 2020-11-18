import { mount } from '@vue/test-utils';

// unit test for component in examples.

const props = {
  mocks: {
    $route: {
      path: 'http://example.com',
    },
  },
};

describe('Anchor', () => {
  it('default demo works fine', () => {
    const demo = require('@/examples/anchor/demos/default.vue').default;
    const wrapper = mount(demo, props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('bounds demo works fine', () => {
    const demo = require('@/examples/anchor/demos/bounds.vue').default;
    const wrapper = mount(demo, props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('container demo works fine', () => {
    const demo = require('@/examples/anchor/demos/container.vue').default;
    const wrapper = mount(demo, props);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('target demo works fine', () => {
    const demo = require('@/examples/anchor/demos/target.vue').default;
    const wrapper = mount(demo, props);
    expect(wrapper.element).toMatchSnapshot();
  });
});
