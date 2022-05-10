/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import calendarVue from '@/examples/config-provider/demos/calendar.vue';
import datePickerVue from '@/examples/config-provider/demos/date-picker.vue';
import dialogVue from '@/examples/config-provider/demos/dialog.vue';
import globalVue from '@/examples/config-provider/demos/global.vue';
import othersVue from '@/examples/config-provider/demos/others.vue';
import paginationVue from '@/examples/config-provider/demos/pagination.vue';
import popconfirmVue from '@/examples/config-provider/demos/popconfirm.vue';
import tableVue from '@/examples/config-provider/demos/table.vue';

MockDate.set('2020-12-28');

const mapper = {
  calendarVue,
  datePickerVue,
  dialogVue,
  globalVue,
  othersVue,
  paginationVue,
  popconfirmVue,
  tableVue,
};

describe('ConfigProvider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ConfigProvider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
