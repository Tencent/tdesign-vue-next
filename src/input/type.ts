/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum, ClassName } from '../common';

export interface TdInputProps {
  /**
   * 文本内容位置，居左/居中/居右
   * @default left
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 是否开启自动填充功能，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * @default ''
   */
  autocomplete?: string;
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: boolean;
  /**
   * 宽度随内容自适应
   * @default false
   */
  autoWidth?: boolean;
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
   * 【开发中】指定输入框展示值的格式
   */
  format?: InputFormatType;
  /**
   * t-input 同级类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`
   */
  inputClass?: ClassName;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxcharacter?: number;
  /**
   * 用户最多可以输入的文本长度，一个中文等于一个计数长度。值小于等于 0 的时候，则表示不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxlength?: number;
  /**
   * 名称
   * @default ''
   */
  name?: string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示
   * @default false
   */
  showClearIconOnEmpty?: boolean;
  /**
   * 输入框尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 输入框状态
   * @default default
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
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
   * 输入框的值
   */
  modelValue?: InputValue;
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
   * 中文输入结束时触发
   */
  onCompositionend?: (value: InputValue, context: { e: CompositionEvent }) => void;
  /**
   * 中文输入开始时触发
   */
  onCompositionstart?: (value: InputValue, context: { e: CompositionEvent }) => void;
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
  /**
   * 进入输入框时触发
   */
  onMouseenter?: (context: { e: MouseEvent }) => void;
  /**
   * 离开输入框时触发
   */
  onMouseleave?: (context: { e: MouseEvent }) => void;
  /**
   * 粘贴事件，`pasteValue` 表示粘贴板的内容
   */
  onPaste?: (context: { e: ClipboardEvent; pasteValue: string }) => void;
  /**
   * 输入框中滚动鼠标时触发
   */
  onWheel?: (context: { e: WheelEvent }) => void;
}

export type InputFormatType = (value: InputValue) => number | string;

export type InputValue = string | number;
