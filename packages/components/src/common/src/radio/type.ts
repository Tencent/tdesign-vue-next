/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, SizeEnum } from '../common';

export interface TdRadioProps {
  /**
   * 是否允许取消选中
   * @default false
   */
  allowUncheck?: boolean;
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否选中，非受控属性
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 是否选中
   * @default false
   */
  modelValue?: boolean;
  /**
   * 单选按钮内容，同 label
   */
  default?: string | TNode;
  /**
   * 是否为禁用态。如果存在父组件 RadioGroup，默认值由 RadioGroup.disabled 控制。Radio.disabled 优先级高于 RadioGroup.disabled
   */
  disabled?: boolean;
  /**
   * 主文案
   */
  label?: string | TNode;
  /**
   * HTML 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 单选按钮的值
   */
  value?: string | number | boolean;
  /**
   * 选中状态变化时触发
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
  /**
   * 点击时出发，一般用于外层阻止冒泡场景
   */
  onClick?: (context: { e: MouseEvent }) => void;
}

export interface TdRadioGroupProps<T = RadioValue> {
  /**
   * 是否允许取消选中
   * @default false
   */
  allowUncheck?: boolean;
  /**
   * 是否禁用全部子单选框。默认为 false。RadioGroup.disabled 优先级低于 Radio.disabled
   */
  disabled?: boolean;
  /**
   * HTML 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同
   */
  options?: Array<RadioOption>;
  /**
   * 组件尺寸【讨论中】
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 选中的值
   */
  value?: T;
  /**
   * 选中的值，非受控属性
   */
  defaultValue?: T;
  /**
   * 选中的值
   */
  modelValue?: T;
  /**
   * 单选组件按钮形式
   * @default outline
   */
  variant?: 'outline' | 'primary-filled' | 'default-filled';
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: T, context: { e: Event }) => void;
}

export type RadioOption = string | number | RadioOptionObj;

export interface RadioOptionObj {
  label?: string | TNode;
  value?: string | number | boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export type RadioValue = string | number | boolean;
