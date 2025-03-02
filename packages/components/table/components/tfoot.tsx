import { SetupContext, h, defineComponent, PropType, toRefs } from 'vue';
import { isString } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { get } from 'lodash-es';
import { BaseTableCellParams, RowspanColspan, TableRowData, TdBaseTableProps } from '../type';
import { formatRowAttributes, formatRowClassNames } from '../utils';
import { getColumnFixedStyles } from '../hooks/useFixed';
import { useTNodeJSX } from '../../hooks/tnode';
import useRowspanAndColspan, { getCellKey } from '../hooks/useRowspanAndColspan';
import { RowAndColFixedPosition } from '../types';
import useClassName from '../hooks/useClassName';
import { Styles } from '../../common';

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
  // 表尾吸底内容宽度
  thWidthList?: { [colKey: string]: number };
  footerSummary?: TdBaseTableProps['footerSummary'];
  rowspanAndColspanInFooter: TdBaseTableProps['rowspanAndColspanInFooter'];

  // 是否虚拟滚动
  virtualScroll?: boolean;
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
    thWidthList: [Object] as PropType<TFootProps['thWidthList']>,
    footerSummary: [String, Function] as PropType<TFootProps['footerSummary']>,
    rowspanAndColspanInFooter: Function as PropType<TFootProps['rowspanAndColspanInFooter']>,
    virtualScroll: Boolean,
  },

  // eslint-disable-next-line
  setup(props: TFootProps, context: SetupContext) {
    const renderTNode = useTNodeJSX();
    const classnames = useClassName();
    const { footData, columns, rowKey, rowspanAndColspanInFooter } = toRefs(props);
    const { skipSpansMap } = useRowspanAndColspan(footData, columns, rowKey, rowspanAndColspanInFooter);
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
      skipSpansMap,
      ...classnames,
      renderTFootCell,
      renderTNode,
    };
  },

  render() {
    if (!this.columns) return null;
    // 虚拟滚动情况下，不使用 sticky 定位，外部通过 affix 实现 footer
    const theadClasses = [this.tableFooterClasses.footer, { [this.tableFooterClasses.fixed]: this.isFixedHeader }];
    const footerDomList = this.footData?.map((row, rowIndex) => {
      const trAttributes = formatRowAttributes(this.rowAttributes, { row, rowIndex, type: 'foot' });
      // 自定义行类名
      const customClasses = formatRowClassNames(
        this.rowClassName,
        { row, rowIndex, type: 'foot' },
        this.rowKey || 'id',
      );
      return (
        <tr {...trAttributes} key={rowIndex} class={customClasses}>
          {this.columns.map((col, colIndex) => {
            // 合并单元格过滤
            const cellSpans: RowspanColspan = {};
            let spanState = null;
            if (this.skipSpansMap.size) {
              const cellKey = getCellKey(row, this.rowKey, col.colKey, colIndex);
              spanState = this.skipSpansMap.get(cellKey) || {};
              spanState?.rowspan > 1 && (cellSpans.rowspan = spanState.rowspan);
              spanState?.colspan > 1 && (cellSpans.colspan = spanState.colspan);
              if (spanState.skipped) return null;
            }
            const tdStyles = getColumnFixedStyles(
              col,
              colIndex,
              this.rowAndColFixedPosition,
              this.tableColFixedClasses,
            );
            const style: Styles = { ...tdStyles.style };
            if (this.thWidthList?.[col.colKey]) {
              style.width = `${this.thWidthList[col.colKey]}px`;
            }
            return (
              <td {...{ key: col.colKey, ...cellSpans }} class={tdStyles.classes} style={style}>
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
    });
    const footerSummary = this.renderTNode('footerSummary');
    // 都不存在，则不需要渲染 footer
    if (!footerSummary && (!this.footData || !this.footData.length)) return null;
    return (
      // 虚拟滚动下，不显示 footer，但预留元素，用于高度计算
      <tfoot ref="tFooterRef" class={theadClasses} style={{ visibility: this.virtualScroll ? 'hidden' : 'visible' }}>
        {footerSummary && (
          <tr class={this.tableFullRowClasses.base}>
            <td colspan={this.columns.length}>
              <div class={this.tableFullRowClasses.innerFullElement}>{footerSummary}</div>
            </td>
          </tr>
        )}
        {footerDomList}
      </tfoot>
    );
  },
});
