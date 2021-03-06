import { computed, defineComponent, toRefs, h, ref, onMounted, SetupContext } from 'vue';
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
import {
  TdPrimaryTableProps,
  PrimaryTableCol,
  TableRowData,
  PrimaryTableCellParams,
  PrimaryTableRowEditContext,
} from './type';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useAsyncLoading from './hooks/useAsyncLoading';
import EditableCell, { EditableCellProps } from './editable-cell';
import { PageInfo } from '../pagination';
import useClassName from './hooks/useClassName';
import useEditableRow from './hooks/useEditableRow';

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

const cellRuleMap = new Map<any, PrimaryTableRowEditContext<TableRowData>[]>();

export default defineComponent({
  name: 'TPrimaryTable',

  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },

  setup(props: TdPrimaryTableProps, context: SetupContext) {
    const renderTNode = useTNodeJSX();
    const { columns, columnController } = toRefs(props);
    const primaryTableRef = ref(null);
    const { tableDraggableClasses, tableBaseClass, tableSelectedClasses } = useClassName();
    // ????????????????????????
    const { tDisplayColumns, renderColumnController } = useColumnController(props, context);
    // ??????/???????????????
    const { showExpandedRow, showExpandIconColumn, getExpandColumn, renderExpandedRow, onInnerExpandRowClick } =
      useRowExpand(props, context);
    // ????????????
    const { renderSortIcon } = useSorter(props, context);
    // ???????????????
    const { formatToRowSelectColumn, selectedRowClassNames } = useRowSelect(props, tableSelectedClasses);
    // ????????????
    const {
      hasEmptyCondition,
      isTableOverflowHidden,
      renderFilterIcon,
      renderFirstFilterRow,
      setFilterPrimaryTableRef,
    } = useFilter(props, context);

    // ??????????????????
    const { isRowHandlerDraggable, isRowDraggable, isColDraggable, setDragSortPrimaryTableRef, setDragSortColumns } =
      useDragSort(props, context);

    const { renderTitleWidthIcon } = useTableHeader(props);
    const { renderAsyncLoading } = useAsyncLoading(props, context);

    const { errorListMap, editableKeysMap, validateRowData, onRuleChange, clearValidateData } = useEditableRow(props);

    const primaryTableClasses = computed(() => {
      return {
        [tableDraggableClasses.colDraggable]: isColDraggable.value,
        [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable.value,
        [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
        [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
        [tableBaseClass.tableRowEdit]: props.editableRowKeys,
      };
    });

    // ???????????? TR ???????????????????????????????????????????????????????????? Props ??? BaseTable
    const tRowClassNames = computed(() => {
      const tClassNames = [props.rowClassName, selectedRowClassNames.value];
      return tClassNames.filter((v) => v);
    });

    // ???????????? TR ???????????????????????????????????????????????????????????? Props ??? BaseTable
    const tRowAttributes = computed(() => {
      const tAttributes = [props.rowAttributes];
      if (isRowHandlerDraggable.value || isRowDraggable.value) {
        tAttributes.push(({ row }) => ({ 'data-id': get(row, props.rowKey || 'id') }));
      }
      return tAttributes.filter((v) => v);
    });

    // ?????? Hook ?????? primaryTableRef
    onMounted(() => {
      setFilterPrimaryTableRef(primaryTableRef.value);
      setDragSortPrimaryTableRef(primaryTableRef.value);
    });

    // ?????????????????????
    context.expose({
      validateRowData,
      clearValidateData,
      refreshTable: () => {
        primaryTableRef.value.refreshTable();
      },
    });

    // 1. ?????????????????????????????????????????????????????????/???????????????????????????2. ????????????????????????????????????????????????????????????
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        // ????????????????????????
        const isDisplayColumn = item.children?.length || tDisplayColumns.value?.includes(item.colKey);
        if (!isDisplayColumn && props.columnController) continue;
        item = formatToRowSelectColumn(item);
        // ?????????????????????????????????
        if (item.sorter || item.filter) {
          const titleContent = renderTitle(context.slots, item, i);
          const { ellipsisTitle } = item;
          item.title = (h, p) => {
            const sortIcon = item.sorter ? renderSortIcon(p) : null;
            const filterIcon = item.filter ? renderFilterIcon(p) : null;
            // @ts-ignore ??????????????? Vue2 ??? Vue3 ????????????
            const attach = primaryTableRef.value?.tableContentRef;
            return renderTitleWidthIcon([titleContent, sortIcon, filterIcon], p.col, p.colIndex, ellipsisTitle, attach);
          };
          item.ellipsisTitle = false;
        }
        // ?????????????????????????????????
        if (item.edit?.component) {
          const oldCell = item.cell;
          item.cell = (h, p: PrimaryTableCellParams<TableRowData>) => {
            const cellProps: EditableCellProps = {
              ...p,
              oldCell,
              tableBaseClass,
              onChange: props.onRowEdit,
              onValidate: props.onRowValidate,
              onRuleChange,
            };
            if (props.editableRowKeys) {
              const rowValue = get(p.row, props.rowKey || 'id');
              cellProps.editable = editableKeysMap.value[rowValue] || false;
              const key = [rowValue, p.col.colKey].join();
              const errorList = errorListMap.value?.[key];
              errorList && (cellProps.errors = errorList);
            }
            return <EditableCell {...cellProps} v-slots={context.slots} />;
          };
        }
        if (item.children?.length) {
          item.children = getColumns(item.children);
        }
        // ?????????????????????????????????????????????????????????????????????????????????????????????????????? 1??????????????????????????????
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
      props.onPageChange?.(pageInfo, newData);
      const changeParams: Parameters<TdPrimaryTableProps['onChange']> = [
        { pagination: pageInfo },
        { trigger: 'pagination', currentData: newData },
      ];
      props.onChange?.(...changeParams);
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

      const baseTableProps = {
        ...omit(props, OMIT_PROPS),
        rowClassName: tRowClassNames.value,
        rowAttributes: tRowAttributes.value,
        columns: tColumns.value,
        topContent,
        bottomContent,
        firstFullRow,
        lastFullRow,
        onPageChange: onInnerPageChange,
        renderExpandedRow: showExpandedRow.value ? renderExpandedRow : undefined,
      };

      if (props.expandOnRowClick) {
        baseTableProps.onRowClick = onInnerExpandRowClick;
      }

      return (
        // @ts-ignore
        <BaseTable
          ref={primaryTableRef}
          v-slots={context.slots}
          {...baseTableProps}
          class={primaryTableClasses.value}
          onLeafColumnsChange={setDragSortColumns}
        />
      );
    };
  },
});
