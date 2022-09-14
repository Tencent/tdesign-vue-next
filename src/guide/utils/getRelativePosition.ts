import { getElmCssPropValue, isFixed, getWindowScroll } from '../../utils/dom';

/**
 * 获取元素相对于另一个元素的位置（或者说相对于 body）
 * 感谢 `meouw`: http://stackoverflow.com/a/442474/375966
 */
export default function getRelativePosition(elm: HTMLElement, relativeElm: HTMLElement = document.body) {
  const { scrollTop, scrollLeft } = getWindowScroll();
  const { top: elmTop, left: elmLeft } = elm.getBoundingClientRect();
  const { top: relElmTop, left: relElmLeft } = relativeElm.getBoundingClientRect();
  const relativeElmPosition = getElmCssPropValue(relativeElm, 'position');

  if (
    (relativeElm.tagName.toLowerCase() !== 'body' && relativeElmPosition === 'relative') ||
    relativeElmPosition === 'sticky'
  ) {
    return {
      top: elmTop - relElmTop,
      left: elmLeft - relElmLeft,
    };
  }

  if (isFixed(elm)) {
    return {
      top: elmTop,
      left: elmLeft,
    };
  }

  return {
    top: elmTop + scrollTop,
    left: elmLeft + scrollLeft,
  };
}
