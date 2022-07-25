/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimelineItemProps } from './type';
import { PropType } from 'vue';

export default {
  /** 指定圆圈颜色 */
  color: {
    type: String as PropType<string>,
    default: '#0052D9',
  },
  /** 自定义时间轴点 */
  dot: {
    type: [String, Function] as PropType<TdTimelineItemProps['dot']>,
    default: '',
  },
  description: {
    type: [String, Function] as PropType<TdTimelineItemProps['description']>,
    default: '',
  },
  /** 时间戳 */
  timestamp: {
    type: String as PropType<string>,
    default: '',
  },
  /** 是否隐藏时间戳 */
  hideTimestamp: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否空心点 */
  hollow: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否为虚线 */
  dashed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否为禁用状态 */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};
