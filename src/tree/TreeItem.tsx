import Vue, { VNode, CreateElement } from 'vue';
import TIconArrowRight from '../icon/arrow-right';
import TIconLoading from '../icon/loading';
import TCheckBox from '../checkbox';
import Icon from '../icon/iconfont';

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
        [CLASS_NAMES.actived]: node.actived,
        [CLASS_NAMES.treeNodeHidden]: !node.visible,
        [CLASS_NAMES.disabled]: node.disabled,
      });
      return list;
    },
  },
  methods: {
    renderLine(createElement: CreateElement): VNode {
      const {
        node,
        line,
        icon,
      } = this;

      let hasIcon = false;
      if (icon === true) {
        if (node.children) {
          hasIcon = true;
        }
      } else {
        const iconNode = getTNode(icon, {
          createElement,
          node,
        });
        if (iconNode) {
          hasIcon = true;
        }
      }

      let lineNode = null;
      if (line === true) {
        const lineNodes: VNode[] = [];
        const parents = node.getParents();
        const nodes = [node].concat(parents);
        nodes.forEach((item, index) => {
          // 标记 [上，右，下，左] 是否有连线
          const lineModel = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          };

          const itemChildren = item.children || [];
          const childItem = nodes[index - 1] || null;
          const childItemIndex = childItem ? childItem.getIndex() : 0;

          if (index === 0) {
            if (item.children) {
              if (item.expanded) {
                lineModel.bottom = 1;
              }
              if (item.parent) {
                lineModel.left = 1;
              }
            } else {
              if (item.parent) {
                lineModel.left = 1;
                lineModel.right = 1;
              }
            }
          } else if (index === 1) {
            lineModel.top = 1;
            lineModel.right = 1;
            if (childItemIndex < itemChildren.length - 1) {
              lineModel.bottom = 1;
            }
          } else {
            if (childItemIndex < itemChildren.length - 1) {
              lineModel.top = 1;
              lineModel.bottom = 1;
            }
          }

          const lineClassList = [];
          lineClassList.push({
            [CLASS_NAMES.lineIcon]: hasIcon && index === 0,
            [CLASS_NAMES.lineTop]: lineModel.top,
            [CLASS_NAMES.lineRight]: lineModel.right,
            [CLASS_NAMES.lineBottom]: lineModel.bottom,
            [CLASS_NAMES.lineLeft]: lineModel.left,
          });

          const lineItemNode = (
            <dd
              class={lineClassList}
            ></dd>
          );
          lineNodes.unshift(lineItemNode);
        });

        if (lineNodes.length > 0) {
          lineNode = (
            <dl
              class={CLASS_NAMES.lines}
            >{lineNodes}</dl>
          );
        }
      } else {
        lineNode = getTNode(line, {
          createElement,
          node,
        });
        if (typeof lineNode === 'string') {
          lineNode = null;
        }
      }
      return lineNode;
    },
    renderIcon(createElement: CreateElement): VNode {
      const {
        node,
        icon,
      } = this;
      let iconNode = null;
      if (icon === true) {
        if (node.children) {
          iconNode = (
            <span
              class={CLASS_NAMES.treeIcon}
            ><TIconArrowRight role="icon"/></span>);
        } else {
          iconNode = (<span class={CLASS_NAMES.treeIcon}></span>);
        }
      } else {
        iconNode = getTNode(icon, {
          createElement,
          node,
        });
        if (typeof iconNode === 'string') {
          iconNode = (
            <span
              class={CLASS_NAMES.treeIcon}
            ><Icon name={iconNode}></Icon></span>
          );
        } else {
          iconNode = (
            <span
              class={CLASS_NAMES.treeIcon}
            >{iconNode}</span>
          );
        }
      }
      if (node.children && node.loading && node.expanded && icon !== false) {
        iconNode = (
          <span
            class={CLASS_NAMES.treeIcon}
          ><TIconLoading role="icon"/></span>
        );
      }
      return iconNode;
    },
    renderLabel(createElement: CreateElement): VNode {
      const {
        node,
        empty,
        label,
      } = this;

      const emptyNode = getTNode(empty, {
        createElement,
        node,
      });

      let labelNode = null;
      if (label === true) {
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
      } else {
        labelNode = getTNode(label, {
          createElement,
          node,
        });
        labelNode = (
          <span
            class={CLASS_NAMES.label}
            role="label"
          >{labelNode || emptyNode}</span>
        );
      }

      return labelNode;
    },
    renderItem(createElement: CreateElement): Array<VNode> {
      const itemNodes: Array<VNode> = [];

      const lineNode = this.renderLine(createElement);
      if (lineNode) {
        itemNodes.push(lineNode);
      }

      const iconNode = this.renderIcon(createElement);
      if (iconNode) {
        itemNodes.push(iconNode);
      }

      const labelNode = this.renderLabel(createElement);
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
