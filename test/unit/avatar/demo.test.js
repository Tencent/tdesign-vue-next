/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import adjustVue from '@/examples/avatar/demos/adjust.vue';
import baseVue from '@/examples/avatar/demos/base.vue';
import groupCascadingVue from '@/examples/avatar/demos/group-cascading.vue';
import groupMaxVue from '@/examples/avatar/demos/group-max.vue';
import groupVue from '@/examples/avatar/demos/group.vue';
import shapeVue from '@/examples/avatar/demos/shape.vue';
import sizeVue from '@/examples/avatar/demos/size.vue';

const mapper = {
  adjustVue,
  baseVue,
  groupCascadingVue,
  groupMaxVue,
  groupVue,
  shapeVue,
  sizeVue,
};

describe('Avatar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Avatar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
