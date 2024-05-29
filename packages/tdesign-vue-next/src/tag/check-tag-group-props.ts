/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdCheckTagGroupProps } from '../tag/type';

export default {
  /** 透传标签选中态属性 */
  checkedProps: {
    type: Object as PropType<TdCheckTagGroupProps['checkedProps']>,
  },
  /** 是否支持选中多个标签 */
  multiple: Boolean,
  /** 标签选项列表 */
  options: {
    type: Array as PropType<TdCheckTagGroupProps['options']>,
  },
  /** 透传标签未选态属性 */
  uncheckedProps: {
    type: Object as PropType<TdCheckTagGroupProps['uncheckedProps']>,
  },
  /** 选中标签值 */
  value: {
    type: Array as PropType<TdCheckTagGroupProps['value']>,
    default: undefined as TdCheckTagGroupProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdCheckTagGroupProps['value']>,
    default: undefined as TdCheckTagGroupProps['value'],
  },
  /** 选中标签值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdCheckTagGroupProps['defaultValue']>,
    default: (): TdCheckTagGroupProps['defaultValue'] => [],
  },
  /** null */
  onChange: Function as PropType<TdCheckTagGroupProps['onChange']>,
};
