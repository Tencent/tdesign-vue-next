/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import colorModeVue from '@/examples/color-picker/demos/color-mode.vue';
import enableAlphaVue from '@/examples/color-picker/demos/enable-alpha.vue';
import panelVue from '@/examples/color-picker/demos/panel.vue';
import recentColorVue from '@/examples/color-picker/demos/recent-color.vue';
import statusDisabledVue from '@/examples/color-picker/demos/status-disabled.vue';
import statusReadonlyVue from '@/examples/color-picker/demos/status-readonly.vue';
import swatchColorVue from '@/examples/color-picker/demos/swatch-color.vue';
import triggerVue from '@/examples/color-picker/demos/trigger.vue';

const mapper = {
  colorModeVue,
  enableAlphaVue,
  panelVue,
  recentColorVue,
  statusDisabledVue,
  statusReadonlyVue,
  swatchColorVue,
  triggerVue,
};

describe('ColorPicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ColorPicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
