import { defineComponent, SetupContext, computed, ref } from 'vue';
import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';
import enhancedTableProps from './enhanced-table-props';
import PrimaryTable from './primary-table';
import { TdEnhancedTableProps, PrimaryTableCol, TableRowData, DragSortContext } from './type';
import useTreeData from './hooks/useTreeData';
import useTreeSelect from './hooks/useTreeSelect';

export default defineComponent({
  name: 'TEnhancedTable',

  props: {
    ...baseTableProps,
    ...primaryTableProps,
    ...enhancedTableProps,
  },

  setup(props: TdEnhancedTableProps, context: SetupContext) {
    const { store, dataSource, formatTreeColum, swapData, ...treeInstanceFunctions } = useTreeData(props, context);

    const treeDataMap = ref(store.value.treeDataMap);

    const { onInnerSelectChange } = useTreeSelect(props, treeDataMap);

    // 影响列和单元格内容的因素有：树形节点需要添加操作符 [+] [-]
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        item = formatTreeColum(item);
        if (item.children?.length) {
          item.children = getColumns(item.children);
        }
        // 多级表头和自定义列配置特殊逻辑：要么子节点不存在，要么子节点长度大于 1，方便做自定义列配置
        if (!item.children || item.children?.length) {
          arr.push(item);
        }
      }
      return arr;
    };

    const tColumns = computed(() => {
      // 暂时只有树形结构需要处理 column.cell
      const isTreeData = !props.tree || !Object.keys(props.tree).length;
      return isTreeData ? props.columns : getColumns(props.columns);
    });

    const onDragSortChange = (context: DragSortContext<TableRowData>) => {
      if (props.beforeDragSort && !props.beforeDragSort(context)) return;
      swapData({
        current: context.current,
        target: context.target,
        currentIndex: context.currentIndex,
        targetIndex: context.targetIndex,
      });
    };

    return {
      store,
      dataSource,
      tColumns,
      onDragSortChange,
      onInnerSelectChange,
      ...treeInstanceFunctions,
    };
  },

  render() {
    const props = {
      ...this.$props,
      data: this.dataSource,
      columns: this.tColumns,
      // 树形结构不允许本地数据分页
      disableDataPage: Boolean(this.tree && Object.keys(this.tree).length),
      onSelectChange: this.onInnerSelectChange,
      onDragSort: this.onDragSortChange,
    };
    return <PrimaryTable v-slots={this.$slots} {...props} {...this.$attrs} />;
  },
});
