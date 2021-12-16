/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/anchor/demos/base.vue';
import containerVue from '@/examples/anchor/demos/container.vue';
import cursorVue from '@/examples/anchor/demos/cursor.vue';
import largeVue from '@/examples/anchor/demos/large.vue';
import multipleVue from '@/examples/anchor/demos/multiple.vue';
import smallVue from '@/examples/anchor/demos/small.vue';
import targetVue from '@/examples/anchor/demos/target.vue';

const mapper = {
  baseVue,
  containerVue,
  cursorVue,
  largeVue,
  multipleVue,
  smallVue,
  targetVue,
};

describe('Anchor', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Anchor ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
