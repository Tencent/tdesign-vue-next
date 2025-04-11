/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdBadgeProps } from './type';
import { PropType } from 'vue';

export default {
  /** 颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 徽标内容 */
  content: {
    type: [String, Function] as PropType<TdBadgeProps['content']>,
  },
  /** 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+ */
  count: {
    type: [String, Number, Function] as PropType<TdBadgeProps['count']>,
    default: 0,
  },
  /** 徽标内容，默认插槽，同 content */
  default: {
    type: [String, Function] as PropType<TdBadgeProps['default']>,
  },
  /** 是否为红点 */
  dot: Boolean,
  /** 封顶的数字值 */
  maxCount: {
    type: Number,
    default: 99,
  },
  /** 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem'] */
  offset: {
    type: Array as PropType<TdBadgeProps['offset']>,
  },
  /** 形状 */
  shape: {
    type: String as PropType<TdBadgeProps['shape']>,
    default: 'circle' as TdBadgeProps['shape'],
    validator(val: TdBadgeProps['shape']): boolean {
      return ['circle', 'round'].includes(val);
    },
  },
  /** 当数值为 0 时，是否展示徽标 */
  showZero: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdBadgeProps['size']>,
    default: 'medium' as TdBadgeProps['size'],
    validator(val: TdBadgeProps['size']): boolean {
      return ['small', 'medium'].includes(val);
    },
  },
};
