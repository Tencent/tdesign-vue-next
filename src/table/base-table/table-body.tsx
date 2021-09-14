import { VNode, defineComponent, inject } from 'vue';
import { prefix } from '../../config';
import TableRow from './table-row';
import baseTableProps from '../base-table-props';
import { BaseTableCol } from '../type';

export default defineComponent({
  name: `${prefix}-table-body`,
  props: {
    data: baseTableProps.data,
    columns: baseTableProps.columns,
    rowClassName: baseTableProps.rowClassName,
    rowKey: baseTableProps.rowKey,
    rowspanAndColspan: baseTableProps.rowspanAndColspan,
    onRowHover: baseTableProps.onRowHover,
    onRowMouseup: baseTableProps.onRowMouseup,
    onRowMousedown: baseTableProps.onRowMousedown,
    onRowClick: baseTableProps.onRowClick,
    onRowDbClick: baseTableProps.onRowDbClick,
    current: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    getRowspanAndColspanProps() {
      const props: Array<any> = [];
      const { data, columns, rowspanAndColspan } = this;
      data.forEach((rowData, rowIndex) => {
        if (props[rowIndex] === undefined) {
          props[rowIndex] = {};
        }
        Object.keys(rowData).forEach((colKey) => {
          const colIndex = columns.findIndex((col) => col.colKey === colKey);
          const col = columns[colIndex];
          let { rowspan, colspan } = rowspanAndColspan({
            col,
            colIndex,
            row: rowData,
            rowIndex,
          }) || {};
          rowspan = rowspan || 1;
          colspan = colspan || 1;
          // 剩余要跨的行
          let leftedRowspan = 0;
          if (rowIndex === 0 || rowspan > 1) {
            leftedRowspan = rowspan - 1;
          } else {
            // 上一行如果跨行的话，计算一下除去渲染当前行是否还在跨行范围内，以及是否还有剩余
            const preRowIndex = rowIndex - 1;
            leftedRowspan = props[preRowIndex]?.[colKey]?.leftedRowspan || 0;
            if (leftedRowspan > 0) {
              leftedRowspan -= 1;
              // 当前单元格跨行置为-1，在渲染时跳过
              rowspan = -1;
            }
          }
          // 剩余要跨的列
          let leftedColspan = 0;
          if (colIndex === 0 || colspan > 1) {
            leftedColspan = colspan - 1;
          } else {
            // 一种特殊情况，如果当前行的上一行有跨列，应该继承一下他的跨列数
            if (rowIndex > 0) {
              const preLeftedColspan = props[rowIndex - 1]?.[colKey]?.leftedColspan;
              const preLeftedColRowspan = props[rowIndex - 1]?.[colKey]?.leftedRowspan;
              if (preLeftedColspan > 0 && preLeftedColRowspan > 0) {
                leftedColspan = preLeftedColspan;
                // 当前单元格跨行置为-1，在渲染时跳过
                colspan = -1;
              }
            }
            // 前一列如果跨列的话，计算一下除去渲染当前列是否还在跨列范围内，以及是否还有剩余
            const preColKey = (columns[colIndex - 1] as BaseTableCol).colKey;
            if (leftedColspan === 0) {
              leftedColspan = props[rowIndex]?.[preColKey]?.leftedColspan || 0;
              if (leftedColspan > 0) {
                leftedColspan -= 1;
                // 当前单元格跨行置为-1，在渲染时跳过
                colspan = -1;
              }
            }
          }
          props[rowIndex][colKey] = {
            leftedColspan,
            leftedRowspan,
            rowspan,
            colspan,
          };
        });
      });
      return props;
    },
    renderBody(): Array<VNode> {
      const {
        data, rowClassName, $slots: slots, rowspanAndColspan,
      } = this;
      const body: Array<VNode> = [];
      let allRowspanAndColspanProps: any;
      if (typeof rowspanAndColspan === 'function') {
        allRowspanAndColspanProps = this.getRowspanAndColspanProps();
      }
      data.forEach((row: any, index: number) => {
        const rowClass = typeof rowClassName === 'function' ? rowClassName({ row, rowIndex: index }) : rowClassName;
        const rowspanAndColspanProps = allRowspanAndColspanProps ? allRowspanAndColspanProps[index] : undefined;
        const props = {
          ...this.$props,
          rowClass,
          rowData: row,
          index,
          rowspanAndColspanProps,
        };
        // 按行渲染
        body.push(<TableRow {...props} >{slots}</TableRow>);
        const renderRow = inject('renderRow');
        if (typeof renderRow === 'function') {
          renderRow({
            rows: body, row, rowIndex: index, columns: this.columns,
          });
        }
      });
      return body;
    },
  },
  render() {
    return <tbody class="table-body">{this.renderBody()}</tbody>;
  },
});
