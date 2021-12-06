/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { PopupProps } from '../popup';
import { TNode } from '../common';

export interface TdStickyToolProps {
  /**
   * 默认是否折叠
   * @default false
   */
  collapsed?: boolean;
  /**
   * 是否可拖拽
   * @default false
   */
  draggable?: boolean;
  /**
   * 自定义折叠入口，collapsed 值为 true 有效
   */
  entrance?: TNode;
  /**
   * 列表
   * @default []
   */
  list?: Array<TdStickyItemProps>;
  /**
   * 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem']
   */
  offset?: Array<string | number>;
  /**
   * 固定位置
   * @default right-bottom
   */
  placement?: 'right-top' | 'right-center' | 'right-bottom' | 'left-top' | 'left-center' | 'left-bottom';
  /**
   * 宽度
   */
  width?: string | number;
  /**
   * 点击某一项时触发
   */
  onClick?: (context: { e: MouseEvent; item: TdStickyItemProps }) => void;
  /**
   * 悬浮到某一项时触发
   */
  onHover?: (context: { e: MouseEvent; item: TdStickyItemProps }) => void;
};

export interface TdStickyItemProps {
  /**
   * 图标
   */
  icon?: string | TNode;
  /**
   * 名称
   */
  label?: string | TNode;
  /**
   * 浮层内容
   */
  popup?: string | TNode;
  /**
   * 透传浮层组件全部属性
   */
  popupProps?: PopupProps;
  /**
   * 触发浮层显示的方式
   * @default hover
   */
  trigger?: 'hover' | 'click';
};
