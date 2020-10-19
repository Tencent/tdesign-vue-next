import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import TIconArrowRight from '../icon/arrow-right';
import TIconArrowDown from '../icon/arrow-down';
import { TreeNodeProps } from './interface';
import { treeNodeName, classes } from './constants';
import { getParentNodes } from './util';

export default Vue.extend({
  name: treeNodeName,
  props: TreeNodeProps,
  data() {
    return {

    };
  },
  computed: {
    styles(): string {
      const { level } = this;
      const styles = `--level: ${level};`;
      return styles;
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
        if (item.expand) {
          icon = (<TIconArrowDown role="icon"/>);
        } else {
          icon = (<TIconArrowRight role="icon"/>);
        }
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
      level,
      styles,
    } = this;
    return (
      <div
        class={`${prefix}-tree__item`}
        data-id={item.id}
        data-level={level}
        style={styles}
        onClick={(evt: Event) => this.handleClick(evt)}
      >{this.renderItem()}</div>
    );
  },
});
