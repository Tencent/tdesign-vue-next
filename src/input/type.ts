/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TNode, SizeEnum } from '../common';

export interface TdInputProps {
  /**
   * 是否开启自动填充功能
   * @default false
   */
  autocomplete?: boolean;
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: boolean;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
   */
  maxcharacter?: number;
  /**
   * 用户最多可以输入的文本长度。值小于等于 0 的时候，则不限制输入长度
   */
  maxlength?: number;
  /**
   * 名称
   * @default ''
   */
  name?: string;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 输入框是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 输入框尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 输入框状态
   */
  status?: 'success' | 'warning' | 'error';
  /**
   * 组件后置图标
   */
  suffixIcon?: string | TNode;
  /**
   * 输入框类型
   * @default text
   */
  type?: 'text' | 'number' | 'url' | 'tel' | 'password' | 'search' | 'submit' | 'hidden';
  /**
   * 输入框的值
   */
  value?: InputValue;
  /**
   * 输入框的值，非受控属性
   */
  defaultValue?: InputValue;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: InputValue, context: { e: FocusEvent }) => void;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (value: InputValue, context?: { e?: InputEvent | MouseEvent }) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (value: InputValue, context: { e: KeyboardEvent }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (value: InputValue, context: { e: FocusEvent }) => void;
  /**
   * 键盘按下时触发
   */
  onKeydown?: (value: InputValue, context: { e: KeyboardEvent }) => void;
  /**
   * 按下字符键时触发（keydown -> keypress -> keyup）
   */
  onKeypress?: (value: InputValue, context: { e: KeyboardEvent }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyup?: (value: InputValue, context: { e: KeyboardEvent }) => void;
};

export type InputValue = string | number;
