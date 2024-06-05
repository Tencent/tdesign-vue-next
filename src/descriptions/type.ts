/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum, Styles } from '../common';

export interface TdDescriptionsProps {
  /**
   * 是否带边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 字段名右侧是否携带冒号“：”
   */
  colon?: boolean;
  /**
   * 一行 `DescriptionItem` 的数量
   * @default 2
   */
  column?: number;
  /**
   * 自定义描述项内容的样式
   */
  contentStyle?: Styles;
  /**
   * 描述项的排列方向
   * @default horizontal
   */
  itemLayout?: 'horizontal' | 'vertical';
  /**
   * 描述项的列表
   */
  items?: Array<TdDescriptionItemProps>;
  /**
   * 自定义描述项标签的样式
   */
  labelStyle?: Styles;
  /**
   * 排列方向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 描述列表的标题
   */
  title?: string | TNode;

  mode?: 'fixed' | 'auto';
}

export interface TdDescriptionItemProps {
  /**
   * 内容垂直对齐方式，DescriptionItem.align 优先级高于 Descriptions.align
   */
  align?: 'top' | 'middle' | 'bottom';
  /**
   * 描述项内容
   */
  content?: string | TNode;
  /**
   * 描述项内容，同 `content`
   */
  default?: string | TNode;
  /**
   * 描述项标签
   */
  label?: string | TNode;
  /**
   * 占用的宽度数量
   * @default 1
   */
  span?: number;
}
