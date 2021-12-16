/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/breadcrumbItem/demos/base.vue';
import overlayVue from '@/examples/breadcrumbItem/demos/overlay.vue';

const mapper = {
  baseVue,
  overlayVue,
};

describe('BreadcrumbItem', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`BreadcrumbItem ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
