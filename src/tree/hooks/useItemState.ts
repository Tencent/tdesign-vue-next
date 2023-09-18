import { ref, toRefs, TypeRef, TypeSetupContext } from '../adapt';
import { TypeTreeItemProps, TypeTreeItemState, TypeTreeNode } from '../tree-types';

// 提供公共对象
export default function useItemState(props: TypeTreeItemProps, context: TypeSetupContext) {
  const refProps = toRefs(props);
  const treeItemRef = ref(null);
  const { treeScope } = props;
  const { store } = treeScope;
  const node = store.privateMap.get(props.itemkey);
  const refNode = ref(node) as TypeRef<TypeTreeNode>;

  const state: TypeTreeItemState = {
    props,
    context,
    treeScope,
    refProps,
    node: node,
    refNode,
    treeItemRef,
  };

  return {
    state,
  };
}
