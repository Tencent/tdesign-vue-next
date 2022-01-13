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
import { renderTNodeJSX } from '../../../utils/render-tnode';

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
    getExpandRowHandler(): TdPrimaryTableProps['expandedRow'] {
      if (!this.expandedRow && !this.$slots.expandedRow) return;
      return (h, params) => renderTNodeJSX(this, 'expandedRow', { params });
    },
    getExpandColumns(columns: Columns): Columns {
      const expandRowHandler = this.getExpandRowHandler();
      if (!expandRowHandler || !this.expandIcon) return columns;

      return [
        {
          colKey: expandedColKey,
          width: 48,
          attrs: {
            class: [`${prefix}-table__expandable-icon-cell`],
            style: {
              overflow: 'auto',
            },
          },
          cell: (h, { row, rowIndex }) => this.renderExpandIconCell({ row, rowIndex }),
        },
        ...columns,
      ];
    },
    // 渲染展开单元格内容
    renderExpandIconCell({ row, rowIndex }: Record<string, any>): VNode {
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
        />
      );
    },

    // 渲染被展开行
    renderExpandedRow(
      params: Parameters<TdPrimaryTableProps['expandedRow']>[1],
    ): ReturnType<TdPrimaryTableProps['expandedRow']> {
      const id = get(params.row, this.reRowKey);
      const isShowExpanded = this.expandedRowKeys.includes(id);
      if (isShowExpanded) {
        return (
          <tr>
            <td colspan={this.columns.length}>{renderTNodeJSX(this, 'expandedRow', { params })}</td>
          </tr>
        );
      }
      return null;
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
