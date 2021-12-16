/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import asideVue from '@/examples/layout/demos/aside.vue';
import baseVue from '@/examples/layout/demos/base.vue';
import combineVue from '@/examples/layout/demos/combine.vue';
import topVue from '@/examples/layout/demos/top.vue';

const mapper = {
  asideVue,
  baseVue,
  combineVue,
  topVue,
};

describe('Layout', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Layout ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
