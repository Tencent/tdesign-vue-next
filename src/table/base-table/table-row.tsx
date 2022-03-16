import { VNode, PropType, defineComponent, h, ref, onMounted, onBeforeUnmount, inject, Ref } from 'vue';
import get from 'lodash/get';
import cell from '@src/date-picker/basic/cell';
import { prefix } from '../../config';
import { RowspanColspan, TdBaseTableProps } from '../type';
import baseTableProps from '../base-table-props';
import TableCell from './table-cell';
import { CustomData, CellData, CellParams } from '../util/interface';
import { getPropsApiByEvent } from '../../utils/helper';
import { emitEvent } from '../../utils/event';

type CreateElement = ReturnType<typeof h>;
type Attrs = Record<string, any>;

const eventsName = {
  mouseover: 'row-hover',
  mouseleave: 'row-mouseleave',
  mouseenter: 'row-mouseenter',
  mousedown: 'row-mousedown',
  mouseup: 'row-mouseup',
  click: 'row-click',
  dblclick: 'row-db-click',
  dragstart: 'row-dragstart',
  dragover: 'row-dragover',
};

const observe = (element: HTMLElement, root: HTMLElement, callback: Function, marginBottom: number) => {
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

const requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(cb, 1000 / 60));
const TableRowProps = {
  rowClass: baseTableProps.rowClassName,
  columns: baseTableProps.columns,
  rowKey: baseTableProps.rowKey,
  rowspanAndColspanProps: {
    type: Object as PropType<RowspanColspan>,
    required: false,
    default() {
      return {};
    },
  },
  rowData: {
    type: Object,
    default(): any {
      return {};
    },
  },
  index: {
    type: Number as PropType<number>,
    default: -1,
  },
  current: {
    type: Number as PropType<number>,
    default: 1,
  },
  scrollType: {
    type: String as PropType<string>,
    default: '',
  },
  rowHeight: {
    type: Number as PropType<number>,
    default: 0,
  },
  bufferSize: {
    type: Number as PropType<number>,
    default: 0,
  },
  trs: {
    type: Map,
    default: () => new Map(),
  },
  row: {
    type: Object as PropType<object>,
    default: () => ({}),
  },
  provider: {
    type: Object,
    default() {
      return {
        sortOnRowDraggable: false,
      };
    },
  },
};

export default defineComponent({
  name: `${prefix}-table-row`,
  components: {
    TableCell,
  },
  props: TableRowProps,
  emits: ['rowMounted', 'getRowHeight', 'cell-click', ...Object.keys(eventsName).map((key) => eventsName[key])],
  setup(props, { emit }) {
    const tr = ref(null);
    const isInit = ref(props.index === 0);
    const init = () => {
      !isInit.value &&
        requestAnimationFrame(() => {
          isInit.value = true;
        });
    };
    onMounted(() => {
      const { trs, row, scrollType, index, rowHeight, bufferSize } = props;
      if (scrollType === 'virtual') {
        const { $index }: { $index?: number } = row;
        trs.set($index, tr.value);
        emit('rowMounted');
        onBeforeUnmount(() => {
          trs.delete($index);
        });
      } else if (scrollType === 'lazy') {
        const scrollBody: Ref = inject('scrollBody');
        if (rowHeight === 0) {
          const rowHeightRef: Ref = inject('rowHeightRef');
          if (index === 0) {
            // 获取第一行高度
            const { offsetHeight } = tr.value;
            rowHeightRef.value = offsetHeight;
          } else {
            const height = rowHeightRef.value;
            observe(tr.value, scrollBody.value, init, height * bufferSize);
          }
        } else {
          observe(tr.value, scrollBody.value, init, rowHeight * bufferSize);
        }
      }
    });
    return {
      tr,
      isInit,
    };
  },
  methods: {
    // 渲染行
    renderRow(): Array<VNode> {
      const { rowData, columns, index: rowIndex, rowspanAndColspanProps, scrollType, isInit } = this;
      const hasHolder = scrollType === 'lazy' && !isInit;
      if (hasHolder) {
        const rowHeightRef: Ref = inject('rowHeightRef');
        return [<td style={{ height: `${rowHeightRef.value}px`, border: 'none' }} />];
      }
      const rowBody: Array<VNode> = [];
      let flag = true;
      columns.forEach((column, index) => {
        const customData: CustomData = {
          type: 'cell',
          func: 'cell',
        };
        const { render, cell } = column;
        const { colKey } = column;

        let customRender: any;

        if (typeof cell === 'function') {
          customRender = cell;
        } else if (typeof cell === 'string' && typeof this.$slots[cell] === 'function') {
          customRender = (h: CreateElement, params: CellParams) => this.$slots[cell](params);
        } else if (typeof this.$slots?.[colKey] === 'function') {
          customRender = (h: CreateElement, params: CellParams) => this.$slots[colKey](params);
        } else if (typeof render === 'function') {
          customRender = render;
          customData.func = 'render';
        } else {
          customRender = () => get(rowData, colKey);
        }

        const attrs: Attrs = column.attrs || {};
        if (colKey !== 'expanded-row' && rowspanAndColspanProps?.[colKey]) {
          let colspan = 1;
          let rowspan = 1;
          if (rowspanAndColspanProps[colKey]) {
            rowspan = rowspanAndColspanProps[colKey].rowspan || rowspan;
            colspan = rowspanAndColspanProps[colKey].colspan || colspan;
          }
          attrs.colspan = colspan;
          attrs.rowspan = rowspan;
          if (colspan === -1 || rowspan === -1) {
            return;
          }
        }
        let withBorder;
        let withoutBorder;
        // 存在跨列或者跨行的情况
        if (index > rowBody.length && rowIndex > 0) {
          // 如果当前显示行的第一列，但不是 column 的第一列而且有固定列存在的情况下，要隐藏一下 border
          if (columns[index - 1]?.fixed && rowBody.length === 0) {
            withoutBorder = true;
          } else if (flag) {
            withBorder = true;
            flag = false;
          }
        }
        const cellData: CellData = {
          col: {
            ...column,
            attrs,
          },
          withBorder,
          withoutBorder,
          colIndex: index,
          row: rowData,
          rowIndex,
          customData,
          customRender,
          type: 'td',
        };

        const listeners = {
          onCellClick: (p: Parameters<TdBaseTableProps['onCellClick']>[0]) => {
            emitEvent<Parameters<TdBaseTableProps['onCellClick']>>(this, 'cell-click', p);
          },
        };
        rowBody.push(
          <table-cell ref={`${rowIndex}_${index}`} {...listeners} cellData={cellData} length={columns.length} />,
        );
      });
      return rowBody;
    },
  },
  render() {
    const { rowClass, $attrs, rowData, index, rowKey, current, provider } = this;
    const params = {
      row: rowData,
      index,
    };
    const on = {};
    Object.keys(eventsName).forEach((event) => {
      const emitEventName = eventsName[event];
      on[getPropsApiByEvent(event)] = (e: MouseEvent) => {
        this.$emit(emitEventName, {
          ...params,
          e,
        });
      };
    });

    const trProps = {
      ...$attrs,
      class: rowClass,
      key: rowKey ? get(rowData, rowKey) : index + current,
      ...on,
    };

    return (
      <tr ref="tr" {...trProps} draggable={provider.sortOnRowDraggable}>
        {this.renderRow()}
      </tr>
    );
  },
});
