/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/examples/form/demos/align.vue';
import baseVue from '@/examples/form/demos/base.vue';
import customValidatorVue from '@/examples/form/demos/custom-validator.vue';
import layoutVue from '@/examples/form/demos/layout.vue';
import loginVue from '@/examples/form/demos/login.vue';
import validatorStatusVue from '@/examples/form/demos/validator-status.vue';
import validatorVue from '@/examples/form/demos/validator.vue';

const mapper = {
  alignVue,
  baseVue,
  customValidatorVue,
  layoutVue,
  loginVue,
  validatorStatusVue,
  validatorVue,
};

describe('Form', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Form ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
