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
  mergeKeysToArray,
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
        expandAll,
        expandLevel,
        expandMutex,
        disabled,
        load,
        lazy,
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
          onReflow: () => {
            this.updateNodes();
          },
          onUpdate: () => {
            this.updateValue();
          },
        });
        this.store = store;
        store.append(list);

        this.initChecked();
      }
    },
    initChecked(): void {
      const {
        value,
        store,
      } = this;
      if (Array.isArray(value)) {
        value.forEach((val: string) => {
          const node = store.getNode(val);
          if (node) {
            node.setChecked(true);
          }
        });
      }
    },
    updateValue(): void {
      const {
        store,
        value,
      } = this;
      if (Array.isArray(value)) {
        mergeKeysToArray(store.checkedMap, value);
      }
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
      if (role && role.name) {
        clickOnRole = true;
        if (role.name === 'icon') {
          clickOnIcon = true;
        }
      }
      if (this.expandOnClickNode) {
        if (clickOnIcon) {
          node.toggleExpand();
        }
        if (!clickOnRole) {
          node.toggleActive();
          node.toggleExpand();
        }
      } else {
        if (clickOnIcon) {
          node.toggleExpand();
        } else if (!clickOnRole) {
          node.toggleActive();
        }
      }
      this.$emit('click', state);
      this.updateNodes();
    },
    handleChange(state: any) {
      const {
        node,
      } = state;
      if (!node || this.disabled || node.disabled) {
        return;
      }
      node.toggleChecked();
      this.$emit('change', state);
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
