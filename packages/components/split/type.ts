/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { TNode, Styles } from '../common';

export interface TdSplitProps {
  /**
   * 分割方向。horizontal：左右排列；vertical：上下排列
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 拖拽图标
   */
  draggerIcon?: string | TNode;
  /**
   * 面板之间的间距（px），会体现在分割条视觉上
   * @default 0
   */
  gap?: number;
  /**
   * 延迟渲染模式
   * @default false
   */
  lazy?: boolean;
  /**
   * 定义每个面板的最大最小比例
   */
  panelSize?: { min?: number; max?: number };
  /**
   * 自定义分割条的样式类名
   * @default ''
   */
  splitClassName?: string;
  /**
   * 分割条的可交互区域宽度/高度（px）
   * @default 6
   */
  splitSize?: number;
  /**
   * 自定义分割条的内联样式
   */
  splitStyle?: Styles;
  /**
   * 拖拽过程中尺寸变化的回调（像素值数组）
   */
  onResize?: (sizes: number[]) => void;
  /**
   * 拖拽结束时的回调
   */
  onResizeEnd?: (sizes: number[]) => void;
  /**
   * 开始拖拽时的回调
   */
  onResizeStart?: (sizes: number[]) => void;
}

/** 组件实例方法 */
export interface SplitInstanceFunctions {
  /**
   * 获取当前各面板的像素尺寸
   */
  getSizes?: () => number[];
  /**
   * 重置为初始尺寸
   */
  reset?: () => void;
  /**
   * 程序化设置尺寸
   */
  setSizes?: (sizes: (number | string | 'auto')[]) => void;
}

export interface TdSplitPanelProps {
  /**
   * 初始面板大小，支持数字 px 或者文字 '百分比%' 类型
   */
  defaultSize?: string | number;
  /**
   * 当前面板的最大尺寸,支持数字 px 或者文字 '百分比%' 类型-继承父级 panelSize.max
   */
  max?: string | number;
  /**
   * 当前面板的最小尺寸,支持数字 px 或者文字 '百分比%' 类型-继承父级 panelSize.min
   */
  min?: string | number;
  /**
   * 是否开启拖拽伸缩
   * @default true
   */
  resizable?: boolean;
}
