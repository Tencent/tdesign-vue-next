import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import base from '@/examples/calendar/demos/base.vue';
import card from '@/examples/calendar/demos/card.vue';
import cardCell from '@/examples/calendar/demos/cardCell.vue';
import cell from '@/examples/calendar/demos/cell.vue';
import cellAppend from '@/examples/calendar/demos/cellAppend.vue';
import controllerConfig from '@/examples/calendar/demos/controllerConfig.vue';
import value from '@/examples/calendar/demos/value.vue';
import events from '@/examples/calendar/demos/events.vue';
import firstDayOfWeek from '@/examples/calendar/demos/firstDayOfWeek.vue';
import head from '@/examples/calendar/demos/head.vue';
import filter from '@/examples/calendar/demos/filter.vue';
import mode from '@/examples/calendar/demos/mode.vue';
import range from '@/examples/calendar/demos/range.vue';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// unit test for component in examples.
describe('Calendar', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('card demo works fine', () => {
    const wrapper = mount(card);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cardCell demo works fine', () => {
    const wrapper = mount(cardCell);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cell demo works fine', () => {
    const wrapper = mount(cell);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('cellAppend demo works fine', () => {
    const wrapper = mount(cellAppend);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('controllerConfig demo works fine', () => {
    const wrapper = mount(controllerConfig);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('value demo works fine', () => {
    const wrapper = mount(value);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('events demo works fine', () => {
    const wrapper = mount(events);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('firstDayOfWeek demo works fine', () => {
    const wrapper = mount(firstDayOfWeek);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('head demo works fine', () => {
    const wrapper = mount(head);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('filter demo works fine', () => {
    const wrapper = mount(filter);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('mode demo works fine', () => {
    const wrapper = mount(mode);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('range demo works fine', () => {
    const wrapper = mount(range);
    expect(wrapper.element).toMatchSnapshot();
  });
});
