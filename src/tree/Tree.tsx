import Vue, { VNode } from 'vue';
import {
  TreeStore,
  TreeFilterOptions,
  TreeNodeProps,
} from './TreeStore';
import TreeNode from './TreeNode';
import TreeItem from './TreeItem';
import {
  TreeProps,
  EventState,
} from './interface';
import {
  TREE_NAME,
  CLASS_NAMES,
  FX,
} from './constants';
import {
  getRole,
} from './util';


export default Vue.extend({
  name: TREE_NAME,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    ...TreeProps,
  },
  data() {
    return {
      store: null,
      updatedMap: null,
      nodesMap: null,
      treeNodes: [],
    };
  },
  computed: {
    classList(): Array<string> {
      const list: Array<string> = [CLASS_NAMES.tree];
      const {
        disabled,
        hover,
        transition,
      } = this;
      if (disabled) {
        list.push(CLASS_NAMES.disabled);
      }
      if (hover) {
        list.push(CLASS_NAMES.treeHoverable);
      }
      if (transition) {
        list.push(CLASS_NAMES.treeFx);
      }
      return list;
    },
  },
  watch: {
    data(list) {
      this.store.removeAll();
      this.store.append(list);
    },
    keys(nKeys) {
      this.store.setConfig({
        keys: nKeys,
      });
    },
    value(nVal) {
      this.store.replaceChecked(nVal);
    },
    expanded(nVal) {
      this.store.replaceExpanded(nVal);
    },
    expandAll(isExpandAll) {
      this.store.setConfig({
        expandAll: isExpandAll,
      });
    },
    expandLevel(nExpandLevel) {
      this.store.setConfig({
        expandLevel: nExpandLevel,
      });
    },
    expandMutex(nExpandMutex) {
      this.store.setConfig({
        expandMutex: nExpandMutex,
      });
    },
    expandParent(isExpandParent) {
      this.store.setConfig({
        expandParent: isExpandParent,
      });
    },
    activable(isActivable) {
      this.store.setConfig({
        activable: isActivable,
      });
    },
    activeMultiple(isActiveMultiple) {
      this.store.setConfig({
        activeMultiple: isActiveMultiple,
      });
    },
    actived(nVal) {
      this.store.replaceActived(nVal);
    },
    disabled(isDisabled) {
      this.store.setConfig({
        disabled: isDisabled,
      });
    },
    checkable(isCheckAble) {
      this.store.setConfig({
        checkable: isCheckAble,
      });
    },
    checkStrictly(isCheckStrictly) {
      this.store.setConfig({
        checkStrictly: isCheckStrictly,
      });
    },
    load(fn) {
      this.store.setConfig({
        load: fn,
      });
    },
    lazy(isLazy) {
      this.store.setConfig({
        lazy: isLazy,
      });
    },
    valueMode(nMode) {
      this.store.setConfig({
        valueMode: nMode,
      });
    },
    filter(fn) {
      this.filterItems(fn);
    },
  },
  methods: {
    // 创建单个 tree 节点
    renderItem(node: TreeNode) {
      const {
        empty,
        icon,
        label,
        line,
        operations,
      } = this;
      const treeItem = (
        <TreeItem
          key={node.value}
          node={node}
          empty={empty}
          icon={icon}
          label={label}
          line={line}
          operations={operations}
          onClick={this.handleClick}
          onChange={this.handleChange}
        />
      );
      return treeItem;
    },
    refresh() {
      // console.time('tree refresh');
      const {
        store,
        treeNodes,
        updatedMap,
        $scopedSlots: scopedSlots,
      } = this;

      let {
        nodesMap,
      } = this;

      store.scopedSlots = scopedSlots;

      if (!nodesMap) {
        nodesMap = new Map();
        this.nodesMap = nodesMap;
      }

      let index = 0;
      while (index < treeNodes.length) {
        const nodeView = treeNodes[index];
        const { node } = nodeView.componentInstance;
        if (!store.getNode(node)) {
          // 视图列表中的节点，在树中不存在
          const nodeViewIndex = treeNodes.indexOf(nodeView);
          treeNodes.splice(nodeViewIndex, 1);
          nodeView.componentInstance.$destroy();
          nodesMap.delete(node.value);
        } else {
          index += 1;
        }
      }

      index = 0;
      const allNodes = store.getNodes();
      allNodes.forEach((node: TreeNode) => {
        if (node.visible) {
          if (nodesMap.has(node.value)) {
            const nodeView = nodesMap.get(node.value);
            const nodeViewIndex = treeNodes.indexOf(nodeView);
            if (nodeViewIndex !== index) {
              // 节点存在，但位置与可视节点位置冲突，需要更新节点位置
              treeNodes.splice(nodeViewIndex, 1);
              treeNodes.splice(index, 0, nodeView);
            }
            if (updatedMap && updatedMap.get(node.value)) {
              // 只有可视节点需要更新，只强制更新必要节点
              // 插入和移除的节点会影响父节点的图标状态与选中状态
              nodeView.componentInstance.$forceUpdate();
            }
          } else {
            // 节点可视，且不存在视图，创建该节点视图并插入到当前位置
            const nodeView = this.renderItem(node);
            treeNodes.splice(index, 0, nodeView);
            nodesMap.set(node.value, nodeView);
          }
          index += 1;
        } else {
          if (nodesMap.has(node.value)) {
            // 节点不可视，存在该视图，需要删除该节点视图
            const nodeView = nodesMap.get(node.value);
            const nodeViewIndex = treeNodes.indexOf(nodeView);
            treeNodes.splice(nodeViewIndex, 1);
            nodesMap.delete(node.value);
            nodeView.componentInstance.$destroy();
          }
        }
      });
      // console.timeEnd('tree refresh');
    },
    build() {
      const list = this.data;
      const {
        activable,
        activeMultiple,
        checkable,
        checkStrictly,
        expanded,
        expandAll,
        expandLevel,
        expandMutex,
        expandParent,
        actived,
        disabled,
        load,
        lazy,
        value,
        valueMode,
        filter,
        $scopedSlots: scopedSlots,
      } = this;
      if (list && list.length > 0) {
        const store = new TreeStore({
          keys: this.keys,
          activable,
          activeMultiple,
          checkable,
          checkStrictly,
          expandAll,
          expandLevel,
          expandMutex,
          expandParent,
          disabled,
          load,
          lazy,
          valueMode,
          filter,
          scopedSlots,
          onLoad: (info: any) => {
            this.handleLoad(info);
          },
          onUpdate: (state: EventState) => {
            this.handleUpdate(state);
          },
        });
        this.store = store;
        store.append(list);
        if (Array.isArray(value)) {
          store.setChecked(value);
        }
        if (Array.isArray(expanded)) {
          const expandedMap = new Map();
          expanded.forEach((val) => {
            expandedMap.set(val, true);
            if (expandParent === 'auto') {
              const node = store.getNode(val);
              node.getParents().forEach((tn) => {
                expandedMap.set(tn.value, true);
              });
            }
          });
          const expandedArr = Array.from(expandedMap.keys());
          store.setExpanded(expandedArr);
        }
        if (Array.isArray(actived)) {
          store.setActived(actived);
        }
        // 树的数据初始化之后，需要立即进行一次视图刷新
        store.refreshNodes();
        this.refresh();
      }
    },
    toggleActived(node: TreeNode): string[] {
      return this.setActived(node, !node.isActived());
    },
    setActived(node: TreeNode, isActived: boolean) {
      const actived = node.setActived(isActived);
      const event = new Event('active');
      const state: EventState = {
        event,
        node,
      };
      this.$emit('active', actived, state);
      return actived;
    },
    toggleExpanded(node: TreeNode): string[] {
      return this.setExpanded(node, !node.isExpanded());
    },
    setExpanded(node: TreeNode, isExpanded: boolean): string[] {
      const expanded = node.setExpanded(isExpanded);
      const event = new Event('expand');
      const state: EventState = {
        event,
        node,
      };
      this.$emit('expand', expanded, state);
      return expanded;
    },
    toggleChecked(node: TreeNode): string[] {
      return this.setChecked(node, !node.isChecked());
    },
    setChecked(node: TreeNode, isChecked: boolean): string[] {
      const checked = node.setChecked(isChecked);
      const event = new Event('change');
      const state: EventState = {
        event,
        node,
      };
      this.$emit('change', checked, state);
      return checked;
    },
    handleLoad(info: any): void {
      const event = new Event('load');
      const {
        node,
        data,
      } = info;
      const state: EventState = {
        event,
        node,
        data,
      };
      this.$emit('load', state);
    },
    handleUpdate(info: EventState): void {
      const event = new Event('update');
      const {
        nodes,
        map,
      } = info;
      const state: EventState = {
        event,
        nodes,
      };
      this.$emit('update', state);
      this.updatedMap = map;
      this.refresh();
    },
    handleClick(state: EventState): void {
      const {
        event,
        node,
      } = state;
      if (!node || this.disabled || node.disabled) {
        return;
      }
      const role = getRole(
        event.target as HTMLElement,
        event.currentTarget as HTMLElement
      );
      let clickOnRole = false;
      let clickOnIcon = false;
      let clickOnLabel = false;
      if (role && role.name) {
        clickOnRole = true;
        if (role.name === 'icon') {
          clickOnIcon = true;
        }
        if (role.name === 'label') {
          clickOnLabel = true;
        }
      }
      if (this.expandOnClickNode) {
        if (clickOnIcon) {
          this.toggleExpanded(node);
        }
        if (!clickOnRole) {
          this.toggleActived(node);
          this.toggleExpanded(node);
        } else if (clickOnLabel && !node.checkable) {
          this.toggleActived(node);
        }
      } else {
        if (clickOnIcon) {
          this.toggleExpanded(node);
        } else if (clickOnLabel && !node.checkable) {
          this.toggleActived(node);
        } else if (!clickOnRole) {
          this.toggleActived(node);
        }
      }
      this.$emit('click', state);
    },
    handleChange(state: EventState): void {
      const {
        disabled,
      } = this;
      const {
        node,
      } = state;
      if (!node || disabled || node.disabled) {
        return;
      }
      this.toggleChecked(node);
    },
    filterItems(fn: Function): void {
      const {
        store,
      } = this;
      store.setConfig({
        filter: fn,
      });
      store.updateAll();
    },
    scrollTo(): void {
      // todo
    },
    setItem(value: string | TreeNode, options: TreeNodeProps): void {
      const node = this.getItem(value);
      const spec = options;
      if (node) {
        if (spec) {
          if ('expanded' in options) {
            this.setExpanded(node, spec.expanded);
            delete spec.expanded;
          }
          if ('actived' in options) {
            this.setActived(node, spec.actived);
            delete spec.actived;
          }
          if ('checked' in options) {
            this.setChecked(node, spec.checked);
            delete spec.checked;
          }
        }
        node.set(spec);
      }
    },
    getItem(value: string | TreeNode): TreeNode {
      return this.store.getNode(value);
    },
    getItems(value?: string | TreeNode, options?: TreeFilterOptions): TreeNode[] {
      return this.store.getNodes(value, options);
    },
    getActived(value?: string | TreeNode): TreeNode[] {
      return this.store.getActivedNodes(value);
    },
    getChecked(item?: string | TreeNode): TreeNode[] {
      return this.store.getCheckedNodes(item);
    },
    append(para?: any, item?: any): void {
      return this.store.appendNodes(para, item);
    },
    insertBefore(value: string | TreeNode, item: any): void {
      return this.store.insertBefore(value, item);
    },
    insertAfter(value: string | TreeNode, item: any): void {
      return this.store.insertAfter(value, item);
    },
    getParent(value: string | TreeNode): TreeNode {
      return this.store.getParent(value);
    },
    getParents(value: string | TreeNode): TreeNode {
      return this.store.getParents(value);
    },
    remove(value?: string | TreeNode): void {
      return this.store.remove(value);
    },
    getIndex(value: string | TreeNode): number {
      return this.store.getNodeIndex(value);
    },
  },
  created() {
    this.build();
    // console.time('tree render');
  },
  mounted() {
    // console.timeEnd('tree render');
  },
  render(): VNode {
    const {
      classList,
      treeNodes,
    } = this;

    return (
      <div class={classList}>
        <transition-group
          name={FX.treeNode}
          tag="div"
          class={CLASS_NAMES.treeList}
        >{treeNodes}</transition-group>
      </div>
    );
  },
});
