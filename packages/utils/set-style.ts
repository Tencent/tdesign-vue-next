import { CSSProperties } from 'vue';

/**
 * 用于为el节点增加styles ,migrate from tdesign-vue repo
 * @param el HTMLElement
 * @param style CSSProperties
 */
function setStyle(el: HTMLElement, styles: CSSProperties): void {
  const keys = Object.keys(styles);
  keys.forEach((key) => {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    el.style[key] = styles[key];
  });
  // TODO: 建议改成如下
  // Object.entries(styles).forEach(([key, value]) => {
  //   el.style.setProperty(key, String(value));
  // });
}

export default setStyle;
