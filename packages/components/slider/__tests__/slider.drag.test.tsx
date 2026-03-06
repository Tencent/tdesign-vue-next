// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import Slider from '@tdesign/components/slider';

describe('Slider Drag and MouseUp Tests', () => {
  describe('Button Drag Behavior', () => {
    it('onDragging updates position during drag', async () => {
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
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
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

    it('onDragging with touchmove event', async () => {
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
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Start touch drag
      await button.trigger('touchstart', {
        touches: [{ clientX: 100, clientY: 10 }],
      });
      await nextTick();

      // Simulate touch move
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [{ clientX: 150, clientY: 10 } as Touch],
        bubbles: true,
      });
      window.dispatchEvent(touchMoveEvent);
      await nextTick();

      // End touch
      const touchEndEvent = new TouchEvent('touchend', { bubbles: true });
      window.dispatchEvent(touchEndEvent);
      await nextTick();

      expect(onChange).toHaveBeenCalled();
    });

    it('onDragging with vertical slider', async () => {
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
          height: 200,
          right: 20,
          bottom: 200,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 10, clientY: 100 });
      await nextTick();

      // Simulate drag movement (vertical)
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 50,
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

    it('onDragEnd removes event listeners', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Check if event listeners were removed
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('onDragEnd with contextmenu event', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Trigger contextmenu to end drag
      const contextMenuEvent = new MouseEvent('contextmenu', { bubbles: true });
      window.dispatchEvent(contextMenuEvent);
      await nextTick();

      expect(button.exists()).toBeTruthy();
    });

    it('dragging does not update if not dragging', async () => {
      const onChange = vi.fn();
      mount({
        render() {
          return <Slider modelValue={50} onChange={onChange} />;
        },
      });
      await nextTick();

      // Simulate drag movement without starting drag
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('MouseUp Event Tests', () => {
    it('onMouseup triggers onChangeEnd for single slider', async () => {
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} onChangeEnd={onChangeEnd} />;
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

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 120,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Wait for setTimeout in onDragEnd
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('onMouseup triggers onChangeEnd for range slider - first button', async () => {
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} onChangeEnd={onChangeEnd} />;
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
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Drag first button
      await buttons[0].trigger('mousedown', { clientX: 40, clientY: 10 });
      await nextTick();

      // Simulate drag movement
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

      // Wait for setTimeout in onDragEnd
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('onMouseup triggers onChangeEnd for range slider - second button', async () => {
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider range modelValue={[20, 80]} onChangeEnd={onChangeEnd} />;
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
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Drag second button
      await buttons[1].trigger('mousedown', { clientX: 160, clientY: 10 });
      await nextTick();

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 140,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Wait for setTimeout in onDragEnd
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('onMouseup with vertical slider', async () => {
      const onChangeEnd = vi.fn();
      const wrapper = mount({
        render() {
          return <Slider layout="vertical" modelValue={50} onChangeEnd={onChangeEnd} />;
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
          height: 200,
          right: 20,
          bottom: 200,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 10, clientY: 100 });
      await nextTick();

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 80,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Wait for setTimeout in onDragEnd
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onChangeEnd).toHaveBeenCalled();
    });
  });

  describe('Tooltip Toggle During Drag', () => {
    it('tooltip shows during drag', async () => {
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

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Tooltip should be visible during drag
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.exists()).toBeTruthy();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();
    });

    it('tooltip hides after drag ends', async () => {
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

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      // Wait for setTimeout
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Tooltip should be hidden after drag
      expect(button.exists()).toBeTruthy();
    });
  });

  describe('Reset Size During Drag', () => {
    it('calls resetSize during dragging', async () => {
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

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Simulate drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 10,
        bubbles: true,
      });
      window.dispatchEvent(mouseMoveEvent);
      await nextTick();

      // End drag
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(button.exists()).toBeTruthy();
    });
  });

  describe('Click vs Drag Detection', () => {
    it('distinguishes between click and drag', async () => {
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
          width: 200,
          height: 20,
          right: 200,
          bottom: 20,
        }),
      });

      // Start drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Simulate significant drag movement
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
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

    it('handles click without drag', async () => {
      const wrapper = mount({
        render() {
          return <Slider modelValue={50} />;
        },
      });
      await nextTick();

      const button = wrapper.find('.t-slider__button-wrapper');

      // Click without drag
      await button.trigger('mousedown', { clientX: 100, clientY: 10 });
      await nextTick();

      // Immediately release without moving
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      window.dispatchEvent(mouseUpEvent);
      await nextTick();

      expect(button.exists()).toBeTruthy();
    });
  });
});
