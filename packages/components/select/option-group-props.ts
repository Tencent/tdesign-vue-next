/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdOptionGroupProps } from '../select/type';
import { PropType } from 'vue';

export default {
  /** 是否显示分隔线 */
  divider: {
    type: Boolean,
    default: true,
  },
  /** 分组别名 */
  label: {
    type: [String, Function] as PropType<TdOptionGroupProps['label']>,
  },
};
