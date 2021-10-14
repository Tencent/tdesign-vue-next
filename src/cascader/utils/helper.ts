import { TreeNode } from '../interface';

// utils function
export function getFullPathLabel(node: TreeNode) {
  return node
    .getPath()
    .map((node: TreeNode) => node.label)
    .join('/');
}

export default {
  getFullPathLabel,
};
