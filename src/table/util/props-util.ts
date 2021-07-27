import { SetupContext } from 'vue';
import { getPropsApiByEvent } from '../../utils/helper';
import { BaseTableCol } from '../../../types/base-table/TdBaseTableProps';

export function flatColumns(columns: Array<BaseTableCol>): Array<BaseTableCol> {
  const result: Array<BaseTableCol> = [];
  columns.forEach((column: BaseTableCol) => {
    const { children } = column;
    if (children?.length) {
      result.push(...flatColumns(children));
    } else {
      result.push({
        ...column,
      });
    }
  });
  return result;
};

export function treeMap(tree: Array<any>, mapper: Function, childrenName = 'children') {
  return tree.map((node, index) => {
    const extra = {};
    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }
    return {
      ...mapper(node, index),
      ...extra,
    };
  });
}

export function flatFilter(tree: Array<any>, callback: Function) {
  return tree.reduce((acc, node) => {
    if (callback(node)) {
      acc.push(node);
    }
    if (node.children) {
      const children = flatFilter(node.children, callback);
      acc.push(...children);
    }
    return acc;
  }, []);
}
