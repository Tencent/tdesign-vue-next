import { VNode, h } from 'vue';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import { TypeMark, TypeLineModel, TypeTNodeProp, TypeGetTNodeOption, TypeTargetNode } from './interface';
import { TdTreeProps } from './type';

export function getParentsToRoot(element?: HTMLElement, root?: HTMLElement): HTMLElement[] {
  const list = [];
  let el: HTMLElement = element;
  while (el && el.parentNode) {
    list.push(el);
    if (el === root) {
      break;
    }
    el = el.parentNode as HTMLElement;
  }
  return list;
}

export function getParentMarks(name: string, element?: HTMLElement, root?: HTMLElement): TypeMark[] {
  const list = getParentsToRoot(element, root);
  return list
    .map((el) => {
      const mark: TypeMark = {
        name,
        value: el.getAttribute(name) || '',
        el,
      };
      return mark;
    })
    .filter((mark) => mark.value);
}

export function getMark(name: string, element?: HTMLElement, root?: HTMLElement): TypeMark {
  const list = getParentMarks(name, element, root);
  const info = list.pop() || null;
  return info;
}

export function getTNode(prop: TypeTNodeProp, options: TypeGetTNodeOption = {}): string | VNode {
  let tnode = null;
  let item = null;
  const conf = {
    ...options,
  };
  if (isFunction(prop)) {
    item = prop(h, conf.node?.getModel());
  } else if (isString(prop)) {
    item = prop;
  }
  if (isString(item)) {
    tnode = item;
  } else if (item) {
    tnode = item as VNode;
  }
  return tnode;
}

// 获取一个节点层级位置的连线模型
export function getLineModel(nodes: TreeNode[], node: TreeNode, index: number): TypeLineModel {
  // 标记 [上，右，下，左] 是否有连线
  const lineModel: TypeLineModel = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  let nodeChildren = [];
  if (isArray(node.children)) {
    nodeChildren = node.children;
  }
  const childNode = nodes[index - 1] || null;
  const nodeItemIndex = childNode ? childNode.getIndex() : 0;

  if (index === 0) {
    lineModel.left = !!node.parent;
    lineModel.bottom = node.children && node.expanded;
    lineModel.right = node.parent && !node.children;
  } else if (index === 1) {
    lineModel.top = true;
    lineModel.right = true;
    lineModel.bottom = nodeItemIndex < nodeChildren.length - 1;
  } else if (nodeItemIndex < nodeChildren.length - 1) {
    lineModel.top = true;
    lineModel.bottom = true;
  }

  return lineModel;
}

export function isTreeNodeValue(item: unknown): boolean {
  return isString(item) || isNumber(item);
}

export function getNode(store: TreeStore, item: TypeTargetNode): TreeNode {
  let node = null;
  let val = null;
  if (isString(item) || isNumber(item)) {
    val = item;
  } else if (item && isTreeNodeValue(item.value)) {
    val = item.value;
  }
  node = store.getNode(val);
  return node;
}

// 统一获取tree的config
export const getStoreConfig = (props: TdTreeProps) => {
  // 统一更新选项，然后在 store 统一识别属性更新
  const storeProps = pick(props, [
    'keys',
    'expandAll',
    'expandLevel',
    'expandMutex',
    'expandParent',
    'activable',
    'activeMultiple',
    'disabled',
    'draggable',
    'checkable',
    'checkStrictly',
    'load',
    'lazy',
    'valueMode',
    'filter',
    'allowFoldNodeOnFilter',
  ]);
  return storeProps;
};
