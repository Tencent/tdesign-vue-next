import { defineComponent, PropType } from 'vue';
import get from 'lodash/get';
import baseTableProps from '../base-table-props';
import enhancedTableProps from '../enhanced-table-props';
import { TdPrimaryTableProps, TableRowData, TableTreeConfig } from '../type';
import { emitEvent } from '../../utils/event';
import { PrimaryTableCol } from '..';
import primaryTableProps from '../primary-table-props';
import TableTreeStore, { KeysType } from './tree-store';

export const childreMap = new Map();

export interface GetChildrenDataReturnValue {
  allChildren: Array<any>;
  allChildrenKeys: Array<string | number>;
}
export function getChildrenData(
  treeDataMap: InstanceType<typeof TableTreeStore>['treeDataMap'],
  data: TableRowData,
  childrenKey: string,
  rowKey: string,
  r?: GetChildrenDataReturnValue,
): GetChildrenDataReturnValue {
  if (childreMap.get(data)) return childreMap.get(data);
  const result = r || { allChildren: [], allChildrenKeys: [] };
  const children = get(data, childrenKey);
  if (!children || !children.length) return result;
  const selectableChildren = children.filter((item: TableRowData) => !treeDataMap.get(get(item, rowKey))?.disabled);
  result.allChildren = result.allChildren.concat(selectableChildren);
  const childrenKeys = selectableChildren.map((item: TableRowData) => get(item, rowKey));
  result.allChildrenKeys = result.allChildrenKeys.concat(childrenKeys);
  for (let i = 0, len = children.length; i < len; i++) {
    const tItem = children[i];
    const c = get(tItem, childrenKey);
    if (c?.length) {
      const nextLevelData = getChildrenData(treeDataMap, tItem, childrenKey, rowKey, result);
      result.allChildren = result.allChildren.concat(nextLevelData.allChildren);
      result.allChildrenKeys = result.allChildrenKeys.concat(nextLevelData.allChildrenKeys);
    }
  }
  return result;
}

export interface RemoveParams {
  // 当前选中的数据
  selectedRowKeys: Array<string | number>;
  // 需要移除的数据
  removeKeys: Array<string | number>;
}

export interface RemainData {
  data: Array<any>;
  keys: Array<string | number>;
}

export function removeChildrenKeys(p: RemoveParams, r?: RemainData): RemainData {
  const { selectedRowKeys, removeKeys } = p;
  const result = r || { data: [], keys: [] };
  for (let i = 0, len = selectedRowKeys.length; i < len; i++) {
    const key = selectedRowKeys[i];
    if (!removeKeys.includes(key)) {
      result.keys.push(key);
    }
  }
  return result;
}

export interface GetKeyDataParams {
  treeDataMap: InstanceType<typeof TableTreeStore>['treeDataMap'];
  data: Array<any>;
  column: PrimaryTableCol;
  keys: KeysType;
}

export interface GetRowDataParams {
  treeDataMap: InstanceType<typeof TableTreeStore>['treeDataMap'];
  selectedRowKeys: Array<string | number>;
}

export function getRowDataByKeys(p: GetRowDataParams) {
  const { treeDataMap, selectedRowKeys } = p;
  const result = [];
  for (let i = 0, len = selectedRowKeys.length; i < len; i++) {
    const key = selectedRowKeys[i];
    result.push(treeDataMap.get(key));
  }
  return result;
}

type SelectChangeParams = Parameters<TdPrimaryTableProps['onSelectChange']>;

export default defineComponent({
  props: {
    data: baseTableProps.data,
    rowKey: baseTableProps.rowKey,
    columns: primaryTableProps.columns,
    tree: enhancedTableProps.tree,
  },
  emits: ['update:selectedRowKeys'],
  data() {
    return {
      dataSource: this.data,
      store: new TableTreeStore() as InstanceType<typeof TableTreeStore>,
    };
  },
  computed: {
    childrenKey(): string {
      return (this.tree as TableTreeConfig)?.childrenKey || 'children';
    },
    rowDataKeys(): KeysType {
      return {
        rowKey: this.rowKey,
        childrenKey: this.childrenKey,
      };
    },
  },

  methods: {
    onInnerSelectChange(rowKeys: SelectChangeParams[0], extraData: SelectChangeParams[1]) {
      if (extraData.currentRowKey === 'CHECK_ALL_BOX') {
        this.handleSelectAll(extraData);
      } else {
        this.handleSelect(rowKeys, extraData);
      }
    },

    handleSelectAll(extraData: SelectChangeParams[1]) {
      const newRowKeys: Array<string | number> = [];
      const newRowData: TableRowData[] = [];
      if (extraData.type === 'check') {
        const arr = [...this.store.treeDataMap.values()];
        for (let i = 0, len = arr.length; i < len; i++) {
          const item = arr[i];
          if (!item.disabled) {
            newRowData.push(item.row);
            newRowKeys.push(get(item.row, this.rowKey));
          }
        }
      }
      const newExtraData = {
        ...extraData,
        selectedRowData: newRowData || [],
      };
      emitEvent<SelectChangeParams>(this, 'select-change', newRowKeys, newExtraData);
      this.$emit('update:selectedRowKeys', newRowKeys, newExtraData);
    },

    handleSelect(rowKeys: SelectChangeParams[0], extraData: SelectChangeParams[1]) {
      let newRowKeys = [...rowKeys];
      if ((this.tree as TableTreeConfig)?.checkStrictly === false) {
        if (extraData?.type === 'check') {
          const result = getChildrenData(
            this.store.treeDataMap,
            extraData.currentRowData,
            this.childrenKey,
            this.rowKey,
          );
          const { allChildrenKeys } = result;
          childreMap.set(extraData.currentRowData, result);
          newRowKeys = [...new Set(newRowKeys.concat(allChildrenKeys))];
        } else if (extraData?.type === 'uncheck') {
          const children = getChildrenData(
            this.store.treeDataMap,
            extraData.currentRowData,
            this.childrenKey,
            this.rowKey,
          );
          const result = removeChildrenKeys({
            selectedRowKeys: rowKeys,
            removeKeys: children.allChildrenKeys,
          });
          newRowKeys = result.keys;
        }
      }
      const newRowData = getRowDataByKeys({ treeDataMap: this.store.treeDataMap, selectedRowKeys: newRowKeys });
      const newExtraData = {
        ...extraData,
        selectedRowData: newRowData,
      };
      emitEvent<SelectChangeParams>(this, 'select-change', newRowKeys, newExtraData);
      this.$emit('update:selectedRowKeys', newRowKeys, newExtraData);
    },
  },
});
