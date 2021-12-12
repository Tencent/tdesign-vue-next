/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { PopupProps } from '../popup';
import { TNode, SizeEnum } from '../common';

export interface TdSelectProps<T extends SelectOption = SelectOption> {
  /**
   * 是否有边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 是否可以清空选项
   * @default false
   */
  clearable?: boolean;
  /**
   * 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义
   */
  collapsedItems?: TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number }>;
  /**
   * 是否允许用户创建新条目，需配合 filterable 使用
   * @default false
   */
  creatable?: boolean;
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
   * 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据
   */
  filter?: (filterWords: string, option: T) => boolean | Promise<boolean>;
  /**
   * 是否可搜索
   * @default false
   */
  filterable?: boolean;
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: SelectKeysType;
  /**
   * 是否为加载状态
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
   * 数据化配置选项内容
   * @default []
   */
  options?: Array<T>;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 透传给 popup 组件的参数
   */
  popupProps?: PopupProps;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
   * @default false
   */
  reserveKeyword?: boolean;
  /**
   * 【讨论中】是否显示全选
   * @default false
   */
  showCheckAlll?: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 选中值
   */
  value?: SelectValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: SelectValue;
  /**
   * 自定义选中项呈现方式
   */
  valueDisplay?: TNode<{ value: T[]; onClose: () => void }>;
  /**
   * 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。
   * @default value
   */
  valueType?: 'value' | 'object';
  /**
   * 输入框失去焦点时触发
   */
  onBlur?: (context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void;
  /**
   * 选中值变化时触发
   */
  onChange?: (value: SelectValue) => void;
  /**
   * 点击清除按钮时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 当选择新创建的条目时触发
   */
  onCreate?: (value: string | number) => void;
  /**
   * 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值
   */
  onEnter?: (context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (options: SelectRemoveContext<T>) => void;
  /**
   * 输入值变化时，触发搜索事件。主要用于远程搜索新数据
   */
  onSearch?: (filterWords: string) => void;
  /**
   * 下拉框隐藏/显示时触发
   */
  onVisibleChange?: (visible: boolean) => void;
};

export interface TdOptionProps {
  /**
   * 用于定义复杂的选项内容
   */
  content?: string | TNode;
  /**
   * 用于定义复杂的选项内容。同 content
   */
  default?: string | TNode;
  /**
   * 是否禁用该选项
   * @default false
   */
  disabled?: boolean;
  /**
   * 选项名称
   * @default ''
   */
  label?: string;
  /**
   * 选项值
   */
  value?: string | number;
};

export interface TdOptionGroupProps {
  /**
   * 是否显示分隔线
   * @default true
   */
  divider?: boolean;
  /**
   * 分组别名
   * @default ''
   */
  label?: string;
};

export interface SelectKeysType { value?: string; label?: string };

export type SelectValue<T extends SelectOption = SelectOption> = string | number | T | Array<SelectValue<T>>;

export interface SelectRemoveContext<T> { value: string | number; data: T; e: MouseEvent | KeyboardEvent };

export type SelectOption = TdOptionProps | SelectOptionGroup;

export interface SelectOptionGroup extends TdOptionGroupProps { group: string; children: Array<TdOptionProps> };
