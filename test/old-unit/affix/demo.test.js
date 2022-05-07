/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/affix/demos/base.vue';
import containerVue from '@/examples/affix/demos/container.vue';

const mapper = {
  baseVue,
  containerVue,
};

describe('Affix', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Affix ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
