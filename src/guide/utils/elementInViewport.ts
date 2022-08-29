/**
 * 检查元素是否在视图
 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 */
export default function elementInViewport(elm: HTMLElement) {
  const rect = elm.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && rect.right <= window.innerWidth;
}
