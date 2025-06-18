import { ref, toRefs, TypeSetupContext } from '../utils/adapt';
import { TypeTreeItemProps, TypeTreeItemState } from '../types';

// 提供公共对象
export default function useItemState(props: TypeTreeItemProps, context: TypeSetupContext) {
  const refProps = toRefs(props);
  const treeItemRef = ref(null);
  const { treeScope } = props;
  const { store } = treeScope;
  const node = store.privateMap.get(props.itemKey);

  const state: TypeTreeItemState = {
    stateId: props.stateId,
    props,
    context,
    treeScope,
    refProps,
    node,
    treeItemRef,
  };

  return {
    state,
  };
}
