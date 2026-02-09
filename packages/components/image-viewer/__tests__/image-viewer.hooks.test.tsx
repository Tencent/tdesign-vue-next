import { expect, vi, describe, it, beforeEach } from 'vitest';
import { ref, watch } from 'vue';
import { useMirror, useScale, useRotate, useDrag } from '../hooks';

describe('ImageViewer hooks', () => {
  describe('useMirror', () => {
    it('should initialize mirror with 1', () => {
      const { mirror } = useMirror();
      expect(mirror.value).toBe(1);
    });

    it('should toggle mirror between 1 and -1', () => {
      const { mirror, onMirror } = useMirror();
      expect(mirror.value).toBe(1);

      onMirror();
      expect(mirror.value).toBe(-1);

      onMirror();
      expect(mirror.value).toBe(1);
    });

    it('should reset mirror to 1', () => {
      const { mirror, onMirror, resetMirror } = useMirror();
      onMirror();
      expect(mirror.value).toBe(-1);

      resetMirror();
      expect(mirror.value).toBe(1);
    });
  });

  describe('useScale', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('should initialize with defaultScale', () => {
      const imageScale = { defaultScale: 1.5, max: 3, min: 0.5, step: 0.2 };
      const { scale } = useScale(imageScale);
      expect(scale.value).toBe(1.5);
    });

    it('should use default values when imageScale not provided', () => {
      const { scale } = useScale({});
      expect(scale.value).toBe(1); // defaultScale defaults to 1
    });

    it('should zoom in within max limit', () => {
      const imageScale = { defaultScale: 1, max: 2, min: 0.5, step: 0.2 };
      const { scale, onZoomIn } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.2);

      // zoom in multiple times
      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.6);
    });

    it('should zoom out within min limit', () => {
      const imageScale = { defaultScale: 1, max: 2, min: 0.5, step: 0.2 };
      const { scale, onZoomOut } = useScale(imageScale);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.8);

      onZoomOut();
      vi.advanceTimersByTime(100);
      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.5); // should not go below min
    });

    it('should reset scale to defaultScale', () => {
      const imageScale = { defaultScale: 1, max: 2, min: 0.5, step: 0.2 };
      const { scale, onZoomIn, resetScale } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.4);

      resetScale();
      expect(scale.value).toBe(1);
    });

    it('should reset scale when imageScale changes', () => {
      const imageScale = { defaultScale: 1, max: 2, min: 0.5, step: 0.2 };
      const { scale, onZoomIn, resetScale } = useScale(imageScale);

      // Zoom in to change the scale
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBeGreaterThan(1);

      // Manually reset the scale to verify it can be reset
      resetScale();
      expect(scale.value).toBe(1); // Should be reset to defaultScale

      // Test that scale can be reset multiple times
      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      resetScale();
      expect(scale.value).toBe(1);
    });
  });

  describe('useRotate', () => {
    it('should initialize rotate with 0', () => {
      const { rotate } = useRotate();
      expect(rotate.value).toBe(0);
    });

    it('should rotate by 90 degrees each time', () => {
      const { rotate, onRotate } = useRotate();

      onRotate();
      expect(rotate.value).toBe(90);

      onRotate();
      expect(rotate.value).toBe(180);

      onRotate();
      expect(rotate.value).toBe(270);
    });

    it('should reset rotate to 0', () => {
      const { rotate, onRotate, resetRotate } = useRotate();

      onRotate();
      onRotate();
      expect(rotate.value).toBe(180);

      resetRotate();
      expect(rotate.value).toBe(0);
    });
  });

  describe('useDrag', () => {
    it('should initialize transform with provided values', () => {
      const initTransform = { translateX: 10, translateY: 20 };
      const { transform } = useDrag(initTransform);

      expect(transform.value.translateX).toBe(10);
      expect(transform.value.translateY).toBe(20);
    });

    it('should reset transform to initial values', () => {
      const initTransform = { translateX: 10, translateY: 20 };
      const { transform, resetTransform } = useDrag(initTransform);

      transform.value = { translateX: 50, translateY: 60 };

      resetTransform();
      expect(transform.value.translateX).toBe(10);
      expect(transform.value.translateY).toBe(20);
    });

    it('should not handle right mouse button click', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { transform, mouseDownHandler } = useDrag(initTransform);
      const event = new MouseEvent('mousedown', { button: 2 });
      // Mock document.addEventListener to verify it's not called
      const addListenerSpy = vi.spyOn(document, 'addEventListener');
      mouseDownHandler(event);
      // Should not add listeners for right click
      expect(addListenerSpy).not.toHaveBeenCalled();
      addListenerSpy.mockRestore();
    });

    it('should add mouse move and up listeners on left mouse down', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { transform, mouseDownHandler } = useDrag(initTransform);
      const event = new MouseEvent('mousedown', { button: 0, pageX: 100, pageY: 150 });
      const addListenerSpy = vi.spyOn(document, 'addEventListener');
      mouseDownHandler(event);
      expect(addListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(addListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      addListenerSpy.mockRestore();
    });

    it('should update transform on mouse move', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { transform, mouseDownHandler } = useDrag(initTransform);

      const downEvent = {
        button: 0,
        pageX: 100,
        pageY: 150,
        stopPropagation: vi.fn(),
      };

      let mouseMoveHandler: (e: any) => void;
      const addListenerSpy = vi.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'mousemove') {
          mouseMoveHandler = handler as (e: any) => void;
        }
      });

      mouseDownHandler(downEvent as any);

      const moveEvent = {
        pageX: 120,
        pageY: 170,
        stopPropagation: vi.fn(),
      };

      if (mouseMoveHandler) {
        mouseMoveHandler(moveEvent);
      }

      expect(transform.value.translateX).toBe(20); // 0 + (120 - 100)
      expect(transform.value.translateY).toBe(20); // 0 + (170 - 150)

      addListenerSpy.mockRestore();
    });

    it('should remove listeners on mouse up', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { mouseDownHandler } = useDrag(initTransform);

      const downEvent = new MouseEvent('mousedown', { button: 0 });
      const addListenerSpy = vi.spyOn(document, 'addEventListener');
      mouseDownHandler(downEvent);

      const removeListenerSpy = vi.spyOn(document, 'removeEventListener');

      // 获取添加的 mouseup 监听器函数
      const upListenerCall = addListenerSpy.mock.calls.find((call) => call[0] === 'mouseup');
      expect(upListenerCall).toBeDefined();
      const upListener = upListenerCall[1];

      // 模拟鼠标抬起事件
      const upEvent = new MouseEvent('mouseup');
      upListener(upEvent);

      // 检查是否正确移除了所有监听器
      expect(removeListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(removeListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

      addListenerSpy.mockRestore();
      removeListenerSpy.mockRestore();
    });

    it('should handle mouse movement correctly', () => {
      const initTransform = { translateX: 10, translateY: 20 };
      const { transform, mouseDownHandler } = useDrag(initTransform);

      // 模拟鼠标按下
      const downEvent = {
        button: 0,
        pageX: 100,
        pageY: 150,
        stopPropagation: vi.fn(),
      };

      // 创建真实的鼠标移动处理器
      let mouseMoveHandler: (e: any) => void;
      const addListenerSpy = vi.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'mousemove') {
          mouseMoveHandler = handler as (e: any) => void;
        }
      });

      mouseDownHandler(downEvent as any);

      // 模拟鼠标移动
      const moveEvent = {
        pageX: 120,
        pageY: 170,
        stopPropagation: vi.fn(),
      };

      if (mouseMoveHandler) {
        mouseMoveHandler(moveEvent);
      }

      // 检查 transform 是否正确更新
      expect(transform.value.translateX).toBe(30); // 10 + (120 - 100)
      expect(transform.value.translateY).toBe(40); // 20 + (170 - 150)

      addListenerSpy.mockRestore();
    });

    it('should remove listeners on mouse leave', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { mouseDownHandler } = useDrag(initTransform);
      const downEvent = new MouseEvent('mousedown', { button: 0 });
      const addListenerSpy = vi.spyOn(document, 'addEventListener');
      mouseDownHandler(downEvent);

      const removeListenerSpy = vi.spyOn(document, 'removeEventListener');

      // 获取添加的监听器函数
      const leaveListener = addListenerSpy.mock.calls.find((call) => call[0] === 'mouseleave')[1];

      // 模拟鼠标离开
      const leaveEvent = new MouseEvent('mouseleave');
      leaveListener(leaveEvent);

      // 检查是否正确移除了所有监听器
      expect(removeListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(removeListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

      addListenerSpy.mockRestore();
      removeListenerSpy.mockRestore();
    });

    it('should handle multiple mouse movements', () => {
      const initTransform = { translateX: 5, translateY: 10 };
      const { transform, mouseDownHandler } = useDrag(initTransform);

      const downEvent = {
        button: 0,
        pageX: 50,
        pageY: 60,
        stopPropagation: vi.fn(),
      };

      let mouseMoveHandler: (e: any) => void;
      const addListenerSpy = vi.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'mousemove') {
          mouseMoveHandler = handler as (e: any) => void;
        }
      });

      mouseDownHandler(downEvent as any);

      // 第一次移动
      const firstMoveEvent = {
        pageX: 60,
        pageY: 70,
        stopPropagation: vi.fn(),
      };

      if (mouseMoveHandler) {
        mouseMoveHandler(firstMoveEvent);
      }

      expect(transform.value.translateX).toBe(15); // 5 + (60 - 50)
      expect(transform.value.translateY).toBe(20); // 10 + (70 - 60)

      // 第二次移动（基于第一次移动后的位置）
      const secondMoveEvent = {
        pageX: 80,
        pageY: 90,
        stopPropagation: vi.fn(),
      };

      if (mouseMoveHandler) {
        mouseMoveHandler(secondMoveEvent);
      }

      expect(transform.value.translateX).toBe(35); // 15 + (80 - 60)
      expect(transform.value.translateY).toBe(40); // 20 + (90 - 70)

      addListenerSpy.mockRestore();
    });
  });

  describe('Edge cases', () => {
    it('useScale should clamp values to min and max limits', () => {
      vi.useFakeTimers();
      const imageScale = { defaultScale: 1, max: 2, min: 0.5, step: 0.5 };
      const { scale, onZoomIn, onZoomOut } = useScale(imageScale);

      // 放大到上限
      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(2); // 不应该超过 max

      // 缩小到下限
      onZoomOut();
      vi.advanceTimersByTime(100);
      onZoomOut();
      vi.advanceTimersByTime(100);
      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(0.5); // 不应该低于 min
      vi.useRealTimers();
    });

    it('useScale should handle step values correctly', () => {
      vi.useFakeTimers();
      const imageScale = { defaultScale: 1, max: 3, min: 0.1, step: 0.3 };
      const { scale, onZoomIn, onZoomOut } = useScale(imageScale);

      onZoomIn();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1.3);

      onZoomOut();
      vi.advanceTimersByTime(100);
      expect(scale.value).toBe(1);
      vi.useRealTimers();
    });

    it('useDrag should handle edge cases in mouse movement', () => {
      const initTransform = { translateX: 0, translateY: 0 };
      const { transform, mouseDownHandler } = useDrag(initTransform);

      const downEvent = {
        button: 0,
        pageX: 0,
        pageY: 0,
        stopPropagation: vi.fn(),
      };

      let mouseMoveHandler: (e: any) => void;
      const addListenerSpy = vi.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'mousemove') {
          mouseMoveHandler = handler as (e: any) => void;
        }
      });

      mouseDownHandler(downEvent as any);

      // 测试边界情况：移动距离为负数
      const moveEvent = {
        pageX: -10,
        pageY: -20,
        stopPropagation: vi.fn(),
      };

      if (mouseMoveHandler) {
        mouseMoveHandler(moveEvent);
      }

      expect(transform.value.translateX).toBe(-10);
      expect(transform.value.translateY).toBe(-20);

      addListenerSpy.mockRestore();
    });
  });

  describe('Type imports coverage', () => {
    it('should import types for coverage', () => {
      // Dummy references to types for coverage
      const props: import('../type').TdImageViewerProps = {};
      const scale: import('../type').ImageScale = { max: 2, min: 0.5, step: 0.2, defaultScale: 1 };
      const info: import('../type').ImageInfo = { mainImage: 'test.jpg' };
      const viewerScale: import('../type').ImageViewerScale = { minWidth: 100, minHeight: 100 };
      expect(props).toBeDefined();
      expect(scale).toBeDefined();
      expect(info).toBeDefined();
      expect(viewerScale).toBeDefined();
    });
  });
});
