/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { CheckboxProps } from '../checkbox';
import { TNode, TreeOptionData } from '../common';

export interface TdTreeProps<T extends TreeOptionData = TreeOptionData> {
  /**
   * 节点是否可高亮
   * @default false
   */
  activable?: boolean;
  /**
   * 高亮的节点值
   */
  actived?: Array<TreeNodeValue>;
  /**
   * 高亮的节点值，非受控属性
   */
  defaultActived?: Array<TreeNodeValue>;
  /**
   * 是否允许多个节点同时高亮
   * @default false
   */
  activeMultiple?: boolean;
  /**
   * 隐藏节点复选框
   * @default false
   */
  checkable?: boolean;
  /**
   * 透传属性到 checkbox 组件。参考 checkbox 组件 API
   */
  checkProps?: CheckboxProps;
  /**
   * 父子节点选中状态不再关联，可各自选中或取消
   * @default false
   */
  checkStrictly?: boolean;
  /**
   * 树数据，泛型 `T` 表示树节点 TS 类型
   * @default []
   */
  data?: Array<T>;
  /**
   * 禁用复选框，可支持禁用不同的行
   * @default false
   */
  disableCheck?: boolean | ((node: TreeNodeModel) => boolean);
  /**
   * 是否禁用树操作
   */
  disabled?: boolean;
  /**
   * 数据为空时展示的文本
   * @default ''
   */
  empty?: string | TNode;
  /**
   * 是否展开全部节点
   * @default false
   */
  expandAll?: boolean;
  /**
   * 展开的节点值
   * @default []
   */
  expanded?: Array<TreeNodeValue>;
  /**
   * 展开的节点值，非受控属性
   * @default []
   */
  defaultExpanded?: Array<TreeNodeValue>;
  /**
   * 默认展开的级别，第一层为 0
   * @default 0
   */
  expandLevel?: number;
  /**
   * 同级别展开互斥，手风琴效果
   * @default false
   */
  expandMutex?: boolean;
  /**
   * 是否支持点击节点也能展开收起
   * @default false
   */
  expandOnClickNode?: boolean;
  /**
   * 展开子节点时是否自动展开父节点
   * @default false
   */
  expandParent?: boolean;
  /**
   * 节点过滤方法，只呈现返回值为 true 的节点，泛型 `T` 表示树节点 TS 类型
   */
  filter?: (node: TreeNodeModel<T>) => boolean;
  /**
   * 节点是否有悬浮状态
   */
  hover?: boolean;
  /**
   * 节点图标，可自定义
   * @default true
   */
  icon?: boolean | TNode<TreeNodeModel>;
  /**
   * 用来定义 value / label / children 在 `options` 中对应的字段别名
   */
  keys?: TreeKeysType;
  /**
   * 自定义节点内容，值为 false 不显示，值为 true 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 TS 类型
   * @default true
   */
  label?: string | boolean | TNode<TreeNodeModel<T>>;
  /**
   * 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载
   * @default true
   */
  lazy?: boolean;
  /**
   * 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线
   * @default false
   */
  line?: boolean | TNode;
  /**
   * 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 TS 类型
   */
  load?: (node: TreeNodeModel<T>) => Promise<Array<T>>;
  /**
   * 自定义节点操作项，泛型 `T` 表示树节点 TS 类型
   */
  operations?: TNode<TreeNodeModel<T>>;
  /**
   * 节点展开折叠时是否使用过渡动画
   * @default true
   */
  transition?: boolean;
  /**
   * 选中值（组件为可选状态时）
   * @default []
   */
  value?: Array<TreeNodeValue>;
  /**
   * 选中值（组件为可选状态时），非受控属性
   * @default []
   */
  defaultValue?: Array<TreeNodeValue>;
  /**
   * 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点
   * @default onlyLeaf
   */
  valueMode?: 'onlyLeaf' | 'parentFirst' | 'all';
  /**
   * 节点激活时触发，泛型 `T` 表示树节点 TS 类型
   */
  onActive?: (value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void;
  /**
   * 节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 `T` 表示树节点 TS 类型
   */
  onChange?: (value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void;
  /**
   * 节点点击时触发，泛型 `T` 表示树节点 TS 类型
   */
  onClick?: (context: { node: TreeNodeModel<T>; e: MouseEvent }) => void;
  /**
   * 节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型
   */
  onExpand?: (value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent }) => void;
  /**
   * 异步加载后触发，泛型 `T` 表示树节点 TS 类型
   */
  onLoad?: (context: { node: TreeNodeModel<T> }) => void;
};

/** 组件实例方法 */
export interface TreeInstanceFunctions<T extends TreeOptionData = TreeOptionData> {
  /**
   * 为指定节点添加子节点，默认添加到根节点，泛型 `T` 表示树节点 TS 类型
   */
  appendTo?: (value: TreeNodeValue, newData: T | Array<T>) => void;
  /**
   * 获取指定节点下标
   */
  getIndex?: (value: TreeNodeValue) => number;
  /**
   * 获取指定节点所有信息，泛型 `T` 表示树节点 TS 类型
   */
  getItem?: (value: TreeNodeValue) => TreeNodeModel<T>;
  /**
   * 获取某节点的全部子孙节点；参数为空，则表示获取整棵树的全部节点，泛型 `T` 表示树节点 TS 类型
   */
  getItems?: (value?: TreeNodeValue) => Array<TreeNodeModel<T>>;
  /**
   * 获取指定节点的直属父节点，泛型 `T` 表示树节点 TS 类型
   */
  getParent?: (value: TreeNodeValue) => TreeNodeModel<T>;
  /**
   * 获取指定节点的全部父节点，泛型 `T` 表示树节点 TS 类型
   */
  getParents?: (value: TreeNodeValue) => TreeNodeModel<T>[];
  /**
   * 自下而上获取全路径数据，泛型 `T` 表示树节点 TS 类型
   */
  getPath?: (value: TreeNodeValue) => TreeNodeModel<T>[];
  /**
   * 插入新节点到指定节点后面，泛型 `T` 表示树节点 TS 类型
   */
  insertAfter?: (value: TreeNodeValue, newData: T) => void;
  /**
   * 插入新节点到指定节点前面，泛型 `T` 表示树节点 TS 类型
   */
  insertBefore?: (value: TreeNodeValue, newData: T) => void;
  /**
   * 移除指定节点
   */
  remove?: (value: TreeNodeValue) => void;
  /**
   * 设置节点状态
   */
  setItem?: (value: TreeNodeValue, options: TreeNodeState) => void;
}

export interface TreeNodeState {
  /**
   * 节点是否允许被激活
   * @default false
   */
  activable?: boolean;
  /**
   * 节点是否被激活
   * @default false
   */
  actived?: boolean;
  /**
   * 节点是否允许被选中
   * @default false
   */
  checkable?: boolean;
  /**
   * 节点是否被选中
   * @default false
   */
  checked?: boolean;
  /**
   * 节点是否被禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 节点是否已展开
   * @default false
   */
  expanded?: boolean;
  /**
   * 子节点是否互斥展开
   * @default false
   */
  expandMutex?: boolean;
  /**
   * 节点是否为半选中状态
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 节点标签文案
   * @default ''
   */
  label?: string;
  /**
   * 子节点数据是否在加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 节点值
   */
  value?: string | number;
  /**
   * 节点是否可视
   * @default false
   */
  visible?: boolean;
};

export interface TreeNodeModel<T extends TreeOptionData = TreeOptionData> extends TreeNodeState {
  /**
   * 当前节点是否处于高亮激活态
   */
  actived: boolean;
  /**
   * 当前节点是否被选中
   */
  checked: boolean;
  /**
   * 节点数据，泛型 `T` 表示树节点 TS 类型
   */
  data: T;
  /**
   * 当前节点是否展开
   */
  expanded: boolean;
  /**
   * 当前节点是否处于半选状态
   */
  indeterminate: boolean;
  /**
   * 当前节点是否处于加载中状态
   */
  loading: boolean;
  /**
   * 追加子节点数据，泛型 `T` 表示树节点 TS 类型
   */
  appendData: (data: T | Array<T>) => void;
  /**
   * 默认获取当前节点的全部子节点，deep 值为 true 则表示获取全部子孙节点
   */
  getChildren: (deep: boolean) => Array<TreeNodeModel> | boolean;
  /**
   * 获取节点在父节点的子节点列表中的位置，如果没有父节点，则获取节点在根节点列表的位置
   */
  getIndex: () => number;
  /**
   * 获取节点所在的层级
   */
  getLevel: () => number;
  /**
   * 获取单个父节点
   */
  getParent: () => TreeNodeModel;
  /**
   * 获取所有父节点
   */
  getParents: () => Array<TreeNodeModel>;
  /**
   * 获取节点全路径
   */
  getPath: () => Array<TreeNodeModel>;
  /**
   * 获取根节点
   */
  getRoot: () => TreeNodeModel;
  /**
   * 获取兄弟节点，包含自己在内
   */
  getSiblings: () => Array<TreeNodeModel>;
  /**
   * 在当前节点前插入新节点，泛型 `T` 表示树节点 TS 类型
   */
  insertAfter: (newData: T) => void;
  /**
   * 在当前节点前插入新节点，泛型 `T` 表示树节点 TS 类型
   */
  insertBefore: (newData: T) => void;
  /**
   * 是否为兄弟节点中的第一个节点
   */
  isFirst: () => boolean;
  /**
   * 是否为兄弟节点中的最后一个节点
   */
  isLast: () => boolean;
  /**
   * 是否为叶子节点
   */
  isLeaf: () => boolean;
  /**
   * 移除当前节点或当前节点的子节点，值为空则移除当前节点，值存在则移除当前节点的子节点
   */
  remove: (value?: TreeNodeValue) => void;
  /**
   * 设置当前节点数据，数据变化可自动刷新页面，泛型 `T` 表示树节点 TS 类型
   */
  setData: (data: T) => void;
};

export interface TreeKeysType { value?: string; label?: string; children?: string };

export type TreeNodeValue = string | number;
