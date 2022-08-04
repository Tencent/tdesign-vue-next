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

// every component needs four parts: props/events/slots/functions.
describe('Slider', () => {
  // test prop inputNumberProps
  describe(':props.inputNumberProps', () => {
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
      const increaseButtonEle = wrapper.find('.t-input-number__increase').element;
      const decreaseButtonEle = wrapper.find('.t-input-number__decrease').element;
      increaseButtonEle.click();
      await nextTick();
      const afterIncreaseVal = Number(inputEle.value);
      expect(afterIncreaseVal === testValue + sliderStep).toBeTruthy();
      decreaseButtonEle.click();
      await nextTick();
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
      const increaseButtonEle = wrapper.find('.t-input-number__increase').element;
      const decreaseButtonEle = wrapper.find('.t-input-number__decrease').element;
      // case 1: increase by click button
      // test max limit
      increaseButtonEle.click();
      await nextTick();
      expect(Number(inputEle.value) < sliderLimit.max && Number(inputEle.value) > inputNumberLimit.max).toBeTruthy();
      increaseButtonEle.click();
      await nextTick();
      expect(Number(inputEle.value) < sliderLimit.max).toBeTruthy();
      // test min limit
      decreaseButtonEle.click();
      await nextTick();
      decreaseButtonEle.click();
      await nextTick();
      decreaseButtonEle.click();
      await nextTick();
      expect(Number(inputEle.value) > sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBeTruthy();
      // case 2: increase by input
      inputWrapper.setValue(43);
      inputWrapper.trigger('blur');
      await nextTick();
      expect(Number(inputEle.value) >= sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBeTruthy();
    });
  });
});
