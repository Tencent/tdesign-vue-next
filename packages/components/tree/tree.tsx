import { isFunction, upperFirst } from 'lodash-es';
import {
  defineComponent,
  getCreateElement,
  getScopedSlots,
  TransitionGroup,
  TreeNode,
  TypeCreateElement,
  TypeStyles,
  TypeTNodeReturnValue,
  TypeTreeOptionData,
  useConfig,
  usePrefixClass,
} from './adapt';
import useDragHandle from './hooks/useDragHandle';
import useTreeAction from './hooks/useTreeAction';
import useTreeNodes from './hooks/useTreeNodes';
import useTreeScroll from './hooks/useTreeScroll';
import useTreeState from './hooks/useTreeState';
import useTreeStore from './hooks/useTreeStore';
import useTreeStyles from './hooks/useTreeStyles';
import props from './props';
import { TreeNodeState, TreeNodeValue, TypeTreeNodeModel } from './tree-types';
import { getNode } from './util';
import { useTNodeJSX } from '@tdesign/hooks';

// 2022.11.02 tabliang 备注
// 之前尝试实现了嵌套布局，原本预期嵌套布局能够提升大数据量下，全部渲染节点时的性能表现
// 实测性能提升有限，不如使用虚拟滚动的收益高，反而导致了组件的维护困难与混乱
// 自 2022 年初首次提出嵌套布局要求，大半年以来，对嵌套布局的需求也不是很高
// 因此废弃嵌套布局方案，之后重点解决虚拟滚动能力

export default defineComponent({
  name: 'TTree',
  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    ...props,
  },

  setup(props, context) {
    const { t, global } = useConfig('tree');
    const classPrefix = usePrefixClass();
    const componentName = usePrefixClass('tree');
    const renderTNodeJSX = useTNodeJSX();

    // 用于 hooks 传递数据
    const { state } = useTreeState(props, context);
    const { treeContentRef, isScrolling } = state;
    const { store, updateStoreConfig, rebuild } = useTreeStore(state);

    useDragHandle(state);
    const { setActived, setExpanded, setChecked } = useTreeAction(state);
    const { onInnerVirtualScroll, virtualConfig, scrollToElement } = useTreeScroll(state);
    const { renderTreeNodes, nodesEmpty } = useTreeNodes(state);
    const { treeClasses, treeContentStyles, scrollStyles, cursorStyles } = useTreeStyles(state);

    // 不想暴露给用户的属性与方法，统一挂载到 setup 返回的对象上
    // 实例上无法直接访问这些方法与属性
    return {
      t,
      global,
      classPrefix,
      componentName,
      state,
      store,
      treeClasses,
      treeContentRef,
      renderTNodeJSX,

      rebuild,
      updateStoreConfig,
      setActived,
      setExpanded,
      setChecked,
      renderTreeNodes,
      nodesEmpty,

      isScrolling,
      onInnerVirtualScroll,
      treeContentStyles,
      scrollStyles,
      cursorStyles,
      virtualConfig,
      scrollToElement: scrollToElement, // deprecated
      scrollTo: scrollToElement,
    };
  },

  watch: {
    // 实测发现，composition api 中的 refsProps watch ，回调时间迟于 $nextTick 回调
    // 因此改为在这里绑定 data 属性监听，实测这里的 watch 回调，早于 $nextTick 回调发生
    data(list) {
      this.rebuild(list);
    },
  },
  // 在 methods 提供公共方法
  // 实例上可以直接访问
  methods: {
    // 刷新树节点状态
    refresh(): void {
      this.store.refreshState();
    },
    // 设置目标节点状态
    setItem(value: TreeNodeValue, options: TreeNodeState): void {
      const node: TreeNode = this.store.getNode(value);
      const spec = options;
      const keys = Object.keys(spec);
      if (node && spec) {
        ['expanded', 'actived', 'checked'].forEach((name) => {
          if (keys.includes(name)) {
            const val = spec[name as keyof typeof spec];
            delete spec[name as keyof typeof spec];
            const methodName = `set${upperFirst(name)}`;
            const setupMethod = this[methodName];
            if (isFunction(setupMethod)) {
              setupMethod.call(this, node, val);
            }
          }
        });
        node.set(spec);
      }
    },
    // 获取目标节点
    getItem(value: TreeNodeValue): TypeTreeNodeModel {
      const node: TreeNode = this.store.getNode(value);
      return node?.getModel();
    },
    // 无 value 参数: 获取 tree 所有节点，一维结构
    // 传递 value 参数: 获取节点值对应的目标节点下，包含自己在内的所有子节点
    getItems(value?: TreeNodeValue): TypeTreeNodeModel[] {
      const nodes = this.store.getNodes(value);
      return nodes.map((node: TreeNode) => node.getModel());
    },
    // 将节点数据插入到目标节点
    // 无目标节点，则插入为根节点
    appendTo(para?: TreeNodeValue, item?: TypeTreeOptionData | TypeTreeOptionData[]) {
      const { store } = this;
      let list = [];
      if (Array.isArray(item)) {
        list = item;
      } else {
        list = [item];
      }
      list.forEach((item) => {
        const val = item?.value || '';
        const node = getNode(store, val);
        if (node) {
          store.appendNodes(para, node);
        } else {
          store.appendNodes(para, item);
        }
      });
    },
    // 在指定节点之前插入单个节点数据
    insertBefore(value: TreeNodeValue, item: TypeTreeOptionData) {
      const { store } = this;
      const val = item?.value || '';
      const node = getNode(store, val);
      if (node) {
        store.insertBefore(value, node);
      } else {
        store.insertBefore(value, item);
      }
    },
    // 在指定节点之后插入单个节点数据
    insertAfter(value: TreeNodeValue, item: TypeTreeOptionData) {
      const { store } = this;
      const val = item?.value || '';
      const node = getNode(store, val);
      if (node) {
        store.insertAfter(value, node);
      } else {
        store.insertAfter(value, item);
      }
    },
    // 移除目标节点
    remove(value?: TreeNodeValue) {
      return this.store.remove(value);
    },
    // 获取节点在当前层级的 index
    getIndex(value: TreeNodeValue): number {
      return this.store.getNodeIndex(value);
    },
    // 获取父节点
    getParent(value: TreeNodeValue): TypeTreeNodeModel {
      const node = this.store.getParent(value);
      return node?.getModel();
    },
    // 获取父节点列表
    getParents(value: TreeNodeValue): TypeTreeNodeModel[] {
      const nodes = this.store.getParents(value);
      return nodes.map((node: TreeNode) => node.getModel());
    },
    // 获取路径节点列表
    getPath(value: TreeNodeValue): TypeTreeNodeModel[] {
      const node = this.store.getNode(value);
      let pathNodes: TypeTreeNodeModel[] = [];
      if (node) {
        pathNodes = node.getPath().map((node: TreeNode) => node.getModel());
      }
      return pathNodes;
    },
    // 提供树结构原始数据
    getTreeData(value?: TreeNodeValue): TypeTreeOptionData[] {
      let list: TreeNode[] = [];
      if (value) {
        const node = this.store.getNode(value);
        if (!node) return [];
        list = this.store.getNodes(value);
      } else {
        list = this.store.getNodes();
      }
      // 一维结构树节点转树结构数据
      const nodeMap: Record<string, TreeNodeState & { value: string; children?: TreeNodeState[] | boolean }> = {};
      const treeNodes: TypeTreeOptionData[] = [];
      list.forEach((item: TreeNode) => {
        const { value } = item;
        const itemData = {
          ...item.data,
          value,
        };
        if (itemData.children !== true) {
          delete itemData.children;
        }
        nodeMap[value] = itemData;
        const parent = item.getParent();
        if (!parent) {
          // 是根节点
          treeNodes.push(itemData);
        } else {
          const parentData = nodeMap[parent.value];
          if (!parentData) {
            // 为目标节点范围内的根节点
            treeNodes.push(itemData);
          } else {
            if (!Array.isArray(parentData.children)) {
              parentData.children = [];
            }
            parentData.children.push(itemData);
          }
        }
      });
      return treeNodes;
    },
  },
  render(h: TypeCreateElement) {
    const {
      state,
      treeClasses,
      updateStoreConfig,
      renderTreeNodes,
      nodesEmpty,
      isScrolling,
      virtualConfig,
      treeContentStyles,
      scrollStyles,
      cursorStyles,
    } = this;

    const createElement = getCreateElement(h);

    const { scope, allNodes, refProps } = state;
    // 更新 scopedSlots
    scope.scopedSlots = getScopedSlots(this);

    updateStoreConfig();

    const treeNodeViews = renderTreeNodes(createElement);
    const cname = this.componentName;
    const isVirtual = virtualConfig.isVirtualScroll.value;

    // 空数据判定
    let emptyNode: TypeTNodeReturnValue = null;
    if (nodesEmpty) {
      const useLocale = !this.empty && !this.$slots.empty;
      const emptyContent = useLocale ? this.t(this.global.empty) : this.renderTNodeJSX('empty');
      emptyNode = <div class={`${cname}__empty`}>{emptyContent}</div>;
    } else if (treeNodeViews.length <= 0) {
      // 数据切换时，有闪现的缓存节点呈现
      // 用这个替换内容置空
      emptyNode = <div></div>;
    }

    // 构造列表
    const { $props } = this;
    const { transition } = $props;

    let treeNodeList = null;
    if (!transition || (isVirtual && isScrolling)) {
      // vue3 不使用 transition group 会导致展开收起动作异常
      treeNodeList = (
        <div class={`${cname}__list`} style={scrollStyles}>
          {treeNodeViews}
        </div>
      );
    } else {
      // 启用动画时，需要确保滚动中动画样式失效
      treeNodeList = (
        <TransitionGroup
          tag="div"
          class={`${cname}__list`}
          enter-active-class={`${cname}__item--enter-active`}
          leave-active-class={`${cname}__item--leave-active`}
          style={scrollStyles}
        >
          {treeNodeViews}
        </TransitionGroup>
      );
    }

    const topValue =
      (allNodes.value?.filter((node) => node.visible).length ?? 0) * (refProps.scroll.value?.rowHeight ?? 34);
    const placeholderStyles: TypeStyles = {
      width: '1px',
      height: '1px',
      opacity: 0,
      pointerEvents: 'none',
      position: 'absolute',
      left: 0,
      top: `${topValue}px`,
    };

    const placeholderEl = <div style={placeholderStyles} />;

    const treeNode = (
      <div class={treeClasses} ref="treeContentRef" onScroll={this.onInnerVirtualScroll} style={treeContentStyles}>
        {isVirtual && <div class={`${cname}__vscroll-cursor`} style={cursorStyles} />}
        {emptyNode || treeNodeList}
        {isVirtual && placeholderEl}
      </div>
    );

    return treeNode;
  },
});
