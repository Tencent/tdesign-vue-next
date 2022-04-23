/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, ClassName, Styles, AttachNode } from '../common';

export interface TdPopupProps {
  /**
   * 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default 'body'
   */
  attach?: AttachNode;
  /**
   * 浮层里面的内容
   */
  content?: string | TNode;
  /**
   * 触发元素，同 triggerElement
   */
  default?: string | TNode;
  /**
   * 是否在关闭浮层时销毁浮层
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 【开发中】浮层是否隐藏空内容，默认不隐藏
   * @default false
   */
  hideEmptyPopup?: boolean;
  /**
   * 浮层类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`
   */
  overlayClassName?: ClassName;
  /**
   * 浮层样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点
   */
  overlayStyle?: Styles | ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles);
  /**
   * 浮层出现位置
   * @default top
   */
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom';
  /**
   * 是否显示浮层箭头
   * @default false
   */
  showArrow?: boolean;
  /**
   * 触发浮层出现的方式
   * @default hover
   */
  trigger?: 'hover' | 'click' | 'focus' | 'context-menu';
  /**
   * 触发元素
   */
  triggerElement?: string | TNode;
  /**
   * 是否显示浮层
   * @default false
   */
  visible?: boolean;
  /**
   * 是否显示浮层，非受控属性
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500
   */
  zIndex?: number;
  /**
   * 下拉选项滚动事件
   */
  onScroll?: (context: { e: WheelEvent }) => void;
  /**
   * 当浮层隐藏或显示时触发
   */
  onVisibleChange?: (visible: boolean, context: PopupVisibleChangeContext) => void;
}

export interface PopupVisibleChangeContext {
  e?: PopupTriggerEvent;
  trigger?: PopupTriggerSource;
}

export type PopupTriggerEvent = MouseEvent | FocusEvent | KeyboardEvent;

export type PopupTriggerSource =
  | 'document'
  | 'trigger-element-click'
  | 'trigger-element-hover'
  | 'trigger-element-blur'
  | 'trigger-element-focus'
  | 'context-menu'
  | 'keydown-esc';
