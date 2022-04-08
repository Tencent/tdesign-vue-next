import { SetupContext, h, defineComponent, PropType } from 'vue';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { BaseTableCellParams, TableRowData, TdBaseTableProps } from './type';
import { formatRowAttributes, formatRowClassNames } from './utils';
import { getColumnFixedStyles, RowAndColFixedPosition } from './hooks/useFixed';
import useClassName from './hooks/useClassName';

export interface TFootProps {
  rowKey: string;
  // 是否固定表头
  isFixedHeader: boolean;
  // 固定列 left/right 具体值
  rowAndColFixedPosition: RowAndColFixedPosition;
  footData: TdBaseTableProps['footData'];
  columns: TdBaseTableProps['columns'];
  rowAttributes: TdBaseTableProps['rowAttributes'];
  rowClassName: TdBaseTableProps['rowClassName'];
}

export default defineComponent({
  name: 'TFoot',

  props: {
    rowKey: String,
    isFixedHeader: Boolean,
    rowAndColFixedPosition: Map as PropType<TFootProps['rowAndColFixedPosition']>,
    footData: Array as PropType<TFootProps['footData']>,
    columns: Array as PropType<TFootProps['columns']>,
    rowAttributes: [Array, Object, Function] as PropType<TFootProps['rowAttributes']>,
    rowClassName: [Array, String, Object, Function] as PropType<TFootProps['rowClassName']>,
  },

  // eslint-disable-next-line
  setup(props: TFootProps, context: SetupContext) {
    const classnames = useClassName();
    const renderTFootCell = (p: BaseTableCellParams<TableRowData>) => {
      const { col, row } = p;
      if (isFunction(col.foot)) {
        return col.foot(h, p);
      }
      if (isString(col.foot) && context.slots[col.foot]) {
        return context.slots[col.foot](p) || col.foot;
      }
      return col.foot || get(row, col.colKey);
    };

    return {
      ...classnames,
      renderTFootCell,
    };
  },

  render() {
    if (!this.footData || !this.footData.length || !this.columns) return null;
    const theadClasses = [this.tableFooterClasses.footer, { [this.tableFooterClasses.fixed]: this.isFixedHeader }];
    return (
      <tfoot ref="tfooterRef" class={theadClasses}>
        {this.footData.map((row, rowIndex) => {
          const trAttributes = formatRowAttributes(this.rowAttributes, { row, rowIndex, type: 'foot' });
          // 自定义行类名
          const customClasses = formatRowClassNames(
            this.rowClassName,
            { row, rowIndex, type: 'foot' },
            this.rowKey || 'id',
          );
          return (
            <tr key={rowIndex} {...trAttributes} class={customClasses}>
              {this.columns.map((col, colIndex) => {
                const tdStyles = getColumnFixedStyles(
                  col,
                  colIndex,
                  this.rowAndColFixedPosition,
                  this.tableColFixedClasses,
                );
                return (
                  <td key={col.colKey} class={tdStyles.classes} style={tdStyles.style}>
                    {this.renderTFootCell({
                      row,
                      rowIndex,
                      col,
                      colIndex,
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tfoot>
    );
  },
});
