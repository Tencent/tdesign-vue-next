/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { TNode } from '@td/shared/interface';
import type { PopupProps } from '../popup';

export interface TdStickyToolProps {
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
   * 透传 Popup 组件全部特性，优先级低于 StickyItem.popupProps
   */
  popupProps?: PopupProps;
  /**
   * 侧边栏菜单形状，有 2 种：方形、圆形
   * @default square
   */
  shape?: 'square' | 'round';
  /**
   * 侧边栏菜单类型，有 2 种：常规型和紧凑型
   * @default normal
   */
  type?: 'normal' | 'compact';
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
}

export interface TdStickyItemProps {
  /**
   * 图标
   */
  icon?: TNode;
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
}
