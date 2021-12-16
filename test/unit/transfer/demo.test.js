/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/transfer/demos/base.vue';
import checkedVue from '@/examples/transfer/demos/checked.vue';
import customRenderVue from '@/examples/transfer/demos/custom-render.vue';
import customVue from '@/examples/transfer/demos/custom.vue';
import disabledVue from '@/examples/transfer/demos/disabled.vue';
import emptyVue from '@/examples/transfer/demos/empty.vue';
import paginationVue from '@/examples/transfer/demos/pagination.vue';
import searchVue from '@/examples/transfer/demos/search.vue';
import targetValueVue from '@/examples/transfer/demos/target-value.vue';
import treeVue from '@/examples/transfer/demos/tree.vue';

const mapper = {
  baseVue,
  checkedVue,
  customRenderVue,
  customVue,
  disabledVue,
  emptyVue,
  paginationVue,
  searchVue,
  targetValueVue,
  treeVue,
};

describe('Transfer', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Transfer ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
