/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import attachVue from '@/examples/loading/demos/attach.vue';
import baseVue from '@/examples/loading/demos/base.vue';
import delayVue from '@/examples/loading/demos/delay.vue';
import fullscreenVue from '@/examples/loading/demos/fullscreen.vue';
import iconTextVue from '@/examples/loading/demos/icon-text.vue';
import indicatorSlotVue from '@/examples/loading/demos/indicatorSlot.vue';
import preventScrollThroughVue from '@/examples/loading/demos/preventScrollThrough.vue';
import serviceVue from '@/examples/loading/demos/service.vue';
import sizeVue from '@/examples/loading/demos/size.vue';
import textVue from '@/examples/loading/demos/text.vue';
import wrapVue from '@/examples/loading/demos/wrap.vue';

const mapper = {
  attachVue,
  baseVue,
  delayVue,
  fullscreenVue,
  iconTextVue,
  indicatorSlotVue,
  preventScrollThroughVue,
  serviceVue,
  sizeVue,
  textVue,
  wrapVue,
};

describe('Loading', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Loading ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
