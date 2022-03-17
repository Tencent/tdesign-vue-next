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
import { EVENT_NAME_WITH_KEBAB } from '../util/interface';
import { PageInfo } from '../../pagination/type';
import { emitEvent } from '../../utils/event';
import { getPropsApiByEvent } from '../../utils/helper';
import { renderTNodeJSX } from '../../utils/render-tnode';

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
    // 最后一行，通行数据，可能是异步加载状态，可能是其他
    renderLastFullRow() {
      const lastFullRow = renderTNodeJSX(this, 'lastFullRow');
      const asyncLoadingNode = this.renderAsyncLoadingRow();
      const nodes = [lastFullRow, asyncLoadingNode].filter((v) => ![undefined, null, false].includes(v));
      if (nodes.length === 0) return null;
      if (nodes.length === 1) return nodes[0];
      return (
        <div>
          {nodes[0]}
          {nodes[1]}
        </div>
      );
    },
  },
  render() {
    const { $props, $slots, rehandleColumns } = this;

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
      onRowDragstart: this.onDragStart,
      onRowDragover: this.onDragOver,
      ...rowEvents,
    };
    if (this.expandOnRowClick) {
      listeners.onRowClick = (params: { row: Record<string, any>; index: number }) => {
        this.handleExpandChange(params.row);
      };
    }
    const baseTableProps = {
      ...$props,
      columns: rehandleColumns,
      provider: {
        renderExpandedRow: this.expandedRow ?? this.$slots.expandedRow ? this.renderExpandedRow : undefined,
        sortOnRowDraggable: this.sortOnRowDraggable,
        dragging: this.dragging,
      },
      firstFullRow: this.hasFilterCondition ? this.renderFirstFilterRow : this.firstFullRow,
      lastFullRow: this.renderLastFullRow,
      empty: this.empty,
      ...listeners,
    };
    return (
      <div style="width: 100%">
        <simple-table {...baseTableProps}>{$slots}</simple-table>
      </div>
    );
  },
});
