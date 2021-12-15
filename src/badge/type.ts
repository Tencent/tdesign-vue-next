/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdBadgeProps {
  /**
   * 颜色
   * @default ''
   */
  color?: string;
  /**
   * 徽标内容
   */
  content?: string | TNode;
  /**
   * 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+
   * @default 0
   */
  count?: string | number | TNode;
  /**
   * 徽标内容，默认插槽，同 content
   */
  default?: string | TNode;
  /**
   * 是否为红点
   * @default false
   */
  dot?: boolean;
  /**
   * 封顶的数字值
   * @default 99
   */
  maxCount?: number;
  /**
   * 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']
   */
  offset?: Array<string | number>;
  /**
   * 形状
   * @default circle
   */
  shape?: 'circle' | 'round';
  /**
   * 当数值为 0 时，是否展示徽标
   * @default false
   */
  showZero?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium';
}
