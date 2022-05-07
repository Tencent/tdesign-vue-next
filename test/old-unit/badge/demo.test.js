/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/badge/demos/base.vue';
import customVue from '@/examples/badge/demos/custom.vue';
import numberVue from '@/examples/badge/demos/number.vue';
import offsetVue from '@/examples/badge/demos/offset.vue';
import shapeVue from '@/examples/badge/demos/shape.vue';
import sizeVue from '@/examples/badge/demos/size.vue';

const mapper = {
  baseVue,
  customVue,
  numberVue,
  offsetVue,
  shapeVue,
  sizeVue,
};

describe('Badge', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Badge ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
