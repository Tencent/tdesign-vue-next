/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum } from '../common';
import { VNode } from 'vue';

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
   * 一行 DescriptionItem 的数量
   * @default 2
   */
  column?: number;
  /**
   * 字段值内容的对齐方式：左对齐、居中对齐
   * @default left
   */
  contentAlign?: 'left' | 'center';
  /**
   * 字段标签对齐方式：左对齐、右对齐、顶部对齐
   * @default right
   */
  labelAlign?: 'left' | 'right' | 'top';
  /**
   * 排列方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 描述项
   */
  items?: TdDescriptionItemProps[];
  itemDirection?: 'horizontal' | 'vertical';
}

export interface TdDescriptionItemProps {
  /**
   * 描述项字段名
   */
  label?: string | TNode;
  /**
   * 占用的宽度数量
   * @default 1
   */
  span?: number;
}

export type TdDescriptionItemVnode = VNode & {};
