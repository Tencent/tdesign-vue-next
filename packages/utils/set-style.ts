import { CSSProperties } from 'vue';

/**
 * 用于为el节点增加styles ,migrate from tdesign-vue repo
 * @param el HTMLElement
 * @param style CSSProperties
 */
function setStyle(el: HTMLElement, styles: CSSProperties): void {
  const keys = Object.keys(styles);
  keys.forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    el.style[key] = styles[key];
  });
}

export default setStyle;
