/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps, InputValue } from '../input';
import { PopupProps } from '../popup';
import { TagInputProps, TagInputValue, TagInputChangeContext } from '../tag-input';
import { TagProps } from '../tag';
import { PopupVisibleChangeContext } from '../popup';
import { TNode } from '../common';

export interface TdSelectInputProps {
  /**
   * 是否允许输入
   * @default false
   */
  allowInput?: boolean;
  /**
   * 宽度随内容自适应
   * @default false
   */
  autoWidth?: boolean;
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean;
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
   * 输入框的值
   */
  inputValue?: InputValue;
  /**
   * 输入框的值，非受控属性
   */
  defaultInputValue?: InputValue;
  /**
   * 定义字段别名，示例：`{ label: 'text', value: 'id', children: 'list' }`
   */
  keys?: SelectInputKeys;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 是否处于加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠
   * @default 0
   */
  minCollapsedNum?: number;
  /**
   * 是否为多选模式，默认为单选
   * @default false
   */
  multiple?: boolean;
  /**
   * 下拉框内容，可完全自定义
   */
  panel?: string | TNode;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 透传 Popup 浮层组件全部属性
   */
  popupProps?: PopupProps;
  /**
   * 是否显示下拉框，受控属性
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
   * 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签
   */
  tag?: string | TNode<{ value: string | number }>;
  /**
   * 透传 TagInput 组件全部属性
   */
  tagInputProps?: TagInputProps;
  /**
   * 透传 Tag 标签组件全部属性
   */
  tagProps?: TagProps;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 全部标签值。值为数组表示多个标签，值为非数组表示单个数值
   */
  value?: SelectInputValue;
  /**
   * 自定义值呈现的全部内容，参数为所有标签的值
   */
  valueDisplay?: string | TNode<{ value: SelectInputValue; onClose: (index: number, item?: any) => void }>;
  /**
   * 失去焦点时触发，`context.inputValue` 表示输入框的值；`context.tagInputValue` 表示标签输入框的值
   */
  onBlur?: (value: SelectInputValue, context: SelectInputFocusContext) => void;
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
  onFocus?: (value: SelectInputValue, context: SelectInputFocusContext) => void;
  /**
   * 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等
   */
  onInputChange?: (value: InputValue, context?: SelectInputValueChangeContext) => void;
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
  onPopupVisibleChange?: (visible: boolean, context: PopupVisibleChangeContext) => void;
  /**
   * 值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数
   */
  onTagChange?: (value: SelectInputValue, context: SelectInputChangeContext) => void;
}

export interface SelectInputKeys {
  label?: string;
  value?: string;
  children?: string;
}

export type SelectInputValue = string | number | boolean | Date | Object | Array<any> | Array<SelectInputValue>;

export interface SelectInputFocusContext {
  inputValue: InputValue;
  tagInputValue?: TagInputValue;
  e: FocusEvent;
}

export interface SelectInputValueChangeContext {
  e?: InputEvent | MouseEvent | FocusEvent | KeyboardEvent;
  trigger: 'input' | 'clear' | 'blur';
}

export type SelectInputChangeContext = TagInputChangeContext;
