/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdRadioProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否选中 */
  checked: Boolean,
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 单选内容，同 label */
  default: {
    type: [String, Function] as PropType<TdRadioProps['default']>,
  },
  /** 是否为禁用态 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 主文案 */
  label: {
    type: [String, Function] as PropType<TdRadioProps['label']>,
  },
  /** HTM 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选按钮的值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdRadioProps['value']>,
    default: undefined,
  },
  /** 选中状态变化时触发 */
  onChange: Function as PropType<TdRadioProps['onChange']>,
};
