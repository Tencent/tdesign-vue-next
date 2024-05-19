import type { ComponentPublicInstance } from '@td/adapter-vue';
import { cloneDeep, isArray, isUndefined } from 'lodash-es';

import type { DataOption, TdTransferProps, TransferItemOption, TransferListOptionBase, TransferValue } from './interface';

export { emitEvent } from '../utils/event';

export const TRANSFER_NAME = 'TTransfer';

export const SOURCE = 'source';
export const TARGET = 'target';

interface TreeNode {
  children?: Array<TreeNode>;
}

function findTopNode(vm: ComponentPublicInstance): ComponentPublicInstance {
  // 找到t-transfer这层父节点
  if (vm.$options.name === 't-transfer') {
    return vm;
  }
  if (vm.$parent) {
    return findTopNode(vm.$parent);
  }
  return vm;
}

function getTransferListOption<T>(prop: T | Array<T>): TransferListOptionBase<T> {
  if (isArray(prop)) {
    return {
      source: prop[0],
      target: prop[1],
    };
  }
  return {
    source: prop,
    target: prop,
  };
}

function getDataValues(
  data: Array<TransferItemOption>,
  filterValues: Array<TransferValue>,
  {
    isTreeMode = false,
    include = true, // true=保留filterValues，false=删除filterValues中元素
  } = {},
): Array<TransferValue> {
  // 用于处理 tree 组件这种数据结构是树形的
  if (isTreeMode) {
    let result: Array<TransferValue> = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const isInclude = filterValues.includes(item.value);
        if (!include && isInclude) {
          continue; // 排除模式下子元素一律排除
        }

        // 只找叶子节点
        if (item.children && item.children.length > 0) {
          const childResult = getDataValues(item.children, filterValues, {
            isTreeMode,
            include,
          });
          result = result.concat(childResult);
        } else if ((include && isInclude) || (!include && !isInclude)) {
          result.push(item.value);
        }
      }
    }
    return result;
  }
  return data
    .filter((item) => {
      if (!item) {
        return false;
      }
      const isInclude = filterValues.includes(item.value);
      return ((include && isInclude) || (!include && !isInclude)) && !item.disabled;
    })
    .map(item => item.value);
}

function getTransferData(
  data: Array<DataOption>,
  keys: TdTransferProps['keys'],
  isTreeMode = false,
): Array<TransferItemOption> {
  const list: Array<TransferItemOption> = data.map((transferDataItem, index): TransferItemOption => {
    const labelKey = keys?.label || 'label';
    const valueKey = keys?.value || 'value';
    const disabledKey = keys?.disabled || 'disabled';
    if (isUndefined(transferDataItem[labelKey])) {
      throw new Error(`${labelKey} is not in DataOption ${JSON.stringify(transferDataItem)}`);
    }
    if (isUndefined(transferDataItem[valueKey])) {
      throw new Error(`${valueKey} is not in DataOption ${JSON.stringify(transferDataItem)}`);
    }
    const result: TransferItemOption = {
      label: transferDataItem[labelKey] as string,
      value: transferDataItem[valueKey],
      key: `key__value_${transferDataItem[valueKey]}_index_${index}`,
      disabled: transferDataItem[disabledKey] ?? false,
      data: transferDataItem,
    };
    if (isTreeMode && transferDataItem.children) {
      result.children = getTransferData(transferDataItem.children, keys, true);
    }
    return result;
  });
  return list;
}

function isAllNodeValid(data: TransferItemOption, filterValues: Array<TransferValue>, needMatch: boolean): boolean {
  if (filterValues.includes(data.value)) {
    return needMatch;
  }
  return false;
}

function isTreeNodeValid(data: TransferItemOption, filterValues: Array<TransferValue>, needMatch: boolean): boolean {
  if (!data) {
    return !needMatch;
  }

  if (filterValues.includes(data.value)) {
    return needMatch;
  }

  if (data.children?.length) {
    return data.children.some(item => isTreeNodeValid(item, filterValues, needMatch));
  }
  return !needMatch;
}

// 复制树并过滤节点
function cloneTreeWithFilter(
  sourceTree: TransferItemOption[],
  targetTree: TransferItemOption[],
  filterValues: Array<TransferValue>,
  needMatch: boolean,
) {
  sourceTree.forEach((item) => {
    let newNode: TransferItemOption;
    if (isAllNodeValid(item, filterValues, needMatch)) {
      // 如果当前节点直接命中，则复制所有子节点
      newNode = cloneDeep<TransferItemOption>(item);
      targetTree.push(newNode);
    } else if (isTreeNodeValid(item, filterValues, needMatch)) {
      // 如果有合法子节点，就复制这个节点
      newNode = {
        ...item,
      };
      delete newNode.children;
      targetTree.push(newNode);
      if (item.children) {
        newNode.children = [];
        cloneTreeWithFilter(item.children, newNode.children, filterValues, needMatch);
        if (newNode.children.length === 0) {
          delete newNode.children;
        }
      }
    }
  });
}

// 过滤列表，如果是树的话需要保持树的结构
function filterTransferData(
  data: Array<TransferItemOption>,
  filterValues: Array<TransferValue>,
  needMatch = true,
  isTreeMode = false,
) {
  if (!isTreeMode) {
    if (needMatch) {
      // 正向过滤。要保持filterValues顺序
      return filterValues.map(value => data.find(item => item.value === value)).filter(item => !!item);
    }
    // 反向过滤
    return data.filter((item) => {
      const isMatch = filterValues.includes(item.value);
      return !isMatch;
    });
  }

  const result: Array<TransferItemOption> = [];
  cloneTreeWithFilter(data, result, filterValues, needMatch);
  return result;
}

// 获取树节点的叶子数量
function getLefCount(nodes: Array<TreeNode>): number {
  let total = 0;
  nodes.forEach((child) => {
    if (child.children && child.children.length > 0) {
      total += getLefCount(child.children);
    } else {
      total += 1;
    }
  });
  return total;
}

export {
  findTopNode,
  getTransferListOption,
  getDataValues,
  getTransferData,
  cloneTreeWithFilter,
  filterTransferData,
  getLefCount,
};
