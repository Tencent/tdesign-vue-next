import isEmpty from 'lodash/isEmpty';
import {
  TreeNode,
  CascaderContextType,
  CascaderProps,
  CascaderValue,
  TreeNodeValue,
  TreeOptionData,
} from '../interface';

/**
 * 获取node的全部路径
 * @param node
 * @returns
 */
export function getFullPathLabel(node: TreeNode) {
  return node
    .getPath()
    .map((node: TreeNode) => node.label)
    .join('/');
}

/**
 * treeValue计算方法
 * @param value
 * @returns
 */
export const getTreeValue = (value: CascaderContextType['value']) => {
  let treeValue: TreeNodeValue[] = [];
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === 'object') {
      treeValue = (value as TreeOptionData[]).map((val) => val.value);
    } else if (value.length) {
      treeValue = value as TreeNodeValue[];
    }
  } else if (value) {
    if (typeof value === 'object') {
      treeValue = [(value as TreeOptionData).value];
    } else {
      treeValue = [value];
    }
  }
  return treeValue;
};

/**
 * 计算数值
 * @param value
 * @param showAllLevels
 * @param multiple
 * @returns
 */
export const getValue = (value: CascaderValue, valueType: CascaderProps['valueType'], multiple: boolean) => {
  if (valueType === 'single') {
    return value;
  }
  if (multiple) {
    return (value as Array<CascaderValue>).map((item: TreeNodeValue[]) => item[item.length - 1]);
  }
  return value[(value as Array<CascaderValue>).length - 1];
};

/**
 * 空值校验
 * 补充value为Number时的空值校验逻辑，排除NaN
 * @param value
 * @returns
 */
export function isEmptyValues(value: unknown): boolean {
  if (typeof value === 'number' && !isNaN(value)) return false;
  return isEmpty(value);
}

/**
 * 初始化数据校验
 * @param value
 * @param cascaderContext
 * @returns
 */
export function valueValidate(value: CascaderValue, cascaderContext: CascaderContextType) {
  const { multiple, showAllLevels } = cascaderContext;
  return (multiple && !Array.isArray(value)) || (!multiple && Array.isArray(value) && !showAllLevels);
}
