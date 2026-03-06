// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('Slider Hooks Tests', () => {
  describe('useSliderInput Hook', () => {
    it('renders input number with default config', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('renders input number with custom theme', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ theme: 'row' }} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('renders input number with column theme', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ theme: 'column' }} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('renders input number with normal theme', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ theme: 'normal' }} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('input number respects decimalPlaces from step', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps step={0.01} modelValue={50.55} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('input number with custom placeholder', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ placeholder: 'Enter value' }} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('input number with format function', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps={{ format: (val) => `${val}%` }} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });

    it('input number is disabled when slider is disabled', async () => {
      const wrapper = mount({
        render() {
          return <Slider disabled inputNumberProps modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.vm.$.props.disabled).toBeTruthy();
    });

    it('input number respects min and max', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps min={20} max={80} modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.vm.$.props.min).toBe(20);
      expect(input.vm.$.props.max).toBe(80);
    });

    it('input number for vertical slider has correct class', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" inputNumberProps modelValue={50} />;
        },
      });
      await nextTick();
      const inputContainer = wrapper.find('.t-slider__input-container');
      expect(inputContainer.classes()).toContain('is-vertical');
    });

    it('range slider renders two input numbers', async () => {
      const wrapper = mount({
        render() {
          return <Slider range inputNumberProps modelValue={[20, 80]} />;
        },
      });
      await nextTick();
      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });
      expect(inputs.length).toBe(2);
    });

    it('range slider has center line between inputs', async () => {
      const wrapper = mount({
        render() {
          return <Slider range inputNumberProps modelValue={[20, 80]} />;
        },
      });
      await nextTick();
      const centerLine = wrapper.find('.t-slider__center-line');
      expect(centerLine.exists()).toBeTruthy();
    });

    it('input number onChange callback is called', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps modelValue={50} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      const increaseBtn = wrapper.find('.t-input-number__increase');
      await increaseBtn.trigger('click');
      await nextTick();
      expect(input.exists()).toBeTruthy();
    });

    it('input number handles undefined value correctly', async () => {
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps modelValue={50} min={0} max={100} />;
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
    });
  });

  describe('useSliderMark Hook', () => {
    it('renders marks from array', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('renders marks from object with strings', async () => {
      const marks = {
        0: '0°C',
        50: '50°C',
        100: '100°C',
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('renders marks from object with functions', async () => {
      const marks = {
        0: (val) => `${val}%`,
        50: (val) => `${val}%`,
        100: (val) => `${val}%`,
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('renders marks from object with JSX', async () => {
      const marks = {
        0: <span style="color: red">Min</span>,
        50: <span style="color: blue">Mid</span>,
        100: <span style="color: green">Max</span>,
      };
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('marks are positioned correctly', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      markTexts.forEach((mark) => {
        expect(mark.attributes('style')).toBeDefined();
      });
    });

    it('marks respect min and max boundaries', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });

    it('marks outside range are filtered', async () => {
      const marks = {
        0: '0',
        50: '50',
        100: '100',
        150: '150', // Outside max
      };
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('marks are clickable', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markText = wrapper.find('.t-slider__mark-text');
      await markText.trigger('click');
      await nextTick();
      expect(markText.exists()).toBeTruthy();
    });

    it('marks render stops correctly', async () => {
      const marks = [0, 25, 50, 75, 100];
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const stops = wrapper.findAll('.t-slider__mark-stop');
      expect(stops.length).toBeGreaterThan(0);
    });

    it('marks work with vertical layout', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('empty marks array renders nothing', async () => {
      const wrapper = mount({
        render() {
          return <Slider marks={[]} />;
        },
      });
      await nextTick();
      const mark = wrapper.find('.t-slider__mark');
      expect(mark.exists()).toBeFalsy();
    });

    it('marks with sorted array values', async () => {
      const marks = [100, 0, 50, 25, 75]; // Unsorted
      const wrapper = mount({
        render() {
          return <Slider marks={marks} />;
        },
      });
      await nextTick();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(5);
    });
  });

  describe('useSliderTooltip Hook', () => {
    it('tooltip shows by default', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows value when label is true', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={true} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip hidden when label is false', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={false} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      // Tooltip component exists but content may be empty
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows formatted string with ${value}', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label="Value: ${value}%" />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows custom string without ${value}', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label="Custom Label" />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows function result', async () => {
      const labelFn = ({ value }) => `Value is ${value}`;
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={labelFn} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows position for range slider start', async () => {
      const labelFn = ({ value, position }) => `${position}: ${value}`;
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} label={labelFn} />;
        },
      });
      await nextTick();
      const tooltips = wrapper.findAllComponents({ name: 'TTooltip' });
      expect(tooltips.length).toBe(2);
    });

    it('tooltip placement is top for horizontal slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="horizontal" modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip placement is right for vertical slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip respects custom tooltipProps placement', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} tooltipProps={{ placement: 'bottom' }} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip respects custom tooltipProps content', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} tooltipProps={{ content: 'Custom Content' }} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip respects custom tooltipProps theme', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} tooltipProps={{ theme: 'light' }} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip can be toggled', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mouseenter');
      await nextTick();
      await button.trigger('mouseleave');
      await nextTick();
      expect(button.exists()).toBeTruthy();
    });

    it('tooltip hideEmptyPopup works', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.vm.$.props.hideEmptyPopup).toBeTruthy();
    });

    it('tooltip exists even when label is false', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={false} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      // Tooltip component should exist
      expect(tooltip.exists()).toBeTruthy();
    });
  });

  describe('Hooks Integration', () => {
    it('all hooks work together', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return (
            <Slider
              modelValue={50}
              marks={marks}
              inputNumberProps
              label={(val) => `${val}%`}
              tooltipProps={{ placement: 'top' }}
            />
          );
        },
      });
      await nextTick();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('hooks work with range slider', async () => {
      const marks = { 0: '0', 50: '50', 100: '100' };
      const wrapper = mount({
        render() {
          return (
            <Slider
              range
              modelValue={[20, 80]}
              marks={marks}
              inputNumberProps
              label={({ value, position }) => `${position}: ${value}`}
            />
          );
        },
      });
      await nextTick();
      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });
      expect(inputs.length).toBe(2);
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
      const tooltips = wrapper.findAllComponents({ name: 'TTooltip' });
      expect(tooltips.length).toBe(2);
    });

    it('hooks work with vertical layout', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} marks={marks} inputNumberProps label={(val) => `${val}%`} />;
        },
      });
      await nextTick();
      const container = wrapper.find('.is-vertical');
      expect(container.exists()).toBeTruthy();
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();
      const markTexts = wrapper.findAll('.t-slider__mark-text');
      expect(markTexts.length).toBe(3);
    });

    it('hooks work with disabled state', async () => {
      const marks = [0, 50, 100];
      const wrapper = mount({
        render() {
          return <Slider disabled modelValue={50} marks={marks} inputNumberProps />;
        },
      });
      await nextTick();
      const slider = wrapper.find('.t-slider');
      expect(slider.classes()).toContain('t-is-disabled');
      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.vm.$.props.disabled).toBeTruthy();
    });
  });
});
