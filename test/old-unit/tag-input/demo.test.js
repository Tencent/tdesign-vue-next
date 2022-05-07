/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import autoWidthVue from '@/examples/tag-input/demos/auto-width.vue';
import baseVue from '@/examples/tag-input/demos/base.vue';
import collapsedVue from '@/examples/tag-input/demos/collapsed.vue';
import customTagVue from '@/examples/tag-input/demos/custom-tag.vue';
import excessVue from '@/examples/tag-input/demos/excess.vue';
import maxVue from '@/examples/tag-input/demos/max.vue';
import sizeVue from '@/examples/tag-input/demos/size.vue';
import statusVue from '@/examples/tag-input/demos/status.vue';
import themeVue from '@/examples/tag-input/demos/theme.vue';

const mapper = {
  autoWidthVue,
  baseVue,
  collapsedVue,
  customTagVue,
  excessVue,
  maxVue,
  sizeVue,
  statusVue,
  themeVue,
};

describe('TagInput', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TagInput ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
