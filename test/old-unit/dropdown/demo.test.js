/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/dropdown/demos/base.vue';
import buttonVue from '@/examples/dropdown/demos/button.vue';
import customVue from '@/examples/dropdown/demos/custom.vue';
import disabledVue from '@/examples/dropdown/demos/disabled.vue';
import eventVue from '@/examples/dropdown/demos/event.vue';
import longVue from '@/examples/dropdown/demos/long.vue';
import multipleVue from '@/examples/dropdown/demos/multiple.vue';
import slotVue from '@/examples/dropdown/demos/slot.vue';
import splitVue from '@/examples/dropdown/demos/split.vue';

const mapper = {
  baseVue,
  buttonVue,
  customVue,
  disabledVue,
  eventVue,
  longVue,
  multipleVue,
  slotVue,
  splitVue,
};

describe('Dropdown', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Dropdown ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
