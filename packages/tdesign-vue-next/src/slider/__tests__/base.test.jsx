/* eslint-disable no-template-curly-in-string */

import { mount } from '@vue/test-utils';
import { nextTick } from '@td/adapter-vue';
import { describe, expect, it } from 'vitest';
import { Slider } from 'tdesign-vue-next';
import { formatLabel } from '@td/components-common/src/slider/util/common.ts';

// ui test
describe('slider', () => {
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
      it('inputNumberProps default value is false', async () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        await nextTick();
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
    describe(':props.label', () => {
      it('label default value is undefined', () => {
        const testValue = Math.floor(Math.random() * 100);
        const wrapper = mount(
          {
            render() {
              return <Slider modelValue={testValue} />;
            },
          },
          { attachTo: document.getElementById('#app') },
        );
        const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
        sliderTooltipVm.trigger('mouseenter').then((val) => {
          const tooltipContent = sliderTooltipVm.componentVM.content;
          expect(String(tooltipContent) === String(testValue)).toBeTruthy();
        });
      });
      it('label={string} without ${value}% works fine', () => {
        const testLabel = 'test label';
        const wrapper = mount(
          {
            render() {
              return <Slider label={testLabel} />;
            },
          },
          { attachTo: document.getElementById('#app') },
        );
        const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
        sliderTooltipVm.trigger('mouseenter').then((val) => {
          const tooltipContent = sliderTooltipVm.componentVM.content;
          expect(String(tooltipContent) === String(testLabel)).toBeTruthy();
        });
      });
      it('label={string} with ${value}% works fine', () => {
        const testLabel = `label:\${value}%`;
        const testValue = Math.floor(Math.random() * 100);
        const wrapper = mount(
          {
            render() {
              return <Slider modelValue={testValue} label={testLabel} />;
            },
          },
          { attachTo: document.getElementById('#app') },
        );
        const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
        sliderTooltipVm.trigger('mouseenter').then((val) => {
          const tooltipContent = sliderTooltipVm.componentVM.content;
          const normalizeValue = formatLabel(testLabel, testValue);
          expect(String(tooltipContent) === String(normalizeValue)).toBeTruthy();
        });
      });
    });
    // test prop range
    describe(':props.range', () => {
      it('range default value is false', () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        const buttons = wrapper.findAll('.t-slider__button-wrapper');
        expect(buttons.length < 2).toBeTruthy();
      });
      it('range={true} works fine', () => {
        const wrapper = mount({
          render() {
            return <Slider range />;
          },
        });
        const buttons = wrapper.findAll('.t-slider__button-wrapper');
        expect(buttons.length === 2).toBeTruthy();
      });
    });
    // test prop showStep
    describe(':props.showStep', () => {
      it('showStep default value is false', async () => {
        const wrapper = mount({
          render() {
            return <Slider />;
          },
        });
        await nextTick();
        const stopElements = wrapper.findAll('.t-slider__stop');
        expect(stopElements.length <= 0).toBeTruthy();
      });
      it('showStep={true} works fine', async () => {
        const wrapper = mount({
          render() {
            return <Slider showStep />;
          },
        });
        await nextTick();
        const stopElements = wrapper.findAll('.t-slider__stop');
        expect(stopElements.length > 0).toBeTruthy();
      });
      it('showStep={true} works fine with prop.step={number}', async () => {
        const step = Math.floor(Math.random() * 100);
        const stepCount = 100 / step;
        const result = [];
        for (let i = 1; i < stepCount; i++) {
          result.push(i);
        }
        const wrapper = mount({
          render() {
            return <Slider showStep step={step} />;
          },
        });
        await nextTick();
        const stopElements = wrapper.findAll('.t-slider__stop');
        expect(stopElements.length === result.length).toBeTruthy();
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
        const marks = wrapper.find('.t-slider__mark');
        expect(marks.exists()).toBeFalsy();
      });
      it('marks={array} works find', () => {
        const marksProp = [0, 20, 40, 60, 80, 100];
        const wrapper = mount({
          render() {
            return <Slider marks={marksProp} />;
          },
        });
        const marksItems = wrapper.findAll('.t-slider__mark-text');
        expect(marksItems.length === marksProp.length).toBeTruthy();
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
        const marksItems = wrapper.findAll('.t-slider__mark-text');
        expect(marksItems.length === Object.keys(marksProp).length).toBeTruthy();
      });
    });
  });
});
