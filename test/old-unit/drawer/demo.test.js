/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import attachParentVue from '@/examples/drawer/demos/attach-parent.vue';
import baseVue from '@/examples/drawer/demos/base.vue';
import customVue from '@/examples/drawer/demos/custom.vue';
import destroyVue from '@/examples/drawer/demos/destroy.vue';
import noMaskVue from '@/examples/drawer/demos/no-mask.vue';
import operationVue from '@/examples/drawer/demos/operation.vue';
import placementVue from '@/examples/drawer/demos/placement.vue';
import popupVue from '@/examples/drawer/demos/popup.vue';
import sizeVue from '@/examples/drawer/demos/size.vue';

const mapper = {
  attachParentVue,
  baseVue,
  customVue,
  destroyVue,
  noMaskVue,
  operationVue,
  placementVue,
  popupVue,
  sizeVue,
};

describe('Drawer', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Drawer ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
