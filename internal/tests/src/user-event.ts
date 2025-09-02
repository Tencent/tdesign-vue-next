import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

/** if trigger cannot work, use this*/
export { userEvent };

export { fireEvent };

/**
 * 在指定元素的特定坐标位置执行精确点击操作
 *
 * 该函数使用 `@testing-library/user-event` 的 `pointer` API 来模拟用户在元素
 * 特定位置的精确点击操作，适用于测试需要验证点击位置相关逻辑的场景。
 *
 * @example
 * 基本用法
 * await clickAtPosition({
 *   element: screen.getByTestId('button'),
 *   offsetX: 10,
 *   offsetY: 5
 * });
 *
 * @param {Object} params - 点击位置参数配置对象
 * @param {HTMLElement} params.element - 要点击的目标 DOM 元素
 * @param {number} params.offsetX - 距离元素左侧边缘的偏移量（像素）
 * @param {number} params.offsetY - 距离元素顶部边缘的偏移量（像素）
 *
 * @returns {Promise<void>} 点击操作完成的 Promise
 *
 * @see {@link https://testing-library.com/docs/user-event/intro/|userEvent 文档}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/getBoundingClientRect|getBoundingClientRect 文档}
 */
export async function clickAtPosition(params: {
  target: HTMLElement;
  offsetX: number;
  offsetY: number;
}): Promise<void> {
  const { target, offsetX, offsetY } = params;
  const rect = target.getBoundingClientRect();
  const x = rect.left + offsetX;
  const y = rect.top + offsetY;

  await userEvent.pointer([
    { target: target, coords: { x, y }, keys: '[MouseLeft>]' }, // 鼠标按下
    { keys: '[/MouseLeft]' }, // 鼠标释放
  ]);
}
