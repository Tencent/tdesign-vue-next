/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { PopupProps } from '../popup';
import { TNode } from '../common';

export interface TdAvatarProps {
  /**
   * 头像替换文本
   * @default ''
   */
  alt?: string;
  /**
   * 加载失败时隐藏图片
   * @default false
   */
  hideOnLoadFailed?: boolean;
  /**
   * 图标
   */
  icon?: TNode;
  /**
   * 图片地址
   * @default ''
   */
  image?: string;
  /**
   * 形状
   * @default circle
   */
  shape?: ShapeEnum ;
  /**
   * 尺寸，示例值：small/medium/large/24px/38px 等，默认为 large
   * @default ''
   */
  size?: string;
  /**
   * 图片加载失败时触发
   */
  onError?: () => void;
};

export interface TdAvatarGroupProps {
  /**
   * 图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上
   * @default 'right-up'
   */
  cascading?: CascadingValue;
  /**
   * 头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 `+N`。示例：`+5`，`...`, `更多`
   */
  collapseAvatar?: string | TNode;
  /**
   * 能够同时显示的最多头像数量
   */
  max?: number;
  /**
   * 超出的头像呈现位置
   */
  placement?: MaxOverPlacement;
  /**
   * 头像右上角提示信息
   */
  popupProps?: PopupProps;
  /**
   * 尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size
   * @default medium
   */
  size?: string;
};

export type ShapeEnum = 'circle' | 'round';

export type CascadingValue = 'left-up' | 'right-up';

export type MaxOverPlacement = 'left' | 'top' | 'bottom' | 'right';
