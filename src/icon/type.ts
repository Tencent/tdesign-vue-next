/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

export interface TdIconfontProps {
  /**
   * 是否加载组件库内置图标
   * @default true
   */
  loadDefaultIcons?: boolean;
  /**
   * 图标名称
   * @default ''
   */
  name: string;
  /**
   * 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等
   */
  size?: string;
  /**
   * 图标 DOM 元素，可选值：i/span/div/...
   * @default i
   */
  tag?: string;
  /**
   * 图标地址，地址内容参考[组件内部默认加载图标](https://tdesign.gtimg.com/icon/web/index.css)。也可以在 index.html 中引入图标地址
   */
  url?: string | Array<string>;
  /**
   * 点击时触发
   */
  onClick?: (context: { e: MouseEvent }) => void;
};

export interface TdIconSVGProps {
  /**
   * 是否加载组件库内置图标
   * @default true
   */
  loadDefaultIcons?: boolean;
  /**
   * 图标名称
   * @default ''
   */
  name: string;
  /**
   * 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等
   */
  size?: string;
  /**
   * 图标地址，地址内容参考[组件内部默认加载图标](https://tdesign.gtimg.com/icon/web/index.js)
   */
  url?: string | Array<string>;
  /**
   * 点击时触发
   */
  onClick?: (context: { e: MouseEvent }) => void;
};
