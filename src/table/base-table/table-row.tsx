import {
  VNode, PropType, defineComponent, h,
} from 'vue';
import get from 'lodash/get';
import { prefix } from '../../config';
import { RowspanColspan } from '../type';
import baseTableProps from '../base-table-props';
import TableCell from './table-cell';
import { CustomData, CellData, CellParams } from '../util/interface';

type Attrs = Record<string, any>;
type CreateElement = ReturnType<typeof h>;

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

export default defineComponent({
  name: `${prefix}-table-row`,
  components: {
    TableCell,
  },
  props: {
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
      type: Number,
      default: -1,
    },
    current: {
      type: Number,
      default: 1,
    },
    provider: {
      type: Object,
      default() {
        return {
          renderRows(): void {

          },
        };
      },
    },
  },
  emits: [...Object.keys(eventsName).map((key) => eventsName[key])],
  methods: {
    // 渲染行
    renderRow(): Array<VNode> {
      const {
        rowData, columns, index: rowIndex, rowspanAndColspanProps,
      } = this;
      const rowBody: Array<VNode> = [];

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
        const cellData: CellData = {
          col: {
            ...column,
            attrs,
          },
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
    const {
      rowClass, $attrs, rowData, index, rowKey, current, provider,
    } = this;
    const params = {
      row: rowData,
      index,
    };
    const on = {};
    Object.keys(eventsName).forEach((event) => {
      const emitEventName = eventsName[event];
      on[`on${event.replace(event[0], event[0].toUpperCase())}`] = (e: MouseEvent) => {
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

    return <tr {...trProps} draggable={provider.sortOnRowDraggable}>{this.renderRow()}</tr>;
  },
});
