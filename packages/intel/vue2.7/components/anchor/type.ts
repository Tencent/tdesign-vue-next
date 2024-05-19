/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-19 10:44:26
 */

import type { ScrollContainer, TNode } from '@td/shared/interface';
import type { TdAffixProps } from '../affix/type';

export interface TdAnchorProps {
  /**
   * 透传 Affix 组件属性，即让 Anchor 组件支持所有 Affix 组件特性
   */
  affixProps?: TdAffixProps;
  /**
   * 锚点区域边界
   * @default 5
   */
  bounds?: number;
  /**
   * 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default () => (() => window)
   */
  container?: ScrollContainer;
  /**
   * 用于自定义选中项左侧游标
   */
  cursor?: TNode;
  /**
   * 组件尺寸，small(120px)，medium(200px)，large(320px)
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 锚点滚动偏移量
   * @default 0
   */
  targetOffset?: number;
  /**
   * 锚点改变时触发
   */
  onChange?: (currentLink: string, prevLink: string) => void;
  /**
   * 锚点被点击时触发
   */
  onClick?: (link: { href: string; title: string; e: MouseEvent }) => void;
  /**
   * 自定义高亮的锚点
   */
  getCurrentAnchor?: (activeLink: string) => string;
}

export interface TdAnchorTargetProps {
  /**
   * 目标内容 id
   * @default ''
   */
  id: string;
  /**
   * 渲染的标签
   * @default div
   */
  tag?: string;
}

export interface TdAnchorItemProps {
  /**
   * 锚点链接, 如果是 hash 模式需要加上当前 path
   * @default ''
   */
  href: string;
  /**
   * 锚点文本
   * @default _self
   */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /**
   * 锚点文本
   * @default ''
   */
  title?: string | TNode;
}
