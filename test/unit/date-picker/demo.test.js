/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import baseVue from '@/examples/date-picker/demos/base.vue';
import customIconVue from '@/examples/date-picker/demos/custom-icon.vue';
import datePresetsAltVue from '@/examples/date-picker/demos/date-presets-alt.vue';
import datePresetsTimeVue from '@/examples/date-picker/demos/date-presets-time.vue';
import datePresetsVue from '@/examples/date-picker/demos/date-presets.vue';
import dateRangeVue from '@/examples/date-picker/demos/date-range.vue';
import dateTimeVue from '@/examples/date-picker/demos/date-time.vue';
import disableDateVue from '@/examples/date-picker/demos/disable-date.vue';
import firstDayOfWeekVue from '@/examples/date-picker/demos/first-day-of-week.vue';
import monthVue from '@/examples/date-picker/demos/month.vue';
import yearVue from '@/examples/date-picker/demos/year.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  customIconVue,
  datePresetsAltVue,
  datePresetsTimeVue,
  datePresetsVue,
  dateRangeVue,
  dateTimeVue,
  disableDateVue,
  firstDayOfWeekVue,
  monthVue,
  yearVue,
};

describe('DatePicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DatePicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
