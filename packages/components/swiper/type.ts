/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdSwiperProps {
  /**
   * 轮播切换动画效果类型：滑动、淡入淡出等
   * @default slide
   */
  animation?: 'slide' | 'fade';
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean;
  /**
   * 卡片模式下非当前展示轮播图的缩放比例
   * @default 210/332
   */
  cardScale?: number;
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number;
  /**
   * 当前轮播在哪一项（下标），非受控属性
   * @default 0
   */
  defaultCurrent?: number;
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  modelValue?: number;
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
   * 当使用垂直方向滚动时的高度
   */
  height?: number;
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval?: number;
  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;
  /**
   * 导航器全部配置
   * @default true
   */
  navigation?: TNode | Boolean;
  /**
   * 是否悬浮时停止轮播
   * @default true
   */
  stopOnHover?: boolean;
  /**
   * 深色模式和浅色模式
   * @default light
   */
  theme?: 'light' | 'dark';
  /**
   * 触发切换的方式：悬浮、点击等
   * @default hover
   */
  trigger?: 'hover' | 'click';
  /**
   * 样式类型：默认样式、卡片样式
   * @default default
   */
  type?: 'default' | 'card';
  /**
   * 轮播切换时触发
   */
  onChange?: (current: number, context: { source: SwiperChangeSource }) => void;
}

export interface SwiperNavigation {
  /**
   * 导航器位置，位于主体的内侧或是外侧
   * @default inside
   */
  placement?: 'inside' | 'outside';
  /**
   * 何时显示导航器的翻页按钮：始终显示、悬浮显示、永不显示
   * @default always
   */
  showSlideBtn?: 'always' | 'hover' | 'never';
  /**
   * 导航器尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 导航器类型，点状(dots)、点条状(dots-bar)、条状(bars)、分式(fraction)等
   * @default ''
   */
  type?: SwiperNavigationType;
}

export type SwiperChangeSource = 'autoplay' | 'click' | 'hover';

export type SwiperNavigationType = 'dots' | 'dots-bar' | 'bars' | 'fraction';
