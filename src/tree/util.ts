import { VNode } from 'vue';
import TreeNode from '../../common/js/tree/TreeNode';

export function getParentsToRoot(element?: HTMLElement, root?: HTMLElement): Array<HTMLElement> {
  const list = [];
  let el: any = element;
  while (el && el.parentNode) {
    list.push(el);
    if (el === root) {
      break;
    }
    el = el.parentNode;
  }
  return list;
}

export interface Role {
  name: string;
  el?: HTMLElement;
}

export function getParentRoles(element?: HTMLElement, root?: HTMLElement): Array<Role> {
  const list = getParentsToRoot(element, root);
  return (
    list.map((el) => {
      const role: Role = {
        name: el.getAttribute('role') || '',
        el,
      };
      return role;
    }).filter(role => role.name)
  );
};

export function getRole(element?: HTMLElement, root?: HTMLElement): Role {
  const list = getParentRoles(element, root);
  const info = list.pop() || null;
  return info;
};

export function getTNode(prop: any, options: any): string | VNode {
  let tnode = null;
  let item = null;
  const conf = {
    ...options,
  };
  if (typeof prop === 'function') {
    item = prop(conf.createElement, conf.node);
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

export function mergeKeysToArray(fromMap: Map<string, boolean>, list: any[]): void {
  let index = 0;
  const map = new Map(fromMap);
  while (index < list.length) {
    const key = list[index];
    if (map.has(key)) {
      map.delete(key);
      index += 1;
    } else {
      list.splice(index, 1);
    }
  }
  const resumeItems = Array.from(map.keys());
  resumeItems.forEach((key) => {
    list.push(key);
  });
}

export interface LineModel {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// 获取一个节点层级位置的连线模型
export function getLineModel(nodes: TreeNode[], node: TreeNode, index: number): LineModel {
  // 标记 [上，右，下，左] 是否有连线
  const lineModel: LineModel = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  let nodeChildren = [];
  if (Array.isArray(node.children)) {
    nodeChildren = node.children;
  }
  const childNode = nodes[index - 1] || null;
  const nodeItemIndex = childNode ? childNode.getIndex() : 0;

  if (index === 0) {
    if (node.parent) {
      lineModel.left = 1;
    }
    if (!node.children) {
      lineModel.right = 1;
    } else if (node.expanded) {
      lineModel.bottom = 1;
    }
  } else if (index === 1) {
    lineModel.top = 1;
    lineModel.right = 1;
    if (nodeItemIndex < nodeChildren.length - 1) {
      lineModel.bottom = 1;
    }
  } else if (nodeItemIndex < nodeChildren.length - 1) {
    lineModel.top = 1;
    lineModel.bottom = 1;
  }

  return lineModel;
}

