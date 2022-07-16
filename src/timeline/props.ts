/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimelineProps } from './type';
import { h, PropType } from 'vue';

export default {
  /** 节点排序 默认为正序 */
  reverse: {
    type: Boolean as PropType<Boolean>,
    default: false,
  },
  /** 时间轴和内容的相对位置 */
  mode: {
    type: String as PropType<TdTimelineProps['mode']>,
    default: 'left',
  },
  /** 时间轴排列方式 */
  direction: {
    type: String as PropType<TdTimelineProps['direction']>,
    default: 'vertical',
  },
  pending: {
    type: [String, Boolean, Function] as PropType<TdTimelineProps['pending']>,
    default: false,
  },
};
