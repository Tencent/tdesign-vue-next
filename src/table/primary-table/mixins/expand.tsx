import { defineComponent, VNode, h } from 'vue';
import get from 'lodash/get';
import { TdPrimaryTableProps } from '../../type';
import baseTableProps from '../../base-table-props';
import ExpandBox from '../expand-box';
import TableRow from '../../base-table/table-row';
import { ExpandProps, RenderExpandRow } from '../../util/interface';
import { filterDataByIds, getRecord } from '../../util/common';
import { prefix } from '../../../config';
import { emitEvent } from '../../../utils/event';

type CreateElement = typeof h;

type Columns = TdPrimaryTableProps['columns'];

const expandedColKey = 'expanded-icon-cell';
export default defineComponent({
  name: `${prefix}-primary-table-expand`,
  props: {
    data: baseTableProps.data,
    rowKey: baseTableProps.rowKey,
    ...ExpandProps,
  },
  emits: ['expand-change'],
  computed: {
    reRowKey(): string {
      return this.rowKey || 'id';
    },
  },
  methods: {
    getExpandColumns(columns: Columns): Columns {
      if (!this.expandedRow || !this.expandIcon) return columns;
      return this.expandedRow
        ? [
          {
            colKey: expandedColKey,
            width: 25,
            attrs: { class: [`${prefix}-table-expandable-icon-cell`] },
            cell: (h, { row, rowIndex }) => this.renderExpandIconCell({ row, rowIndex }),
          },
          ...columns,
        ]
        : columns;
    },
    // 渲染展开单元格内容
    renderExpandIconCell({ row = {}, rowIndex }: Record<string, any>): VNode {
      const { expandedRowKeys = [] } = this;
      const id = get(row, this.reRowKey);
      const isExpanded = expandedRowKeys.indexOf(id) !== -1;
      return (
        <ExpandBox
          expandIcon={this.expandIcon}
          expanded={isExpanded}
          row={row}
          rowIndex={rowIndex}
          onClick={(e: MouseEvent) => {
            this.expandOnRowClick && e.stopPropagation();
            this.handleExpandChange(row);
          }}
        >{{ expandIcon: this.$slots.expandIcon }}</ExpandBox>
      );
    },
    // 渲染被展开的TableRow内容
    renderExpandedRow({
      rows, row, columns: defaultColumns, rowIndex,
    }: RenderExpandRow): VNode {
      const columnCounts = defaultColumns.length;
      if (!this.expandedRow) return; // 若无展开渲染函数，则无需处理行数据

      const { expandedRowKeys, expandedRow } = this;
      const id = get(row, this.reRowKey);
      const isShowExpanded = expandedRowKeys.includes(id);
      const params = {
        record: getRecord(row),
        row,
        index: rowIndex,
      };
      const columns = [
        {
          colKey: 'expanded-row',
          attrs: {
            colspan: columnCounts,
            class: [`${prefix}-table-expanded-cell`],
          },
          render: (h: CreateElement): VNode => expandedRow(h, params) as VNode,
        },
      ];

      rows.push(<TableRow
        key={`ExpandTableRowBox${rowIndex}`}
        rowKey={this.rowKey}
        style={{ ...(!isShowExpanded ? { display: 'none' } : {}) }}
        columns={columns}
      />);
    },
    // handle
    handleExpandChange(record: Record<string, any> = {}): void {
      const expandedRowKeys = [...this.expandedRowKeys] as Array<string | number>;
      const id = get(record, this.reRowKey);
      const expandedRowIndex = expandedRowKeys.indexOf(id);
      const isExpanded = expandedRowIndex !== -1;
      isExpanded
        ? expandedRowKeys.splice(expandedRowIndex, 1) // 删除
        : expandedRowKeys.push(id); // 增加
      emitEvent(this, 'expand-change', expandedRowKeys, {
        expandedRowData: filterDataByIds(this.data, expandedRowKeys),
      });
    },
  },
});
