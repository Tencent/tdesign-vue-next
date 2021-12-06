/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdRadioGroupProps } from '../radio/type';
import { PropType } from 'vue';

export default {
  /** 已废弃。单选组件按钮形式（请使用 variant 代替） */
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
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['value']>,
    default: undefined,
  },
  /** 选中的值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['defaultValue']>,
    default: undefined,
  },
  /** 单选组件按钮形式 */
  variant: {
    type: String as PropType<TdRadioGroupProps['variant']>,
    default: 'outline' as TdRadioGroupProps['variant'],
    validator(val: TdRadioGroupProps['variant']): boolean {
      return ['outline', 'primary-filled', 'default-filled'].includes(val);
    },
  },
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdRadioGroupProps['onChange']>,
};
