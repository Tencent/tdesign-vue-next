import { VNode, defineComponent } from 'vue';
import TableCell from './table-cell';
import { BaseTableCol, CellData } from '../../../types/base-table/TdBaseTableProps';
import baseTableProps from '../../../types/base-table/props';
import { prefix } from '../../config';

export default defineComponent({
  name: `${prefix}-table-header`,
  props: {
    columns: baseTableProps.columns,
    bordered: baseTableProps.bordered,
  },

  methods: {
    renderHeader(): Array<VNode> {
      const trContentList: Array<any> = [];
      this.renderTr(this.columns, 0, trContentList);
      const theadContent = trContentList.map((item: any) => <tr>{item}</tr>);
      return theadContent;
    },
    renderTr(columns: Array<BaseTableCol>, currentRowIndex: number, trContentList: Array<any>): any {
      const thContent: Array<VNode> = [];
      // 当前行
      if (typeof trContentList[currentRowIndex] === 'undefined') {
        // eslint-disable-next-line no-param-reassign
        trContentList[currentRowIndex] = [];
      }
      // 实际占用的列
      let currentColSpan = 0;
      columns.forEach((column: BaseTableCol, colIndex: number) => {
        const { children } = column;
        if (children?.length) {
          const colSpan = this.renderTr(children, currentRowIndex + 1, trContentList);
          currentColSpan += colSpan;
          thContent[colIndex] = this.renderCell(column, 1, colSpan, currentRowIndex, colIndex);
        }
      });
      let rowspan = 1;
      if (trContentList.length >= 1) {
        rowspan = trContentList.length - currentRowIndex;
      }
      // 普通单元格，也许会涉及跨行
      columns.forEach((column, colIndex: number) => {
        const { children } = column;
        if (!children || children?.length === 0) {
          // 上一行有跨行到当前行且单元格是当前行的第一列，要带上边框。
          const withBorder = currentRowIndex > 0 && this.bordered && thContent.length === 0 && trContentList[currentRowIndex].length === 0;
          thContent[colIndex] = this.renderCell(column, rowspan, 1, colIndex, currentRowIndex, withBorder);
          currentColSpan += 1;
        }
      });
      trContentList[currentRowIndex].push(...thContent);
      return currentColSpan;
    },

    renderCell(column: BaseTableCol, rowspan: number, colspan: number, colIndex: number, currentRowIndex: number, withBorder?: boolean): VNode {
      const { title, render } = column;
      const customData = {
        type: 'title',
        func: 'title',
      };
      let customRender;
      if (typeof title === 'string') {
        if (typeof this.$slots?.[title] === 'function') {
          customRender = (params: any) => this.$slots[title](params);
        } else {
          customRender = () => title;
        }
      } else if (typeof title === 'function') {
        customRender = (h: any, params: CellData<any>) => (title(h, {
          colIndex: params.colIndex,
          col: params.col,
        }));
      } else if (typeof render === 'function') {
        customRender = render;
        customData.func = 'render';
      } else {
        customRender = () => '';
      }

      const cellData = {
        col: column,
        colIndex,
        customData,
        customRender,
        type: 'th',
        withBorder,
      };

      // @ts-ignore: TODO
      return <TableCell ref={`${currentRowIndex}_${colIndex}`} cellData={cellData} colspan={colspan} rowspan={rowspan} />;
    },
  },
  render() {
    return <thead>{this.renderHeader()}</thead>;
  },
});
