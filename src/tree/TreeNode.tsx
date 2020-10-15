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
    level: {
      type: Number,
      default: 0,
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
      level,
    } = this;
    return (
      <div
        class={`${prefix}-tree__item`}
        data-id={item.id}
        data-level={level}
      >{this.renderItem()}</div>
    );
  },
});
