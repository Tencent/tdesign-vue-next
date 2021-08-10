/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdRadioGroupProps } from '../radio/type';
import { PropType } from 'vue';

export default {
  /** 单选组件按钮形式 */
  buttonStyle: {
    type: String as PropType<TdRadioGroupProps['buttonStyle']>,
    default: 'outline' as TdRadioGroupProps['buttonStyle'],
    validator(val: TdRadioGroupProps['buttonStyle']): boolean {
      return ['outline', 'solid'].includes(val);
    },
  },
  /** 是否禁用全部子单选框 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同 */
  options: {
    type: Array as PropType<TdRadioGroupProps['options']>,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdRadioGroupProps['size']>,
    default: 'medium' as TdRadioGroupProps['size'],
    validator(val: TdRadioGroupProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 选中的值 */
  value: {
    type: [String, Number] as PropType<TdRadioGroupProps['value']>,
  },
  /** 选中的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdRadioGroupProps['defaultValue']>,
  },
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdRadioGroupProps['onChange']>,
};
