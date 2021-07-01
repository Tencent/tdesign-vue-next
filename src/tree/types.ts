import { ComponentPublicInstance } from 'vue';
import TreeNode from '../../common/js/tree/tree-node';

import {
  TdTreeProps,
  TreeNodeValue as TdTreeNodeValue,
  TreeNodeModel,
  TreeInstanceFunctions,
} from '@TdTypes/tree/TdTreeProps';

import {
  TypeTreeEventState,
} from '../../common/js/tree/types';

export type {
  TreeNodeValue,
  TreeNodeState,
} from '@TdTypes/tree/TdTreeProps';

export type TypeValueMode = TdTreeProps['valueMode'];

export type TypeTNodeProp = string | TNode;

export type TypeTreeNodeModel = TreeNodeModel<TreeOptionData>;

export type TypeTargetNode = TdTreeNodeValue | TreeNode | TypeTreeNodeModel;

export interface TypeEventState extends TypeTreeEventState {
  mouseEvent?: MouseEvent;
  event?: Event;
  path?: TreeNode[];
}

export interface TypeContext {
  node?: TypeTreeNodeModel;
  e?: MouseEvent;
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

export interface TypeTreeInstance extends ComponentPublicInstance, TreeInstanceFunctions {}

export interface TypeGetTNodeOption {
  node?: TreeNode;
}
