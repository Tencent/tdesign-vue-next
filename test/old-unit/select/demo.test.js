/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/select/demos/base.vue';
import collapsedVue from '@/examples/select/demos/collapsed.vue';
import creatableVue from '@/examples/select/demos/creatable.vue';
import customOptionsVue from '@/examples/select/demos/custom-options.vue';
import customSelectedVue from '@/examples/select/demos/custom-selected.vue';
import disabledVue from '@/examples/select/demos/disabled.vue';
import filterableVue from '@/examples/select/demos/filterable.vue';
import groupVue from '@/examples/select/demos/group.vue';
import labelInValueVue from '@/examples/select/demos/label-in-value.vue';
import maxVue from '@/examples/select/demos/max.vue';
import multipleVue from '@/examples/select/demos/multiple.vue';
import noborderVue from '@/examples/select/demos/noborder.vue';
import panelVue from '@/examples/select/demos/panel.vue';
import popupPropsVue from '@/examples/select/demos/popup-props.vue';
import prefixVue from '@/examples/select/demos/prefix.vue';
import remoteSearchVue from '@/examples/select/demos/remote-search.vue';
import sizeVue from '@/examples/select/demos/size.vue';
import statusVue from '@/examples/select/demos/status.vue';

const mapper = {
  baseVue,
  collapsedVue,
  creatableVue,
  customOptionsVue,
  customSelectedVue,
  disabledVue,
  filterableVue,
  groupVue,
  labelInValueVue,
  maxVue,
  multipleVue,
  noborderVue,
  panelVue,
  popupPropsVue,
  prefixVue,
  remoteSearchVue,
  sizeVue,
  statusVue,
};

describe('Select', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Select ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
