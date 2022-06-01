/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdWatermarkProps {
  /**
   * 水印整体透明度，取值范围 [0-1]
   * @default 1
   */
  alpha?: number;
  /**
   * 水印所覆盖的内容节点
   */
  content?: string | TNode;
  /**
   * 水印所覆盖的内容节点，同 `content`
   */
  default?: string | TNode;
  /**
   * 水印高度
   */
  height?: number;
  /**
   * 水印是否重复出现
   * @default true
   */
  isRepeat?: boolean;
  /**
   * 行间距，只作用在多行（`content` 配置为数组）情况下
   * @default 16
   */
  lineSpace?: number;
  /**
   * 水印是否可移动
   * @default false
   */
  movable?: boolean;
  /**
   * 水印发生运动位移的间隙，单位：毫秒
   * @default 3000
   */
  moveInterval?: number;
  /**
   * 水印在画布上绘制的水平和垂直偏移量，正常情况下水印绘制在中间位置，即 `offset = [gapX / 2, gapY / 2]`
   */
  offset?: Array<number>;
  /**
   * 水印是否可被删除，默认会开启水印节点防删
   * @default true
   */
  removable?: boolean;
  /**
   * 水印旋转的角度，单位 °
   * @default -22
   */
  rotate?: number;
  /**
   * 水印内容，需要显示多行情况下可配置为数组
   */
  watermarkContent?: WatermarkText | WatermarkImage | Array<WatermarkText | WatermarkImage>;
  /**
   * 水印宽度
   */
  width?: number;
  /**
   * 水印之间的水平间距
   */
  x?: number;
  /**
   * 水印之间的垂直间距
   */
  y?: number;
  /**
   * 水印元素的 `z-index`，默认值写在 CSS 中
   */
  zIndex?: number;
}

export interface WatermarkText {
  /**
   * 水印文本文字颜色
   * @default rgba(0,0,0,0.1)
   */
  fontColor?: string;
  /**
   * 水印文本文字大小
   * @default 16
   */
  fontSize?: number;
  /**
   * 水印文本文字粗细
   * @default normal
   */
  fontWeight?: 'normal' | 'lighter' | 'bold' | 'bolder';
  /**
   * 水印文本内容
   * @default ''
   */
  text?: string;
}

export interface WatermarkImage {
  /**
   * 水印图片是否需要灰阶显示
   * @default false
   */
  isGrayscale?: boolean;
  /**
   * 水印图片源地址，为了显示清楚，建议导出 2 倍或 3 倍图
   * @default ''
   */
  url?: string;
}
