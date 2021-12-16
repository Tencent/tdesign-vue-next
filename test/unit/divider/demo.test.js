/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/divider/demos/base.vue';
import textVue from '@/examples/divider/demos/text.vue';
import verticalVue from '@/examples/divider/demos/vertical.vue';

const mapper = {
  baseVue,
  textVue,
  verticalVue,
};

describe('Divider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Divider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
