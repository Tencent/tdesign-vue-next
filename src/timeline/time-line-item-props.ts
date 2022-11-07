/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimeLineItemProps } from './type';
import { PropType } from 'vue';

export default {
  /** 描述内容 */
  content: {
    type: [String, Function] as PropType<TdTimeLineItemProps['content']>,
  },
  /** 用于自定义时间轴节点元素 */
  dot: {
    type: Function as PropType<TdTimeLineItemProps['dot']>,
  },
  /** 时间轴颜色，内置 `primary/warning/error/default` 四种色值，可传入 16 进制颜色码或 RGB 颜色值. */
  dotColor: {
    type: String as PropType<TdTimeLineItemProps['dotColor']>,
    default: 'default' as TdTimeLineItemProps['dotColor'],
    validator(val: TdTimeLineItemProps['dotColor']): boolean {
      if (!val) return true;
      return ['primary', 'warning', 'error', 'default'].includes(val);
    },
  },
  /** 标签文本内容，可完全自定义 */
  label: {
    type: [String, Function] as PropType<TdTimeLineItemProps['label']>,
  },
  /** 标签信息相对于时间轴的位置，在 `mode='alternate'` 时生效，优先级高于 `TimeLine.labelAlign` */
  labelAlign: {
    type: String as PropType<TdTimeLineItemProps['labelAlign']>,
    validator(val: TdTimeLineItemProps['labelAlign']): boolean {
      if (!val) return true;
      return ['left', 'right', 'top', 'bottom'].includes(val);
    },
  },
  /** 是否处在加载状态 */
  loading: Boolean,
};
