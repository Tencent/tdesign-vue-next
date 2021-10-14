import { TreeNode, CascaderContextType, TreeNodeValue } from '../interface';

/**
 * icon Class
 * @param prefix
 * @param CLASSNAMES
 * @param cascaderContext
 * @returns
 */
export function getIconClass(prefix: string, CLASSNAMES: any, cascaderContext: CascaderContextType) {
  const { visible } = cascaderContext;
  return [
    `${prefix}-cascader-icon`,
    {
      [CLASSNAMES.STATUS.visible]: visible,
    },
  ];
}

/**
 * Cascader外显div class
 * @param prefix
 * @param CLASSNAMES
 * @param cascaderContext
 * @returns
 */
export function getCascaderInnerClasses(prefix: string, CLASSNAMES: any, cascaderContext: CascaderContextType) {
  const {
    disabled, visible, size, multiple,
  } = cascaderContext;
  return [
    `${prefix}-cascader`,
    {
      [CLASSNAMES.STATUS.disabled]: disabled,
      [CLASSNAMES.STATUS.active]: visible,
      [CLASSNAMES.SIZE[size]]: size,
      [`${name}-is-multiple`]: multiple,
    },
  ];
}

/**
 * closeIcon 是否显示
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getCloseShow(isHover: boolean, cascaderContext: CascaderContextType) {
  const {
    multiple, model, disabled, clearable, visible,
  } = cascaderContext;
  return !!(
    !visible
    && clearable
    && isHover
    && !disabled
    && ((!multiple && model) || (multiple && (model as TreeNodeValue[]).length))
  );
}

/**
 * Placeholder 是否显示
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getPlaceholderShow(
  cascaderContext: CascaderContextType,
  singleContent: string,
  multipleContent: TreeNode[],
) {
  const { filterable, visible, multiple } = cascaderContext;
  const valEmpty = !(multiple ? multipleContent.length : singleContent);
  if (filterable) {
    return valEmpty && !visible;
  }
  return valEmpty;
}

/**
 * 单选状态下内容
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getSingleContent(cascaderContext: CascaderContextType) {
  const {
    model, multiple, treeStore, showAllLevels,
  } = cascaderContext;
  if (multiple || !model) return;
  const node = treeStore && treeStore.getNodes(model as TreeNodeValue | TreeNode);
  if (!(node && node.length)) {
    return '';
  }
  const path = node && node[0].getPath();
  if (path && path.length) {
    return showAllLevels ? path.map((node: TreeNode) => node.label).join('/') : path[path.length - 1].label;
  }
  return model as string;
}

/**
 * 多选状态下选中内容
 * @param isHover
 * @param cascaderContext
 * @returns
 */
export function getMultipleContent(cascaderContext: CascaderContextType) {
  const { model, multiple, treeStore } = cascaderContext;

  if (!multiple || !model) return [];

  const node = treeStore && treeStore.getNodes(model as TreeNodeValue | TreeNode);
  if (!node) return [];

  const path = (model as TreeNodeValue[]).map((item: TreeNodeValue) => {
    const node = treeStore.getNodes(item);
    return node[0];
  });
  if (model && (model as TreeNodeValue[]).length) {
    return path && path.length ? path : (model as TreeNode[]);
  }
  return [];
}

/**
 * 点击popup outside副作用
 * @param ref
 * @param cascaderContext
 * @param event
 * @returns
 */
export function outerClickListenerEffect(
  ref: HTMLElement,
  cascaderContext: CascaderContextType,
  event: MouseEvent | TouchEvent,
) {
  const { visible, setVisible } = cascaderContext;
  if (!ref || ref.contains(event.target as Node)) {
    return;
  }

  if (visible) {
    setVisible(false);
  }
}

/**
 * closeIcon点击副作用
 * @param cascaderContext
 */
export function closeIconClickEffect(cascaderContext: CascaderContextType) {
  const {
    setVisible, setModel, treeStore, multiple,
  } = cascaderContext;

  setModel(multiple ? [] : '');
  treeStore.resetChecked();
  treeStore.resetExpanded();
  setVisible(false);
}

/**
 * tag 关闭按钮点击副作用
 * @param cascaderContext
 */
export function handleRemoveTagEffect(cascaderContext: CascaderContextType, node: TreeNode) {
  const { disabled, setModel } = cascaderContext;

  if (disabled) return;
  const checked = node.setChecked(!node.isChecked());
  setModel(checked);
}

/**
 * 外显content点击副作用
 * @param cascaderContext
 */
export function innerContentClickEffect(cascaderContext: CascaderContextType) {
  const {
    setVisible, visible, filterActive, disabled,
  } = cascaderContext;

  if (!disabled) {
    if (visible && filterActive) return; // input filter is active
    setVisible(!visible);
  }
}
