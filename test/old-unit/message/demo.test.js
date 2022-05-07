/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/message/demos/base.vue';
import closeAllVue from '@/examples/message/demos/close-all.vue';
import closeVue from '@/examples/message/demos/close.vue';
import loadingVue from '@/examples/message/demos/loading.vue';
import offsetVue from '@/examples/message/demos/offset.vue';
import placementVue from '@/examples/message/demos/placement.vue';
import pluginVue from '@/examples/message/demos/plugin.vue';
import toggleVue from '@/examples/message/demos/toggle.vue';
import typeVue from '@/examples/message/demos/type.vue';

const mapper = {
  baseVue,
  closeAllVue,
  closeVue,
  loadingVue,
  offsetVue,
  placementVue,
  pluginVue,
  toggleVue,
  typeVue,
};

describe('Message', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Message ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
