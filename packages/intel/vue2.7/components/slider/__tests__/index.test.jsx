import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Slider from '@/src/slider/index.ts';
import TInputNumber from '@/src/input-number/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Slider', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Slider></Slider>;
        },
      });
      // 写入快照
      expect(wrapper.element).toMatchSnapshot();
    });
    it('disabled', () => {
      const wrapper = mount({
        render() {
          return <Slider disabled={true}></Slider>;
        },
      });
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
    });
    it('inputNumberProps', () => {
      const inputNumberPropsNormalWrapper = mount({
        render() {
          return <Slider inputNumberProps></Slider>;
        },
      });
      expect(inputNumberPropsNormalWrapper.find('.t-input-number').exists()).toBe(true);
      expect(inputNumberPropsNormalWrapper.find('.t-input-number--column').exists()).toBe(true);
      const inputNumberPropsRowWrapper = mount({
        render() {
          return <Slider inputNumberProps={{ theme: 'row' }}></Slider>;
        },
      });
      expect(inputNumberPropsRowWrapper.find('.t-input-number--row').exists()).toBe(true);
    });
    it('max and min', () => {
      const wrapper = mount({
        render() {
          return <Slider min={10} max={50}></Slider>;
        },
      });
      expect(wrapper.find('.t-slider').attributes('aria-valuemax')).toBe('50');
      expect(wrapper.find('.t-slider').attributes('aria-valuemin')).toBe('10');
    });
    it('layout', () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical"></Slider>;
        },
      });
      // 配置layout属性为vertical，且rail的样式为垂直方向 height 100%
      expect(wrapper.find('.t-slider--vertical').exists()).toBe(true);
      expect(wrapper.find('.t-slider__rail').attributes('style')).toBe('height: 100%;');
    });
    it('range', () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" range></Slider>;
        },
      });
      // 配置range属性 存在两个游标button
      expect(wrapper.findAll('.t-slider__button').length).toBe(2);
    });
  });
});

// 测试Slider下的marks传参模板
describe('Slider [marks]', () => {
  const wrapper = mount(Slider, {
    propsData: {
      inputNumberProps: { theme: 'column' },
      value: 2,
      marks: {
        0: '0°C',
        8: '8°C',
        12: '12°C',
        37: '37°C',
        // 这里单元测试不支持传递node节点
        // 50: <strong style="color: #1989FA">50°C</strong>,
        // 60: <button style="color: #1989FA">60°C</button>,
      },
    },
  });
  // 渲染是否正确
  it('render right', () => {
    expect(wrapper.html()).toContain('aria-valuetext="2"');
    expect(wrapper.html()).toContain('37°C');
    expect(wrapper.element).toMatchSnapshot();
  });

  // 输入框输入20
  it('change value on input-number', (done) => {
    // console.log(wrapper.findComponent(TInputNumber).vm);
    Vue.nextTick(() => {
      wrapper.findComponent(TInputNumber).vm.$emit('change', 20);
      done();
    });
  });

  // 检查内部值是否变化
  it('check change value', () => {
    expect(wrapper.vm.prevValue).toBe(20);
  });

  // 检查内部函数是否返回正确
  it('call setValues()', () => {
    expect(wrapper.vm.setValues(1000)).toBe(100);
  });
});

describe('Slider [vertical-marks]', () => {
  const wrapper = mount(Slider, {
    propsData: {
      value: [30, 70],
      layout: 'vertical',
      range: true,
      marks: {
        0: '0°C',
        8: '8°C',
        12: '12°C',
        37: '37°C',
        // 这里单元测试不支持传递node节点
        // 50: <strong style="color: #1989FA">50°C</strong>,
        // 60: <button style="color: #1989FA">60°C</button>,
      },
    },
  });
  // 渲染是否正确
  it('render right', () => {
    expect(wrapper.html()).toContain('aria-valuetext="30-70"');
    expect(wrapper.html()).toContain('37°C');
    expect(wrapper.element).toMatchSnapshot();
  });
  // 检查内部函数是否返回正确
  it('call setValues()', () => {
    expect(wrapper.vm.setValues([300, 200])).toEqual([30, 100]);
    expect(wrapper.vm.setValues([-200, -300])).toEqual([0, 100]);
  });
});
