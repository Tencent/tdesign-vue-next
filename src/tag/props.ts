/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdTagProps } from './type';
import { PropType } from 'vue';

export default {
  /** 标签是否可关闭 */
  closable: Boolean,
  /** 组件子元素 */
  content: {
    type: [String, Number, Function] as PropType<TdTagProps['content']>,
  },
  /** 组件子元素（默认插槽），同 content */
  default: {
    type: [String, Number, Function] as PropType<TdTagProps['default']>,
  },
  /** 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 */
  disabled: Boolean,
  /** 标签中的图标，可自定义图标呈现 */
  icon: {
    type: Function as PropType<TdTagProps['icon']>,
    default: undefined,
  },
  /** 标签最大宽度，宽度超出后会出现省略号。示例：'50px' / 80 */
  maxWidth: {
    type: [String, Number] as PropType<TdTagProps['maxWidth']>,
  },
  /** 标签类型，有三种：方形、圆角方形、标记型 */
  shape: {
    type: String as PropType<TdTagProps['shape']>,
    default: 'square' as TdTagProps['shape'],
    validator(val: TdTagProps['shape']): boolean {
      return ['square', 'round', 'mark'].includes(val);
    },
  },
  /** 标签尺寸 */
  size: {
    type: String as PropType<TdTagProps['size']>,
    default: 'medium' as TdTagProps['size'],
    validator(val: TdTagProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件风格，用于描述组件不同的应用场景 */
  theme: {
    type: String as PropType<TdTagProps['theme']>,
    default: 'default' as TdTagProps['theme'],
    validator(val: TdTagProps['theme']): boolean {
      return ['default', 'primary', 'warning', 'danger', 'success'].includes(val);
    },
  },
  /** 影响标签风格（theme） */
  variant: {
    type: String as PropType<TdTagProps['variant']>,
    default: 'dark' as TdTagProps['variant'],
    validator(val: TdTagProps['variant']): boolean {
      return ['dark', 'light', 'plain'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdTagProps['onClick']>,
  /** 如果关闭按钮存在，点击关闭按钮时触发 */
  onClose: Function as PropType<TdTagProps['onClose']>,
};
