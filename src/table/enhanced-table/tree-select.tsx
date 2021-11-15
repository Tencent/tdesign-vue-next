import { defineComponent } from 'vue';
import get from 'lodash/get';
import baseTableProps from '../base-table-props';
import enhancedTableProps from '../enhanced-table-props';
import { TdPrimaryTableProps, TdEnhancedTableProps } from '../type';
import { emitEvent } from '../../utils/event';
import { isRowSelectedDisabled } from '../util/common';
import { PrimaryTableCol } from '..';
import primaryTableProps from '../primary-table-props';

export const childreMap = new Map();

export interface GetChildrenDataReturnValue {
  allChildren: Array<any>;
  allChildrenKeys: Array<string | number>;
}
export function getChildrenData(
  data: Record<string, any>,
  childrenKey: string,
  rowKey: string,
  r?: GetChildrenDataReturnValue,
): GetChildrenDataReturnValue {
  if (childreMap.get(data)) return childreMap.get(data);
  const result = r || { allChildren: [], allChildrenKeys: [] };
  const children = get(data, childrenKey);
  if (!children || !children.length) return result;
  const selectableChildren = children.filter((item: Record<string, any>) => !item.__disabled__);
  result.allChildren = result.allChildren.concat(selectableChildren);
  const childrenKeys = selectableChildren.map((item: Record<string, any>) => get(item, rowKey));
  result.allChildrenKeys = result.allChildrenKeys.concat(childrenKeys);
  for (let i = 0, len = children.length; i < len; i++) {
    const tItem = children[i];
    const c = get(tItem, childrenKey);
    if (c && c.length) {
      const nextLevelData = getChildrenData(tItem, childrenKey, rowKey, result);
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
  data: Array<any>;
  rowKey: string;
  column: PrimaryTableCol;
  childrenKey: string;
}

export function getKeyDataMap(p: GetKeyDataParams, r?: Record<string, any>) {
  const {
    data, column, rowKey, childrenKey,
  } = p;
  if (!data) return r;
  const result = r || {};
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i];
    item.__disabled__ = isRowSelectedDisabled(column, item, i);
    result[get(item, rowKey)] = item;
    const childrenNodes = get(item, childrenKey);
    if (childrenNodes && childrenNodes.length) {
      const tMap = getKeyDataMap({ ...p, data: childrenNodes }, result);
      Object.assign(result, tMap);
    }
  }
  return result;
}

export interface GetRowDataParams {
  map: Record<string, any>;
  selectedRowKeys: Array<string | number>;
}

export function getRowDataByKeys(p: GetRowDataParams) {
  const { map, selectedRowKeys } = p;
  const result = [];
  for (let i = 0, len = selectedRowKeys.length; i < len; i++) {
    const key = selectedRowKeys[i];
    result.push(map[key]);
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
      keyDataMap: {} as Record<string, any>,
    };
  },
  computed: {
    childrenKey(): string {
      return (this.tree as TdEnhancedTableProps['tree'])?.childrenKey || 'children';
    },
    keys(): string {
      return [this.rowKey, this.childrenKey].join();
    },
  },
  watch: {
    dataSource: {
      immediate: true,
      handler() {
        this.setKeyDataMap();
      },
    },
    keys() {
      this.setKeyDataMap();
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
    setKeyDataMap() {
      this.keyDataMap = getKeyDataMap({
        column: this.columns[0],
        data: this.dataSource,
        rowKey: this.rowKey,
        childrenKey: this.childrenKey,
      });
    },
    handleSelectAll(extraData: SelectChangeParams[1]) {
      let newRowKeys: Array<string | number> = [];
      let newRowData = [];
      if (extraData.type === 'check') {
        newRowData = Object.values(this.keyDataMap).filter((item) => !item.__disabled__);
        newRowKeys = newRowData.map((item) => get(item, this.rowKey));
      }
      const newExtraData = {
        ...extraData,
        selectedRowData: newRowData,
      };
      emitEvent<SelectChangeParams>(this, 'select-change', newRowKeys, newExtraData);
      this.$emit('update:selectedRowKeys', newRowKeys, newExtraData);
    },
    handleSelect(rowKeys: SelectChangeParams[0], extraData: SelectChangeParams[1]) {
      let newRowKeys = [...rowKeys];
      if ((this.tree as TdEnhancedTableProps['tree']).checkStrictly === false) {
        if (extraData?.type === 'check') {
          const result = getChildrenData(extraData.currentRowData, this.childrenKey, this.rowKey);
          const { allChildrenKeys } = result;
          childreMap.set(extraData.currentRowData, result);
          newRowKeys = [...new Set(newRowKeys.concat(allChildrenKeys))];
        } else if (extraData?.type === 'uncheck') {
          const children = getChildrenData(extraData.currentRowData, this.childrenKey, this.rowKey);
          const result = removeChildrenKeys({
            selectedRowKeys: rowKeys,
            removeKeys: children.allChildrenKeys,
          });
          newRowKeys = result.keys;
        }
      }
      const newRowData = getRowDataByKeys({ map: this.keyDataMap, selectedRowKeys: newRowKeys });
      const newExtraData = {
        ...extraData,
        selectedRowData: newRowData,
      };
      emitEvent<SelectChangeParams>(this, 'select-change', newRowKeys, newExtraData);
      this.$emit('update:selectedRowKeys', newRowKeys, newExtraData);
    },
  },
});
