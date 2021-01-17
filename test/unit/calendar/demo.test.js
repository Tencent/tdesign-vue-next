import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

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
