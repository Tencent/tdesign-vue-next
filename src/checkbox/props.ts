/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdCheckboxProps } from './type';
import { PropType } from 'vue';

export default {
  /** 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用 */
  checkAll: Boolean,
  /** 是否选中 */
  checked: Boolean,
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 复选框内容，同 label */
  default: {
    type: [String, Function] as PropType<TdCheckboxProps['default']>,
  },
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否为半选 */
  indeterminate: Boolean,
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdCheckboxProps['label']>,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 组件是否只读 */
  readonly: Boolean,
  /** 复选框的值 */
  value: {
    type: [String, Number] as PropType<TdCheckboxProps['value']>,
  },
  /** 值变化时触发 */
  onChange: Function as PropType<TdCheckboxProps['onChange']>,
};
