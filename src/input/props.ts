/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否开启自动填充功能 */
  autocomplete: Boolean,
  /** 自动聚焦 */
  autofocus: Boolean,
  /** 是否可清空 */
  clearable: Boolean,
  /** 是否禁用输入框 */
  disabled: Boolean,
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 */
  maxcharacter: {
    type: Number,
  },
  /** 用户最多可以输入的文本长度。值小于等于 0 的时候，则不限制输入长度 */
  maxlength: {
    type: Number,
  },
  /** 名称 */
  name: {
    type: String,
    default: '',
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdInputProps['prefixIcon']>,
  },
  /** 输入框是否只读 */
  readonly: Boolean,
  /** 输入框尺寸 */
  size: {
    type: String as PropType<TdInputProps['size']>,
    default: 'medium' as TdInputProps['size'],
    validator(val: TdInputProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdInputProps['status']>,
    default: undefined as TdInputProps['status'],
    validator(val: TdInputProps['status']): boolean {
      return ['success', 'warning', 'error'].includes(val);
    },
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: [String, Function] as PropType<TdInputProps['suffixIcon']>,
  },
  /** 输入框类型 */
  type: {
    type: String as PropType<TdInputProps['type']>,
    default: 'text' as TdInputProps['type'],
    validator(val: TdInputProps['type']): boolean {
      return ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'].includes(val);
    },
  },
  /** 输入框的值 */
  value: {
    type: [String, Number] as PropType<TdInputProps['value']>,
  },
  /** 输入框的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdInputProps['defaultValue']>,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdInputProps['onBlur']>,
  /** 输入框值发生变化时触发 */
  onChange: Function as PropType<TdInputProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdInputProps['onClear']>,
  /** 回车键按下时触发 */
  onEnter: Function as PropType<TdInputProps['onEnter']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdInputProps['onFocus']>,
  /** 键盘按下时触发 */
  onKeydown: Function as PropType<TdInputProps['onKeydown']>,
  /** 按下字符键时触发（keydown -> keypress -> keyup） */
  onKeypress: Function as PropType<TdInputProps['onKeypress']>,
  /** 释放键盘时触发 */
  onKeyup: Function as PropType<TdInputProps['onKeyup']>,
};
