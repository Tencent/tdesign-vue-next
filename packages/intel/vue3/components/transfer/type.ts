/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { KeysType, TNode } from '@td/shared/interface';
import type { TdCheckboxProps } from '../checkbox/type';
import type { PageInfo, TdPaginationProps } from '../pagination/type';
import type { TdInputProps } from '../input/type';

export interface TdTransferProps<T extends DataOption = DataOption> {
  /**
   * 用于控制复选框属性
   */
  checkboxProps?: TdCheckboxProps;
  /**
   * 数据列表选中项
   * @default []
   */
  checked?: Array<TransferValue>;
  /**
   * 数据列表选中项，非受控属性
   * @default []
   */
  defaultChecked?: Array<TransferValue>;
  /**
   * 全量数据
   * @default []
   */
  data?: Array<T>;
  /**
   * 穿梭框可操作方向
   * @default both
   */
  direction?: 'left' | 'right' | 'both';
  /**
   * 禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：[true, false] 或者 true
   */
  disabled?: boolean | Array<boolean>;
  /**
   * 列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容
   * @default ''
   */
  empty?: EmptyType | Array<EmptyType> | TNode;
  /**
   * 穿梭框底部内容
   */
  footer?: Array<string | TNode> | TNode<{ type: TransferListType }>;
  /**
   * 用来定义 value / label / disabled 在 `data` 中对应的字段别名，示例：`{ label: 'text', value: 'id' }`，表示选项文本取 `text` 字段，选项值取 `id` 字段
   */
  keys?: KeysType;
  /**
   * 方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：['向左', '向右'] 或者 `[() => <i class='left' />, () => <i class='left' />]` 或者 `(h, direction) => direction === 'left' ? '《' : '》'`
   */
  operation?: Array<string | TNode> | TNode<{ direction: 'left' | 'right' }>;
  /**
   * 分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件
   */
  pagination?: TdPaginationProps | Array<TdPaginationProps>;
  /**
   * 搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框；值类型为对象，用于透传 Props 到 Input 组件；值类型为数组，则分别表示控制两侧搜索框
   * @default false
   */
  search?: SearchOption | Array<SearchOption>;
  /**
   * 是否显示全选，值类型为数组则表示分别控制源列表和目标列表
   * @default true
   */
  showCheckAll?: boolean | Array<boolean>;
  /**
   * 是否允许通过拖拽对目标列表进行排序
   * @default false
   */
  targetDraggable?: boolean;
  /**
   * 目标数据列表排列顺序
   * @default original
   */
  targetSort?: 'original' | 'push' | 'unshift';
  /**
   * 穿梭框标题，示例：['源列表', '目标列表'] 或者 `[() => 'A', () => 'B']` 或者 `({ type }) => type === 'source' ? '源' : '目标'`
   * @default []
   */
  title?: Array<TitleType> | TNode<{ type: TransferListType }>;
  /**
   * 自定义渲染节点
   */
  transferItem?: TNode<TransferItem<T>>;
  /**
   * 目标数据列表数据
   * @default []
   */
  value?: Array<TransferValue>;
  /**
   * 目标数据列表数据，非受控属性
   * @default []
   */
  defaultValue?: Array<TransferValue>;
  /**
   * 数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项
   */
  onChange?: (targetValue: Array<TransferValue>, context: TargetParams) => void;
  /**
   * 源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表
   */
  onCheckedChange?: (options: CheckedOptions) => void;
  /**
   * 分页发生变化时触发
   */
  onPageChange?: (page: PageInfo, context: { type: TransferListType }) => void;
  /**
   * 列表滚动时触发，bottomDistance 表示元素滚动到底部的距离
   */
  onScroll?: (options: { e: Event; bottomDistance: number; type: TransferListType }) => void;
  /**
   * 搜索时触发，options.query 表示用户输入的内容
   */
  onSearch?: (options: SearchContext) => void;
}

export type EmptyType = string | TNode;

export type SearchOption = boolean | TdInputProps;

export type TitleType = string | TNode;

export type TransferListType = 'source' | 'target';

export interface TransferItem<T extends DataOption = DataOption> {
  data: T;
  index: number;
  type: TransferListType;
}

export interface TargetParams {
  type: TransferListType;
  movedValue: Array<TransferValue>;
}

export interface CheckedOptions {
  checked: Array<TransferValue>;
  sourceChecked: Array<TransferValue>;
  targetChecked: Array<TransferValue>;
  type: TransferListType;
}

export interface SearchContext {
  query: string;
  type: TransferListType;
  trigger: 'input' | 'enter';
  e: InputEvent | KeyboardEvent;
}

export type DataOption = { label?: string; value?: TransferValue; disabled?: boolean } & Record<string, any>;

export type TransferValue = string | number;
