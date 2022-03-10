/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import baseVue from '@/examples/time-picker/demos/base.vue';
import clearableVue from '@/examples/time-picker/demos/clearable.vue';
import disabledVue from '@/examples/time-picker/demos/disabled.vue';
import formatVue from '@/examples/time-picker/demos/format.vue';
import hideClearButtonVue from '@/examples/time-picker/demos/hide-clear-button.vue';
import hmVue from '@/examples/time-picker/demos/hm.vue';
import hmsVue from '@/examples/time-picker/demos/hms.vue';
import keyboardVue from '@/examples/time-picker/demos/keyboard.vue';
import rangeVue from '@/examples/time-picker/demos/range.vue';
import showStepsVue from '@/examples/time-picker/demos/show-steps.vue';
import stepVue from '@/examples/time-picker/demos/step.vue';
import twelveHourMeridianVue from '@/examples/time-picker/demos/twelve-hour-meridian.vue';
import twelveHourVue from '@/examples/time-picker/demos/twelve-hour.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  clearableVue,
  disabledVue,
  formatVue,
  hideClearButtonVue,
  hmVue,
  hmsVue,
  keyboardVue,
  rangeVue,
  showStepsVue,
  stepVue,
  twelveHourMeridianVue,
  twelveHourVue,
};

describe('TimePicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TimePicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
