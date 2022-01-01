/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-01 22:10:04
 * */

import { TdTagInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 透传 Input 组件全部属性 */
  inputProps: {
    type: Object as PropType<TdTagInputProps['inputProps']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 是否只读，值为真会隐藏标签移除按钮和输入框 */
  readonly: Boolean,
  /** 值 */
  value: {
    type: Array as PropType<TdTagInputProps['value']>,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTagInputProps['defaultValue']>,
  },
  /** 值变化时触发，参数 `trigger` 表示数据变化的触发来源 */
  onChange: Function as PropType<TdTagInputProps['onChange']>,
  /** 按键按下 Enter 时触发 */
  onEnter: Function as PropType<TdTagInputProps['onEnter']>,
};
