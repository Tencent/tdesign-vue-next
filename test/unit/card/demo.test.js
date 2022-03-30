/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/card/demos/base.vue';
import borderdNoneVue from '@/examples/card/demos/borderd-none.vue';
import borderdVue from '@/examples/card/demos/borderd.vue';
import footerVue from '@/examples/card/demos/footer.vue';
import headerVue from '@/examples/card/demos/header.vue';

const mapper = {
  baseVue,
  borderdNoneVue,
  borderdVue,
  footerVue,
  headerVue,
};

describe('Card', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Card ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
