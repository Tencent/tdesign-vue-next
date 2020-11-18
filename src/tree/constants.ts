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
  treeNodeHidden: `${tree}__item--hidden`,
  hoverable: `${tree}--hoverable`,
  label: `${tree}__label`,
  treeIcon: `${tree}__icon`,
  lines: `${tree}__lines`,
  lineIcon: `${tree}__line--icon`,
  lineRoot: `${tree}__line--root`,
  lineTrunk: `${tree}__line--trunk`,
  lineBranch: `${tree}__line--branch`,
  lineSeed: `${tree}__line--seed`,
  lineCorner: `${tree}__line--corner`,
  lineLeaf: `${tree}__line--leaf`,
  lineEnd: `${tree}__line--end`,
  lineEmpty: `${tree}__line--empty`,
};
