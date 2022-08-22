import getWindowSize from './getWindowSize';
import elementInViewport from './elementInViewport';

/**
 * To change the scroll of `window` after highlighting an element
 *
 * @api private
 * @param {Object} element
 */
export default function scrollTo(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  if (!elementInViewport(element)) {
    const winHeight = getWindowSize().height;
    const top = rect.bottom - (rect.bottom - rect.top);

    if (top < 0 || element.clientHeight > winHeight) {
      window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2)); // 30px padding from edge to look nice

      // Scroll down
    } else {
      window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2)); // 30px padding from edge to look nice
    }
  }
}
