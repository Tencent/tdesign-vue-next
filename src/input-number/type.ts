/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps } from '../input';
import { TNode } from '../common';

export interface TdInputNumberProps<T = InputNumberValue> {
  /**
   * 文本内容位置，居左/居中/居右
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 是否允许输入超过 `max` `min` 范围外的数字。为保障用户体验，仅在失去焦点时进行数字范围矫正。默认允许超出，数字超出范围时，输入框变红提醒
   * @default true
   */
  allowInputOverLimit?: boolean;
  /**
   * 宽度随内容自适应
   * @default false
   */
  autoWidth?: boolean;
  /**
   * [小数位数](https://en.wiktionary.org/wiki/decimal_place)
   */
  decimalPlaces?: InputNumberDecimalPlaces;
  /**
   * 禁用组件
   */
  disabled?: boolean;
  /**
   * 格式化输入框展示值。第二个事件参数 `context.fixedNumber` 表示处理过小数位数 `decimalPlaces` 的数字
   */
  format?: (value: InputNumberValue, context?: { fixedNumber?: InputNumberValue }) => InputNumberValue;
  /**
   * 透传 Input 输入框组件全部属性
   */
  inputProps?: InputProps;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 是否作为大数使用。JS 支持的最大数字位数是 16 位，超过 16 位的数字需作为字符串大数处理。此时，数据类型必须保持为字符串，否则会丢失数据
   * @default false
   */
  largeNumber?: boolean;
  /**
   * 最大值。如果是大数，请传入字符串
   * @default Infinity
   */
  max?: InputNumberValue;
  /**
   * 最小值。如果是大数，请传入字符串
   * @default -Infinity
   */
  min?: InputNumberValue;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 文本框状态
   * @default default
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 数值改变步数，可以是小数。如果是大数，请保证数据类型为字符串
   * @default 1
   */
  step?: InputNumberValue;
  /**
   * 后置内容
   */
  suffix?: string | TNode;
  /**
   * 按钮布局
   * @default row
   */
  theme?: 'column' | 'row' | 'normal';
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 数字输入框的值。当值为 '' 时，输入框显示为空
   */
  value?: T;
  /**
   * 数字输入框的值。当值为 '' 时，输入框显示为空，非受控属性
   */
  defaultValue?: T;
  /**
   * 数字输入框的值。当值为 '' 时，输入框显示为空
   */
  modelValue?: T;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: InputNumberValue, context: { e: FocusEvent }) => void;
  /**
   * 值变化时触发，`type` 表示触发本次变化的来源
   */
  onChange?: (value: T, context: ChangeContext) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (value: InputNumberValue, context: { e: KeyboardEvent }) => void;
  /**
   * 获取焦点时触发
   */
  onFocus?: (value: InputNumberValue, context: { e: FocusEvent }) => void;
  /**
   * 键盘按下时触发
   */
  onKeydown?: (value: InputNumberValue, context: { e: KeyboardEvent }) => void;
  /**
   * 按下字符键时触发（keydown -> keypress -> keyup）
   */
  onKeypress?: (value: InputNumberValue, context: { e: KeyboardEvent }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyup?: (value: InputNumberValue, context: { e: KeyboardEvent }) => void;
  /**
   * 最大值或最小值校验结束后触发，`exceed-maximum` 表示超出最大值，`below-minimum` 表示小于最小值
   */
  onValidate?: (context: { error?: 'exceed-maximum' | 'below-minimum' }) => void;
}

export type InputNumberValue = number | string;

export interface ChangeContext {
  type: ChangeSource;
  e: InputEvent | MouseEvent | FocusEvent | KeyboardEvent | CompositionEvent;
}

export type ChangeSource = 'add' | 'reduce' | 'input' | 'blur' | 'enter' | 'clear' | 'props';

export type InputNumberDecimalPlaces = number | { enableRound: boolean; places: number };
