import { ref, TypeSetupContext, TypeCreateElement, privateKey, TypeVNode } from '../adapt';
import { TypeTreeRow, TypeTreeNode, TreeProps, TypeTreeState } from '../tree-types';
import TreeItem from '../tree-item';
import useTreeEvents from './useTreeEvents';

// tree 节点列表渲染
export default function useTreeNodes(props: TreeProps, context: TypeSetupContext, state: TypeTreeState) {
  const treeState = state;
  const { store, scope, nodes, virtualConfig } = treeState;

  const { handleClick, handleChange } = useTreeEvents(props, context, state);
  const nodesEmpty = ref(false);
  // 用于存储已呈现节点的缓存
  const cacheMap = new Map();

  const refresh = () => {
    let list: TypeTreeNode[] = [];
    const allNodes = store.getNodes();
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (isVirtual) {
      // 虚拟滚动只渲染可见节点
      list = virtualConfig.visibleData.value;
      nodesEmpty.value = list.length <= 0;
    } else {
      // 非虚拟滚动，缓存曾经展示过的节点
      let hasVisibleNode = false;
      allNodes.forEach((node: TypeTreeNode) => {
        if (node.visible) {
          // 曾经展示过的节点加入缓存，避免再次创建
          hasVisibleNode = true;
          cacheMap.set(node.value, node.value);
        }
        if (cacheMap.get(node.value)) {
          // 创建的节点是缓存的节点
          list.push(node);
        }
      });
      nodesEmpty.value = !hasVisibleNode;
      cacheMap.forEach((value) => {
        // 在缓存中清理结构变化后不存在的节点
        if (!store.getNode(value)) {
          cacheMap.delete(value);
        }
      });
    }
    // 渲染为平铺列表
    nodes.value = list;
  };

  // 创建单个 tree 节点
  const renderItem = (h: TypeCreateElement, node: TypeTreeRow, index: number) => {
    const { expandOnClickNode } = props;
    const rowIndex = node.__VIRTUAL_SCROLL_INDEX || index;
    const treeItem = (
      <TreeItem
        key={node[privateKey]}
        rowIndex={rowIndex}
        node={node}
        treeScope={scope}
        onClick={handleClick}
        onChange={handleChange}
        expandOnClickNode={expandOnClickNode}
      />
    );
    return treeItem;
  };

  const renderTreeNodes = (h: TypeCreateElement) => {
    const treeNodeViews: TypeVNode[] = nodes.value.map((node: TypeTreeNode, index) => renderItem(h, node, index));
    return treeNodeViews;
  };

  refresh();
  store.emitter.on('update', refresh);

  return {
    refresh,
    nodesEmpty,
    renderTreeNodes,
  };
}
