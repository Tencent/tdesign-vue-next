/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/notification/demos/base.vue';
import closeAllVue from '@/examples/notification/demos/close-all.vue';
import closeVue from '@/examples/notification/demos/close.vue';
import contentVue from '@/examples/notification/demos/content.vue';
import footerVue from '@/examples/notification/demos/footer.vue';
import iconVue from '@/examples/notification/demos/icon.vue';
import offsetVue from '@/examples/notification/demos/offset.vue';
import operationVue from '@/examples/notification/demos/operation.vue';
import placementVue from '@/examples/notification/demos/placement.vue';
import pluginVue from '@/examples/notification/demos/plugin.vue';
import sizeVue from '@/examples/notification/demos/size.vue';
import toggleVue from '@/examples/notification/demos/toggle.vue';
import typeVue from '@/examples/notification/demos/type.vue';
import type4FnVue from '@/examples/notification/demos/type4Fn.vue';

const mapper = {
  baseVue,
  closeAllVue,
  closeVue,
  contentVue,
  footerVue,
  iconVue,
  offsetVue,
  operationVue,
  placementVue,
  pluginVue,
  sizeVue,
  toggleVue,
  typeVue,
  type4FnVue,
};

describe('Notification', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Notification ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
