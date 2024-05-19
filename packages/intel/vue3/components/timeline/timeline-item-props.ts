/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdTimelineItemProps } from '../timeline/type';

export default {
  /** 描述内容 */
  content: {
    type: [String, Function] as PropType<TdTimelineItemProps['content']>,
  },
  /** 用于自定义时间轴节点元素 */
  dot: {
    type: Function as PropType<TdTimelineItemProps['dot']>,
  },
  /** 时间轴颜色，内置 `primary/warning/error/default` 四种色值，可传入 16 进制颜色码或 RGB 颜色值. */
  dotColor: {
    type: String as PropType<TdTimelineItemProps['dotColor']>,
    default: 'primary',
  },
  /** 标签文本内容，可完全自定义 */
  label: {
    type: [String, Function] as PropType<TdTimelineItemProps['label']>,
  },
  /** 标签信息相对于时间轴的位置，在 `mode='alternate'` 时生效，优先级高于 `Timeline.labelAlign` */
  labelAlign: {
    type: String as PropType<TdTimelineItemProps['labelAlign']>,
    validator(val: TdTimelineItemProps['labelAlign']): boolean {
      if (!val) {
        return true;
      }
      return ['left', 'right', 'top', 'bottom'].includes(val);
    },
  },
  /** 是否处在加载状态 */
  loading: Boolean,
  /** 点击时触发 */
  onClick: Function as PropType<TdTimelineItemProps['onClick']>,
};
