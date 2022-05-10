/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/card/demos/base.vue';
import borderedNoneVue from '@/examples/card/demos/bordered-none.vue';
import borderedVue from '@/examples/card/demos/bordered.vue';
import footerActionsVue from '@/examples/card/demos/footer-actions.vue';
import footerContentActionsVue from '@/examples/card/demos/footer-content-actions.vue';
import footerContentVue from '@/examples/card/demos/footer-content.vue';
import footerVue from '@/examples/card/demos/footer.vue';
import headerAllPropsVue from '@/examples/card/demos/header-all-props.vue';
import headerBorderedVue from '@/examples/card/demos/header-bordered.vue';
import headerDescriptionVue from '@/examples/card/demos/header-description.vue';
import headerFooterActionsVue from '@/examples/card/demos/header-footer-actions.vue';
import headerSubtitleFooterActionsVue from '@/examples/card/demos/header-subtitle-footer-actions.vue';
import headerSubtitleVue from '@/examples/card/demos/header-subtitle.vue';
import headerVue from '@/examples/card/demos/header.vue';
import hoverVue from '@/examples/card/demos/hover.vue';
import smallVue from '@/examples/card/demos/small.vue';

const mapper = {
  baseVue,
  borderedNoneVue,
  borderedVue,
  footerActionsVue,
  footerContentActionsVue,
  footerContentVue,
  footerVue,
  headerAllPropsVue,
  headerBorderedVue,
  headerDescriptionVue,
  headerFooterActionsVue,
  headerSubtitleFooterActionsVue,
  headerSubtitleVue,
  headerVue,
  hoverVue,
  smallVue,
};

describe('Card', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Card ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
