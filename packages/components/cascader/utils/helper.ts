import { isArray, isEmpty, isNumber, isObject } from 'lodash-es';

import { TreeNode, CascaderContextType, TdCascaderProps, CascaderValue, TreeNodeValue, TreeOptionData } from '../types';

/**
 * 单选状态下内容
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getSingleContent(cascaderContext: CascaderContextType): string {
  const { value, multiple, treeStore, showAllLevels } = cascaderContext;
  if (multiple || (value !== 0 && !value)) return '';

  if (isArray(value)) return '';
  const node = treeStore && treeStore.getNodes(value as TreeNodeValue | TreeNode);
  if (!(node && node.length)) {
    return value as string;
  }
  const path = node && node[0].getPath();
  if (path && path.length) {
    return showAllLevels ? path.map((node: TreeNode) => node.label).join(' / ') : path.at(-1).label;
  }
  return value as string;
}

/**
 * 多选状态下选中内容
 * @param cascaderContext
 * @returns
 */
export function getMultipleContent(cascaderContext: CascaderContextType) {
  const { value, multiple, treeStore, showAllLevels } = cascaderContext;

  if (!multiple) return [];
  if (multiple && !isArray(value)) return [];

  const node = treeStore && treeStore.getNodes(value as TreeNodeValue | TreeNode);
  if (!node) return [];

  return (value as TreeNodeValue[])
    .map((item: TreeNodeValue) => {
      const node = treeStore.getNodes(item);
      return showAllLevels ? getFullPathLabel(node[0]) : node[0]?.label;
    })
    .filter((item) => !!item);
}

/**
 * 面板数据计算方法
 * @param treeNodes
 * @returns
 */
export function getPanels(treeNodes: CascaderContextType['treeNodes']) {
  const panels: TreeNode[][] = [];
  treeNodes.forEach((node: TreeNode) => {
    if (panels[node.level]) {
      panels[node.level].push(node);
    } else {
      panels[node.level] = [node];
    }
  });
  return panels;
}

/**
 * 获取node的全部路径
 * @param node
 * @returns
 */
export function getFullPathLabel(node: TreeNode, separator = '/') {
  return node
    ?.getPath()
    .map((node: TreeNode) => node.label)
    .join(separator);
}

/**
 * treeValue计算方法
 * @param value
 * @returns
 */
export const getTreeValue = (value: CascaderContextType['value']) => {
  let treeValue: TreeNodeValue[] = [];
  if (isArray(value)) {
    if (value.length > 0 && isObject(value[0])) {
      treeValue = (value as TreeOptionData[]).map((val) => val.value);
    } else if (value.length) {
      treeValue = value as TreeNodeValue[];
    }
  } else if (!isEmptyValues(value)) {
    if (isObject(value)) {
      treeValue = [(value as TreeOptionData).value];
    } else {
      treeValue = [value];
    }
  }
  return treeValue;
};

/**
 * 按数据类型计算通用数值
 * @param value
 * @param showAllLevels
 * @param multiple
 * @returns
 */
export const getCascaderValue = (value: CascaderValue, valueType: TdCascaderProps['valueType'], multiple: boolean) => {
  if (valueType === 'single') {
    return value;
  }
  const val = value as Array<CascaderValue>;
  if (multiple) {
    return val.map((item: TreeNodeValue[]) => item.at(-1));
  }
  return val.at(-1);
};

/**
 * 空值校验
 * 补充value为Number时的空值校验逻辑，排除NaN
 * @param value
 * @returns
 */
export function isEmptyValues(value: unknown): boolean {
  if (isNumber(value) && !isNaN(value)) return false;
  return isEmpty(value);
}

/**
 * 初始化数据校验
 * @param value
 * @param cascaderContext
 * @returns boolean
 */
export function isValueInvalid(value: CascaderValue, cascaderContext: CascaderContextType) {
  const { multiple, showAllLevels, valueType } = cascaderContext;
  return (multiple && !isArray(value)) || (!multiple && isArray(value) && valueType === 'single' && !showAllLevels);
}
