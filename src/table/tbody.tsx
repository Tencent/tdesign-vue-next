import { defineComponent, computed, PropType, SetupContext } from 'vue';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import pick from 'lodash/pick';
import TrElement, { ROW_LISTENERS, TABLE_PROPS } from './tr';
import { useConfig } from '../hooks/useConfig';
import { RowspanColspan, TableRowData, BaseTableCellParams } from './type';
import { BaseTableProps } from './interface';
import { RowAndColFixedPosition } from './hooks/useFixed';
import { useTNodeJSX } from '../hooks/tnode';
import useClassName from './hooks/useClassName';
import baseTableProps from './base-table-props';
import { TNodeReturnValue } from '../common';

export const ROW_AND_TD_LISTENERS = ROW_LISTENERS.concat('cell-click');
export interface TableBodyProps extends BaseTableProps {
  // 固定列 left/right 具体值
  rowAndColFixedPosition: RowAndColFixedPosition;
  showColumnShadow: { left: boolean; right: boolean };
  tableElm: any;
  tableWidth: number;
  isWidthOverflow: boolean;
  translateY: number;
  scrollType: string;
  isVirtual: boolean;
  rowHeight: number;
  trs: Map<number, object>;
  bufferSize: number;
  // HTMLDivElement
  tableContentElm: any;
  handleRowMounted: () => void;
}

// table 到 body 的相同属性
export const extendTableProps = [
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
    data: Array as PropType<TableBodyProps['data']>,
    columns: Array as PropType<TableBodyProps['columns']>,
    rowAndColFixedPosition: Map as PropType<TableBodyProps['rowAndColFixedPosition']>,
    showColumnShadow: Object as PropType<TableBodyProps['showColumnShadow']>,
    // eslint-disable-next-line
    tableElm: {},
    tableWidth: Number,
    isWidthOverflow: Boolean,
    // 以下内容为虚拟滚动所需参数
    translateY: Number,
    scrollType: String,
    isVirtual: Boolean,
    rowHeight: Number,
    trs: Map as PropType<TableBodyProps['trs']>,
    bufferSize: Number,
    // eslint-disable-next-line
    tableContentElm: {},
    handleRowMounted: Function as PropType<TableBodyProps['handleRowMounted']>,
    renderExpandedRow: Function as PropType<TableBodyProps['renderExpandedRow']>,
    firstFullRow: [String, Function] as PropType<TableBodyProps['firstFullRow']>,
    lastFullRow: [String, Function] as PropType<TableBodyProps['lastFullRow']>,
    ...pick(baseTableProps, extendTableProps),
  },

  // eslint-disable-next-line
  setup(props: TableBodyProps, { emit }: SetupContext) {
    const renderTNode = useTNodeJSX();
    const { t, global } = useConfig('table');
    const { tableFullRowClasses, tableBaseClass } = useClassName();

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    return {
      t,
      global,
      renderTNode,
      tableFullRowClasses,
      tbodyClasses,
      tableBaseClass,
    };
  },

  render() {
    const renderEmpty = (columns: TableBodyProps['columns']) => {
      return (
        <tr class={[this.tableBaseClass.emptyRow, { [this.tableFullRowClasses.base]: this.isWidthOverflow }]}>
          <td colspan={columns.length}>
            <div
              class={[this.tableBaseClass.empty, { [this.tableFullRowClasses.innerFullRow]: this.isWidthOverflow }]}
              style={this.isWidthOverflow ? { width: `${this.tableWidth}px` } : {}}
            >
              {this.renderTNode('empty') || this.t(this.global.empty)}
            </div>
          </td>
        </tr>
      );
    };

    const getFullRow = (columnLength: number, type: 'first-full-row' | 'last-full-row') => {
      const tType = camelCase(type);
      const fullRowNode = this.renderTNode(tType);
      if (['', null, undefined, false].includes(fullRowNode)) return null;
      const isFixedToLeft = this.isWidthOverflow && this.columns.find((col) => col.fixed === 'left');
      const classes = [this.tableFullRowClasses.base, this.tableFullRowClasses[tType]];
      /** innerFullRow 和 innerFullElement 同时存在，是为了保证 固定列时，当前行不随内容进行横向滚动 */
      return (
        <tr class={classes}>
          <td colspan={columnLength}>
            <div
              class={{ [this.tableFullRowClasses.innerFullRow]: isFixedToLeft }}
              style={isFixedToLeft ? { width: `${this.tableWidth}px` } : {}}
            >
              <div class={this.tableFullRowClasses.innerFullElement}>{fullRowNode}</div>
            </div>
          </td>
        </tr>
      );
    };

    // 受合并单元格影响，部分单元格不显示
    let skipSpansMap = new Map<any, boolean>();

    const onTrRowspanOrColspan = (params: BaseTableCellParams<TableRowData>, cellSpans: RowspanColspan) => {
      const { rowIndex, colIndex } = params;
      if (!cellSpans.rowspan && !cellSpans.colspan) return;
      const maxRowIndex = rowIndex + (cellSpans.rowspan || 1);
      const maxColIndex = colIndex + (cellSpans.colspan || 1);
      for (let i = rowIndex; i < maxRowIndex; i++) {
        for (let j = colIndex; j < maxColIndex; j++) {
          if (i !== rowIndex || j !== colIndex) {
            skipSpansMap.set([i, j].join(), true);
          }
        }
      }
    };

    const columnLength = this.columns.length;
    const dataLength = this.data.length;
    const trNodeList: TNodeReturnValue[] = [];
    // 每次渲染清空合并单元格信息
    skipSpansMap = new Map<any, boolean>();

    this.data?.forEach((row, rowIndex) => {
      const trProps = {
        ...pick(this.$props, TABLE_PROPS),
        rowKey: this.rowKey || 'id',
        row,
        columns: this.columns,
        rowIndex,
        dataLength,
        rowAndColFixedPosition: this.rowAndColFixedPosition,
        skipSpansMap,
        // 遍历的同时，计算后面的节点，是否会因为合并单元格跳过渲染
        onTrRowspanOrColspan,
        isVirtual: this.isVirtual,
        scrollType: this.scrollType,
        rowHeight: this.rowHeight,
        trs: this.trs,
        bufferSize: this.bufferSize,
        tableElm: this.tableElm,
        tableContentElm: this.tableContentElm,
      };
      if (this.onCellClick) {
        trProps.onCellClick = this.onCellClick;
      }

      const trNode = (
        <TrElement
          v-slots={this.$slots}
          key={get(row, this.rowKey || 'id')}
          {...trProps}
          onRowMounted={this.handleRowMounted}
        ></TrElement>
      );
      trNodeList.push(trNode);

      // 执行展开行渲染
      if (this.renderExpandedRow) {
        const p = {
          row,
          index: rowIndex,
          columns: this.columns,
          tableWidth: this.tableWidth,
          isWidthOverflow: this.isWidthOverflow,
        };
        const expandedContent = this.renderExpandedRow(p);
        expandedContent && trNodeList.push(expandedContent);
      }
    });

    const list = [getFullRow(columnLength, 'first-full-row'), trNodeList, getFullRow(columnLength, 'last-full-row')];
    const isEmpty = !this.data?.length && !this.loading;

    const translate = `translate(0, ${this.translateY}px)`;
    const posStyle = {
      transform: translate,
      '-ms-transform': translate,
      '-moz-transform': translate,
      '-webkit-transform': translate,
    };

    return (
      <tbody class={this.tbodyClasses} style={this.isVirtual && { ...posStyle }}>
        {isEmpty ? renderEmpty(this.columns) : list}
      </tbody>
    );
  },
});
