import type {
  CreateElement,
  PropType,
  SetupContext,
} from '@td/adapter-vue';
import { computed, defineComponent, toRefs } from '@td/adapter-vue';
import { camelCase, get, pick } from 'lodash-es';
import { useConfig, useTNodeJSX } from '@td/adapter-hooks';
import type { TdBaseTableProps } from '@td/intel/components/table/type';
import baseTableProps from '@td/intel/components/table/base-table-props';
import type { VirtualScrollConfig } from '@td/adapter-hooks';
import type { TrProps } from './tr';
import TrElement, { ROW_LISTENERS, TABLE_PROPS } from './tr';
import useClassName from './hooks/useClassName';
import useRowspanAndColspan from './hooks/useRowspanAndColspan';
import type { BaseTableProps, RowAndColFixedPosition } from './interface';

export const ROW_AND_TD_LISTENERS = ROW_LISTENERS.concat('cell-click');
export interface TableBodyProps extends BaseTableProps {
  classPrefix: string;
  ellipsisOverlayClassName: string;
  // 固定列 left/right 具体值
  rowAndColFixedPosition: RowAndColFixedPosition;
  showColumnShadow: { left: boolean; right: boolean };
  tableElm: HTMLDivElement;
  tableWidth: number;
  isWidthOverflow: boolean;
  virtualConfig: VirtualScrollConfig;
  tableContentElm: HTMLDivElement;
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
    ellipsisOverlayClassName: String,
    data: Array as PropType<TableBodyProps['data']>,
    columns: Array as PropType<TableBodyProps['columns']>,
    rowAndColFixedPosition: Map as PropType<TableBodyProps['rowAndColFixedPosition']>,
    showColumnShadow: Object as PropType<TableBodyProps['showColumnShadow']>,
    tableElm: {},
    tableWidth: Number,
    isWidthOverflow: Boolean,
    virtualConfig: Object as PropType<VirtualScrollConfig>,

    tableContentElm: {},
    handleRowMounted: Function as PropType<TableBodyProps['handleRowMounted']>,
    renderExpandedRow: Function as PropType<TableBodyProps['renderExpandedRow']>,
    firstFullRow: [String, Function] as PropType<TableBodyProps['firstFullRow']>,
    lastFullRow: [String, Function] as PropType<TableBodyProps['lastFullRow']>,
    ...pick(baseTableProps, extendTableProps),
  },

  setup(props, { emit }: SetupContext) {
    const renderTNode = useTNodeJSX();
    const {
      data,
      columns,
      rowKey,
      rowspanAndColspan,
    } = toRefs(props);
    const { t, global } = useConfig('table', props.locale);
    const { tableFullRowClasses, tableBaseClass } = useClassName();
    const { skipSpansMap } = useRowspanAndColspan(data, columns, rowKey, rowspanAndColspan);

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    const isFixedLeftColumn = computed(
      () => props.isWidthOverflow && !!props.columns.find(col => col.fixed === 'left'),
    );

    const getTrListeners = () => {
      const trListeners: { [eventName: string]: (e: MouseEvent) => void } = {};
      // add events to row
      ROW_AND_TD_LISTENERS.forEach((eventName) => {
        const name = ['cell-click'].includes(eventName) ? eventName : `row-${eventName}`;
        trListeners[name] = (context) => {
          // props[`onRow${upperFirst(eventName)}`]?.(context);
          // Vue3 ignore this line
          emit(name, context);
        };
      });
      return trListeners;
    };

    return {
      t,
      global,
      tableFullRowClasses,
      tbodyClasses,
      tableBaseClass,
      isFixedLeftColumn,
      skipSpansMap,
      renderTNode,
      getTrListeners,
    };
  },

  render(h) {
    const renderEmpty = (h: CreateElement, columns: TableBodyProps['columns']) => {
      // 小于 100 属于异常宽度，不显示
      const showEmptyText = Boolean(this.tableWidth && this.tableWidth > 100) || process.env.NODE_ENV === 'test';
      const tableWidth = this.bordered ? this.tableWidth - 2 : this.tableWidth;
      return (
        <tr class={[this.tableBaseClass.emptyRow, { [this.tableFullRowClasses.base]: this.isWidthOverflow }]}>
          <td colspan={columns.length}>
            <div
              class={[this.tableBaseClass.empty, { [this.tableFullRowClasses.innerFullRow]: this.isWidthOverflow }]}
              style={this.isWidthOverflow ? { width: `${tableWidth}px` } : {}}
            >
              {showEmptyText ? this.renderTNode('empty') || this.t(this.global.empty) : ''}
            </div>
          </td>
        </tr>
      );
    };

    const getFullRow = (

      h: CreateElement,
      columnLength: number,
      type: 'first-full-row' | 'last-full-row',
    ) => {
      const tType = camelCase(type);
      const fullRowNode = this.renderTNode(tType);
      if (['', null, undefined, false].includes(fullRowNode)) {
        return null;
      }
      // const isFixedToLeft = this.isWidthOverflow && this.columns.find((col) => col.fixed === 'left');
      const classes = [this.tableFullRowClasses.base, this.tableFullRowClasses[tType]];
      const tableWidth = this.bordered ? this.tableWidth - 2 : this.tableWidth;
      /** innerFullRow 和 innerFullElement 同时存在，是为了保证 固定列时，当前行不随内容进行横向滚动 */
      return (
        <tr class={classes}>
          <td colspan={columnLength}>
            <div
              // @ts-expect-error
              class={{ [this.tableFullRowClasses.innerFullRow]: this.isFixedToLeft }}
              // @ts-expect-error
              style={this.isFixedToLeft ? { width: `${tableWidth}px` } : {}}
            >
              <div class={this.tableFullRowClasses.innerFullElement}>{fullRowNode}</div>
            </div>
          </td>
        </tr>
      );
    };

    const columnLength = this.columns.length;
    const dataLength = this.data?.length;
    const trNodeList: JSX.Element[] = [];

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
      // @ts-expect-error
      const trProps: TrProps = {
        ...pick(this.$props, TABLE_PROPS),
        row,
        columns: this.columns,
        rowIndex: row?.__VIRTUAL_SCROLL_INDEX || rowIndex,
        dataLength,
        skipSpansMap: this.skipSpansMap,
        virtualConfig: this.virtualConfig,
        ...pick(this.$props, properties),
      };
      if (this.onCellClick) {
        trProps.onCellClick = this.onCellClick;
      }
      // Vue3 do not need getTrListeners
      const on: { [keys: string]: Function } = this.getTrListeners();
      if (this.handleRowMounted) {
        on['row-mounted'] = this.handleRowMounted;
      }

      // replace scopedSlots of slots in Vue3
      const trNode = (
        <TrElement
          scopedSlots={this.$scopedSlots}
          key={get(row, this.rowKey || 'id')}
          on={on}
          props={trProps}
        >
        </TrElement>
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
        const expandedContent = this.renderExpandedRow(h, p);
        expandedContent && trNodeList.push(expandedContent);
      }
    });

    const list = [
      getFullRow(h, columnLength, 'first-full-row'),
      trNodeList,
      getFullRow(h, columnLength, 'last-full-row'),
    ];
    const isEmpty = !this.data?.length && !this.loading && !this.firstFullRow && !this.lastFullRow;

    // 垫上隐藏的 tr 元素高度
    const translate = `translateY(${this.virtualConfig?.translateY.value}px)`;
    const posStyle = this.virtualConfig?.isVirtualScroll.value
      ? {
          'transform': translate,
          '-ms-transform': translate,
          '-moz-transform': translate,
          '-webkit-transform': translate,
        }
      : undefined;
    return (
      <tbody class={this.tbodyClasses} style={{ ...posStyle }}>
        {isEmpty ? renderEmpty(h, this.columns) : list}
      </tbody>
    );
  },
});
