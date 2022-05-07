/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import closableSideVue from '@/examples/menu/demos/closable-side.vue';
import customHeaderVue from '@/examples/menu/demos/custom-header.vue';
import customSideVue from '@/examples/menu/demos/custom-side.vue';
import doubleVue from '@/examples/menu/demos/double.vue';
import groupSideVue from '@/examples/menu/demos/group-side.vue';
import headMenuDarkVue from '@/examples/menu/demos/head-menu-dark.vue';
import headMenuEmptyVue from '@/examples/menu/demos/head-menu-empty.vue';
import headMenuModeTileVue from '@/examples/menu/demos/head-menu-mode-tile.vue';
import headMenuTileVue from '@/examples/menu/demos/head-menu-tile.vue';
import multiSideVue from '@/examples/menu/demos/multi-side.vue';
import multipleVue from '@/examples/menu/demos/multiple.vue';
import popupSideVue from '@/examples/menu/demos/popup-side.vue';
import sideMenuWidthVue from '@/examples/menu/demos/side-menu-width.vue';
import singleSideVue from '@/examples/menu/demos/single-side.vue';
import singleVue from '@/examples/menu/demos/single.vue';

const mapper = {
  closableSideVue,
  customHeaderVue,
  customSideVue,
  doubleVue,
  groupSideVue,
  headMenuDarkVue,
  headMenuEmptyVue,
  headMenuModeTileVue,
  headMenuTileVue,
  multiSideVue,
  multipleVue,
  popupSideVue,
  sideMenuWidthVue,
  singleSideVue,
  singleVue,
};

describe('Menu', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Menu ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
