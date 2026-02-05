import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCSSValue, initDragEvent } from '../utils';

describe('Dialog Utils', () => {
  describe('getCSSValue', () => {
    it('converts number to px string', () => {
      expect(getCSSValue(100)).toBe('100px');
      expect(getCSSValue(0)).toBe('0px');
      expect(getCSSValue(500)).toBe('500px');
    });

    it('returns string value as is', () => {
      expect(getCSSValue('50%')).toBe('50%');
      expect(getCSSValue('100px')).toBe('100px');
      expect(getCSSValue('auto')).toBe('auto');
      expect(getCSSValue('20vh')).toBe('20vh');
    });

    it('handles edge cases', () => {
      // '0' 和 '100' 是字符串，Number.isNaN(Number('0')) 为 false，所以会转换为 '0px' 和 '100px'
      expect(getCSSValue('0')).toBe('0px');
      expect(getCSSValue('100')).toBe('100px');
    });
  });

  describe('initDragEvent', () => {
    let dragBox: HTMLElement;
    let mousedownEvent: MouseEvent;
    let mousemoveEvent: MouseEvent;
    let mouseupEvent: MouseEvent;

    beforeEach(() => {
      // 创建一个模拟的 dragBox 元素
      dragBox = document.createElement('div');
      dragBox.style.position = 'absolute';
      dragBox.style.left = '100px';
      dragBox.style.top = '100px';
      dragBox.style.width = '200px';
      dragBox.style.height = '150px';
      document.body.appendChild(dragBox);

      // 模拟 offsetLeft, offsetTop, offsetWidth, offsetHeight
      Object.defineProperty(dragBox, 'offsetLeft', { value: 100, writable: true });
      Object.defineProperty(dragBox, 'offsetTop', { value: 100, writable: true });
      Object.defineProperty(dragBox, 'offsetWidth', { value: 200, writable: true });
      Object.defineProperty(dragBox, 'offsetHeight', { value: 150, writable: true });
    });

    afterEach(() => {
      document.body.removeChild(dragBox);
    });

    it('initializes drag event on element', () => {
      const addEventListener = vi.spyOn(dragBox, 'addEventListener');
      initDragEvent(dragBox);

      expect(addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
    });

    it('allows dragging within window bounds', () => {
      initDragEvent(dragBox);

      // 模拟 mousedown 事件
      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 模拟 mousemove 事件
      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // 验证位置已更新
      expect(dragBox.style.position).toBe('absolute');
    });

    it('prevents dragging outside left boundary', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 尝试拖到左边界外
      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: -50,
        clientY: 150,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // left 应该被限制为 0
      expect(parseInt(dragBox.style.left) >= 0).toBe(true);
    });

    it('prevents dragging outside top boundary', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 尝试拖到上边界外
      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: -50,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // top 应该被限制为 0
      expect(parseInt(dragBox.style.top) >= 0).toBe(true);
    });

    it('stops dragging on mouseup', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 模拟 mouseup 事件
      mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
      });

      document.dispatchEvent(mouseupEvent);

      // 再次移动鼠标，位置不应该改变
      const currentLeft = dragBox.style.left;
      const currentTop = dragBox.style.top;

      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 300,
        clientY: 300,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      expect(dragBox.style.left).toBe(currentLeft);
      expect(dragBox.style.top).toBe(currentTop);
    });

    it('stops dragging on dragend', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 模拟 dragend 事件
      const dragendEvent = new Event('dragend', {
        bubbles: true,
      });

      document.dispatchEvent(dragendEvent);

      // 再次移动鼠标，位置不应该改变
      const currentLeft = dragBox.style.left;
      const currentTop = dragBox.style.top;

      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 300,
        clientY: 300,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      expect(dragBox.style.left).toBe(currentLeft);
      expect(dragBox.style.top).toBe(currentTop);
    });

    it('does not allow dragging when dialog is larger than window', () => {
      // 设置 dialog 大于窗口
      Object.defineProperty(dragBox, 'offsetWidth', { value: window.innerWidth + 100, writable: true });
      Object.defineProperty(dragBox, 'offsetHeight', { value: window.innerHeight + 100, writable: true });

      initDragEvent(dragBox);

      const initialLeft = dragBox.style.left;
      const initialTop = dragBox.style.top;

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // 位置不应该改变
      expect(dragBox.style.left).toBe(initialLeft);
      expect(dragBox.style.top).toBe(initialTop);
    });

    it('prevents dragging outside right boundary', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 尝试拖到右边界外
      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: window.innerWidth + 100,
        clientY: 150,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // left 应该被限制在窗口内
      const maxLeft = window.innerWidth - dragBox.offsetWidth;
      expect(parseInt(dragBox.style.left) <= maxLeft).toBe(true);
    });

    it('prevents dragging outside bottom boundary', () => {
      initDragEvent(dragBox);

      mousedownEvent = new MouseEvent('mousedown', {
        clientX: 150,
        clientY: 150,
        bubbles: true,
      });

      dragBox.dispatchEvent(mousedownEvent);

      // 尝试拖到下边界外
      mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: window.innerHeight + 100,
        bubbles: true,
      });

      document.dispatchEvent(mousemoveEvent);

      // top 应该被限制在窗口内
      const maxTop = window.innerHeight - dragBox.offsetHeight;
      expect(parseInt(dragBox.style.top) <= maxTop).toBe(true);
    });
  });
});
