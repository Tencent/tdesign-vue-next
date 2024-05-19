import { TreeNode } from './tree-node';
import { TreeOptionData } from '../common';

// ------ 自动规范类型 start -------

export type TreeNodeValue = string | number;

export interface KeysType {
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
}

export interface TreeNodeState {
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
   * 节点是否为半选中状态
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 节点是否被禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 节点是否可拖拽
   * @default false
   */
  draggable?: boolean;
  /**
   * 节点是否可视
   * @default false
   */
  visible?: boolean;
  /**
   * 子节点数据是否在加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 节点值
   */
  value?: TreeNodeValue;
  /**
   * 节点标签文案
   * @default ''
   */
  label?: any;
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
   * 节点是否被激活
   * @default false
   */
  actived?: boolean;
  /**
   * 节点是否允许被激活
   * @default false
   */
  activable?: boolean;
}

export interface TreeNodeModelProps<DataOption extends TreeOptionData = TreeOptionData> {
  /**
   * 当前节点值或者ID
   */
  value: TreeNodeValue;
  /**
   * 当前节点标签文本
   */
  label: any;
  /**
   * 当前节点是否处于高亮激活态
   */
  actived: boolean;
  /**
   * 当前节点是否被选中
   */
  checked: boolean;
  /**
   * 节点数据
   */
  data: DataOption;
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
   * 当前节点是否被禁用
   */
  disabled: boolean;
}

export interface TreeNodeModel<
  T extends TreeOptionData = TreeOptionData
> extends TreeNodeModelProps {
  /**
   * 追加子节点数据
   */
  appendData: (data: T | Array<T>) => void;
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
  getParents: () => TreeNodeModel[];
  /**
   * 获取当前节点的直接子节点
   */
  getChildren: (deep?: boolean) => boolean | TreeNodeModel[];
  /**
   * 获取节点全路径
   */
  getPath: () => TreeNodeModel[];
  /**
   * 获取根节点
   */
  getRoot: () => TreeNodeModel;
  /**
   * 获取兄弟节点，包含自己在内
   */
  getSiblings: () => TreeNodeModel[];
  /**
   * 在当前节点前插入新节点
   */
  insertAfter: (newData: T) => void;
  /**
   * 在当前节点前插入新节点
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
}

// ------ 自动规范类型 end -------

export type TypeTargetNode = TreeNodeValue | TreeNode;

export type TypeIdMap = Map<TreeNodeValue, boolean>;

export type TypeValueMode = 'all' | 'parentFirst' | 'onlyLeaf';

export type TypeTimer = ReturnType<typeof setTimeout>;

export interface TypeSettingOptions {
  directly?: boolean;
  isAction?: boolean;
}

export interface TypeRelatedNodesOptions {
  reverse?: boolean;
  withParents?: boolean;
}

export interface TypeTreeFilterOptions {
  level?: number;
  filter?: Function;
  props?: TreeNodeState;
}

export interface TypeTreeNodeData extends TreeNodeState {
  children?: TypeTreeNodeData[] | boolean;
  [key: string]: any;
}

export type TypeTreeItem = TypeTreeNodeData | TreeNode;

export type TypeTreeNodeModel = TreeNodeModel<TypeTreeNodeData>

export type TypeTreeFilter = (node: TreeNodeModel<TypeTreeNodeData>) => boolean;

export type TypeUpdatedMap = Map<TreeNodeValue, string>;

export type TypeFnOperation = (node: TreeNode) => void;

export interface TypeTreeEventState {
  node?: TreeNode;
  nodes?: TreeNode[];
  map?: TypeUpdatedMap;
  data?: TypeTreeNodeData[];
}

export interface TypeTreeStoreOptions {
  // 自动生成的 value 的前缀
  prefix?: string;
  // 数据字段映射
  // keys?: { [key: string]: string };
  keys?: KeysType;
  // 是否展开全部
  expandAll?: boolean;
  // 初始展开级别
  expandLevel?: number;
  // 是否互斥展开(手风琴)
  expandMutex?: boolean;
  // 展开子节点时，是否展开父节点
  expandParent?: boolean;
  // 是否可高亮
  activable?: boolean;
  // 是否可多选高亮
  activeMultiple?: boolean;
  // 是否可选择
  checkable?: boolean;
  // 复选框不联动更新
  checkStrictly?: boolean;
  // 禁用整个树
  disabled?: boolean;
  // 指定节点禁用条件
  disableCheck?: boolean | TypeTreeFilter;
  // 节点是否可拖动
  draggable?: boolean,
  // 节点加载函数
  load?: Function;
  // 是否延迟加载
  lazy?: boolean;
  // 取值方式，可选值 ['all', 'parentFirst', 'onlyLeaf']
  valueMode?: TypeValueMode;
  // 节点过滤函数
  // filter?: (node: TreeNode) => boolean;
  filter?: TypeTreeFilter;
  // load函数运行后触发
  onLoad?: Function;
  // 节点增删改查后触发
  onReflow?: Function;
  // 节点信息变更后触发
  onUpdate?: Function;
  // 是否允许在过滤时折叠节点
  allowFoldNodeOnFilter?: Boolean;
}
