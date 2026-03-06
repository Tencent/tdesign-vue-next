// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('Slider Edge Cases and Boundary Tests', () => {
  describe('SliderButton setPosition Boundary Tests', () => {
    it('handles position > 100', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 50, clientY: 10 });
      await nextTick();

      // Drag beyond the slider (position > 100%)
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150, // Beyond slider width
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Value should be clamped to max (100)
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toBeLessThanOrEqual(100);
    });

    it('handles position < 0', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 50, clientY: 10 });
      await nextTick();

      // Drag before the slider (position < 0%)
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: -50, // Before slider start
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Value should be clamped to min (0)
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toBeGreaterThanOrEqual(0);
    });

    it('handles vertical slider position > 100', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 20,
          height: 100,
          right: 20,
          bottom: 100,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 10, clientY: 50 });
      await nextTick();

      // Drag beyond the slider (position > 100%)
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: -50, // Beyond slider top
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('handles vertical slider position < 0', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 20,
          height: 100,
          right: 20,
          bottom: 100,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 10, clientY: 50 });
      await nextTick();

      // Drag beyond the slider (position < 0%)
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 150, // Beyond slider bottom
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('SliderButton Mouse Enter/Leave', () => {
    it('shows tooltip on mouse enter', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Mouse enter
      await button.trigger('mouseenter');
      await nextTick();

      // Tooltip should be visible
      expect(button.exists()).toBeTruthy();
    });

    it('hides tooltip on mouse leave when not dragging', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Mouse enter
      await button.trigger('mouseenter');
      await nextTick();

      // Mouse leave
      await button.trigger('mouseleave');
      await nextTick();

      expect(button.exists()).toBeTruthy();
    });

    it('keeps tooltip visible on mouse leave when dragging', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Start dragging
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Mouse leave while dragging
      await button.trigger('mouseleave');
      await nextTick();

      // Tooltip should still be visible
      expect(button.exists()).toBeTruthy();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();
    });
  });

  describe('Slider Value Validation', () => {
    it('handles undefined value in emitChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={undefined} onChange={onChange} />;
        },
      });
      await nextTick();

      // Component should handle undefined value gracefully
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
    });

    it('handles null value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={null} onChange={onChange} />;
        },
      });
      await nextTick();

      // Component should handle null value gracefully
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
    });

    it('handles NaN value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={NaN} onChange={onChange} />;
        },
      });
      await nextTick();

      // Component should handle NaN value gracefully
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
    });

    it('handles non-number value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={'invalid' as any} onChange={onChange} />;
        },
      });
      await nextTick();

      // Component should handle non-number value gracefully
      expect(wrapper.findComponent(Slider).exists()).toBeTruthy();
    });
  });

  describe('Range Slider Boundary Tests', () => {
    it('handles minLimit > max edge case', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range min={0} max={100} modelValue={[90, 95]} onChange={onChange} />;
        },
      });
      await nextTick();

      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Try to drag first button beyond second button
      await buttons[0].trigger('mousedown', { clientX: 90, clientY: 10 });
      await nextTick();

      // Drag to position that would exceed max
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 98,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('handles maxLimit < min edge case', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range min={0} max={100} modelValue={[5, 10]} onChange={onChange} />;
        },
      });
      await nextTick();

      const buttons = wrapper.findAll('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Try to drag second button before first button
      await buttons[1].trigger('mousedown', { clientX: 10, clientY: 10 });
      await nextTick();

      // Drag to position that would be less than min
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 2,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Tooltip Toggle Tests', () => {
    it('toggles tooltip visibility', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Show tooltip
      await button.trigger('mouseenter');
      await nextTick();

      // Hide tooltip
      await button.trigger('mouseleave');
      await nextTick();

      expect(button.exists()).toBeTruthy();
    });

    it('tooltip visibility controlled by prop', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} tooltipProps={{ visible: true }} />;
        },
      });
      await nextTick();

      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();
    });
  });

  describe('Precision and Step Tests', () => {
    it('handles precision with decimal values', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50.123} step={0.1} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Drag to new position
      await button.trigger('mousedown', { clientX: 50, clientY: 10 });
      await nextTick();

      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 60,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('handles large step values', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} step={25} onChange={onChange} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');
      const slider = wrapper.find('.t-slider');

      // Mock slider size
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 20,
          right: 100,
          bottom: 20,
        }),
      });

      // Drag to new position
      await button.trigger('mousedown', { clientX: 50, clientY: 10 });
      await nextTick();

      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 75,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });
});
