/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/radio/demos/base.vue';
import buttonVue from '@/examples/radio/demos/button.vue';
import groupVue from '@/examples/radio/demos/group.vue';
import sizeVue from '@/examples/radio/demos/size.vue';
import typeVue from '@/examples/radio/demos/type.vue';

const mapper = {
  baseVue,
  buttonVue,
  groupVue,
  sizeVue,
  typeVue,
};

describe('Radio', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Radio ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
