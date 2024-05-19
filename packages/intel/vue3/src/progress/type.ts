/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdProgressProps {
  /**
   * 进度条颜色。示例：'#ED7B2F' 或 'orange' 或 `['#f00', '#0ff', '#f0f']` 或 `{ '0%': '#f00', '100%': '#0ff' }` 或  `{ from: '#000', to: '#000' }` 等
   * @default ''
   */
  color?: string | Array<string> | Record<string, string>;
  /**
   * 进度百分比，可自定义
   * @default true
   */
  label?: string | boolean | TNode;
  /**
   * 进度条百分比
   * @default 0
   */
  percentage?: number;
  /**
   * 进度条尺寸，示例：small/medium/large/240。small 值为 72； medium 值为 112；large 值为 160
   * @default 'medium'
   */
  size?: string | number;
  /**
   * 进度条状态
   */
  status?: StatusEnum;
  /**
   * 进度条线宽。宽度数值不能超过 size 的一半，否则不能输出环形进度
   */
  strokeWidth?: string | number;
  /**
   * 进度条风格。值为 line，标签（label）显示在进度条右侧；值为 plump，标签（label）显示在进度条里面；值为 circle，标签（label）显示在进度条正中间
   * @default line
   */
  theme?: ThemeEnum;
  /**
   * 进度条未完成部分颜色
   * @default ''
   */
  trackColor?: string;
}

export type StatusEnum = 'success' | 'error' | 'warning' | 'active';

export type ThemeEnum = 'line' | 'plump' | 'circle';
