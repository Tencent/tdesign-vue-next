import { defineComponent } from 'vue';
import baseTableProps from '../base-table-props';
import {
  DataType, TdBaseTableProps, TdPrimaryTableProps, PrimaryTableCol,
} from '../type';
import primaryTableProps from '../primary-table-props';
import SimpleTable from '../base-table';
import { prefix } from '../../config';
import expand from './mixins/expand';
import select from './mixins/select';
import sort from './mixins/sort';
import rowDraggable from './mixins/row-draggable';
import filter from './mixins/filter';
import showColumns from './mixins/show-columns';
import asyncLoadingMixin from './mixins/async-loading';
import { RenderExpandRow } from '../util/interface';
import { PageInfo } from '../../pagination/type';
import { emitEvent } from '../../utils/event';

type PageChangeContext = Parameters<TdBaseTableProps['onPageChange']>;
type ChangeContext = Parameters<TdPrimaryTableProps['onChange']>;

export default defineComponent({
  name: `${prefix}-primary-table`,
  components: { SimpleTable },
  mixins: [expand, select, sort, rowDraggable, filter, showColumns, asyncLoadingMixin],
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
  emits: ['change', 'page-change'],
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
    const {
      $props, $slots: scopedSlots, rehandleColumns, showColumns,
    } = this;
    const baseTableProps = {
      ...$props,
      data: this.rehandleData,
      columns: rehandleColumns,
      provider: {
        renderRows: this.renderRows,
        sortOnRowDraggable: this.sortOnRowDraggable,
        dragging: this.dragging,
        scopedSlots,
      },
      onPageChange: (pageInfo: PageInfo, newDataSource: Array<DataType>) => {
        emitEvent<PageChangeContext>(this, 'page-change', pageInfo, newDataSource);
        emitEvent<ChangeContext>(
          this, 'change',
          { pagination: pageInfo },
          { trigger: 'pagination', currentData: newDataSource },
        );
      },
      onRowDragstart: this.onDragStart,
      onRowDragover: this.onDragOver,
    };
    return (
      <div>
        {showColumns && this.renderShowColumns()}
        <simple-table {...baseTableProps}></simple-table>
      </div>
    );
  },
});
