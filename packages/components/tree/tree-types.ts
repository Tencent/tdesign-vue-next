import {
  TypeRef,
  TypeToRefs,
  TypeVNode,
  TreeNode,
  TypeVirtualScrollConfig,
  TypeTNode,
  TypeTreeOptionData,
  TypeScroll,
  TypeTreeEventState,
  TypeVModel,
  TypeCreateElement,
  TreeProps as AdaptTreeProps,
  TypeTreeInstance as AdaptTypeTreeInstance,
  TypeSetupContext,
} from './adapt';
import { TreeStore } from '@tdesign/common-js/tree/tree-store';

import { TdTreeProps, TreeNodeModel, TreeNodeValue, TreeNodeState } from './type';

// 在这个文件做统一的类型梳理
// 所有类型，接口，都用 Type 作为名称前缀

export * from './type';

export type TreeProps = AdaptTreeProps;
export type TypeTreeInstance = AdaptTypeTreeInstance;

/**
 * @deprecated
 */
export type TypeTreeProps<T extends TypeTreeOptionData = TypeTreeOptionData> = TdTreeProps<T>;

export type TypeTNodeState = TreeNodeState;
export type TypeTNodeValue = TreeNodeValue;
export type TypeTreeNode = TreeNode;
export type TypeTreeStore = TreeStore;
export type TypeValueMode = TreeProps['valueMode'];
export type TypeTNodeProp = boolean | string | TypeTNode<TypeTreeNodeModel>;
export type TypeTreeNodeModel = TreeNodeModel<TypeTreeOptionData>;
export type TypeTargetNode = TreeNodeValue | TypeTreeNode | TypeTreeNodeModel;
export type TypeTimer = ReturnType<typeof setTimeout>;

export interface TypeTreeRow extends TypeTreeNode {
  VIRTUAL_SCROLL_INDEX?: number;
}

export interface TypeEventState extends TypeTreeEventState {
  mouseEvent?: MouseEvent;
  event?: Event;
  path?: TypeTreeNode[];
  dragEvent?: DragEvent;
  dropPosition?: number;
}

export interface TypeDragEventState extends TypeEventState {
  dragEvent?: DragEvent;
  dropPosition?: number;
}

export interface TypeMark {
  name: string;
  value: string;
  el?: HTMLElement;
}

export interface TypeLineModel {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface TypeGetTNodeOption {
  node?: TreeNode;
  createElement?: TypeCreateElement;
}

export interface TypeRenderTNodeOption {
  node?: TypeTreeNodeModel;
}

export interface TypeScopedSlots {
  empty?: (opts?: TypeRenderTNodeOption) => TypeVNode;
  icon?: (opts?: TypeRenderTNodeOption) => TypeVNode;
  label?: (opts?: TypeRenderTNodeOption) => TypeVNode;
  line?: (opts?: TypeRenderTNodeOption) => TypeVNode;
  operations?: (opts?: TypeRenderTNodeOption) => TypeVNode;
}

export interface TypeDragHandle {
  handleDragStart: (state: TypeDragEventState) => void;
  handleDragEnd: (state: TypeDragEventState) => void;
  handleDragOver: (state: TypeDragEventState) => void;
  handleDragLeave: (state: TypeDragEventState) => void;
  handleDrop: (state: TypeDragEventState) => void;
}

export interface TypeTreeScope {
  store: TypeTreeStore;
  treeContentRef: TypeRef<HTMLDivElement>;
  treeProps?: TreeProps;
  scopedSlots?: TypeScopedSlots;
  drag?: TypeDragHandle;
  scrollProps?: TypeRef<TypeScroll>;
  virtualConfig?: TypeVirtualScrollConfig;
}

export interface TypeTreeState {
  props: TreeProps;
  context: TypeSetupContext;
  scope: TypeTreeScope;
  store: TypeTreeStore;
  nodes: TypeRef<TypeTreeNode[]>;
  allNodes: TypeRef<TypeTreeNode[]>;
  isScrolling: TypeRef<boolean>;
  treeContentRef: TypeRef<HTMLDivElement>;
  mouseEvent?: Event;
  virtualConfig?: TypeVirtualScrollConfig;
  setStore: (store: TypeTreeStore) => void;
  refProps: TypeToRefs<TreeProps>;
  vmValue: TypeVModel;
  vmActived: TypeVModel;
  vmExpanded: TypeVModel;
}

export interface TypeTreeItemState {
  stateId: string;
  props: TypeTreeItemProps;
  context: TypeSetupContext;
  treeScope: TypeTreeScope;
  node: TypeTreeNode;
  refProps: TypeToRefs<TypeTreeItemProps>;
  treeItemRef: TypeRef<HTMLDivElement>;
}

export interface TypeTreeItemProps {
  stateId: string;
  itemKey: string;
  treeScope: TypeTreeScope;
  rowIndex: number;
}

export interface TypeEventContext {
  node: TypeTreeNodeModel;
  e: MouseEvent;
}

export interface TypeExpandEventContext extends TypeEventContext {
  trigger: 'setItem' | 'node-click' | 'icon-click';
}

export interface TypeActiveEventContext extends TypeEventContext {
  trigger: 'setItem' | 'node-click';
}

export interface TypeChangeEventContext extends TypeEventContext {
  trigger: 'setItem' | 'node-click';
}
