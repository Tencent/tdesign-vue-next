import { defineComponent, computed, PropType, toRefs } from 'vue';
import { camelCase, get, pick } from 'lodash-es';
import TrElement, { ROW_LISTENERS, TABLE_PROPS } from './tr';

import { useConfig, useTNodeJSX } from '@tdesign/shared-hooks';

import useClassName from '../hooks/useClassName';
import baseTableProps from '../base-table-props';
import { TNodeReturnValue } from '../../common';
import useRowspanAndColspan, { getCellKey, SkipSpansValue } from '../hooks/useRowspanAndColspan';
import { BaseTableProps, RowAndColFixedPosition } from '../types';
import { TdBaseTableProps } from '../type';
import type { VirtualScrollConfig } from '@tdesign/shared-hooks';
import type { CamelCase } from '@tdesign/common-js/utils/types';

export const ROW_AND_TD_LISTENERS = [...ROW_LISTENERS, 'cell-click'];
export interface TableBodyProps extends BaseTableProps {
  classPrefix: string;
  ellipsisOverlayClassName: string;
  // 固定列 left/right 具体值
  rowAndColFixedPosition: RowAndColFixedPosition;
  showColumnShadow: { left: boolean; right: boolean };
  tableElm: any;
  tableWidth: number;
  isWidthOverflow: boolean;
  virtualConfig: VirtualScrollConfig;
  // HTMLDivElement
  tableContentElm: any;
  cellEmptyContent: TdBaseTableProps['cellEmptyContent'];
  handleRowMounted: (rowData: any) => void;
}

// table 到 body 的相同属性
export const extendTableProps = [
  'bordered',
  'rowKey',
  'rowClassName',
  'rowAttributes',
  'loading',
  'empty',
  'fixedRows',
  'firstFullRow',
  'lastFullRow',
  'rowspanAndColspan',
  'scroll',
  'cellEmptyContent',
  'pagination',
  'attach',
  'onCellClick',
  'onPageChange',
  'onRowClick',
  'onRowDblclick',
  'onRowMouseover',
  'onRowMousedown',
  'onRowMouseenter',
  'onRowMouseleave',
  'onRowMouseup',
  'onScroll',
  'onScrollX',
  'onScrollY',
];

export default defineComponent({
  name: 'TBody',
  props: {
    classPrefix: String,
    data: Array as PropType<TableBodyProps['data']>,
    columns: Array as PropType<TableBodyProps['columns']>,
    ellipsisOverlayClassName: String,
    rowAndColFixedPosition: Map as PropType<TableBodyProps['rowAndColFixedPosition']>,
    showColumnShadow: Object as PropType<TableBodyProps['showColumnShadow']>,
    // eslint-disable-next-line
    tableElm: {},
    tableWidth: Number,
    isWidthOverflow: Boolean,
    virtualConfig: Object as PropType<VirtualScrollConfig>,
    // eslint-disable-next-line
    tableContentElm: {},
    handleRowMounted: Function as PropType<TableBodyProps['handleRowMounted']>,
    renderExpandedRow: Function as PropType<TableBodyProps['renderExpandedRow']>,
    firstFullRow: [String, Function] as PropType<TableBodyProps['firstFullRow']>,
    lastFullRow: [String, Function] as PropType<TableBodyProps['lastFullRow']>,
    activeRow: [Array] as PropType<Array<string | number>>,
    hoverRow: [String, Number],
    ...pick(baseTableProps, extendTableProps),
  },
  setup(props, { slots }) {
    const renderTNode = useTNodeJSX();
    const { data, columns, rowKey, rowspanAndColspan } = toRefs(props);
    const { t, globalConfig } = useConfig('table', props.locale);
    const { tableFullRowClasses, tableBaseClass } = useClassName();
    const { skipSpansMap } = useRowspanAndColspan(data, columns, rowKey, rowspanAndColspan);

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    return () => {
      const renderEmpty = (columns: TableBodyProps['columns']) => {
        const tableWidth = props.bordered ? props.tableWidth - 2 : props.tableWidth;
        return (
          <tr class={[tableBaseClass.emptyRow, { [tableFullRowClasses.base]: props.isWidthOverflow }]}>
            <td colspan={columns.length}>
              <div
                class={[tableBaseClass.empty, { [tableFullRowClasses.innerFullRow]: props.isWidthOverflow }]}
                style={props.isWidthOverflow ? { width: `${tableWidth}px` } : {}}
              >
                {renderTNode('empty') || t(globalConfig.value.empty)}
              </div>
            </td>
          </tr>
        );
      };

      const getFullRow = (columnLength: number, type: 'first-full-row' | 'last-full-row') => {
        const tType = camelCase(type) as CamelCase<typeof type, '-'>;
        const fullRowNode = renderTNode(tType);
        if (['', null, undefined, false].includes(fullRowNode)) return null;
        const isFixedToLeft = props.isWidthOverflow && columns.value.find((col) => col.fixed === 'left');
        const classes = [tableFullRowClasses.base, tableFullRowClasses[tType]];
        const tableWidth = props.bordered ? props.tableWidth - 2 : props.tableWidth;
        /** innerFullRow 和 innerFullElement 同时存在，是为了保证 固定列时，当前行不随内容进行横向滚动 */
        return (
          <tr class={classes} key={`key-full-row-${type}`}>
            <td colspan={columnLength}>
              <div
                class={{ [tableFullRowClasses.innerFullRow]: isFixedToLeft }}
                style={isFixedToLeft ? { width: `${tableWidth}px` } : {}}
              >
                <div class={tableFullRowClasses.innerFullElement}>{fullRowNode}</div>
              </div>
            </td>
          </tr>
        );
      };

      const columnLength = columns.value.length;
      const dataLength = data.value?.length;
      const trNodeList: TNodeReturnValue[] = [];

      const properties = [
        'classPrefix',
        'ellipsisOverlayClassName',
        'rowAndColFixedPosition',
        'scroll',
        'tableElm',
        'tableContentElm',
        'pagination',
        'attach',
      ];

      const renderData = props.virtualConfig.isVirtualScroll.value ? props.virtualConfig.visibleData.value : data.value;

      const getFirstRowReviveInfo = () => {
        if (!props.virtualConfig.isVirtualScroll.value || !renderData?.length || !skipSpansMap.value.size) {
          return null;
        }
        // 定位虚拟滚动窗口真正的起始行（全局索引出现跳变处），以兼容存在冻结行（fixedRows）的场景
        let windowStartRenderIndex = 0;
        for (let k = 1; k < renderData.length; k++) {
          if ((renderData[k].VIRTUAL_SCROLL_INDEX ?? k) !== (renderData[k - 1].VIRTUAL_SCROLL_INDEX ?? k - 1) + 1) {
            windowStartRenderIndex = k;
            break;
          }
        }
        const firstRow = renderData[windowStartRenderIndex];
        const firstIndex = firstRow.VIRTUAL_SCROLL_INDEX ?? 0;
        let reviveCells: Map<number, { row: TableBodyProps['data'][number]; rowspan: number; colspan: number }> = null;
        columns.value.forEach((col, colIndex) => {
          const cellKey = getCellKey(firstRow, rowKey.value, col.colKey, colIndex, firstIndex);
          const state: SkipSpansValue = skipSpansMap.value.get(cellKey);
          // 仅处理：被合并跳过 && 合并块起始列即当前列（避免 colspan 场景重复复活） && 合并块起始行在窗口之前
          if (!state?.skipped || state.startColIndex !== colIndex || !(state.startRowIndex < firstIndex)) {
            return;
          }
          const startRow = data.value[state.startRowIndex];
          if (!startRow) return;
          const startKey = getCellKey(startRow, rowKey.value, col.colKey, colIndex, state.startRowIndex);
          const startState = skipSpansMap.value.get(startKey) || {};
          const remainRowspan = (startState.rowspan || 1) - (firstIndex - state.startRowIndex);
          if (!reviveCells) reviveCells = new Map();
          reviveCells.set(colIndex, {
            row: startRow,
            rowspan: remainRowspan,
            colspan: startState.colspan,
          });
        });
        return reviveCells ? { renderIndex: windowStartRenderIndex, reviveCells } : null;
      };
      const firstRowReviveInfo = getFirstRowReviveInfo();

      renderData?.forEach((row, rowIndex) => {
        const rowKey = props.rowKey || 'id';
        const rowValue = get(row, rowKey);
        const trProps = {
          ...pick(props, TABLE_PROPS),
          rowKey,
          row,
          columns: columns.value,
          rowIndex: row.VIRTUAL_SCROLL_INDEX || rowIndex,
          dataLength,
          skipSpansMap: skipSpansMap.value,
          reviveCells: firstRowReviveInfo?.renderIndex === rowIndex ? firstRowReviveInfo.reviveCells : null,
          virtualConfig: props.virtualConfig,
          active: props.activeRow?.includes(rowValue),
          isHover: props.hoverRow === rowValue,
          ...pick(props, properties),
          // 遍历的同时，计算后面的节点，是否会因为合并单元格跳过渲染
        };
        if (props.onCellClick) {
          trProps.onCellClick = props.onCellClick;
        }

        const trNode = (
          <TrElement
            v-slots={slots}
            key={get(row, rowKey || 'id') || rowIndex}
            {...trProps}
            onRowMounted={props.handleRowMounted}
          />
        );
        trNodeList.push(trNode);

        // 执行展开行渲染
        if (props.renderExpandedRow) {
          const p = {
            row,
            index: rowIndex,
            columns: columns.value,
            tableWidth: props.tableWidth,
            isWidthOverflow: props.isWidthOverflow,
          };
          const expandedContent = props.renderExpandedRow(p);
          expandedContent && trNodeList.push(expandedContent);
        }
      });

      const list = [
        getFullRow(columnLength, 'first-full-row'),
        ...trNodeList,
        getFullRow(columnLength, 'last-full-row'),
      ];

      const isEmpty = !data.value?.length && !props.loading && !props.firstFullRow && !props.lastFullRow;

      // 垫上隐藏的 tr 元素高度
      const translate = `translateY(${props.virtualConfig?.translateY.value}px)`;
      const posStyle = props.virtualConfig?.isVirtualScroll.value
        ? {
            transform: translate,
            '-ms-transform': translate,
            '-moz-transform': translate,
            '-webkit-transform': translate,
          }
        : undefined;

      return (
        <tbody class={tbodyClasses.value} style={{ ...posStyle }}>
          {isEmpty ? renderEmpty(columns.value) : list}
        </tbody>
      );
    };
  },
});
