import { isBoolean } from 'lodash-es';
import { usePrefixClass, TypeCreateElement, computed, TCheckBox, TypeVNode } from '../utils/adapt';
import { TypeTreeItemState } from '../types';
import { getTNode } from '../utils';
import useItemEvents from './useItemEvents';

// 渲染节点文本与内容
export default function useRenderLabel(state: TypeTreeItemState) {
  const classPrefix = usePrefixClass().value;
  const componentName = usePrefixClass('tree').value;

  const { handleChange } = useItemEvents(state);

  const renderLabel = (h: TypeCreateElement): TypeVNode => {
    const { node, treeScope } = state;
    const { scopedSlots, treeProps = {} } = treeScope;
    const { label, expandOnClickNode } = treeProps;
    const checkProps = treeProps?.checkProps || {};

    let labelNode = null;
    if (label === true) {
      if (scopedSlots?.label) {
        labelNode = scopedSlots.label({
          node: node?.getModel(),
        });
      } else {
        labelNode = node.label || '';
      }
    } else {
      labelNode = getTNode(label, {
        createElement: h,
        node,
      });
    }

    const labelClasses = [
      `${componentName}__label`,
      {
        [`${classPrefix}-is-active`]: node.isActivable() ? node.actived : false,
      },
    ];

    const shouldStopLabelTrigger = computed(() => {
      const isNormalBranchNode = Array.isArray(node.children) && node.children?.length > 0;
      // 延迟加载子节点场景
      const isLazyLoadChildBranchNode = isBoolean(node.children) && node.children;
      const isBranchNode = isNormalBranchNode || isLazyLoadChildBranchNode;
      return expandOnClickNode && isBranchNode;
    });

    if (node.vmCheckable) {
      let checkboxDisabled = false;
      if (node.vmIsLocked && !node.vmIsRest) {
        checkboxDisabled = true;
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
          disabled={checkboxDisabled}
          name={String(node.value)}
          onChange={handleChange}
          stopLabelTrigger={shouldStopLabelTrigger.value}
          ignore={treeProps.expandOnClickNode ? 'active' : 'expand,active'}
          props={itemCheckProps}
        >
          {labelNode}
        </TCheckBox>
      );
    } else {
      const inner = <span style="position: relative">{labelNode}</span>;
      // 使用key是为了避免元素复用，从而顺利移除ripple指令
      labelNode = node.isActivable() ? (
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

  return {
    renderLabel,
  };
}
