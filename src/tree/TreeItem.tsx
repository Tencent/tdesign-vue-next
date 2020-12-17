import Vue, { VNode, CreateElement } from 'vue';
import TIconChevronRight from '../icon/chevron-right';
import TIconLoading from '../icon/loading';
import TCheckBox from '../checkbox';
import TreeNode from '../../common/js/tree/TreeNode';

import { getTNode } from './util';
import { TreeItemProps, EventState } from './interface';
import { TREE_NODE_NAME, CLASS_NAMES } from './constants';

export default Vue.extend({
  name: TREE_NODE_NAME,
  props: TreeItemProps,
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
    renderLine(createElement: CreateElement): VNode {
      const { node, treeScope } = this;
      const { line, scopedSlots } = treeScope;

      let lineNode = null;
      if (line === true) {
        if (scopedSlots?.line) {
          lineNode = scopedSlots.line({
            node,
          });
        } else if (node.parent && node.tree) {
          const {
            vmIsLeaf,
            vmIsFirst,
            level,
          } = node;
          const lineClasses = [];
          lineClasses.push(CLASS_NAMES.line);
          if (vmIsLeaf) {
            lineClasses.push(CLASS_NAMES.lineIsLeaf);
          }
          if (vmIsFirst) {
            lineClasses.push(CLASS_NAMES.lineIsFirst);
          }

          const shadowStyles: string[] = [];
          const parents = node.getParents();
          parents.pop();
          parents.forEach((pnode: TreeNode, index: number) => {
            if (!pnode.vmIsLast) {
              shadowStyles.push(`calc(-${index + 1} * var(--space)) 0 var(--color)`);
            }
          });

          const styles = {
            '--level': level,
            'box-shadow': shadowStyles.join(','),
          };

          lineNode = (
            <span
              class={lineClasses}
              style={styles}
            ></span>
          );
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
      const { node, treeScope } = this;
      const { icon, scopedSlots } = treeScope;

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
      const { node, treeScope } = this;
      const  { empty, label, scopedSlots } = treeScope;
      const checkProps = treeScope.checkProps || {};

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
            {...{ props: checkProps }}
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
      const { node, treeScope } = this;
      const { operations, scopedSlots } = treeScope;

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
        path: node.getPath(),
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
