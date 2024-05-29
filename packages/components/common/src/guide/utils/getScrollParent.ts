import { elementInViewport } from '@td/utils';

export function getScrollParent(element: HTMLElement) {
  let style = window.getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = /(auto|scroll)/;

  if (style.position === 'fixed') {
    return document.body;
  }

  for (let parent = element; parent.parentElement;) {
    parent = parent.parentElement;
    style = window.getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return document.body;
}

export function scrollToParentVisibleArea(element: HTMLElement) {
  const parent = getScrollParent(element);
  if (parent === document.body) {
    return;
  }
  // !todo 逻辑待验证
  if (elementInViewport(element, parent)) {
    return;
  }
  parent.scrollTop = element.offsetTop - parent.offsetTop;
}
