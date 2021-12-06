import isNumber from 'lodash/isNumber';
import { TreeNode, CascaderContextType, CascaderProps, TreeNodeValue } from '../interface';

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
 * 点击item的副作用
 * @param propsTrigger
 * @param trigger
 * @param node
 * @param cascaderContext
 * @param onChange
 * @param ctx
 */
export function expendClickEffect(
  propsTrigger: CascaderProps['trigger'],
  trigger: CascaderProps['trigger'],
  node: TreeNode,
  cascaderContext: CascaderContextType,
) {
  const {
    checkStrictly,
    filterActive,
    multiple,
    treeStore,
    setFilterActive,
    setVisible,
    setValue,
    setTreeNodes,
    setExpend,
    value,
    max,
  } = cascaderContext;

  const isDisabled = node.disabled || (multiple && (value as TreeNodeValue[]).length >= max && max !== 0);

  if (isDisabled) return;
  // 点击展开节点，设置展开状态
  if (propsTrigger === trigger && !node.isLeaf()) {
    const expanded = node.setExpanded(true);
    treeStore.refreshNodes();
    treeStore.replaceExpanded(expanded);
    const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
    setTreeNodes(nodes);

    // 多选条件下手动维护expend
    if (multiple) {
      setExpend(expanded);
    }
  }

  if (!multiple && (node.isLeaf() || checkStrictly) && trigger === 'click') {
    treeStore.resetChecked();
    const checked = node.setChecked(!node.isChecked());
    const [value] = checked;

    // 过滤状态下，点击后清除过滤状态
    if (filterActive) {
      setFilterActive(false);
    }

    // 非过滤状态下，关闭
    if (!filterActive && !checkStrictly) {
      setVisible(false);
    }

    // 非受控状态下更新状态
    setValue(value, 'checked', node.getModel());
  }
}

/**
 * 多选状态下选中状态数据变化的副作用
 * @param node
 * @param cascaderContext
 * @returns
 */
export function valueChangeEffect(node: TreeNode, cascaderContext: CascaderContextType) {
  const { disabled, max, multiple, setVisible, setValue, filterActive, setFilterActive, treeNodes, treeStore } =
    cascaderContext;

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
    setVisible(false);
  }

  const isSelectAll = treeNodes.every((item) => checked.indexOf(item.value) > -1);

  if (filterActive && isSelectAll) {
    setVisible(false);
    setFilterActive(false);
  }

  setValue(checked, 'checked', node.getModel());
}
