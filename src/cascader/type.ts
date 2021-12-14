/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { CheckboxProps } from '../checkbox';
import { PopupProps } from '../popup';
import { TreeNodeModel } from '../tree';
import { TNode, TreeOptionData, SizeEnum } from '../common';

export interface TdCascaderProps<CascaderOption extends TreeOptionData = TreeOptionData> {
  /**
   * 参考 checkbox 组件 API
   */
  checkProps?: CheckboxProps;
  /**
   * 父子节点选中状态不再关联，可各自选中或取消
   * @default false
   */
  checkStrictly?: boolean;
  /**
   * 是否支持清空选项
   * @default false
   */
  clearable?: boolean;
  /**
   * 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义
   */
  collapsedItems?: TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number }>;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 无匹配选项时的内容，默认全局配置为 '暂无数据'
   */
  empty?: string | TNode;
  /**
   * 是否可搜索
   * @default false
   */
  filterable?: boolean;
  /**
   * 用来定义 value / label / children 在 `options` 中对应的字段别名
   */
  keys?: CascaderKeysType;
  /**
   * 延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载
   * @default true
   */
  lazy?: boolean;
  /**
   * 加载子树数据的方法（仅当节点 children 为 true 时生效）
   */
  load?: (node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>;
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
   * 可选项数据源
   * @default []
   */
  options?: Array<CascaderOption>;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 参考 popup 组件 API
   */
  popupProps?: PopupProps;
  /**
   * 输入框中是否显示选中值的完整路径
   * @default true
   */
  showAllLevels?: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 展开下一层级的方式
   * @default click
   */
  trigger?: 'click' | 'hover';
  /**
   * 选中项的值
   * @default []
   */
  value?: CascaderValue<CascaderOption>;
  /**
   * 选中项的值，非受控属性
   * @default []
   */
  defaultValue?: CascaderValue<CascaderOption>;
  /**
   * 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点
   * @default onlyLeaf
   */
  valueMode?: 'onlyLeaf' | 'parentFirst' | 'all';
  /**
   * 当输入框失去焦点时触发
   */
  onBlur?: (context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void;
  /**
   * 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源
   */
  onChange?: (value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void;
  /**
   * 多选模式下，选中数据被移除时触发
   */
  onRemove?: (context: RemoveContext<CascaderOption>) => void;
}

export interface CascaderKeysType {
  value?: string;
  label?: string;
  children?: string;
}

export type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>;

export interface CascaderChangeContext<CascaderOption> {
  node?: TreeNodeModel<CascaderOption>;
  source: CascaderChangeSource;
}

export type CascaderChangeSource = 'invalid-value' | 'checked' | 'clear' | 'unchecked';

export interface RemoveContext<T> {
  value: CascaderValue<T>;
  node: TreeNodeModel<T>;
}
