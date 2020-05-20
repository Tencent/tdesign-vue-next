import { mount } from '@vue/test-utils';

describe('<%= upperComponent %>', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/<%= component %>/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
