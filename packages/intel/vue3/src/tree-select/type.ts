

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps } from '../input';
import { PopupProps } from '../popup';
import { SelectInputProps } from '../select-input';
import { TagProps } from '../tag';
import { TreeProps, TreeNodeModel } from '../tree';
import { SelectInputValueChangeContext } from '../select-input';
import { PopupVisibleChangeContext } from '../popup';
import { TNode, TreeOptionData, TreeKeysType } from '../common';

export interface TdTreeSelectProps<
  DataOption extends TreeOptionData = TreeOptionData,
  TreeValueType extends TreeSelectValue = TreeSelectValue,
> {
  /**
   * 宽度随内容自适应
   * @default false
   */
  autoWidth?: boolean;
  /**
   * 【开发中】无边框模式
   * @default false
   */
  borderless?: boolean;
  /**
   * 是否允许清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义
   */
  collapsedItems?: TNode<{
    value: DataOption[];
    collapsedSelectedItems: DataOption[];
    count: number;
    onClose: (context: { index: number; e?: MouseEvent }) => void;
  }>;
  /**
   * 数据
   * @default []
   */
  data?: Array<DataOption>;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 当下拉列表为空时显示的内容
   * @default ''
   */
  empty?: string | TNode;
  /**
   * 过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据
   */
  filter?: (filterWords: string, option: DataOption) => boolean;
  /**
   * 是否可搜索
   * @default false
   */
  filterable?: boolean;
  /**
   * 透传给 输入框 Input 组件的全部属性
   */
  inputProps?: InputProps;
  /**
   * 输入框的值
   */
  inputValue?: string;
  /**
   * 输入框的值，非受控属性
   */
  defaultInputValue?: string;
  /**
   * 用来定义 `value / label / children / disabled` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label 'name', children: 'list' }`
   */
  keys?: TreeKeysType;
  /**
   * 是否正在加载数据
   * @default false
   */
  loading?: boolean;
  /**
   * 远程加载时显示的文字，支持自定义。如加上超链接
   * @default ''
   */
  loadingText?: string | TNode;
  /**
   * 用于控制多选数量，值为 0 则不限制
   * @default 0
   */
  max?: number;
  /**
   * 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠
   * @default 0
   */
  minCollapsedNum?: number;
  /**
   * 是否允许多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 透传给 popup 组件的全部属性
   */
  popupProps?: PopupProps;
  /**
   * 是否显示下拉框
   */
  popupVisible?: boolean;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 只读状态，值为真会隐藏输入框，且无法打开下拉框
   * @default false
   */
  readonly?: boolean;
  /**
   * 透传 SelectInput 筛选器输入框组件的全部属性
   */
  selectInputProps?: SelectInputProps;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 【开发中】透传 Tag 标签组件全部属性
   */
  tagProps?: TagProps;
  /**
   * 透传 Tree 组件的全部属性
   */
  treeProps?: TreeProps;
  /**
   * 选中值
   */
  value?: TreeSelectValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TreeSelectValue;
  /**
   * 选中值
   */
  modelValue?: TreeSelectValue;
  /**
   * 自定义选中项呈现方式
   */
  valueDisplay?: TNode<{ value: DataOption[]; onClose: () => void }>;
  /**
   * 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据
   * @default value
   */
  valueType?: 'value' | 'object';
  /**
   * 输入框失去焦点时触发
   */
  onBlur?: (context: { value: TreeSelectValue; e: FocusEvent }) => void;
  /**
   * 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源
   */
  onChange?: (
    value: TreeSelectValue,
    context: { node: TreeNodeModel<DataOption>; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent | KeyboardEvent },
  ) => void;
  /**
   * 点击清除按钮时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: TreeSelectValue; e: FocusEvent }) => void;
  /**
   * 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等
   */
  onInputChange?: (value: string, context?: SelectInputValueChangeContext) => void;
  /**
   * 下拉框显示或隐藏时触发
   */
  onPopupVisibleChange?: (visible: boolean, context: PopupVisibleChangeContext) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (options: RemoveOptions<DataOption>) => void;
  /**
   * 输入值变化时，触发搜索事件。主要用于远程搜索新数据
   */
  onSearch?: (filterWords: string) => void;
}

export type TreeSelectValue = string | number | object | Array<TreeSelectValue>;

export type TreeSelectValueChangeTrigger = 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck';

export interface RemoveOptions<T> {
  value: string | number | object;
  data: T;
  e?: MouseEvent;
}
