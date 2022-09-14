import { AttachNode } from '../../common';

export default function getTargetElm(elm: AttachNode): HTMLElement {
  if (elm) {
    let targetElement: HTMLElement = null;
    if (typeof elm === 'string') {
      targetElement = document.querySelector(elm);
    } else if (typeof elm === 'function') {
      targetElement = elm() as HTMLElement;
    } else {
      throw new Error('elm should be string or function');
    }
    if (targetElement) {
      return targetElement as HTMLElement;
    }
    throw new Error('There is no element with given.');
  } else {
    return document.body;
  }
}
