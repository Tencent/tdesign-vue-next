import Clipboard from 'clipboard';

export const ANCHOR_SHARP_REGEXP = /#(\S+)$/;

export type ANCHOR_CONTAINER = HTMLElement | Window;

export function getOffsetTop(target: HTMLElement, container: ANCHOR_CONTAINER): number {
  const { top } = target.getBoundingClientRect();
  if (container === window) {
    // 减去document的边框
    return top - document.documentElement.clientTop;
  }
  return top - (container as HTMLElement).getBoundingClientRect().top;
}

export function copyText(text: string) {
  const div = document.createElement('div');
  const clip = new Clipboard(div, {
    text() {
      return text;
    },
  });
  div.click();
  clip.destroy();
  div.remove();
}

export default copyText;
