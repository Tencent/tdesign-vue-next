/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdRadioProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许取消选中 */
  allowUncheck: Boolean,
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
  /** 单选按钮内容，同 label */
  default: {
    type: [String, Function] as PropType<TdRadioProps['default']>,
  },
  /** 是否为禁用态。如果存在父组件 RadioGroup，默认值由 RadioGroup.disabled 控制。Radio.disabled 优先级高于 RadioGroup.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdRadioProps['label']>,
  },
  /** HTML 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 只读状态 */
  readonly: Boolean,
  /** 单选按钮的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioProps['value']>,
    default: undefined as TdRadioProps['value'],
  },
  /** 选中状态变化时触发 */
  onChange: Function as PropType<TdRadioProps['onChange']>,
  /** 点击时出发，一般用于外层阻止冒泡场景 */
  onClick: Function as PropType<TdRadioProps['onClick']>,
};
