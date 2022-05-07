/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/collapse/demos/base.vue';
import iconVue from '@/examples/collapse/demos/icon.vue';
import mutexVue from '@/examples/collapse/demos/mutex.vue';
import otherVue from '@/examples/collapse/demos/other.vue';
import rightSlotVue from '@/examples/collapse/demos/rightSlot.vue';

const mapper = {
  baseVue,
  iconVue,
  mutexVue,
  otherVue,
  rightSlotVue,
};

describe('Collapse', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Collapse ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
