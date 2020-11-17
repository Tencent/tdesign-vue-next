import Vue, { VNode, CreateElement } from 'vue';
import TIconArrowRight from '../icon/arrow-right';
import TIconLoading from '../icon/loading';
import TCheckBox from '../checkbox';
import {
  TreeNodeProps,
  EventState,
} from './interface';
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
        [CLASS_NAMES.treeNodeActive]: node.actived,
        [CLASS_NAMES.treeNodeHidden]: !node.visible,
        [CLASS_NAMES.disabled]: node.disabled,
      });
      return list;
    },
  },
  methods: {
    renderItem(createElement: CreateElement): Array<VNode> {
      const {
        node,
        empty,
      } = this;
      const itemNodes: Array<VNode> = [];

      let icon = null;
      if (node.children) {
        if (node.loading && node.expanded) {
          icon = (<span class={CLASS_NAMES.treeIcon}><TIconLoading role="icon"/></span>);
        } else {
          icon = (<span class={CLASS_NAMES.treeIcon}><TIconArrowRight role="icon"/></span>);
        }
      } else {
        icon = (<span class={CLASS_NAMES.treeIcon}></span>);
      }
      if (icon) {
        itemNodes.push(icon);
      }

      const emptyNode = getTNode(empty, {
        createElement,
        node,
      });

      let labelNode = null;
      if (node.checkable) {
        labelNode = (
          <TCheckBox
            class={CLASS_NAMES.label}
            checked={node.checked}
            indeterminate={node.indeterminate}
            disabled={node.disabled}
            name={node.value}
            role="label"
            onChange={() => this.handleChange()}
          >{node.label || emptyNode}</TCheckBox>
        );
      } else {
        labelNode = (
          <span
            class={CLASS_NAMES.label}
            role="label"
          >{node.label || emptyNode}</span>
        );
      }
      if (labelNode) {
        itemNodes.push(labelNode);
      }

      return itemNodes;
    },
    handleClick(evt: Event) {
      const { node } = this;
      const state: EventState = {
        name: 'click',
        event: evt,
        node,
      };
      this.$emit('click', state);
    },
    handleChange() {
      const { node } = this;
      const state: EventState = {
        name: 'click',
        node,
      };
      this.$emit('change', state);
    },
  },
  render(createElement: CreateElement) {
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
      >{this.renderItem(createElement)}</div>
    );
  },
});
