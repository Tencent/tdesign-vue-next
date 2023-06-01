import { ref, watch, toRefs, nextTick } from 'vue';
import isArray from 'lodash/isArray';
import { TdTreeProps } from './type';
import TreeItem from './tree-item';

import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';

import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import useOnDrag from './hooks/useOnDrag';
import { getMark, getNode, getStoreConfig } from './util';

import { TypeEventState, TypeTreeNodeModel } from './interface';

export default function useTree(props: TdTreeProps) {
  const treeStore = ref();
  const cacheMap = new Map();
  const treeNodeViews = ref([]);
  const { expanded, actived, value, modelValue } = toRefs(props);

  const [innerChecked, setInnerChecked] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const [innerActived, setInnerActived] = useDefaultValue(actived, props.defaultActived, props.onActive, 'actived');
  const [innerExpanded, setInnerExpanded] = useDefaultValue(
    expanded,
    props.defaultExpanded,
    props.onExpand,
    'expanded',
  );

  // 懒加载回调
  const handleLoad = (info: TypeEventState) => {
    const { node } = info;
    const ctx = {
      node: node.getModel(),
    };
    if (innerChecked.value && innerChecked.value.length > 0) {
      treeStore.value.replaceChecked(innerChecked.value);
    }
    if (innerExpanded.value && innerExpanded.value.length > 0) {
      treeStore.value.replaceExpanded(innerExpanded.value);
    }
    if (innerActived.value && innerActived.value.length > 0) {
      treeStore.value.replaceActived(innerActived.value);
    }
    props.onLoad?.(ctx);
  };

  // 点击回调
  const handleClick = (state: TypeEventState) => {
    const { expandOnClickNode } = props;
    const { mouseEvent, event, node } = state;

    if (!node) {
      return;
    }
    let shouldExpand = expandOnClickNode;
    let shouldActive = !props.disabled && !node.disabled;
    ['trigger', 'ignore'].forEach((markName) => {
      const mark = getMark(markName, event.target as HTMLElement, event.currentTarget as HTMLElement);
      const markValue = mark?.value || '';
      if (markValue.indexOf('expand') >= 0) {
        if (markName === 'trigger') {
          shouldExpand = true;
        } else if (markName === 'ignore') {
          // shouldExpand = false;
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
      const expanded = node.setExpanded(!tnode.isExpanded());
      setInnerExpanded(expanded, { ...ctx, trigger: 'node-click' });
    }

    if (shouldActive) {
      const tnode = getNode(treeStore.value, node);
      const actived = node.setActived(!tnode.isActived());
      setInnerActived(actived, ctx);
    }

    props.onClick?.(ctx);
  };

  const handleChange = (state: TypeEventState) => {
    const { disabled } = props;
    const { node, mouseEvent } = state;
    if (!node || disabled || node.disabled) {
      return;
    }

    const tnode = getNode(treeStore.value, node);
    const checked = node.setChecked(!tnode.isChecked());
    setInnerChecked(checked, {
      node: node.getModel(),
      e: mouseEvent,
    });
  };

  // 节点渲染
  const renderTreeNodeViews = () => {
    const nodes = treeStore.value.getNodes();

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
              onChange={handleChange}
              onClick={handleClick}
              expandOnClickNode={props.expandOnClickNode}
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

  useOnDrag(treeStore);

  // 更新展开状态
  const updateExpanded = () => {
    const { expandParent } = props;
    // 初始化展开状态
    // 校验是否自动展开父节点
    if (isArray(innerExpanded.value)) {
      const expandedMap = new Map();
      innerExpanded.value.forEach((val) => {
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

  // 初始化
  const init = () => {
    let options = props.data;
    const store = new TreeStore({
      ...getStoreConfig(props),
      onLoad: (info: TypeEventState) => {
        handleLoad(info);
      },
      onUpdate: () => {
        renderTreeNodeViews();
      },
    });

    // 初始化数据
    treeStore.value = store;

    if (!isArray(options)) {
      options = [];
    }
    store.append(options);

    // 刷新节点，必须在配置选中之前执行
    // 这样选中态联动判断才能找到父节点
    store.refreshNodes();

    // 初始化选中状态
    if (isArray(innerChecked.value)) {
      store.setChecked(innerChecked.value);
    }

    updateExpanded();

    // 初始化激活状态
    if (isArray(innerActived.value)) {
      store.setActived(innerActived.value);
    }

    // 树的数据初始化之后，需要立即进行一次视图刷新
    renderTreeNodeViews();
  };

  // ------ 监听start ------

  // data变化，重构 tree
  watch(
    () => props.data,
    (list) => {
      list = props.data;
      cacheMap.clear();

      treeStore.value.reload(list);
      // 刷新节点，必须在配置选中之前执行
      // 这样选中态联动判断才能找到父节点
      treeStore.value.refreshNodes();
      if (!list.length) return;
      // 初始化选中状态
      if (isArray(innerChecked.value)) {
        treeStore.value.setChecked(innerChecked.value);
      }

      // 更新展开状态
      updateExpanded();

      // 初始化激活状态
      if (isArray(innerActived.value)) {
        treeStore.value.setActived(innerActived.value);
      }
      // 刷新节点状态
      treeStore.value.refreshState();
    },
  );

  // tree插件配置变化
  watch(
    () => getStoreConfig(props),
    () => {
      if (!treeStore.value) return;
      treeStore.value.setConfig(getStoreConfig(props));
    },
  );
  watch(innerChecked, (nVal) => {
    treeStore.value.replaceChecked(nVal);
  });
  watch(innerExpanded, (nVal) => {
    treeStore.value.replaceExpanded(nVal);
  });
  watch(innerActived, (nVal) => {
    treeStore.value.replaceActived(nVal);
  });

  // 初始化树
  init();

  return {
    treeStore,
    treeNodeViews,
  };
}
