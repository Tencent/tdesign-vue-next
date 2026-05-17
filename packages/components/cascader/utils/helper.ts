import { isArray, isEmpty, isNumber, isObject } from 'lodash-es';

import {
  TreeNode,
  CascaderContextType,
  TdCascaderProps,
  CascaderValue,
  TreeNodeValue,
  TreeOptionData,
  FilterValue,
} from '../types';

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

/**
 * 面板过滤未激活时的标识值
 * 用于 FilterState.maxLevel 的初始/重置态，表示当前没有任何面板处于过滤生效状态
 */
export const FILTER_INACTIVE_LEVEL = -1;

/**
 * 判断节点 label 是否匹配关键词
 * 用于 columnHeader/columnFooter 通过字符串关键词过滤当前面板的选项时
 * @param option 待匹配的树节点
 * @param keyword 已 trim 并转小写的关键词
 * @returns 是否命中关键词
 */
export function checkOptionMatchKeyword(option: TreeNode, keyword: string): boolean {
  if (!option.label || !keyword) return false;
  return option.label.toLowerCase().includes(keyword);
}

/**
 * 判断给定的面板层级是否处于过滤激活状态
 * 与 FILTER_INACTIVE_LEVEL 对比，level 为 -1 时视为未激活
 * @param level 面板层级（FilterState.maxLevel）
 * @returns 当前层级是否处于激活的过滤状态
 */
export function isFilterLevelActive(level: number): boolean {
  return level !== FILTER_INACTIVE_LEVEL;
}

/**
 * 判断单个 filter 值是否生效
 * @param filter 单个面板的过滤值（关键词或自定义判定函数）
 * @returns filter 是否生效
 */
export function isFilterActive(filter: FilterValue | undefined): boolean {
  if (filter === undefined) return false;
  if (typeof filter === 'string') return Boolean(filter.trim());
  return true;
}

/**
 * 根据 filter 对指定面板的节点进行过滤
 * @param nodes 当前面板的全部节点
 * @param filter 当前面板生效的过滤值（关键词或自定义判定函数）
 * @param panelIndex 当前面板在多级面板中的索引（从 0 开始）
 * @returns 过滤后剩余的节点列表
 */
export function filterOptions(nodes: TreeNode[], filter: FilterValue, panelIndex: number): TreeNode[] {
  if (typeof filter === 'string') {
    const keyword = filter.trim().toLowerCase();
    if (!keyword) return nodes;
    return nodes.filter((node) => checkOptionMatchKeyword(node, keyword));
  }
  return nodes.filter((node) => filter(node.data, panelIndex));
}
