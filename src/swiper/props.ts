/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdSwiperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 轮播切换动画效果类型：滑动、淡入淡出等 */
  animation: {
    type: String as PropType<TdSwiperProps['animation']>,
    default: 'slide' as TdSwiperProps['animation'],
    validator(val: TdSwiperProps['animation']): boolean {
      if (!val) return true;
      return ['slide', 'fade'].includes(val);
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
    default: 0,
  },
  /** 当前轮播在哪一项（下标），非受控属性 */
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  /** 轮播滑动方向，包括横向滑动和纵向滑动两个方向 */
  direction: {
    type: String as PropType<TdSwiperProps['direction']>,
    default: 'horizontal' as TdSwiperProps['direction'],
    validator(val: TdSwiperProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 滑动动画时长 */
  duration: {
    type: Number,
    default: 300,
  },
  /** 当使用垂直方向滚动时的高度 */
  height: {
    type: Number,
  },
  /** 轮播间隔时间 */
  interval: {
    type: Number,
    default: 5000,
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: true,
  },
  /** 导航器全部配置 */
  navigation: {
    type: [Object, Function] as PropType<TdSwiperProps['navigation']>,
  },
  /** 是否悬浮时停止轮播 */
  stopOnHover: {
    type: Boolean,
    default: true,
  },
  /** 深色模式和浅色模式 */
  theme: {
    type: String as PropType<TdSwiperProps['theme']>,
    default: 'light' as TdSwiperProps['theme'],
    validator(val: TdSwiperProps['theme']): boolean {
      if (!val) return true;
      return ['light', 'dark'].includes(val);
    },
  },
  /** 触发切换的方式：悬浮、点击等 */
  trigger: {
    type: String as PropType<TdSwiperProps['trigger']>,
    default: 'hover' as TdSwiperProps['trigger'],
    validator(val: TdSwiperProps['trigger']): boolean {
      if (!val) return true;
      return ['hover', 'click'].includes(val);
    },
  },
  /** 样式类型：默认样式、卡片样式 */
  type: {
    type: String as PropType<TdSwiperProps['type']>,
    default: 'default' as TdSwiperProps['type'],
    validator(val: TdSwiperProps['type']): boolean {
      if (!val) return true;
      return ['default', 'card'].includes(val);
    },
  },
  /** 轮播切换时触发 */
  onChange: Function as PropType<TdSwiperProps['onChange']>,
};
