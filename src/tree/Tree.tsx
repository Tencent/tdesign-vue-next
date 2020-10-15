import Vue, { VNode } from 'vue';
import { TreeProps } from './interface';
import { TreeItem, TreeModel } from './model';
import TreeNode from './TreeNode';
import { treeName, classes } from './constants';

function parseData(this: any) {
  const list = this.data;
  if (list && list.length > 0) {
    this.model = new TreeModel({
      keys: this.keys,
    });
    this.model.parse(list, null, {
      expand: true,
    });
  }
}

export default Vue.extend({
  name: treeName,
  components: {

  },
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
      const items = this.items.filter((item: TreeItem) => {
        let visible = true;
        const parents = this.model.getParents(item.id);
        visible = parents.every((item: TreeItem) => item.expand);
        return visible;
      });
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
      const vnodes = this.visibleItems.map((item) => {
        const parents = this.model.getParents(item.id);
        const level = parents.length;
        return (
          <TreeNode
            item={item}
            level={level}
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
