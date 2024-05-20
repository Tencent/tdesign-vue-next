/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdDescriptionItemProps } from '../descriptions/type';

export default {
  /** 内容垂直对齐方式，DescriptionItem.align 优先级高于 Descriptions.align */
  align: {
    type: String as PropType<TdDescriptionItemProps['align']>,
    validator(val: TdDescriptionItemProps['align']): boolean {
      if (!val) {
        return true;
      }
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 描述项内容 */
  content: {
    type: [String, Function] as PropType<TdDescriptionItemProps['content']>,
  },
  /** 描述项内容，同 `content` */
  default: {
    type: [String, Function] as PropType<TdDescriptionItemProps['default']>,
  },
  /** 描述项标签 */
  label: {
    type: [String, Function] as PropType<TdDescriptionItemProps['label']>,
  },
  /** 占用的宽度数量 */
  span: {
    type: Number,
    default: 1,
  },
};
