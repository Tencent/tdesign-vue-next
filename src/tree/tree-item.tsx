import { TypePropType, defineComponent, TypeCreateElement, ref, TreeItemDefinition, useRipple } from './adapt';
import { TypeTreeItemProps } from './tree-types';
import useTreeItem from './hooks/useTreeItem';

export const treeItemProps = {
  node: {
    type: Object as TypePropType<TypeTreeItemProps['node']>,
  },
  rowIndex: {
    type: Number as TypePropType<TypeTreeItemProps['rowIndex']>,
  },
  treeScope: {
    type: Object as TypePropType<TypeTreeItemProps['treeScope']>,
  },
  expandOnClickNode: {
    type: Boolean as TypePropType<TypeTreeItemProps['expandOnClickNode']>,
  },
};

export default defineComponent({
  props: treeItemProps,
  ...TreeItemDefinition,
  setup(props: TypeTreeItemProps, context) {
    const treeItemRef = ref(null);
    const label = ref<HTMLElement>();
    useRipple(label);
    const { renderItemNode } = useTreeItem(props, context, treeItemRef);
    return {
      treeItemRef,
      renderItemNode,
    };
  },
  render(h: TypeCreateElement) {
    // 这个类型判断看起来多此一举
    // 然而单元测试时没有它却会报错:
    // This expression is not callable. Type '{}' has no call signatures.
    if (typeof this.renderItemNode === 'function') {
      return this.renderItemNode(h);
    }
    return null;
  },
});
