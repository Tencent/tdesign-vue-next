import Vue, { VNode } from 'vue';
import TIconArrowRight from '../icon/arrow-right';
import { TreeNodeProps } from './interface';
import {
  getParentElements,
  getTNode,
} from './util';
import {
  treeNodeName,
  classes,
} from './constants';

export default Vue.extend({
  name: treeNodeName,
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
    classList(): Array<string> {
      const {
        node,
      } = this;
      const arr = [];
      arr.push(classes.treeNode);
      if (node.expanded) {
        arr.push(classes.treeNodeOpen);
      }
      if (!node.visible) {
        arr.push(classes.treeNodeHidden);
      }
      return arr;
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
            class={classes.label}
          >{node.label}</span>
        );
      } else {
        const emptyNode = getTNode(empty, node);
        if (typeof emptyNode === 'string') {
          label = (
            <span
              class={classes.label}
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
      const parents = getParentElements(
        evt.target as HTMLElement,
        evt.currentTarget as HTMLElement
      );
      const { value } = this.node;
      this.$emit('click', {
        event: evt,
        value,
        parents,
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
