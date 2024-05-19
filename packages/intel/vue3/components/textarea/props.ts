/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdTextareaProps } from './type';

export default {
  /** 自动聚焦，拉起键盘 */
  autofocus: Boolean,
  /** 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度 */
  autosize: {
    type: [Boolean, Object] as PropType<TdTextareaProps['autosize']>,
    default: false as TdTextareaProps['autosize'],
  },
  /** 是否禁用文本框 */
  disabled: Boolean,
  /** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 */
  maxcharacter: {
    type: Number,
  },
  /** 用户最多可以输入的字符个数 */
  maxlength: {
    type: [Number, String] as PropType<TdTextareaProps['maxlength']>,
  },
  /** 名称，HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 文本框是否只读 */
  readonly: Boolean,
  /** 文本框状态 */
  status: {
    type: String as PropType<TdTextareaProps['status']>,
    validator(val: TdTextareaProps['status']): boolean {
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdTextareaProps['tips']>,
  },
  /** 文本框值 */
  value: {
    type: [String, Number] as PropType<TdTextareaProps['value']>,
  },
  /** v-model */
  modelValue: {
    type: [String, Number] as PropType<TdTextareaProps['value']>,
  },
  /** 文本框值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdTextareaProps['defaultValue']>,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdTextareaProps['onBlur']>,
  /** 输入内容变化时触发 */
  onChange: Function as PropType<TdTextareaProps['onChange']>,
  /** 获得焦点时触发 */
  onFocus: Function as PropType<TdTextareaProps['onFocus']>,
  /** 键盘按下时触发 */
  onKeydown: Function as PropType<TdTextareaProps['onKeydown']>,
  /** 按下字符键时触发（keydown -> keypress -> keyup） */
  onKeypress: Function as PropType<TdTextareaProps['onKeypress']>,
  /** 释放键盘时触发 */
  onKeyup: Function as PropType<TdTextareaProps['onKeyup']>,
};
