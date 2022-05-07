/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/cascader/demos/base.vue';
import checkStrictlyVue from '@/examples/cascader/demos/check-strictly.vue';
import collapsedVue from '@/examples/cascader/demos/collapsed.vue';
import disabledVue from '@/examples/cascader/demos/disabled.vue';
import ellipsisVue from '@/examples/cascader/demos/ellipsis.vue';
import filterableVue from '@/examples/cascader/demos/filterable.vue';
import keysVue from '@/examples/cascader/demos/keys.vue';
import loadVue from '@/examples/cascader/demos/load.vue';
import maxVue from '@/examples/cascader/demos/max.vue';
import multipleVue from '@/examples/cascader/demos/multiple.vue';
import showAllLevelsVue from '@/examples/cascader/demos/show-all-levels.vue';
import sizeVue from '@/examples/cascader/demos/size.vue';
import triggerVue from '@/examples/cascader/demos/trigger.vue';
import valueModeVue from '@/examples/cascader/demos/value-mode.vue';
import valueTypeVue from '@/examples/cascader/demos/value-type.vue';

const mapper = {
  baseVue,
  checkStrictlyVue,
  collapsedVue,
  disabledVue,
  ellipsisVue,
  filterableVue,
  keysVue,
  loadVue,
  maxVue,
  multipleVue,
  showAllLevelsVue,
  sizeVue,
  triggerVue,
  valueModeVue,
  valueTypeVue,
};

describe('Cascader', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Cascader ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
