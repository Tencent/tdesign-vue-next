export default function removeElm(elm: HTMLElement) {
  elm?.parentNode.removeChild(elm);
}
