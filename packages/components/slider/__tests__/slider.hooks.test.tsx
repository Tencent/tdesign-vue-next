import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import Slider from '@tdesign/components/slider';

import type { SliderValue } from '@tdesign/components/slider';

describe('Slider hooks', () => {
  describe('useSliderInput', () => {
    it('renders input number with default config', async () => {
      const wrapper = mount(<Slider inputNumberProps modelValue={50} />);
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBe(true);
    });

    it('input number is disabled when slider is disabled', async () => {
      const wrapper = mount(<Slider disabled inputNumberProps modelValue={50} />);
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.vm.$.props.disabled).toBe(true);
    });

    it('input number respects min and max', async () => {
      const wrapper = mount(<Slider inputNumberProps min={20} max={80} modelValue={50} />);
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.vm.$.props.min).toBe(20);
      expect(input.vm.$.props.max).toBe(80);
    });

    it('input number for vertical slider has correct class', async () => {
      const wrapper = mount(<Slider layout="vertical" inputNumberProps modelValue={50} />);
      await nextTick();
      const inputContainer = wrapper.find('.t-slider__input-container');
      expect(inputContainer.classes()).toContain('is-vertical');
    });

    it('range slider renders two input numbers', async () => {
      const wrapper = mount(<Slider range inputNumberProps modelValue={[20, 80]} />);
      await nextTick();
      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });
      expect(inputs.length).toBe(2);
    });

    it('range slider has center line between inputs', async () => {
      const wrapper = mount(<Slider range inputNumberProps modelValue={[20, 80]} />);
      await nextTick();
      const centerLine = wrapper.find('.t-slider__center-line');
      expect(centerLine.exists()).toBe(true);
    });
  });

  describe('useSliderMark', () => {
    it('renders marks from array', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount(<Slider marks={marks} />);
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('renders marks from object with strings', async () => {
      const marks = { 0: '0°C', 50: '50°C', 100: '100°C' };
      const wrapper = mount(<Slider marks={marks} />);
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('marks outside range are filtered', async () => {
      const marks = { 0: '0', 50: '50', 100: '100', 150: '150' };
      const wrapper = mount(<Slider min={0} max={100} marks={marks} />);
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('empty marks array renders nothing', async () => {
      const wrapper = mount(<Slider marks={[]} />);
      await nextTick();
      const mark = wrapper.find('.t-slider__mark');
      expect(mark.exists()).toBe(false);
    });

    it('marks work with vertical layout', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount(<Slider layout="vertical" marks={marks} />);
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });
  });

  describe('useSliderTooltip', () => {
    it('tooltip shows by default', async () => {
      const wrapper = mount(<Slider modelValue={50} />);
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBe(true);
    });

    it('tooltip hideEmptyPopup works', async () => {
      const wrapper = mount(<Slider modelValue={50} />);
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.vm.$.props.hideEmptyPopup).toBe(true);
    });

    it('range slider renders two tooltips', async () => {
      const labelFn = ({ value, position }: { value: SliderValue; position: number }) => `${position}: ${value}`;
      // @ts-expect-error
      const wrapper = mount(<Slider range modelValue={[20, 80]} label={labelFn} />);
      await nextTick();
      const tooltips = wrapper.findAllComponents({ name: 'TTooltip' });
      expect(tooltips.length).toBe(2);
    });
  });
});
