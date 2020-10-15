import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { treeNodeName, classes } from './constants';

export default Vue.extend({
  name: treeNodeName,
  props: {
    item: {
      type: Object,
      default(): object {
        return {};
      },
    },
  },
  data() {
    return {

    };
  },
  methods: {
    renderItem(): Array<VNode> {
      const {
        item,
      } = this;
      const itemNodes: Array<VNode> = [];
      const label = (<span class={classes.label}>{item.label}</span>);
      itemNodes.push(label);
      return itemNodes;
    },
  },
  render() {
    const {
      item,
    } = this;
    return <li class={`${prefix}-tree__item`} data-id={item.id}>{this.renderItem()}</li>;
  },
});
