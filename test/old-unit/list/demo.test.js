/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/list/demos/base.vue';
import extraVue from '@/examples/list/demos/extra.vue';
import headerFooterVue from '@/examples/list/demos/header-footer.vue';
import imageTextVue from '@/examples/list/demos/image-text.vue';
import loadingVue from '@/examples/list/demos/loading.vue';
import multilineVue from '@/examples/list/demos/multiline.vue';
import operationVue from '@/examples/list/demos/operation.vue';
import scrollVue from '@/examples/list/demos/scroll.vue';
import sizeVue from '@/examples/list/demos/size.vue';
import stripeVue from '@/examples/list/demos/stripe.vue';

const mapper = {
  baseVue,
  extraVue,
  headerFooterVue,
  imageTextVue,
  loadingVue,
  multilineVue,
  operationVue,
  scrollVue,
  sizeVue,
  stripeVue,
};

describe('List', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`List ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
