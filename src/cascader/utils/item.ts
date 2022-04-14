import { CascaderContextType, TreeNode, TreeNodeValue } from '../interface';

export function getNodeStatusClass(
  node: TreeNode,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  const { checkStrictly, multiple, value, max } = cascaderContext;
  const expandedActive =
    (!checkStrictly && node.expanded && (multiple ? !node.isLeaf() : true)) || (checkStrictly && node.expanded);

  const isLeaf = node.isLeaf();

  const isDisabled = node.disabled || (multiple && (value as TreeNodeValue[]).length >= max && max !== 0);

  const isSelected = node.checked || (multiple && !checkStrictly && node.expanded && !isLeaf);

  return [
    {
      [STATUS.selected]: !isDisabled && isSelected,
      [STATUS.expanded]: !isDisabled && expandedActive,
      [STATUS.disabled]: isDisabled,
    },
  ];
}

export function getCascaderItemClass(
  prefix: string,
  node: TreeNode,
  SIZE: Record<string, string>,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  const { size } = cascaderContext;
  return [
    `${prefix}-cascader__item`,
    ...getNodeStatusClass(node, STATUS, cascaderContext),
    SIZE[size],
    {
      [`${prefix}-cascader__item--with-icon`]: !!node.children,
      [`${prefix}-cascader__item--leaf`]: node.isLeaf(),
    },
  ];
}

export function getCascaderItemIconClass(
  prefix: string,
  node: TreeNode,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  return [`${prefix}-cascader__item-icon`, ...getNodeStatusClass(node, STATUS, cascaderContext)];
}
