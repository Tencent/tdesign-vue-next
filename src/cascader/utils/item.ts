import { CascaderContextType, TreeNode, TreeNodeValue } from '../interface';

/**
 * 是否显示省略计算方法
 * @param node
 * @param size
 * @returns
 */
export function getLabelIsEllipsis(node: TreeNode, size: CascaderContextType['size']) {
  const sizeMap = {
    small: 11,
    medium: 9,
    large: 8,
  };
  return sizeMap[size] < node.label.length;
}

export function getNodeStatusClass(node: TreeNode, CLASSNAMES: any, cascaderContext: CascaderContextType) {
  const { checkStrictly, multiple, value, max } = cascaderContext;
  const expandedActive = !checkStrictly && node.expanded && (multiple ? !node.isLeaf() : true);

  const isLeaf = node.isLeaf();

  const isDisabled = node.disabled || (multiple && (value as TreeNodeValue[]).length >= max && max !== 0);

  const isSelected = node.checked || (multiple && !checkStrictly && node.expanded && !isLeaf);

  return [
    {
      [CLASSNAMES.STATUS.selected]: !isDisabled && isSelected,
      [CLASSNAMES.STATUS.expanded]: !isDisabled && expandedActive,
      [CLASSNAMES.STATUS.disabled]: isDisabled,
    },
  ];
}

export function getCascaderItemClass(
  prefix: string,
  node: TreeNode,
  CLASSNAMES: any,
  cascaderContext: CascaderContextType,
) {
  const { size } = cascaderContext;
  return [
    `${prefix}-cascader-item`,
    ...getNodeStatusClass(node, CLASSNAMES, cascaderContext),
    {
      [`${prefix}-cascader-item-have-icon`]: node.children,
      [`${prefix}-cascader-item-is-leaf`]: node.isLeaf(),
      [CLASSNAMES.SIZE[size]]: size,
    },
  ];
}

export function getCascaderItemIconClass(
  prefix: string,
  node: TreeNode,
  CLASSNAMES: any,
  cascaderContext: CascaderContextType,
) {
  return [`${prefix}-cascader-item-icon`, ...getNodeStatusClass(node, CLASSNAMES, cascaderContext)];
}
