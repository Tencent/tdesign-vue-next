import {
  defineComponent,
  PropType,
  SetupContext,
  h,
  computed,
  ref,
  Ref,
  onMounted,
  onBeforeUnmount,
  inject,
  nextTick,
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

export interface RenderTdExtra {
  rowAndColFixedPosition: RowAndColFixedPosition;
  columnLength: number;
  dataLength: number;
  cellSpans: RowspanColspan;
}

export interface RenderEllipsisCellParams {
  cellNode: any;
}

export type TrPropsKeys =
  | 'rowKey'
  | 'rowClassName'
  | 'columns'
  | 'fixedRows'
  | 'footData'
  | 'rowAttributes'
  | 'rowspanAndColspan'
  | 'onCellClick'
  | 'onRowClick'
  | 'onRowDblclick'
  | 'onRowMouseover'
  | 'onRowMousedown'
  | 'onRowMouseenter'
  | 'onRowMouseleave'
  | 'onRowMouseup';

export type TrCommonProps = Pick<TdPrimaryTableProps, TrPropsKeys>;

export const TABLE_PROPS: TrPropsKeys[] = [
  'rowKey',
  'rowClassName',
  'columns',
  'fixedRows',
  'footData',
  'rowAttributes',
  'rowspanAndColspan',
  'onCellClick',
  'onRowClick',
  'onRowDblclick',
  'onRowMouseover',
  'onRowMousedown',
  'onRowMouseenter',
  'onRowMouseleave',
  'onRowMouseup',
];

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
  tableElm: HTMLDivElement;
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
    tableElm: HTMLDivElement as PropType<TrProps['tableElm']>,
  },

  emits: ['row-mounted'],

  setup(props: TrProps, context: SetupContext) {
    const { tdEllipsisClass, tableBaseClass, tableColFixedClasses, tableRowFixedClasses, tdAlignClasses } =
      useClassName();
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
      return [trStyles.value?.classes, customClasses];
    });

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

    const observe = (element: HTMLElement, root: HTMLElement, callback: Function, marginBottom: number) => {
      if (!window || !window.IntersectionObserver) {
        return;
      }
      try {
        const io = new window.IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              callback();
              io.unobserve(element);
            }
          },
          {
            rootMargin: `0px 0px ${marginBottom}px 0px`,
            root,
          },
        );
        io.observe(element);
        return io;
      } catch (e) {
        console.error(e);
        callback();
      }
    };
    const tr = ref(null);
    const isInit = ref(props.rowIndex === 0);
    const init = () => {
      !isInit.value &&
        requestAnimationFrame(() => {
          isInit.value = true;
        });
    };

    onMounted(() => {
      const { rowIndex, rowHeight, bufferSize, scrollType, isVirtual, row: rowData, trs } = props;
      if (scrollType === 'virtual') {
        if (isVirtual) {
          const { $index } = rowData;
          trs.set($index, tr.value);
          context.emit('row-mounted');
        }
      } else if (scrollType === 'lazy') {
        const tableContentRef: Ref = inject('tableContentRef');
        const rowHeightRef: Ref = inject('rowHeightRef');
        nextTick(() => {
          if (rowHeight === undefined) {
            if (rowIndex === 0) {
              // 获取第一行高度
              const { offsetHeight } = tr.value;
              rowHeightRef.value = offsetHeight;
            } else {
              const height = rowHeightRef.value;
              observe(tr.value, tableContentRef.value, init, height * bufferSize);
            }
          } else {
            observe(tr.value, tableContentRef.value, init, rowHeight * bufferSize);
          }
        });
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
      tableColFixedClasses,
      tSlots: context.slots,
      tdEllipsisClass,
      tableBaseClass,
      tdAlignClasses,
      trStyles,
      classes,
      trAttributes,
      getTrListeners,
      tr,
      isInit,
    };
  },

  methods: {
    renderEllipsisCell(cellParams: BaseTableCellParams<TableRowData>, params: RenderEllipsisCellParams) {
      const { cellNode } = params;
      const { col, colIndex } = cellParams;
      // 前两列左对齐显示
      const placement = colIndex < 2 ? 'top-left' : 'top-right';
      const content = isFunction(col.ellipsis) ? col.ellipsis(h, cellParams) : undefined;
      const tableElement = this.tableElm;
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
          [this.tableBaseClass.tdFirstCol]: colIndex === 0,
          [this.tdAlignClasses[col.align]]: col.align && col.align !== 'left',
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
    const { row, rowIndex, dataLength, rowAndColFixedPosition, scrollType, isInit } = this;
    const hasHolder = scrollType === 'lazy' && !isInit;
    const rowHeightRef: Ref = inject('rowHeightRef');
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
        ref="tr"
        {...this.trAttributes}
        style={this.trStyles?.style}
        class={this.classes}
        {...this.getTrListeners(row, rowIndex)}
      >
        {hasHolder ? [<td style={{ height: `${rowHeightRef.value}px`, border: 'none' }} />] : columVNodeList}
      </tr>
    );
  },
});
