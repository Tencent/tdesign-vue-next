/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-29 18:11:36
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
  value?: TreeSelectValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TreeSelectValue;
  /**
   * 用于控制选中值的类型。假设数据选项为：[{ label: '姓名', value: 'name' }]，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据
   * @default value
   */
  valueType?: 'value' | 'object';
  /**
   * 输入框失去焦点时触发
   */
  onBlur?: (context: { value: TreeSelectValue; e: FocusEvent }) => void;
  /**
   * 节点选中状态变化时触发，context.node 表示当前变化的选项
   */
  onChange?: (value: Array<TreeSelectValue>, context: { node: TreeNodeModel<DataOption> }) => void;
  /**
   * 点击清除按钮时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: TreeSelectValue; e: FocusEvent }) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (options: RemoveOptions<DataOption>) => void;
  /**
   * 输入值变化时，触发搜索事件。主要用于远程搜索新数据
   */
  onSearch?: (filterWords: string) => void;
};

export type TreeSelectValue = string | number | Object | Array<TreeSelectValue>;

export interface RemoveOptions<T> { value: string | number; data: T; e: MouseEvent };
