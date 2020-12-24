import { mount } from '@vue/test-utils';

// unit test for component in examples.
describe('Calendar', () => {
  it('base demo works fine', () => {
    const demo = require('@/examples/calendar/demos/base.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('card demo works fine', () => {
    const demo = require('@/examples/calendar/demos/card.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cardCell demo works fine', () => {
    const demo = require('@/examples/calendar/demos/cardCell.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cell demo works fine', () => {
    const demo = require('@/examples/calendar/demos/cell.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cellAppend demo works fine', () => {
    const demo = require('@/examples/calendar/demos/cellAppend.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('controllerConfig demo works fine', () => {
    const demo = require('@/examples/calendar/demos/controllerConfig.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('value demo works fine', () => {
    const demo = require('@/examples/calendar/demos/value.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('events demo works fine', () => {
    const demo = require('@/examples/calendar/demos/events.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('firstDayOfWeek demo works fine', () => {
    const demo = require('@/examples/calendar/demos/firstDayOfWeek.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('head demo works fine', () => {
    const demo = require('@/examples/calendar/demos/head.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('filter demo works fine', () => {
    const demo = require('@/examples/calendar/demos/filter.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('mode demo works fine', () => {
    const demo = require('@/examples/calendar/demos/mode.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('range demo works fine', () => {
    const demo = require('@/examples/calendar/demos/range.vue');
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
