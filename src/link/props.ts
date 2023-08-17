/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdLinkProps } from './type';
import { PropType } from 'vue';

export default {
  /** 链接内容 */
  content: {
    type: [String, Function] as PropType<TdLinkProps['content']>,
  },
  /** 链接内容，同 content */
  default: {
    type: [String, Function] as PropType<TdLinkProps['default']>,
  },
  /** 禁用链接。优先级：Link.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 使得浏览器将链接的 URL 视为可下载资源 */
  download: {
    type: [String, Boolean] as PropType<TdLinkProps['download']>,
  },
  /** 链接悬浮态样式，有 文本颜色变化、添加下划线等 2 种方法 */
  hover: {
    type: String as PropType<TdLinkProps['hover']>,
    default: 'underline' as TdLinkProps['hover'],
    validator(val: TdLinkProps['hover']): boolean {
      if (!val) return true;
      return ['color', 'underline'].includes(val);
    },
  },
  /** 跳转链接 */
  href: {
    type: String,
    default: '',
  },
  /** 前置图标 */
  prefixIcon: {
    type: Function as PropType<TdLinkProps['prefixIcon']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdLinkProps['size']>,
    default: 'medium' as TdLinkProps['size'],
    validator(val: TdLinkProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 后置图标 */
  suffixIcon: {
    type: Function as PropType<TdLinkProps['suffixIcon']>,
  },
  /** 跳转方式，如：当前页面打开、新页面打开等，同 HTML 属性 target 含义相同 */
  target: {
    type: String,
    default: '',
  },
  /** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
  theme: {
    type: String as PropType<TdLinkProps['theme']>,
    default: 'default' as TdLinkProps['theme'],
    validator(val: TdLinkProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger', 'warning', 'success'].includes(val);
    },
  },
  /** 普通状态是否显示链接下划线 */
  underline: Boolean,
  /** 点击事件，禁用状态不会触发点击事件 */
  onClick: Function as PropType<TdLinkProps['onClick']>,
};
