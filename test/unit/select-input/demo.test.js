/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import autocompleteVue from '@/examples/select-input/demos/autocomplete.vue';
import autowidthMultipleVue from '@/examples/select-input/demos/autowidth-multiple.vue';
import autowidthVue from '@/examples/select-input/demos/autowidth.vue';
import borderlessMultipleVue from '@/examples/select-input/demos/borderless-multiple.vue';
import borderlessVue from '@/examples/select-input/demos/borderless.vue';
import collapsedItemsVue from '@/examples/select-input/demos/collapsed-items.vue';
import customTagVue from '@/examples/select-input/demos/custom-tag.vue';
import excessTagsDisplayTypeVue from '@/examples/select-input/demos/excess-tags-display-type.vue';
import labelSuffixVue from '@/examples/select-input/demos/label-suffix.vue';
import multipleVue from '@/examples/select-input/demos/multiple.vue';
import singleVue from '@/examples/select-input/demos/single.vue';
import statusVue from '@/examples/select-input/demos/status.vue';
import widthVue from '@/examples/select-input/demos/width.vue';

const mapper = {
  autocompleteVue,
  autowidthMultipleVue,
  autowidthVue,
  borderlessMultipleVue,
  borderlessVue,
  collapsedItemsVue,
  customTagVue,
  excessTagsDisplayTypeVue,
  labelSuffixVue,
  multipleVue,
  singleVue,
  statusVue,
  widthVue,
};

describe('SelectInput', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`SelectInput ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
