import { ref, watch, TypeCreateElement, privateKey, TypeVNode } from '../adapt';
import { TypeTreeRow, TypeTreeNode, TypeTreeState } from '@td/intel/components/tree/tree-types';
import TreeItem from '../tree-item';
import useTreeEvents from './useTreeEvents';

// tree 节点列表渲染
export default function useTreeNodes(state: TypeTreeState) {
  const { store, scope, allNodes, nodes, virtualConfig } = state;
  const { handleClick, handleChange } = useTreeEvents(state);
  const nodesEmpty = ref(false);
  // 用于存储已呈现节点的缓存
  const cacheMap = new Map();

  const refresh = () => {
    allNodes.value = store.getNodes();
  };

  const refreshVisibleNodes = () => {
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (isVirtual) return;
    // 非虚拟滚动，渲染可视节点
    const list: TypeTreeNode[] = [];
    // 非虚拟滚动，缓存曾经展示过的节点
    let hasVisibleNode = false;
    allNodes.value.forEach((node: TypeTreeNode) => {
      if (node.visible) {
        // 曾经展示过的节点加入缓存，避免再次创建
        hasVisibleNode = true;
        cacheMap.set(node.value, node.value);
      }
      if (cacheMap.has(node.value)) {
        // 创建的节点是缓存的节点
        list.push(node);
      }
    });
    cacheMap.forEach((value) => {
      // 在缓存中清理结构变化后不存在的节点
      if (!store.getNode(value)) {
        cacheMap.delete(value);
      }
    });
    // 渲染为平铺列表
    nodes.value = list;
    nodesEmpty.value = !hasVisibleNode;
  };

  const refreshVirtualNodes = () => {
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (!isVirtual) return;
    // 虚拟滚动只渲染可见节点
    const list = virtualConfig.visibleData.value;
    nodes.value = list;
    nodesEmpty.value = list.length <= 0;
  };

  // 创建单个 tree 节点
  const renderItem = (h: TypeCreateElement, node: TypeTreeRow, index: number, stateId: string) => {
    const rowIndex = node.VIRTUAL_SCROLL_INDEX || index;
    const nodeUniqueId = node[privateKey];
    // vue3 中，不使用动画时，传递 node, 或者单纯传递 itemKey 无法触发 treeItem 的 render 方法
    // 考虑到有必要对所有节点状态更新，所以添加 stateId 属性，专门用于触发 treeItem 的 render 方法
    // 使用动画时，transition group 触发了所有节点的 render 方法，回头可以研究看下更合适的方案
    // 未来也可以根据节点数据的具体更新状态，来决定节点更新与否
    // 考虑到 value 值有冲突可能，所以使用 privateKey 来作为节点标记
    const treeItem = (
      <TreeItem
        key={nodeUniqueId}
        rowIndex={rowIndex}
        stateId={stateId}
        itemKey={nodeUniqueId}
        treeScope={scope}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
    return treeItem;
  };

  const renderTreeNodes = (h: TypeCreateElement) => {
    const stateId = `render-${new Date().getTime()}`;
    const treeNodeViews: TypeVNode[] = nodes.value.map((node: TypeTreeNode, index) =>
      renderItem(h, node, index, stateId),
    );
    return treeNodeViews;
  };

  watch(allNodes, refreshVisibleNodes);
  watch(virtualConfig.visibleData, refreshVirtualNodes);

  refresh();
  refreshVisibleNodes();
  refreshVirtualNodes();
  store.emitter.on('update', refresh);

  return {
    nodesEmpty,
    renderTreeNodes,
  };
}
