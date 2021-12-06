/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdSwiperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 轮播切换动画效果类型 */
  animation: {
    type: String as PropType<TdSwiperProps['animation']>,
    default: 'slide' as TdSwiperProps['animation'],
    validator(val: TdSwiperProps['animation']): boolean {
      return ['slide'].includes(val);
    },
  },
  /** 是否自动播放 */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /** 当前轮播在哪一项（下标） */
  current: {
    type: Number,
  },
  /** 当前轮播在哪一项（下标），非受控属性 */
  defaultCurrent: {
    type: Number,
  },
  /** 轮播滑动方向，包括横向滑动和纵向滑动两个方向 */
  direction: {
    type: String as PropType<TdSwiperProps['direction']>,
    default: 'horizontal' as TdSwiperProps['direction'],
    validator(val: TdSwiperProps['direction']): boolean {
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 滑动动画时长 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 轮播间隔时间 */
  interval: {
    type: Number,
    default: 5000,
  },
  /** 轮播切换时触发 */
  onChange: Function as PropType<TdSwiperProps['onChange']>,
};
