/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/examples/upload/demos/base.vue';
import customDragVue from '@/examples/upload/demos/custom-drag.vue';
import draggableVue from '@/examples/upload/demos/draggable.vue';
import fileFlowListVue from '@/examples/upload/demos/file-flow-list.vue';
import imageVue from '@/examples/upload/demos/image.vue';
import imgFlowListVue from '@/examples/upload/demos/img-flow-list.vue';
import listTypeVue from '@/examples/upload/demos/listType.vue';
import requestMethodVue from '@/examples/upload/demos/request-method.vue';
import singleCustomVue from '@/examples/upload/demos/single-custom.vue';
import singleInputVue from '@/examples/upload/demos/single-input.vue';
import tableVue from '@/examples/upload/demos/table.vue';

const mapper = {
  baseVue,
  customDragVue,
  draggableVue,
  fileFlowListVue,
  imageVue,
  imgFlowListVue,
  listTypeVue,
  requestMethodVue,
  singleCustomVue,
  singleInputVue,
  tableVue,
};

describe('Upload', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Upload ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
