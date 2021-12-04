import { defineComponent } from 'vue';
import get from 'lodash/get';
import { AddRectangleIcon, ChevronDownRectangleIcon } from 'tdesign-icons-vue-next';
import baseTableProps from '../base-table-props';
import primaryTableProps from '../primary-table-props';
import enhancedTableProps from '../enhanced-table-props';
import { TdPrimaryTableProps, TdEnhancedTableProps } from '../type';
import { getCell, GetCellParams } from '../util/common';

function updateRowExpandLength(row: Record<string, any>, childrenLength: number, type: 'add' | 'minus') {
  let tmp = row;
  while (tmp) {
    tmp.__expand_children_length__ =
      type === 'add'
        ? (tmp.__expand_children_length__ || 0) + childrenLength
        : (tmp.__expand_children_length__ || 0) - childrenLength;
    tmp = tmp.__t_table_inner_data__?.parent;
  }
}

export default defineComponent({
  props: {
    data: baseTableProps.data,
    columns: primaryTableProps.columns,
    tree: enhancedTableProps.tree,
  },
  data() {
    return {
      dataSource: this.data,
      // 树形结构，当前变化行，用于节约 data 变化计算成本
      currentChangeRow: { row: {}, rowIndex: undefined },
      treeExpandMap: new Map(),
    };
  },
  computed: {
    childrenKey(): string {
      return (this.tree as TdEnhancedTableProps['tree'])?.childrenKey || 'children';
    },
    columnsSource(): TdPrimaryTableProps['columns'] {
      let treeNodeColumnIndex = (this.tree as TdEnhancedTableProps['tree'])?.treeNodeColumnIndex || 0;
      // type 存在，则表示表格内部渲染的特殊列，不能作为树结点列。因此树结点展开列向后顺移一位
      if (this.columns[treeNodeColumnIndex]?.type) {
        treeNodeColumnIndex += 1;
      }
      const cols = [...this.columns];
      const treeNodeCol = { ...this.columns[treeNodeColumnIndex] };
      treeNodeCol.cell = (h, p) => {
        const cellInfo = getCell(this, { ...p, col: this.columns[treeNodeColumnIndex] });
        const colStyle = this.getTreeNodeStyle(p.row.__t_table_inner_data__?.level);
        const childrenNodes = get(p.row, this.childrenKey);
        if (childrenNodes && childrenNodes instanceof Array) {
          const ICON_NODE = p.row.__tree_expand_children__ ? ChevronDownRectangleIcon : AddRectangleIcon;
          return (
            <div style={colStyle}>
              <ICON_NODE style={{ marginRight: '8px' }} onClick={() => this.toggleExpandData(p)} />
              {cellInfo}
            </div>
          );
        }
        return <div style={colStyle}>{cellInfo}</div>;
      };
      cols[treeNodeColumnIndex] = treeNodeCol;
      return cols;
    },
  },
  watch: {
    // 展开状态变化时，更新节点信息
    currentChangeRow(changeRow: { row: Record<string, any>; rowIndex: number }) {
      const { row, rowIndex } = changeRow;
      const childrenNodes = get(row, this.childrenKey);
      if (!row || !childrenNodes) return;
      const index = this.treeExpandMap.get(row);
      if (index === undefined) {
        const len = row.__expand_children_length__ || childrenNodes.length;
        this.dataSource.splice(rowIndex + 1, len);
        row.__tree_expand_children__ = false;
        updateRowExpandLength(row, len, 'minus');
      } else {
        row.__tree_expand_children__ = true;
        updateRowExpandLength(row, childrenNodes.length, 'add');
        const children = childrenNodes.map((item: Record<string, any>) => {
          const innerData = row.__t_table_inner_data__;
          const path = innerData?.path ? innerData.path.concat(row) : [row];
          return {
            ...item,
            __t_table_inner_data__: {
              parent: row,
              parentIndex: rowIndex,
              level: (innerData?.level || 0) + 1,
              path,
            },
          };
        });
        this.dataSource.splice.apply(this.dataSource, [index + 1, 0].concat(children));
      }
    },
  },
  methods: {
    getTreeNodeStyle(level: number) {
      if (!level) return;
      const indent = (this.tree as TdEnhancedTableProps['tree'])?.indent || 24;
      return { paddingLeft: `${level * indent}px` };
    },
    toggleExpandData(p: GetCellParams) {
      const r = this.treeExpandMap.get(p.row);
      if (r !== undefined) {
        this.treeExpandMap.delete(p.row);
      } else {
        this.treeExpandMap.set(p.row, p.rowIndex);
      }
      this.currentChangeRow = {
        row: p.row,
        rowIndex: p.rowIndex,
      };
    },
  },
});
