import { ComputedRef, nextTick, ref, Ref, toRefs, watch } from 'vue';
import { TdEnhancedTableProps, TableRowData } from '../type';
import useDefaultValue from '../../hooks/useDefaultValue';
import TableTreeStore, { diffExpandedTreeNode, getUniqueRowValue } from '../../../common/js/table/tree-store';
import { TableTreeExpandType } from '../interface';

export function useTreeDataExpand(
  props: TdEnhancedTableProps,
  params: {
    store: Ref<InstanceType<typeof TableTreeStore>>;
    dataSource: Ref<TdEnhancedTableProps['data']>;
    rowDataKeys: ComputedRef<{ rowKey: string; childrenKey: string }>;
  },
) {
  const { store, dataSource, rowDataKeys } = params;
  const { data, expandedTreeNodes, tree } = toRefs(props);

  const isDefaultExpandAllExecute = ref(false);
  const isDefaultExpandedTreeNodesExecute = ref(false);
  const [tExpandedTreeNode, setTExpandedTreeNode] = useDefaultValue(
    expandedTreeNodes,
    props.defaultExpandedTreeNodes,
    props.onExpandedTreeNodesChange,
    'expandedTreeNodes',
  );

  const changedExpandTreeNode = ref<{
    type?: TableTreeExpandType;
    row?: TableRowData;
    rowIndex?: number;
  }>({ type: 'props-change' });

  /**
   * 对外暴露的组件实例方法，展开所有节点
   */
  function expandAll(type: 'expand-all' | 'default-expand-all' = 'expand-all', list?: TableRowData[]) {
    const newData = list || data.value;
    dataSource.value = store.value.expandAll(newData, rowDataKeys.value);
    const expandedNode = dataSource.value.map((t) => getUniqueRowValue(t, rowDataKeys.value.rowKey));
    setTExpandedTreeNode(expandedNode, {
      row: undefined,
      rowState: undefined,
      rowIndex: undefined,
      type: 'expand',
      trigger: type,
    });
    changedExpandTreeNode.value.type = 'expand-all';
  }

  /**
   * 对外暴露的组件实例方法，收起所有节点
   */
  function foldAll() {
    dataSource.value = [...store.value.foldAll(dataSource.value, rowDataKeys.value)];
    setTExpandedTreeNode([], {
      row: undefined,
      rowState: undefined,
      rowIndex: undefined,
      type: 'fold',
      trigger: 'fold-all',
    });
  }

  function onExpandFoldIconClick(
    p: { row: TableRowData; rowIndex: number },
    trigger?: 'expand-fold-icon' | 'row-click',
  ) {
    const { row, rowIndex } = p;
    changedExpandTreeNode.value = {
      type: 'user-reaction-change',
      ...p,
    };
    const rowValue = getUniqueRowValue(row, rowDataKeys.value.rowKey);
    const rowState = store.value.treeDataMap.get(rowValue);
    let expandedNodes = [...tExpandedTreeNode.value];
    if (rowState.expanded) {
      const expandedChildrenKeys = store.value.getExpandedChildrenKeys([row], rowDataKeys.value);
      for (let i = 0, len = expandedNodes.length; i < len; i++) {
        const nodeValue = expandedNodes[i];
        if (expandedChildrenKeys.includes(nodeValue)) {
          expandedNodes[i] = undefined;
        }
      }
      expandedNodes = expandedNodes.filter(Boolean);
    } else {
      expandedNodes.push(rowValue);
    }
    const params = {
      row,
      rowIndex,
      rowState,
      trigger,
    };
    setTExpandedTreeNode(expandedNodes, {
      ...params,
      type: rowState.expanded ? 'fold' : 'expand',
    });
    props.onTreeExpandChange?.(params);
  }

  function updateExpandState(
    data: TableRowData[],
    tExpandedTreeNode: (string | number)[],
    oldExpandedTreeNode: (string | number)[] = [],
  ) {
    const { addedList, removedList } = diffExpandedTreeNode(tExpandedTreeNode, oldExpandedTreeNode);
    store.value.expandTreeNode(addedList, data, rowDataKeys.value);
    store.value.foldTreeNode(removedList, data, rowDataKeys.value);
    return [...data];
  }

  watch([tExpandedTreeNode, data], ([tExpandedTreeNode], [oldExpandedTreeNode]) => {
    if (!store.value.treeDataMap.size || !data.value.length) return;
    if (changedExpandTreeNode.value.type === 'user-reaction-change') {
      const { row, rowIndex } = changedExpandTreeNode.value || {};
      dataSource.value = [...store.value.toggleExpandData({ row, rowIndex }, [...dataSource.value], rowDataKeys.value)];
    } else if (changedExpandTreeNode.value.type === 'props-change') {
      updateExpandState(dataSource.value, tExpandedTreeNode, oldExpandedTreeNode);
    }
    changedExpandTreeNode.value.type = 'props-change';
  });

  const updateExpandOnDataChange = (data: TableRowData[]) => {
    if (tree.value?.defaultExpandAll && !isDefaultExpandAllExecute.value) {
      expandAll('default-expand-all', [...data]);
      isDefaultExpandAllExecute.value = true;
    } else if (tExpandedTreeNode.value?.length) {
      nextTick(() => {
        dataSource.value = updateExpandState([...data], tExpandedTreeNode.value, []);
      });
    }
  };

  return {
    tExpandedTreeNode,
    isDefaultExpandAllExecute,
    isDefaultExpandedTreeNodesExecute,
    expandAll,
    foldAll,
    onExpandFoldIconClick,
    updateExpandOnDataChange,
  };
}

export default useTreeDataExpand;
