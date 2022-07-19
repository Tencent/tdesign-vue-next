/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdTimelineProps {
  /**
   * 节点排序 默认为正序
   * @default false
   */
  reverse?: boolean;
  /**
   * 时间轴和内容的相对位置
   * left为时间轴在内容左侧 right为时间轴在内容右侧 alternate为内容交替出现在时间轴两侧
   * @default left
   */
  mode?: 'left' | 'alternate' | 'right';
  /**
   * 时间轴排列方式
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 指定最后一个幽灵节点是否存在或内容
   * @default false
   */
  pending?: boolean | string | TNode;
}

export interface TdTimelineItemProps {
  /**
   * 指定圆圈颜色
   * @default #0052D9
   */
  color?: string;
  /**
   * 自定义时间轴点
   * @default ''
   */
  dot?: string | TNode;
  /**
   * 自定义描述
   * @default ''
   */
  description?: string | TNode;
  /**
   * 自定义时间戳
   * @default ''
   */
  timestamp?: string | TNode;
  /**
   * 是否隐藏时间戳
   * @default false
   */
  hideTimestamp?: boolean;
  /**
   * 是否空心点
   * @default true
   */
  hollow?: boolean;
  /**
   * 是否为虚线
   * @default false
   */
  dashed?: boolean;
  /**
   * 是否为禁用状态
   * @default false
   */
  disabled?: boolean;
}
