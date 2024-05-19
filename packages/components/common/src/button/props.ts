/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdButtonProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否为块级元素 */
  block: Boolean,
  /** 按钮内容 */
  content: {
    type: [String, Function] as PropType<TdButtonProps['content']>,
  },
  /** 按钮内容 */
  default: {
    type: [String, Function] as PropType<TdButtonProps['default']>,
  },
  /** 禁用状态。优先级：Button.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否为幽灵按钮（镂空按钮） */
  ghost: Boolean,
  /** 跳转地址。href 存在时，按钮标签默认使用 `<a>` 渲染；如果指定了 `tag` 则使用指定的标签渲染 */
  href: {
    type: String,
    default: '',
  },
  /** 按钮内部图标，可完全自定义 */
  icon: {
    type: Function as PropType<TdButtonProps['icon']>,
  },
  /** 是否显示为加载状态 */
  loading: Boolean,
  /** 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形 */
  shape: {
    type: String as PropType<TdButtonProps['shape']>,
    default: 'rectangle' as TdButtonProps['shape'],
    validator(val: TdButtonProps['shape']): boolean {
      if (!val) return true;
      return ['rectangle', 'square', 'round', 'circle'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdButtonProps['size']>,
    default: 'medium' as TdButtonProps['size'],
    validator(val: TdButtonProps['size']): boolean {
      if (!val) return true;
      return ['extra-small', 'small', 'medium', 'large'].includes(val);
    },
  },
  /** 右侧内容，可用于定义右侧图标 */
  suffix: {
    type: Function as PropType<TdButtonProps['suffix']>,
  },
  /** 渲染按钮的 HTML 标签，默认使用标签 `<button>` 渲染，可以自定义为 `<a>` `<div>` 等。透传全部 HTML 属性，如：`href/target/data-*` 等。⚠️ 禁用按钮 `<button disabled>`无法显示 Popup 浮层信息，可通过修改 `tag=div` 解决这个问题 */
  tag: {
    type: String as PropType<TdButtonProps['tag']>,
    validator(val: TdButtonProps['tag']): boolean {
      if (!val) return true;
      return ['button', 'a', 'div'].includes(val);
    },
  },
  /** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
  theme: {
    type: String as PropType<TdButtonProps['theme']>,
    validator(val: TdButtonProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger', 'warning', 'success'].includes(val);
    },
  },
  /** 按钮类型 */
  type: {
    type: String as PropType<TdButtonProps['type']>,
    default: 'button' as TdButtonProps['type'],
    validator(val: TdButtonProps['type']): boolean {
      if (!val) return true;
      return ['submit', 'reset', 'button'].includes(val);
    },
  },
  /** 按钮形式，基础、线框、虚线、文字 */
  variant: {
    type: String as PropType<TdButtonProps['variant']>,
    default: 'base' as TdButtonProps['variant'],
    validator(val: TdButtonProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'dashed', 'text'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdButtonProps['onClick']>,
};
