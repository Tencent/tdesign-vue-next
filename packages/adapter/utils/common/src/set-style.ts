import type { CSSProperties } from '@td/adapter-vue';

/**
 * 用于为el节点增加styles ,migrate from tdesign-vue repo
 * @param el HTMLElement
 * @param style CSSProperties
 */
export function setStyle(el: HTMLElement, styles: CSSProperties): void {
  const keys = Object.keys(styles);
  keys.forEach((key: string) => {
    el.style[key] = styles[key];
  });
}
