import { CascaderContextType, TreeNode, TreeNodeValue } from '../interface';

/**
 * icon Class
 * @param prefix
 * @param STATUS
 * @param cascaderContext
 * @returns
 */
export function getFakeArrowIconClass(
  prefix: string,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  const { disabled } = cascaderContext;
  return [
    `${prefix}-cascader__icon`,
    {
      [STATUS.disabled]: disabled,
    },
  ];
}

/**
 * 通用状态
 * @param node
 * @param STATUS
 * @param cascaderContext
 * @returns
 */
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

/**
 * 子节点状态
 * @param prefix
 * @param node
 * @param SIZE
 * @param STATUS
 * @param cascaderContext
 * @returns
 */
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

/**
 * 子节点icon状态
 * @param prefix
 * @param node
 * @param STATUS
 * @param cascaderContext
 * @returns
 */
export function getCascaderItemIconClass(
  prefix: string,
  node: TreeNode,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  return [`${prefix}-cascader__item-icon`, `${prefix}-icon`, ...getNodeStatusClass(node, STATUS, cascaderContext)];
}
