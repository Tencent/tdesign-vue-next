import { computed, h, defineComponent, ref, PropType, inject, reactive } from 'vue';
import isFunction from 'lodash/isFunction';
import isBoolean from 'lodash/isBoolean';
import { CaretRightSmallIcon as TdCaretRightSmallIcon } from 'tdesign-icons-vue-next';

import TCheckBox from '../checkbox';
import TLoading from '../loading';

import { getTNode } from './util';
import { useCLASSNAMES, injectKey } from './constants';
import TreeNode from '../_common/js/tree/tree-node';

import useRipple from '../hooks/useRipple';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import useDraggable from './hooks/useDraggable';

import type { TypeEventState, TreeNodeModel } from './interface';

export default defineComponent({
  name: 'TTreeNode',
  props: {
    node: {
      type: Object as PropType<TreeNode>,
    },
    onClick: Function as PropType<(e: TypeEventState) => void>,
    onChange: Function as PropType<(e: TypeEventState) => void>,
    onDrop: Function as PropType<(node: TreeNode, val: number, e: DragEvent) => void>,
    onDragStart: Function as PropType<(node: TreeNode, e: DragEvent) => void>,
    expandOnClickNode: Boolean,
  },
  setup(props) {
    const treeScope = inject(injectKey);
    const isClicked = ref(false);
    const label = ref<HTMLElement>();
    useRipple(label);

    const CLASS_NAMES = useCLASSNAMES();

    const { globalConfig } = useConfig('tree');
    const classPrefix = usePrefixClass();
    const { CaretRightSmallIcon } = useGlobalIcon({ CaretRightSmallIcon: TdCaretRightSmallIcon });

    const handleClick = (evt: MouseEvent) => {
      const { node, expandOnClickNode } = props;
      const state: TypeEventState = {
        mouseEvent: evt,
        event: evt,
        node,
        path: node.getPath(),
      };

      const srcTarget = evt.target as HTMLElement;
      const isBranchTrigger =
        node.children &&
        props.expandOnClickNode &&
        (srcTarget.className === `${classPrefix.value}-checkbox__input` || srcTarget.tagName.toLowerCase() === 'input');
      // checkbox 上也有 click 事件, 避免重复的 click 事件触发
      if (isClicked.value || isBranchTrigger) return;

      // 处理expandOnClickNode时与checkbox的选中的逻辑冲突
      if (
        expandOnClickNode &&
        node.children &&
        srcTarget.className?.indexOf?.(`${classPrefix.value}-tree__label`) !== -1
      )
        evt.preventDefault();

      isClicked.value = true;
      setTimeout(() => {
        isClicked.value = false;
      });

      props.onClick?.(state);
    };
    const nodeRef = ref<HTMLElement>();
    const { isDragOver, isDragging, dropPosition, setDragStatus } = useDraggable(
      reactive({ nodeRef, node: props.node }) as { nodeRef: HTMLElement; node: TreeNode },
    );

    const handleDragStart = (evt: DragEvent) => {
      const { node } = props;
      if (!node.isDraggable()) return;
      evt.stopPropagation();
      setDragStatus('dragStart', evt);
      evt.dataTransfer.effectAllowed = 'move';

      try {
        // ie throw error firefox-need-it
        evt.dataTransfer?.setData('text/plain', '');
      } catch (e) {
        // empty
      }
      props.onDragStart?.(node, evt);
    };

    const handleDragEnd = (evt: DragEvent) => {
      const { node } = props;
      if (!node.isDraggable()) return;
      evt.stopPropagation();
      setDragStatus('dragEnd', evt);
    };

    const handleDragOver = (evt: DragEvent) => {
      const { node } = props;
      if (!node.isDraggable()) return;
      evt.stopPropagation();
      evt.preventDefault();
      setDragStatus('dragOver', evt);
    };

    const handleDragLeave = (evt: DragEvent) => {
      const { node } = props;
      if (!node.isDraggable()) return;
      evt.stopPropagation();
      setDragStatus('dragLeave', evt);
    };

    const handleDrop = (evt: DragEvent) => {
      const { node } = props;
      if (!node.isDraggable()) return;
      evt.stopPropagation();
      evt.preventDefault();
      setDragStatus('drop', evt);
      props.onDrop?.(node, dropPosition.value, evt);
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
      const { node } = props;
      const list = [];
      list.push(CLASS_NAMES.value.treeNode);
      list.push({
        [CLASS_NAMES.value.treeNodeOpen]: node.expanded,
        [CLASS_NAMES.value.actived]: node.isActivable() ? node.actived : false,
        [CLASS_NAMES.value.disabled]: node.isDisabled(),
      });
      // 拖拽相关 class
      list.push({
        [CLASS_NAMES.value.treeNodeDraggable]: node.isDraggable(),
        [CLASS_NAMES.value.treeNodeDragging]: isDragging.value,
        [CLASS_NAMES.value.treeNodeDragTipTop]: isDragOver.value && dropPosition.value < 0,
        [CLASS_NAMES.value.treeNodeDragTipBottom]: isDragOver.value && dropPosition.value > 0,
        [CLASS_NAMES.value.treeNodeDragTipHighlight]: !isDragging.value && isDragOver.value && dropPosition.value === 0,
      });
      return list;
    });

    const renderLine = () => {
      const { node } = props;
      const { line, scopedSlots } = treeScope.value;
      const iconVisible = !!treeScope.value.icon;

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
        if (isFunction(globalConfig.value.folderIcon)) {
          return globalConfig.value.folderIcon(h);
        }
        return <CaretRightSmallIcon />;
      };

      const { node } = props;
      const { icon, scopedSlots } = treeScope.value;
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
      const { node } = props;
      const { label, scopedSlots, disableCheck } = treeScope.value;
      const checkProps = treeScope.value.checkProps || {};

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
        if (isFunction(disableCheck)) {
          checkboxDisabled = disableCheck(node as TreeNodeModel & TreeNode);
        } else {
          checkboxDisabled = !!disableCheck || node.data?.checkable === false;
        }
        if (node.isDisabled()) {
          checkboxDisabled = true;
        }
        const itemCheckProps = {
          ...checkProps,
          disabled: checkboxDisabled,
        };

        // 当开启expandOnClickNode且为非叶子节点时 点击label不选中选项
        const shouldStopLabelTrigger = computed(() => {
          const isNormalBranchNode = Array.isArray(node.children) && node.children?.length > 0;
          const isLazyLoadChildBranchNode = isBoolean(node.children) && node.children; // 懒加载子节点场景

          const isBranchNode = isNormalBranchNode || isLazyLoadChildBranchNode;

          return props.expandOnClickNode && isBranchNode;
        });

        labelNode = (
          <TCheckBox
            class={labelClasses}
            checked={node.checked}
            indeterminate={node.indeterminate}
            disabled={node.isDisabled()}
            name={node.value.toString()}
            onChange={() => handleChange()}
            ignore="expand"
            stopLabelTrigger={shouldStopLabelTrigger.value}
            needRipple={true}
            {...itemCheckProps}
          >
            {labelNode}
          </TCheckBox>
        );
      } else {
        const inner = <span style="position: relative">{labelNode}</span>;
        labelNode = node.isActivable() ? ( // 使用key是为了避免元素复用，从而顺利移除ripple指令
          <span key="1" ref="label" class={labelClasses} title={node.label}>
            {inner}
          </span>
        ) : (
          <span key="2" class={labelClasses} title={node.label}>
            {inner}
          </span>
        );
      }

      return labelNode;
    };

    const renderOperations = () => {
      const { node } = props;
      const { operations, scopedSlots } = treeScope.value;

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
          ref={nodeRef}
          class={itemClassList.value}
          data-value={node.value}
          data-level={node.level}
          style={itemStyles.value}
          onClick={(evt: MouseEvent) => handleClick(evt)}
          draggable={node.isDraggable()}
          onDragstart={(evt: DragEvent) => handleDragStart(evt)}
          onDragend={(evt: DragEvent) => handleDragEnd(evt)}
          onDragover={(evt: DragEvent) => handleDragOver(evt)}
          onDragleave={(evt: DragEvent) => handleDragLeave(evt)}
          onDrop={(evt: DragEvent) => handleDrop(evt)}
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
