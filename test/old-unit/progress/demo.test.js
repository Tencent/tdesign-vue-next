/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import circleVue from '@/examples/progress/demos/circle.vue';
import customVue from '@/examples/progress/demos/custom.vue';
import lineVue from '@/examples/progress/demos/line.vue';
import plumpVue from '@/examples/progress/demos/plump.vue';
import sizeVue from '@/examples/progress/demos/size.vue';
import statusVue from '@/examples/progress/demos/status.vue';

const mapper = {
  circleVue,
  customVue,
  lineVue,
  plumpVue,
  sizeVue,
  statusVue,
};

describe('Progress', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Progress ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
