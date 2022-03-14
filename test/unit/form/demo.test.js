/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import alignVue from '@/examples/form/demos/align.vue';
import baseVue from '@/examples/form/demos/base.vue';
import clearValidateVue from '@/examples/form/demos/clear-validate.vue';
import customValidatorVue from '@/examples/form/demos/custom-validator.vue';
import disabledVue from '@/examples/form/demos/disabled.vue';
import errorMessageVue from '@/examples/form/demos/error-message.vue';
import layoutVue from '@/examples/form/demos/layout.vue';
import loginVue from '@/examples/form/demos/login.vue';
import resetVue from '@/examples/form/demos/reset.vue';
import sizeVue from '@/examples/form/demos/size.vue';
import validateComplicatedDataVue from '@/examples/form/demos/validate-complicated-data.vue';
import validateMessageVue from '@/examples/form/demos/validate-message.vue';
import validatorStatusVue from '@/examples/form/demos/validator-status.vue';
import validatorVue from '@/examples/form/demos/validator.vue';

MockDate.set('2020-12-28');

const mapper = {
  alignVue,
  baseVue,
  clearValidateVue,
  customValidatorVue,
  disabledVue,
  errorMessageVue,
  layoutVue,
  loginVue,
  resetVue,
  sizeVue,
  validateComplicatedDataVue,
  validateMessageVue,
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
