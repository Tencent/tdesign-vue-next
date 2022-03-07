/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/tree-select/demos/base.vue';
import collapsedVue from '@/examples/tree-select/demos/collapsed.vue';
import filterableVue from '@/examples/tree-select/demos/filterable.vue';
import lazyVue from '@/examples/tree-select/demos/lazy.vue';
import multipleVue from '@/examples/tree-select/demos/multiple.vue';
import prefixVue from '@/examples/tree-select/demos/prefix.vue';
import propsVue from '@/examples/tree-select/demos/props.vue';
import valuetypeVue from '@/examples/tree-select/demos/valuetype.vue';

const mapper = {
  baseVue,
  collapsedVue,
  filterableVue,
  lazyVue,
  multipleVue,
  prefixVue,
  propsVue,
  valuetypeVue,
};

describe('TreeSelect', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TreeSelect ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
