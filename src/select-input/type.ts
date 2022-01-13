/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps, InputValue } from '../input';
import { PopupProps } from '../popup';
import { TagInputProps } from '../tag-input';
import { TagProps } from '../tag';
import { TNode } from '../common';

export interface TdSelectInputProps {
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 `collapsedItems` 自定义。`value` 表示所有标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量
   */
  collapsedItems?: TNode<{ value: SelectInputValue; collapsedTags: SelectInputValue; count: number }>;
  /**
   * 是否禁用
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
   * 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠
   * @default 0
   */
  minCollapsedNum?: number;
  /**
   * 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示
   * @default scroll
   */
  overTagsDisplayType?: 'scroll' | 'break-line';
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 透传 Popup 浮层组件全部属性
   */
  popupProps?: popupProps;
  /**
   * 是否显示下拉框，受控属性
   * @default false
   */
  popupVisible?: boolean;
  /**
   * 是否只读，值为真会隐藏输入框，且无法打开下拉框
   * @default false
   */
  readonly?: boolean;
  /**
   * 输入框状态
   */
  status?: 'success' | 'warning' | 'error';
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 透传 TagInput 组件全部属性
   */
  tagInputProps?: TagInputProps;
  /**
   * 透传 Tag 标签组件全部属性
   */
  tagProps?: TagProps;
  /**
   * 全部标签值。值为数组表示多个标签，值为非数组表示单个数值
   */
  value?: SelectInputValue;
  /**
   * 自定义值呈现的全部内容，参数为所有标签的值
   */
  valueDisplay?: string | TNode<{ value: SelectInputValue }>;
  /**
   * 值的呈现方式，有两种：文本 和 标签。一般情况，单选选择器使用 `text` 模式，多选选择器使用 `tag` 模式
   * @default text
   */
  variant?: 'text' | 'tag';
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 按键按下 Enter 时触发
   */
  onEnter?: (value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void;
  /**
   * 聚焦时触发
   */
  onFocus?: (value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void;
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
   * 下拉框显示或隐藏时触发
   */
  onPopupVisible?: () => void;
  /**
   * 移除单个标签时触发
   */
  onRemove?: (context: TagInputRemoveContext) => void;
}

export type SelectInputValue = string | number | boolean | Map | Symbol | Object | Array<any> | Array<SelectInputValue>;

export interface TagInputRemoveContext {
  value: SelectInputValue;
  index: number;
  item: string | number;
  e: MouseEvent | KeyboardEvent;
  trigger: TagInputRemoveTrigger;
}

export type TagInputRemoveTrigger = 'tag-remove' | 'backspace';
