/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdLayoutProps {
  /**
   * 【开发中】布局方向
   */
  direction?: 'vertical' | 'horizontal';
}

export interface TdHeaderProps {
  /**
   * 顶栏高度。样式表（class）中定义的默认高度为：64px
   * @default ''
   */
  height?: string;
}

export interface TdAsideProps {
  /**
   * 侧边栏宽度。样式表（class）中定义的默认宽度为：232px
   * @default ''
   */
  width?: string;
}

export interface TdContentProps {
  /**
   * 内容
   */
  content?: string | TNode;
  /**
   * 内容，同 content
   */
  default?: string | TNode;
}

export interface TdFooterProps {
  /**
   * 底栏高度。样式表（class）中定义的默认高度为：24px
   * @default ''
   */
  height?: string;
}
