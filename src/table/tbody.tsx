import { defineComponent, computed, PropType, toRefs } from 'vue';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import pick from 'lodash/pick';
import TrElement, { ROW_LISTENERS, TABLE_PROPS } from './tr';
import { useConfig } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import useClassName from './hooks/useClassName';
import baseTableProps from './base-table-props';
import { TNodeReturnValue } from '../common';
import useRowspanAndColspan from './hooks/useRowspanAndColspan';
import { BaseTableProps, RowAndColFixedPosition } from './interface';
import { TdBaseTableProps } from './type';
import { VirtualScrollConfig } from '../hooks/useVirtualScrollNew';

export const ROW_AND_TD_LISTENERS = ROW_LISTENERS.concat('cell-click');
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

  // eslint-disable-next-line
  setup(props: TableBodyProps) {
    const renderTNode = useTNodeJSX();
    const { data, columns, rowKey, rowspanAndColspan } = toRefs(props);
    const { t, globalConfig } = useConfig('table', props.locale);
    const { tableFullRowClasses, tableBaseClass } = useClassName();
    const { skipSpansMap } = useRowspanAndColspan(data, columns, rowKey, rowspanAndColspan);

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    return {
      t,
      globalConfig,
      renderTNode,
      tableFullRowClasses,
      tbodyClasses,
      tableBaseClass,
      skipSpansMap,
    };
  },

  render() {
    const renderEmpty = (columns: TableBodyProps['columns']) => {
      const tableWidth = this.bordered ? this.tableWidth - 2 : this.tableWidth;
      return (
        <tr class={[this.tableBaseClass.emptyRow, { [this.tableFullRowClasses.base]: this.isWidthOverflow }]}>
          <td colspan={columns.length}>
            <div
              class={[this.tableBaseClass.empty, { [this.tableFullRowClasses.innerFullRow]: this.isWidthOverflow }]}
              style={this.isWidthOverflow ? { width: `${tableWidth}px` } : {}}
            >
              {this.renderTNode('empty') || this.t(this.globalConfig.empty)}
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
      const tableWidth = this.bordered ? this.tableWidth - 2 : this.tableWidth;
      /** innerFullRow 和 innerFullElement 同时存在，是为了保证 固定列时，当前行不随内容进行横向滚动 */
      return (
        <tr class={classes} key={`key-full-row-${type}`}>
          <td colspan={columnLength}>
            <div
              class={{ [this.tableFullRowClasses.innerFullRow]: isFixedToLeft }}
              style={isFixedToLeft ? { width: `${tableWidth}px` } : {}}
            >
              <div class={this.tableFullRowClasses.innerFullElement}>{fullRowNode}</div>
            </div>
          </td>
        </tr>
      );
    };

    const columnLength = this.columns.length;
    const dataLength = this.data.length;
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
    this.data?.forEach((row, rowIndex) => {
      const rowKey = this.rowKey || 'id';
      const rowValue = get(row, rowKey);
      const trProps = {
        ...pick(this.$props, TABLE_PROPS),
        rowKey,
        row,
        columns: this.columns,
        rowIndex: row.VIRTUAL_SCROLL_INDEX || rowIndex,
        dataLength,
        skipSpansMap: this.skipSpansMap,
        virtualConfig: this.virtualConfig,
        active: this.activeRow?.includes(rowValue),
        isHover: this.hoverRow === rowValue,
        ...pick(this.$props, properties),
        // 遍历的同时，计算后面的节点，是否会因为合并单元格跳过渲染
      };
      if (this.onCellClick) {
        trProps.onCellClick = this.onCellClick;
      }

      const trNode = (
        <TrElement
          v-slots={this.$slots}
          key={get(row, this.rowKey || 'id') || rowIndex}
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

    const list = [getFullRow(columnLength, 'first-full-row'), ...trNodeList, getFullRow(columnLength, 'last-full-row')];

    const isEmpty = !this.data?.length && !this.loading && !this.firstFullRow && !this.lastFullRow;

    // 垫上隐藏的 tr 元素高度
    const translate = `translateY(${this.virtualConfig?.translateY.value}px)`;
    const posStyle = this.virtualConfig?.isVirtualScroll.value
      ? {
          transform: translate,
          '-ms-transform': translate,
          '-moz-transform': translate,
          '-webkit-transform': translate,
        }
      : undefined;

    return (
      <tbody class={this.tbodyClasses} style={{ ...posStyle }}>
        {isEmpty ? renderEmpty(this.columns) : list}
      </tbody>
    );
  },
});
