/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

export interface TdInputNumberProps {
  /**
   * [小数位数](https://en.wiktionary.org/wiki/decimal_place)
   */
  decimalPlaces?: number;
  /**
   * 禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 指定输入框展示值的格式
   */
  format?: (value: number) => number | string;
  /**
   * 最大值
   * @default Infinity
   */
  max?: number;
  /**
   * 最小值
   * @default -Infinity
   */
  min?: number;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 数值改变步数，可以是小数
   * @default 1
   */
  step?: number;
  /**
   * 按钮布局
   * @default row
   */
  theme?: 'column' | 'row' | 'normal';
  /**
   * 值
   */
  value?: number;
  /**
   * 值，非受控属性
   */
  defaultValue?: number;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: number, context: { e: FocusEvent }) => void;
  /**
   * 值变化时触发
   */
  onChange?: (value: number, context: ChangeContext) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (value: number, context: { e: KeyboardEvent }) => void;
  /**
   * 获取焦点时触发
   */
  onFocus?: (value: number, context: { e: FocusEvent }) => void;
  /**
   * 键盘按下时触发
   */
  onKeydown?: (value: number, context: { e: KeyboardEvent }) => void;
  /**
   * 按下字符键时触发（keydown -> keypress -> keyup）
   */
  onKeypress?: (value: number, context: { e: KeyboardEvent }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyup?: (value: number, context: { e: KeyboardEvent }) => void;
};

export interface ChangeContext { type: ChangeSource; e: InputEvent | MouseEvent | FocusEvent };

export type ChangeSource = 'add' | 'reduce' | 'input' | '';
