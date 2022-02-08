/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import advance from '@/examples/skeleton/demos/advance.vue';
import containerVue from '@/examples/skeleton/demos/animation.vue';
import baseVue from '@/examples/skeleton/demos/base.vue';
import themeVue from '@/examples/skeleton/demos/theme.vue';

const mapper = {
  advance,
  containerVue,
  baseVue,
  themeVue,
};

describe('skeleton', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`skeleton ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
