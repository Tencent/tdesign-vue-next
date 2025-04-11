import { isFunction } from 'lodash-es';
import { isString } from 'lodash-es';
import { AttachNode } from '../../common';

export function getTargetElm(elm: AttachNode): HTMLElement {
  if (elm) {
    let targetElement: HTMLElement = null;
    if (isString(elm)) {
      targetElement = document.querySelector(elm);
    } else if (isFunction(elm)) {
      targetElement = elm() as HTMLElement;
    } else {
      throw new Error('elm should be string or function');
    }
    if (targetElement) {
      return targetElement as HTMLElement;
    }
    if (process?.env?.NODE_ENV !== 'test') {
      throw new Error('There is no element with given.');
    }
  } else {
    return document.body;
  }
}
