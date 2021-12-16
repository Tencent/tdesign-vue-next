/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import extraVue from '@/examples/steps/demos/extra.vue';
import iconVue from '@/examples/steps/demos/icon.vue';
import noSequenceVue from '@/examples/steps/demos/no-sequence.vue';
import optionsVue from '@/examples/steps/demos/options.vue';
import sequenceVue from '@/examples/steps/demos/sequence.vue';
import statusVue from '@/examples/steps/demos/status.vue';
import verticalNoSequenceVue from '@/examples/steps/demos/vertical-no-sequence.vue';
import verticalSequenceVue from '@/examples/steps/demos/vertical-sequence.vue';

const mapper = {
  extraVue,
  iconVue,
  noSequenceVue,
  optionsVue,
  sequenceVue,
  statusVue,
  verticalNoSequenceVue,
  verticalSequenceVue,
};

describe('Steps', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Steps ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
