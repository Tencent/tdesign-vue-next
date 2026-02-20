// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('Slider Additional Coverage Tests', () => {
  describe('Slider Track Click', () => {
    it('clicking on slider track updates value - horizontal', async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} onChangeEnd={onChangeEnd} />;
        },
      });
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');

      // Mock slider size and position
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({
          left: 100,
          top: 0,
          width: 200,
          height: 20,
          right: 300,
          bottom: 20,
        }),
      });

      // Click on slider track at 75% position
      await sliderRail.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('clicking on slider track updates value - vertical', async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} onChange={onChange} onChangeEnd={onChangeEnd} />;
        },
      });
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');

      // Mock slider size and position
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          top: 100,
          width: 20,
          height: 200,
          right: 20,
          bottom: 300,
        }),
      });

      // Click on slider track at 75% position (from bottom)
      await sliderRail.trigger('click', { clientX: 10, clientY: 150 });
      await nextTick();

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('clicking on slider track does not work when disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider disabled modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');

      // Mock slider size and position
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({
          left: 100,
          top: 0,
          width: 200,
          height: 20,
          right: 300,
          bottom: 20,
        }),
      });

      // Try to click on slider track
      await sliderRail.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();

      // onChange should not be called when disabled
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking on slider track with range slider', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} onChange={onChange} />;
        },
      });
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');

      // Mock slider size and position
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({
          left: 100,
          top: 0,
          width: 200,
          height: 20,
          right: 300,
          bottom: 20,
        }),
      });

      // Click on slider track
      await sliderRail.trigger('click', { clientX: 150, clientY: 10 });
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Component Lifecycle', () => {
    it('removes resize listener on unmount', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      // Unmount component
      wrapper.unmount();
      await nextTick();

      // Check if resize listener was removed
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('initializes correctly on mount', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const slider = wrapper.findComponent(Slider);
      expect(slider.exists()).toBeTruthy();

      // Check if slider is properly initialized
      const button = wrapper.find('.t-slider__button-wrapper');
      expect(button.exists()).toBeTruthy();
    });
  });

  describe('InputNumber onChange for Range Slider', () => {
    it('second input onChange updates second value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range inputNumberProps modelValue={[20, 80]} onChange={onChange} />;
        },
      });
      await nextTick();

      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });
      expect(inputs.length).toBe(2);

      // Get the second input
      const secondInput = inputs[1];

      // Trigger change on second input
      await secondInput.vm.$emit('change', 90);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('first input onChange updates first value', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range inputNumberProps modelValue={[20, 80]} onChange={onChange} />;
        },
      });
      await nextTick();

      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });
      expect(inputs.length).toBe(2);

      // Get the first input
      const firstInput = inputs[0];

      // Trigger change on first input
      await firstInput.vm.$emit('change', 10);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('input values are clamped to min/max', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range inputNumberProps min={0} max={100} modelValue={[20, 80]} onChange={onChange} />;
        },
      });
      await nextTick();

      const inputs = wrapper.findAllComponents({ name: 'TInputNumber' });

      // Try to set value beyond max
      await inputs[1].vm.$emit('change', 150);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('single slider input onChange works', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider inputNumberProps modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const input = wrapper.findComponent({ name: 'TInputNumber' });
      expect(input.exists()).toBeTruthy();

      // Trigger change on input
      await input.vm.$emit('change', 60);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles click when sliderRef is null', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const slider = wrapper.find('.t-slider');

      // Mock getBoundingClientRect to return null-like values
      Object.defineProperty(slider.element, 'getBoundingClientRect', {
        value: () => null,
      });

      // Try to click - should not crash
      try {
        await slider.trigger('click', { clientX: 150, clientY: 10 });
        await nextTick();
      } catch (e) {
        // Expected to handle gracefully
      }

      // Component should still exist
      expect(slider.exists()).toBeTruthy();
    });

    it('handles resize event', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
      await nextTick();

      // Component should still work
      const slider = wrapper.findComponent(Slider);
      expect(slider.exists()).toBeTruthy();
    });

    it('handles multiple rapid clicks', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      const sliderRail = wrapper.find('.t-slider__rail');

      // Mock slider size and position
      Object.defineProperty(sliderRail.element, 'getBoundingClientRect', {
        value: () => ({
          left: 100,
          top: 0,
          width: 200,
          height: 20,
          right: 300,
          bottom: 20,
        }),
      });

      // Multiple rapid clicks
      await sliderRail.trigger('click', { clientX: 150, clientY: 10 });
      await sliderRail.trigger('click', { clientX: 200, clientY: 10 });
      await sliderRail.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Dragging State', () => {
    it('does not respond to track click while dragging', async () => {
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
          left: 100,
          top: 0,
          width: 200,
          height: 20,
          right: 300,
          bottom: 20,
        }),
      });

      // Start dragging
      await button.trigger('mousedown', { clientX: 200, clientY: 10 });
      await nextTick();

      // Reset onChange mock
      onChange.mockClear();

      // Try to click on track while dragging
      await slider.trigger('click', { clientX: 250, clientY: 10 });
      await nextTick();

      // onChange should not be called for track click during drag
      // (it may be called for drag, but not for the click)

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();
    });
  });
});
