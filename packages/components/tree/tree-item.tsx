import {
  TypePropType,
  defineComponent,
  TypeCreateElement,
  ref,
  TreeItemDefinition,
  useRipple,
  getCreateElement,
} from './utils/adapt';
import { TypeTreeItemProps } from './types';
import useItemState from './hooks/useItemState';
import useTreeItem from './hooks/useTreeItem';

export const treeItemProps = {
  stateId: {
    type: String as TypePropType<TypeTreeItemProps['stateId']>,
  },
  itemKey: {
    type: String as TypePropType<TypeTreeItemProps['itemKey']>,
  },
  rowIndex: {
    type: Number as TypePropType<TypeTreeItemProps['rowIndex']>,
  },
  treeScope: {
    type: Object as TypePropType<TypeTreeItemProps['treeScope']>,
  },
};

export default defineComponent({
  props: treeItemProps,
  ...TreeItemDefinition,
  setup(props: TypeTreeItemProps, context) {
    const { state } = useItemState(props, context);
    const { treeItemRef } = state;
    const label = ref<HTMLElement>();
    useRipple(label);
    const { renderItemNode } = useTreeItem(state);

    return {
      treeItemRef,
      renderItemNode,
    };
  },
  render(h: TypeCreateElement) {
    const createElement = getCreateElement(h);
    // 这个类型判断看起来多此一举
    // 然而单元测试时没有它却会报错:
    // This expression is not callable. Type '{}' has no call signatures.
    if (typeof this.renderItemNode === 'function') {
      return this.renderItemNode(createElement);
    }
    return null;
  },
});
