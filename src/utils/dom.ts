/**
 * Thanks to https://spothero.com/static/main/uniform/docs-js/module-DOMUtils.html
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { ComponentPublicInstance, VNode } from 'vue';
import raf from 'raf';
import isString from 'lodash/isString';
import { easeInOutCubic, EasingFunction } from './easing';
import { ScrollContainer, ScrollContainerElement } from '../common';

export const isServer = typeof window === 'undefined';
const trim = (str: string): string => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

export const on = ((): any => {
  if (!isServer && document.addEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event && handler) {
      (element as any).attachEvent(`on${event}`, handler);
    }
  };
})();

export const off = ((): any => {
  if (!isServer && document.removeEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event) {
      (element as any).detachEvent(`on${event}`, handler);
    }
  };
})();

export function once(element: Node, event: string, handler: EventListenerOrEventListenerObject) {
  const handlerFn = typeof handler === 'function' ? handler : handler.handleEvent;
  const callback = (evt: any) => {
    handlerFn(evt);
    off(element, event, callback);
  };

  on(element, event, callback);
}

export function hasClass(el: Element, cls: string): any {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}

export function addClass(el: Element, cls: string): any {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: string): any {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const getAttach = (node: any): HTMLElement => {
  const attachNode = typeof node === 'function' ? node() : node;
  if (!attachNode) {
    return document.body;
  }
  if (isString(attachNode)) {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
};

/**
 * 获取滚动容器
 * 因为document不存在scroll等属性, 因此排除document
 * window | HTMLElement
 * @param {ScrollContainerElement} [container='body']
 * @returns {ScrollContainer}
 */
export const getScrollContainer = (container: ScrollContainer = 'body'): ScrollContainerElement => {
  if (isString(container)) {
    return document.querySelector(container) as HTMLElement;
  }
  if (typeof container === 'function') {
    return container();
  }
  return container;
};

/**
 * 返回是否window对象
 *
 * @export
 * @param {any} obj
 * @returns
 */
function isWindow(obj: any) {
  return obj && obj === obj.window;
}

type ScrollTarget = HTMLElement | Window | Document;

/**
 * 获取滚动距离
 *
 * @export
 * @param {ScrollTarget} target
 * @param {boolean} isLeft true为获取scrollLeft, false为获取scrollTop
 * @returns {number}
 */
export function getScroll(target: ScrollTarget, isLeft?: boolean): number {
  // node环境或者target为空
  if (isServer || !target) {
    return 0;
  }
  const method = isLeft ? 'scrollLeft' : 'scrollTop';
  let result = 0;
  if (isWindow(target)) {
    result = (target as Window)[isLeft ? 'pageXOffset' : 'pageYOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }
  return result;
}
interface ScrollTopOptions {
  container?: ScrollTarget;
  duration?: number;
  easing?: EasingFunction;
}

declare type ScrollToResult<T = any> = T | { default: T };

export function scrollTo(target: number, opt: ScrollTopOptions): Promise<ScrollToResult> {
  const { container = window, duration = 450, easing = easeInOutCubic } = opt;
  const scrollTop = getScroll(container);
  const startTime = Date.now();
  return new Promise((res) => {
    const fnc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const nextScrollTop = easing(Math.min(time, duration), scrollTop, target, duration);
      if (isWindow(container)) {
        (container as Window).scrollTo(window.pageXOffset, nextScrollTop);
      } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
        (container as Document).documentElement.scrollTop = nextScrollTop;
      } else {
        (container as HTMLElement).scrollTop = nextScrollTop;
      }
      if (time < duration) {
        raf(fnc);
      } else {
        // 由于上面步骤设置了scrollTop, 滚动事件可能未触发完毕
        // 此时应该在下一帧再执行res
        raf(res);
      }
    };
    raf(fnc);
  });
}

function containerDom(parent: VNode | Element | Iterable<any> | ArrayLike<any>, child: any): boolean {
  if (parent && child) {
    let pNode = child;
    while (pNode) {
      if (parent === pNode) {
        return true;
      }
      const { parentNode } = pNode;
      pNode = parentNode;
    }
  }
  return false;
}
export const clickOut = (els: VNode | Element | Iterable<any> | ArrayLike<any>, cb: () => void): void => {
  on(document, 'click', (event: { target: Element }) => {
    if (Array.isArray(els)) {
      const isFlag = Array.from(els).every((item) => containerDom(item, event.target) === false);
      return isFlag && cb && cb();
    }
    if (containerDom(els, event.target)) {
      return false;
    }
    return cb && cb();
  });
};

// 用于判断节点内容是否溢出
export const isNodeOverflow = (
  ele: ComponentPublicInstance | Element | ComponentPublicInstance[] | Element[],
): boolean => {
  const { clientWidth = 0, scrollWidth = 0 } = ele as Element & { clientWidth: number; scrollWidth: number };
  return scrollWidth > clientWidth;
};

// 将子元素selected滚动到父元素parentEle的可视范围内
export const scrollSelectedIntoView = (parentEle: HTMLElement, selected: HTMLElement) => {
  // 服务端不处理
  if (isServer) return;
  // selected不存在或selected父元素不为parentEle则不处理
  if (!selected || selected.offsetParent !== parentEle) {
    parentEle.scrollTop = 0;
    return;
  }
  const selectedTop = selected.offsetTop;
  const selectedBottom = selectedTop + selected.offsetHeight;
  const parentScrollTop = parentEle.scrollTop;
  const parentViewBottom = parentScrollTop + parentEle.clientHeight;
  if (selectedTop < parentScrollTop) {
    // selected元素滚动过了，则将其向下滚动到可视范围顶部
    parentEle.scrollTop = selectedTop;
  } else if (selectedBottom > parentViewBottom) {
    // selected元素未滚动到，则将其向上滚动到可视范围底部
    parentEle.scrollTop = selectedBottom - parentEle.clientHeight;
  }
};
