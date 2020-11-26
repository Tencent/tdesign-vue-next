import Vue, { VNode } from 'vue';
import {
  TreeStore,
  TreeFilterOptions,
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
    value(nVal) {
      this.store.replaceChecked(nVal);
    },
    expanded(nVal) {
      this.store.replaceExpanded(nVal);
    },
    actived(nVal) {
      this.store.replaceActived(nVal);
    },
    filter(nVal) {
      const {
        store,
      } = this;
      store.filter = nVal;
      store.updateAll();
    },
  },
  methods: {
    refresh() {
      // console.time('tree refresh');
      const {
        empty,
        icon,
        label,
        line,
        operations,
        store,
        treeNodes,
        updatedMap,
        $scopedSlots: scopedSlots,
      } = this;

      const map = {};
      store.scopedSlots = scopedSlots;

      // 移除不能呈现的节点
      let index = 0;
      while (index < treeNodes.length) {
        const node = treeNodes[index];
        const nodeItem = node.componentInstance.node;
        if (!nodeItem.visible) {
          treeNodes.splice(index, 1);
        } else {
          map[nodeItem.value] = true;
          index += 1;
        }
      }

      // 插入需要呈现的节点
      index = 0;
      const nodes = store.getNodes();
      nodes.forEach((node: TreeNode) => {
        if (node.visible) {
          const nodeView = treeNodes[index];
          let nodeItem = null;
          let shouldInsert = false;
          if (nodeView) {
            nodeItem = nodeView.componentInstance.node;
            if (nodeItem.value !== node.value) {
              shouldInsert = true;
            }
            if (updatedMap && updatedMap.get(node.value)) {
              // 只强制更新必要节点
              // 插入和移除的节点会影响父节点的图标状态与选中状态
              nodeView.componentInstance.$forceUpdate();
            }
          } else {
            shouldInsert = true;
          }
          if (shouldInsert) {
            const insertNode = (
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
            if (!map[node.value]) {
              map[node.value] = true;
              treeNodes.splice(index, 0, insertNode);
            }
          }
          index += 1;
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
    getItem(item: string | TreeNode): TreeNode {
      return this.store.getNode(item);
    },
    getItems(item?: string | TreeNode, options?: TreeFilterOptions): TreeNode[] {
      return this.store.getNodes(item, options);
    },
    getActived(item?: string | TreeNode): TreeNode[] {
      return this.store.getActivedNodes(item);
    },
    getChecked(item?: string | TreeNode): TreeNode[] {
      return this.store.getCheckedNodes(item);
    },
    getParent(value: string | TreeNode): TreeNode {
      return this.store.getParent(value);
    },
    append(para?: any, item?: any): void {
      return this.store.appendNodes(para, item);
    },
    remove(para?: string | TreeNode): void {
      return this.store.remove(para);
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
