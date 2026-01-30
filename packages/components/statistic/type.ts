/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdStatisticProps {
  /**
   * 动画效果控制，`duration` 指动画的过渡时间`单位：毫秒`，`valueFrom` 指动画的起始数值。`{ duration, valueFrom }`
   */
  animation?: animation;
  /**
   * 是否开始动画
   * @default false
   */
  animationStart?: boolean;
  /**
   * 颜色风格，预设五个 TDesign 颜色风格：黑色（black）、蓝色（blue）、红色（red）、橙色（orange）、绿色（green）支持深浅色模式切换。也可以自定义任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持颜色值，深浅色模式切换需自行适配
   * @default ''
   */
  color?: string;
  /**
   * 小数保留位数
   */
  decimalPlaces?: number;
  /**
   * 额外的显示内容
   */
  extra?: string | TNode;
  /**
   * 格式化数值显示值
   */
  format?: (value: number) => number;
  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 前缀内容，展示优先级高于 trend
   */
  prefix?: string | TNode;
  /**
   * 默认展示千位分隔符，可以自定义为其他内容，`separator = ''` 设置为空字符串/null/undefined 时展示默认分隔符
   * @default ,
   */
  separator?: string;
  /**
   * 后缀内容，展示优先级高于 trend
   */
  suffix?: string | TNode;
  /**
   * 数值显示的标题
   */
  title?: string | TNode;
  /**
   * 趋势
   */
  trend?: 'increase' | 'decrease';
  /**
   * 趋势展示位置
   * @default left
   */
  trendPlacement?: 'left' | 'right';
  /**
   * 单位内容
   */
  unit?: string | TNode;
  /**
   * 数值显示的值
   */
  value?: number;
}

/** 组件实例方法 */
export interface StatisticInstanceFunctions {
  /**
   * 开始动画
   */
  start: () => void;
}

export interface animation {
  duration: number;
  valueFrom: number;
}
