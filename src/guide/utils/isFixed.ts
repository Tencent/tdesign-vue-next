import getElmCssPropValue from './getElmCssPropValue';

export default function isFixed(element: HTMLElement): Boolean {
  const p = element.parentNode as HTMLElement;

  if (!p || p.nodeName === 'HTML') {
    return false;
  }

  if (getElmCssPropValue(element, 'position') === 'fixed') {
    return true;
  }

  return isFixed(p);
}
