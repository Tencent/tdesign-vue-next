export default function getTargetElm(targetElm: unknown): HTMLElement {
  if (typeof targetElm === 'string') {
    const targetElement = document.querySelector(targetElm);
    if (targetElement) {
      return targetElement as HTMLElement;
    }
    throw new Error('There is no element with given selector.');
  } else {
    return document.body;
  }
}
