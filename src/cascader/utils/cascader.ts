import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import { getFullPathLabel, getTreeValue } from './helper';
import { TreeNode, TreeNodeValue, CascaderContextType, CascaderProps } from '../interface';

/**
 * icon Class
 * @param prefix
 * @param STATUS
 * @param cascaderContext
 * @returns
 */
export function getFakeArrowIconClass(
  prefix: string,
  STATUS: Record<string, string>,
  cascaderContext: CascaderContextType,
) {
  const { disabled } = cascaderContext;
  return [
    `${prefix}-cascader__icon`,
    {
      [STATUS.disabled]: disabled,
    },
  ];
}

/**
 * 单选状态下内容
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getSingleContent(cascaderContext: CascaderContextType) {
  const { value, multiple, treeStore, showAllLevels, setValue } = cascaderContext;
  if (multiple || !value) return '';

  if (Array.isArray(value)) return '';
  const node = treeStore && treeStore.getNodes(value as TreeNodeValue | TreeNode);
  if (!(node && node.length)) {
    if (value) {
      setValue(multiple ? [] : '', 'invalid-value');
    }
    return '';
  }
  const path = node && node[0].getPath();
  if (path && path.length) {
    return showAllLevels ? path.map((node: TreeNode) => node.label).join(' / ') : path[path.length - 1].label;
  }
  return value as string;
}

/**
 * 多选状态下选中内容
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getMultipleContent(cascaderContext: CascaderContextType) {
  const { value, multiple, treeStore, showAllLevels } = cascaderContext;

  if (!multiple) return [];
  if (multiple && !Array.isArray(value)) return [];

  const node = treeStore && treeStore.getNodes(value as TreeNodeValue | TreeNode);
  if (!node) return [];

  return (value as TreeNodeValue[]).map((item: TreeNodeValue) => {
    const node = treeStore.getNodes(item);
    return showAllLevels ? getFullPathLabel(node[0]) : node[0].label;
  });
}

/**
 * closeIcon点击副作用
 * @param cascaderContext
 */
export function closeIconClickEffect(cascaderContext: CascaderContextType) {
  const { setVisible, multiple, setExpend, setValue } = cascaderContext;

  setVisible(false);

  // 手动设置的展开需要去除
  if (multiple) {
    setExpend([]);
  }

  setValue(multiple ? [] : '', 'clear');
}

/**
 * tag 关闭按钮点击副作用
 * @param cascaderContext
 */
export function handleRemoveTagEffect(
  cascaderContext: CascaderContextType,
  index: number,
  onRemove: CascaderProps['onRemove'],
) {
  const { disabled, setValue, value, valueType, treeStore } = cascaderContext;

  if (disabled) return;
  const newValue = cloneDeep(value) as [];
  const res = newValue.splice(index, 1);
  const node = treeStore.getNodes(res[0])[0];

  setValue(newValue, 'unchecked', node.getModel());

  const checked = node.setChecked(!node.isChecked());
  // 处理不同数据类型
  const resValue =
    valueType === 'single'
      ? checked
      : checked.map((val) =>
          treeStore
            .getNode(val)
            .getPath()
            .map((item) => item.value),
        );

  setValue(resValue, 'unchecked', node.getModel());
  if (isFunction(onRemove)) {
    onRemove({ value: checked, node: node as any });
  }
}

/**
 * 外显content点击副作用
 * @param cascaderContext
 */
export function innerContentClickEffect(cascaderContext: CascaderContextType) {
  const { setVisible, visible, filterActive, disabled } = cascaderContext;

  if (!disabled) {
    if (visible && filterActive) return; // input filter is active
    setVisible(!visible);
  }
}

/**
 * input和treeStore变化的副作用
 * @param inputVal
 * @param treeStore
 * @param setTreeNodes
 * @returns
 */
export const treeNodesEffect = (
  inputVal: CascaderContextType['inputVal'],
  treeStore: CascaderContextType['treeStore'],
  setTreeNodes: CascaderContextType['setTreeNodes'],
) => {
  if (!treeStore) return;
  let nodes = [];
  if (inputVal) {
    nodes = treeStore.nodes.filter((node: TreeNode) => {
      const fullPathLabel = getFullPathLabel(node);
      return fullPathLabel.toLocaleLowerCase().indexOf(`${inputVal}`.toLocaleLowerCase()) > -1 && node.isLeaf();
    });
  } else {
    nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
  }
  setTreeNodes(nodes);
};

/**
 * 初始化展开阶段与展开状态副作用
 * @param treeStore
 * @param treeValue
 * @param expend
 */
export const treeStoreExpendEffect = (
  treeStore: CascaderContextType['treeStore'],
  value: CascaderContextType['value'],
  expend: TreeNodeValue[],
) => {
  const treeValue = getTreeValue(value);

  if (!treeStore) return;
  // init expanded, 无expend状态时设置
  if (Array.isArray(treeValue) && expend.length === 0) {
    const expandedMap = new Map();
    const [val] = treeValue;
    if (val) {
      expandedMap.set(val, true);
      const node = treeStore.getNode(val);
      if (!node) {
        treeStore.refreshNodes();
        return;
      }
      node.getParents().forEach((tn: TreeNode) => {
        expandedMap.set(tn.value, true);
      });
      const expandedArr = Array.from(expandedMap.keys());
      treeStore.replaceExpanded(expandedArr);
    } else {
      treeStore.resetExpanded();
    }
  }
  // 本地维护 expend，更加可控，不需要依赖于 tree 的状态
  if (treeStore.getExpanded() && expend.length) {
    treeStore.replaceExpanded(expend);
  }
  treeStore.refreshNodes();
};
