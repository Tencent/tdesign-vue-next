import Vue, { VNode, CreateElement } from 'vue';
import TIconChevronRight from '../icon/chevron-right';
import TIconLoading from '../icon/loading';
import SvgIcon from '../icon/svg';
import TCheckBox from '../checkbox';

import {
  TreeItemProps,
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
  props: TreeItemProps,
  data() {
    return {
      depth: 1,
      delay: '0ms',
    };
  },
  methods: {
    getStyles(): string {
      const { level } = this.node;
      const styles = `--level: ${level};`;
      return styles;
    },
    getClassList(): ClassName {
      const {
        node,
      } = this;
      const list = [];
      list.push(CLASS_NAMES.treeNode);
      list.push({
        [CLASS_NAMES.treeNodeOpen]: node.expanded,
        [CLASS_NAMES.actived]: node.isActivable() ? node.actived : false,
        [CLASS_NAMES.disabled]: node.isDisabled(),
      });
      return list;
    },
    getScopedSlots() {
      const {
        node,
      } = this;
      let slots = null;
      if (node.tree) {
        slots = node.tree.scopedSlots;
      }
      return slots;
    },
    renderLine(createElement: CreateElement): VNode {
      const {
        node,
        line,
      } = this;
      const scopedSlots = this.getScopedSlots();

      let lineNode = null;
      if (line === true) {
        if (scopedSlots?.line) {
          lineNode = scopedSlots.line({
            node,
          });
        } else {
          if (node.parent && node.tree) {
            const { tree } = node;
            const lineClasses = [];
            lineClasses.push(CLASS_NAMES.line);
            if (node.vmIsLeaf) {
              lineClasses.push(CLASS_NAMES.lineIsLeaf);
            }
            const unitDuration = this.duration || 300;
            const opacityDuration = unitDuration / 2;
            const curIndex = tree.getVisibleIndex(node);
            const parentIndex = tree.getVisibleIndex(node.parent);
            const depth = curIndex - parentIndex;
            const deltaDepth = depth - this.depth;
            this.depth = depth;
            if (deltaDepth < 0) {
              // 如果是收缩动画，要先等待渐隐动画完毕
              this.delay = `${opacityDuration}ms`;
            } else if (deltaDepth > 0) {
              // 如果是扩张动画，先等待半个个单位高度的动画时间
              const spaceTime = (0.5 / Math.abs(deltaDepth)) * opacityDuration;
              this.delay = `${spaceTime}ms`;
            }

            // 动画的瑕疵来自于 dom 插入回流导致的时间差
            // todo: 延迟这个样式的生效时间，到回流结束之后
            const styles = {
              '--depth': depth,
              'transition-delay': this.delay,
              'transition-duration': `${opacityDuration}ms`,
            };

            lineNode = (
              <span
                class={lineClasses}
                style={styles}
              ></span>
            );
          }
        }
      } else {
        lineNode = getTNode(line, {
          createElement,
          node,
        });
      }
      return lineNode;
    },
    renderIcon(createElement: CreateElement): VNode {
      const {
        node,
        icon,
      } = this;
      const scopedSlots = this.getScopedSlots();

      let iconNode = null;
      if (icon === true) {
        if (scopedSlots?.icon) {
          iconNode = scopedSlots.icon({
            node,
          });
        } else {
          if (!node.vmIsLeaf) {
            iconNode = (<TIconChevronRight/>);
          } else {
            iconNode = '';
          }
        }
      } else {
        iconNode = getTNode(icon, {
          createElement,
          node,
        });
        if (typeof iconNode === 'string') {
          iconNode = (<SvgIcon name={iconNode}></SvgIcon>);
        }
      }
      if (!node.vmIsLeaf && node.loading && node.expanded && icon !== false) {
        iconNode = (<TIconLoading/>);
      }
      iconNode = (
        <span
          class={CLASS_NAMES.treeIcon}
          role="icon"
        >{iconNode}</span>
      );
      return iconNode;
    },
    renderLabel(createElement: CreateElement): VNode {
      const {
        node,
        empty,
        label,
      } = this;
      const scopedSlots = this.getScopedSlots();

      const emptyNode = getTNode(empty, {
        createElement,
        node,
      });

      let labelNode = null;
      if (label === true) {
        if (scopedSlots?.label) {
          labelNode = scopedSlots.label({
            node,
          });
        } else {
          labelNode = node.label || emptyNode;
        }
      } else {
        labelNode = getTNode(label, {
          createElement,
          node,
        });
      }

      if (typeof labelNode === 'string') {
        // 如果渲染结果是字符串，就同步到节点上
        node.label = labelNode;
      }

      if (node.vmCheckable) {
        labelNode = (
          <TCheckBox
            class={CLASS_NAMES.treeLabel}
            checked={node.checked}
            indeterminate={node.indeterminate}
            disabled={node.isDisabled()}
            name={node.value}
            role="label"
            onChange={() => this.handleChange()}
            {...{ props: this.checkProps }}
          >{labelNode}</TCheckBox>
        );
      } else {
        labelNode = (
          <span
            class={CLASS_NAMES.treeLabel}
            role="label"
          >{labelNode}</span>
        );
      }

      return labelNode;
    },
    renderOperations(createElement: CreateElement): VNode {
      const {
        node,
        operations,
      } = this;
      const scopedSlots = this.getScopedSlots();

      let opNode = null;
      if (scopedSlots?.operations) {
        opNode = scopedSlots.operations({
          node,
        });
      } else {
        opNode = getTNode(operations, {
          createElement,
          node,
        });
      }
      if (opNode) {
        opNode = (
          <span
            class={CLASS_NAMES.treeOperations}
            role="oprations"
          >{opNode}</span>
        );
      }
      return opNode;
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

      const spaceNode = (<span class={CLASS_NAMES.treeSpace}></span>);
      itemNodes.push(spaceNode);

      const opNode = this.renderOperations(createElement);
      if (opNode) {
        itemNodes.push(opNode);
      }

      return itemNodes;
    },
    handleClick(evt: Event) {
      const { node } = this;
      const state: EventState = {
        event: evt,
        node,
      };
      this.$emit('click', state);
    },
    handleChange() {
      const { node } = this;
      const event = new Event('change');
      const state: EventState = {
        event,
        node,
      };
      this.$emit('change', state);
    },
  },
  render(createElement: CreateElement) {
    const {
      node,
    } = this;
    const {
      tree,
      level,
      value,
    } = node;

    if (!tree || !tree.nodeMap.get(value)) {
      this.$destroy();
    }
    const styles = this.getStyles();
    const classList = this.getClassList();
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
