import { ref, watch, toRefs, nextTick, computed } from 'vue';
import pick from 'lodash/pick';
import { TdTreeProps } from './type';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import TreeItem from './tree-item';

import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { getMark, getNode } from './util';

import { TypeEventState, TypeTreeNodeModel, TypeTargetNode } from './interface';

// 是否启用嵌套布局
const nested = false;

export default function useTree(props: TdTreeProps, statusContext: any) {
  const treeStore = ref();
  const cacheMap = new Map();
  const treeNodeViews = ref([]);
  const { expanded, actived, value, modelValue } = toRefs(props);
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const [innerActived, setInnerActived] = useDefaultValue(actived, props.defaultActived, props.onActive, 'actived');
  const [innerExpanded, setInnerExpanded] = useDefaultValue(
    expanded,
    props.defaultExpanded,
    props.onExpand,
    'expanded',
  );

  const setActived = (item: TypeTargetNode, isActived: boolean, ctx: any) => {
    const node = getNode(treeStore.value, item);
    const actived = node.setActived(isActived);
    setInnerActived(actived, ctx);
    return actived;
  };

  const setExpanded = (item: TypeTargetNode, isExpanded: boolean, ctx: any) => {
    const node = getNode(treeStore.value, item);
    const expanded = node.setExpanded(isExpanded);
    setInnerExpanded(expanded, ctx);
  };

  const setChecked = (item: TypeTargetNode, isChecked: boolean, ctx: any) => {
    const node = getNode(treeStore.value, item);
    const checked = node.setChecked(isChecked);
    setInnerValue(checked, ctx);
    return checked;
  };

  const handleLoad = (info: TypeEventState) => {
    const { node } = info;
    const ctx = {
      node: node.getModel(),
    };
    if (innerValue.value && innerValue.value.length > 0) {
      treeStore.value.replaceChecked(innerValue.value);
    }
    if (innerExpanded.value && innerExpanded.value.length > 0) {
      treeStore.value.replaceExpanded(innerExpanded.value);
    }
    if (innerActived.value && innerActived.value.length > 0) {
      treeStore.value.replaceActived(innerActived.value);
    }
    props.onLoad?.(ctx);
  };

  const handleClick = (state: TypeEventState) => {
    const { expandOnClickNode } = props;
    const { mouseEvent, event, node } = state;

    if (!node || props.disabled || node.disabled) {
      return;
    }

    let shouldExpand = expandOnClickNode;
    let shouldActive = true;
    ['trigger', 'ignore'].forEach((markName) => {
      const mark = getMark(markName, event.target as HTMLElement, event.currentTarget as HTMLElement);
      const markValue = mark?.value || '';
      if (markValue.indexOf('expand') >= 0) {
        if (markName === 'trigger') {
          shouldExpand = true;
        } else if (markName === 'ignore') {
          shouldExpand = false;
        }
      }
      if (markValue.indexOf('active') >= 0) {
        if (markName === 'ignore') {
          shouldActive = false;
        }
      }
    });

    const ctx = {
      node: node.getModel(),
      e: mouseEvent,
    };

    if (shouldExpand) {
      const tnode = getNode(treeStore.value, node);
      setExpanded(tnode, !tnode.isExpanded(), ctx);
    }
    if (shouldActive) {
      const tnode = getNode(treeStore.value, node);
      setActived(tnode, !tnode.isActived(), ctx);
    }

    props.onClick?.(ctx);
  };

  const handleChange = (state: TypeEventState) => {
    const { disabled } = props;
    const { node, mouseEvent } = state;
    if (!node || disabled || node.disabled) {
      return;
    }

    const ctx = {
      node: node.getModel(),
      e: mouseEvent,
    };

    const tnode = getNode(treeStore.value, node);
    setChecked(tnode, !tnode.isChecked(), ctx);
  };

  const updateExpanded = () => {
    const { expanded, expandParent } = props;
    // 初始化展开状态
    // 校验是否自动展开父节点
    if (Array.isArray(expanded)) {
      const expandedMap = new Map();
      expanded.forEach((val) => {
        expandedMap.set(val, true);
        if (expandParent) {
          const node = treeStore.value.getNode(val);
          node.getParents().forEach((tn: TypeTreeNodeModel) => {
            expandedMap.set(tn.value, true);
          });
        }
      });
      const expandedArr = Array.from(expandedMap.keys());
      treeStore.value.setExpanded(expandedArr);
    }
  };

  const renderItem = (node: TreeNode) => {
    return (
      <TreeItem
        key={node.value}
        node={node}
        nested={nested}
        treeScope={statusContext.value}
        onChange={handleChange}
        onClick={handleClick}
      />
    );
  };

  const renderTreeNodeViews = (nodes: TreeNode[]) => {
    treeNodeViews.value = nodes
      .filter((node: TreeNode) => node.visible)
      .map((node: TreeNode) => {
        // 如果节点已经存在，则使用缓存节点
        let nodeView = cacheMap.get(node.value);
        // 如果节点未曾创建，则临时创建
        if (!nodeView) {
          // 初次仅渲染可显示的节点
          // 不存在节点视图，则创建该节点视图并插入到当前位置
          nodeView = (
            <TreeItem
              key={node.value}
              node={node}
              nested={nested}
              treeScope={statusContext.value}
              onChange={handleChange}
              onClick={handleClick}
            />
          );
          cacheMap.set(node.value, nodeView);
        }
        return nodeView;
      });

    // 更新缓存后，被删除的节点要移除掉，避免内存泄露
    nextTick(() => {
      cacheMap.forEach((view, value: string) => {
        if (!treeStore.value.getNode(value)) {
          cacheMap.delete(value);
        }
      });
    });
  };

  // 刷新树的视图状态
  const refresh = () => {
    let nodes = [];
    if (nested) {
      // 渲染为嵌套结构
      nodes = treeStore.value.getChildren();
    } else {
      // 渲染为平铺列表
      nodes = treeStore.value.getNodes();
    }
    // 默认取全部可显示节点
    renderTreeNodeViews(nodes);
  };

  // 同步 Store 选项
  const updateStoreConfig = () => {
    if (!treeStore.value) return;
    // 统一更新选项，然后在 store 统一识别属性更新
    const storeProps = pick(props, [
      'keys',
      'expandAll',
      'expandLevel',
      'expandMutex',
      'expandParent',
      'activable',
      'activeMultiple',
      'disabled',
      'checkable',
      'checkStrictly',
      'load',
      'lazy',
      'valueMode',
      'filter',
    ]);
    treeStore.value.setConfig(storeProps);
  };

  const init = () => {
    let list = props.data;
    const { actived, value, valueMode, filter } = props;

    const store = new TreeStore({
      valueMode,
      filter,
      onLoad: (info: TypeEventState) => {
        handleLoad(info);
      },
      onUpdate: () => {
        refresh();
      },
    });

    // 初始化数据
    treeStore.value = store;
    updateStoreConfig();

    if (!Array.isArray(list)) {
      list = [];
    }
    store.append(list);

    // 刷新节点，必须在配置选中之前执行
    // 这样选中态联动判断才能找到父节点
    store.refreshNodes();

    // 初始化选中状态
    if (Array.isArray(value)) {
      store.setChecked(value);
    }

    updateExpanded();

    // 初始化激活状态
    if (Array.isArray(actived)) {
      store.setActived(actived);
    }

    // 树的数据初始化之后，需要立即进行一次视图刷新
    refresh();
  };

  // data变化，重构 tree
  watch(
    () => props.data,
    (list) => {
      cacheMap.clear();
      const { value, actived } = props;
      treeStore.value.reload(list);
      // 初始化选中状态
      if (Array.isArray(value)) {
        treeStore.value.setChecked(value);
      }
      // 更新展开状态
      treeStore.value.updateExpanded();
      // 初始化激活状态
      if (Array.isArray(actived)) {
        treeStore.value.setActived(actived);
      }
      // 刷新节点状态
      treeStore.value.refreshState();
    },
  );

  // watch
  watch(innerValue, (nVal) => {
    treeStore.value.replaceChecked(nVal);
  });
  watch(innerExpanded, (nVal) => {
    treeStore.value.replaceExpanded(nVal);
  });
  watch(innerActived, (nVal) => {
    treeStore.value.replaceActived(nVal);
  });

  init();
  return {
    treeStore,
    treeNodeViews,
  };
}
