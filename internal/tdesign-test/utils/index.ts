import { fireEvent, createEvent } from '@testing-library/dom';

export function mockDelay(timeout = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout);
  });
}

export function simulateInputChange(dom: HTMLInputElement, text: string) {
  dom.value = text;
  dom.dispatchEvent(new Event('input'));
}

// input enter
export function simulateInputEnter(dom: HTMLInputElement) {
  fireEvent.keyDown(dom, { key: 'Enter', code: 'Enter', charCode: 13 });
}

export function simulateDocumentClick(dom = document) {
  fireEvent.click(dom);
}

// image event enums：load/error
export function simulateImageEvent(dom: HTMLImageElement, event: 'error' | 'load') {
  fireEvent(dom, createEvent(event, dom));
}

// document keydown
export function simulateKeydownEvent(
  dom: Document,
  type: 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'Escape' | 'Enter',
) {
  let event;
  switch (type) {
    case 'ArrowDown':
      event = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 });
      break;
    case 'ArrowUp':
      event = new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp', charCode: 38 });
      break;
    case 'ArrowLeft':
      event = new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft', charCode: 37 });
      break;
    case 'ArrowRight':
      event = new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', charCode: 36 });
      break;
    case 'Escape':
      event = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', charCode: 27 });
      break;
    case 'Enter':
      event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', charCode: 13 });
      break;
    default:
      console.warn('Event Type is Error');
      break;
  }
  dom.dispatchEvent(event);
}

export function getFakeFileList(type = 'file', count = 1) {
  if (type === 'image') {
    return new Array(count).fill(null).map((_, index) => {
      const letters = new Array(index).fill('A').join('');
      return new File([`image bits${letters}`], `image-name${index || ''}.png`, {
        type: 'text/plain',
        lastModified: 1674355700444,
      });
    });
  }
  if (type === 'file') {
    return new Array(count).fill(null).map((_, index) => {
      const letters = new Array(index).fill('B').join('');
      return new File([`this is file text bits${letters}`], `file-name${index || ''}.txt`, {
        type: 'image/png',
        lastModified: 1674355700444,
      });
    });
  }
  return [];
}

/**
 * simulate file change
 * @param {String} dom 发生变化的元素
 * @param {String} type 类型，可选值: file/image。
 * @param {Number} count 文件数量
 * @returns File[]
 */
export function simulateFileChange(dom: HTMLInputElement, type = 'file', count = 1) {
  const fakeFileList = getFakeFileList(type, count);
  fireEvent.change(dom, { target: { files: fakeFileList } });
  return fakeFileList;
}

/**
 * simulate drag file change
 * @param {String} dom 触发节点
 * @param {String} trigger 可选值：dragEnter/dragLeave/dragOver/drop
 * @param {String} type 可选值：file/image
 * @param {Number} count 数量
 * @returns File[]
 */
export function simulateDragFileChange(
  dom: Element,
  trigger: 'dragEnter' | 'dragLeave' | 'dragOver' | 'drop',
  type = 'file',
  count = 1,
) {
  const fakeFileList = getFakeFileList(type, count);
  fireEvent[trigger](dom, {
    dataTransfer: { files: fakeFileList },
  });
  return fakeFileList;
}

export default {};
