/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdInputNumberProps } from './type';
import { PropType } from 'vue';

export default {
  /** [小数位数](https://en.wiktionary.org/wiki/decimal_place) */
  decimalPlaces: {
    type: Number,
    default: undefined,
  },
  /** 禁用组件 */
  disabled: Boolean,
  /** 指定输入框展示值的格式 */
  format: {
    type: Function as PropType<TdInputNumberProps['format']>,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: Infinity,
  },
  /** 最小值 */
  min: {
    type: Number,
    default: -Infinity,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdInputNumberProps['size']>,
    default: 'medium' as TdInputNumberProps['size'],
    validator(val: TdInputNumberProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 数值改变步数，可以是小数 */
  step: {
    type: Number,
    default: 1,
  },
  /** 按钮布局 */
  theme: {
    type: String as PropType<TdInputNumberProps['theme']>,
    default: 'row' as TdInputNumberProps['theme'],
    validator(val: TdInputNumberProps['theme']): boolean {
      return ['column', 'row', 'normal'].includes(val);
    },
  },
  /** 值 */
  value: {
    type: Number,
    default: undefined,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: Number,
    default: undefined,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdInputNumberProps['onBlur']>,
  /** 值变化时触发 */
  onChange: Function as PropType<TdInputNumberProps['onChange']>,
  /** 回车键按下时触发 */
  onEnter: Function as PropType<TdInputNumberProps['onEnter']>,
  /** 获取焦点时触发 */
  onFocus: Function as PropType<TdInputNumberProps['onFocus']>,
  /** 键盘按下时触发 */
  onKeydown: Function as PropType<TdInputNumberProps['onKeydown']>,
  /** 按下字符键时触发（keydown -> keypress -> keyup） */
  onKeypress: Function as PropType<TdInputNumberProps['onKeypress']>,
  /** 释放键盘时触发 */
  onKeyup: Function as PropType<TdInputNumberProps['onKeyup']>,
};
