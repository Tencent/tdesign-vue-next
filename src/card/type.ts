/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdCardProps {
  /**
   * 卡片标题的操作区
   */
  actions?: string | TNode;
  /**
   * 是否有边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图
   */
  cover?: string | TNode;
  /**
   * 卡片底部内容，可完全自定义
   */
  footer?: string | TNode;
  /**
   * 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Sketon 组件完全自定义加载态呈现内容
   * @default false
   */
  loading?: boolean | TNode;
  /**
   * 是否显示卡片阴影，默认不显示
   * @default false
   */
  shadow?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'medium' | 'small';
  /**
   * 卡片标题
   */
  title?: string | TNode;
};
