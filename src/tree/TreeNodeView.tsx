import Vue, { VNode } from 'vue';
import TIconArrowRight from '../icon/arrow-right';
import { TreeNodeProps } from './interface';
import {
  getTNode,
} from './util';
import {
  TREE_NODE_NAME,
  CLASS_NAMES,
} from './constants';

export default Vue.extend({
  name: TREE_NODE_NAME,
  props: TreeNodeProps,
  data() {
    return {

    };
  },
  computed: {
    styles(): string {
      const { level } = this.node;
      const styles = `--level: ${level};`;
      return styles;
    },
    classList(): Array<any> {
      const {
        node,
      } = this;
      const list = [];
      list.push(CLASS_NAMES.treeNode);
      list.push({
        [CLASS_NAMES.treeNodeOpen]: node.expanded,
        [CLASS_NAMES.treeNodeActive]: node.active,
        [CLASS_NAMES.treeNodeHidden]: !node.visible,
      });
      return list;
    },
  },
  methods: {
    renderItem(): Array<VNode> {
      const {
        node,
        empty,
      } = this;
      const itemNodes: Array<VNode> = [];

      let icon = null;
      if (node.children) {
        icon = (<TIconArrowRight role="icon" class="t-tree__icon"/>);
      }
      if (icon) {
        itemNodes.push(icon);
      }

      let label = null;
      if (node.label) {
        label = (
          <span
            class={CLASS_NAMES.label}
            role="label"
          >{node.label}</span>
        );
      } else {
        const emptyNode = getTNode(empty, node);
        if (typeof emptyNode === 'string') {
          label = (
            <span
              class={CLASS_NAMES.label}
              role="label"
            >{emptyNode}</span>
          );
        } else if (empty) {
          label = emptyNode;
        }
      }
      if (label) {
        itemNodes.push(label);
      }

      return itemNodes;
    },
    handleClick(evt: Event) {
      const { value } = this.node;
      this.$emit('click', {
        event: evt,
        value,
      });
    },
  },
  render() {
    const {
      node,
      styles,
      classList,
    } = this;
    const {
      level,
    } = node;
    return (
      <div
        class={classList}
        data-value={node.value}
        data-level={level}
        style={styles}
        onClick={(evt: Event) => this.handleClick(evt)}
      >{this.renderItem()}</div>
    );
  },
});
