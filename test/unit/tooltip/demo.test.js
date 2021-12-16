/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import arrowVue from '@/examples/tooltip/demos/arrow.vue';
import baseVue from '@/examples/tooltip/demos/base.vue';
import durationVue from '@/examples/tooltip/demos/duration.vue';
import noArrowVue from '@/examples/tooltip/demos/no-arrow.vue';
import themeVue from '@/examples/tooltip/demos/theme.vue';
import triggerVue from '@/examples/tooltip/demos/trigger.vue';

const mapper = {
  arrowVue,
  baseVue,
  durationVue,
  noArrowVue,
  themeVue,
  triggerVue,
};

describe('Tooltip', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tooltip ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
