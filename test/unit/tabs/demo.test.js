/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import banVue from '@/examples/tabs/demos/ban.vue';
import baseVue from '@/examples/tabs/demos/base.vue';
import combinationVue from '@/examples/tabs/demos/combination.vue';
import customVue from '@/examples/tabs/demos/custom.vue';
import iconVue from '@/examples/tabs/demos/icon.vue';
import operationVue from '@/examples/tabs/demos/operation.vue';
import positionVue from '@/examples/tabs/demos/position.vue';
import sizeVue from '@/examples/tabs/demos/size.vue';
import themeVue from '@/examples/tabs/demos/theme.vue';

const mapper = {
  banVue,
  baseVue,
  combinationVue,
  customVue,
  iconVue,
  operationVue,
  positionVue,
  sizeVue,
  themeVue,
};

describe('Tabs', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tabs ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
