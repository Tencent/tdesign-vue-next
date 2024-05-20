/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdRadioGroupProps } from '../radio/type';

;

export default {
  /** 是否允许取消选中 */
  allowUncheck: Boolean,
  /** 是否禁用全部子单选框。默认为 false。RadioGroup.disabled 优先级低于 Radio.disabled */
  disabled: Boolean,
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同 */
  options: {
    type: Array as PropType<TdRadioGroupProps['options']>,
  },
  /** 组件尺寸【讨论中】 */
  size: {
    type: String as PropType<TdRadioGroupProps['size']>,
    default: 'medium' as TdRadioGroupProps['size'],
    validator(val: TdRadioGroupProps['size']): boolean {
      if (!val) {
        return true;
      }
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 选中的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['value']>,
    default: undefined as TdRadioGroupProps['value'],
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['value']>,
    default: undefined as TdRadioGroupProps['value'],
  },
  /** 选中的值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdRadioGroupProps['defaultValue']>,
  },
  /** 单选组件按钮形式 */
  variant: {
    type: String as PropType<TdRadioGroupProps['variant']>,
    default: 'outline' as TdRadioGroupProps['variant'],
    validator(val: TdRadioGroupProps['variant']): boolean {
      if (!val) {
        return true;
      }
      return ['outline', 'primary-filled', 'default-filled'].includes(val);
    },
  },
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdRadioGroupProps['onChange']>,
};
