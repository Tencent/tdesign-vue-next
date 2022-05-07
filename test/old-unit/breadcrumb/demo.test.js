/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/breadcrumb/demos/base.vue';
import customVue from '@/examples/breadcrumb/demos/custom.vue';
import dropdownVue from '@/examples/breadcrumb/demos/dropdown.vue';
import hrefVue from '@/examples/breadcrumb/demos/href.vue';
import iconVue from '@/examples/breadcrumb/demos/icon.vue';
import optionsVue from '@/examples/breadcrumb/demos/options.vue';
import toVue from '@/examples/breadcrumb/demos/to.vue';

const mapper = {
  baseVue,
  customVue,
  dropdownVue,
  hrefVue,
  iconVue,
  optionsVue,
  toVue,
};

describe('Breadcrumb', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Breadcrumb ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
