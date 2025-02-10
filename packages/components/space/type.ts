/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum } from '../common';

export interface TdSpaceProps {
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /**
   * 是否自动换行，仅在 horizontal 时有效
   * @default false
   */
  breakLine?: boolean;
  /**
   * 间距方向
   * @default horizontal
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 分隔符
   */
  separator?: string | TNode;
  /**
   * 间距大小
   * @default 'medium'
   */
  size?: SpaceSize | SpaceSize[];
}

export type SpaceSize = number | string | SizeEnum;
