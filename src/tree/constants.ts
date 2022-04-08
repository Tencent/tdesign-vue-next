import { computed } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';

export const useCLASSNAMES = () => {
  const classPrefix = usePrefixClass();

  return computed(() => {
    const tree = `${classPrefix.value}-tree`;
    return {
      icon: `${classPrefix.value}-icon`,
      folderIcon: `${classPrefix.value}-folder-icon`,
      actived: `${classPrefix.value}-is-active`,
      disabled: `${classPrefix.value}-is-disabled`,
      treeIconRight: `${classPrefix.value}-icon-arrow-right`,
      treeIconDown: `${classPrefix.value}-icon-arrow-down`,
      treeNodeToggle: `${classPrefix.value}-tree-toggle`,
      tree,
      treeTransition: `${tree}--transition`,
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
      treeNodeVisible: `${tree}__item--visible`,
      treeNodeHidden: `${tree}__item--hidden`,
      treeNodeEnter: `${tree}__item--enter-active`,
      treeNodeLeave: `${tree}__item--leave-active`,
      line: `${tree}__line`,
      lineIsLeaf: `${tree}__line--leaf`,
      lineIsFirst: `${tree}__line--first`,
    };
  });
};
