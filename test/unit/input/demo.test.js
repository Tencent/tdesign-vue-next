/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import addonVue from '@/examples/input/demos/addon.vue';
import baseVue from '@/examples/input/demos/base.vue';
import clearableVue from '@/examples/input/demos/clearable.vue';
import focusVue from '@/examples/input/demos/focus.vue';
import groupVue from '@/examples/input/demos/group.vue';
import passwordVue from '@/examples/input/demos/password.vue';
import sizeVue from '@/examples/input/demos/size.vue';
import statusVue from '@/examples/input/demos/status.vue';
import textareaVue from '@/examples/input/demos/textarea.vue';

const mapper = {
  addonVue,
  baseVue,
  clearableVue,
  focusVue,
  groupVue,
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
