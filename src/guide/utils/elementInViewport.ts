/**
 * 检查元素是否在视图
 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 */
export default function elementInViewport(elm: HTMLElement, parent?: HTMLElement) {
  const rect = elm.getBoundingClientRect();
  if (parent) {
    const parentRect = parent.getBoundingClientRect();
    return (
      rect.top >= parentRect.top &&
      rect.left >= parentRect.left &&
      rect.bottom <= parentRect.bottom &&
      rect.right <= parentRect.right
    );
  }
  return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && rect.right <= window.innerWidth;
}
