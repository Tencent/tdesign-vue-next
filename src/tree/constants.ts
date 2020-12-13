import { prefix } from '../config';

export const TREE_NAME = `${prefix}-tree`;
export const TREE_NODE_NAME = `${prefix}-tree-node`;

export const FX = {
  treeNode: `${prefix}-tree-toggle`,
};

const tree = `${prefix}-tree`;

export const CLASS_NAMES = {
  icon: `${prefix}-icon`,
  actived: `${prefix}-is-active`,
  disabled: `${prefix}-is-disabled`,
  treeIconRight: `${prefix}-icon-arrow-right`,
  treeIconDown: `${prefix}-icon-arrow-down`,
  tree,
  treeFx: `${tree}--fx`,
  treeList: `${tree}__list`,
  treeNode: `${tree}__item`,
  treeNodeOpen: `${tree}__item--open`,
  treeHoverable: `${tree}--hoverable`,
  treeLabel: `${tree}__label`,
  treeIcon: `${tree}__icon`,
  treeSpace: `${tree}__space`,
  treeOperations: `${tree}__operations`,
  line: `${tree}__line`,
  lineIsLeaf: `${tree}__line--leaf`,
};
