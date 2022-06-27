import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import { TreeNode, CascaderContextType, TdCascaderProps, TreeNodeValue, TreeNodeModel } from '../interface';
import { getFullPathLabel, getTreeValue } from './helper';

/**
 * 点击item的副作用
 * @param propsTrigger
 * @param trigger
 * @param node
 * @param cascaderContext
 */
export function expendClickEffect(
  propsTrigger: TdCascaderProps['trigger'],
  trigger: TdCascaderProps['trigger'],
  node: TreeNode,
  cascaderContext: CascaderContextType,
) {
  const { checkStrictly, multiple, treeStore, setVisible, setValue, setTreeNodes, setExpend, value, max, valueType } =
    cascaderContext;

  const isDisabled = node.disabled || (multiple && (value as TreeNodeValue[]).length >= max && max !== 0);

  if (isDisabled) return;
  // 点击展开节点，设置展开状态
  if (propsTrigger === trigger && !node.isLeaf()) {
    const expanded = node.setExpanded(true);
    treeStore.refreshNodes();
    treeStore.replaceExpanded(expanded);
    const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
    setTreeNodes(nodes);

    // 多选条件下手动维护expend
    if (multiple) {
      setExpend(expanded);
    }
  }

  if (!multiple && (node.isLeaf() || checkStrictly) && trigger === 'click') {
    treeStore.resetChecked();
    const checked = node.setChecked(!node.checked);
    const [value] = checked;

    // 非受控状态下更新状态
    setValue(valueType === 'single' ? value : node.getPath().map((item) => item.value), 'check', node.getModel());

    if (!checkStrictly) {
      setVisible(false, {});
    }
  }
}

/**
 * 多选状态下选中状态数据变化的副作用
 * @param node
 * @param cascaderContext
 * @returns
 */
export function valueChangeEffect(node: TreeNode, cascaderContext: CascaderContextType) {
  const { disabled, max, inputVal, multiple, setVisible, setValue, treeNodes, treeStore, valueType } = cascaderContext;

  if (!node || disabled || node.disabled) {
    return;
  }
  const checked = node.setChecked(!node.isChecked());

  if (isNumber(max) && max < 0) {
    console.warn('TDesign Warn:', 'max should > 0');
  }

  if (checked.length > max && isNumber(max) && max > 0) {
    return;
  }

  if (checked.length === 0) {
    const expanded = treeStore.getExpanded();
    setTimeout(() => {
      treeStore.replaceExpanded(expanded);
      treeStore.refreshNodes();
    }, 0);
  }

  if (!multiple) {
    setVisible(false, {});
  }

  const isSelectAll = treeNodes.every((item) => checked.indexOf(item.value) > -1);

  if (inputVal && isSelectAll) {
    setVisible(false, {});
  }

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

  setValue(resValue, 'check', node.getModel());
}

/**
 * closeIcon点击副作用
 * @param cascaderContext
 */
export function closeIconClickEffect(cascaderContext: CascaderContextType) {
  const { setVisible, multiple, setExpend, setValue } = cascaderContext;

  setVisible(false, {});

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
  onRemove: TdCascaderProps['onRemove'],
) {
  const { disabled, setValue, value, valueType, treeStore } = cascaderContext;

  if (disabled) return;
  const newValue = cloneDeep(value) as [];
  const res = newValue.splice(index, 1);
  const node = treeStore.getNodes(res[0])[0];

  setValue(newValue, 'uncheck', node.getModel());

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

  setValue(resValue, 'uncheck', node.getModel());
  if (isFunction(onRemove)) {
    onRemove({ value: checked, node: node as any });
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
  filter: CascaderContextType['filter'],
) => {
  if (!treeStore) return;
  let nodes = [];
  if (inputVal) {
    const filterMethods = (node: TreeNode) => {
      if (!node.isLeaf()) return;
      if (isFunction(filter)) {
        return filter(`${inputVal}`, node as TreeNodeModel & TreeNode);
      }
      const fullPathLabel = getFullPathLabel(node, '');
      return fullPathLabel.indexOf(`${inputVal}`) > -1;
    };

    nodes = treeStore.nodes.filter(filterMethods);
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
