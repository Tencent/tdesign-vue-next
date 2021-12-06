/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

export interface TdTextareaProps {
  /**
   * 自动聚焦，拉起键盘
   * @default false
   */
  autofocus?: boolean;
  /**
   * 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度
   * @default false
   */
  autosize?: boolean | { minRows?: number; maxRows?: number };
  /**
   * 是否禁用文本框
   * @default false
   */
  disabled?: boolean;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
   */
  maxcharacter?: number;
  /**
   * 用户最多可以输入的字符个数
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
   * 文本框是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 文本框值
   */
  value?: TextareaValue;
  /**
   * 文本框值，非受控属性
   */
  defaultValue?: TextareaValue;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: TextareaValue, context: { e: FocusEvent }) => void;
  /**
   * 输入内容变化时触发
   */
  onChange?: (value: TextareaValue, context?: { e?: InputEvent }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (value: TextareaValue, context: { e: FocusEvent }) => void;
  /**
   * 键盘按下时触发
   */
  onKeydown?: (value: TextareaValue, context: { e: KeyboardEvent }) => void;
  /**
   * 按下字符键时触发（keydown -> keypress -> keyup）
   */
  onKeypress?: (value: TextareaValue, context: { e: KeyboardEvent }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyup?: (value: TextareaValue, context: { e: KeyboardEvent }) => void;
};

export type TextareaValue = string | number;
