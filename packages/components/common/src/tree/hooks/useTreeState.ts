import type { TreeNode, TypeRef, TypeSetupContext } from '../adapt';
import { ref, toRefs, useVModel } from '../adapt';
import type { TreeProps, TypeTreeState, TypeTreeStore } from '../tree-types';

// 提供公共对象
export default function useTreeState(props: TreeProps, context: TypeSetupContext) {
  const treeContentRef = ref<HTMLDivElement>();
  const nodes: TypeRef<TreeNode[]> = ref([]);
  const allNodes: TypeRef<TreeNode[]> = ref([]);
  const isScrolling: TypeRef<boolean> = ref(false);

  const refProps = toRefs(props);
  const vmValue = useVModel(props, refProps, 'value', 'defaultValue', 'onChange', 'change');
  const vmActived = useVModel(props, refProps, 'actived', 'defaultActived', 'onActive', 'active');
  const vmExpanded = useVModel(props, refProps, 'expanded', 'defaultExpanded', 'onExpand', 'expand');

  function setStore(store: TypeTreeStore) {
    state.store = store;
    state.scope.store = store;
    allNodes.value = store.getNodes();
  }

  const state: TypeTreeState = {
    props,
    context,
    // tree 数据对象
    store: null,
    // 内容根节点
    treeContentRef,
    // 渲染节点
    nodes,
    // 所有节点
    allNodes,
    // 是否正在滚动
    isScrolling,
    // 缓存点击事件
    mouseEvent: null,
    // 虚拟滚动对象
    virtualConfig: null,
    // 缓存与节点共享的关联对象
    scope: {
      store: null,
      treeContentRef,
      treeProps: props,
      scopedSlots: {},
      virtualConfig: null,
    },
    setStore,
    refProps,
    vmValue,
    vmActived,
    vmExpanded,
  };

  return {
    state,
  };
}
