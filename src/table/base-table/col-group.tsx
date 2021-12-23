import { defineComponent, VNode } from 'vue';
import BaseTableProps from '../base-table-props';
import { prefix } from '../../config';

export default defineComponent({
  name: `${prefix}-table-col-group`,
  props: {
    columns: BaseTableProps.columns,
  },
  methods: {
    renderColgroup(): Array<VNode> {
      const { columns } = this;
      type ColumnType = typeof columns;
      const colgroup: Array<VNode> = [];
      const flatArray = (arr: ColumnType) => {
        const res: ColumnType = [];
        arr.forEach((item: any) => {
          if (item?.children?.length > 0) {
            const val = flatArray(item.children);
            res.push(...val);
          } else {
            res.push(item);
          }
        });
        return res;
      };
      const flatCols = flatArray(this.columns);

      flatCols.forEach((column) => {
        const { width, minWidth, colKey } = column;
        const style: any = {};
        if (width) {
          style.width = `${width}px`;
        }
        if (minWidth) {
          style.minWidth = `${minWidth}px`;
        }
        colgroup.push(<col key={colKey} style={style} />);
      });
      return colgroup;
    },
  },
  render() {
    return <colgroup>{this.renderColgroup()}</colgroup>;
  },
});
