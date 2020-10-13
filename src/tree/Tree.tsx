import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { TreeProps } from './interface';
import { TreeModel } from './model';
import TreeItem from './TreeItem';

const cname = `${prefix}-tree`;

function parseData(this: any) {
  const list = this.data;
  if (list && list.length > 0) {
    this.model = new TreeModel(list, {
      keys: this.keys,
    });
  }
}

export default Vue.extend({
  name: cname,
  components: {

  },
  props: {
    ...TreeProps,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    classList(): Array<string> {
      const list: Array<string> = [cname];
      const { disabled, hover } = this;
      if (disabled) {
        list.push(`${prefix}-is-disabled`);
      }
      if (hover) {
        list.push(`${cname}--hoverable`);
      }
      return list;
    },
  },
  methods: {
    renderItems(): Array<VNode> {
      return this.items.map(item => (<TreeItem item={item} />));
    },
  },
  created() {
    parseData.call(this);
  },
  render(): VNode {
    const {
      classList,
    } = this;

    let treeItems: Array<VNode> = [];
    treeItems = this.renderItems();

    return (
      <div class={classList}>
        <ul class={`${cname}__list`}>{treeItems}</ul>
      </div>
    );
  },
});
