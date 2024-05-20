/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdAnchorItemProps } from '../anchor/type';

export default {
  /** 锚点链接, 如果是 hash 模式需要加上当前 path */
  href: {
    type: String,
    default: '',
    required: true,
  },
  /** 锚点文本 */
  target: {
    type: String as PropType<TdAnchorItemProps['target']>,
    default: '_self' as TdAnchorItemProps['target'],
    validator(val: TdAnchorItemProps['target']): boolean {
      if (!val) {
        return true;
      }
      return ['_self', '_blank', '_parent', '_top'].includes(val);
    },
  },
  /** 锚点文本 */
  title: {
    type: [String, Function] as PropType<TdAnchorItemProps['title']>,
    default: '',
  },
};
