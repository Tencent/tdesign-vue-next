/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { PopupProps } from '../popup';
import { TNode } from '../common';

export interface TdDropdownProps {
  /**
   * 多层级操作时，子层级展开方向（待设计师规划）
   * @default right
   */
  direction?: 'left' | 'right';
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 点击选项后是否自动隐藏弹窗
   * @default true
   */
  hideAfterItemClick?: boolean;
  /**
   * 选项最大宽度，内容超出时，显示为省略号，单位：px
   * @default 100
   */
  maxColumnWidth?: number;
  /**
   * 弹窗最大高度，单位：px 。统一控制每一列的高度
   * @default 300
   */
  maxHeight?: number;
  /**
   * 选项最小宽度，单位：px
   * @default 10
   */
  minColumnWidth?: number;
  /**
   * 下拉操作项
   * @default []
   */
  options?: Array<DropdownOption>;
  /**
   * 弹窗定位方式，可选值参考popup
   * @default bottom-left
   */
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  /**
   * 透传 popup 组件属性，方便更加自由地控制
   */
  popupProps?: PopupProps;
  /**
   * 触发下拉显示的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'focus' | 'context-menu' | 'manual';
  /**
   * 下拉操作项点击时触发
   */
  onClick?: (dropdownItem: DropdownOption, context: { e: MouseEvent }) => void;
};

export interface TdDropdownItemProps {
  /**
   * 是否高亮当前操作项
   * @default false
   */
  active?: boolean;
  /**
   * 下拉操作项内容
   * @default ''
   */
  content?: string | TNode;
  /**
   * 是否禁用操作项
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否显示操作项之间的分隔线（分隔线默认在下方）
   * @default false
   */
  divider?: boolean;
  /**
   * 下拉操作项唯一标识
   */
  value?: string | number;
  /**
   * 点击时触发
   */
  onClick?: (context: { e: KeyboardEvent }) => void;
};

export type DropdownOption = { children?: Array<TdDropdownItemProps> } & TdDropdownItemProps & Record<string, any>;
