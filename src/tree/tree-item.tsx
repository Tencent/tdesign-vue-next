import { computed, h, defineComponent, ref, PropType } from 'vue';
import isFunction from 'lodash/isFunction';
import { CaretRightSmallIcon } from 'tdesign-icons-vue-next';
import TCheckBox from '../checkbox';
import TLoading from '../loading';

import { getTNode } from './util';
import { TypeEventState } from './interface';
import { useCLASSNAMES } from './constants';
import TreeNode from '../_common/js/tree/tree-node';

import useRipple from '../hooks/useRipple';
import { useConfig } from '../hooks/useConfig';

export default defineComponent({
  name: 'TTreeNode',
  props: {
    nested: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    node: {
      type: Object as PropType<TreeNode>,
    },
    treeScope: {
      type: Object,
    },
    onClick: Function as PropType<(e: TypeEventState) => void>,
    onChange: Function as PropType<(e: TypeEventState) => void>,
  },
  setup(props) {
    const label = ref<HTMLElement>();
    useRipple(label);

    const CLASS_NAMES = useCLASSNAMES();

    const { global } = useConfig('tree');

    const handleClick = (evt: MouseEvent) => {
      const { node } = props;
      const state: TypeEventState = {
        mouseEvent: evt,
        event: evt,
        node,
        path: node.getPath(),
      };
      props.onClick?.(state);
    };

    const handleChange = () => {
      const { node } = props;
      const event = new Event('change');
      const state: TypeEventState = {
        event,
        node,
      };
      props.onChange?.(state);
    };

    const itemStyles = computed(() => {
      const { level } = props.node;
      const styles = `--level: ${level};`;
      return styles;
    });

    const itemClassList = computed(() => {
      const { node, nested } = props;
      const list = [];
      list.push(CLASS_NAMES.value.treeNode);
      list.push({
        [CLASS_NAMES.value.treeNodeOpen]: node.expanded,
        [CLASS_NAMES.value.actived]: node.isActivable() ? node.actived : false,
        [CLASS_NAMES.value.disabled]: node.isDisabled(),
      });
      if (nested) {
        if (node.visible) {
          list.push(CLASS_NAMES.value.treeNodeVisible);
        } else {
          list.push(CLASS_NAMES.value.treeNodeHidden);
        }
      }
      return list;
    });

    const renderLine = () => {
      const { node, treeScope } = props;
      const { line, scopedSlots } = treeScope;
      const iconVisible = !!treeScope.icon;

      let lineNode = null;
      if (line === true) {
        if (scopedSlots?.line) {
          lineNode = scopedSlots.line({
            node: node?.getModel(),
          });
        } else if (node.parent && node.tree) {
          const { vmIsLeaf, vmIsFirst, level } = node;

          const lineClasses = [];

          // 每个节点绘制抵达上一层级的折线
          lineClasses.push(CLASS_NAMES.value.line);

          // 叶子节点，折线宽度延长，因为没有 icon 呈现
          // 任意节点，icon 不呈现时也是要延长折线宽度
          if (vmIsLeaf || !iconVisible) {
            lineClasses.push(CLASS_NAMES.value.lineIsLeaf);
          }

          // 分支首节点，到上一节点的折线高度要缩短，让位给 icon 呈现
          // 如果 icon 隐藏了，则不必缩短折线高度
          if (vmIsFirst && iconVisible) {
            lineClasses.push(CLASS_NAMES.value.lineIsFirst);
          }

          // 如果节点的父节点，不是最后的节点
          // 则需要绘制节点延长线
          const shadowStyles: string[] = [];
          const parents = node.getParents();
          parents.pop();
          parents.forEach((pNode: TreeNode, index: number) => {
            if (!pNode.vmIsLast) {
              shadowStyles.push(`calc(-${index + 1} * var(--space)) 0 var(--color)`);
            }
          });

          const styles = {
            '--level': level,
            'box-shadow': shadowStyles.join(','),
          };

          lineNode = <span class={lineClasses} style={styles}></span>;
        }
      } else {
        lineNode = getTNode(line, {
          node,
        });
      }
      return lineNode;
    };

    const renderIcon = () => {
      const getFolderIcon = () => {
        if (isFunction(global.value.folderIcon)) {
          return global.value.folderIcon(h);
        }
        return <CaretRightSmallIcon />;
      };

      const { node, treeScope } = props;
      const { icon, scopedSlots } = treeScope;
      let isDefaultIcon = false;

      let iconNode = null;
      if (icon === true) {
        if (scopedSlots?.icon) {
          iconNode = scopedSlots.icon({
            node: node?.getModel(),
          });
        } else if (!node.vmIsLeaf) {
          isDefaultIcon = true;
          iconNode = getFolderIcon();
          if (node.loading && node.expanded) {
            iconNode = <TLoading />;
          }
        } else {
          iconNode = '';
        }
      } else {
        iconNode = getTNode(icon, {
          node,
        });
      }
      iconNode = (
        <span
          class={[
            CLASS_NAMES.value.treeIcon,
            CLASS_NAMES.value.folderIcon,
            isDefaultIcon ? CLASS_NAMES.value.treeIconDefault : '',
          ]}
          trigger="expand"
          ignore="active"
        >
          {iconNode}
        </span>
      );

      return iconNode;
    };

    const renderLabel = () => {
      const { node, treeScope } = props;
      const { label, scopedSlots, disableCheck } = treeScope;
      const checkProps = treeScope.checkProps || {};

      let labelNode = null;
      if (label === true) {
        if (scopedSlots.label) {
          labelNode = scopedSlots.label({
            node: node.getModel(),
          });
        } else {
          labelNode = node.label || '';
        }
      } else {
        labelNode = getTNode(label, {
          node,
        });
      }

      const labelClasses = [
        CLASS_NAMES.value.treeLabel,
        CLASS_NAMES.value.treeLabelStrictly,
        {
          [CLASS_NAMES.value.actived]: node.isActivable() ? node.actived : false,
        },
      ];

      if (node.vmCheckable) {
        let checkboxDisabled = false;
        if (typeof disableCheck === 'function') {
          checkboxDisabled = disableCheck(node);
        } else {
          checkboxDisabled = !!disableCheck;
        }
        if (node.isDisabled()) {
          checkboxDisabled = true;
        }
        const itemCheckProps = {
          ...checkProps,
          disabled: checkboxDisabled,
        };

        labelNode = (
          <TCheckBox
            class={labelClasses}
            checked={node.checked}
            indeterminate={node.indeterminate}
            disabled={node.isDisabled()}
            name={node.value}
            onChange={() => handleChange()}
            ignore="expand,active"
            needRipple={true}
            {...itemCheckProps}
          >
            {labelNode}
          </TCheckBox>
        );
      } else {
        const inner = <span style="position: relative">{labelNode}</span>;
        labelNode = node.isActivable() ? ( // 使用key是为了避免元素复用，从而顺利移除ripple指令
          <span key="1" ref="label" class={labelClasses}>
            {inner}
          </span>
        ) : (
          <span key="2" class={labelClasses}>
            {inner}
          </span>
        );
      }

      return labelNode;
    };

    const renderOperations = () => {
      const { node, treeScope } = props;
      const { operations, scopedSlots } = treeScope;

      let opNode = null;
      if (scopedSlots?.operations) {
        opNode = scopedSlots.operations({
          node: node?.getModel(),
        });
      } else {
        opNode = getTNode(operations, {
          node,
        });
      }
      if (opNode) {
        opNode = (
          <span class={CLASS_NAMES.value.treeOperations} ignore="active,expand">
            {opNode}
          </span>
        );
      }
      return opNode;
    };

    return () => {
      const { node } = props;

      return (
        <div
          class={itemClassList.value}
          data-value={node.value}
          data-level={node.level}
          style={itemStyles.value}
          onClick={(evt: MouseEvent) => handleClick(evt)}
        >
          {renderLine()}
          {renderIcon()}
          {renderLabel()}
          {renderOperations()}
        </div>
      );
    };
  },
});
