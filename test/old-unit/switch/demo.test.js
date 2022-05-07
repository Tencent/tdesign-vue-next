/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/switch/demos/base.vue';
import describeVue from '@/examples/switch/demos/describe.vue';
import sizeVue from '@/examples/switch/demos/size.vue';
import statusVue from '@/examples/switch/demos/status.vue';

const mapper = {
  baseVue,
  describeVue,
  sizeVue,
  statusVue,
};

describe('Switch', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Switch ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
