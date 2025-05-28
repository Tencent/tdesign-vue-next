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
   * 一行 `DescriptionsItem` 的数量
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
  items?: Array<TdDescriptionsItemProps>;
  /**
   * 自定义描述项标签的样式，需要配合 `tableLayout` 为 `auto` 才可以生效
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
   * 用于设置底层 `table` 单元格、行和列的布局算法，与原生 table-layout css 属性完全一致。`fixed`：采用固定布局算法；`auto`：采用自动布局算法。详情可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
   * @default fixed
   */
  tableLayout?: 'fixed' | 'auto';
  /**
   * 描述列表的标题
   */
  title?: string | TNode;
}

export interface TdDescriptionsItemProps {
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
