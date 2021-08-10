/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TNode, SizeEnum } from '../common';

export interface TdButtonProps {
  /**
   * 是否为块级元素
   * @default false
   */
  block?: boolean;
  /**
   * 按钮内容
   */
  content?: string | TNode;
  /**
   * 按钮内容
   */
  default?: string | TNode;
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否为幽灵按钮（镂空按钮）
   * @default false
   */
  ghost?: boolean;
  /**
   * 按钮内部图标，可完全自定义
   */
  icon?: TNode;
  /**
   * 是否显示为加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮形状，有三种：方形、圆角方形、圆形
   * @default square
   */
  shape?: 'square' | 'round' | 'circle';
  /**
   * 组件子元素（默认插槽）
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 组件风格，依次为默认色、品牌色、危险色、警告色、成功色
   */
  theme?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
  /**
   * 按钮类型
   * @default button
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * 按钮形式，基础、线框、虚线、文字
   * @default base
   */
  variant?: 'base' | 'outline' | 'dashed' | 'text';
};
