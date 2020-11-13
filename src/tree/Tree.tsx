import Vue, { VNode } from 'vue';
import { TreeStore } from './TreeStore';
import { TreeNode } from './TreeNode';
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
        list.push(CLASS_NAMES.hoverable);
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
      this.updateNodes();
    },
    actived(nVal) {
      this.store.replaceActived(nVal);
    },
  },
  methods: {
    updateNodes() {
      // console.time('tree updateNodes');
      const {
        empty,
        store,
        treeNodes,
      } = this;

      const map = {};

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
          } else {
            shouldInsert = true;
          }
          if (shouldInsert) {
            const insertNode = (
              <TreeItem
                key={node.value}
                node={node}
                empty={empty}
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
      // console.timeEnd('tree updateNodes');
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
        actived,
        disabled,
        load,
        lazy,
        value,
        valueMode,
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
          onReflow: () => {
            this.updateNodes();
          },
        });
        this.store = store;
        store.append(list);
        if (Array.isArray(value)) {
          store.setChecked(value);
        }
        if (Array.isArray(expanded)) {
          store.setExpanded(expanded);
        }
        if (Array.isArray(actived)) {
          store.setActived(actived);
        }
        // 树的数据初始化之后，需要立即进行一次视图刷新
        this.updateNodes();
      }
    },
    toggleActived(node: TreeNode): string[] {
      return this.setActived(node, !node.isActived());
    },
    setActived(node: TreeNode, isActived: boolean) {
      const actived = node.setActived(isActived);
      this.$emit('active', actived);
      return actived;
    },
    toggleExpanded(node: TreeNode): string[] {
      return this.setExpanded(node, !node.isExpanded());
    },
    setExpanded(node: TreeNode, isExpanded: boolean): string[] {
      const expanded = node.setExpanded(isExpanded);
      this.$emit('expand', expanded);
      return expanded;
    },
    toggleChecked(node: TreeNode): string[] {
      return this.setChecked(node, !node.isChecked());
    },
    setChecked(node: TreeNode, isChecked: boolean): string[] {
      const checked = node.setChecked(isChecked);
      this.$emit('change', checked);
      return checked;
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
        } else if (clickOnLabel) {
          this.toggleActived(node);
        }
      } else {
        if (clickOnIcon) {
          this.toggleExpanded(node);
        } else if (clickOnLabel) {
          this.toggleActived(node);
        } else if (!clickOnRole) {
          this.toggleActived(node);
        }
      }
      this.$emit('click', state);
      this.updateNodes();
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
  },
  created() {
    // console.time('tree render');
    this.build();
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
