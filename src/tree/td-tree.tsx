import upperFirst from 'lodash/upperFirst';
import isFunction from 'lodash/isFunction';
import {
  watch,
  toRefs,
  defineComponent,
  TreeNode,
  useConfig,
  usePrefixClass,
  TypeTreeOptionData,
  TypeTNodeReturnValue,
  TypeCreateElement,
  TransitionGroup,
} from './adapt';
import props from './props';
import { TreeNodeValue, TreeNodeState, TypeTreeNodeModel } from './tree-types';
import useTreeStore from './hooks/useTreeStore';
import useTreeStyles from './hooks/useTreeStyles';
import useTreeState from './hooks/useTreeState';
import useTreeAction from './hooks/useTreeAction';
import useTreeScroll from './hooks/useTreeScroll';
import useTreeNodes from './hooks/useTreeNodes';
import useDragHandle from './hooks/useDragHandle';
import { renderTNodeJSX } from '../utils/render-tnode';
import { getNode } from './util';

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
    const refProps = toRefs(props);

    // 用于 hooks 传递数据
    const { state, treeContentRef, isScrolling } = useTreeState(props);

    const { store, rebuild, updateStoreConfig, checkFilterExpand } = useTreeStore(props, context, state);

    useDragHandle(props, context, state);
    const { setActived, setExpanded, setChecked } = useTreeAction(props, context, state);
    const { onInnerVirtualScroll, virtualConfig } = useTreeScroll(props, context, state);
    const { renderTreeNodes, nodesEmpty } = useTreeNodes(props, context, state);
    const { treeClasses, treeContentStyles, scrollStyles, cursorStyles } = useTreeStyles(props, state);

    watch(refProps.data, (list) => {
      rebuild(list);
    });
    watch(refProps.keys, (keys) => {
      store.setConfig({
        keys,
      });
    });
    watch(refProps.filter, (nVal, previousVal) => {
      checkFilterExpand(nVal, previousVal);
    });

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
      scrollToElement: virtualConfig.scrollToElement,
    };
  },
  // 在 methods 提供公共方法
  // 实例上可以直接访问
  methods: {
    setItem(value: TreeNodeValue, options: TreeNodeState): void {
      const node: TreeNode = this.store.getNode(value);
      const spec = options;
      const keys = Object.keys(spec);
      if (node && spec) {
        ['expanded', 'actived', 'checked'].forEach((name) => {
          if (keys.includes(name)) {
            const val = spec[name];
            delete spec[name];
            const methodName = `set${upperFirst(name)}`;
            const setupMethod = this[methodName];
            if (isFunction(setupMethod)) {
              setupMethod(node, val);
            }
          }
        });
        node.set(spec);
      }
    },
    getItem(value: TreeNodeValue): TypeTreeNodeModel {
      const node: TreeNode = this.store.getNode(value);
      return node?.getModel();
    },
    getItems(value?: TreeNodeValue): TypeTreeNodeModel[] {
      const nodes = this.store.getNodes(value);
      return nodes.map((node: TreeNode) => node.getModel());
    },
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
    remove(value?: TreeNodeValue) {
      return this.store.remove(value);
    },
    getIndex(value: TreeNodeValue): number {
      return this.store.getNodeIndex(value);
    },
    getParent(value: TreeNodeValue): TypeTreeNodeModel {
      const node = this.store.getParent(value);
      return node?.getModel();
    },
    getParents(value: TreeNodeValue): TypeTreeNodeModel[] {
      const nodes = this.store.getParents(value);
      return nodes.map((node: TreeNode) => node.getModel());
    },
    getPath(value: TreeNodeValue): TypeTreeNodeModel[] {
      const node = this.store.getNode(value);
      let pathNodes: TypeTreeNodeModel[] = [];
      if (node) {
        pathNodes = node.getPath().map((node: TreeNode) => node.getModel());
      }
      return pathNodes;
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

    updateStoreConfig();

    const { scope } = state;
    // 更新 scopedSlots
    scope.scopedSlots = this.$slots;

    const treeNodeViews = renderTreeNodes(h);
    const cname = this.componentName;
    const isVirtual = virtualConfig.isVirtualScroll.value;

    // 空数据判定
    let emptyNode: TypeTNodeReturnValue = null;
    if (nodesEmpty) {
      const useLocale = !this.empty && !this.$slots.empty;
      const emptyContent = useLocale ? this.t(this.global.empty) : renderTNodeJSX(this, 'empty');
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
      // 关闭动画时，列表不使用 transition-group 以启用更高的性能
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

    const treeNode = (
      <div
        class={treeClasses}
        ref="treeContentRef"
        on={{ scroll: this.onInnerVirtualScroll }}
        style={treeContentStyles}
      >
        {isVirtual && <div class={`${cname}__vscroll-cursor`} style={cursorStyles} />}
        {emptyNode || treeNodeList}
      </div>
    );

    return treeNode;
  },
});
