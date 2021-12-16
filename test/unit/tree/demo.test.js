/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import activableVue from '@/examples/tree/demos/activable.vue';
import baseVue from '@/examples/tree/demos/base.vue';
import checkableVue from '@/examples/tree/demos/checkable.vue';
import controlledVue from '@/examples/tree/demos/controlled.vue';
import disabledVue from '@/examples/tree/demos/disabled.vue';
import emptyVue from '@/examples/tree/demos/empty.vue';
import expandAllVue from '@/examples/tree/demos/expand-all.vue';
import expandLevelVue from '@/examples/tree/demos/expand-level.vue';
import expandMutexVue from '@/examples/tree/demos/expand-mutex.vue';
import filterVue from '@/examples/tree/demos/filter.vue';
import iconVue from '@/examples/tree/demos/icon.vue';
import labelVue from '@/examples/tree/demos/label.vue';
import lazyVue from '@/examples/tree/demos/lazy.vue';
import lineVue from '@/examples/tree/demos/line.vue';
import loadVue from '@/examples/tree/demos/load.vue';
import operationsVue from '@/examples/tree/demos/operations.vue';
import stateVue from '@/examples/tree/demos/state.vue';
import syncVue from '@/examples/tree/demos/sync.vue';
import vmodelVue from '@/examples/tree/demos/vmodel.vue';

const mapper = {
  activableVue,
  baseVue,
  checkableVue,
  controlledVue,
  disabledVue,
  emptyVue,
  expandAllVue,
  expandLevelVue,
  expandMutexVue,
  filterVue,
  iconVue,
  labelVue,
  lazyVue,
  lineVue,
  loadVue,
  operationsVue,
  stateVue,
  syncVue,
  vmodelVue,
};

describe('Tree', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tree ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
