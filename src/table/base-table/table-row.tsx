import { VNode, PropType, defineComponent, h, ref, onMounted, onBeforeUnmount } from 'vue';
import get from 'lodash/get';
import { prefix } from '../../config';
import { RowspanColspan } from '../type';
import baseTableProps from '../base-table-props';
import TableCell from './table-cell';
import { CustomData, CellData, CellParams } from '../util/interface';
import { getPropsApiByEvent } from '../../utils/helper';

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

const observe = (element: HTMLElement, callback: Function) => {
  try {
    const io = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting || entry.intersectionRatio) {
          callback();
          io.unobserve(element);
        }
      },
      {
        rootMargin: '500px 0px',
        root: null,
        threshold: [0, Number.MIN_VALUE, 0.01],
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
  lazy: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  rowHeight: {
    type: Number as PropType<number>,
    default: 20,
  },
  trs: {
    type: Map,
    default: () => ({}),
  },
  row: {
    type: Object as PropType<object>,
    default: () => ({}),
  },
  virtualScroll: {
    type: Boolean as PropType<boolean>,
    default: false,
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
  emits: ['rowMounted', ...Object.keys(eventsName).map((key) => eventsName[key])],
  setup(props, { emit }) {
    const tr = ref(null);
    const isInit = ref(false);
    const init = () => {
      !isInit.value &&
        requestAnimationFrame(() => {
          isInit.value = true;
        });
    };
    onMounted(() => {
      const { trs, lazy, row, virtualScroll } = props;
      if (virtualScroll) {
        const { $index }: { $index?: number } = row;
        trs.set($index, tr.value);
        emit('rowMounted');
        onBeforeUnmount(() => {
          trs.delete($index);
        });
      } else if (lazy) {
        observe(tr.value, init);
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
      const {
        rowData,
        columns,
        index: rowIndex,
        rowspanAndColspanProps,
        virtualScroll,
        lazy,
        isInit,
        rowHeight,
      } = this;
      const hasHolder = !virtualScroll && lazy && !isInit;
      if (hasHolder) {
        return [<td style={{ height: `${rowHeight}px`, border: 'none' }} />];
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

        rowBody.push(<table-cell ref={`${rowIndex}_${index}`} cellData={cellData} length={columns.length} />);
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
