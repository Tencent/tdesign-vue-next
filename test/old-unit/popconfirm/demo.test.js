/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/popconfirm/demos/base.vue';
import buttonVue from '@/examples/popconfirm/demos/button.vue';
import describeVue from '@/examples/popconfirm/demos/describe.vue';
import iconVue from '@/examples/popconfirm/demos/icon.vue';
import inheritVue from '@/examples/popconfirm/demos/inherit.vue';

const mapper = {
  baseVue,
  buttonVue,
  describeVue,
  iconVue,
  inheritVue,
};

describe('Popconfirm', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Popconfirm ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
