import { ComponentPublicInstance } from 'vue';
import TreeNode from '@common/js/tree/tree-node';
import { TNode, TreeOptionData } from '../common';

import {
  TdTreeProps,
  TreeNodeValue as TdTreeNodeValue,
  TreeNodeModel,
  TreeInstanceFunctions,
} from './oldType/TdTreeProps';

import {
  TypeTreeEventState,
} from '@common/js/tree/types';

export type {
  TreeNodeValue,
  TreeNodeState,
} from './oldType/TdTreeProps';

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
