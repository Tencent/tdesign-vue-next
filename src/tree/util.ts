import { VNode, h, ComponentPublicInstance } from 'vue';
import TreeStore from '../../common/js/tree/tree-store';
import TreeNode from '../../common/js/tree/tree-node';
import {
  TypeMark,
  TypeLineModel,
  TypeTNodeProp,
  TypeGetTNodeOption,
  TypeTargetNode,
} from './types';

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
  return (
    list.map((el) => {
      const mark: TypeMark = {
        name,
        value: el.getAttribute(name) || '',
        el,
      };
      return mark;
    }).filter(mark => mark.value)
  );
};

export function getMark(name: string, element?: HTMLElement, root?: HTMLElement): TypeMark {
  const list = getParentMarks(name, element, root);
  const info = list.pop() || null;
  return info;
};

export function getTNode(prop: TypeTNodeProp, options: TypeGetTNodeOption = {}): string | VNode {
  let tnode = null;
  let item = null;
  const conf = {
    ...options,
  };
  if (typeof prop === 'function') {
    item = prop(h, conf.node?.getModel());
  } else if (typeof prop === 'string') {
    item = prop;
  }
  if (typeof item === 'string') {
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
  if (Array.isArray(node.children)) {
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
  return (typeof item === 'string' || typeof item === 'number');
}

export function getNode(store: TreeStore, item: TypeTargetNode): TreeNode {
  let node = null;
  let val = null;
  if (typeof item === 'string' || typeof item === 'number') {
    val = item;
  } else if (item && isTreeNodeValue(item.value)) {
    val = item.value;
  }
  node = store.getNode(val);
  return node;
};

export function callEmit(instance: ComponentPublicInstance, name: string, args: unknown[]): void {
  // const propName = `on${upperFirst(name)}`;
  // if (typeof instance[propName] === 'function') {
  //   instance[propName](...args);
  // };
  instance.$emit(name, ...args);
}
