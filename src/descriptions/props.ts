/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDescriptionsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否带边框 */
  bordered: Boolean,
  /** 字段名右侧是否携带冒号“：” */
  colon: Boolean,
  /** 一行 DescriptionItem 的数量 */
  column: {
    type: Number,
    default: 3,
  },
  /** 字段值内容的对齐方式：左对齐、居中对齐 */
  contentAlign: {
    type: String as PropType<TdDescriptionsProps['contentAlign']>,
    default: 'left' as TdDescriptionsProps['contentAlign'],
    validator(val: TdDescriptionsProps['contentAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'center'].includes(val);
    },
  },
  /** 字段标签对齐方式：左对齐、右对齐、顶部对齐 */
  labelAlign: {
    type: String as PropType<TdDescriptionsProps['labelAlign']>,
    default: 'right' as TdDescriptionsProps['labelAlign'],
    validator(val: TdDescriptionsProps['labelAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'center'].includes(val);
    },
  },
  /** 排列方向 */
  direction: {
    type: String as PropType<TdDescriptionsProps['direction']>,
    default: 'horizontal' as TdDescriptionsProps['direction'],
    validator(val: TdDescriptionsProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** item 排列方向 */
  itemDirection: {
    type: String as PropType<TdDescriptionsProps['itemDirection']>,
    default: 'horizontal' as TdDescriptionsProps['itemDirection'],
    validator(val: TdDescriptionsProps['itemDirection']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdDescriptionsProps['size']>,
    default: 'medium' as TdDescriptionsProps['size'],
    validator(val: TdDescriptionsProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件尺寸 */
  labelWidth: Number,
  contentWidth: Number,
};
