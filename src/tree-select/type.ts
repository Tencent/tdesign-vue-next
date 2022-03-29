/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { PopupProps } from '../popup';
import { TreeProps, TreeNodeModel } from '../tree';
import { TNode, TreeOptionData } from '../common';

export interface TdTreeSelectProps<DataOption extends TreeOptionData = TreeOptionData> {
  /**
   * 是否允许清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义
   */
  collapsedItems?: TNode<{ value: DataOption[]; collapsedSelectedItems: DataOption[]; count: number }>;
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
   * 【讨论中】是否显示全选
   * @default false
   */
  showCheckAlll?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 透传 Tree 组件属性
   */
  treeProps?: TreeProps;
  /**
   * 选中值
   */
  value?: TreeSelectValueType;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TreeSelectValueType;
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
  onBlur?: (context: { value: TreeSelectValueType; e: FocusEvent }) => void;
  /**
   * 节点选中状态变化时触发，context.node 表示当前变化的选项
   */
  onChange?: (value: TreeSelectValueType, context: { node: TreeNodeModel<DataOption> }) => void;
  /**
   * 点击清除按钮时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: TreeSelectValueType; e: FocusEvent }) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (options: RemoveOptions<DataOption>) => void;
  /**
   * 输入值变化时，触发搜索事件。主要用于远程搜索新数据
   */
  onSearch?: (filterWords: string) => void;
}

export type TreeSelectValueType = string | number | object | Array<TreeSelectValueType>;

export interface RemoveOptions<T> {
  value: string | number | object;
  data: T;
  e: MouseEvent;
}
