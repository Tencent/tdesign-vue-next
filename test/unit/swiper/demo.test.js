/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/swiper/demos/base.vue';
import cardVue from '@/examples/swiper/demos/card.vue';
import currentVue from '@/examples/swiper/demos/current.vue';
import fadeVue from '@/examples/swiper/demos/fade.vue';
import fractionVue from '@/examples/swiper/demos/fraction.vue';
import placementVue from '@/examples/swiper/demos/placement.vue';
import sizeVue from '@/examples/swiper/demos/size.vue';
import verticalVue from '@/examples/swiper/demos/vertical.vue';

const mapper = {
  baseVue,
  cardVue,
  currentVue,
  fadeVue,
  fractionVue,
  placementVue,
  sizeVue,
  verticalVue,
};

describe('Swiper', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Swiper ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
