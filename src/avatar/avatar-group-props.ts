/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-10-11 10:12:07
 * */

import { TdAvatarGroupProps } from '../avatar/type';
import { PropType } from 'vue';

export default {
  /** 图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上 */
  cascading: {
    type: String as PropType<TdAvatarGroupProps['cascading']>,
    default: 'right-up' as TdAvatarGroupProps['cascading'],
    validator(val: TdAvatarGroupProps['cascading']): boolean {
      return ['left-up', 'right-up'].includes(val);
    },
  },
  /** 头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 `+N`。示例：`+5`，`...`, `更多` */
  collapseAvatar: {
    type: [String, Function] as PropType<TdAvatarGroupProps['collapseAvatar']>,
  },
  /** 能够同时显示的最多头像数量 */
  max: {
    type: Number,
  },
  /** 超出的头像呈现位置 */
  placement: {
    type: String as PropType<TdAvatarGroupProps['placement']>,
    validator(val: TdAvatarGroupProps['placement']): boolean {
      return ['left', 'top', 'bottom', 'right'].includes(val);
    },
  },
  /** 头像右上角提示信息 */
  popupProps: {
    type: Object as PropType<TdAvatarGroupProps['popupProps']>,
  },
  /** 尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size */
  size: {
    type: String,
    default: 'medium',
  },
};
