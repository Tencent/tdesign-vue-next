import { Ref } from 'vue';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import { TreeOptionData } from '../common';
import { getNode } from './util';

import { TreeNodeValue, TreeNodeState, TypeTreeNodeModel } from './interface';

export default function useExposeFunc(treeStore: Ref<TreeStore>, expose: (exposed: Record<string, any>) => void) {
  const setItem = (value: TreeNodeValue, options: TreeNodeState) => {
    const node: TreeNode = treeStore.value.getNode(value);
    const spec = options;
    const keys = Object.keys(spec);
    if (node && spec) {
      ['expanded', 'actived', 'checked'].forEach((name) => {
        if (keys.includes(name)) {
          // this[`set${upperFirst(name)}`](node, spec[name]);
          // delete spec[name];
        }
      });
      node.set(spec);
    }
  };

  const getItem = (value: TreeNodeValue): TypeTreeNodeModel => {
    const node: TreeNode = treeStore.value.getNode(value);
    return node?.getModel();
  };

  const getItems = (value?: TreeNodeValue): TypeTreeNodeModel[] => {
    const nodes = treeStore.value.getNodes(value);
    return nodes.map((node: TreeNode) => node.getModel());
  };

  const appendTo = (para?: TreeNodeValue, item?: TreeOptionData | TreeOptionData[]) => {
    let list = [];
    if (Array.isArray(item)) {
      list = item;
    } else {
      list = [item];
    }
    list.forEach((item) => {
      const val = item?.value || '';
      const node = getNode(treeStore.value, val);
      if (node) {
        treeStore.value.appendNodes(para, node);
      } else {
        treeStore.value.appendNodes(para, item);
      }
    });
  };

  const insertBefore = (value: TreeNodeValue, item: TreeOptionData) => {
    const val = item?.value || '';
    const node = getNode(treeStore.value, val);
    if (node) {
      // TODO type fix
      treeStore.value.insertBefore(value, node as any);
    } else {
      treeStore.value.insertBefore(value, item);
    }
  };

  const insertAfter = (value: TreeNodeValue, item: TreeOptionData) => {
    const val = item?.value || '';
    const node = getNode(treeStore.value, val);
    if (node) {
      // TODO type fix
      treeStore.value.insertAfter(value, node as any);
    } else {
      treeStore.value.insertAfter(value, item);
    }
  };

  const remove = (value?: TreeNodeValue) => {
    return treeStore.value.remove(value);
  };

  const getIndex = (value: TreeNodeValue) => {
    return treeStore.value.getNodeIndex(value);
  };

  const getParent = (value: TreeNodeValue) => {
    const node = treeStore.value.getParent(value);
    return node?.getModel();
  };

  const getParents = (value: TreeNodeValue) => {
    const nodes = treeStore.value.getParents(value);
    return nodes.map((node: TreeNode) => node.getModel());
  };

  const getPath = (value: TreeNodeValue) => {
    const node = treeStore.value.getNode(value);
    let pathNodes: any[] = [];
    if (node) {
      pathNodes = node.getPath().map((node: TreeNode) => node.getModel());
    }
    return pathNodes;
  };

  expose({
    setItem,
    getItem,
    getItems,
    appendTo,
    insertBefore,
    insertAfter,
    remove,
    getIndex,
    getParent,
    getParents,
    getPath,
  });
}
