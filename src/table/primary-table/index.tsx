import { defineComponent } from 'vue';
import baseTableProps from '../base-table-props';
import { DataType, TdBaseTableProps, TdPrimaryTableProps, PrimaryTableCol, RowEventContext } from '../type';
import primaryTableProps from '../primary-table-props';
import SimpleTable from '../base-table';
import expand from './mixins/expand';
import select from './mixins/select';
import sort from './mixins/sort';
import rowDraggable from './mixins/row-draggable';
import filter from './mixins/filter';
import showColumns from './mixins/show-columns';
import asyncLoadingMixin from './mixins/async-loading';
import { EVENT_NAME_WITH_KEBAB, RenderExpandRow } from '../util/interface';
import { PageInfo } from '../../pagination/type';
import { emitEvent } from '../../utils/event';
import { getPropsApiByEvent } from '../../utils/helper';

type PageChangeContext = Parameters<TdBaseTableProps['onPageChange']>;
type ChangeContext = Parameters<TdPrimaryTableProps['onChange']>;

export default defineComponent({
  name: 'TTable',
  components: { SimpleTable },
  mixins: [expand, select, sort, rowDraggable, filter, showColumns, asyncLoadingMixin],
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
  emits: ['change', 'page-change', ...EVENT_NAME_WITH_KEBAB],
  computed: {
    rehandleData(): Array<DataType> {
      return this.asyncLoadingHandler();
    },
    rehandleColumns(): Array<PrimaryTableCol> {
      let columns = this.columns.map((col) => ({ ...col }));
      columns = this.getShowColumns([...this.columns]);
      columns = this.getSorterColumns(columns);
      columns = this.getFilterColumns(columns);
      columns = this.getSelectColumns(columns);
      columns = this.getExpandColumns(columns);
      return columns;
    },
  },
  created() {
    if (typeof this.$attrs['expanded-row-render'] !== 'undefined') {
      console.warn('The expandedRowRender prop is deprecated. Use expandedRow instead.');
    }
  },
  methods: {
    // 提供给 BaseTable 添加渲染 Rows 方法
    renderRows(params: RenderExpandRow): void {
      const { row, rowIndex, rows } = params;
      if (row.colKey === 'async-loading-row') {
        rows.splice(rowIndex, 1, this.renderAsyncLoadingRow());
        return;
      }
      this.renderExpandedRow(params);
    },
  },
  render() {
    const { $props, $slots, rehandleColumns, showColumns } = this;

    const rowEvents = {};
    EVENT_NAME_WITH_KEBAB.forEach((eventName) => {
      rowEvents[getPropsApiByEvent(eventName)] = (params: RowEventContext<any>) => {
        emitEvent(this, eventName, params);
      };
    });

    const listeners = {
      onPageChange: (pageInfo: PageInfo, newDataSource: Array<DataType>) => {
        emitEvent<PageChangeContext>(this, 'page-change', pageInfo, newDataSource);
        emitEvent<ChangeContext>(
          this,
          'change',
          { pagination: pageInfo },
          { trigger: 'pagination', currentData: newDataSource },
        );
      },
      onRowClick: this.onRowClick,
      ...rowEvents,
    };
    if (this.expandOnRowClick) {
      listeners.onRowClick = (params: { row: Record<string, any>; index: number }) => {
        this.handleExpandChange(params.row);
      };
    }
    const baseTableProps = {
      ...$props,
      data: this.rehandleData,
      columns: rehandleColumns,
      provider: {
        renderRows: this.renderRows,
        sortOnRowDraggable: this.sortOnRowDraggable,
        dragging: this.dragging,
      },
      ...listeners,
    };
    return (
      <div style="width: 100%">
        {showColumns && this.renderShowColumns()}
        <simple-table {...baseTableProps}>{$slots}</simple-table>
      </div>
    );
  },
});
