import Vue, { VNode } from 'vue';
import TIconArrowRight from '../icon/arrow-right';
import { TreeNodeProps } from './interface';
import { getParentNodes } from './util';
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
      const { level } = this.item;
      const styles = `--level: ${level};`;
      return styles;
    },
    classList(): Array<string> {
      const {
        item,
      } = this;
      const arr = [];
      arr.push(classes.treeNode);
      if (item.expand) {
        arr.push(classes.treeNodeOpen);
      }
      if (!item.visible) {
        arr.push(classes.treeNodeHidden);
      }
      return arr;
    },
  },
  methods: {
    renderItem(): Array<VNode> {
      const {
        item,
        empty,
      } = this;
      const itemNodes: Array<VNode> = [];

      let icon = null;
      if (item.children) {
        icon = (<TIconArrowRight role="icon" class="t-tree__icon"/>);
      }
      if (icon) {
        itemNodes.push(icon);
      }

      let label = null;
      if (item.label) {
        label = (
          <span
            class={classes.label}
          >{item.label}</span>
        );
      } else {
        if (typeof empty === 'string') {
          label = (
            <span
              class={classes.label}
              role="label"
            >{empty}</span>
          );
        } else if (empty) {
          label = empty as VNode;
        }
      }
      if (label) {
        itemNodes.push(label);
      }

      return itemNodes;
    },
    handleClick(evt: Event) {
      const parents = getParentNodes(
        evt.target as HTMLElement,
        evt.currentTarget as HTMLElement
      );
      const { id } = this.item;
      this.$emit('click', {
        event: evt,
        id,
        parents,
      });
    },
  },
  render() {
    const {
      item,
      styles,
      classList,
    } = this;
    const {
      level,
    } = item;
    return (
      <div
        class={classList}
        data-id={item.id}
        data-level={level}
        style={styles}
        onClick={(evt: Event) => this.handleClick(evt)}
      >{this.renderItem()}</div>
    );
  },
});
