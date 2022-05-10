/**
 * 多级表头相关逻辑
 ** */

import { RowspanColspan } from '../type';
import { BaseTableColumns, ThRowspanAndColspan } from '../interface';

// 获取节点深度，即表头总层级
export function getNodeDepth(columns: BaseTableColumns, depthMap: Map<any, number>, depth = 1): number {
  let maxDepth = depth;
  // 树形结构递归已有较多函数上下文，此处不使用 forEach 迭代
  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    depthMap.set(col, depth);
    if (col?.children?.length) {
      const deep = getNodeDepth(col.children, depthMap, depth + 1);
      if (deep > maxDepth) {
        maxDepth = deep;
      }
    }
  }
  return maxDepth;
}

// 或当前节点的叶子结点宽度
export function getChildrenNodeWidth(node: BaseTableColumns[0], count = 0) {
  let countNew = count;
  const childrenList = node?.children || [];
  for (let i = 0, len = childrenList.length; i < len; i++) {
    const item = childrenList[i];
    if (item.children) {
      countNew = getChildrenNodeWidth(item, countNew);
    } else {
      countNew += 1;
    }
  }
  return countNew;
}

// 获取多级表头对应的 colspan 和 rowspan，以及叶子节点
export function getThRowspanAndColspan(columns: BaseTableColumns) {
  const depthMap = new Map<any, number>();
  const columnsDepth = getNodeDepth(columns, depthMap);
  const rowspanAndColspanMap: ThRowspanAndColspan = new Map();
  const loop = (nodes: BaseTableColumns, leafColumns: BaseTableColumns) => {
    for (let i = 0, len = nodes.length; i < len; i++) {
      const col = nodes[i];
      const rowspan = col.children ? 1 : columnsDepth - depthMap.get(col) + 1;
      const colspan = col.children ? getChildrenNodeWidth(col) : 1;
      // 避免存在 rowspan 或者 colspan 空属性
      const span: RowspanColspan = {};
      rowspan > 1 && (span.rowspan = rowspan);
      colspan > 1 && (span.colspan = colspan);
      rowspanAndColspanMap.set(col, span);
      if (col?.children?.length) {
        loop(col.children, leafColumns);
      } else {
        leafColumns.push(col);
      }
    }
  };
  const leafColumns: BaseTableColumns = [];
  loop(columns, leafColumns);
  return { rowspanAndColspanMap, leafColumns };
}

// 表头渲染所需的二维数据
export function getThList(columns: BaseTableColumns): Array<BaseTableColumns> {
  const loop = (nodes: BaseTableColumns, thRows: Array<BaseTableColumns>) => {
    let thRowData: BaseTableColumns = [];
    let children: BaseTableColumns = [];
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      const thList = [node];
      thRowData = thRowData.concat(thList);
      if (node?.children?.length) {
        children = children.concat(node.children);
      }
    }
    if (children?.length) {
      loop(children, thRows);
    }
    thRows.push(thRowData);
    return thRowData;
  };
  let list: Array<BaseTableColumns> = [];
  loop(columns, list);
  list = list.reverse();
  return list;
}
