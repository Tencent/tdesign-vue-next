/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/tag/demos/base.vue';
import deleteVue from '@/examples/tag/demos/delete.vue';
import disabledVue from '@/examples/tag/demos/disabled.vue';
import iconVue from '@/examples/tag/demos/icon.vue';
import longTextVue from '@/examples/tag/demos/long-text.vue';
import plainVue from '@/examples/tag/demos/plain.vue';
import selectableVue from '@/examples/tag/demos/selectable.vue';
import shapeVue from '@/examples/tag/demos/shape.vue';
import sizeVue from '@/examples/tag/demos/size.vue';
import themeVue from '@/examples/tag/demos/theme.vue';

const mapper = {
  baseVue,
  deleteVue,
  disabledVue,
  iconVue,
  longTextVue,
  plainVue,
  selectableVue,
  shapeVue,
  sizeVue,
  themeVue,
};

describe('Tag', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tag ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
