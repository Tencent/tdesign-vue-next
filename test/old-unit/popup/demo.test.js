/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/popup/demos/base.vue';
import containerVue from '@/examples/popup/demos/container.vue';
import destroyVue from '@/examples/popup/demos/destroy.vue';
import disabledVue from '@/examples/popup/demos/disabled.vue';
import placementVue from '@/examples/popup/demos/placement.vue';
import styleVue from '@/examples/popup/demos/style.vue';
import triggerElementVue from '@/examples/popup/demos/trigger-element.vue';
import triggerVue from '@/examples/popup/demos/trigger.vue';
import visibleVue from '@/examples/popup/demos/visible.vue';

const mapper = {
  baseVue,
  containerVue,
  destroyVue,
  disabledVue,
  placementVue,
  styleVue,
  triggerElementVue,
  triggerVue,
  visibleVue,
};

describe('Popup', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Popup ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
