import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { expect, vi } from 'vitest';
import Slider from '@tdesign/components/slider';
import sliderProps from '@tdesign/components/slider/props';
import { formatLabel } from '@tdesign/common-js/slider/utils';

import type { SliderMarks, SliderValue } from '@tdesign/components/slider';

describe('Slider', () => {
  describe('props', () => {
    it(':disabled[boolean]', async () => {
      const wrapper = mount(<Slider />);
      expect(wrapper.find('.t-slider').classes('t-is-disabled')).toBe(false);

      const wrapperDisabled = mount(<Slider disabled />);
      expect(wrapperDisabled.find('.t-slider').classes('t-is-disabled')).toBe(true);

      const wrapperWithInputNumber = mount(<Slider disabled inputNumberProps />);
      await nextTick();
      expect(wrapperWithInputNumber.find('.t-input').classes('t-is-disabled')).toBe(true);
    });

    it(':disabled[boolean] overrides inputNumberProps.disabled', async () => {
      const basicValue = 50;
      const wrapper = mount(<Slider disabled inputNumberProps={{ disabled: false }} modelValue={basicValue} />);
      await nextTick();
      const inputEle = wrapper.find('.t-input__inner').element as HTMLInputElement;
      const increaseButtonEle = wrapper.find('.t-input-number__increase');

      await increaseButtonEle.trigger('click');
      expect(Number(inputEle.value) === basicValue).toBe(true);
    });

    it(':inputNumberProps[boolean/object]', async () => {
      const wrapper = mount(<Slider />);
      await nextTick();
      expect(wrapper.find('.t-input').exists()).toBe(false);

      const wrapperWithInput = mount(<Slider inputNumberProps />);
      await nextTick();
      expect(wrapperWithInput.find('.t-input').exists()).toBe(true);
    });

    describe(':inputNumberProps[boolean/object] behavior', () => {
      it('value can be covered by slider props', async () => {
        const testValue = Math.floor(Math.random() * 100);
        const wrapper = mount(<Slider inputNumberProps modelValue={testValue} />);
        await nextTick();
        const inputEle = wrapper.find('.t-input__inner').element as HTMLInputElement;
        expect(Number(inputEle.value) === testValue).toBe(true);
      });

      it('step can be covered by slider props', async () => {
        const sliderStep = 10;
        const inputStep = 20;
        const testValue = 28;
        const wrapper = mount(
          <Slider inputNumberProps={{ step: inputStep }} step={sliderStep} modelValue={testValue} />,
        );
        await nextTick();
        const inputEle = wrapper.find('.t-input__inner').element as HTMLInputElement;
        const increaseButtonEle = wrapper.find('.t-input-number__increase');
        const decreaseButtonEle = wrapper.find('.t-input-number__decrease');

        await increaseButtonEle.trigger('click');
        expect(Number(inputEle.value) === testValue + sliderStep).toBe(true);

        await decreaseButtonEle.trigger('click');
        expect(Number(inputEle.value) === testValue).toBe(true);
      });

      it('min/max can be covered by slider props', async () => {
        const sliderLimit = { max: 80, min: 40 };
        const inputNumberLimit = { max: 70, min: 50 };
        const testValue = 60;
        const wrapper = mount(
          <Slider inputNumberProps={inputNumberLimit} step={15} {...sliderLimit} modelValue={testValue} />,
        );
        await nextTick();
        const inputWrapper = wrapper.find('.t-input__inner');
        const inputEle = inputWrapper.element as HTMLInputElement;
        const increaseButtonEle = wrapper.find('.t-input-number__increase');
        const decreaseButtonEle = wrapper.find('.t-input-number__decrease');

        // case 1: increase by click button
        // test max limit 60 + 15 = 75
        await increaseButtonEle.trigger('click');
        expect(Number(inputEle.value) <= sliderLimit.max && Number(inputEle.value) > inputNumberLimit.max).toBe(true);

        // 75 + 15 = 90，大于 sliderLimit.max
        await increaseButtonEle.trigger('click');
        expect(Number(inputEle.value) < sliderLimit.max).toBe(false);

        // test min limit
        await decreaseButtonEle.trigger('click');
        await decreaseButtonEle.trigger('click');
        await decreaseButtonEle.trigger('click');
        expect(Number(inputEle.value) >= sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBe(true);

        // case 2: increase by input
        inputWrapper.setValue(43);
        await inputWrapper.trigger('blur');
        expect(Number(inputEle.value) >= sliderLimit.min && Number(inputEle.value) < inputNumberLimit.min).toBe(true);
      });

      it('callback event works', async () => {
        const sliderLimit = { max: 80, min: 40 };
        const onEnterFn = vi.fn();
        const onChangeFn = vi.fn();
        const inputNumberLimit = { max: 70, min: 50, onEnter: onEnterFn, onChange: onChangeFn };
        const testValue = 60;
        const wrapper = mount(
          <Slider inputNumberProps={inputNumberLimit} step={15} {...sliderLimit} modelValue={testValue} />,
        );
        await nextTick();
        const inputWrapper = wrapper.find('.t-input__inner');
        const increaseButtonEle = wrapper.find('.t-input-number__increase');

        inputWrapper.trigger('keydown.enter');
        expect(onEnterFn).toBeCalled();

        await increaseButtonEle.trigger('click');
        expect(onChangeFn).toBeCalled();
      });
    });

    it(':layout[string]', () => {
      const validator = sliderProps.layout.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const wrapper = mount(<Slider />);
      expect(wrapper.find('.is-vertical').exists()).toBe(false);

      const wrapperVertical = mount(<Slider layout="vertical" />);
      expect(wrapperVertical.find('.is-vertical').exists()).toBe(true);
    });

    it(':label[string/boolean]', () => {
      const testValue = Math.floor(Math.random() * 100);
      const wrapper = mount(<Slider modelValue={testValue} />, {
        attachTo: document.getElementById('#app'),
      });
      const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
      sliderTooltipVm.trigger('mouseenter').then(() => {
        // @ts-expect-error
        const tooltipContent = sliderTooltipVm.componentVM.content;
        expect(String(tooltipContent) === String(testValue)).toBe(true);
      });
    });

    it(':label[string] without ${value}%', () => {
      const testLabel = 'test label';
      const wrapper = mount(<Slider label={testLabel} />, {
        attachTo: document.getElementById('#app'),
      });
      const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
      sliderTooltipVm.trigger('mouseenter').then(() => {
        // @ts-expect-error
        const tooltipContent = sliderTooltipVm.componentVM.content;
        expect(String(tooltipContent) === String(testLabel)).toBe(true);
      });
    });

    it(':label[string] with ${value}%', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const testLabel = 'label:${value}%';
      const testValue = Math.floor(Math.random() * 100);
      const wrapper = mount(<Slider modelValue={testValue} label={testLabel} />, {
        attachTo: document.getElementById('#app'),
      });
      const sliderTooltipVm = wrapper.findComponent({ name: 'TTooltip' });
      sliderTooltipVm.trigger('mouseenter').then(() => {
        // @ts-expect-error
        const tooltipContent = sliderTooltipVm.componentVM.content;
        const normalizeValue = formatLabel(testLabel, testValue);
        expect(String(tooltipContent) === String(normalizeValue)).toBe(true);
      });
    });

    it(':marks[array]', () => {
      const wrapper = mount(<Slider />);
      expect(wrapper.find('.t-slider__mark').exists()).toBe(false);

      const marksProp = [0, 20, 40, 60, 80, 100];
      const wrapperMarks = mount(<Slider marks={marksProp} />);
      expect(wrapperMarks.findAll('.t-slider__mark-text').length === marksProp.length).toBe(true);
    });

    it(':marks[object]', () => {
      const marksProp: SliderMarks = {
        0: '0°C',
        20: '20°C',
        40: '40°C',
        60: '60°C',
        80: () => <span style="color: #0052d9">80°C</span>,
        100: () => <span style="color: #0052d9">100°C</span>,
      };
      const wrapper = mount(<Slider marks={marksProp} />);
      expect(wrapper.findAll('.t-slider__mark-text').length === Object.keys(marksProp).length).toBe(true);
    });

    it(':range[boolean]', () => {
      const wrapper = mount(<Slider />);
      expect(wrapper.findAll('.t-slider__button-wrapper').length < 2).toBe(true);

      const wrapperRange = mount(<Slider range />);
      expect(wrapperRange.findAll('.t-slider__button-wrapper').length === 2).toBe(true);
    });

    it(':showStep[boolean]', async () => {
      const wrapper = mount(<Slider />);
      await nextTick();
      expect(wrapper.findAll('.t-slider__stop').length <= 0).toBe(true);

      const wrapperShowStep = mount(<Slider showStep />);
      await nextTick();
      expect(wrapperShowStep.findAll('.t-slider__stop').length > 0).toBe(true);
    });

    it(':showStep[boolean] + :step[number]', async () => {
      const step = Math.floor(Math.random() * 100);
      const stepCount = 100 / step;
      const result = [];
      for (let i = 1; i < stepCount; i++) {
        result.push(i);
      }
      const wrapper = mount(<Slider showStep step={step} />);
      await nextTick();
      const stopElements = wrapper.findAll('.t-slider__stop');
      expect(stopElements.length === result.length).toBe(true);
    });

    it(':tooltipProps[object]', async () => {
      const tooltipProps = { placement: 'bottom', theme: 'light' };
      const wrapper = mount(<Slider modelValue={50} tooltipProps={tooltipProps} />);
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('onChange: click inputNumber button', async () => {
      const basicValue = 50;
      let changeEventValue: SliderValue = 0;
      const changeEvent = (val: SliderValue) => {
        changeEventValue = val;
      };
      const wrapper = mount(<Slider onChange={changeEvent} inputNumberProps modelValue={basicValue} />);
      await nextTick();
      const increaseButtonEle = wrapper.find('.t-input-number__increase');

      await increaseButtonEle.trigger('click');
      expect(changeEventValue === basicValue + 1).toBe(true);
    });

    it('onChange: text inputNumber', async () => {
      const basicValue = 50;
      const inputTargetValue = 80;
      let changeEventValue: SliderValue = 0;
      const changeEvent = (val: SliderValue) => {
        changeEventValue = val;
      };
      const wrapper = mount(<Slider onChange={changeEvent} inputNumberProps modelValue={basicValue} />);
      await nextTick();
      const inputWrapper = wrapper.find('.t-input__inner');

      inputWrapper.setValue(inputTargetValue);
      await inputWrapper.trigger('blur');
      expect(changeEventValue === inputTargetValue).toBe(true);
    });

    it('onChange: keyboard navigation', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider modelValue={50} onChange={onChange} />);
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');

      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('onChange: keyboard navigation respects step', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider modelValue={50} step={10} onChange={onChange} />);
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('onChange: keyboard navigation disabled when slider is disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider disabled modelValue={50} onChange={onChange} />);
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('onChange: click mark text', async () => {
      const marks = [0, 50, 100];
      const onChange = vi.fn();
      const wrapper = mount(<Slider marks={marks} onChange={onChange} />);
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('onChange: mark click disabled when slider is disabled', async () => {
      const marks = [0, 50, 100];
      const onChange = vi.fn();
      const wrapper = mount(<Slider disabled marks={marks} onChange={onChange} />);
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('onChange: click slider track', async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      const wrapper = mount(<Slider modelValue={50} onChange={onChange} onChangeEnd={onChangeEnd} />);
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({ left: 100, top: 0, width: 200, height: 20, right: 300, bottom: 20 }),
      });

      await sliderRail.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('onChange: click slider track does not work when disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider disabled modelValue={50} onChange={onChange} />);
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({ left: 100, top: 0, width: 200, height: 20, right: 300, bottom: 20 }),
      });

      await sliderRail.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('onChange: drag button', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider modelValue={50} onChange={onChange} />);
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, width: 200, height: 20, right: 200, bottom: 20 }),
      });

      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 10, bubbles: true }));
      await nextTick();

      window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('onChange: drag button disabled when slider is disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider disabled modelValue={50} onChange={onChange} />);
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mousedown', { clientX: 100, clientY: 0 });
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('onChange: touch drag', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Slider modelValue={50} onChange={onChange} />);
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, width: 200, height: 20, right: 200, bottom: 20 }),
      });

      await button.trigger('touchstart', { touches: [{ clientX: 100, clientY: 10 }] });
      await nextTick();

      window.dispatchEvent(
        new TouchEvent('touchmove', { touches: [{ clientX: 150, clientY: 10 } as Touch], bubbles: true }),
      );
      await nextTick();

      window.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('onChangeEnd: drag end', async () => {
      const onChangeEnd = vi.fn();
      const wrapper = mount(<Slider modelValue={50} onChangeEnd={onChangeEnd} />);
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, width: 200, height: 20, right: 200, bottom: 20 }),
      });

      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 10, bubbles: true }));
      await nextTick();

      window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('onChangeEnd: mark click', async () => {
      const marks = [0, 50, 100];
      const onChangeEnd = vi.fn();
      const wrapper = mount(<Slider marks={marks} onChangeEnd={onChangeEnd} />);
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(onChangeEnd).toHaveBeenCalled();
    });
  });
});
