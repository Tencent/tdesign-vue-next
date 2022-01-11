/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-11 11:45:55
 * */

import { InputProps, InputValue } from '../input';
import { TagProps } from '../tag';
import { TNode } from '../common';

export interface TdTagInputProps {
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量
   */
  collapsedItems?: TNode<{ value: TagInputValue; collapsedTags: TagInputValue; count: number }>;
  /**
   * 是否禁用标签输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 透传 Input 输入框组件全部属性
   */
  inputProps?: InputProps;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 最大允许输入的标签数量
   */
  max?: number;
  /**
   * 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠
   * @default 0
   */
  minCollapsedNum?: number;
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
   * 输入框状态
   */
  status?: 'success' | 'warning' | 'error';
  /**
   * 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签
   */
  tag?: string | TNode<{ value: string | number }>;
  /**
   * 透传 Tag 组件全部属性
   */
  tagProps?: TagProps;
  /**
   * 值
   */
  value?: TagInputValue;
  /**
   * 值，非受控属性
   */
  defaultValue?: TagInputValue;
  /**
   * 自定义值呈现的全部内容，参数为所有标签的值
   */
  valueDisplay?: string | TNode<{ value: TagInputValue }>;
  /**
   * 值变化时触发，参数 `trigger` 表示数据变化的触发来源
   */
  onChange?: (value: TagInputValue, context: TagInputChangeContext) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 按键按下 Enter 时触发
   */
  onEnter?: (value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void;
  /**
   * 进入输入框时触发
   */
  onMouseenter?: (context: { e: MouseEvent }) => void;
  /**
   * 离开输入框时触发
   */
  onMouseleave?: (context: { e: MouseEvent }) => void;
  /**
   * 移除单个标签时触发
   */
  onRemove?: (context: TagInputRemoveContext) => void;
}

export type TagInputValue = Array<string | number>;

export interface TagInputChangeContext {
  trigger: TagInputTriggerSource;
  index?: number;
  item?: string | number;
  e: MouseEvent | KeyboardEvent;
}

export type TagInputTriggerSource = 'enter' | 'tag-remove' | 'backspace' | 'clear';

export interface TagInputRemoveContext {
  value: TagInputValue;
  index: number;
  item: string | number;
  e: MouseEvent | KeyboardEvent;
  trigger: TagInputRemoveTrigger;
}

export type TagInputRemoveTrigger = 'tag-remove' | 'backspace';
