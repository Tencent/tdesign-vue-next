import { SetupContext, h, defineComponent, PropType, toRefs } from 'vue';
import { isString, isFunction, get } from 'lodash-es';
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
  setup(props, context: SetupContext) {
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
    return () => {
      if (!columns.value) return null;
      // 虚拟滚动情况下，不使用 sticky 定位，外部通过 affix 实现 footer
      const theadClasses = [
        classnames.tableFooterClasses.footer,
        { [classnames.tableFooterClasses.fixed]: props.isFixedHeader },
      ];
      const footerDomList = props.footData?.map((row, rowIndex) => {
        const trAttributes = formatRowAttributes(props.rowAttributes, { row, rowIndex, type: 'foot' });
        // 自定义行类名
        const customClasses = formatRowClassNames(
          props.rowClassName,
          { row, rowIndex, type: 'foot' },
          rowKey.value || 'id',
        );
        return (
          <tr {...trAttributes} key={rowIndex} class={customClasses}>
            {columns.value.map((col, colIndex) => {
              // 合并单元格过滤
              const cellSpans: RowspanColspan = {};
              let spanState = null;
              if (skipSpansMap.value.size) {
                const cellKey = getCellKey(row, rowKey.value, col.colKey, colIndex);
                spanState = skipSpansMap.value.get(cellKey) || {};
                spanState?.rowspan > 1 && (cellSpans.rowspan = spanState.rowspan);
                spanState?.colspan > 1 && (cellSpans.colspan = spanState.colspan);
                if (spanState.skipped) return null;
              }
              const tdStyles = getColumnFixedStyles(
                col,
                colIndex,
                props.rowAndColFixedPosition,
                classnames.tableColFixedClasses,
              );
              const style: Styles = { ...tdStyles.style };
              if (props.thWidthList?.[col.colKey]) {
                style.width = `${props.thWidthList[col.colKey]}px`;
              }
              return (
                <td {...{ key: col.colKey, ...cellSpans }} class={tdStyles.classes} style={style}>
                  {renderTFootCell({
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
      const footerSummary = renderTNode('footerSummary');
      // 都不存在，则不需要渲染 footer
      if (!footerSummary && (!props.footData || !props.footData.length)) return null;
      return (
        // 虚拟滚动下，不显示 footer，但预留元素，用于高度计算
        <tfoot class={theadClasses} style={{ visibility: props.virtualScroll ? 'hidden' : 'visible' }}>
          {footerSummary && (
            <tr class={classnames.tableFullRowClasses.base}>
              <td colspan={columns.value.length}>
                <div class={classnames.tableFullRowClasses.innerFullElement}>{footerSummary}</div>
              </td>
            </tr>
          )}
          {footerDomList}
        </tfoot>
      );
    };
  },
});
