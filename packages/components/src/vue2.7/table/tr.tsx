import type { CreateElement, PropType, SetupContext } from '@td/adapter-vue';
import {
  computed,
  defineComponent,
  h,
  reactive,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { get, isFunction, isString, pick, upperFirst } from 'lodash-es';
import type { ScopedSlotReturnValue } from 'vue/types/vnode';
import type {
  BaseTableCellParams,
  RowspanColspan,
  TableRowData,
  TdBaseTableProps,
  TdPrimaryTableProps,
} from '@td/intel/components/table/type';
import type { AttachNode } from '@td/shared/interface';
import baseTableProps from '@td/intel/components/table/base-table-props';
import type { VirtualScrollConfig } from '@td/adapter-hooks';
import { useLazyLoad } from '@td/adapter-hooks';
import type { TdPaginationProps as PaginationProps } from '@td/intel/components/pagination/type';
import { formatClassNames, formatRowAttributes, formatRowClassNames } from './utils';
import { getColumnFixedStyles, getRowFixedStyles } from './hooks/useFixed';
import type { RowAndColFixedPosition } from './interface';
import useClassName from './hooks/useClassName';
import TEllipsis from './ellipsis';
import type { SkipSpansValue } from './hooks/useRowspanAndColspan';
import { getCellKey } from './hooks/useRowspanAndColspan';

export interface RenderTdExtra {
  rowAndColFixedPosition: RowAndColFixedPosition;
  columnLength: number;
  dataLength: number;
  cellSpans: RowspanColspan;
  cellEmptyContent: TdBaseTableProps['cellEmptyContent'];
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
  'cellEmptyContent',
  'pagination',
  'attach',
  'onCellClick',
  'onRowClick',
  'onRowDblclick',
  'onRowMouseover',
  'onRowMousedown',
  'onRowMouseenter',
  'onRowMouseleave',
  'onRowMouseup',
] as const;

export type TrPropsKeys = (typeof TABLE_PROPS)[number];

export interface TrProps extends TrCommonProps {
  row: TableRowData;
  rowIndex: number;
  ellipsisOverlayClassName?: string;
  classPrefix?: string;
  dataLength?: number;
  rowAndColFixedPosition?: RowAndColFixedPosition;
  skipSpansMap?: Map<string, SkipSpansValue>;
  tableElm?: HTMLDivElement;
  scrollType?: string;
  isVirtual?: boolean;
  rowHeight?: number;
  trs?: Map<number, object>;
  bufferSize?: number;
  tableContentElm?: HTMLDivElement;
  cellEmptyContent?: TdBaseTableProps['cellEmptyContent'];
  virtualConfig: VirtualScrollConfig;
  attach?: AttachNode;
}

export const ROW_LISTENERS = ['click', 'dblclick', 'mouseover', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup'];

export function renderCell(
  params: BaseTableCellParams<TableRowData>,
  slots: SetupContext['slots'],
  extra?: {
    cellEmptyContent?: TdBaseTableProps['cellEmptyContent'];
    pagination?: PaginationProps;
  },
) {
  const { col, row, rowIndex } = params;
  // support serial number column
  if (col.colKey === 'serial-number') {
    const {
      current,
      pageSize,
      defaultCurrent,
      defaultPageSize,
    } = extra?.pagination || {};
    const tCurrent = current || defaultCurrent;
    const tPageSize = pageSize || defaultPageSize;
    if (tPageSize && tCurrent) {
      return tPageSize * (tCurrent - 1) + rowIndex + 1;
    }
    return rowIndex + 1;
  }
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
  const r = get(row, col.colKey);
  // 0 和 false 属于正常可用之，不能使用兜底逻辑 cellEmptyContent
  if (![undefined, '', null].includes(r)) {
    return r;
  }
  // cellEmptyContent 作为空数据兜底显示，用户可自定义
  if (extra?.cellEmptyContent) {
    return isFunction(extra.cellEmptyContent) ? extra.cellEmptyContent(h, params) : extra.cellEmptyContent;
  }
  const hParams = h;
  Object.assign(hParams, params || {});
  if (slots.cellEmptyContent) {
    return slots.cellEmptyContent(hParams);
  }
  if (slots['cell-empty-content']) {
    return slots['cell-empty-content'](hParams);
  }
  return r;
}

// 表格行组件
export default defineComponent({
  name: 'TR',

  props: {
    row: Object as PropType<TableRowData>,
    rowIndex: Number,
    ellipsisOverlayClassName: String,
    classPrefix: String,
    dataLength: Number,
    rowAndColFixedPosition: Map as PropType<RowAndColFixedPosition>,
    // 合并单元格，是否跳过渲染
    skipSpansMap: Map as PropType<TrProps['skipSpansMap']>,
    virtualConfig: Object as PropType<TrProps['virtualConfig']>,
    ...pick(baseTableProps, TABLE_PROPS),
    // eslint-disabled-next-line
    tableElm: {},
    // eslint-disabled-next-line
    tableContentElm: {},
  },

  setup(props, context: SetupContext) {
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

    const trStyles = computed(() => getRowFixedStyles(
      get(props.row, props.rowKey || 'id'),
      props.rowIndex,
      props.dataLength,
      props.fixedRows,
      props.rowAndColFixedPosition,
      tableRowFixedClasses,
    ));

    const trAttributes = computed(() => formatRowAttributes(props.rowAttributes, { row: props.row, rowIndex: props.rowIndex, type: 'body' }));

    const classes = computed(() => {
      const customClasses = formatRowClassNames(
        props.rowClassName,
        { row: props.row, rowIndex: props.rowIndex, type: 'body' },
        props.rowKey || 'id',
      );
      return [trStyles.value?.classes, customClasses];
    });

    const { hasLazyLoadHolder, tRowHeight } = useLazyLoad(tableContentElm as any, trRef, reactive({ ...props.scroll }));
    const getTrListeners = (row: TableRowData, rowIndex: number) => {
      const trListeners: { [eventName: string]: (e: MouseEvent) => void } = {};
      // add events to row
      ROW_LISTENERS.forEach((eventName) => {
        trListeners[eventName] = (e: MouseEvent) => {
          const p = { e, row, index: rowIndex };
          props[`onRow${upperFirst(eventName)}`]?.(p);
          // Vue3 ignore this line
          context.emit(`row-${eventName}`, p);
        };
      });
      return trListeners;
    };

    watch([trRef], () => {
      if (props.virtualConfig?.isVirtualScroll.value) {
        context.emit('row-mounted', {
          ref: trRef,
          data: props.row,
        });
      }
    });

    return {
      trRef,
      tableColFixedClasses,
      tableDraggableClasses,
      tdEllipsisClass,
      tableBaseClass,
      tdAlignClasses,
      trStyles,
      classes,
      trAttributes,
      tRowHeight,
      hasLazyLoadHolder,
      getTrListeners,
    };
  },

  methods: {
    renderEllipsisCell(
      h: CreateElement,
      cellParams: BaseTableCellParams<TableRowData>,
      params: RenderEllipsisCellParams,
    ) {
      const { cellNode } = params;
      const { col } = cellParams;
      let content: ScopedSlotReturnValue;
      if (isFunction(col.ellipsis)) {
        content = col.ellipsis(h, cellParams);
      } else if (typeof col.ellipsis === 'object' && isFunction(col.ellipsis.content)) {
        content = col.ellipsis.content(h, cellParams);
      } else if (this.$scopedSlots[`ellipsis-${col.colKey}`]) {
        // support ellipsis-<colKey> to define one column cell ellipsis-content
        content = this.$scopedSlots[`ellipsis-${col.colKey}`](cellParams);
      } else if (this.$scopedSlots.ellipsis) {
        // support ellipsis slot to define all table cell ellipsis-content
        content = this.$scopedSlots.ellipsis(cellParams);
      }

      let tooltipProps = {};
      if (typeof col.ellipsis === 'object') {
        tooltipProps = 'props' in col.ellipsis ? col.ellipsis.props : col.ellipsis || undefined;
      }
      return (
        <TEllipsis
          placement="top"
          // @ts-expect-error
          attach={this.attach || (this.tableElm ? () => this.tableElm : undefined)}
          tooltipContent={content && (() => content)}
          tooltipProps={tooltipProps}
          overlayClassName={this.ellipsisOverlayClassName}
          classPrefix={this.classPrefix}
        >
          {cellNode}
        </TEllipsis>
      );
    },

    renderTd(h: CreateElement, params: BaseTableCellParams<TableRowData>, extra: RenderTdExtra) {
      const { col, colIndex, rowIndex } = params;
      const { cellSpans, dataLength, rowAndColFixedPosition } = extra;
      const cellNode = renderCell(params, this.$scopedSlots, {
        cellEmptyContent: extra.cellEmptyContent,
        pagination: this.pagination,
      });
      const tdStyles = getColumnFixedStyles(col, colIndex, rowAndColFixedPosition, this.tableColFixedClasses);
      const customClasses = formatClassNames(col.className, { ...params, type: 'td' });
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
        if (col.stopPropagation) {
          e.stopPropagation();
        }
        this.onCellClick?.(p);
        // Vue3 ignore this line
        this.$emit('cell-click', p);
      };
      const normalAttrs = isFunction(col.attrs) ? col.attrs({ ...params, type: 'td' }) : col.attrs;
      const attrs: { [key: string]: any } = { ...normalAttrs, ...cellSpans };
      return (
        // @ts-expect-error
        <td class={classes} attrs={attrs} style={{ ...tdStyles.style, ...attrs.style }} onClick={onClick}>
          {col.ellipsis ? this.renderEllipsisCell(h, params, { cellNode }) : cellNode}
        </td>
      );
    },
  },

  render(h) {
    const {
      row,
      rowIndex,
      dataLength,
      rowAndColFixedPosition,
    } = this;
    const columnVNodeList = this.columns?.map((col, colIndex) => {
      const cellSpans: RowspanColspan = {};
      const params = {
        row,
        col,
        rowIndex,
        colIndex,
      };
      let spanState = null;
      if (this.skipSpansMap.size) {
        const cellKey = getCellKey(row, this.rowKey, col.colKey, colIndex);
        spanState = this.skipSpansMap.get(cellKey) || {};
        spanState?.rowspan > 1 && (cellSpans.rowspan = spanState.rowspan);
        spanState?.colspan > 1 && (cellSpans.colspan = spanState.colspan);
        if (spanState.skipped) {
          return null;
        }
      }
      return this.renderTd(h, params, {
        dataLength,
        rowAndColFixedPosition,
        columnLength: this.columns.length,
        cellSpans,
        cellEmptyContent: this.cellEmptyContent,
      });
    });
    const attrs = this.trAttributes || {};
    return (
      <tr
        ref="trRef"
        // @ts-expect-error
        attrs={attrs}
        style={this.trStyles?.style}
        class={this.classes}
        on={this.getTrListeners(row, rowIndex)}
      >
        {this.hasLazyLoadHolder ? [<td style={{ height: `${this.tRowHeight}px`, border: 'none' }} />] : columnVNodeList}
      </tr>
    );
  },
});
