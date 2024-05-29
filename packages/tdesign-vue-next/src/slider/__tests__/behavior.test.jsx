import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { nextTick } from '@td/adapter-vue';
import { Slider } from 'tdesign-vue-next';

const inputNumberPropsInitData = {
  decimalPlaces: 0,
  format: val => `${val}%`,
  placeholder: '',
  theme: 'column',
};

// every component needs four parts: props/events/slots/functions.
describe('slider', () => {
  // test prop inputNumberProps
  describe('behavior for props.inputNumberProps', () => {
    it('inputNumberProps: prop value can cover by slider props', async () => {
      const testValue = Math.floor(Math.random() * 100);
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps modelValue={testValue} />;
        },
      });
      await nextTick();
      const inputEle = wrapper.find('.t-input__inner').element;
      const val = Number(inputEle.value);
      expect(val === testValue).toBeTruthy();
    });
    it('inputNumberProps: prop step can cover by slider props', async () => {
      const sliderStep = 10;
      const inputStep = 20;
      const testValue = 28;
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ step: inputStep }} step={sliderStep} modelValue={testValue} />;
        },
      });
      await nextTick();
      const inputEle = wrapper.find('.t-input__inner').element;
      const increaseButtonEle = wrapper.find('.t-input-number__increase');
      const decreaseButtonEle = wrapper.find('.t-input-number__decrease');
      await increaseButtonEle.trigger('click');
      const afterIncreaseVal = Number(inputEle.value);
      expect(afterIncreaseVal === testValue + sliderStep).toBeTruthy();
      await decreaseButtonEle.trigger('click');
      const afterDecreaseVal = Number(inputEle.value);
      expect(afterDecreaseVal === testValue).toBeTruthy();
    });
    it('inputNumberProps: prop min/max can cover by slider props', async () => {
      const sliderLimit = { max: 80, min: 40 };
      const inputNumberLimit = { max: 70, min: 50 };
      const testValue = 60;
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={inputNumberLimit} step={15} {...sliderLimit} modelValue={testValue} />;
        },
      });
      await nextTick();
      const inputWrapper = wrapper.find('.t-input__inner');
      const inputEle = inputWrapper.element;
      const increaseButtonEle = wrapper.find('.t-input-number__increase');
      const decreaseButtonEle = wrapper.find('.t-input-number__decrease');
      // case 1: increase by click button
      // test max limit 60 + 15 = 75
      await increaseButtonEle.trigger('click');
      expect(Number(inputEle.value) <= sliderLimit.max && Number(inputEle.value) > inputNumberLimit.max).toBeTruthy();
      // 75 + 15 = 90，大于 sliderLimit.max
      await increaseButtonEle.trigger('click');
      expect(Number(inputEle.value) < sliderLimit.max).toBeFalsy();
      // test min limit
      await decreaseButtonEle.trigger('click');
      await decreaseButtonEle.trigger('click');
      await decreaseButtonEle.trigger('click');
      expect(Number(inputEle.value) >= sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBeTruthy();
      // case 2: increase by input
      inputWrapper.setValue(43);
      await inputWrapper.trigger('blur');
      expect(Number(inputEle.value) >= sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBeTruthy();
    });
    it('inputNumberProps: callback event works', async () => {
      const sliderLimit = { max: 80, min: 40 };
      const onEnterFn = vi.fn();
      const onChangeFn = vi.fn();
      const inputNumberLimit = { max: 70, min: 50, onEnter: onEnterFn, onChange: onChangeFn };
      const testValue = 60;

      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={inputNumberLimit} step={15} {...sliderLimit} modelValue={testValue} />;
        },
      });

      await nextTick();
      const inputWrapper = wrapper.find('.t-input__inner');
      const increaseButtonEle = wrapper.find('.t-input-number__increase');
      inputWrapper.trigger('keydown.enter');
      expect(onEnterFn).toBeCalled();
      await increaseButtonEle.trigger('click');
      expect(onChangeFn).toBeCalled();
    });
  });
  // test prop disabled
  describe('behavior for props.disabled', () => {
    it('prop disabled from inputNumberProps can be cover by Slider', async () => {
      const basicValue = 50;
      const wrapper = mount({
        render() {
          return <Slider disabled inputNumberProps={{ disabled: false }} modelValue={basicValue} />;
        },
      });
      await nextTick();
      const inputWrapper = wrapper.find('.t-input__inner');
      const inputEle = inputWrapper.element;
      const increaseButtonEle = wrapper.find('.t-input-number__increase');
      await increaseButtonEle.trigger('click');
      expect(Number(inputEle.value) === basicValue).toBeTruthy();
    });
  });
  // test event onChange
  describe('behavior for onChange event', () => {
    it('click inputNumber button can trigger onChange event', async () => {
      const basicValue = 50;
      let changeEventValue = 0;
      const changeEvent = (val) => {
        changeEventValue = val;
      };
      const wrapper = mount({
        render() {
          return <Slider onChange={changeEvent} inputNumberProps modelValue={basicValue} />;
        },
      });
      await nextTick();
      const increaseButtonEle = wrapper.find('.t-input-number__increase');
      await increaseButtonEle.trigger('click');
      expect(changeEventValue === basicValue + 1).toBeTruthy();
    });
    it('text inputNumber can trigger onChange event', async () => {
      const basicValue = 50;
      const inputTargetValue = 80;
      let changeEventValue = 0;
      const changeEvent = (val) => {
        changeEventValue = val;
      };
      const wrapper = mount({
        render() {
          return <Slider onChange={changeEvent} inputNumberProps modelValue={basicValue} />;
        },
      });
      await nextTick();
      const inputWrapper = wrapper.find('.t-input__inner');
      inputWrapper.setValue(inputTargetValue);
      await inputWrapper.trigger('blur');
      expect(changeEventValue === inputTargetValue).toBeTruthy();
    });
    // 目前没有找到太好的方法测试drag & drop事件
    //   it('click sldier can trigger onChange event', async () => {
    //     const basicValue = 50;
    // let changeEventValue = 0;
    // const changeEvent = (val) => {
    //   changeEventValue = val;
    // };
    //     const wrapper = mount({
    //       render() {
    //         return <Slider onChange={changeEvent} modelValue={basicValue} />;
    //       },
    //     });
    //     await nextTick();
    //     await wrapper.trigger('mousedown', { left: 30, bottom: 0 });
    //     expect(Number(changeEventValue) === basicValue).toBeTruthy();
    //   });
  });
});
