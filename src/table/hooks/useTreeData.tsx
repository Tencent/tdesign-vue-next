import { SetupContext, ref, watch, toRefs, onUnmounted, computed } from 'vue';
import { AddRectangleIcon, MinusRectangleIcon } from 'tdesign-icons-vue-next';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import TableTreeStore from './tree-store';
import {
  TdEnhancedTableProps,
  PrimaryTableCol,
  PrimaryTableCellParams,
  TableRowData,
  TableRowValue,
  TableRowState,
} from '../type';
import useClassName from './useClassName';
import { renderCell } from '../tr';

export default function useTreeData(props: TdEnhancedTableProps, context: SetupContext) {
  const { data, columns } = toRefs(props);
  const store = ref(new TableTreeStore() as InstanceType<typeof TableTreeStore>);
  const treeNodeCol = ref<PrimaryTableCol>();
  const dataSource = ref<TdEnhancedTableProps['data']>([]);
  const { tableTreeClasses } = useClassName();

  const rowDataKeys = computed(() => ({
    rowKey: props.rowKey || 'id',
    childrenKey: props.tree?.childrenKey || 'children',
  }));

  watch(
    [data],
    ([val]) => {
      if (!val) return [];
      // 如果没有树形解构，则不需要相关逻辑
      if (!props.tree || !Object.keys(props.tree).length) {
        dataSource.value = val;
        return;
      }
      const newVal = cloneDeep(val);
      dataSource.value = newVal;
      store.value.initialTreeStore(newVal, props.columns, rowDataKeys.value);
    },
    { immediate: true },
  );

  onUnmounted(() => {
    if (!props.tree || !Object.keys(props.tree).length) return;
    store.value.treeDataMap?.clear();
    store.value = null;
  });

  watch(
    [columns],
    () => {
      treeNodeCol.value = getTreeNodeColumnCol();
    },
    { immediate: true },
  );

  function getTreeNodeStyle(level: number) {
    if (level === undefined) return;
    const indent = props.tree?.indent || 24;
    // 默认 1px 是为了临界省略
    return {
      paddingLeft: `${level * indent || 1}px`,
    };
  }

  /**
   * 组件实例方法，展开或收起某一行
   * @param p 行数据
   */
  function toggleExpandData(p: { row: TableRowData; rowIndex: number }) {
    dataSource.value = store.value.toggleExpandData(p, dataSource.value, rowDataKeys.value);
  }

  function getTreeNodeColumnCol() {
    const { columns } = props;
    let treeNodeColumnIndex = props.tree?.treeNodeColumnIndex || 0;
    // type 存在，则表示表格内部渲染的特殊列，比如：展开行按钮、复选框、单选按钮等，不能作为树结点列。因此树结点展开列向后顺移
    while (
      columns[treeNodeColumnIndex]?.type ||
      columns[treeNodeColumnIndex]?.colKey === '__EXPAND_ROW_ICON_COLUMN__'
    ) {
      treeNodeColumnIndex += 1;
    }
    return columns[treeNodeColumnIndex];
  }

  function formatTreeColum(col: PrimaryTableCol): PrimaryTableCol {
    if (!props.tree || !Object.keys(props.tree).length || col.colKey !== treeNodeCol.value.colKey) return col;
    const newCol = { ...treeNodeCol.value };
    newCol.cell = (h, p) => {
      const cellInfo = renderCell({ ...p, col: { ...treeNodeCol.value } }, context.slots);
      const currentState = store.value.treeDataMap.get(get(p.row, rowDataKeys.value.rowKey));
      const colStyle = getTreeNodeStyle(currentState?.level);
      const classes = { [tableTreeClasses.inlineCol]: !!col.ellipsis };
      const childrenNodes = get(p.row, rowDataKeys.value.childrenKey);
      if (childrenNodes && childrenNodes instanceof Array) {
        const IconNode = store.value.treeDataMap.get(get(p.row, rowDataKeys.value.rowKey))?.expanded
          ? MinusRectangleIcon
          : AddRectangleIcon;
        return (
          <div class={[tableTreeClasses.col, classes]} style={colStyle}>
            {!!childrenNodes.length && <IconNode class={tableTreeClasses.icon} onClick={() => toggleExpandData(p)} />}
            {cellInfo}
          </div>
        );
      }
      return (
        <div style={colStyle} class={classes}>
          {cellInfo}
        </div>
      );
    };
    // 树形节点会显示操作符号 [+] 和 [-]，但省略显示的浮层中不需要操作符
    if (newCol.ellipsis === true) {
      newCol.ellipsis = (h, p) => renderCell({ ...p, col: { ...treeNodeCol.value } }, context.slots);
    }
    return newCol;
  }

  /**
   * 组件实例方法，设置行数据，自动刷新界面
   * @param key 当前行唯一标识值
   * @param newRowData 新行数据
   */
  function setData<T>(key: TableRowValue, newRowData: T) {
    const rowIndex = store.value.updateData(key, newRowData, dataSource.value, rowDataKeys.value);
    const newData = [...dataSource.value];
    newData[rowIndex] = newRowData;
    dataSource.value = newData;
  }

  /**
   * 组件实例方法，获取当前行全部数据
   * @param key 行唯一标识
   * @returns {TableRowState} 当前行数据
   */
  function getData(key: TableRowValue): TableRowState {
    return store.value.getData(key);
  }

  /**
   * 组件实例方法，移除指定节点
   * @param key 行唯一标识
   */
  function remove(key: TableRowValue) {
    // 引用传值，可自动更新 dataSource。（dataSource 本是内部变量，可以在任何地方进行任何改变）
    dataSource.value = store.value.remove(key, dataSource.value, rowDataKeys.value);
  }

  /**
   * 为当前节点添加子节点，默认添加到最后一个节点
   * @param key 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  function appendTo<T>(key: TableRowValue, newData: T) {
    // 引用传值，可自动更新 dataSource。（dataSource 本是内部变量，可以在任何地方进行任何改变）
    dataSource.value = store.value.appendTo(key, newData, dataSource.value, rowDataKeys.value);
  }

  return {
    store,
    rowDataKeys,
    dataSource,
    setData,
    getData,
    remove,
    appendTo,
    formatTreeColum,
    toggleExpandData,
  };
}
