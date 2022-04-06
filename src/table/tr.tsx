import {
  defineComponent,
  PropType,
  SetupContext,
  h,
  computed,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  toRefs,
} from 'vue';
import isFunction from 'lodash/isFunction';
import upperFirst from 'lodash/upperFirst';
import isString from 'lodash/isString';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { formatRowAttributes, formatRowClassNames } from './utils';
import { getRowFixedStyles, getColumnFixedStyles, RowAndColFixedPosition } from './hooks/useFixed';
import useClassName from './hooks/useClassName';
import TEllipsis from './ellipsis';
import { BaseTableCellParams, TableRowData, RowspanColspan, TdPrimaryTableProps, PrimaryTableCellParams } from './type';
import baseTableProps from './base-table-props';
import useLazyLoad from './hooks/useLazyLoad';

export interface RenderTdExtra {
  rowAndColFixedPosition: RowAndColFixedPosition;
  columnLength: number;
  dataLength: number;
  cellSpans: RowspanColspan;
}

export interface RenderEllipsisCellParams {
  cellNode: any;
}

export type TrCommonProps = Pick<TdPrimaryTableProps, TrPropsKeys>;

export const TABLE_PROPS = [
  'rowKey',
  'rowClassName',
  'columns',
  'fixedRows',
  'footData',
  'rowAttributes',
  'rowspanAndColspan',
  'scroll',
  'onCellClick',
  'onRowClick',
  'onRowDblclick',
  'onRowMouseover',
  'onRowMousedown',
  'onRowMouseenter',
  'onRowMouseleave',
  'onRowMouseup',
] as const;

export type TrPropsKeys = typeof TABLE_PROPS[number];

export interface TrProps extends TrCommonProps {
  rowKey: string;
  row: TableRowData;
  rowIndex: number;
  dataLength: number;
  rowAndColFixedPosition: RowAndColFixedPosition;
  // 属性透传，引用传值，可内部改变
  skipSpansMap: Map<any, boolean>;
  onTrRowspanOrColspan?: (params: PrimaryTableCellParams<TableRowData>, cellSpans: RowspanColspan) => void;
  scrollType: string;
  isVirtual: boolean;
  rowHeight: number;
  trs: Map<number, object>;
  bufferSize: number;
  tableElm: any;
  // HTMLDivElement
  tableContentElm: any;
}

export const ROW_LISTENERS = ['click', 'dblclick', 'mouseover', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup'];

export function renderCell(params: BaseTableCellParams<TableRowData>, slots: SetupContext['slots']) {
  const { col, row } = params;
  if (isFunction(col.cell)) {
    return col.cell(h, params);
  }
  if (slots[col.colKey]) {
    return slots[col.colKey](params);
  }
  if (isString(col.cell) && slots[col.cell]) {
    return slots[col.cell](params);
  }
  if (isFunction(col.render)) {
    return col.render(h, { ...params, type: 'cell' });
  }
  return get(row, col.colKey);
}

// 表格行组件
export default defineComponent({
  name: 'TR',

  props: {
    row: Object as PropType<TableRowData>,
    rowIndex: Number,
    dataLength: Number,
    rowAndColFixedPosition: Map as PropType<RowAndColFixedPosition>,
    // 合并单元格，是否跳过渲染
    skipSpansMap: Map as PropType<TrProps['skipSpansMap']>,
    // 扫描到 rowspan 或者 colspan 时触发
    onTrRowspanOrColspan: Function as PropType<TrProps['onTrRowspanOrColspan']>,
    ...pick(baseTableProps, TABLE_PROPS),
    scrollType: String,
    rowHeight: Number,
    trs: Map as PropType<TrProps['trs']>,
    bufferSize: Number,
    isVirtual: Boolean,
    // eslint-disable-next-line
    tableElm: {},
    // eslint-disable-next-line
    tableContentElm: {},
  },

  emits: ['row-mounted'],

  setup(props: TrProps, context: SetupContext) {
    const { tableContentElm } = toRefs(props);
    const trRef = ref(null);
    const {
      tdEllipsisClass,
      tableBaseClass,
      tableColFixedClasses,
      tableRowFixedClasses,
      tdAlignClasses,
      tableDraggableClasses,
    } = useClassName();
    const trStyles = computed(() =>
      getRowFixedStyles(
        get(props.row, props.rowKey || 'id'),
        props.rowIndex,
        props.dataLength,
        props.fixedRows,
        props.rowAndColFixedPosition,
        tableRowFixedClasses,
      ),
    );

    const trAttributes = computed(
      () => formatRowAttributes(props.rowAttributes, { row: props.row, rowIndex: props.rowIndex, type: 'body' }) || {},
    );

    const classes = computed(() => {
      const customClasses = formatRowClassNames(
        props.rowClassName,
        { row: props.row, rowIndex: props.rowIndex, type: 'body' },
        props.rowKey || 'id',
      );
      return [trStyles.value?.classes, customClasses].filter((v) => v);
    });

    const { hasLazyLoadHolder, tRowHeight } = useLazyLoad(
      tableContentElm,
      trRef,
      reactive({ ...props.scroll, rowIndex: props.rowIndex }),
    );

    const getTrListeners = (row: TableRowData, rowIndex: number) => {
      const trListeners: { [eventName: string]: (e: MouseEvent) => void } = {};
      // add events to row
      ROW_LISTENERS.forEach((eventName) => {
        trListeners[`on${upperFirst(eventName)}`] = (e: MouseEvent) => {
          const p = { e, row, index: rowIndex };
          props[`onRow${upperFirst(eventName)}`]?.(p);
        };
      });
      return trListeners;
    };

    onMounted(() => {
      const { scrollType, isVirtual, row: rowData, trs } = props;
      if (scrollType === 'virtual') {
        if (isVirtual) {
          const { $index } = rowData;
          trs.set($index, trRef.value);
          context.emit('row-mounted');
        }
      }
    });

    onBeforeUnmount(() => {
      if (props.isVirtual) {
        const { trs, row } = props;
        const { $index } = row;
        trs.delete($index);
      }
    });

    return {
      trRef,
      tableColFixedClasses,
      tSlots: context.slots,
      tdEllipsisClass,
      tableBaseClass,
      tdAlignClasses,
      tableDraggableClasses,
      trStyles,
      classes,
      trAttributes,
      tRowHeight,
      hasLazyLoadHolder,
      getTrListeners,
    };
  },

  methods: {
    renderEllipsisCell(cellParams: BaseTableCellParams<TableRowData>, params: RenderEllipsisCellParams) {
      const { cellNode } = params;
      const { col, colIndex } = cellParams;
      // 前两列左对齐显示
      const placement = colIndex < 2 ? 'top-left' : 'top-right';
      const content = isFunction(col.ellipsis) ? col.ellipsis(h, cellParams) : undefined;
      const tableElement = this.tableElm as HTMLDivElement;
      return (
        <TEllipsis
          placement={placement}
          attach={tableElement ? () => tableElement : undefined}
          popupContent={content && (() => content)}
          popupProps={typeof col.ellipsis === 'object' ? col.ellipsis : undefined}
        >
          {cellNode}
        </TEllipsis>
      );
    },

    renderTd(params: BaseTableCellParams<TableRowData>, extra: RenderTdExtra) {
      const { col, colIndex, rowIndex } = params;
      const { cellSpans, dataLength, rowAndColFixedPosition } = extra;
      const cellNode = renderCell(params, this.tSlots);
      const tdStyles = getColumnFixedStyles(col, colIndex, rowAndColFixedPosition, this.tableColFixedClasses);
      const customClasses = isFunction(col.className) ? col.className({ ...params, type: 'td' }) : col.className;
      const classes = [
        tdStyles.classes,
        customClasses,
        {
          [this.tdEllipsisClass]: col.ellipsis,
          [this.tableBaseClass.tdLastRow]: rowIndex + cellSpans.rowspan === dataLength,
          [this.tableBaseClass.tdFirstCol]: colIndex === 0 && this.rowspanAndColspan,
          [this.tdAlignClasses[col.align]]: col.align && col.align !== 'left',
          // 标记可拖拽列
          [this.tableDraggableClasses.handle]: col.colKey === 'drag',
        },
      ];
      const onClick = (e: MouseEvent) => {
        const p = { ...params, e };
        this.onCellClick?.(p);
      };
      const attrs = { ...col.attrs, ...cellSpans };
      return (
        <td class={classes} style={tdStyles.style} {...attrs} onClick={onClick}>
          {col.ellipsis ? this.renderEllipsisCell(params, { cellNode }) : cellNode}
        </td>
      );
    },
  },

  render() {
    const { row, rowIndex, dataLength, rowAndColFixedPosition } = this;
    const columVNodeList = this.columns?.map((col, colIndex) => {
      const cellSpans: RowspanColspan = {};
      const params = {
        row,
        col,
        rowIndex,
        colIndex,
      };
      if (isFunction(this.rowspanAndColspan)) {
        const o = this.rowspanAndColspan(params);
        o?.rowspan > 1 && (cellSpans.rowspan = o.rowspan);
        o?.colspan > 1 && (cellSpans.colspan = o.colspan);
        this.onTrRowspanOrColspan?.(params, cellSpans);
      }
      const skipped = this.skipSpansMap?.get([rowIndex, colIndex].join());
      if (skipped) return null;
      return this.renderTd(params, {
        dataLength,
        rowAndColFixedPosition,
        columnLength: this.columns.length,
        cellSpans,
      });
    });
    return (
      <tr
        ref="trRef"
        {...this.trAttributes}
        style={this.trStyles?.style}
        class={this.classes}
        {...this.getTrListeners(row, rowIndex)}
      >
        {this.hasLazyLoadHolder ? [<td style={{ height: `${this.tRowHeight}px`, border: 'none' }} />] : columVNodeList}
      </tr>
    );
  },
});
