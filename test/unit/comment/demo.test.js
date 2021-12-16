/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/comment/demos/base.vue';
import listVue from '@/examples/comment/demos/list.vue';
import operationVue from '@/examples/comment/demos/operation.vue';
import quoteVue from '@/examples/comment/demos/quote.vue';
import replyFormVue from '@/examples/comment/demos/reply-form.vue';
import replyVue from '@/examples/comment/demos/reply.vue';

const mapper = {
  baseVue,
  listVue,
  operationVue,
  quoteVue,
  replyFormVue,
  replyVue,
};

describe('Comment', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Comment ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
