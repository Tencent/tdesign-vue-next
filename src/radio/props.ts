/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdRadioProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否选中 */
  checked: Boolean,
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 是否禁用组件内容（content）触发选中 */
  contentDisabled: Boolean,
  /** 是否为禁用态 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** HTM 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 单选按钮的值 */
  value: {
    type: [String, Number] as PropType<TdRadioProps['value']>,
  },
  /** 选中状态变化时触发 */
  onChange: Function as PropType<TdRadioProps['onChange']>,
};
