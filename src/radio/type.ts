/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode, SizeEnum } from '../common';

export interface TdRadioProps {
  /**
   * 【开发中】是否允许取消选中
   * @default false
   */
  allowUncheck?: boolean;
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 是否选中，非受控属性
   */
  defaultChecked?: boolean;
  /**
   * 单选按钮内容，同 label
   */
  default?: string | TNode;
  /**
   * 是否为禁用态
   */
  disabled?: boolean;
  /**
   * 主文案
   */
  label?: string | TNode;
  /**
   * HTM 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 单选按钮的值
   */
  value?: RadioValue;
  /**
   * 选中状态变化时触发
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
};

export interface TdRadioGroupProps {
  /**
   * 单选组件按钮形式（请使用 variant 代替）
   * @default outline
   * @deprecated
   */
  buttonStyle?: 'outline' | 'solid';
  /**
   * 是否禁用全部子单选框
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
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 选中的值
   */
  value?: RadioValue;
  /**
   * 选中的值，非受控属性
   */
  defaultValue?: RadioValue;
  /**
   * 单选组件按钮形式
   * @default outline
   */
  variant?: 'outline' | 'primary-filled' | 'default-filled';
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: RadioValue, context: { e: Event }) => void;
};

export type RadioValue = string | number | boolean;

export type RadioOption = string | number | RadioOptionObj;

export interface RadioOptionObj { label?: string | TNode; value?: string | number; disabled?: boolean };
