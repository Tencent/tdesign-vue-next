export const ANCHOR_SHARP_REGEXP = /#(\S+)$/;

export type ANCHOR_CONTAINER = HTMLElement | Window

export function getOffsetTop(target: HTMLElement, container: ANCHOR_CONTAINER):number {
  const { top } = target.getBoundingClientRect();
  if (container === window) {
    // 减去document的边框
    return top - document.documentElement.clientTop;
  }
  return top - (container as HTMLElement).getBoundingClientRect().top;
}
