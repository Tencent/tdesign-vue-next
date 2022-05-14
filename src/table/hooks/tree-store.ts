/* eslint-disable no-param-reassign */
import get from 'lodash/get';
import { isRowSelectedDisabled } from '../utils';
import { PrimaryTableCol, TableRowState, TableRowValue, TableRowData } from '../type';
import log from '../../_common/js/log';

export type TableTreeDataMap = Map<string | number, TableRowState>;

export interface TableRowModel<T> extends TableRowState<T> {
  setData?: (key: string | number, data: T) => void;
}

export interface KeysType {
  rowKey: string;
  childrenKey: string;
}

/**
 * 表格树形结构处理器
 * Vue 和 React 可以通用
 * 关键函数有以下几个
 * @toggleExpandData 处理树形结构展开收起
 * @setData 更新当行数据
 * @getData 获取单行数据
 * @remove 移除行数据，及其子节点
 * @appendTo 追加子节点到末尾
 */
class TableTreeStore<T extends TableRowData = TableRowData> {
  /** 树形结构 Map 存储 */
  treeDataMap: TableTreeDataMap = new Map();

  /** 树形结构中，所有节点展开时，节点的下标 */
  treeIndex = 0;

  /** 树形结构中，所有节点展开时数据。注意节点增删改时的变化  */
  expandedAllTreeData: TableRowState[] = [];

  /** 树形结构中，所有节点折叠时数据。注意节点增删改时的变化 */
  foldTreeData: TableRowState[] = [];

  constructor() {
    this.treeDataMap = new Map();
  }

  /**
   * 初始化 treeDataMap，不会改变 dataSource
   * @param dataSource 树形数据源
   * @param columns 列配置
   * @param keys 字段别名
   */
  initialTreeStore(dataSource: T[], columns: PrimaryTableCol[], keys: KeysType) {
    this.treeDataMap?.clear();
    this.treeIndex = 0;
    this.foldTreeData = [];
    this.expandedAllTreeData = [];
    this.initialTreeDataMap(this.treeDataMap, dataSource, columns[0], keys);
  }

  toggleExpandData(p: { rowIndex: number; row: T }, dataSource: T[], keys: KeysType) {
    if (!p) {
      log.error('EnhancedTable', 'the node you want to toggleExpand doest not exist in `data`');
      return dataSource;
    }
    const rowValue = get(p.row, keys.rowKey);
    if (rowValue === undefined) {
      log.error('EnhancedTable', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
      return [];
    }
    const r = this.treeDataMap.get(rowValue) || {
      id: rowValue,
      row: p.row,
      rowIndex: p.rowIndex,
      expanded: false,
    };
    r.rowIndex = p.rowIndex;
    r.expanded = !r.expanded;
    this.treeDataMap.set(rowValue, r);
    return this.updateExpandRow(r, dataSource, keys);
  }

  updateExpandRow(changeRow: TableRowState, dataSource: T[], keys: KeysType) {
    const { row, rowIndex, expanded } = changeRow;
    const { treeDataMap } = this;
    const childrenNodes = get(row, keys.childrenKey);
    if (!row || !childrenNodes) return;
    if (expanded) {
      updateChildrenRowState(treeDataMap, changeRow, expanded, keys);
      updateRowExpandLength(treeDataMap, row, childrenNodes.length, 'expand', keys);
      dataSource.splice.apply(dataSource, [rowIndex + 1, 0].concat(childrenNodes));
    } else {
      updateChildrenRowState<T>(treeDataMap, changeRow, expanded, keys);
      const len = changeRow.expandChildrenLength || childrenNodes.length;
      updateRowExpandLength(treeDataMap, row, -1 * len, 'fold', keys);
      dataSource.splice(rowIndex + 1, len);
    }
    // 展开或收起后，会影响后续节点的 rowIndex，需同步更新
    updateRowIndex(treeDataMap, dataSource, {
      rowKey: keys.rowKey,
      minRowIndex: rowIndex + 1,
    });
    return dataSource;
  }

  /**
   * 获取当前行全部数据
   * @param key 行唯一标识
   * @returns {TableRowState} 当前行数据
   */
  getData(key: TableRowValue): TableRowState {
    return this.treeDataMap.get(key);
  }

  /**
   * 更新当前行数据，并返回当前行下标
   * 数据的增删改，需同步调整
   *  dataSource, treeDataMap, foldTreeData, expandedAllTreeData,
   *  rowState.id, rowState.row, rowState.parent.row.children, rowState.parent.allChildren,
   * @param rowValue 当前行唯一标识值
   * @param newRowData 新行数据
   * @returns {number} rowIndex 设置的行下标
   */
  updateData(rowValue: TableRowValue, newRowData: T, dataSource: T[], keys: KeysType): number {
    const newRowValue = get(newRowData, keys.rowKey);
    const rowState = this.treeDataMap.get(rowValue);
    // Map 没有查询到，或者查询到的 rowIndex 值为 -1，均表示当前数据不在 dataSource 列表中，未显示在页面中
    if (!rowState || rowState.rowIndex === -1) {
      updateRowData(dataSource, rowValue, newRowData, {
        rowKey: keys.rowKey,
        childrenKey: keys.childrenKey,
      });
      return;
    }
    const currentRowIndex = rowState.rowIndex;
    rowState.row = newRowData;
    rowState.id = newRowValue;

    // 更新父元素中存储的当前元素值
    if (rowState.parent) {
      // 更新直接子元素数组
      const siblings = get(rowState.parent.row, keys.childrenKey);
      const index = siblings.findIndex((item: T) => get(item, keys.rowKey) === rowValue);
      siblings[index] = newRowData;
      // 更新全部资子元素数组
      const currentNodeIndex = rowState.parent.allChildren.findIndex((t) => rowValue === get(t, keys.rowKey));
      rowState.parent.allChildren[currentNodeIndex] = newRowData;
    }

    // 从 foldTreeData 和 expandedAllTreeData 中更新数据
    if (rowState.level === 0) {
      const index = this.foldTreeData.findIndex((t) => t.id === rowValue);
      this.foldTreeData[index] = rowState;
    }
    const index = this.expandedAllTreeData.findIndex((t) => t.id === rowValue);
    this.expandedAllTreeData[index] = rowState;

    this.treeDataMap.set(newRowValue, rowState);
    // rowValue 也发生了变化，需移除 旧 rowValue 数据
    if (rowValue !== newRowValue) {
      this.treeDataMap.delete(rowValue);
    }
    return currentRowIndex;
  }

  /**
   * 移除指定节点
   * 数据的增删改，需同步调整
   *  dataSource, treeDataMap, foldTreeData, expandedAllTreeData,
   *  rowState.id, rowState.row, rowState.parent.row.children, rowState.parent.allChildren,
   * @param key 行唯一标识
   */
  remove(key: TableRowValue, dataSource: T[], keys: KeysType): T[] {
    const r = this.treeDataMap.get(key);
    if (r && r.rowIndex >= 0) {
      // 移除当前节点时，展开的节点的子节点需同步移除
      const removeNumber = (r.expandChildrenLength || 0) + 1;
      dataSource.splice(r.rowIndex, removeNumber);
      const childrenKeys = r.allChildren.map((t) => get(t, keys.rowKey));
      const allToRemovedKeys = [r.id].concat(childrenKeys);

      if (r.parent) {
        const siblings = get(r.parent.row, keys.childrenKey);
        const index = siblings.findIndex((item: TableRowData) => get(item, keys.rowKey) === key);
        siblings.splice(index, 1);
        updateRowExpandLength(this.treeDataMap, r.parent.row, -1 * removeNumber, 'delete', {
          rowKey: keys.rowKey,
          childrenKey: keys.childrenKey,
        });

        // 父元素的 allChildren 也需要移除当前节点的所有子节点
        let tmpParent = r.parent;
        while (tmpParent) {
          tmpParent.allChildren = tmpParent.allChildren.filter((t) => !allToRemovedKeys.includes(get(t, keys.rowKey)));
          tmpParent = tmpParent.parent;
        }
      }

      // 从 foldTreeData 和 expandedAllTreeData 中移除数据
      if (r.level === 0) {
        const index = this.foldTreeData.findIndex((t) => t.id === r.id);
        this.foldTreeData.splice(index, 1);
      }
      this.expandedAllTreeData = this.expandedAllTreeData.filter((t) => !allToRemovedKeys.includes(t.id));

      this.treeDataMap.delete(key);

      // 更新 rowIndex 之后的下标
      updateRowIndex(this.treeDataMap, dataSource, {
        minRowIndex: r.rowIndex,
        rowKey: keys.rowKey,
      });
    } else {
      console.warn('TDesign Table Warn: Do not remove this node, which is not appeared.');
    }
    return dataSource;
  }

  /**
   * 为当前节点添加子节点，默认添加到最后一个节点
   * @param rowValue 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  appendTo(rowValue: string | number, newData: T, dataSource: T[], keys: KeysType): T[] {
    const state = this.treeDataMap.get(rowValue);
    if (!state) {
      console.warn(`TDesign Table Warn: ${rowValue} does not exist.`);
      return;
    }
    const newRowValue = get(newData, keys.rowKey);
    if (this.treeDataMap.get(newRowValue)) {
      console.warn(`TDesign Table Warn: Duplicated Key. ${newRowValue} already exists.`);
      return;
    }
    const children: T[] = get(state.row, keys.childrenKey);
    // 子节点不存在，则表示为叶子节点
    const isShowNewNode = state.expanded || !children?.length;
    const rowIndex = isShowNewNode ? state.rowIndex + (state.expandChildrenLength || 0) + 1 : -1;
    const newState = {
      id: newRowValue,
      row: newData,
      rowIndex,
      treeIndex: rowIndex,
      level: state.level + 1,
      expanded: false,
      expandChildrenLength: 0,
      disabled: false,
      path: [...state.path],
      allChildren: [] as T[],
      parent: state,
    };
    newState.path = newState.path.concat(newState);
    if (children?.length) {
      state.row[keys.childrenKey].push(newData);
    } else {
      // @ts-ignore
      state.row[keys.childrenKey] = [newData];
      state.expanded = true;
    }
    this.treeDataMap.set(newRowValue, newState);
    // 如果当前节点为展开状态，则需要继续处理
    if (isShowNewNode) {
      dataSource.splice(newState.rowIndex, 0, newData);
      // 更新展开子节点数量
      updateRowExpandLength(this.treeDataMap, state.row, 1, 'insert', {
        rowKey: keys.rowKey,
        childrenKey: keys.childrenKey,
      });
      // 更新 rowIndex 之后的下标
      updateRowIndex(this.treeDataMap, dataSource, {
        minRowIndex: newState.rowIndex,
        rowKey: keys.rowKey,
      });
    }

    // 从 expandedAllTreeData 中更新数据。因 appendTo 属于子节点操作，故而 foldTreeData 无需更新
    const index = this.expandedAllTreeData.findIndex((t) => t.id === rowValue);
    this.expandedAllTreeData[index] = state;
    const { expandChildrenLength } = this.expandedAllTreeData[index];
    this.expandedAllTreeData.splice(index + expandChildrenLength, 0, newState);

    return dataSource;
  }

  /**
   * 展开所有节点
   */
  expandAll() {
    return this.expandedAllTreeData.map((t) => {
      t.expandChildrenLength = t.allChildren?.length || 0;
      t.rowIndex = t.treeIndex;
      t.expanded = true;
      this.treeDataMap.set(t.id, t);
      return t.row;
    });
  }

  /**
   * 收起所有节点
   */
  foldAll() {
    this.expandedAllTreeData.forEach((t) => {
      t.expandChildrenLength = 0;
      t.rowIndex = -1;
      t.expanded = false;
      this.treeDataMap.set(t.id, t);
    });
    return this.foldTreeData.map((t, i) => {
      t.rowIndex = i;
      this.treeDataMap.set(t.id, t);
      return t.row;
    });
  }

  /**
   * 初始化树形结构 Map
   * @param treeDataMap 树形结构 Map
   * @param dataSource 数据源
   * @param column 树形结构列
   * @param keys 字段映射关系
   * @param level 层级
   * @param parent 父元素
   * @returns void
   */
  initialTreeDataMap(
    treeDataMap: TableTreeDataMap,
    dataSource: T[],
    column: PrimaryTableCol,
    keys: KeysType,
    level = 0,
    parent: TableRowState = null,
  ) {
    for (let i = 0, len = dataSource.length; i < len; i++) {
      const item = dataSource[i];
      const rowValue = get(item, keys.rowKey);
      if (rowValue === undefined) {
        log.error('EnhancedTable', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
        return;
      }
      const children = get(item, keys.childrenKey);
      const state: TableRowState = {
        id: rowValue,
        row: item,
        rowIndex: i,
        treeIndex: this.treeIndex,
        level,
        expanded: false,
        expandChildrenLength: 0,
        disabled: isRowSelectedDisabled(column, item, i),
        allChildren: children || [],
        parent,
      };
      state.path = parent ? parent.path.concat(state) : [state];

      treeDataMap.set(rowValue, state);

      this.treeIndex += 1;
      this.expandedAllTreeData.push(state);

      level === 0 && this.foldTreeData.push(state);

      if (children?.length) {
        this.initialTreeDataMap(treeDataMap, children, column, keys, level + 1, state);
        let tmpParent = parent;
        while (tmpParent) {
          tmpParent.allChildren = tmpParent.allChildren ? tmpParent.allChildren.concat(children) : children;
          tmpParent = tmpParent.parent;
        }
      }
    }
  }
}

export default TableTreeStore;

/**
 * 更新展开的子节点数量
 * @param rowSate 行数据和状态
 * @param distance 需要调整的展开子节点长度数量，展开时增加，收起时减少。值为负数，表示减
 * @param expanded 展开/收起
 */
export function updateRowExpandLength(
  treeDataMap: TableTreeDataMap,
  row: TableRowData,
  distance: number,
  type: 'expand' | 'fold' | 'delete' | 'insert',
  keys: KeysType,
) {
  let tmp = row;
  while (tmp) {
    const state = treeDataMap.get(get(tmp, keys.rowKey));
    const expandLen = (state.expandChildrenLength || 0) + distance;
    state.expandChildrenLength = Math.max(0, expandLen);
    tmp = state?.parent?.row;
  }
  // 如果是收起状态，子节点需全部收起，清空子节点展开行数量，设置 expandChildrenLength 为 0
  if (type === 'fold') {
    clearRowExpandLength(treeDataMap, row, keys);
  }
}

export function clearRowExpandLength<T>(treeDataMap: TableTreeDataMap, row: T, keys: KeysType) {
  const children = get(row, keys.childrenKey);
  if (children?.length) {
    children.forEach((item: T[]) => {
      const state = treeDataMap.get(get(item, keys.rowKey));
      if (!state) return;
      state.expandChildrenLength = 0;
      clearRowExpandLength(treeDataMap, state.row, keys);
    });
  }
}

/**
 * 更新子节点行状态，行数据、父节点、层级、路径等数据
 * @param rowState 行状态数据
 * @param expanded 展开或收起
 * @param keys
 */
export function updateChildrenRowState<T>(
  treeDataMap: TableTreeDataMap,
  rowState: TableRowState,
  expanded: boolean,
  keys: KeysType,
) {
  const { row, rowIndex } = rowState;
  const childrenNodes = get(row, keys.childrenKey);
  childrenNodes.forEach((item: T, kidRowIndex: number) => {
    const rowValue = get(item, keys.rowKey);
    const index = expanded ? rowIndex + 1 + kidRowIndex : -1;
    const curState = treeDataMap.get(rowValue);
    const newState: TableRowState = {
      ...curState,
      row: item,
      rowIndex: index,
      expanded: false,
      parent: rowState,
      // path: [],
    };
    // newState.path = newState.path.concat(newState);
    treeDataMap.set(rowValue, newState);
    // 父节点展开，子节点不一定展开；父节点收起，则所有子节点收起
    if (!expanded) {
      const children = get(item, keys.childrenKey);
      if (children?.length) {
        updateChildrenRowState(
          treeDataMap,
          {
            ...newState,
            rowIndex: -1,
            expanded: false,
          } as any,
          expanded,
          keys,
        );
      }
    }
  });
}

export function updateRowData<T extends TableRowData = TableRowData>(
  data: T[],
  key: string | number,
  newData: T,
  keys: KeysType,
) {
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i];
    if (get(item, keys.rowKey) === key) {
      // eslint-disable-next-line no-param-reassign
      data[i] = newData;
      return;
    }
    const children: T[] = get(item, keys.childrenKey) || [];
    if (children?.length) {
      updateRowData(children, key, newData, keys);
    }
  }
}

export function updateRowIndex<T>(
  treeDataMap: TableTreeDataMap,
  dataSource: T[],
  extra: { rowKey: string; minRowIndex?: number; maxRowIndex?: number },
) {
  const start = extra.minRowIndex || 0;
  const end = extra.maxRowIndex || dataSource.length;
  for (let rowIndex = start; rowIndex < end; rowIndex++) {
    const item = dataSource[rowIndex];
    const state = treeDataMap.get(get(item, extra.rowKey));
    if (!state) {
      log.warn('Table', 'tree map went wrong');
    }
    state.rowIndex = rowIndex;
  }
}
