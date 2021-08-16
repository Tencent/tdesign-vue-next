/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TNode } from '../common';

export interface TdCheckboxProps {
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
   * 是否禁用组件内容（content）触发选中
   */
  contentDisabled?: boolean;
  /**
   * 复选框内容，同 label
   */
  default?: string | TNode;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 是否为半选
   * @default false
   */
  indeterminate?: boolean;
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
   * 组件是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 复选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
};

export interface TdCheckboxGroupProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 支持最多选中的数量
   */
  max?: number;
  /**
   * 统一设置内部复选框 HTML 属性
   * @default ''
   */
  name?: string;
  /**
   * 以配置形式设置子元素。示例1：['北京', '上海'] ，示例2: [{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]。checkAll 值为 true 表示当前选项为「全选选项」
   * @default []
   */
  options?: Array<CheckboxOption>;
  /**
   * 选中值
   * @default []
   */
  value?: CheckboxGroupValue;
  /**
   * 选中值，非受控属性
   * @default []
   */
  defaultValue?: CheckboxGroupValue;
  /**
   * 值变化时触发
   */
  onChange?: (value: CheckboxGroupValue, context: { e: Event }) => void;
};

export type CheckboxOption = string | number | CheckboxOptionObj;

export interface CheckboxOptionObj { label?: string | TNode; value?: string | number; disabled?: boolean; name?: string; checkAll?: true };

export type CheckboxGroupValue = Array<string | number> | string | number;
