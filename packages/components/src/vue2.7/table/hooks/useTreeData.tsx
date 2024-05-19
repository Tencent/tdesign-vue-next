import type {
  CreateElement,
  SetupContext,
} from '@td/adapter-vue';
import { computed, onUnmounted, ref, shallowRef, toRefs, watch,
} from '@td/adapter-vue';
import { AddRectangleIcon as TdAddRectangleIcon, MinusRectangleIcon as TdMinusRectangleIcon } from 'tdesign-icons-vue';
import { get } from 'lodash-es';
import { useConfig, useGlobalIcon, useTNodeDefault } from '@td/adapter-hooks';
import type { SwapParams } from '@td/shared/_common/js/table/tree-store';
import TableTreeStore from '@td/shared/_common/js/table/tree-store';
import type {
  PrimaryTableCellParams,
  PrimaryTableCol,
  TableRowData,
  TableRowState,
  TableRowValue,
  TdEnhancedTableProps,
} from '@td/intel/components/table/type';
import { renderCell } from '../tr';
import useClassName from './useClassName';
import useTreeDataExpand from './useTreeDataExpand';

export default function useTreeData(props: TdEnhancedTableProps, context: SetupContext) {
  const { data, columns } = toRefs(props);
  const { t, global } = useConfig('table', props.locale);
  const { AddRectangleIcon, MinusRectangleIcon } = useGlobalIcon({
    AddRectangleIcon: TdAddRectangleIcon,
    MinusRectangleIcon: TdMinusRectangleIcon,
  });
  const store = ref(new TableTreeStore() as InstanceType<typeof TableTreeStore>);
  const treeNodeCol = shallowRef<PrimaryTableCol>();
  const dataSource = ref<TdEnhancedTableProps['data']>([]);
  const { tableTreeClasses } = useClassName();
  const renderTNode = useTNodeDefault();

  const rowDataKeys = computed(() => ({
    rowKey: props.rowKey || 'id',
    childrenKey: props.tree?.childrenKey || 'children',
  }));

  const {
    tExpandedTreeNode,
    isDefaultExpandAllExecute,
    isDefaultExpandedTreeNodesExecute,
    expandAll,
    foldAll,
    updateExpandOnDataChange,
    onExpandFoldIconClick,
  } = useTreeDataExpand(props, context, { store, dataSource, rowDataKeys });

  const checkedColumn = computed(() => columns.value.find(col => col.colKey === 'row-select'));

  watch(checkedColumn, (column) => {
    if (!store.value || !checkedColumn.value) {
      return;
    }
    store.value.updateDisabledState(dataSource.value, column, rowDataKeys.value);
  });

  function getFoldIcon(h: CreateElement, context: PrimaryTableCellParams<TableRowData>) {
    const params = { ...context, type: 'fold' };
    const defaultFoldIcon = t(global.value.treeExpandAndFoldIcon, h, params) || <MinusRectangleIcon />;
    return renderTNode('treeExpandAndFoldIcon', {
      defaultNode: defaultFoldIcon,
      params,
    });
  }

  function getExpandIcon(h: CreateElement, context: PrimaryTableCellParams<TableRowData>) {
    const params = { ...context, type: 'expand' };
    const defaultExpandIcon = t(global.value.treeExpandAndFoldIcon, h, params) || <AddRectangleIcon />;
    return renderTNode('treeExpandAndFoldIcon', {
      defaultNode: defaultExpandIcon,
      params,
    });
  }

  watch(
    [data],
    () => {
      if (props.tree) {
        resetData(data.value);
      } else {
        dataSource.value = data.value;
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    if (!props.tree) {
      return;
    }
    store.value.treeDataMap?.clear();
    store.value = null;
  });

  watch(
    () => [columns, props.tree?.treeNodeColumnIndex],
    () => {
      treeNodeCol.value = getTreeNodeColumnCol();
    },
    { immediate: true },
  );

  function resetData(data: TableRowData[]) {
    const {
      columns,
      expandedTreeNodes,
      defaultExpandedTreeNodes,
      tree,
    } = props;
    store.value.initialTreeStore(data, columns, rowDataKeys.value);
    const defaultNeedExpand = Boolean(!isDefaultExpandedTreeNodesExecute.value && defaultExpandedTreeNodes?.length);
    const needExpandAll = Boolean(tree?.defaultExpandAll && !isDefaultExpandAllExecute.value);
    if ((tExpandedTreeNode.value?.length && !!(expandedTreeNodes || defaultNeedExpand)) || needExpandAll) {
      updateExpandOnDataChange(data);
      isDefaultExpandedTreeNodesExecute.value = true;
    } else {
      dataSource.value = [...data];
    }
  }

  function getTreeNodeStyle(level: number) {
    if (level === undefined) {
      return;
    }
    const indent = props.tree?.indent === undefined ? 24 : props.tree?.indent;
    // 默认 1px 是为了临界省略
    return indent ? { paddingLeft: `${level * indent || 1}px` } : {};
  }

  /**
   * 对外暴露的组件实例方法，展开或收起某一行
   * @param p 行数据
   */
  function toggleExpandData(p: { row: TableRowData; rowIndex: number }, trigger?: 'expand-fold-icon' | 'row-click') {
    const currentData = { ...p };
    if (p.row.__VIRTUAL_SCROLL_INDEX !== undefined) {
      currentData.rowIndex = p.row.__VIRTUAL_SCROLL_INDEX;
    }
    dataSource.value = [...store.value.toggleExpandData(currentData, dataSource.value, rowDataKeys.value)];

    const rowValue = get(p.row, rowDataKeys.value.rowKey);
    const rowState = store.value?.treeDataMap?.get(rowValue);
    const params = {
      row: p.row,
      rowIndex: p.rowIndex,
      rowState,
      trigger,
    };
    props.onTreeExpandChange?.(params);
    // Vue3 ignore next line
    context.emit('tree-expand-change', params);
  }

  function getTreeNodeColumnCol() {
    const { columns } = props;
    let treeNodeColumnIndex = props.tree?.treeNodeColumnIndex || 0;
    // type 存在，则表示表格内部渲染的特殊列，比如：展开行按钮、复选框、单选按钮等，不能作为树结点列。因此树结点展开列向后顺移
    while (
      columns[treeNodeColumnIndex]?.type
      || columns[treeNodeColumnIndex]?.colKey === '__EXPAND_ROW_ICON_COLUMN__'
    ) {
      treeNodeColumnIndex += 1;
    }
    return columns[treeNodeColumnIndex];
  }

  function formatTreeColumn(col: PrimaryTableCol): PrimaryTableCol {
    if (!props.tree || col.colKey !== treeNodeCol.value.colKey) {
      return col;
    }
    const newCol = { ...treeNodeCol.value };
    newCol.cell = (h, p) => {
      const cellInfo = renderCell({ ...p, col: { ...treeNodeCol.value } }, context.slots, {
        cellEmptyContent: props.cellEmptyContent,
      });
      const currentState = store.value.treeDataMap.get(get(p.row, rowDataKeys.value.rowKey));
      const colStyle = getTreeNodeStyle(currentState?.level);
      const classes = { [tableTreeClasses.inlineCol]: !!col.ellipsis };
      const childrenNodes = get(p.row, rowDataKeys.value.childrenKey);
      if ((childrenNodes && Array.isArray(childrenNodes)) || childrenNodes === true) {
        const expanded = store.value.treeDataMap.get(get(p.row, rowDataKeys.value.rowKey))?.expanded;
        const iconNode = expanded ? getFoldIcon(h, p) : getExpandIcon(h, p);
        return (
          <div class={[tableTreeClasses.col, classes]} style={colStyle}>
            {!!(childrenNodes.length || childrenNodes === true) && (
              <span
                class={tableTreeClasses.icon}
                onClick={(e: MouseEvent) => {
                  // toggleExpandData(p, 'expand-fold-icon');
                  onExpandFoldIconClick(p, 'expand-fold-icon');
                  e.stopPropagation();
                }}
              >
                {iconNode}
              </span>
            )}
            {cellInfo}
          </div>
        );
      }
      // leaf nodes
      return (
        <div style={colStyle} class={[classes, tableTreeClasses.leafNode]}>
          <span class={tableTreeClasses.icon}></span>
          {cellInfo}
        </div>
      );
    };
    // 树形节点会显示操作符号 [+] 和 [-]，但省略显示的浮层中不需要操作符
    if (newCol.ellipsis === true) {
      newCol.ellipsis = (h, p) => renderCell({ ...p, col: { ...treeNodeCol.value } }, context.slots);
    }
    return newCol;
  }

  /**
   * 对外暴露的组件实例方法，设置行数据，自动刷新界面
   * @param key 当前行唯一标识值
   * @param newRowData 新行数据
   */
  function setData<T>(key: TableRowValue, newRowData: T) {
    const rowIndex = store.value.updateData(key, newRowData, dataSource.value, rowDataKeys.value);
    const newData = [...dataSource.value];
    newData[rowIndex] = newRowData;
    dataSource.value = newData;
  }

  /**
   * 对外暴露的组件实例方法，获取当前行全部数据
   * @param key 行唯一标识
   * @returns {TableRowState} 当前行数据
   */
  function getData(key: TableRowValue): TableRowState {
    return store.value.getData(key);
  }

  /**
   * 对外暴露的组件实例方法，移除指定节点
   * @param key 行唯一标识
   */
  function remove(key: TableRowValue) {
    // 引用传值，可自动更新 dataSource。（dataSource 本是内部变量，可以在任何地方进行任何改变）
    dataSource.value = [...store.value.remove(key, dataSource.value, rowDataKeys.value)];
  }

  /**
   * 移除子节点
   * @param key 行唯一标识
   */
  function removeChildren(key: TableRowValue) {
    dataSource.value = [...store.value.removeChildren(key, dataSource.value, rowDataKeys.value)];
  }

  /**
   * 对外暴露的组件实例方法，为当前节点添加子节点，默认添加到最后一个节点
   * @param key 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  function appendTo<T>(key: TableRowValue = '', newData: T | T[]) {
    if (!key) {
      dataSource.value = store.value.appendToRoot(newData, dataSource.value, rowDataKeys.value);
      return;
    }
    // 引用传值，可自动更新 dataSource。（dataSource 本是内部变量，可以在任何地方进行任何改变）
    dataSource.value = [...store.value.appendTo(key, newData, dataSource.value, rowDataKeys.value)];
  }

  /**
   * 对外暴露的组件实例方法，当前节点之后，插入节点
   */
  function insertAfter<T>(rowValue: TableRowValue, newData: T) {
    dataSource.value = [...store.value.insertAfter(rowValue, newData, dataSource.value, rowDataKeys.value)];
  }

  /**
   * 对外暴露的组件实例方法，当前节点之后，插入节点
   */
  function insertBefore<T>(rowValue: TableRowValue, newData: T) {
    dataSource.value = [...store.value.insertBefore(rowValue, newData, dataSource.value, rowDataKeys.value)];
  }

  /**
   * 对外暴露的组件实例方法，交换行数据
   */
  function swapData(params: SwapParams<TableRowData>) {
    const r = store.value.swapData(dataSource.value, params, rowDataKeys.value);
    if (r.result) {
      dataSource.value = [...r.dataSource];
    } else {
      const params = {
        code: r.code,
        reason: r.reason,
      };
      props.onAbnormalDragSort?.(params);
      // Vue3 do not need next line
      context.emit('abnormal-drag-sort', params);
    }
  }

  /**
   * 对外暴露的组件实例方法，获取全部数据的树形结构
   * @param key 节点唯一标识
   */
  function getTreeNode() {
    return store.value.getTreeNode(dataSource.value, rowDataKeys.value);
  }

  /**
   * 对外暴露的组件实例方法，获取树形结构展开的节点
   */
  function getTreeExpandedRow(type: 'unique' | 'data' | 'all' = 'data') {
    return store.value.getTreeExpandedRow(dataSource.value, rowDataKeys.value, type);
  }

  return {
    store,
    rowDataKeys,
    dataSource,
    swapData,
    setData,
    getData,
    remove,
    removeChildren,
    appendTo,
    insertAfter,
    insertBefore,
    formatTreeColumn,
    toggleExpandData,
    expandAll,
    foldAll,
    getTreeNode,
    resetData,
    getTreeExpandedRow,
    onExpandFoldIconClick,
  };
}
