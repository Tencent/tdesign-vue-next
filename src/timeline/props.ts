/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimeLineProps } from './type';
import { PropType } from 'vue';

export default {
  /** 标签信息放在时间轴的位置，`mode='alternate'` 时生效。纵向时间轴信息位置：左侧、右侧或两侧，默认信息在时间轴右侧。横向时间轴信息位置：上方、下方、两侧 */
  labelAlign: {
    type: String as PropType<TdTimeLineProps['labelAlign']>,
    default: 'right' as TdTimeLineProps['labelAlign'],
    validator(val: TdTimeLineProps['labelAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'alternate', 'top', 'bottom'].includes(val);
    },
  },
  /** 时间轴方向：水平方向、垂直方向 */
  layout: {
    type: String as PropType<TdTimeLineProps['layout']>,
    default: 'vertical' as TdTimeLineProps['layout'],
    validator(val: TdTimeLineProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 标签与内容文本的位置关系，`alternate` 为展示在轴两侧，`same` 为展示在同一侧 */
  mode: {
    type: String as PropType<TdTimeLineProps['mode']>,
    default: 'alternate' as TdTimeLineProps['mode'],
    validator(val: TdTimeLineProps['mode']): boolean {
      if (!val) return true;
      return ['alternate', 'same'].includes(val);
    },
  },
  /** 时间轴是否表现为倒序 */
  reverse: Boolean,
  /** 步骤条风格 */
  theme: {
    type: String as PropType<TdTimeLineProps['theme']>,
    default: 'default' as TdTimeLineProps['theme'],
    validator(val: TdTimeLineProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'dot'].includes(val);
    },
  },
};
