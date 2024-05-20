

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdTabsProps {
  /**
   * 选项卡右侧的操作区域
   */
  action?: string | TNode;
  /**
   * 选项卡是否可增加
   * @default false
   */
  addable?: boolean;
  /**
   * 是否禁用选项卡
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否开启拖拽调整顺序
   * @default false
   */
  dragSort?: boolean;
  /**
   * 选项卡列表
   */
  list?: Array<TdTabPanelProps>;
  /**
   * 选项卡位置
   * @default top
   */
  placement?: 'left' | 'top' | 'bottom' | 'right';
  /**
   * 组件尺寸
   * @default medium
   */
  size?: 'medium' | 'large';
  /**
   * 选项卡风格，包含 默认风格 和 卡片风格两种
   * @default normal
   */
  theme?: 'normal' | 'card';
  /**
   * 激活的选项卡值
   */
  value?: TabValue;
  /**
   * 激活的选项卡值，非受控属性
   */
  defaultValue?: TabValue;
  /**
   * 激活的选项卡值
   */
  modelValue?: TabValue;
  /**
   * 添加选项卡时触发
   */
  onAdd?: (context: { e: MouseEvent }) => void;
  /**
   * 激活的选项卡发生变化时触发
   */
  onChange?: (value: TabValue) => void;
  /**
   * 拖拽排序时触发
   */
  onDragSort?: (context: TabsDragSortContext) => void;
  /**
   * 删除选项卡时触发
   */
  onRemove?: (options: { value: TabValue; index: number; e: MouseEvent }) => void;
}

export interface TdTabPanelProps {
  /**
   * 用于自定义选项卡导航，同 panel
   */
  default?: TNode;
  /**
   * 选项卡内容隐藏时是否销毁
   * @default true
   */
  destroyOnHide?: boolean;
  /**
   * 是否禁用当前选项卡
   * @default false
   */
  disabled?: boolean;
  /**
   * 选项卡组件开启允许拖动排序时，当前选项卡是否允许拖动
   * @default true
   */
  draggable?: boolean;
  /**
   * 选项卡名称，可自定义选项卡导航内容
   */
  label?: string | TNode;
  /**
   * 是否启用选项卡懒加载
   * @default false
   */
  lazy?: boolean;
  /**
   * 用于自定义选项卡面板内容
   */
  panel?: string | TNode;
  /**
   * 当前选项卡是否允许移除
   * @default false
   */
  removable?: boolean;
  /**
   * 选项卡的值，唯一标识
   */
  value?: TabValue;
  /**
   * 点击删除按钮时触发
   */
  onRemove?: (options: { value: TabValue; e: MouseEvent }) => void;
}

export type TabValue = string | number;

export interface TabsDragSortContext {
  currentIndex: number;
  current: TabValue;
  targetIndex: number;
  target: TabValue;
}
