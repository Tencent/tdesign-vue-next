/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdDividerProps {
  /**
   * 文本位置（仅在水平分割线有效）
   * @default center
   */
  align?: 'left' | 'right' | 'center';
  /**
   * 子元素
   */
  content?: string | TNode;
  /**
   * 是否虚线（仅在水平分割线有效）
   * @default false
   */
  dashed?: boolean;
  /**
   * 子元素，同 content
   */
  default?: string | TNode;
  /**
   * 分隔线类型有两种：水平和垂直
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 请更为使用 `layout`。分隔线类型有两种：水平和垂直
   * @default horizontal
   * @deprecated
   */
  theme?: 'horizontal' | 'vertical';
}
