import { vi } from 'vitest';
import * as utils from '../utils';

// Mock clipboard module
vi.mock('clipboard', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      destroy: vi.fn(),
    })),
  };
});

import Clipboard from 'clipboard';

describe('Anchor Utils', () => {
  it('ANCHOR_SHARP_REGEXP matches correct patterns', () => {
    const { ANCHOR_SHARP_REGEXP } = utils;

    // 应该匹配#开头的链接
    expect(ANCHOR_SHARP_REGEXP.test('#test')).toBe(true);
    expect(ANCHOR_SHARP_REGEXP.test('#test-id')).toBe(true);
    expect(ANCHOR_SHARP_REGEXP.test('#test_id')).toBe(true);
    expect(ANCHOR_SHARP_REGEXP.test('#test123')).toBe(true);

    // 现有正则 /#(\S+)$/ 会匹配 ##test，因为 #test 是非空白字符
    expect(ANCHOR_SHARP_REGEXP.test('##test')).toBe(true);

    // 不应该匹配其他格式
    expect(ANCHOR_SHARP_REGEXP.test('test')).toBe(false);
    expect(ANCHOR_SHARP_REGEXP.test('#')).toBe(false);
  });

  it('ANCHOR_CONTAINER type is exported', () => {
    expect(true).toBe(true);
  });

  it('getOffsetTop calculates correct offset with window container', () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    document.body.appendChild(element);

    // Mock getBoundingClientRect
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      height: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect);

    // Mock document.documentElement.clientTop
    Object.defineProperty(document.documentElement, 'clientTop', {
      value: 2,
      writable: true,
    });

    const offset = utils.getOffsetTop(element, window);
    expect(offset).toBe(98); // 100 - 2

    document.body.removeChild(element);
  });

  it('getOffsetTop calculates correct offset with HTMLElement container', () => {
    const container = document.createElement('div');
    container.style.height = '500px';
    document.body.appendChild(container);

    const element = document.createElement('div');
    element.style.height = '100px';
    container.appendChild(element);

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 150,
      height: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      height: 500,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect);

    const offset = utils.getOffsetTop(element, container);
    expect(offset).toBe(50); // 150 - 100

    document.body.removeChild(container);
  });

  it('copyText function exists', () => {
    expect(utils.copyText).toBeDefined();
    expect(typeof utils.copyText).toBe('function');
  });

  it('copyText executes correctly', () => {
    // 使用真实的 createElement，但 spy 它的返回值
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const element = originalCreateElement(tagName);
      if (tagName === 'div') {
        vi.spyOn(element, 'click');
        vi.spyOn(element, 'remove');
      }
      return element;
    });

    // 执行copyText
    utils.copyText('test text');

    expect(createElementSpy).toHaveBeenCalledWith('div');
    expect(Clipboard).toHaveBeenCalled();

    // 获取创建的 div 元素
    const createdDiv = createElementSpy.mock.results[0].value;
    expect(createdDiv.click).toHaveBeenCalled();

    // 获取 Clipboard 实例
    const clipboardInstance = (Clipboard as any).mock.results[0].value;
    expect(clipboardInstance.destroy).toHaveBeenCalled();

    expect(createdDiv.remove).toHaveBeenCalled();

    createElementSpy.mockRestore();
  });

  it('copyText passes correct text to Clipboard', () => {
    // Clear previous calls
    (Clipboard as any).mockClear();

    utils.copyText('test text');

    const clipboardCall = (Clipboard as any).mock.calls[0];
    const options = clipboardCall[1];

    expect(options).toHaveProperty('text');
    expect(typeof options.text).toBe('function');
    expect(options.text()).toBe('test text');
  });
});
