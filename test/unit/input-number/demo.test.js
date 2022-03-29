/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/examples/input-number/demos/align.vue';
import autoWidthVue from '@/examples/input-number/demos/auto-width.vue';
import centerVue from '@/examples/input-number/demos/center.vue';
import defaultVue from '@/examples/input-number/demos/default.vue';
import disabledVue from '@/examples/input-number/demos/disabled.vue';
import emptyVue from '@/examples/input-number/demos/empty.vue';
import formatVue from '@/examples/input-number/demos/format.vue';
import leftVue from '@/examples/input-number/demos/left.vue';
import normalVue from '@/examples/input-number/demos/normal.vue';
import sizeVue from '@/examples/input-number/demos/size.vue';
import statusVue from '@/examples/input-number/demos/status.vue';
import stepVue from '@/examples/input-number/demos/step.vue';

const mapper = {
  alignVue,
  autoWidthVue,
  centerVue,
  defaultVue,
  disabledVue,
  emptyVue,
  formatVue,
  leftVue,
  normalVue,
  sizeVue,
  statusVue,
  stepVue,
};

describe('InputNumber', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`InputNumber ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
