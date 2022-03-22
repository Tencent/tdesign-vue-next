/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/tree-select/demos/base.vue';
import lazyVue from '@/examples/tree-select/demos/lazy.vue';
import prefixVue from '@/examples/tree-select/demos/prefix.vue';
import valuedisplayVue from '@/examples/tree-select/demos/valuedisplay.vue';

const mapper = {
  baseVue,
  lazyVue,
  prefixVue,
  valuedisplayVue,
};

describe('TreeSelect', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TreeSelect ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
