import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import Slider from '@/src/slider/index.ts';

const inputNumberPropsInitData = {
  decimalPlaces: 0,
  format: (val) => `${val}%`,
  placeholder: '',
  theme: 'normal',
};

// ui test
describe('Slider', () => {
  describe(' ui render test', () => {
    // test prop disabled
    describe(':props.disabled', () => {
      it('disabled default value is false', () => {
        const wrapper = mount(Slider);
        const ele = wrapper.find('.t-slider');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-disabled')).toBe(false);
      });
      it('disabled={true} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider disabled />;
          },
        });
        const ele = wrapper.find('.t-slider');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-disabled')).toBe(true);
        const wrapperWithInputNumber = mount({
          render() {
            return <Slider disabled inputNumberProps />;
          },
        });
        await nextTick();
        const inputEle = wrapperWithInputNumber.find('.t-input');
        expect(inputEle.classes().includes('t-is-disabled')).toBe(true);
      });
    });
    // test prop inputNumberProps
    describe(':props.inputNumberProps', () => {
      it('inputNumberProps default value is false', () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        const inputEle = wrapper.find('.t-input');
        expect(inputEle.exists()).toBeFalsy();
      });
      it('inputNumberProps={true} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider inputNumberProps />;
          },
        });
        await nextTick();
        const inputEle = wrapper.find('.t-input');
        expect(inputEle.exists()).toBeTruthy();
      });
    });
    // test prop layout
    describe(':props.layout', () => {
      it('layout default value is horizontal', () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        const container = wrapper.find('.is-vertical');
        expect(container.exists()).toBeFalsy();
      });
      it('layout={vertical} works fine', () => {
        const wrapper = mount({
          render() {
            return <Slider layout="vertical" />;
          },
        });
        const container = wrapper.find('.is-vertical');
        expect(container.exists()).toBeTruthy();
      });
    });
    // test prop label
    // describe(':props.label', () => {});
    // test prop range
    describe(':props.range', () => {
      it('range default value is false', () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        const buttonEles = wrapper.findAll('.t-slider__button-wrapper');
        expect(buttonEles.length < 2).toBeTruthy();
      });
      it('range={true} works fine', () => {
        const wrapper = mount({
          render() {
            return <Slider range />;
          },
        });
        const buttonEles = wrapper.findAll('.t-slider__button-wrapper');
        expect(buttonEles.length === 2).toBeTruthy();
      });
    });
    // test prop marks
    describe(':props.marks', () => {
      it('marks default value is empty array', () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        const marksEle = wrapper.find('.t-slider__mark');
        expect(marksEle.exists()).toBeFalsy();
      });
      it('marks={array} works find', () => {
        const marksProp = [0, 20, 40, 60, 80, 100];
        const wrapper = mount({
          render() {
            return <Slider marks={marksProp} />;
          },
        });
        const marksItemEles = wrapper.findAll('.t-slider__mark-text');
        expect(marksItemEles.length === marksProp.length).toBeTruthy();
      });
      it('marks={object} works find', () => {
        const marksProp = {
          0: '0°C',
          20: '20°C',
          40: '40°C',
          60: '60°C',
          80: <span style="color: #0052d9">80°C</span>,
          100: <span style="color: #0052d9">100°C</span>,
        };
        const wrapper = mount({
          render() {
            return <Slider marks={marksProp} />;
          },
        });
        const marksItemEles = wrapper.findAll('.t-slider__mark-text');
        expect(marksItemEles.length === Object.keys(marksProp).length).toBeTruthy();
      });
    });
  });
});
