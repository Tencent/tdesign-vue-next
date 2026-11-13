import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initDragEvent } from '../utils';

// initDragEvent 在 mousedown 时往 document 上挂 mousemove / mouseup / dragend，
// 但 mouseUpHandler 只摘掉 mousemove 和 mouseup，dragend 一直留着。
// 每拖一次就多一个 dragend 监听，拖 N 次后 document 上挂着 N 个。
describe('initDragEvent', () => {
  let addSpy: any;
  let removeSpy: any;

  beforeEach(() => {
    addSpy = vi.spyOn(document, 'addEventListener');
    removeSpy = vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('removes every document listener it added when the drag ends', () => {
    const box = document.createElement('div');
    Object.defineProperty(box, 'offsetWidth', { value: 100, configurable: true });
    Object.defineProperty(box, 'offsetHeight', { value: 100, configurable: true });
    Object.defineProperty(box, 'offsetLeft', { value: 0, configurable: true });
    Object.defineProperty(box, 'offsetTop', { value: 0, configurable: true });
    document.body.appendChild(box);

    initDragEvent(box);

    // 模拟一次完整拖拽
    box.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10, bubbles: true }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 20, clientY: 20, bubbles: true }));

    const added = addSpy.mock.calls.map((c: any[]) => c[0]);
    const removed = removeSpy.mock.calls.map((c: any[]) => c[0]);

    // 加过的每一种事件都必须被摘掉
    added.forEach((type: string) => {
      expect(removed).toContain(type);
    });

    document.body.removeChild(box);
  });
});
