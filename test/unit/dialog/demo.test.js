/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import asyncVue from '@/examples/dialog/demos/async.vue';
import attachVue from '@/examples/dialog/demos/attach.vue';
import baseVue from '@/examples/dialog/demos/base.vue';
import customVue from '@/examples/dialog/demos/custom.vue';
import dragVue from '@/examples/dialog/demos/drag.vue';
import iconVue from '@/examples/dialog/demos/icon.vue';
import modalVue from '@/examples/dialog/demos/modal.vue';
import pluginVue from '@/examples/dialog/demos/plugin.vue';
import positionVue from '@/examples/dialog/demos/position.vue';
import warningVue from '@/examples/dialog/demos/warning.vue';

const mapper = {
  asyncVue,
  attachVue,
  baseVue,
  customVue,
  dragVue,
  iconVue,
  modalVue,
  pluginVue,
  positionVue,
  warningVue,
};

describe('Dialog', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Dialog ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
