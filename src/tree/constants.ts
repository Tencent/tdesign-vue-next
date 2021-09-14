import { prefix } from '../config';

export const TREE_NAME = `${prefix}-tree`;
export const TREE_NODE_NAME = `${prefix}-tree-node`;

export const FX = {
  treeNode: `${prefix}-tree-toggle`,
};

const tree = `${prefix}-tree`;

export const CLASS_NAMES = {
  icon: `${prefix}-icon`,
  folderIcon: `${prefix}-folder-icon`,
  actived: `${prefix}-is-active`,
  disabled: `${prefix}-is-disabled`,
  treeIconRight: `${prefix}-icon-arrow-right`,
  treeIconDown: `${prefix}-icon-arrow-down`,
  tree,
  treeFx: `${tree}--fx`,
  treeBlockNode: `${tree}--block-node`,
  treeEmpty: `${tree}__empty`,
  treeList: `${tree}__list`,
  treeNode: `${tree}__item`,
  treeNodeOpen: `${tree}__item--open`,
  treeHoverable: `${tree}--hoverable`,
  treeCheckable: `${tree}--checkable`,
  treeLabel: `${tree}__label`,
  treeLabelStrictly: `${tree}__label--strictly`,
  treeIcon: `${tree}__icon`,
  treeIconDefault: `${tree}__icon--default`,
  treeSpace: `${tree}__space`,
  treeOperations: `${tree}__operations`,
  line: `${tree}__line`,
  lineIsLeaf: `${tree}__line--leaf`,
  lineIsFirst: `${tree}__line--first`,
};
