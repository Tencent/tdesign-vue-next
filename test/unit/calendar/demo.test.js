import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import base from '@/examples/calendar/demos/base.vue';
import card from '@/examples/calendar/demos/card.vue';
import cardCell from '@/examples/calendar/demos/card-cell.vue';
import cell from '@/examples/calendar/demos/cell.vue';
import cellAppend from '@/examples/calendar/demos/cell-append.vue';
import controllerConfig from '@/examples/calendar/demos/controller-config.vue';
import value from '@/examples/calendar/demos/value.vue';
import events from '@/examples/calendar/demos/events.vue';
import firstDayOfWeek from '@/examples/calendar/demos/first-day-of-week.vue';
import head from '@/examples/calendar/demos/head.vue';
import filter from '@/examples/calendar/demos/filter.vue';
import mode from '@/examples/calendar/demos/mode.vue';
import range from '@/examples/calendar/demos/range.vue';
import eventsPropsApi from '@/examples/calendar/demos/events-props-api.vue';
import slotPropsApi from '@/examples/calendar/demos/slot-props-api.vue';
import week from '@/examples/calendar/demos/week.vue';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// unit test for component in examples.
describe('Calendar', () => {
  // 组件类型(begin)
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('card demo works fine', () => {
    const wrapper = mount(card);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('filter demo works fine', () => {
    const wrapper = mount(filter);
    expect(wrapper.element).toMatchSnapshot();
  });

  // 功能示例(begin)
  it('value demo works fine', () => {
    const wrapper = mount(value);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('mode demo works fine', () => {
    const wrapper = mount(mode);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('firstDayOfWeek demo works fine', () => {
    const wrapper = mount(firstDayOfWeek);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('range demo works fine', () => {
    const wrapper = mount(range);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('controllerConfig demo works fine', () => {
    const wrapper = mount(controllerConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
  // 功能示例(end)

  // 事件示例(begin)
  it('events demo works fine', () => {
    const wrapper = mount(events);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('eventsPropsApi demo works fine', () => {
    const wrapper = mount(eventsPropsApi);
    expect(wrapper.element).toMatchSnapshot();
  });
  // 事件示例(end)

  // 插槽示例(begin)
  it('head demo works fine', () => {
    const wrapper = mount(head);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('cellAppend demo works fine', () => {
    const wrapper = mount(cellAppend);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('cell demo works fine', () => {
    const wrapper = mount(cell);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('cardCell demo works fine', () => {
    const wrapper = mount(cardCell);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('slotPropsApi demo works fine', () => {
    const wrapper = mount(slotPropsApi);
    expect(wrapper.element).toMatchSnapshot();
  });
  // 插槽示例(end)

  it('week demo works fine', () => {
    const wrapper = mount(week);
    expect(wrapper.element).toMatchSnapshot();
  });
});
