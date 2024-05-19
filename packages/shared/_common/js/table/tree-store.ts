import isUndefined from 'lodash/isUndefined';
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import get from 'lodash/get';
import set from 'lodash/set';
import { isRowSelectedDisabled } from './utils';
import { PrimaryTableCol, TableRowState, TableRowValue, TableRowData } from './types';
import log from '../log';

export type TableTreeDataMap = Map<string | number, TableRowState>;

export interface TableRowModel<T> extends TableRowState<T> {
  setData?: (key: string | number, data: T) => void;
}

export interface KeysType {
  rowKey: string;
  childrenKey: string;
}

export interface SwapParams<T> {
  current: T;
  target: T;
  currentIndex: number;
  targetIndex: number;
}

export const TABLE_TREE_ERROR_CODE_NOT_SAME_LEVEL = {
  code: 1001,
  reason: 'The same level of rows can not be swapped.',
};

/**
 * 获取行唯一标识
 * @param row 行数据
 * @param colKey 列字段
 * @param rowIndex 行下标
 * @param level 层级
 */
export function getUniqueRowValue(row: TableRowData, colKey: string, rowIndex: number = 0, level: number = 0) {
  const rowValue = get(row, colKey);
  return rowIndex || level ? `${rowValue}_${rowIndex || 0}_${level || 0}}` : rowValue;
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

  expandAllRowIndex: 0;

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
    this.initialTreeDataMap(this.treeDataMap, dataSource, columns.find((col) => col.colKey === 'row-select'), keys);
  }

  /**
   * 获取所有节点的唯一标识
   */
  getAllUniqueKeys(data: T[], keys: KeysType, arr: T[] = []) {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      arr.push(getUniqueRowValue(item, keys.rowKey));
      const children = get(item, keys.childrenKey);
      if (children?.length) {
        this.getAllUniqueKeys(children, keys, arr);
      }
    }
    return arr;
  }

  getExpandedChildrenKeys(data: T[], keys: KeysType, arr: (string | number)[] = []) {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      const rowValue = getUniqueRowValue(item, keys.rowKey);
      const rowState = this.treeDataMap.get(rowValue);
      if (rowState.expanded) {
        arr.push(rowValue);
      }
      const children = get(item, keys.childrenKey);
      if (children?.length) {
        this.getExpandedChildrenKeys(children, keys, arr);
      }
    }
    return arr;
  }

  expandTreeNode(rowList: (string | number)[], dataSource: T[], keys: KeysType) {
    if (!rowList.length) return dataSource;
    rowList.forEach((rowValue) => {
      const rowState = this.treeDataMap.get(rowValue);
      if (!rowState) return;
      this.toggleExpandData({ row: rowState.row as T, rowIndex: rowState.rowIndex }, dataSource, keys, 'expand');
    });
    return dataSource;
  }

  foldTreeNode(rowList: (string | number)[], dataSource: T[], keys: KeysType) {
    if (!rowList.length) return dataSource;
    rowList.forEach((rowValue) => {
      const rowState = this.treeDataMap.get(rowValue);
      if (!rowState) return;
      this.toggleExpandData({ row: rowState.row as T, rowIndex: rowState.rowIndex }, dataSource, keys, 'fold');
    });
    return dataSource;
  }

  toggleExpandData(p: { rowIndex: number; row: T }, dataSource: T[], keys: KeysType, type?: 'expand' | 'fold') {
    if (!p) {
      log.error('EnhancedTable', 'the node toggleExpanded doest not exist in `data`');
      return dataSource;
    }
    const rowValue = get(p.row, keys.rowKey);
    if (isUndefined(rowValue)) {
      log.error('EnhancedTable', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
      return [];
    }
    const childrenNodes = get(p.row, keys.childrenKey);
    // childrenNodes = true，表示懒加载，直接返回，暂时不做展开处理
    if (childrenNodes === true) return dataSource;
    const r = this.treeDataMap.get(rowValue);
    if (type === 'expand' && r.expanded) return dataSource;
    if (type === 'fold' && !r.expanded) return dataSource;
    r.rowIndex = r.rowIndex ?? p.rowIndex;
    r.expanded = !r.expanded;
    this.treeDataMap.set(rowValue, r);
    return this.updateExpandRow(r, dataSource, keys);
  }

  updateExpandRow(changeRow: TableRowState, dataSource: T[], keys: KeysType): T[] {
    const { row, rowIndex, expanded } = changeRow;
    const { treeDataMap } = this;
    const childrenNodes = get(row, keys.childrenKey);
    if (!row || !childrenNodes) return dataSource;
    if (expanded) {
      updateChildrenRowState(treeDataMap, changeRow, expanded, keys);
      updateRowExpandLength(treeDataMap, row, childrenNodes.length, 'expand', keys);
      // eslint-disable-next-line
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
   * @param rowValue 当前行唯一标识值
   * @param newRowData 新行数据
   * @returns {number} rowIndex 设置的行下标
   */
  updateData(rowValue: TableRowValue, newRowData: T, dataSource: T[], keys: KeysType): number {
    const newRowValue = getUniqueRowValue(newRowData, keys.rowKey);
    const rowState = this.treeDataMap.get(rowValue);
    // Map 没有查询到，或者查询到的 rowIndex 值为 -1，均表示当前数据不在 dataSource 列表中，未显示在页面中
    if (!rowState || rowState.rowIndex === -1) {
      updateRowData(dataSource, rowValue, newRowData, {
        rowKey: keys.rowKey,
        childrenKey: keys.childrenKey,
      });
      return -1;
    }

    // 懒加载处理：children 为 true，则需清空子元素在 map 中的值，而后方便重新加载
    if (get(newRowData, keys.childrenKey) === true) {
      const oldChildren = get(rowState.row, keys.childrenKey);
      if (oldChildren?.length) {
        for (let i = 0, len = oldChildren.length; i < len; i++) {
          const rowValue = getUniqueRowValue(oldChildren[i], keys.rowKey);
          const state = this.treeDataMap.get(rowValue);
          if (state) {
            this.treeDataMap.delete(rowValue);
          }
        }
      }
    }

    const currentRowIndex = rowState.rowIndex;
    rowState.row = newRowData;
    rowState.id = newRowValue;

    // 更新父元素中存储的当前元素值
    if (rowState.parent) {
      // 更新直接子元素数组
      const siblings = get(rowState.parent.row, keys.childrenKey);
      const index = siblings.findIndex((item: T) => getUniqueRowValue(item, keys.rowKey) === rowValue);
      siblings[index] = newRowData;
    }

    this.treeDataMap.set(newRowValue, rowState);
    // rowValue 也发生了变化，需移除 旧 rowValue 数据
    if (rowValue !== newRowValue) {
      this.treeDataMap.delete(rowValue);
    }
    return currentRowIndex;
  }

  /**
   * 移除指定节点
   * @param key 行唯一标识
   */
  remove(key: TableRowValue, dataSource: T[], keys: KeysType): T[] {
    const r = this.treeDataMap.get(key);
    if (r && r.rowIndex >= 0) {
      // 移除当前节点时，展开的节点的子节点需同步移除
      const removeNumber = (r.expandChildrenLength || 0) + 1;
      dataSource.splice(r.rowIndex, removeNumber);

      if (r.parent) {
        const siblings = get(r.parent.row, keys.childrenKey);
        const index = siblings.findIndex((item: TableRowData) => get(item, keys.rowKey) === key);
        siblings.splice(index, 1);
        updateRowExpandLength(this.treeDataMap, r.parent.row, -1 * removeNumber, 'delete', keys);
      }

      this.treeDataMap.delete(key);

      // 更新 rowIndex 之后的下标
      updateRowIndex(this.treeDataMap, dataSource, {
        minRowIndex: r.rowIndex,
        rowKey: keys.rowKey,
        type: 'remove',
      });
    } else {
      log.warn('EnhancedTable', 'Can not remove this node, which is not appeared.');
    }
    return dataSource;
  }

  /**
   * 清除子节点
   * @param key
   * @param dataSource
   * @param keys
   */
  removeChildren(key: TableRowValue, dataSource: T[], keys: KeysType): T[] {
    const r = this.treeDataMap.get(key);
    if (r && r.rowIndex >= 0) {
      const removeNumber = r.expandChildrenLength || 0;
      if (removeNumber) {
        dataSource.splice(r.rowIndex + 1, removeNumber);
      }
      if (r.parent) {
        updateRowExpandLength(this.treeDataMap, r.parent.row, -1 * removeNumber, 'delete', keys);
      }
      r.expandChildrenLength = 0;
      r.expanded = false;
      set(r.row, keys.childrenKey, undefined);
      this.treeDataMap.set(key, r);
      // 更新 rowIndex 之后的下标
      if (removeNumber) {
        updateRowIndex(this.treeDataMap, dataSource, {
          minRowIndex: r.rowIndex + 1,
          rowKey: keys.rowKey,
          type: 'remove',
        });
      }
    } else {
      log.warn('EnhancedTable', 'Can not remove this node\'s children, which is not appeared.');
    }
    return dataSource;
  }

  /**
   * 为当前节点添加子节点，默认添加到最后一个节点。允许添加单个或多个
   * @param rowValue 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  appendTo(rowValue: string | number, newData: T | T[], dataSource: T[], keys: KeysType): T[] {
    const state = this.treeDataMap.get(rowValue);
    if (!this.validateDataExist(state, rowValue)) return dataSource;
    const children: T[] = get(state.row, keys.childrenKey);
    // 子节点不存在，则表示为叶子节点
    const isShowNewNode = state.expanded || !children?.length;
    // 添加多个子节点时，需去除重复子节点
    const tmpData = newData instanceof Array ? newData : [newData];
    const newChildrenData: T[] = [];
    const newChildrenStates: TableRowState[] = [];
    let firstNewChildrenIndex = -1;
    for (let i = 0, len = tmpData.length; i < len; i++) {
      const oneData = tmpData[i];
      const newRowValue = getUniqueRowValue(oneData, keys.rowKey);
      const mapState = this.treeDataMap.get(newRowValue);
      if (!this.validateDataDoubleExist(mapState, newRowValue)) {
        log.warn('Table', `Duplicated Data \`${newRowValue}\` has been removed.`);
      } else {
        const rowIndex = isShowNewNode ? state.rowIndex + (state.expandChildrenLength || 0) + (i + 1) : -1;
        if (i === 0) {
          firstNewChildrenIndex = rowIndex;
        }
        const newState = {
          id: newRowValue,
          row: oneData,
          rowIndex,
          level: state.level + 1,
          expanded: false,
          expandChildrenLength: 0,
          disabled: false,
          path: [...state.path],
          parent: state,
        };
        newState.path = newState.path.concat(newState);
        newChildrenData.push(oneData);
        newChildrenStates.push(newState);
        this.treeDataMap.set(newRowValue, newState);
      }
    }
    if (!newChildrenData.length) return dataSource;

    if (children?.length) {
      state.row[keys.childrenKey] = state.row[keys.childrenKey].concat(newChildrenData);
    } else {
      state.row[keys.childrenKey] = newChildrenData;
      state.expanded = true;
    }

    // 如果当前节点为展开状态，则需要继续处理
    if (isShowNewNode) {
      dataSource.splice(firstNewChildrenIndex, 0, ...newChildrenData);
      // 更新父元素及祖先元素展开子节点的数量
      const newChildrenCount = newChildrenData.length || 1;
      updateRowExpandLength(this.treeDataMap, state.row, newChildrenCount, 'insert', {
        rowKey: keys.rowKey,
        childrenKey: keys.childrenKey,
      });
      // 更新 rowIndex 之后的下标
      updateRowIndex(this.treeDataMap, dataSource, {
        minRowIndex: firstNewChildrenIndex + newChildrenData.length - 1,
        rowKey: keys.rowKey,
        type: 'add',
        count: 1,
      });
    }

    return dataSource;
  }

  appendToRoot(newData: T | T[], dataSource: T[], keys: KeysType) {
    const newDataSource = dataSource.concat(newData);
    const tmpNewData = newData instanceof Array ? newData : [newData];
    const dataSourceLen = dataSource.length;
    for (let i = 0, len = tmpNewData.length; i < len; i++) {
      const rowValue = get(tmpNewData[i], keys.rowKey);
      if (!rowValue) {
        log.error('Table', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
        continue;
      }
      const state: TableRowState = {
        id: rowValue,
        row: tmpNewData[i],
        rowIndex: dataSourceLen + i,
        level: 0,
        expanded: false,
        expandChildrenLength: 0,
        disabled: false,
      };
      state.path = [state];
      this.treeDataMap.set(rowValue, state);
    }
    return newDataSource;
  }

  /**
   * 在当前节点后，插入一个兄弟节点
   * @param rowValue 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  insertAfter(rowValue: string | number, newData: T, dataSource: T[], keys: KeysType): T[] {
    return this.insert(rowValue, newData, dataSource, keys, 'after');
  }

  /**
   * 在当前节点前，插入一个兄弟节点
   * @param rowValue 当前节点唯一标识
   * @param newData 待添加的新节点
   */
  insertBefore(rowValue: string | number, newData: T, dataSource: T[], keys: KeysType): T[] {
    return this.insert(rowValue, newData, dataSource, keys, 'before');
  }

  insert(rowValue: string | number, newData: T, dataSource: T[], keys: KeysType, type: 'before' | 'after') {
    const state = this.treeDataMap.get(rowValue);
    if (!this.validateDataExist(state, rowValue)) return dataSource;
    const newRowValue = get(newData, keys.rowKey);
    const mapState = this.treeDataMap.get(newRowValue);
    if (!this.validateDataDoubleExist(mapState, newRowValue)) return dataSource;
    const rowIndex = type === 'after' ? state.rowIndex + 1 : state.rowIndex;
    const newState = {
      id: newRowValue,
      row: newData,
      rowIndex,
      level: state.level,
      expanded: false,
      expandChildrenLength: 0,
      disabled: false,
      path: state.path.slice(0, -1),
      parent: state.parent,
    };
    newState.path = newState.path.concat(newState);
    const dataIndex = type === 'after' ? state.rowIndex + (state.expandChildrenLength + 1) : state.rowIndex;
    dataSource.splice(dataIndex, 0, newData);
    const distance = type === 'after' ? 1 : 0;
    if (state.parent) {
      const childrenIndex = state.parent.row[keys.childrenKey].findIndex(
        (t: TableRowData) => rowValue === get(t, keys.rowKey),
      );
      state.parent.row[keys.childrenKey].splice(childrenIndex + distance, 0, newData);
      updateRowExpandLength(this.treeDataMap, state.parent.row, 1, 'insert', keys);
    }
    this.treeDataMap.set(newRowValue, newState);

    // 更新 rowIndex 之后的下标
    updateRowIndex(this.treeDataMap, dataSource, {
      rowKey: keys.rowKey,
      minRowIndex: state.rowIndex + 1,
      type: 'add',
    });

    return dataSource;
  }

  /**
   * 交换数据行
   * @returns 交换失败返回 false
   */
  swapData(
    dataSource: T[],
    params: SwapParams<T>,
    keys: KeysType,
  ): { dataSource: T[]; result: boolean; code?: number; reason?: string } {
    const startIndex = params.currentIndex;
    const endIndex = params.targetIndex;
    if (startIndex === endIndex) return { dataSource, result: true };
    const startRowValue = get(params.current, keys.rowKey);
    const endRowValue = get(params.target, keys.rowKey);
    const startState = this.treeDataMap.get(startRowValue);
    const endState = this.treeDataMap.get(endRowValue);
    if (startState.level !== endState.level) {
      return {
        dataSource,
        result: false,
        code: TABLE_TREE_ERROR_CODE_NOT_SAME_LEVEL.code,
        reason: TABLE_TREE_ERROR_CODE_NOT_SAME_LEVEL.reason,
      };
    }
    const startLastIndex = startIndex + startState.expandChildrenLength + 1;
    const endLastIndex = endIndex + endState.expandChildrenLength + 1;
    const startRowList = dataSource.slice(startIndex, startLastIndex);
    const endRowList = dataSource.slice(endIndex, endLastIndex);
    if (startIndex > endIndex) {
      const middleRowList = dataSource.slice(endLastIndex, startIndex);
      const allSwapList = startRowList.concat(endRowList, middleRowList);
      dataSource.splice(endIndex, allSwapList.length);
      dataSource.splice(endIndex, 0, ...allSwapList);
      updateRowIndex(this.treeDataMap, dataSource, {
        rowKey: keys.rowKey,
        minRowIndex: endIndex,
        maxRowIndex: startLastIndex,
      });
    } else {
      const middleRowList = dataSource.slice(startLastIndex, endIndex);
      const allSwapList = middleRowList.concat(endRowList, startRowList);
      dataSource.splice(startIndex, allSwapList.length);
      dataSource.splice(startIndex, 0, ...allSwapList);
      updateRowIndex(this.treeDataMap, dataSource, {
        rowKey: keys.rowKey,
        minRowIndex: startIndex,
        maxRowIndex: endLastIndex,
      });
    }

    // 交换父元素中的两个元素位置
    if (startState.parent) {
      const children = startState.parent.row[keys.childrenKey];
      let count = 0;
      let targetIndex = -1;
      let currentIndex = -1;
      for (let i = 0, len = children.length; i < len; i++) {
        if (get(children[i], keys.rowKey) === startRowValue) {
          targetIndex = i;
          count += 1;
        }
        if (get(children[i], keys.rowKey) === endRowValue) {
          currentIndex = i;
          count += 1;
        }
        if (count >= 2) break;
      }
      children[targetIndex] = params.target;
      children[currentIndex] = params.current;
    }

    return { dataSource, result: true };
  }

  /**
   * 展开所有节点
   */
  expandAll(dataSource: T[], keys: KeysType) {
    this.expandAllRowIndex = 0;
    const newData: T[] = [];
    const expandLoop = (
      dataSource: T[],
      keys: KeysType,
      parent: TableRowState = null,
    ) => {
      for (let i = 0, len = dataSource.length; i < len; i++) {
        const item = dataSource[i];
        const rowValue = get(item, keys.rowKey);
        const state = this.treeDataMap.get(rowValue);
        const children = get(item, keys.childrenKey);
        state.rowIndex = this.expandAllRowIndex;
        // children = true is async load
        if (children !== true && children?.length) {
          state.expanded = true;
        }
        state.expandChildrenLength = children?.length || 0;
        this.expandAllRowIndex += 1;
        newData.push(item);
        this.treeDataMap.set(rowValue, state);
        if (children?.length) {
          // 同步更新父元素的展开数量
          let tmpParent = parent;
          while (tmpParent?.row) {
            tmpParent.expandChildrenLength += children.length;
            this.treeDataMap.set(tmpParent.id, tmpParent);
            tmpParent = tmpParent.parent;
          }
          // 继续子元素
          expandLoop(children, keys, state);
        }
      }
    };
    expandLoop(dataSource, keys);
    return newData;
  }

  /**
   * 收起所有节点
   */
  foldAll(dataSource: T[], keys: KeysType) {
    const newData: T[] = [];
    let index = 0;
    for (let i = 0, len = dataSource.length; i < len; i++) {
      const item = dataSource[i];
      const rowValue = get(item, keys.rowKey);
      const state = this.treeDataMap.get(rowValue);
      state.rowIndex = state.level === 0 ? index : -1;
      state.expanded = false;
      state.expandChildrenLength = 0;
      if (state.level === 0) {
        newData.push(item);
        index += 1;
      }
      const children = get(item, keys.childrenKey);
      if (children?.length) {
        this.foldAll(children, keys);
      }
    }
    return newData;
  }

  /** 获取整个树形结构 */
  getTreeNode(dataSource: T[], keys: KeysType): T[] {
    // let isStarted = false;
    const treeData: T[] = [];
    for (let i = 0, len = dataSource.length; i < len; i++) {
      const item = dataSource[i];
      const rowValue = get(item, keys.rowKey);
      const state = this.treeDataMap.get(rowValue);
      // 只需要压入第一层数据
      if (state.level === 0) {
        treeData.push(item);
      }
    }
    return treeData;
  }

  /**
   * 获取展开的树形节点
   * @param dataSource 平铺的树形结构数据
   * @param keys 行唯一标识和子节点的字段名
   * @param type 'unique' 标识获取展开节点的行唯一标识值，'data' 表示获取展开节点的数据，'all' 表示获取行节点包含展开状态的全部数据
   * @returns 展开的树形节点
   */
  getTreeExpandedRow(dataSource: T[], keys: KeysType, type: 'unique' | 'data' | 'all' = 'data') {
    const arr: (T | any)[] = [];
    dataSource.forEach((item) => {
      const rowValue = get(item, keys.rowKey);
      const rowState = this.treeDataMap.get(rowValue);
      if (!rowState.expanded) return;
      if (type === 'unique') {
        arr.push(rowValue);
      } else if (type === 'data') {
        arr.push(item);
      } else {
        arr.push(rowState);
      }
    });
    return arr;
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
      const rowValue = getUniqueRowValue(item, keys.rowKey);
      if (isUndefined(rowValue)) {
        log.error('EnhancedTable', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
        return;
      }
      const children = get(item, keys.childrenKey);
      const state: TableRowState = {
        id: rowValue,
        row: item,
        rowIndex: level === 0 ? i : -1,
        level,
        expanded: false,
        expandChildrenLength: 0,
        disabled: isRowSelectedDisabled(column, item, i),
        parent,
      };
      state.path = parent ? parent.path.concat(state) : [state];
      treeDataMap.set(rowValue, state);
      if (children?.length) {
        this.initialTreeDataMap(treeDataMap, children, column, keys, level + 1, state);
      }
    }
  }

  // column.checkProps 和 column.disabled 会影响行的禁用状态，因此当列发生变化时，需要重置禁用状态
  updateDisabledState(dataSource: T[], column: PrimaryTableCol, keys: KeysType) {
    for (let i = 0, len = dataSource.length; i < len; i++) {
      const item = dataSource[i];
      const rowValue = get(item, keys.rowKey);
      if (isUndefined(rowValue)) {
        log.error('EnhancedTable', '`rowKey` could be wrong, can not get rowValue from `data` by `rowKey`.');
        return;
      }
      const state = this.treeDataMap.get(rowValue);
      state.disabled = isRowSelectedDisabled(column, item, i);
      this.treeDataMap.set(rowValue, state);
      const children = get(item, keys.childrenKey);
      if (children?.length) {
        this.updateDisabledState(children, column, keys);
      }
    }
  }

  /**
   * 校验数据合法性
   */
  validateDataExist(state: TableRowState, rowValue: string | number) {
    if (!state) {
      log.warn('EnhancedTable', `${rowValue} does not exist.`);
      return false;
    }
    return true;
  }

  /**
   * 校验数据是否已存在
   */
  validateDataDoubleExist(state: TableRowState, rowValue: string | number) {
    if (state) {
      log.warn('EnhancedTable', `Duplicated Key. ${rowValue} already exists.`);
      return false;
    }
    return true;
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
    };
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
  extra: {
    rowKey: string;
    minRowIndex?: number;
    maxRowIndex?: number;
    type?: 'add' | 'remove';
    count?: number;
  },
) {
  const start = extra.minRowIndex || 0;
  const end = extra.maxRowIndex || dataSource.length;
  for (let rowIndex = start; rowIndex < end; rowIndex++) {
    const item = dataSource[rowIndex];
    const state = treeDataMap.get(get(item, extra.rowKey));
    if (!state) {
      log.warn('Table', 'tree map went wrong');
    }
    state.rowIndex = rowIndex + (extra?.count || 1) - 1;
  }
}

export function diffExpandedTreeNode(
  newExpandedNode: (number | string)[] = [],
  oldExpandedNode: (number | string)[] = [],
) {
  const removedList: (number | string)[] = [];
  const addedList: (number | string)[] = [];
  const newExpandedNodeMap: Map<any, boolean> = new Map();
  const oldExpandedNodeMap: Map<any, boolean> = new Map();
  for (let i = 0, len = newExpandedNode.length; i < len; i++) {
    newExpandedNodeMap.set(newExpandedNode[i], true);
  }
  for (let i = 0, len = oldExpandedNode.length; i < len; i++) {
    oldExpandedNodeMap.set(oldExpandedNode[i], true);
  }
  for (let i = 0, len = newExpandedNode.length; i < len; i++) {
    if (!oldExpandedNodeMap.get(newExpandedNode[i])) {
      addedList.push(newExpandedNode[i]);
    }
  }
  for (let i = 0, len = oldExpandedNode.length; i < len; i++) {
    if (!newExpandedNodeMap.get(oldExpandedNode[i])) {
      removedList.push(oldExpandedNode[i]);
    }
  }
  return {
    removedList,
    addedList,
  };
}

export type TreeDataMapType = InstanceType<typeof TableTreeStore>['treeDataMap'];
