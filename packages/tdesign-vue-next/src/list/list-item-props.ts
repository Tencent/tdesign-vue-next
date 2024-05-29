/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdListItemProps } from '../list/type';

export default {
  /** 操作栏 */
  action: {
    type: [String, Function] as PropType<TdListItemProps['action']>,
  },
  /** 内容 */
  content: {
    type: [String, Function] as PropType<TdListItemProps['content']>,
  },
  /** 内容，同 content */
  default: {
    type: [String, Function] as PropType<TdListItemProps['default']>,
  },
};
