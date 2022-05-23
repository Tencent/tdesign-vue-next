import { ref, watch, toRefs } from 'vue';
import pick from 'lodash/pick';
import { TdTreeProps } from './type';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import TreeItem from './tree-item';

import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { getMark, getNode } from './util';

import { TypeEventState, TypeTreeNodeModel, TypeTargetNode } from './interface';

export default function useTree(props: TdTreeProps, statusContext: any) {
  const treeStore = ref();
  const nodesMap = new Map(); // nodesMap
  const treeNodes = ref([]);
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
    return expanded;
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
    const { value, expanded, actived } = props;
    if (value && value.length > 0) {
      treeStore.value.replaceChecked(value);
    }
    if (expanded && expanded.length > 0) {
      treeStore.value.replaceExpanded(expanded);
    }
    if (actived && actived.length > 0) {
      treeStore.value.replaceActived(actived);
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
      return setExpanded(tnode, !tnode.isExpanded(), ctx);
    }
    if (shouldActive) {
      const tnode = getNode(treeStore.value, node);
      return setActived(tnode, !tnode.isActived(), ctx);
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

  // 更新视图节点映射关系
  const updateNodesMap = () => {
    let index = 0;
    while (index < treeNodes.value.length) {
      const nodeView = treeNodes[index];
      if (nodeView && nodeView.componentInstance) {
        const { node } = nodeView.componentInstance;
        if (node && !treeStore.value.getNode(node.value)) {
          // 视图列表中的节点，在树中不存在
          const nodeViewIndex = treeNodes.value.indexOf(nodeView);
          // 则从视图中删除对应节点
          treeNodes.value.splice(nodeViewIndex, 1);
          // 注意 $destroy 是一个耗时操作
          nodeView.componentInstance.$destroy();
          nodesMap.set(node.value, null);
          nodesMap.delete(node.value);
        } else {
          index += 1;
        }
      } else {
        index += 1;
      }
    }
  };

  // 刷新树的视图状态
  const refresh = () => {
    updateNodesMap();

    let index = 0;
    const allNodes = treeStore.value.getNodes();
    allNodes.forEach((node: TreeNode) => {
      if (node.visible) {
        if (nodesMap.has(node.value)) {
          const nodeView = nodesMap.get(node.value);
          const nodeViewIndex = treeNodes.value.indexOf(nodeView);
          if (nodeViewIndex !== index) {
            // 节点存在，但位置与可视节点位置冲突，需要更新节点位置
            treeNodes.value.splice(nodeViewIndex, 1);
            treeNodes.value.splice(index, 0, nodeView);
          }
        } else {
          // 节点可视，且不存在视图，创建该节点视图并插入到当前位置
          const nodeView = (
            <TreeItem
              key={node.value}
              node={node}
              treeScope={statusContext.value}
              onChange={handleChange}
              onClick={handleClick}
            />
          );
          treeNodes.value.splice(index, 0, nodeView);
          nodesMap.set(node.value, nodeView);
        }
        index += 1;
      } else if (nodesMap.has(node.value)) {
        // 节点不可视，存在该视图，需要删除该节点视图
        const nodeView = nodesMap.get(node.value);
        const nodeViewIndex = treeNodes.value.indexOf(nodeView);
        treeNodes.value.splice(nodeViewIndex, 1);
        nodesMap.delete(node.value);
      }
    });
    const { nodeMap } = treeStore.value;
    nodesMap.forEach((value: any, key: string) => {
      if (!nodeMap.has(key)) {
        // 这个节点可能被删掉了，视图也要同步删掉
        const nodeView = nodesMap.get(key);
        const nodeViewIndex = treeNodes.value.indexOf(nodeView);
        treeNodes.value.splice(nodeViewIndex, 1);
        nodesMap.delete(key);
      }
    });
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

  // data 变化，重构tree
  watch(
    () => props.data,
    (list) => {
      nodesMap.clear();
      treeNodes.value = [];
      const { value, actived } = props;
      treeStore.value.reload(list);
      // 初始化选中状态
      if (Array.isArray(value)) {
        treeStore.value.setChecked(value);
      }
      treeStore.value.updateExpanded();
      // 初始化激活状态
      if (Array.isArray(actived)) {
        treeStore.value.setActived(actived);
      }
      treeStore.value.refreshState();
    },
  );

  // watch
  watch(
    () => innerValue,
    (nVal) => {
      treeStore.value.replaceChecked(nVal);
    },
  );
  watch(
    () => innerExpanded,
    (nVal) => {
      treeStore.value.replaceExpanded(nVal);
    },
  );
  watch(
    () => innerActived,
    (nVal) => {
      treeStore.value.replaceActived(nVal);
    },
  );

  init();
  return {
    treeStore,
    treeNodes,
  };
}
