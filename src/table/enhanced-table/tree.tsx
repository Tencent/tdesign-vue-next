import { defineComponent } from 'vue';
import { AddRectangleIcon, MinusRectangleIcon } from 'tdesign-icons-vue-next';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import baseTableProps from '../base-table-props';
import primaryTableProps from '../primary-table-props';
import enhancedTableProps from '../enhanced-table-props';
import {
  TdPrimaryTableProps,
  TableRowState,
  TableRowValue,
  PrimaryTableCellParams,
  TableRowData,
  TableTreeConfig,
} from '../type';
import { getCell } from '../util/common';
import TableTreeStore, { KeysType } from './tree-store';

export default defineComponent({
  props: {
    rowKey: baseTableProps.rowKey,
    data: baseTableProps.data,
    columns: primaryTableProps.columns,
    tree: enhancedTableProps.tree,
  },
  data() {
    return {
      store: new TableTreeStore() as InstanceType<typeof TableTreeStore>,
      dataSource: [],
    };
  },
  computed: {
    rowDataKeys(): KeysType {
      return {
        rowKey: this.rowKey,
        childrenKey: this.childrenKey,
      };
    },
    childrenKey(): string {
      return (this.tree as TableTreeConfig)?.childrenKey || 'children';
    },
    columnsSource(): TdPrimaryTableProps['columns'] {
      let treeNodeColumnIndex = (this.tree as TableTreeConfig)?.treeNodeColumnIndex || 0;
      // type 存在，则表示表格内部渲染的特殊列，不能作为树结点列。因此树结点展开列向后顺移一位
      if (this.columns[treeNodeColumnIndex]?.type) {
        treeNodeColumnIndex += 1;
      }
      const cols = [...this.columns];
      const treeNodeCol = { ...this.columns[treeNodeColumnIndex] };
      // 定义树节点列
      treeNodeCol.cell = (h, p) => {
        const cellInfo = getCell(this, { ...p, col: this.columns[treeNodeColumnIndex] });
        const currentState = this.store.treeDataMap.get(get(p.row, this.rowKey));
        const colStyle = this.getTreeNodeStyle(currentState?.level);
        const childrenNodes = get(p.row, this.childrenKey);
        if (childrenNodes && childrenNodes instanceof Array) {
          const IconNode = this.store.treeDataMap.get(get(p.row, this.rowKey))?.expanded
            ? MinusRectangleIcon
            : AddRectangleIcon;
          return (
            <div style={colStyle}>
              {!!childrenNodes.length && (
                <IconNode style={{ marginRight: '8px' }} onClick={() => this.toggleExpandData(p)} />
              )}
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
    data: {
      immediate: true,
      handler(val) {
        this.dataSource = cloneDeep(val);
        this.store.initialTreeStore(this.dataSource, this.columns, this.rowDataKeys);
      },
    },
  },
  unmounted() {
    this.store.treeDataMap?.clear();
    this.store = null;
  },
  methods: {
    getTreeNodeStyle(level: number) {
      if (!level) return;
      const indent = (this.tree as TableTreeConfig)?.indent || 24;
      return { paddingLeft: `${level * indent}px` };
    },

    toggleExpandData(p: PrimaryTableCellParams<TableRowData>) {
      this.store.toggleExpandData(p, this.dataSource, this.rowDataKeys);
    },

    /**
     * 组件实例方法，设置行数据，自动刷新界面
     * @param key 当前行唯一标识值
     * @param newRowData 新行数据
     */
    setData<T>(key: TableRowValue, newRowData: T) {
      const rowIndex = this.store.updateData(key, newRowData, this.dataSource, this.rowDataKeys);
      this.dataSource[rowIndex] = newRowData;
    },

    /**
     * 组件实例方法，获取当前行全部数据
     * @param key 行唯一标识
     * @returns {TableRowState} 当前行数据
     */
    getData(key: TableRowValue): TableRowState {
      return this.store.getData(key);
    },

    /**
     * 组件实例方法，移除指定节点
     * @param key 行唯一标识
     */
    remove(key: TableRowValue) {
      // 引用传值，可自动更新 this.dataSource
      this.store.remove(key, this.dataSource, this.rowDataKeys);
    },

    /**
     * 为当前节点添加子节点，默认添加到最后一个节点
     * @param key 当前节点唯一标识
     * @param newData 待添加的新节点
     */
    appendTo<T>(key: TableRowValue, newData: T) {
      // 引用传值，可自动更新 this.dataSource
      this.store.appendTo(key, newData, this.dataSource, this.rowDataKeys);
    },
  },
});
