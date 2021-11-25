import { getFullPathLabel, getTreeValue } from './helper';
import { TreeNode, TreeNodeValue, CascaderContextType } from '../interface';

/**
 * input和treeStore变化的副作用
 * @param inputVal
 * @param treeStore
 * @param setTreeNodes
 * @returns
 */
export const treeNodesEffect = (
  inputVal: CascaderContextType['inputVal'],
  treeStore: CascaderContextType['treeStore'],
  setTreeNodes: CascaderContextType['setTreeNodes'],
) => {
  if (!treeStore) return;
  let nodes = [];
  if (inputVal) {
    nodes = treeStore.nodes.filter((node: TreeNode) => {
      const fullPathLabel = getFullPathLabel(node);
      return fullPathLabel.indexOf(inputVal) > -1 && node.isLeaf();
    });
  } else {
    nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
  }
  setTreeNodes(nodes);
};

/**
 * 初始化展开阶段与展开状态副作用
 * @param treeStore
 * @param treeValue
 * @param expend
 */
export const treeStoreExpendEffect = (
  treeStore: CascaderContextType['treeStore'],
  value: CascaderContextType['value'],
  expend: TreeNodeValue[],
) => {
  const treeValue = getTreeValue(value);

  if (!treeStore) return;
  // init expanded, 无expend状态时设置
  if (Array.isArray(treeValue) && expend.length === 0) {
    const expandedMap = new Map();
    const [val] = treeValue;
    if (val) {
      expandedMap.set(val, true);
      const node = treeStore.getNode(val);
      if (!node) return;
      node.getParents().forEach((tn: TreeNode) => {
        expandedMap.set(tn.value, true);
      });
      const expandedArr = Array.from(expandedMap.keys());
      treeStore.replaceExpanded(expandedArr);
    } else {
      treeStore.resetExpanded();
    }
  }
  // 本地维护 expend，更加可控，不需要依赖于 tree 的状态
  if (treeStore.getExpanded() && expend.length) {
    treeStore.replaceExpanded(expend);
  }
  treeStore.refreshNodes();
};
