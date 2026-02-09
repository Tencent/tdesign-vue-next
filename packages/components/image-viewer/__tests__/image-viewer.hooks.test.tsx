import { expect, vi } from 'vitest';
import { useDrag, useMirror, useScale, useRotate } from '../hooks';

describe('ImageViewer Hooks', () => {
  describe('useDrag', () => {
    it('default transform values', () => {
      const { transform } = useDrag({ translateX: 0, translateY: 0 });
      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('custom transform values', () => {
      const { transform } = useDrag({ translateX: 100, translateY: 200 });
      expect(transform.value).toEqual({ translateX: 100, translateY: 200 });
    });

    it('non-left mouse button does not start drag', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 2, pageX: 100, pageY: 100 } as MouseEvent);
      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('left mouse button starts drag and tracks movement', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 100, pageY: 100 } as MouseEvent);

      const mouseMoveEvent = new MouseEvent('mousemove', { bubbles: true, cancelable: true });
      Object.defineProperty(mouseMoveEvent, 'pageX', { value: 150, writable: false });
      Object.defineProperty(mouseMoveEvent, 'pageY', { value: 180, writable: false });
      document.dispatchEvent(mouseMoveEvent);

      expect(transform.value).toEqual({ translateX: 50, translateY: 80 });
    });

    it('mouseup stops drag', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 100, pageY: 100 } as MouseEvent);

      const mouseMoveEvent1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent1, 'pageX', { value: 150, writable: false });
      Object.defineProperty(mouseMoveEvent1, 'pageY', { value: 150, writable: false });
      document.dispatchEvent(mouseMoveEvent1);
      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });

      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      const mouseMoveEvent2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent2, 'pageX', { value: 200, writable: false });
      Object.defineProperty(mouseMoveEvent2, 'pageY', { value: 200, writable: false });
      document.dispatchEvent(mouseMoveEvent2);

      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });
    });

    it('mouseleave stops drag', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 100, pageY: 100 } as MouseEvent);

      const mouseMoveEvent1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent1, 'pageX', { value: 120, writable: false });
      Object.defineProperty(mouseMoveEvent1, 'pageY', { value: 130, writable: false });
      document.dispatchEvent(mouseMoveEvent1);
      expect(transform.value).toEqual({ translateX: 20, translateY: 30 });

      document.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

      const mouseMoveEvent2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(mouseMoveEvent2, 'pageX', { value: 300, writable: false });
      Object.defineProperty(mouseMoveEvent2, 'pageY', { value: 300, writable: false });
      document.dispatchEvent(mouseMoveEvent2);

      expect(transform.value).toEqual({ translateX: 20, translateY: 30 });
    });

    it('resetTransform', () => {
      const initTransform = { translateX: 50, translateY: 50 };
      const { transform, resetTransform } = useDrag(initTransform);

      transform.value = { translateX: 100, translateY: 100 };
      expect(transform.value).toEqual({ translateX: 100, translateY: 100 });

      resetTransform();
      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });
    });

    it('mouseDownHandler is a function', () => {
      const { mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });
      expect(typeof mouseDownHandler).eq('function');
    });

    it('multiple sequential drag operations', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);
      const move1 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(move1, 'pageX', { value: 50 });
      Object.defineProperty(move1, 'pageY', { value: 50 });
      document.dispatchEvent(move1);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      expect(transform.value).toEqual({ translateX: 50, translateY: 50 });

      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);
      const move2 = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(move2, 'pageX', { value: 30 });
      Object.defineProperty(move2, 'pageY', { value: 30 });
      document.dispatchEvent(move2);
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      expect(transform.value).toEqual({ translateX: 80, translateY: 80 });
    });

    it('middle mouse button does not start drag', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 1, pageX: 100, pageY: 100 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 200 });
      Object.defineProperty(moveEvent, 'pageY', { value: 200 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('negative drag values', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 100, translateY: 100 });

      mouseDownHandler({ button: 0, pageX: 200, pageY: 200 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 100 });
      Object.defineProperty(moveEvent, 'pageY', { value: 100 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('zero movement', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 100, pageY: 100 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 100 });
      Object.defineProperty(moveEvent, 'pageY', { value: 100 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
    });

    it('large movement values', () => {
      const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

      mouseDownHandler({ button: 0, pageX: 0, pageY: 0 } as MouseEvent);

      const moveEvent = new MouseEvent('mousemove', { bubbles: true });
      Object.defineProperty(moveEvent, 'pageX', { value: 10000 });
      Object.defineProperty(moveEvent, 'pageY', { value: 10000 });
      document.dispatchEvent(moveEvent);

      expect(transform.value).toEqual({ translateX: 10000, translateY: 10000 });
    });
  });

  describe('useMirror', () => {
    it('initial mirror value is 1', () => {
      const { mirror } = useMirror();
      expect(mirror.value).eq(1);
    });

    it('onMirror toggles value', () => {
      const { mirror, onMirror } = useMirror();

      expect(mirror.value).eq(1);

      onMirror();
      expect(mirror.value).eq(-1);

      onMirror();
      expect(mirror.value).eq(1);

      onMirror();
      expect(mirror.value).eq(-1);
    });

    it('resetMirror resets to 1', () => {
      const { mirror, onMirror, resetMirror } = useMirror();

      onMirror();
      onMirror();
      onMirror();
      expect(mirror.value).eq(-1);

      resetMirror();
      expect(mirror.value).eq(1);
    });

    it('rapid mirror toggles', () => {
      const { mirror, onMirror } = useMirror();

      for (let i = 0; i < 10; i++) {
        onMirror();
      }
      expect(mirror.value).eq(1);

      onMirror();
      expect(mirror.value).eq(-1);
    });

    it('multiple resets maintain state', () => {
      const { mirror, onMirror, resetMirror } = useMirror();

      onMirror();
      resetMirror();
      resetMirror();
      resetMirror();

      expect(mirror.value).eq(1);
    });
  });

  describe('useScale', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('default scale values', () => {
      const { scale } = useScale(undefined);
      expect(scale.value).eq(1);
    });

    it('custom imageScale config', () => {
      const { scale } = useScale({ max: 3, min: 0.5, step: 0.1, defaultScale: 1.5 });
      expect(scale.value).eq(1.5);
    });

    it('onZoomIn', () => {
      const { scale, onZoomIn } = useScale({ max: 2, min: 0.5, step: 0.2, defaultScale: 1 });

      expect(scale.value).eq(1);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.2);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.4);
    });

    it('onZoomOut', () => {
      const { scale, onZoomOut } = useScale({ max: 2, min: 0.5, step: 0.2, defaultScale: 1 });

      expect(scale.value).eq(1);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(0.8);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(0.6);
    });

    it('max scale boundary', () => {
      const { scale, onZoomIn } = useScale({ max: 1.5, min: 0.5, step: 0.5, defaultScale: 1 });

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.5);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.5);
    });

    it('min scale boundary', () => {
      const { scale, onZoomOut } = useScale({ max: 2, min: 0.5, step: 0.3, defaultScale: 0.6 });

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(0.5);
    });

    it('resetScale', () => {
      const { scale, onZoomIn, resetScale } = useScale({ max: 2, min: 0.5, step: 0.2, defaultScale: 1 });

      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.4);

      resetScale();
      expect(scale.value).eq(1);
    });

    it('undefined imageScale uses defaults', () => {
      const { scale, onZoomIn, onZoomOut, resetScale } = useScale(undefined);

      expect(scale.value).eq(1);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.2);

      resetScale();
      expect(scale.value).eq(1);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(0.8);
    });

    it('partial imageScale config', () => {
      const { scale, onZoomIn } = useScale({ max: 5, min: 0.5, step: 0.2, defaultScale: 1 });

      expect(scale.value).eq(1);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.2);
    });

    it('large scale values', () => {
      const { scale, onZoomIn, onZoomOut } = useScale({ max: 10, min: 0.1, step: 1, defaultScale: 5 });

      expect(scale.value).eq(5);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(6);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(5);
    });

    it('small step values', () => {
      const { scale, onZoomIn } = useScale({ max: 2, min: 0.5, step: 0.05, defaultScale: 1 });

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.05);
    });

    it('clamp scale at boundaries', () => {
      const { scale, onZoomIn, onZoomOut } = useScale({ max: 1.1, min: 0.9, step: 0.2, defaultScale: 1 });

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(1.1);

      onZoomOut();
      vi.advanceTimersByTime(100);
      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).eq(0.9);
    });
  });

  describe('useRotate', () => {
    it('initial rotate value is 0', () => {
      const { rotate } = useRotate();
      expect(rotate.value).eq(0);
    });

    it('onRotate increments by 90 degrees', () => {
      const { rotate, onRotate } = useRotate();

      expect(rotate.value).eq(0);

      onRotate();
      expect(rotate.value).eq(90);

      onRotate();
      expect(rotate.value).eq(180);

      onRotate();
      expect(rotate.value).eq(270);

      onRotate();
      expect(rotate.value).eq(360);
    });

    it('resetRotate resets to 0', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      onRotate();
      onRotate();
      onRotate();
      expect(rotate.value).eq(270);

      resetRotate();
      expect(rotate.value).eq(0);
    });

    it('continues beyond 360 degrees', () => {
      const { rotate, onRotate } = useRotate();

      for (let i = 0; i < 5; i++) {
        onRotate();
      }
      expect(rotate.value).eq(450);
    });

    it('multiple full rotations', () => {
      const { rotate, onRotate } = useRotate();

      for (let i = 0; i < 8; i++) {
        onRotate();
      }
      expect(rotate.value).eq(720);
    });

    it('reset after multiple rotations', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      for (let i = 0; i < 10; i++) {
        onRotate();
      }
      expect(rotate.value).eq(900);

      resetRotate();
      expect(rotate.value).eq(0);
    });

    it('reset during rotation sequence', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      onRotate();
      onRotate();
      resetRotate();
      onRotate();

      expect(rotate.value).eq(90);
    });
  });

  describe('hooks combination', () => {
    it('hooks work together for image transformations', () => {
      const { mirror, onMirror, resetMirror } = useMirror();
      const { rotate, onRotate, resetRotate } = useRotate();

      onMirror();
      onRotate();
      onRotate();

      expect(mirror.value).eq(-1);
      expect(rotate.value).eq(180);

      resetMirror();
      resetRotate();

      expect(mirror.value).eq(1);
      expect(rotate.value).eq(0);
    });

    it('combine drag, scale, mirror, and rotate', () => {
      vi.useFakeTimers();

      const { transform, resetTransform } = useDrag({ translateX: 0, translateY: 0 });
      const { scale, onZoomIn, resetScale } = useScale({ max: 2, min: 0.5, step: 0.2, defaultScale: 1 });
      const { mirror, onMirror, resetMirror } = useMirror();
      const { rotate, onRotate, resetRotate } = useRotate();

      transform.value = { translateX: 100, translateY: 100 };
      onZoomIn();
      vi.advanceTimersByTime(100);
      onMirror();
      onRotate();

      expect(transform.value).toEqual({ translateX: 100, translateY: 100 });
      expect(scale.value).eq(1.2);
      expect(mirror.value).eq(-1);
      expect(rotate.value).eq(90);

      resetTransform();
      resetScale();
      resetMirror();
      resetRotate();

      expect(transform.value).toEqual({ translateX: 0, translateY: 0 });
      expect(scale.value).eq(1);
      expect(mirror.value).eq(1);
      expect(rotate.value).eq(0);

      vi.useRealTimers();
    });

    it('rapid operations across all hooks', () => {
      vi.useFakeTimers();

      const { onZoomIn, scale } = useScale({ max: 3, min: 0.5, step: 0.1, defaultScale: 1 });
      const { onMirror, mirror } = useMirror();
      const { onRotate, rotate } = useRotate();

      for (let i = 0; i < 5; i++) {
        onZoomIn();
        vi.advanceTimersByTime(60);
        onMirror();
        onRotate();
      }

      expect(scale.value).eq(1.5);
      expect(mirror.value).eq(-1);
      expect(rotate.value).eq(450);

      vi.useRealTimers();
    });
  });
});
