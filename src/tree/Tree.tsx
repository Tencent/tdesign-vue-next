import Vue, { VNode } from 'vue';
import { TreeModel } from './treeModel';
import { TreeNode } from './treeNode';
import TreeNodeView from './TreeNodeView';
import { TreeProps } from './interface';
import {
  treeName,
  classes,
  fx,
} from './constants';

export default Vue.extend({
  name: treeName,
  props: {
    ...TreeProps,
  },
  data() {
    return {
      model: null,
      treeNodes: [],
    };
  },
  computed: {
    classList(): Array<string> {
      const list: Array<string> = [classes.tree];
      const {
        disabled,
        hover,
        transition,
      } = this;
      if (disabled) {
        list.push(classes.disabled);
      }
      if (hover) {
        list.push(classes.hoverable);
      }
      if (transition) {
        list.push(classes.treeFx);
      }
      return list;
    },
  },
  methods: {
    updateNodes() {
      // console.time('tree updateNodes');
      const {
        empty,
        model,
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
      const nodes = model.getNodes();
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
              <TreeNodeView
                key={node.value}
                node={node}
                empty={empty}
                onClick={this.handleClick}
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
        expandAll,
        expandLevel,
        expandMutex,
      } = this;
      if (list && list.length > 0) {
        const model = new TreeModel({
          keys: this.keys,
          expandMutex,
        });
        this.model = model;
        model.append(list);
        model.getNodes().forEach((node) => {
          const {
            level,
          } = node;
          const options: any = {};
          if (level < expandLevel) {
            options.expanded = true;
          }
          if (expandAll) {
            options.expanded = true;
          }
          options.expandMutex = expandMutex;
          node.set(options);
          node.update();
        });
      }
      this.updateNodes();
    },
    handleClick(info: any) {
      const evt = info.event;
      const value = info.value || '';
      const node = this.model.getNode(value);
      const state = {
        event: evt,
        item: node,
      };
      this.$emit('click', state);
      if (!this.disabled) {
        node.toggle();
        this.updateNodes();
      }
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
        <div class={classes.treeList}>
          <transition-group name={fx.treeNode} tag="div">
            {treeNodes}
          </transition-group>
        </div>
      </div>
    );
  },
});
