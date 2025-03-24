/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDescriptionsItemProps } from '../descriptions/type';
import { PropType } from 'vue';

export default {
  /** 描述项内容 */
  content: {
    type: [String, Function] as PropType<TdDescriptionsItemProps['content']>,
  },
  /** 描述项内容，同 `content` */
  default: {
    type: [String, Function] as PropType<TdDescriptionsItemProps['default']>,
  },
  /** 描述项标签 */
  label: {
    type: [String, Function] as PropType<TdDescriptionsItemProps['label']>,
  },
  /** 占用的宽度数量 */
  span: {
    type: Number,
    default: 1,
  },
};
