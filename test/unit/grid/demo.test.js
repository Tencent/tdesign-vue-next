/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/grid/demos/base.vue';
import flexVue from '@/examples/grid/demos/flex.vue';
import gutterVue from '@/examples/grid/demos/gutter.vue';
import halignVue from '@/examples/grid/demos/halign.vue';
import offsetVue from '@/examples/grid/demos/offset.vue';
import orderVue from '@/examples/grid/demos/order.vue';
import responsiveVue from '@/examples/grid/demos/responsive.vue';
import sortVue from '@/examples/grid/demos/sort.vue';
import valignVue from '@/examples/grid/demos/valign.vue';

const mapper = {
  baseVue,
  flexVue,
  gutterVue,
  halignVue,
  offsetVue,
  orderVue,
  responsiveVue,
  sortVue,
  valignVue,
};

describe('Grid', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Grid ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
