/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/textarea/demos/base.vue';
import eventsVue from '@/examples/textarea/demos/events.vue';
import maxlengthVue from '@/examples/textarea/demos/maxlength.vue';
import typeVue from '@/examples/textarea/demos/type.vue';

const mapper = {
  baseVue,
  eventsVue,
  maxlengthVue,
  typeVue,
};

describe('Textarea', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Textarea ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
