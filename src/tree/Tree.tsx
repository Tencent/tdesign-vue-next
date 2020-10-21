import Vue, { VNode } from 'vue';
import { TreeModel } from './model';
import TreeNode from './TreeNode';
import { TreeProps, TreeItem } from './interface';
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
    // 获取所有模型节点
    items(): Array<TreeItem> {
      let items = [];
      if (this.model) {
        items = this.model.getItems();
      }
      return items;
    },
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
      model.update();

      // 移除不能呈现的节点
      let index = 0;
      while (index < treeNodes.length) {
        const node = treeNodes[index];
        const nodeItem = node.componentInstance.item;
        if (!nodeItem.visible) {
          treeNodes.splice(index, 1);
        } else {
          map[nodeItem.id] = true;
          index += 1;
        }
      }

      // 插入需要呈现的节点
      index = 0;
      model.items.forEach((item: TreeItem) => {
        if (item.visible) {
          const node = treeNodes[index];
          let nodeItem = null;
          let shouldInsert = false;
          if (node) {
            nodeItem = node.componentInstance.item;
            if (nodeItem.id !== item.id) {
              shouldInsert = true;
            }
          } else {
            shouldInsert = true;
          }
          if (shouldInsert) {
            const insertNode = (
              <TreeNode
                key={item.id}
                item={item}
                empty={empty}
                onClick={this.handleClick}
              />
            );
            if (!map[item.id]) {
              map[item.id] = true;
              treeNodes.splice(index, 0, insertNode);
            }
          }
          index += 1;
        }
      });
      // console.timeEnd('tree updateNodes');
    },
    parseData() {
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
        model.parse(list);
        model.items.forEach((item) => {
          const parents = this.model.getParents(item.id);
          const level = parents.length;
          const options: any = {};
          if (level < expandLevel) {
            options.expand = true;
          }
          if (expandAll) {
            options.expand = true;
          }
          options.expandMutex = expandMutex;
          model.setItem(item.id, options);
        });
      }
      this.updateNodes();
    },
    handleClick(info: any) {
      const evt = info.event;
      const id = info.id || '';
      const item = this.model.getItem(id);
      const state = {
        event: evt,
        item,
      };
      this.$emit('click', state);
      if (!this.disabled && this.expandTrigger) {
        this.model.toggle(id);
        this.updateNodes();
      }
    },
  },
  created() {
    // console.time('tree render');
    this.parseData();
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
