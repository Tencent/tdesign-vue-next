/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { ButtonProps } from '../button';
import { PopupProps } from '../popup';
import { TNode } from '../common';

export interface TdPopconfirmProps {
  /**
   * 取消按钮，可自定义。值为 undefined 或 null 则不显示取消按钮。值类型为 Object 则表示透传 Button 组件属性
   * @default ''
   */
  cancelBtn?: string | ButtonProps | TNode;
  /**
   * 确认按钮，可自定义。值为 undefined 或 null 则不显示确认按钮
   * @default ''
   */
  confirmBtn?: string | ButtonProps | TNode;
  /**
   * 确认框内容
   */
  content?: string | TNode;
  /**
   * 触发元素，同 triggerElement
   */
  default?: string | TNode;
  /**
   * 是否在关闭浮层时销毁浮层
   * @default true
   */
  destroyOnClose?: boolean;
  /**
   * 确认框图标
   */
  icon?: TNode;
  /**
   * 浮层出现位置
   * @default top
   */
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  /**
   * 透传 Popup 组件属性
   */
  popupProps?: PopupProps;
  /**
   * 是否显示浮层箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * 文字提示风格
   * @default default
   */
  theme?: 'default' | 'warning' | 'danger';
  /**
   * 触发元素
   */
  triggerElement?: string | TNode;
  /**
   * 是否显示气泡确认框
   */
  visible?: boolean;
  /**
   * 是否显示气泡确认框，非受控属性
   */
  defaultVisible?: boolean;
  /**
   * 点击取消按钮时触发
   */
  onCancel?: (options: { e: MouseEvent }) => void;
  /**
   * 点击确认按钮时触发
   */
  onConfirm?: (options: { e: MouseEvent }) => void;
  /**
   * 确认框显示或隐藏时触发
   */
  onVisibleChange?: (visible: boolean, context?: PopconfirmVisibleChangeContext) => void;
};

export interface PopconfirmVisibleChangeContext { trigger?: TriggerSource; e?: MouseEvent };

export type TriggerSource = 'cancel' | 'confirm' | 'document' | 'trigger-element-click';
