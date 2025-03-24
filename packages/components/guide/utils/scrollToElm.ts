import { getWindowSize, elementInViewport, scrollTo } from '../../utils/dom';

export function scrollToElm(elm: HTMLElement) {
  const rect = elm.getBoundingClientRect();

  if (!elementInViewport(elm)) {
    const winHeight = getWindowSize().height;
    // const top = rect.bottom - (rect.bottom - rect.top);
    scrollTo(rect.top - (winHeight / 2 - rect.height / 2), {});

    // todo 先暂时保留这里的逻辑
    // if (top < 0 || element.clientHeight > winHeight) {
    //   window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2));
    // } else {
    //   window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2));
    // }
  }
}
