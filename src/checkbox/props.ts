/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCheckboxProps } from './type';
import { PropType } from 'vue';

export default {
  /** 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用 */
  checkAll: Boolean,
  /** 是否选中 */
  checked: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 多选框内容，同 label */
  default: {
    type: [String, Function] as PropType<TdCheckboxProps['default']>,
  },
  /** 是否禁用组件。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。优先级：Checkbox.disabled > CheckboxGroup.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否组件只读。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。优先级：Checkbox.readonly > CheckboxGroup.readonly > Form.readonly */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 是否为半选 */
  indeterminate: Boolean,
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdCheckboxProps['label']>,
  },
  /** 是否启用懒加载。数据量大时建议开启；加载复杂内容或大量图片时建议开启 */
  lazyLoad: Boolean,
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 多选框的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdCheckboxProps['value']>,
  },
  /** 值变化时触发 */
  onChange: Function as PropType<TdCheckboxProps['onChange']>,
};
