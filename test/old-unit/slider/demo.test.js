/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/slider/demos/base.vue';
import disabledVue from '@/examples/slider/demos/disabled.vue';
import inputNumberVerticalVue from '@/examples/slider/demos/input-number-vertical.vue';
import inputNumberVue from '@/examples/slider/demos/input-number.vue';
import marksVue from '@/examples/slider/demos/marks.vue';
import minAndMaxVue from '@/examples/slider/demos/min-and-max.vue';
import stepVue from '@/examples/slider/demos/step.vue';
import verticalMarksVue from '@/examples/slider/demos/vertical-marks.vue';
import verticalVue from '@/examples/slider/demos/vertical.vue';

const mapper = {
  baseVue,
  disabledVue,
  inputNumberVerticalVue,
  inputNumberVue,
  marksVue,
  minAndMaxVue,
  stepVue,
  verticalMarksVue,
  verticalVue,
};

describe('Slider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Slider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
