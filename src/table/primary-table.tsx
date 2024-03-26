import { computed, defineComponent, toRefs, h, ref, onMounted, getCurrentInstance } from 'vue';
import get from 'lodash/get';
import omit from 'lodash/omit';
import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';
import BaseTable from './base-table';
import { useTNodeJSX } from '../hooks/tnode';
import useColumnController from './hooks/useColumnController';
import useRowExpand from './hooks/useRowExpand';
import useTableHeader, { renderTitle } from './hooks/useTableHeader';
import useRowSelect from './hooks/useRowSelect';
import { TdPrimaryTableProps, PrimaryTableCol, TableRowData, PrimaryTableCellParams } from './type';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useAsyncLoading from './hooks/useAsyncLoading';
import EditableCell, { EditableCellProps } from './editable-cell';
import { PageInfo } from '../pagination';
import useClassName from './hooks/useClassName';
import { useConfig } from '../hooks/useConfig';
import useEditableRow from './hooks/useEditableRow';
import useStyle from './hooks/useStyle';
import { ScrollToElementParams } from '../hooks/useVirtualScrollNew';
import { BaseTableProps } from './interface';

export { BASE_TABLE_ALL_EVENTS } from './base-table';

const OMIT_PROPS = [
  'hideSortTips',
  'dragSort',
  'defaultExpandedRowKeys',
  'defaultSelectedRowKeys',
  'columnController',
  'filterRow',
  'sortOnRowDraggable',
  'expandOnRowClick',
  'expand-on-row-click',
  'expanded-row',
  'editable-row-keys',
  'editable-cell-state',
  'filter-value',
  'multipleSort',
  'expandIcon',
  'expand-icon',
  'reserveSelectedRowOnPaginate',
  'expandedRowKeys',
  'expandedRow',
  'reserve-selected-row-on-paginate',
  'reserveSelectedRowOnPaginate',
  'selected-row-keys',
  'selectedRowKeys',
  'selectOnRowClick',
  'column-controller',
  'columnController',
  'dragSort',
  'drag-sort',
  'hideSortTips',
  'showSortColumnBgColor',
  'filter-row',
  'filterRow',
  'multiple-sort',
  'multipleSort',
  'async-loading',
  'onChange',
  'onAsyncLoadingClick',
  'onColumnChange',
  'onColumnControllerVisibleChange',
  'onDataChange',
  'onDisplayColumnsChange',
  'onDragSort',
  'onExpandChange',
  'onFilterChange',
  'onSelectChange',
  'onSortChange',
];

export default defineComponent({
  name: 'TPrimaryTable',

  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },

  setup(props, context) {
    const renderTNode = useTNodeJSX();
    const { columns, columnController } = toRefs(props);
    const primaryTableRef = ref(null);
    const showElement = ref(false);

    const { classPrefix, tableDraggableClasses, tableBaseClass, tableSelectedClasses, tableSortClasses } =
      useClassName();
    const { globalConfig } = useConfig('table', props.locale);
    const { sizeClassNames } = useStyle(props);
    const tableSize = computed(() => props.size ?? globalConfig.value.size);
    // 自定义列配置功能
    const { tDisplayColumns, renderColumnController } = useColumnController(props, context);

    // 展开/收起行功能
    const { showExpandedRow, showExpandIconColumn, getExpandColumn, renderExpandedRow, onInnerExpandRowClick } =
      useRowExpand(props, context);

    // 排序功能
    const { renderSortIcon } = useSorter(props, context);

    // 行选中功能
    const {
      selectColumn,
      showRowSelect,
      selectedRowClassNames,
      currentPaginateData,
      formatToRowSelectColumn,
      setTSelectedRowKeys,
      onInnerSelectRowClick,
      handleRowSelectWithAreaSelection,
    } = useRowSelect(props, tableSelectedClasses);

    // 过滤功能
    const {
      hasEmptyCondition,
      isTableOverflowHidden,
      renderFilterIcon,
      renderFirstFilterRow,
      setFilterPrimaryTableRef,
    } = useFilter(props, context);

    // 拖拽排序功能
    const dragSortParams = computed(() => ({
      showElement: showElement.value,
    }));
    const {
      isRowHandlerDraggable,
      isRowDraggable,
      isColDraggable,
      innerPagination,
      setDragSortPrimaryTableRef,
      setDragSortColumns,
    } = useDragSort(props, context, dragSortParams);

    const { renderTitleWidthIcon } = useTableHeader(props);
    const { renderAsyncLoading } = useAsyncLoading(props);

    // 可编辑行
    const {
      errorListMap,
      editableKeysMap,
      validateRowData,
      validateTableData,
      onRuleChange,
      clearValidateData,
      onUpdateEditedCell,
      getEditRowData,
      onPrimaryTableCellEditChange,
    } = useEditableRow(props);

    const innerKeyboardRowHover = computed(() => Boolean(showExpandedRow.value || showRowSelect.value));

    const innerDisableSpaceInactiveRow = computed(() => Boolean(showExpandedRow.value || showRowSelect.value));

    const primaryTableClasses = computed(() => {
      return {
        [tableDraggableClasses.colDraggable]: isColDraggable.value,
        [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable.value,
        [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
        [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
        [tableBaseClass.tableRowEdit]: props.editableRowKeys,
        [`${classPrefix}-table--select-${selectColumn.value?.type}`]: selectColumn.value,
        [`${classPrefix}-table--row-select`]: showRowSelect.value,
        [`${classPrefix}-table--row-expandable`]: showExpandedRow.value,
      };
    });

    // 如果想给 TR 添加类名，请在这里补充，不要透传更多额外 Props 到 BaseTable
    const tRowClassNames = computed(() => {
      const tClassNames = [props.rowClassName, selectedRowClassNames.value];
      return tClassNames.filter((v) => v);
    });

    // 如果想给 TR 添加属性，请在这里补充，不要透传更多额外 Props 到 BaseTable
    const tRowAttributes = computed(() => {
      const tAttributes = [props.rowAttributes];
      if (isRowHandlerDraggable.value || isRowDraggable.value) {
        tAttributes.push(({ row }) => ({ 'data-id': get(row, props.rowKey || 'id') }));
      }
      return tAttributes.filter((v) => v);
    });

    // 多个 Hook 共用 primaryTableRef
    onMounted(() => {
      setFilterPrimaryTableRef(primaryTableRef.value);
      setDragSortPrimaryTableRef(primaryTableRef.value);
    });

    // 对外暴露的方法
    context.expose({
      validateRowData,
      validateTableData,
      clearValidateData,
      refreshTable: () => {
        primaryTableRef.value.refreshTable();
      },
      scrollToElement: (data: ScrollToElementParams) => {
        primaryTableRef.value.scrollToElement(data);
      },
      scrollColumnIntoView: (colKey: string) => {
        primaryTableRef.value.scrollColumnIntoView(colKey);
      },
      // 暴露基础表格 ref 及相关方法
      baseTableRef: primaryTableRef,
    });

    const onEditableCellChange: EditableCellProps['onChange'] = (params) => {
      props.onRowEdit?.(params);
      const rowValue = get(params.editedRow, props.rowKey || 'id');
      onUpdateEditedCell(rowValue, params.row, {
        [params.col.colKey]: params.value,
      });
    };

    // 1. 影响列数量的因素有：自定义列配置、展开/收起行、多级表头；2. 影响表头内容的因素有：排序图标、筛选图标
    const getColumns = (columns: PrimaryTableCol<TableRowData>[], parentDisplay = false) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        // 自定义列显示控制
        const isDisplayColumn = item.children?.length || tDisplayColumns.value?.includes(item.colKey);
        if (
          !isDisplayColumn &&
          (props.columnController || props.displayColumns || props.defaultDisplayColumns) &&
          !parentDisplay
        )
          continue;
        item = formatToRowSelectColumn(item);
        const { sort } = props;
        if (item.sorter && props.showSortColumnBgColor) {
          const sorts = sort instanceof Array ? sort : [sort];
          const sortedColumn = sorts.find(
            (sort) => sort && sort.sortBy === item.colKey && sort.descending !== undefined,
          );
          if (sortedColumn) {
            item.className =
              item.className instanceof Array
                ? item.className.concat(tableSortClasses.sortColumn)
                : [item.className, tableSortClasses.sortColumn];
          }
        }
        // 添加排序图标和过滤图标
        if (item.sorter || item.filter) {
          const titleContent = renderTitle(context.slots, item, i);
          const { ellipsisTitle } = item;
          item.title = (h, p) => {
            const sortIcon = item.sorter ? renderSortIcon(p) : null;
            const filterIcon = item.filter ? renderFilterIcon(p) : null;
            // @ts-ignore 注意：此处 Vue2 和 Vue3 有所不同
            const attach = primaryTableRef.value?.tableContentRef;
            return renderTitleWidthIcon(
              [titleContent, sortIcon, filterIcon],
              p.col,
              p.colIndex,
              ellipsisTitle,
              attach,
              {
                classPrefix,
                ellipsisOverlayClassName: tableSize.value !== 'medium' ? sizeClassNames[tableSize.value] : '',
              },
            );
          };
          item.ellipsisTitle = false;
        }
        // 如果是单元格可编辑状态
        if (item.edit?.component) {
          const oldCell = item.cell;
          item.cell = (h, p: PrimaryTableCellParams<TableRowData>) => {
            const cellProps: EditableCellProps = {
              ...p,
              row: getEditRowData(p),
              oldCell,
              rowKey: props.rowKey || 'id',
              tableBaseClass,
              cellEmptyContent: props.cellEmptyContent,
              onChange: onEditableCellChange,
              onValidate: props.onRowValidate,
              onRuleChange,
              onEditableChange: onPrimaryTableCellEditChange,
            };
            if (props.editableRowKeys) {
              const rowValue = get(p.row, props.rowKey || 'id');
              cellProps.editable = editableKeysMap.value[rowValue] || false;
              const key = [rowValue, p.col.colKey].join('__');
              const errorList = errorListMap.value?.[key];
              errorList && (cellProps.errors = errorList);
            }
            if (props.editableCellState) {
              cellProps.readonly = !props.editableCellState(p);
            }
            return <EditableCell {...cellProps} v-slots={context.slots} onUpdateEditedCell={onUpdateEditedCell} />;
          };
        }
        if (item.children?.length) {
          item.children = getColumns(item.children, parentDisplay || tDisplayColumns.value?.includes(item.colKey));
        }
        // 多级表头和自定义列配置特殊逻辑：要么子节点不存在，要么子节点长度大于 1，方便做自定义列配置
        if (!item.children || item.children?.length) {
          arr.push(item);
        }
      }
      return arr;
    };

    const tColumns = computed(() => {
      const cols = getColumns(columns.value);
      if (showExpandIconColumn.value) {
        cols.unshift(getExpandColumn());
      }
      return cols;
    });

    const onInnerPageChange = (pageInfo: PageInfo, newData: Array<TableRowData>) => {
      innerPagination.value = { ...innerPagination.value, ...pageInfo };
      currentPaginateData.value = newData;
      props.onPageChange?.(pageInfo, newData);
      const changeParams: Parameters<TdPrimaryTableProps['onChange']> = [
        { pagination: pageInfo },
        { trigger: 'pagination', currentData: newData },
      ];
      props.onChange?.(...changeParams);
      // 是否在分页时保留选中结果，如果不保留则需清空
      if (!props.reserveSelectedRowOnPaginate) {
        setTSelectedRowKeys([], {
          selectedRowData: [],
          type: 'uncheck',
          currentRowKey: 'CLEAR_ON_PAGINATE',
        });
      }
    };

    const onInnerActiveRowAction: BaseTableProps['onActiveRowAction'] = (params) => {
      props.onActiveRowAction?.(params);
      handleRowSelectWithAreaSelection(params);
    };

    const onSingleRowClick: TdPrimaryTableProps['onRowClick'] = (params) => {
      if (props.expandOnRowClick) {
        onInnerExpandRowClick(params);
      }
      if (props.selectOnRowClick) {
        onInnerSelectRowClick(params);
      }
    };

    // handle click and dblclick exits at the same time
    let timer: any;
    const DURATION = 250;
    const onInnerRowClick: TdPrimaryTableProps['onRowClick'] = (params) => {
      // no dbl click conflict, no delay
      if (!props.onRowDblclick) {
        onSingleRowClick(params);
        return;
      }
      if (timer) {
        // dblclick
        clearTimeout(timer);
        timer = undefined;
      } else {
        timer = setTimeout(() => {
          onSingleRowClick(params);
          timer = undefined;
        }, DURATION);
      }
    };

    const onShowElementChange = (val: boolean) => {
      showElement.value = val;
    };

    return () => {
      const formatNode = (
        api: string,
        renderInnerNode: Function,
        condition: boolean,
        extra?: { reverse?: boolean },
      ) => {
        if (!condition) return props[api];
        const innerNode = renderInnerNode(h);
        const propsNode = renderTNode(api);
        if (innerNode && !propsNode) return () => innerNode;
        if (propsNode && !innerNode) return () => propsNode;
        if (innerNode && propsNode) {
          return () =>
            extra?.reverse ? (
              <div>
                {innerNode}
                {propsNode}
              </div>
            ) : (
              <div>
                {propsNode}
                {innerNode}
              </div>
            );
        }
        return null;
      };
      const isColumnController = !!(columnController.value && Object.keys(columnController.value).length);
      // @ts-ignore
      const placement = isColumnController ? columnController.value.placement || 'top-right' : '';
      const isBottomController = isColumnController && placement?.indexOf('bottom') !== -1;
      const topContent = formatNode('topContent', renderColumnController, isColumnController && !isBottomController);
      const bottomContent = formatNode('bottomContent', renderColumnController, isBottomController, {
        reverse: true,
      });
      const firstFullRow = formatNode('firstFullRow', renderFirstFilterRow, !hasEmptyCondition.value);
      const lastFullRow = formatNode('lastFullRow', renderAsyncLoading, !!props.asyncLoading);

      // important for base-table controlled properties
      const { vnode } = getCurrentInstance();

      const baseTableProps: BaseTableProps = {
        ...omit(vnode.props, OMIT_PROPS),
        rowKey: props.rowKey,
        rowClassName: tRowClassNames.value,
        rowAttributes: tRowAttributes.value,
        columns: tColumns.value,
        keyboardRowHover: props.keyboardRowHover ?? innerKeyboardRowHover.value,
        disableSpaceInactiveRow: props.disableSpaceInactiveRow ?? innerDisableSpaceInactiveRow.value,
        topContent,
        bottomContent,
        firstFullRow,
        lastFullRow,
        thDraggable: ['col', 'row-handler-col'].includes(props.dragSort),
        onShowElementChange,
        onPageChange: onInnerPageChange,
        renderExpandedRow: showExpandedRow.value ? renderExpandedRow : undefined,
        onActiveRowAction: onInnerActiveRowAction,
      };

      if (props.expandOnRowClick || props.selectOnRowClick) {
        baseTableProps.onRowClick = onInnerRowClick;
      }

      return (
        <BaseTable
          v-slots={context.slots}
          {...baseTableProps}
          ref={primaryTableRef}
          class={primaryTableClasses.value}
          onLeafColumnsChange={setDragSortColumns}
        />
      );
    };
  },
});
