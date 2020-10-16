import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import TIconArrowRight from '../icon/arrow-right';
import TIconArrowDown from '../icon/arrow-down';
import { TreeNodeProps } from './interface';
import { treeNodeName, classes } from './constants';

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
          icon = (<TIconArrowDown/>);
        } else {
          icon = (<TIconArrowRight/>);
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
      >{this.renderItem()}</div>
    );
  },
});
