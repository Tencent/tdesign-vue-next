import Vue, { VNode } from 'vue';
import { TreeModel } from './model';
import TreeNode from './TreeNode';
import { TreeProps, TreeItem } from './interface';
import { treeName, classes } from './constants';

function parseData(this: any) {
  const list = this.data;
  const {
    expandAll,
  } = this;
  if (list && list.length > 0) {
    this.model = new TreeModel({
      keys: this.keys,
    });
    this.model.parse(list, null, {
      expand: !!expandAll,
    });
  }
}

export default Vue.extend({
  name: treeName,
  props: {
    ...TreeProps,
  },
  data() {
    return {
      model: null,
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
    // 获取模型节点中所有需要渲染的节点
    visibleItems(): Array<TreeItem> {
      // console.time('visibleItems');
      const items = this.items.filter((item: TreeItem) => {
        let visible = true;
        const parents = this.model.getParents(item.id);
        visible = parents.every((item: TreeItem) => item.expand);
        return visible;
      });
      // console.timeEnd('visibleItems');
      return items;
    },
    classList(): Array<string> {
      const list: Array<string> = [classes.tree];
      const { disabled, hover } = this;
      if (disabled) {
        list.push(classes.disabled);
      }
      if (hover) {
        list.push(classes.hoverable);
      }
      return list;
    },
  },
  methods: {
    renderItems(): Array<VNode> {
      // console.time('render items');
      const {
        empty,
      } = this;
      const vnodes = this.visibleItems.map((item) => {
        const parents = this.model.getParents(item.id);
        const level = parents.length;
        return (
          <TreeNode
            item={item}
            level={level}
            empty={empty}
          />
        );
      });
      // console.timeEnd('render items');
      return vnodes;
    },
  },
  created() {
    // console.time('tree render');
    parseData.call(this);
  },
  mounted() {
    // console.timeEnd('tree render');
  },
  render(): VNode {
    const {
      classList,
    } = this;

    let treeItems: Array<VNode> = [];
    treeItems = this.renderItems();

    return (
      <div class={classList}>
        <div class={classes.treeList}>{treeItems}</div>
      </div>
    );
  },
});
