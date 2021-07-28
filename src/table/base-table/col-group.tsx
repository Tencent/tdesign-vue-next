import { defineComponent, VNode } from 'vue';
import BaseTableProps from '../../../types/base-table/props';
import { prefix } from '../../config';

export default defineComponent({
  name: `${prefix}-table-col-group`,
  props: {
    columns: BaseTableProps.columns,
  },
  methods: {
    renderColgroup(): Array<VNode> {
      const { columns } = this;
      const colgroup: Array<VNode> = [];
      columns.forEach((column) => {
        const { width,  minWidth, colKey } = column;
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
