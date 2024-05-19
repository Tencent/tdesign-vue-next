import raf from 'raf';
import { isFunction, isString } from 'lodash-es';
import type { ComponentPublicInstance } from '@td/adapter-vue';
import type { ScrollContainer, ScrollContainerElement } from '@td/shared/interface';
import { easeInOutCubic } from './easing';
import type { EasingFunction } from './easing';

export const isServer = typeof window === 'undefined';

type ScrollTarget = HTMLElement | Window | Document;

interface ScrollTopOptions {
  container?: ScrollTarget;
  duration?: number;
  easing?: EasingFunction;
}

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
  if (typeof window === 'undefined' || !target) {
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

export function scrollTo(target: number, opt: ScrollTopOptions) {
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
      } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
        (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
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

export function getAttach(node: any, triggerNode?: any): HTMLElement | Element | null {
  const attachNode = isFunction(node) ? node(triggerNode) : node;
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
}

export function getSSRAttach() {
  if (process.env.NODE_ENV === 'test-snap') {
    return 'body';
  }
}

// 用于判断节点内容是否溢出
export function isNodeOverflow(ele: ComponentPublicInstance | Element | ComponentPublicInstance[] | Element[]): boolean {
  const { clientWidth = 0, scrollWidth = 0 } = ele as Element & { clientWidth: number; scrollWidth: number };
  return scrollWidth > clientWidth;
}

export const on = ((): any => {
  if (!isServer && !!document.addEventListener) {
    return (
      element: Node,
      event: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): any => {
      if (element && event && handler) {
        element.addEventListener(event, handler, options);
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
  if (!isServer && !!document.removeEventListener) {
    return (
      element: Node,
      event: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): any => {
      if (element && event) {
        element.removeEventListener(event, handler, options);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event) {
      (element as any).detachEvent(`on${event}`, handler);
    }
  };
})();

export function once(
  element: Node,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  const handlerFn = isFunction(handler) ? handler : handler.handleEvent;
  const callback = (evt: any) => {
    handlerFn(evt);
    off(element, event, callback, options);
  };

  on(element, event, callback, options);
}

export function hasClass(el: Element, cls: string): any {
  if (!el || !cls) {
    return false;
  }
  if (cls.includes(' ')) {
    throw new Error('className should not contain space.');
  }
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.includes(` ${cls} `);
}

export function addClass(el: Element, cls: string): any {
  if (!el) {
    return;
  }
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

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

const trim = (str: string): string => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

export function removeClass(el: Element, cls: string): any {
  if (!el || !cls) {
    return;
  }
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

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

/**
 * 获取滚动容器
 * 因为document不存在scroll等属性, 因此排除document
 * window | HTMLElement
 * @param {ScrollContainerElement} [container]
 * @returns {ScrollContainer}
 */
export function getScrollContainer(container: ScrollContainer = 'body'): ScrollContainerElement {
  if (isString(container)) {
    return document.querySelector(container) as HTMLElement;
  }
  if (isFunction(container)) {
    return container();
  }
  return container;
}

export function removeDom(el: HTMLElement) {
  if (el.remove) {
    el.remove();
  } else {
    // ie
    el.parentNode?.removeChild(el);
  }
}

/**
 * 判断元素是否处在 position fixed 中
 * @param element 元素
 * @returns boolean
 */
export function isFixed(element: HTMLElement): boolean {
  const p = element.parentNode as HTMLElement;

  if (!p || p.nodeName === 'HTML') {
    return false;
  }

  if (getElmCssPropValue(element, 'position') === 'fixed') {
    return true;
  }

  return isFixed(p);
}

/**
 * 获取当前视图滑动的距离
 * @returns { scrollTop: number, scrollLeft: number }
 */
export function getWindowScroll(): { scrollTop: number; scrollLeft: number } {
  const { body } = document;
  const docElm = document.documentElement;
  const scrollTop = window.pageYOffset || docElm.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docElm.scrollLeft || body.scrollLeft;

  return { scrollTop, scrollLeft };
}

/**
 * 获取元素某个 css 对应的值
 * @param element 元素
 * @param propName css 名
 * @returns string
 */
export function getElmCssPropValue(element: HTMLElement, propName: string): string {
  let propValue = '';

  if (document.defaultView && document.defaultView.getComputedStyle) {
    propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
  }

  if (propValue && propValue.toLowerCase) {
    return propValue.toLowerCase();
  }

  return propValue;
}

/**
 * 检查元素是否在父元素视图
 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 * @param elm 元素
 * @param parent
 * @returns boolean
 */
export function elementInViewport(elm: HTMLElement, parent?: HTMLElement): boolean {
  const rect = elm.getBoundingClientRect();
  if (parent) {
    const parentRect = parent.getBoundingClientRect();
    return (
      rect.top >= parentRect.top
      && rect.left >= parentRect.left
      && rect.bottom <= parentRect.bottom
      && rect.right <= parentRect.right
    );
  }
  return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && rect.right <= window.innerWidth;
}

/**
 * 获取当前视图的大小
 * @returns { width: number, height: number }
 */
export function getWindowSize(): { width: number; height: number } {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  const doc = document.documentElement;
  return { width: doc.clientWidth, height: doc.clientHeight };
}
