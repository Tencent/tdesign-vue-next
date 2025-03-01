import { computed, toRefs, ref, Ref, watch } from 'vue';
import { get, intersection } from 'lodash-es';
import { TdEnhancedTableProps, TdPrimaryTableProps, TableRowData, PrimaryTableCol } from '../type';
import { KeysType, TableTreeDataMap, TreeDataMapType } from '@tdesign/common-js/table/tree-store';
import useDefaultValue from '../../hooks/useDefaultValue';

export interface GetChildrenDataReturnValue {
  allChildren: Array<any>;
  allChildrenKeys: Array<string | number>;
  leafNodeKeys: Array<string | number>;
}

// 保存子节点信息，避免重复计算
export const childrenMap = new Map();

export function getChildrenData(
  treeDataMap: TreeDataMapType,
  data: TableRowData,
  keys: { childrenKey: string; rowKey: string },
  r?: GetChildrenDataReturnValue,
): GetChildrenDataReturnValue {
  if (childrenMap.get(data)) return childrenMap.get(data);
  const result = r || { allChildren: [], allChildrenKeys: [], leafNodeKeys: [] };
  const children = get(data, keys.childrenKey);
  if (!children || !children.length) return result;
  const selectableChildren = children.filter(
    (item: TableRowData) => !treeDataMap.get(get(item, keys.rowKey))?.disabled,
  );
  result.allChildren = [...new Set(result.allChildren.concat(selectableChildren))];
  for (let i = 0, len = children.length; i < len; i++) {
    const tItem = children[i];
    const c = get(tItem, keys.childrenKey);
    if (c?.length) {
      const nextLevelData = getChildrenData(treeDataMap, tItem, keys, result);
      result.allChildren = [...new Set(result.allChildren.concat(nextLevelData.allChildren))];
    }
  }
  // 避免使用 forEach，减少上下文消耗
  for (let i = 0, len = result.allChildren.length; i < len; i++) {
    const item = result.allChildren[i];
    const children = get(item, keys.childrenKey);
    const rowValue = get(item, keys.rowKey);
    result.allChildrenKeys.push(rowValue);
    if (!children || !children.length) {
      result.leafNodeKeys.push(rowValue);
    }
  }
  result.allChildrenKeys = [...new Set(result.allChildrenKeys)];
  result.leafNodeKeys = [...new Set(result.leafNodeKeys)];
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
  treeDataMap: TreeDataMapType;
  data: Array<any>;
  column: PrimaryTableCol;
  keys: KeysType;
}

export interface GetRowDataParams {
  treeDataMap: TreeDataMapType;
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

export default function useTreeSelect(props: TdEnhancedTableProps, treeDataMap: Ref<TableTreeDataMap>) {
  const { selectedRowKeys, tree, data, indeterminateSelectedRowKeys } = toRefs(props);
  // 半选状态的节点：子节点选中至少一个，且没有全部选中
  const tIndeterminateSelectedRowKeys = ref<(string | number)[]>([]);

  const [tSelectedRowKeys, setTSelectedRowKeys] = useDefaultValue(
    selectedRowKeys,
    props.defaultSelectedRowKeys || [],
    props.onSelectChange,
    'selectedRowKeys',
  );
  const rowDataKeys = computed(() => ({
    rowKey: props.rowKey || 'id',
    childrenKey: props.tree?.childrenKey || 'children',
  }));

  watch([tree, treeDataMap, data, tSelectedRowKeys], ([tree, treeDataMap]) => {
    if (!tree || !treeDataMap.size || tree.checkStrictly) return;
    updateIndeterminateState();
  });

  function updateIndeterminateState() {
    if (!tree.value || tree.value.checkStrictly) return;
    if (!tSelectedRowKeys.value.length) {
      tIndeterminateSelectedRowKeys.value = [];
      return;
    }
    const keys: Array<string | number> = [];
    const parentMap: { [key: string | number]: any[] } = {};
    for (let i = 0, len = tSelectedRowKeys.value.length; i < len; i++) {
      const rowValue = tSelectedRowKeys.value[i];
      const state = treeDataMap.value.get(rowValue);
      if (!state) continue;
      const children = get(state.row, rowDataKeys.value.childrenKey);
      // 根据选中的叶子结点计算父节点半选状态
      if (!children || !children.length) {
        let parentTmp = state.parent;
        while (parentTmp) {
          if (!parentMap[parentTmp.id]) {
            parentMap[parentTmp.id] = [];
          }
          parentMap[parentTmp.id].push(state.row);
          const checkedLength = parentMap[parentTmp.id].length;
          const { allChildrenKeys } = getChildrenData(treeDataMap.value, parentTmp.row, rowDataKeys.value);
          const parentTmpIndex = keys.indexOf(parentTmp.id);
          const selectedIndex = tSelectedRowKeys.value.indexOf(parentTmp.id);
          if (checkedLength > 0 && checkedLength < allChildrenKeys.length && selectedIndex === -1) {
            parentTmpIndex === -1 && keys.push(parentTmp.id);
          } else {
            parentTmpIndex !== -1 && keys.splice(parentTmpIndex, 1);
          }
          parentTmp = parentTmp.parent;
        }
      }
    }
    tIndeterminateSelectedRowKeys.value = keys;
  }

  function updateParentCheckedState(
    selectedKeys: (string | number)[],
    currentRowKey: string | number,
    type: 'check' | 'uncheck',
  ) {
    if (!tree.value || tree.value.checkStrictly) return;
    const keys = [...selectedKeys];
    const state = treeDataMap.value.get(currentRowKey);
    let parentTmp = state.parent;
    while (parentTmp) {
      const { leafNodeKeys } = getChildrenData(treeDataMap.value, parentTmp.row, rowDataKeys.value);
      const checkedChildrenKeys = intersection(leafNodeKeys, selectedKeys);
      const selectedIndex = keys.indexOf(parentTmp.id);
      if (type === 'uncheck') {
        selectedIndex !== -1 && keys.splice(selectedIndex, 1);
      } else if (checkedChildrenKeys.length === leafNodeKeys.length) {
        selectedIndex === -1 && keys.push(parentTmp.id);
      }
      parentTmp = parentTmp.parent;
    }
    return keys;
  }

  function onInnerSelectChange(rowKeys: SelectChangeParams[0], extraData: SelectChangeParams[1]) {
    if (!tree.value || tree.value.checkStrictly) {
      setTSelectedRowKeys(rowKeys, extraData);
      return;
    }
    if (extraData.currentRowKey === 'CHECK_ALL_BOX') {
      handleSelectAll(extraData);
    } else {
      handleSelect(rowKeys, extraData);
    }
  }

  function handleSelectAll(extraData: SelectChangeParams[1]) {
    const newRowKeys: Array<string | number> = [];
    const newRowData: TableRowData[] = [];
    if (extraData.type === 'check') {
      const arr = [...treeDataMap.value.values()];
      for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i];
        if (!item.disabled) {
          newRowData.push(item.row);
          newRowKeys.push(get(item.row, rowDataKeys.value.rowKey));
        }
      }
    }
    const newExtraData = {
      ...extraData,
      selectedRowData: newRowData || [],
    };
    setTSelectedRowKeys(newRowKeys, newExtraData);
  }

  function handleSelect(rowKeys: SelectChangeParams[0], extraData: SelectChangeParams[1]) {
    let newRowKeys = [...rowKeys];
    if (props.tree?.checkStrictly === false) {
      if (extraData?.type === 'check') {
        const result = getChildrenData(treeDataMap.value, extraData.currentRowData, rowDataKeys.value);
        const { allChildrenKeys } = result;
        childrenMap.set(extraData.currentRowData, result);
        newRowKeys = [...new Set(newRowKeys.concat(allChildrenKeys))];
      } else if (extraData?.type === 'uncheck') {
        const children = getChildrenData(treeDataMap.value, extraData.currentRowData, rowDataKeys.value);
        const result = removeChildrenKeys({
          selectedRowKeys: rowKeys,
          removeKeys: children.allChildrenKeys,
        });
        newRowKeys = result.keys;
      }
    }
    newRowKeys = updateParentCheckedState(newRowKeys, extraData.currentRowKey, extraData.type);
    const newRowData = getRowDataByKeys({ treeDataMap: treeDataMap.value, selectedRowKeys: newRowKeys });
    const newExtraData = {
      ...extraData,
      selectedRowData: newRowData,
    };
    setTSelectedRowKeys(newRowKeys, newExtraData);
  }

  return {
    // 如果存在受控属性 indeterminateSelectedRowKeys 则优先使用；否则使用内部状态：tIndeterminateSelectedRowKeys
    tIndeterminateSelectedRowKeys: indeterminateSelectedRowKeys.value
      ? indeterminateSelectedRowKeys
      : tIndeterminateSelectedRowKeys,
    onInnerSelectChange,
  };
}
