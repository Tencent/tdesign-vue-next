/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import addonVue from '@/examples/input/demos/addon.vue';
import alignVue from '@/examples/input/demos/align.vue';
import autoWidthVue from '@/examples/input/demos/auto-width.vue';
import baseVue from '@/examples/input/demos/base.vue';
import clearableVue from '@/examples/input/demos/clearable.vue';
import focusVue from '@/examples/input/demos/focus.vue';
import formatVue from '@/examples/input/demos/format.vue';
import groupVue from '@/examples/input/demos/group.vue';
import maxLengthCountVue from '@/examples/input/demos/max-length-count.vue';
import passwordVue from '@/examples/input/demos/password.vue';
import sizeVue from '@/examples/input/demos/size.vue';
import statusVue from '@/examples/input/demos/status.vue';
import textareaVue from '@/examples/input/demos/textarea.vue';

const mapper = {
  addonVue,
  alignVue,
  autoWidthVue,
  baseVue,
  clearableVue,
  focusVue,
  formatVue,
  groupVue,
  maxLengthCountVue,
  passwordVue,
  sizeVue,
  statusVue,
  textareaVue,
};

describe('Input', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Input ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
