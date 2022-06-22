/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSpaceProps } from './type';
import { PropType } from 'vue';

export default {
  /** 对齐方式 */
  align: {
    type: String as PropType<TdSpaceProps['align']>,
    validator(val: TdSpaceProps['align']): boolean {
      if (!val) return true;
      return ['start', 'end', 'center', 'baseline'].includes(val);
    },
  },
  /** 是否自动换行，仅在 horizontal 时有效	 */
  breakLine: Boolean,
  /** 间距方向 */
  direction: {
    type: String as PropType<TdSpaceProps['direction']>,
    default: 'horizontal' as TdSpaceProps['direction'],
    validator(val: TdSpaceProps['direction']): boolean {
      if (!val) return true;
      return ['vertical', 'horizontal'].includes(val);
    },
  },
  /** 分隔符 */
  separator: {
    type: [String, Function] as PropType<TdSpaceProps['separator']>,
  },
  /** 间距大小 */
  size: {
    type: [String, Number] as PropType<TdSpaceProps['size']>,
    default: 'medium' as TdSpaceProps['size'],
  },
};
