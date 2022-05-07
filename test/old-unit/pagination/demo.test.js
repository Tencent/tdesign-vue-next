/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/pagination/demos/base.vue';
import jumpVue from '@/examples/pagination/demos/jump.vue';
import miniVue from '@/examples/pagination/demos/mini.vue';
import moreVue from '@/examples/pagination/demos/more.vue';
import pageNumVue from '@/examples/pagination/demos/page-num.vue';
import simpleMiniVue from '@/examples/pagination/demos/simple-mini.vue';
import simpleVue from '@/examples/pagination/demos/simple.vue';
import totalVue from '@/examples/pagination/demos/total.vue';

const mapper = {
  baseVue,
  jumpVue,
  miniVue,
  moreVue,
  pageNumVue,
  simpleMiniVue,
  simpleVue,
  totalVue,
};

describe('Pagination', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Pagination ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
