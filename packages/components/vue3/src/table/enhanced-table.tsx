import type { SetupContext } from '@td/adapter-vue';
import { computed, defineComponent, getCurrentInstance, ref } from '@td/adapter-vue';
import baseTableProps from '@td/intel/table/base-table-props';
import primaryTableProps from '@td/intel/table/primary-table-props';
import enhancedTableProps from '@td/intel/table/enhanced-table-props';
import type {
  DragSortContext,
  PrimaryTableCol,
  TableRowData,
  TableRowState,
  TdEnhancedTableProps,
  TdPrimaryTableProps,
} from '@td/intel/table/type';
import { get } from 'lodash-es';
import log from '@td/shared/_common/js/log';
import type { ComponentScrollToElementParams } from '../common';
import { usePrefixClass } from '../hooks';
import useTreeSelect from './hooks/useTreeSelect';
import useTreeData from './hooks/useTreeData';
import PrimaryTable from './primary-table';

export default defineComponent({
  name: 'TEnhancedTable',

  props: {
    ...baseTableProps,
    ...primaryTableProps,
    ...enhancedTableProps,
  },

  setup(props: TdEnhancedTableProps, context: SetupContext) {
    const primaryTableRef = ref(null);
    const { store, dataSource, formatTreeColumn, swapData, onExpandFoldIconClick, ...treeInstanceFunctions }
      = useTreeData(props, context);
    const classPrefix = usePrefixClass();

    const treeDataMap = ref(store.value.treeDataMap);

    const { tIndeterminateSelectedRowKeys, onInnerSelectChange } = useTreeSelect(props, treeDataMap);

    // 影响列和单元格内容的因素有：树形节点需要添加操作符 [+] [-]
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        item = formatTreeColumn(item);
        if (item.children?.length) {
          item.children = getColumns(item.children);
        }
        // 多级表头和自定义列配置特殊逻辑：要么子节点不存在，要么子节点长度大于 1，方便做自定义列配置
        if (!item.children || item.children?.length) {
          arr.push(item);
        }
      }
      return arr;
    };

    const tColumns = computed(() => {
      // 暂时只有树形结构需要处理 column.cell
      const isTreeData = !props.tree || !Object.keys(props.tree).length;
      return isTreeData ? props.columns : getColumns(props.columns);
    });

    const onDragSortChange = (params: DragSortContext<TableRowData>) => {
      if (props.beforeDragSort && !props.beforeDragSort(params)) {
        return;
      }
      swapData({
        current: params.current,
        target: params.target,
        currentIndex: params.currentIndex,
        targetIndex: params.targetIndex,
      });
      props.onDragSort?.(params);
    };

    const onEnhancedTableRowClick: TdPrimaryTableProps['onRowClick'] = (p) => {
      if (props.tree?.expandTreeNodeOnClick) {
        onExpandFoldIconClick(
          {
            row: p.row,
            rowIndex: p.index,
          },
          'row-click',
        );
      }
      props.onRowClick?.(p);
    };

    const getScrollRowIndex = (rowStateData: TableRowState, key: string | number): number => {
      if (!rowStateData) {
        return -1;
      }
      if (rowStateData.rowIndex >= 0) {
        return rowStateData.rowIndex;
      }
      if (rowStateData.rowIndex < 0) {
        return getScrollRowIndex(rowStateData.parent, key);
      }
    };

    const scrollToElement = (params: ComponentScrollToElementParams) => {
      let { index } = params;
      if (!index && index !== 0) {
        if (!params.key) {
          log.error('Table', 'scrollToElement: one of `index` or `key` must exist.');
          return;
        }
        const rowStateData = treeDataMap.value.get(params.key);
        index = getScrollRowIndex(rowStateData, params.key);
        if (index < 0 || index === undefined) {
          log.error('Table', `${params.key} does not exist in data, check \`rowKey\` or \`data\` please.`);
        }
      }
      primaryTableRef.value.scrollToElement({ ...params, index });
    };

    context.expose({
      store: store.value,
      dataSource: dataSource.value,
      ...treeInstanceFunctions,
      primaryTableRef,
      validateRowData: (rowValue: any) => {
        return primaryTableRef.value.validateRowData(rowValue);
      },
      validateTableData: () => {
        return primaryTableRef.value.validateTableData();
      },
      clearValidateData: () => {
        primaryTableRef.value.clearValidateData();
      },
      refreshTable: () => {
        primaryTableRef.value.refreshTable();
      },
      scrollToElement,
    });

    return () => {
      const { vnode } = getCurrentInstance();
      const enhancedProps: TdPrimaryTableProps = {
        ...vnode.props,
        rowKey: props.rowKey || 'id',
        data: dataSource.value,
        columns: tColumns.value,
        // 半选状态节点
        indeterminateSelectedRowKeys: tIndeterminateSelectedRowKeys.value,
        // 树形结构不允许本地数据分页
        disableDataPage: Boolean(props.tree && Object.keys(props.tree).length),
        onSelectChange: onInnerSelectChange,
        onDragSort: onDragSortChange,
        rowClassName: ({ row }) => {
          const rowValue = get(row, props.rowKey || 'id');
          const rowState = treeDataMap.value.get(rowValue);
          if (!rowState) {
            return [props.rowClassName];
          }
          return [`${classPrefix.value}-table-tr--level-${rowState.level}`, props.rowClassName];
        },
      };
      if (props.tree?.expandTreeNodeOnClick) {
        enhancedProps.onRowClick = onEnhancedTableRowClick;
      }
      // @ts-expect-error ref 顺序很重要，如果移动到 v-slots 前面，会让 EnhancedTable 所有实例方法失效，勿动
      return <PrimaryTable v-slots={context.slots} {...enhancedProps} ref={primaryTableRef} />;
    };
  },
});
