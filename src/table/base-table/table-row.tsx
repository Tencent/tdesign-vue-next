import { VNode, PropType, defineComponent, h } from 'vue';
import { prefix } from '../../config';
import { RowspanColspan } from '../type';
import baseTableProps from '../base-table-props';
import TableCell from './table-cell';
import get from 'lodash/get';
import { CustomData, CellData, CellParams } from '../util/interface';

type Attrs = Record<string, any>;
type createElement = ReturnType<typeof h>;

const eventsName = {
  onMouseover: 'onRowHover',
  onMousedown: 'onRowMousedown',
  onMouseup: 'onRowMouseup',
  onClick: 'onRowClick',
  onDblclick: 'onRowDbClick',
};

export default defineComponent({
  name: `${prefix}-table-row`,
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
  },
  methods: {
    // 渲染行
    renderRow(): Array<VNode> {
      const { rowData, columns, index: rowIndex, rowspanAndColspanProps } = this;
      const rowBody: Array<VNode> = [];
      const customData: CustomData = {
        type: 'cell',
        func: 'cell',
      };
      columns.forEach((column, index) => {
        const { render, cell } = column;
        const { colKey } = column;

        let customRender: any;

        if (typeof cell === 'function') {
          customRender = cell;
        } else if (typeof cell === 'string' && typeof this.$slots[cell] === 'function') {
          customRender = (h: createElement, params: CellParams) => this.$slots[cell](params);
        } else if (typeof this.$slots?.[colKey] === 'function') {
          customRender =  (h: createElement, params: CellParams) => this.$slots[colKey](params);
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

        // @ts-ignore: TODO
        rowBody.push(<TableCell ref={`${rowIndex}_${index}`} cellData={cellData} length={columns.length} />);
      });
      return rowBody;
    },
  },
  render() {
    const { rowClass, $attrs, rowData, index, rowKey, current } = this;
    const listeners = {};
    Object.keys(eventsName).forEach((event) => {
      const emitEvent = eventsName[event];
      listeners[event] = (e: MouseEvent) => {
        const val = this.$attrs?.[emitEvent];
        if (typeof val === 'function') {
          val?.({
            e,
            row: rowData,
            index,
          });
        }
      };
    });
    const trProps = {
      ...$attrs,
      class: rowClass,
      key: rowKey ? get(rowData, rowKey) : index + current,
    };
    return <tr {...trProps} {...listeners}>{this.renderRow()}</tr>;
  },
});
