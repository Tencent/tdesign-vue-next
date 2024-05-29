import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { get, omit } from 'lodash-es';
import { useConfig, useTNodeJSX } from '@td/adapter-hooks';
import type { PrimaryTableCol, TableRowData, TdPrimaryTableProps } from '@td/intel/table/type';
import type { ComponentScrollToElementParams } from '@td/types';
import baseTableProps from '@td/intel/table/base-table-props';
import primaryTableProps from '@td/intel/table/primary-table-props';
import type { PageInfo, TdPaginationProps as PaginationProps } from '@td/intel/pagination/type';
import type { TableListeners } from './base-table';
import BaseTable, { BASE_TABLE_ALL_EVENTS } from './base-table';
import useColumnController from './hooks/useColumnController';
import useRowExpand from './hooks/useRowExpand';
import useTableHeader, { renderTitle } from './hooks/useTableHeader';
import useRowSelect from './hooks/useRowSelect';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useAsyncLoading from './hooks/useAsyncLoading';
import useClassName from './hooks/useClassName';
import useEditableCell from './hooks/useEditableCell';
import useEditableRow from './hooks/useEditableRow';
import type { EditableCellProps } from './editable-cell';
import useStyle from './hooks/useStyle';

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
  'multipleSort',
  'expandIcon',
  'reserveSelectedRowOnPaginate',
  'selectOnRowClick',
  'onChange',
  'onAsyncLoadingClick',
  'onChange',
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

  setup(props: TdPrimaryTableProps, context) {
    const renderTNode = useTNodeJSX();
    const { columns } = toRefs(props);
    const primaryTableRef = ref(null);
    const showElement = ref(false);
    const {
      classPrefix,
      tableDraggableClasses,
      tableBaseClass,
      tableSelectedClasses,
      tableSortClasses,
    } = useClassName();
    const { global } = useConfig('table', props.locale);
    const { sizeClassNames } = useStyle(props);
    const tableSize = computed(() => props.size ?? global.value.size);
    const innerPagination = ref<PaginationProps>(props.pagination);
    const dataPagination = computed(() => innerPagination.value
      ? {
          current: innerPagination.value.current,
          pageSize: innerPagination.value.pageSize,
          defaultCurrent: innerPagination.value.defaultCurrent,
          defaultPageSize: innerPagination.value.defaultPageSize,
        }
      : {});

    // 自定义列配置功能
    const { tDisplayColumns, renderColumnController } = useColumnController(props, context);
    // 展开/收起行功能
    const {
      showExpandedRow,
      showExpandIconColumn,
      getExpandColumn,
      renderExpandedRow,
      onInnerExpandRowClick,
    } = useRowExpand(props, context);
    // 排序功能
    const { renderSortIcon } = useSorter(props, context);
    // 行选中功能
    const {
      selectedRowClassNames,
      currentPaginateData,
      formatToRowSelectColumn,
      setTSelectedRowKeys,
      onInnerSelectRowClick,
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
      pagination: dataPagination.value,
    }));

    const {
      isRowHandlerDraggable,
      isRowDraggable,
      isColDraggable,
      setDragSortPrimaryTableRef,
      setDragSortColumns,
    } = useDragSort(props, context, dragSortParams);

    const { renderTitleWidthIcon } = useTableHeader(props);
    const { renderAsyncLoading } = useAsyncLoading(props, context);

    const {
      errorListMap,
      editableKeysMap,
      validateRowData,
      validateTableData,
      onRuleChange,
      clearValidateData,
      getEditRowData,
      onUpdateEditedCell,
      onPrimaryTableRowValidate,
      onPrimaryTableCellEditChange,
    } = useEditableRow(props, context);

    const { renderEditableCell } = useEditableCell(props, context, {
      'update-edited-cell': onUpdateEditedCell,
    });

    const primaryTableClasses = computed(() => ({
      [tableDraggableClasses.colDraggable]: isColDraggable.value,
      [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable.value,
      [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
      [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
      [tableBaseClass.tableRowEdit]: props.editableRowKeys,
    }));

    // 如果想给 TR 添加类名，请在这里补充，不要透传更多额外 Props 到 BaseTable
    const tRowClassNames = computed(() => {
      const tClassNames = [props.rowClassName, selectedRowClassNames.value];
      return tClassNames.filter(v => v);
    });

    // 如果想给 TR 添加属性，请在这里补充，不要透传更多额外 Props 到 BaseTable
    const tRowAttributes = computed(() => {
      const tAttributes = [props.rowAttributes];
      if (isRowHandlerDraggable.value || isRowDraggable.value) {
        tAttributes.push(({ row }) => ({ 'data-id': get(row, props.rowKey || 'id') }));
      }
      return tAttributes.filter(v => v);
    });

    // 多个 Hook 共用 primaryTableRef
    onMounted(() => {
      setFilterPrimaryTableRef(primaryTableRef.value);
      setDragSortPrimaryTableRef(primaryTableRef.value);
    });

    watch(primaryTableRef, () => {
      setFilterPrimaryTableRef(primaryTableRef.value);
      setDragSortPrimaryTableRef(primaryTableRef.value);
    });

    const onEditableCellChange: EditableCellProps['onChange'] = (params) => {
      props.onRowEdit?.(params);
      context.emit('row-edit', params);
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
        const isColumnController = Boolean(
          props.columnController || props.displayColumns || props.defaultDisplayColumns,
        );
        if (!isDisplayColumn && isColumnController && !parentDisplay) {
          continue;
        }
        item = formatToRowSelectColumn(item);
        const { sort } = props;
        if (item.sorter && props.showSortColumnBgColor) {
          const sorts = Array.isArray(sort) ? sort : [sort];
          const sortedColumn = sorts.find(
            sort => sort && sort.sortBy === item.colKey && sort.descending !== undefined,
          );
          if (sortedColumn) {
            item.className = Array.isArray(item.className)
              ? item.className.concat(tableSortClasses.sortColumn)
              : [item.className, tableSortClasses.sortColumn];
          }
        }
        // 添加排序图标和过滤图标
        if (item.sorter || item.filter) {
          const titleContent = renderTitle(h, context.slots, item, i);
          const { ellipsisTitle } = item;
          item.title = (h, p) => {
            const sortIcon = item.sorter ? renderSortIcon(h, p) : null;
            const filterIcon = item.filter ? renderFilterIcon(h, p) : null;
            // @ts-expect-error
            const attach = primaryTableRef.value?.$refs?.tableContentRef;
            return renderTitleWidthIcon(
              h,
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
          item.cell = (h, p) => {
            const cellProps: EditableCellProps = {
              ...p,
              row: getEditRowData(p),
              rowKey: props.rowKey || 'id',
              oldCell,
              tableBaseClass,
              cellEmptyContent: props.cellEmptyContent,
              onChange: onEditableCellChange,
              onValidate: onPrimaryTableRowValidate,
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
            return renderEditableCell(h, cellProps);
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
        cols.unshift(getExpandColumn(h));
      }
      return cols;
    });

    const onInnerPageChange = (pageInfo: PageInfo, newData: Array<TableRowData>) => {
      innerPagination.value = { ...innerPagination.value, ...pageInfo };
      currentPaginateData.value = newData;
      props.onPageChange?.(pageInfo, newData);
      // Vue3 ignore next line
      context.emit('page-change', pageInfo, newData);

      const changeParams: Parameters<TdPrimaryTableProps['onChange']> = [
        { pagination: pageInfo },
        { trigger: 'pagination', currentData: newData },
      ];
      props.onChange?.(...changeParams);
      // Vue3 ignore next line
      context.emit('change', ...changeParams);
      // 是否在分页时保留选中结果，如果不保留则需清空
      if (!props.reserveSelectedRowOnPaginate) {
        setTSelectedRowKeys([], {
          selectedRowData: [],
          type: 'uncheck',
          currentRowKey: 'CLEAR_ON_PAGINATE',
        });
      }
    };

    const onSingleRowClick: TdPrimaryTableProps['onRowClick'] = (params) => {
      if (props.expandOnRowClick) {
        onInnerExpandRowClick(params);
      }
      if (props.selectOnRowClick) {
        onInnerSelectRowClick(params);
      }
    };

    let timer: NodeJS.Timeout;
    const DURATION = 250;
    const onInnerRowClick: TdPrimaryTableProps['onRowClick'] = (params) => {
      // no dblclick, no delay
      if (!context.listeners['row-dblclick']) {
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

    return {
      tColumns,
      showExpandedRow,
      tRowClassNames,
      hasEmptyCondition,
      primaryTableRef,
      tRowAttributes,
      primaryTableClasses,
      errorListMap,
      onShowElementChange,
      scrollToElement: (data: ComponentScrollToElementParams) => {
        primaryTableRef.value.scrollToElement(data);
      },
      scrollColumnIntoView: (colKey: string) => {
        primaryTableRef.value.scrollColumnIntoView(colKey);
      },
      refreshTable: () => {
        primaryTableRef.value.refreshTable();
      },
      validateRowData,
      validateTableData,
      clearValidateData,
      renderTNode,
      renderColumnController,
      renderExpandedRow,
      onInnerExpandRowClick,
      onInnerRowClick,
      renderFirstFilterRow,
      renderAsyncLoading,
      onInnerPageChange,
      setDragSortColumns,
    };
  },

  methods: {
    // support @row-click @page-change @row-hover .etc. events, Vue3 do not need this function
    getListener() {
      const listener: TableListeners = {};
      BASE_TABLE_ALL_EVENTS.forEach((key) => {
        listener[key] = (...args: any) => {
          this.$emit(key, ...args);
        };
      });
      return listener;
    },

    formatNode(api: string, renderInnerNode: Function, condition: boolean, extra?: { reverse?: boolean }) {
      if (!condition) {
        return this[api];
      }
      const innerNode = renderInnerNode(h);
      const propsNode = this.renderTNode(api);
      if (innerNode && !propsNode) {
        return () => innerNode;
      }
      if (propsNode && !innerNode) {
        return () => propsNode;
      }
      if (innerNode && propsNode) {
        return () => extra?.reverse
          ? (
            <div>
              {innerNode}
              {propsNode}
            </div>
            )
          : (
            <div>
              {propsNode}
              {innerNode}
            </div>
            );
      }
      return null;
    },
  },

  render() {
    const isColumnController = !!(this.columnController && Object.keys(this.columnController).length);
    // @ts-expect-error
    const placement = isColumnController ? this.columnController.placement || 'top-right' : '';
    const isBottomController = isColumnController && placement?.indexOf('bottom') !== -1;
    const topContent = this.formatNode(
      'topContent',
      this.renderColumnController,
      isColumnController && !isBottomController,
    );
    const bottomContent = this.formatNode('bottomContent', this.renderColumnController, isBottomController, {
      reverse: true,
    });
    const firstFullRow = this.formatNode('firstFullRow', this.renderFirstFilterRow, !this.hasEmptyCondition);
    const lastFullRow = this.formatNode('lastFullRow', this.renderAsyncLoading, !!this.asyncLoading);

    const props = {
      ...omit(this.$props, OMIT_PROPS),
      rowClassName: this.tRowClassNames,
      rowAttributes: this.tRowAttributes,
      columns: this.tColumns,
      topContent,
      bottomContent,
      firstFullRow,
      lastFullRow,
      thDraggable: this.$props.dragSort === 'col',
      renderExpandedRow: this.showExpandedRow ? this.renderExpandedRow : undefined,
    };

    // 事件，Vue3 do not need this.getListener
    const on: TableListeners = {
      ...this.getListener(),
      'page-change': this.onInnerPageChange,
      'show-element-change': this.onShowElementChange,
    };
    if (this.expandOnRowClick || this.selectOnRowClick) {
      on['row-click'] = this.onInnerRowClick;
    }
    on.LeafColumnsChange = this.setDragSortColumns;
    // replace `scopedSlots={this.$scopedSlots}` of `v-slots={this.$slots}` in Vue3
    return (
      <BaseTable
        ref="primaryTableRef"
        scopedSlots={this.$scopedSlots}
        props={props}
        on={on}
        {...this.$attrs}
        class={this.primaryTableClasses}
      />
    );
  },
});
