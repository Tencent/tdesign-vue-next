/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdAnchorItemProps } from '../anchor/type';
import { PropType } from 'vue';

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
      return ['_self', '_blank', '_parent', '_top'].includes(val);
    },
  },
  /** 锚点文本 */
  title: {
    type: [String, Function] as PropType<TdAnchorItemProps['title']>,
    default: '',
  },
};
