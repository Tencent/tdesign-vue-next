import { TreeNode, CascaderContextType, TreeNodeValue, TreeOptionData } from '../interface';

/**
 * 获取node的全部路径
 * @param node
 * @returns
 */
export function getFullPathLabel(node: TreeNode) {
  return node
    .getPath()
    .map((node: TreeNode) => node.label)
    .join('/');
}

/**
 * treeValue计算方法
 * @param value
 * @returns
 */
export const getTreeValue = (value: CascaderContextType['value']) => {
  let treeValue: TreeNodeValue[] = [];
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === 'object') {
      treeValue = (value as TreeOptionData[]).map((val) => val.value);
    } else if (value.length) {
      treeValue = value as TreeNodeValue[];
    }
  } else if (value) {
    if (typeof value === 'object') {
      treeValue = [(value as TreeOptionData).value];
    } else {
      treeValue = [value];
    }
  }
  return treeValue;
};

export default {
  getFullPathLabel,
};
