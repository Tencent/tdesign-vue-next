/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

export interface TdSwiperProps {
  /**
   * 轮播切换动画效果类型
   * @default slide
   */
  animation?: 'slide';
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean;
  /**
   * 当前轮播在哪一项（下标）
   */
  current?: number;
  /**
   * 当前轮播在哪一项（下标），非受控属性
   */
  defaultCurrent?: number;
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval?: number;
  /**
   * 轮播切换时触发
   */
  onChange?: (current: number, context: { source: SwiperChangeSource }) => void;
};

export type SwiperChangeSource = 'autoplay' | 'touch' | '';
