/**
 * 获取元素在页面中为位置信息
 * @param element：
 * @returns {top: number, left: number}
 */
export function elmPosition(element: HTMLElement) {
  const { body } = document;
  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const x = element.getBoundingClientRect();

  return {
    top: x.top + scrollTop - element.clientTop,
    left: x.left + scrollLeft - element.clientLeft,
  };
}

/**
 * 获取元素本身的宽高
 * @param element
 * @returns
 */
export function elmRect(element: HTMLElement) {
  const x = element.getBoundingClientRect();

  return {
    width: x.width,
    height: x.height,
  };
}
