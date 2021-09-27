import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import base from '@/examples/date-picker/demos/base.vue';
import datePresetsAlt from '@/examples/date-picker/demos/date-presets-alt.vue';
import datePresetsTime from '@/examples/date-picker/demos/date-presets-time.vue';
import datePresets from '@/examples/date-picker/demos/date-presets.vue';
import dateRange from '@/examples/date-picker/demos/date-range.vue';
import month from '@/examples/date-picker/demos/month.vue';
import year from '@/examples/date-picker/demos/year.vue';

// 单独测试示例
// npx jest --testPathPattern test/unit/date-picker/* --config script/test/jest.unit.conf.js

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// unit test for component in examples.
describe('DatePicker', () => {
  it('base demo works fine', () => {
    const wrapper = mount(base);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('datePresetsAlt demo works fine', () => {
    const wrapper = mount(datePresetsAlt);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('datePresetsTime demo works fine', () => {
    const wrapper = mount(datePresetsTime);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('datePresets demo works fine', () => {
    const wrapper = mount(datePresets);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('dateRange demo works fine', () => {
    const wrapper = mount(dateRange);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('month demo works fine', () => {
    const wrapper = mount(month);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('year demo works fine', () => {
    const wrapper = mount(year);
    expect(wrapper.element).toMatchSnapshot();
  });
});
