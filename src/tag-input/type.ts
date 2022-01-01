/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-01 23:06:59
 * */

import { InputProps, InputValue } from '../input';

export interface TdTagInputProps {
  /**
   * 透传 Input 组件全部属性
   */
  inputProps?: InputProps;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 是否只读，值为真会隐藏标签移除按钮和输入框
   * @default false
   */
  readonly?: boolean;
  /**
   * 值
   */
  value?: TagInputValue;
  /**
   * 值，非受控属性
   */
  defaultValue?: TagInputValue;
  /**
   * 值变化时触发，参数 `trigger` 表示数据变化的触发来源
   */
  onChange?: (value: TagInputValue, context: { trigger: TriggerSource; index: number }) => void;
  /**
   * 按键按下 Enter 时触发
   */
  onEnter?: (value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void;
}

export type TagInputValue = Array<string | number>;

export type TriggerSource = 'enter' | 'tag-delete' | 'backspace';
