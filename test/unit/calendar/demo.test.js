/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */
import MockDate from 'mockdate';

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/calendar/demos/base.vue';
import cardCellVue from '@/examples/calendar/demos/card-cell.vue';
import cardVue from '@/examples/calendar/demos/card.vue';
import cellAppendVue from '@/examples/calendar/demos/cell-append.vue';
import cellVue from '@/examples/calendar/demos/cell.vue';
import controllerConfigVue from '@/examples/calendar/demos/controller-config.vue';
import eventsPropsApiVue from '@/examples/calendar/demos/events-props-api.vue';
import eventsVue from '@/examples/calendar/demos/events.vue';
import filterVue from '@/examples/calendar/demos/filter.vue';
import firstDayOfWeekVue from '@/examples/calendar/demos/first-day-of-week.vue';
import headVue from '@/examples/calendar/demos/head.vue';
import modeVue from '@/examples/calendar/demos/mode.vue';
import rangeVue from '@/examples/calendar/demos/range.vue';
import slotPropsApiVue from '@/examples/calendar/demos/slot-props-api.vue';
import valueVue from '@/examples/calendar/demos/value.vue';
import weekVue from '@/examples/calendar/demos/week.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  cardCellVue,
  cardVue,
  cellAppendVue,
  cellVue,
  controllerConfigVue,
  eventsPropsApiVue,
  eventsVue,
  filterVue,
  firstDayOfWeekVue,
  headVue,
  modeVue,
  rangeVue,
  slotPropsApiVue,
  valueVue,
  weekVue,
};

describe('Calendar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Calendar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
