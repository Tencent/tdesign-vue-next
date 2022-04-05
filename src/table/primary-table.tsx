import { computed, defineComponent, toRefs, h, ref, onMounted } from 'vue';
import get from 'lodash/get';
import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';
import BaseTable from './base-table';
import { useTNodeJSX } from '../hooks/tnode';
import useColumnController from './hooks/useColumnController';
import useRowExpand from './hooks/useRowExpand';
import useTableHeader, { renderTitle } from './hooks/useTableHeader';
import useRowSelect from './hooks/useRowSelect';
import { TdPrimaryTableProps, PrimaryTableCol, TableRowData } from './type';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useAsyncLoading from './hooks/useAsyncLoading';
import { PageInfo } from '../pagination';
import useClassName from './hooks/useClassName';

export { BASE_TABLE_ALL_EVENTS } from './base-table';

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
    const { tableDraggableClasses, tableBaseClass } = useClassName();
    // 自定义列配置功能
    const { tDisplayColumns, renderColumnController } = useColumnController(props, context);
    // 展开/收起行功能
    const { showExpandedRow, showExpandIconColumn, getExpandColumn, renderExpandedRow, onInnerExpandRowClick } =
      useRowExpand(props, context);
    // 排序功能
    const { renderSortIcon } = useSorter(props, context);
    // 行选中功能
    const { formatToRowSelectColumn, selectedRowClassNames } = useRowSelect(props);
    // 过滤功能
    const {
      hasEmptyCondition,
      isTableOverflowHidden,
      renderFilterIcon,
      renderFirstFilterRow,
      setFilterPrimaryTableRef,
    } = useFilter(props);
    // 拖拽排序功能
    const { isColDraggable, isRowDraggable, setDragSortPrimaryTableRef } = useDragSort(props, context);

    const { renderTitleWidthIcon } = useTableHeader(props);
    const { renderAsyncLoading } = useAsyncLoading(props, context);

    const primaryTableClasses = computed(() => {
      return {
        [tableDraggableClasses.colDraggable]: isColDraggable.value,
        [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
        [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
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
      if (isColDraggable.value || isRowDraggable.value) {
        tAttributes.push(({ row }) => ({ 'data-id': get(row, props.rowKey || 'id') }));
      }
      return tAttributes.filter((v) => v);
    });

    // 多个 Hook 共用 primaryTableRef
    onMounted(() => {
      setFilterPrimaryTableRef(primaryTableRef.value);
      setDragSortPrimaryTableRef(primaryTableRef.value);
    });

    // 1. 影响列数量的因素有：自定义列配置、展开/收起行、多级表头；2. 影响表头内容的因素有：排序图标、筛选图标
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        // 自定义列显示控制
        const isDisplayColumn = item.children?.length || tDisplayColumns.value?.includes(item.colKey);
        if (!isDisplayColumn && props.columnController) continue;
        item = formatToRowSelectColumn(item);
        // 添加排序图标和过滤图标
        if (item.sorter || item.filter) {
          const titleContent = renderTitle(context.slots, item, i);
          item.title = (h, p) => {
            const sortIcon = item.sorter ? renderSortIcon(p) : null;
            const filterIcon = item.filter ? renderFilterIcon(p) : null;
            return renderTitleWidthIcon([titleContent, sortIcon, filterIcon]);
          };
        }
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

    return {
      tColumns,
      showExpandedRow,
      tRowClassNames,
      hasEmptyCondition,
      primaryTableRef,
      tRowAttributes,
      primaryTableClasses,
      renderTNode,
      renderColumnController,
      renderExpandedRow,
      onInnerExpandRowClick,
      renderFirstFilterRow,
      renderAsyncLoading,
      onInnerPageChange,
    };
  },

  methods: {
    formatNode(api: string, renderInnerNode: Function, condition: boolean, extra?: { reverse?: boolean }) {
      if (!condition) return this[api];
      const innerNode = renderInnerNode(h);
      const propsNode = this.renderTNode(api);
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
    },
  },

  render() {
    const isColumnController = !!(this.columnController && Object.keys(this.columnController).length);
    // @ts-ignore
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
      ...this.$props,
      rowClassName: this.tRowClassNames,
      rowAttributes: this.tRowAttributes,
      columns: this.tColumns,
      topContent,
      bottomContent,
      firstFullRow,
      lastFullRow,
      onPageChange: this.onInnerPageChange,
      renderExpandedRow: this.showExpandedRow ? this.renderExpandedRow : undefined,
    };

    if (this.expandOnRowClick) {
      props.onRowClick = this.onInnerExpandRowClick;
    }

    return (
      <BaseTable
        ref="primaryTableRef"
        v-slots={this.$slots}
        {...props}
        {...this.$attrs}
        class={this.primaryTableClasses}
      />
    );
  },
});
