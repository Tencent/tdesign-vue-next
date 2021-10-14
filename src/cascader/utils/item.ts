import { CascaderContextType, TreeNode } from '../interface';

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

export function getCascaderItemClass(
  prefix: string,
  node: TreeNode,
  CLASSNAMES: any,
  cascaderContext: CascaderContextType,
) {
  const { checkStrictly, multiple, size } = cascaderContext;
  const expandedActive = !checkStrictly && node.expanded && (multiple ? !node.isLeaf() : true);

  return [
    `${prefix}-cascader-item`,
    {
      [CLASSNAMES.STATUS.selected]: node.checked,
      [CLASSNAMES.STATUS.expanded]: expandedActive,
      [CLASSNAMES.STATUS.disabled]: node.disabled,
      [CLASSNAMES.STATUS.active]: node.actived || (multiple && node.expanded),
      [CLASSNAMES.SIZE[size]]: size,
      [`${prefix}-cascader-item-have-icon`]: node.children,
    },
  ];
}

export function getCascaderItemIconClass(
  prefix: string,
  node: TreeNode,
  CLASSNAMES: any,
  cascaderContext: CascaderContextType,
) {
  const { checkStrictly } = cascaderContext;

  return [
    `${prefix}-cascader-icon`,
    {
      [CLASSNAMES.STATUS.expanded]: !checkStrictly && node.expanded,
    },
  ];
}
