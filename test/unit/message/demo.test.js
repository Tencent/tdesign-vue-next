import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Message', () => {
  it('type demo works fine', () => {
    const demo = require('@/examples/message/demos/type.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
  // it('close demo works fine', () => {
  //   const demo = require('@/examples/message/demos/close.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper).toMatchSnapshot();
  // });
  // it('closeAll demo works fine', () => {
  //   const demo = require('@/examples/message/demos/closeAll.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper.element).toMatchSnapshot();
  // });
  // it('offset demo works fine', () => {
  //   const demo = require('@/examples/message/demos/offset.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper.element).toMatchSnapshot();
  // });
  // it('placement demo works fine', () => {
  //   const demo = require('@/examples/message/demos/placement.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper.element).toMatchSnapshot();
  // });
  // it('plugin demo works fine', () => {
  //   const demo = require('@/examples/message/demos/plugin.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper.element).toMatchSnapshot();
  // });
  // it('toggle demo works fine', () => {
  //   const demo = require('@/examples/message/demos/toggle.vue');
  //   const wrapper = mount(demo);
  //   expect(wrapper.element).toMatchSnapshot();
  // });
});
