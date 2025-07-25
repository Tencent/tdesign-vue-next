import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getCSSValue, initDragEvent } from '../utils';

describe('getCSSValue', () => {
  describe('number input', () => {
    it('positive number', () => {
      expect(getCSSValue(100)).toBe('100px');
      expect(getCSSValue(50)).toBe('50px');
      expect(getCSSValue(1)).toBe('1px');
    });

    it('zero', () => {
      expect(getCSSValue(0)).toBe('0px');
    });

    it('negative number', () => {
      expect(getCSSValue(-50)).toBe('-50px');
      expect(getCSSValue(-100)).toBe('-100px');
    });

    it('decimal number', () => {
      expect(getCSSValue(1.5)).toBe('1.5px');
      expect(getCSSValue(10.25)).toBe('10.25px');
      expect(getCSSValue(0.5)).toBe('0.5px');
    });

    it('special number values', () => {
      expect(getCSSValue(Infinity)).toBe('Infinitypx');
      expect(getCSSValue(-Infinity)).toBe('-Infinitypx');
      expect(getCSSValue(NaN)).toBe(NaN);
    });
  });

  describe('string input', () => {
    it('numeric string', () => {
      expect(getCSSValue('100')).toBe('100px');
      expect(getCSSValue('0')).toBe('0px');
      expect(getCSSValue('-50')).toBe('-50px');
      expect(getCSSValue('1.5')).toBe('1.5px');
    });

    it('css unit string', () => {
      expect(getCSSValue('100px')).toBe('100px');
      expect(getCSSValue('50%')).toBe('50%');
      expect(getCSSValue('1rem')).toBe('1rem');
      expect(getCSSValue('2em')).toBe('2em');
      expect(getCSSValue('auto')).toBe('auto');
      expect(getCSSValue('inherit')).toBe('inherit');
    });

    it('empty string', () => {
      expect(getCSSValue('')).toBe('0px');
    });

    it('invalid string', () => {
      expect(getCSSValue('abc')).toBe('abc');
      expect(getCSSValue('100abc')).toBe('100abc');
      expect(getCSSValue('px100')).toBe('px100');
    });
  });

  describe('edge cases', () => {
    it('null and undefined', () => {
      expect(getCSSValue(null)).toBe('0px');
      expect(getCSSValue(undefined)).toBe(undefined);
    });
  });
});

describe('initDragEvent', () => {
  let mockElement: HTMLElement;
  let mockMouseDownEvent: MouseEvent;
  let mockMouseMoveEvent: MouseEvent;
  let mockMouseUpEvent: MouseEvent;
  let addEventListenerSpy: any;
  let removeEventListenerSpy: any;

  beforeEach(() => {
    // 创建模拟DOM元素
    mockElement = document.createElement('div');

    // 设置元素大小
    Object.defineProperty(mockElement, 'offsetWidth', {
      writable: true,
      value: 200,
    });
    Object.defineProperty(mockElement, 'offsetHeight', {
      writable: true,
      value: 100,
    });
    Object.defineProperty(mockElement, 'offsetLeft', {
      writable: true,
      value: 100,
    });
    Object.defineProperty(mockElement, 'offsetTop', {
      writable: true,
      value: 50,
    });

    // 模拟style对象
    Object.assign(mockElement.style, {
      position: '',
      left: '',
      top: '',
    });

    // 设置窗口大小
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 768,
    });

    // 添加到DOM
    document.body.appendChild(mockElement);

    // 创建模拟事件
    mockMouseDownEvent = new MouseEvent('mousedown', {
      clientX: 150,
      clientY: 75,
      bubbles: true,
    });

    mockMouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 125,
      bubbles: true,
    });

    mockMouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
    });

    // 监听事件绑定
    addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('basic functionality', () => {
    it('should initialize drag on mousedown', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('dragend', expect.any(Function));
    });

    it('should remove event listeners on mouseup', () => {
      initDragEvent(mockElement);

      // 触发mousedown
      mockElement.dispatchEvent(mockMouseDownEvent);

      // 获取mouseup处理函数
      const mouseUpHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mouseup')[1];

      // 触发mouseup
      mouseUpHandler(mockMouseUpEvent);

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    });

    it('should set element position and style on drag', () => {
      initDragEvent(mockElement);

      // 触发mousedown
      mockElement.dispatchEvent(mockMouseDownEvent);

      // 获取mousemove处理函数
      const mouseMoveHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mousemove')[1];

      // 触发mousemove
      mouseMoveHandler(mockMouseMoveEvent);

      expect(mockElement.style.position).toBe('absolute');
      expect(mockElement.style.left).toBeTruthy();
      expect(mockElement.style.top).toBeTruthy();
    });
  });

  describe('boundary constraints', () => {
    it('should constrain to left boundary', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      const mouseMoveHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mousemove')[1];

      // 创建超出左边界的事件
      const leftBoundaryEvent = new MouseEvent('mousemove', {
        clientX: -100,
        clientY: 75,
      });

      mouseMoveHandler(leftBoundaryEvent);

      expect(mockElement.style.left).toBe('0px');
    });

    it('should constrain to top boundary', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      const mouseMoveHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mousemove')[1];

      // 创建超出上边界的事件
      const topBoundaryEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: -100,
      });

      mouseMoveHandler(topBoundaryEvent);

      expect(mockElement.style.top).toBe('0px');
    });

    it('should constrain to right boundary', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      const mouseMoveHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mousemove')[1];

      // 创建超出右边界的事件
      const rightBoundaryEvent = new MouseEvent('mousemove', {
        clientX: 2000,
        clientY: 75,
      });

      mouseMoveHandler(rightBoundaryEvent);

      // 应该被限制在窗口宽度减去元素宽度的位置
      const expectedLeft = window.innerWidth - mockElement.offsetWidth;
      expect(mockElement.style.left).toBe(`${expectedLeft}px`);
    });

    it('should constrain to bottom boundary', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      const mouseMoveHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'mousemove')[1];

      // 创建超出下边界的事件
      const bottomBoundaryEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 2000,
      });

      mouseMoveHandler(bottomBoundaryEvent);

      // 应该被限制在窗口高度减去元素高度的位置
      const expectedTop = window.innerHeight - mockElement.offsetHeight;
      expect(mockElement.style.top).toBe(`${expectedTop}px`);
    });
  });

  describe('edge cases', () => {
    it('should not enable drag when element is larger than window', () => {
      // 设置元素大小超过窗口大小
      Object.defineProperty(mockElement, 'offsetWidth', {
        writable: true,
        value: 2000,
      });
      Object.defineProperty(mockElement, 'offsetHeight', {
        writable: true,
        value: 1000,
      });

      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      // 不应该绑定任何拖拽相关的事件监听器
      expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addEventListenerSpy).not.toHaveBeenCalledWith('mouseup', expect.any(Function));
    });

    it('should handle missing window dimensions', () => {
      // 模拟没有window.innerWidth的情况
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: undefined,
      });
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        value: 1024,
      });

      expect(() => {
        initDragEvent(mockElement);
        mockElement.dispatchEvent(mockMouseDownEvent);
      }).not.toThrow();
    });

    it('should handle missing window innerHeight', () => {
      // 模拟没有 window.innerHeight 的情况
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: undefined,
      });
      Object.defineProperty(document.documentElement, 'clientHeight', {
        writable: true,
        value: 768,
      });

      expect(() => {
        initDragEvent(mockElement);
        mockElement.dispatchEvent(mockMouseDownEvent);
      }).not.toThrow();
    });

    it('should handle dragend event', () => {
      initDragEvent(mockElement);

      mockElement.dispatchEvent(mockMouseDownEvent);

      // 获取dragend处理函数
      const dragEndHandler = addEventListenerSpy.mock.calls.find((call: string[]) => call[0] === 'dragend')[1];

      // 触发dragend
      const dragEndEvent = new Event('dragend');
      dragEndHandler(dragEndEvent);

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    });
  });
});
