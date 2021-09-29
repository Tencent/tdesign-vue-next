/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-29 14:49:44
 * */

import { TdOptionProps } from '../select/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用该选项 */
  disabled: Boolean,
  /** 选项描述（若不设置则默认与 value 相同） */
  label: {
    type: String,
    default: '',
  },
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdOptionProps['value']>,
  },
};
