/**
 * ImageViewer 组件 hooks 测试文件
 * 测试 useDrag、useMirror、useScale、useRotate 等 hooks
 */
import { expect, vi, beforeEach, afterEach } from 'vitest';
import { useDrag, useMirror, useScale, useRotate } from '../hooks';

describe('ImageViewer Hooks', () => {
  // ==================== useDrag Hook ====================
  describe('useDrag', () => {
    it('should initialize with default transform values', () => {
      const { transform } = useDrag({ translateX: 0, translateY: 0 });
      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('should initialize with custom transform values', () => {
      const { transform } = useDrag({ translateX: 100, translateY: 200 });
      expect(transform.value).toEqual({ translateX: 100, translateY: 200 });
    });

    it('should not start drag with non-left mouse button', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      // Simulate right-click mousedown
      const mouseDownEvent = {
        button: 2, // right button
        pageX: 100,
        pageY: 100,
      } as MouseEvent;
      mouseDownHandler(mouseDownEvent);

      // Transform should not change since drag didn't start
      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('should start drag with left mouse button and track movement', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      // Start drag with left button
      const mouseDownEvent = {
        button: 0, // left button
        pageX: 100,
        pageY: 100,
      } as MouseEvent;
      mouseDownHandler(mouseDownEvent);

      // Simulate mousemove
      const mouseMoveEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(mouseMoveEvent, 'pageX', { value: 150, writable: false });
      Object.defineProperty(mouseMoveEvent, 'pageY', { value: 180, writable: false });
      document.dispatchEvent(mouseMoveEvent);

      // Transform should be updated based on movement
      expect(transform.value).toEqual({ translateX: 50, translateY: 80 });
    });

    it('should stop drag on mouseup', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      // Start drag
      const mouseDownEvent = {
        button: 0,
        pageX: 100,
        pageY: 100,
      } as MouseEvent;
      mouseDownHandler(mouseDownEvent);

      // Move
      const mouseMoveEvent1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent1, 'pageX', { value: 150, writable: false });
      Object.defineProperty(mouseMoveEvent1, 'pageY', { value: 150, writable: false });
      document.dispatchEvent(mouseMoveEvent1);

      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });

      // Mouseup to stop drag
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      // Further movement should not affect transform
      const mouseMoveEvent2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent2, 'pageX', { value: 200, writable: false });
      Object.defineProperty(mouseMoveEvent2, 'pageY', { value: 200, writable: false });
      document.dispatchEvent(mouseMoveEvent2);

      // Transform should remain the same
      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });
    });

    it('should stop drag on mouseleave', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      // Start drag
      const mouseDownEvent = {
        button: 0,
        pageX: 100,
        pageY: 100,
      } as MouseEvent;
      mouseDownHandler(mouseDownEvent);

      // Move
      const mouseMoveEvent1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent1, 'pageX', { value: 120, writable: false });
      Object.defineProperty(mouseMoveEvent1, 'pageY', { value: 130, writable: false });
      document.dispatchEvent(mouseMoveEvent1);

      expect(transform.value).toEqual({ translateX: 20, translateY: 30 });

      // Mouseleave to stop drag
      document.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

      // Further movement should not affect transform
      const mouseMoveEvent2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent2, 'pageX', { value: 300, writable: false });
      Object.defineProperty(mouseMoveEvent2, 'pageY', { value: 300, writable: false });
      document.dispatchEvent(mouseMoveEvent2);

      // Transform should remain the same
      expect(transform.value).toEqual({ translateX: 20, translateY: 30 });
    });

    it('should reset transform', () => {
      const initTransform = { translateX: 50, translateY: 50 };
      const { transform, resetTransform } = useDrag(initTransform);

      // Manually modify transform
      transform.value = { translateX: 100, translateY: 100 };
      expect(transform.value).toEqual({ translateX: 100, translateY: 100 });

      // Reset
      resetTransform();
      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });
    });

    it('should expose mouseDownHandler function', () => {
      const { mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });
      expect(typeof mouseDownHandler).toBe('function');
    });

    it('should handle multiple drag operations sequentially', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      // First drag
      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);
      const move1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(move1, 'pageX', { value: 50 });
      Object.defineProperty(move1, 'pageY', { value: 50 });
      document.dispatchEvent(move1);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });

      // Second drag from current position
      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);
      const move2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(move2, 'pageX', { value: 30 });
      Object.defineProperty(move2, 'pageY', { value: 30 });
      document.dispatchEvent(move2);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(transform.value).toEqual({ translateX: 80, translateY: 80 });
    });

    it('should not respond to middle mouse button', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 1, pageX: 100, pageY: 100 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 200 });
      Object.defineProperty(moveEvent, 'pageY', { value: 200 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('should handle negative drag values', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 100, translateY: 100 });

      mouseDownHandler({ button: 0, pageX: 200, pageY: 200 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 100 });
      Object.defineProperty(moveEvent, 'pageY', { value: 100 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });
  });

  // ==================== useMirror Hook ====================
  describe('useMirror', () => {
    it('should initialize mirror value to 1', () => {
      const { mirror } = useMirror();
      expect(mirror.value).toBe(1);
    });

    it('should toggle mirror value on onMirror call', () => {
      const { mirror, onMirror } = useMirror();

      expect(mirror.value).toBe(1);

      onMirror();
      expect(mirror.value).toBe(-1);

      onMirror();
      expect(mirror.value).toBe(1);

      onMirror();
      expect(mirror.value).toBe(-1);
    });

    it('should reset mirror value to 1', () => {
      const { mirror, onMirror, resetMirror } = useMirror();

      onMirror();
      onMirror();
      onMirror();
      expect(mirror.value).toBe(-1);

      resetMirror();
      expect(mirror.value).toBe(1);
    });

    it('should handle multiple rapid mirror toggles', () => {
      const { mirror, onMirror } = useMirror();

      for (let i = 0; i < 10; i++) {
        onMirror();
      }
      // Even number of toggles should return to 1
      expect(mirror.value).toBe(1);

      onMirror();
      expect(mirror.value).toBe(-1);
    });
  });

  // ==================== useScale Hook ====================
  describe('useScale', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should initialize with default scale values', () => {
      const { scale } = useScale(undefined);
      expect(scale.value).toBe(1); // defaultScale
    });

    it('should initialize with custom imageScale config', () => {
      const imageScale = {
        max: 3,
        min: 0.5,
        step: 0.1,
        defaultScale: 1.5,
      };
      const { scale } = useScale(imageScale);
      expect(scale.value).toBe(1.5);
    });

    it('should zoom in with onZoomIn', () => {
      const imageScale = {
        max: 2,
        min: 0.5,
        step: 0.2,
        defaultScale: 1,
      };
      const { scale, onZoomIn } = useScale(imageScale);

      expect(scale.value).toBe(1);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.2);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.4);
    });

    it('should zoom out with onZoomOut', () => {
      const imageScale = {
        max: 2,
        min: 0.5,
        step: 0.2,
        defaultScale: 1,
      };
      const { scale, onZoomOut } = useScale(imageScale);

      expect(scale.value).toBe(1);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.8);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.6);
    });

    it('should not exceed max scale', () => {
      const imageScale = {
        max: 1.5,
        min: 0.5,
        step: 0.5,
        defaultScale: 1,
      };
      const { scale, onZoomIn } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.5);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.5); // Should stay at max
    });

    it('should not go below min scale', () => {
      const imageScale = {
        max: 2,
        min: 0.5,
        step: 0.3,
        defaultScale: 0.6,
      };
      const { scale, onZoomOut } = useScale(imageScale);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.5); // Should stop at min
    });

    it('should reset scale to default', () => {
      const imageScale = {
        max: 2,
        min: 0.5,
        step: 0.2,
        defaultScale: 1,
      };
      const { scale, onZoomIn, resetScale } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.4);

      resetScale();
      expect(scale.value).toBe(1);
    });

    it('should use default params when imageScale is undefined', () => {
      const { scale, onZoomIn, onZoomOut, resetScale } = useScale(undefined);

      // Default params: max: 2, min: 0.5, step: 0.2, defaultScale: 1
      expect(scale.value).toBe(1);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.2);

      resetScale();
      expect(scale.value).toBe(1);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.8);
    });

    it('should handle partial imageScale config', () => {
      const imageScale = {
        max: 5,
        min: 0.5,
        step: 0.2,
        defaultScale: 1,
      };
      const { scale, onZoomIn } = useScale(imageScale);

      expect(scale.value).toBe(1); // defaultScale from defaults

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.2); // step: 0.2 from defaults
    });

    it('should handle large scale values', () => {
      const imageScale = {
        max: 10,
        min: 0.1,
        step: 1,
        defaultScale: 5,
      };
      const { scale, onZoomIn, onZoomOut } = useScale(imageScale);

      expect(scale.value).toBe(5);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(6);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(5);
    });

    it('should handle small step values', () => {
      const imageScale = {
        max: 2,
        min: 0.5,
        step: 0.05,
        defaultScale: 1,
      };
      const { scale, onZoomIn } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.05);
    });

    it('should clamp scale when zoom would exceed boundaries', () => {
      const imageScale = {
        max: 1.1,
        min: 0.9,
        step: 0.2,
        defaultScale: 1,
      };
      const { scale, onZoomIn, onZoomOut } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.1); // Clamped to max

      onZoomOut();
      vi.advanceTimersByTime(100);
      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.9); // Clamped to min
    });
  });

  // ==================== useRotate Hook ====================
  describe('useRotate', () => {
    it('should initialize rotate value to 0', () => {
      const { rotate } = useRotate();
      expect(rotate.value).toBe(0);
    });

    it('should rotate by 90 degrees on each onRotate call', () => {
      const { rotate, onRotate } = useRotate();

      expect(rotate.value).toBe(0);

      onRotate();
      expect(rotate.value).toBe(90);

      onRotate();
      expect(rotate.value).toBe(180);

      onRotate();
      expect(rotate.value).toBe(270);

      onRotate();
      expect(rotate.value).toBe(360);
    });

    it('should reset rotate value to 0', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      onRotate();
      onRotate();
      onRotate();
      expect(rotate.value).toBe(270);

      resetRotate();
      expect(rotate.value).toBe(0);
    });

    it('should continue rotating beyond 360 degrees', () => {
      const { rotate, onRotate } = useRotate();

      // Rotate 5 times = 450 degrees
      for (let i = 0; i < 5; i++) {
        onRotate();
      }
      expect(rotate.value).toBe(450);
    });

    it('should handle multiple rotations', () => {
      const { rotate, onRotate } = useRotate();

      for (let i = 0; i < 8; i++) {
        onRotate();
      }
      expect(rotate.value).toBe(720); // 2 full rotations
    });

    it('should reset after multiple rotations', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      for (let i = 0; i < 10; i++) {
        onRotate();
      }
      expect(rotate.value).toBe(900);

      resetRotate();
      expect(rotate.value).toBe(0);
    });
  });

  // ==================== Integration Tests ====================
  describe('hooks integration', () => {
    it('should work together for image transformations', () => {
      const { mirror, onMirror, resetMirror } = useMirror();
      const { rotate, onRotate, resetRotate } = useRotate();

      // Apply transformations
      onMirror();
      onRotate();
      onRotate();

      expect(mirror.value).toBe(-1);
      expect(rotate.value).toBe(180);

      // Reset all
      resetMirror();
      resetRotate();

      expect(mirror.value).toBe(1);
      expect(rotate.value).toBe(0);
    });

    it('should combine drag, scale, mirror, and rotate', () => {
      vi.useFakeTimers();

      const { transform, resetTransform } = useDrag({ translateX: 0, translateY: 0 });
      const { scale, onZoomIn, resetScale } = useScale({ max: 2, min: 0.5, step: 0.2, defaultScale: 1 });
      const { mirror, onMirror, resetMirror } = useMirror();
      const { rotate, onRotate, resetRotate } = useRotate();

      // Apply all transformations
      transform.value = { translateX: 100, translateY: 100 };
      onZoomIn();
      vi.advanceTimersByTime(100);
      onMirror();
      onRotate();

      expect(transform.value).toEqual({ translateX: 100, translateY: 100 });
      expect(scale.value).toBe(1.2);
      expect(mirror.value).toBe(-1);
      expect(rotate.value).toBe(90);

      // Reset all
      resetTransform();
      resetScale();
      resetMirror();
      resetRotate();

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
      expect(scale.value).toBe(1);
      expect(mirror.value).toBe(1);
      expect(rotate.value).toBe(0);

      vi.useRealTimers();
    });

    it('should handle rapid operations across all hooks', () => {
      vi.useFakeTimers();

      const { onZoomIn, onZoomOut: _onZoomOut, scale } = useScale({ max: 3, min: 0.5, step: 0.1, defaultScale: 1 });
      const { onMirror, mirror } = useMirror();
      const { onRotate, rotate } = useRotate();

      // Rapid operations
      for (let i = 0; i < 5; i++) {
        onZoomIn();
        vi.advanceTimersByTime(60);
        onMirror();
        onRotate();
      }

      // Verify final states
      expect(scale.value).toBe(1.5);
      expect(mirror.value).toBe(-1); // Odd number of toggles
      expect(rotate.value).toBe(450);

      vi.useRealTimers();
    });
  });

  // ==================== Edge Cases ====================
  describe('edge cases', () => {
    it('useDrag should handle zero movement', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 100, pageY: 100 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 100 });
      Object.defineProperty(moveEvent, 'pageY', { value: 100 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('useDrag should handle large movement values', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 10000 });
      Object.defineProperty(moveEvent, 'pageY', { value: 10000 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 10000, translateY: 10000 });
    });

    it('useMirror should maintain state after multiple resets', () => {
      const { mirror, onMirror, resetMirror } = useMirror();

      onMirror();
      resetMirror();
      resetMirror();
      resetMirror();

      expect(mirror.value).toBe(1);
    });

    it('useRotate should handle reset during rotation sequence', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      onRotate();
      onRotate();
      resetRotate();
      onRotate();

      expect(rotate.value).toBe(90);
    });
  });
});
