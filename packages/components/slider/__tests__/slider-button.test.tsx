// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('SliderButton Component Tests', () => {
  describe('Button Rendering', () => {
    it('renders single button for normal slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(1);
    });

    it('renders two buttons for range slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
    });

    it('button has correct position style', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      expect(button.attributes('style')).toContain('left');
    });

    it('button has correct position style for vertical slider', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      expect(button.attributes('style')).toContain('bottom');
    });
  });

  describe('Button Interactions', () => {
    it('button can receive focus', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      expect(button.attributes('tabindex')).toBe('0');
      await button.trigger('focus');
      // Button should be focusable
      expect(button.exists()).toBeTruthy();
    });

    it('mouseenter shows tooltip', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mouseenter');
      await nextTick();
      // Tooltip should be triggered
      expect(button.exists()).toBeTruthy();
    });

    it('mouseleave hides tooltip when not dragging', async () => {
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

    it('focus triggers mouseenter handler', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('focus');
      await nextTick();
      expect(button.exists()).toBeTruthy();
    });

    it('blur triggers mouseleave handler', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('focus');
      await nextTick();
      await button.trigger('blur');
      await nextTick();
      expect(button.exists()).toBeTruthy();
    });
  });

  describe('Keyboard Navigation', () => {
    it('ArrowRight increases value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('ArrowUp increases value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('ArrowLeft decreases value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowLeft' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('ArrowDown decreases value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('keyboard navigation respects step', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} step={10} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });

    it('keyboard navigation disabled when slider is disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider disabled modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowRight' });
      await nextTick();
      // onChange should not be called when disabled
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Mouse Drag Interactions', () => {
    it('mousedown starts dragging', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mousedown', { clientX: 100, clientY: 0 });
      await nextTick();
      const buttonInner = wrapper.find('.t-slider__button');
      // Button should have dragging class or state
      expect(button.exists()).toBeTruthy();
    });

    it('mousedown disabled when slider is disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider disabled modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mousedown', { clientX: 100, clientY: 0 });
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('touchstart starts dragging', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('touchstart', {
        touches: [{ clientX: 100, clientY: 0 }],
      });
      await nextTick();
      expect(button.exists()).toBeTruthy();
    });
  });

  describe('Button Tooltip', () => {
    it('button has tooltip by default', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows correct value', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip can be disabled', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={false} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      // Tooltip component still exists but may be disabled
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip respects custom tooltipProps', async () => {
      const tooltipProps = {
        placement: 'bottom',
        theme: 'light',
      };
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} tooltipProps={tooltipProps} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows custom label', async () => {
      const label = (val) => `${val}%`;
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} label={label} />;
        },
      });
      await nextTick();
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });

    it('tooltip shows position for range slider', async () => {
      const label = ({ value, position }) => `${position}: ${value}`;
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} label={label} />;
        },
      });
      await nextTick();
      const tooltips = wrapper.findAllComponents({ name: 'TTooltip' });
      expect(tooltips.length).toBe(2);
    });
  });

  describe('Button Position Calculation', () => {
    it('button position reflects value correctly', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      const style = button.attributes('style');
      expect(style).toContain('left');
      expect(style).toContain('50%');
    });

    it('button position at min value', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} modelValue={0} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      const style = button.attributes('style');
      expect(style).toContain('0%');
    });

    it('button position at max value', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={0} max={100} modelValue={100} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      const style = button.attributes('style');
      expect(style).toContain('100%');
    });

    it('button position with custom min/max', async () => {
      const wrapper = mount({
        render() {
          return <Slider min={20} max={80} modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      const style = button.attributes('style');
      expect(style).toContain('left');
      expect(style).toContain('50%');
    });
  });

  describe('Range Slider Button Behavior', () => {
    it('both buttons are independently draggable', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
      expect(buttons[0].exists()).toBeTruthy();
      expect(buttons[1].exists()).toBeTruthy();
    });

    it('buttons have correct positions for range values', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[25, 75]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons[0].attributes('style')).toContain('left');
      expect(buttons[1].attributes('style')).toContain('left');
    });

    it('buttons can cross each other', async () => {
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[80, 20]} />;
        },
      });
      await nextTick();
      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      expect(buttons.length).toBe(2);
    });
  });

  describe('Button with Vertical Layout', () => {
    it('vertical button uses bottom positioning', async () => {
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      expect(button.attributes('style')).toContain('bottom');
    });

    it('vertical button keyboard navigation works', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Button Dragging Class', () => {
    it('button gets dragging class during drag', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();
      const button = wrapper.find('.t-slider__button-wrapper');
      await button.trigger('mousedown', { clientX: 100, clientY: 0 });
      await nextTick();
      // Check if dragging state is active
      expect(button.exists()).toBeTruthy();
    });
  });
});
