import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import copy from '../utils/copy-to-clipboard';

describe('copy-to-clipboard', () => {
  // 保存原始的document.execCommand
  const originalExecCommand = document.execCommand;
  const originalQuerySelector = document.querySelector;

  beforeEach(() => {
    Object.defineProperty(document, 'execCommand', {
      writable: true,
      value: vi.fn().mockReturnValue(true),
    });

    Object.defineProperty(window, 'getSelection', {
      writable: true,
      value: vi.fn().mockReturnValue({
        rangeCount: 0,
        removeAllRanges: vi.fn(),
        addRange: vi.fn(),
        getRangeAt: vi.fn(),
        type: '',
      }),
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'execCommand', {
      writable: true,
      value: originalExecCommand,
    });

    Object.defineProperty(document, 'querySelector', {
      writable: true,
      value: originalQuerySelector,
    });
  });

  it('copy success', () => {
    const text = 'Hello, world!';
    const result = copy(text);

    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('copy failure', () => {
    Object.defineProperty(document, 'execCommand', {
      writable: true,
      value: vi.fn().mockImplementation(() => {
        throw new Error('Copy failed');
      }),
    });

    // Mock window.prompt
    const promptSpy = vi.spyOn(window, 'prompt').mockImplementation(() => null);

    const text = 'Hello, world!';
    copy(text);
    expect(promptSpy).toHaveBeenCalled();
  });

  it('options correct', () => {
    const text = 'Hello, world!';
    const options = {
      message: 'Custom copy message: #{key}',
      format: 'text/plain',
      onCopy: vi.fn(),
    };

    const result = copy(text, options);

    expect(result).toBe(true);
    expect(options.onCopy).not.toHaveBeenCalled();
  });
});
