/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/alert/demos/base.vue';
import closeVue from '@/examples/alert/demos/close.vue';
import collapseVue from '@/examples/alert/demos/collapse.vue';
import iconVue from '@/examples/alert/demos/icon.vue';
import operationVue from '@/examples/alert/demos/operation.vue';
import titleVue from '@/examples/alert/demos/title.vue';

const mapper = {
  baseVue,
  closeVue,
  collapseVue,
  iconVue,
  operationVue,
  titleVue,
};

describe('Alert', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Alert ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
