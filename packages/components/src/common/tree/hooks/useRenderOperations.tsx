import { usePrefixClass, TypeCreateElement, TypeVNode } from '../adapt';
import { TypeTreeItemState } from '@td/intel/components/tree/tree-types';
import { getTNode } from '../util';

// 渲染节点操作区域
export default function useRenderOperations(state: TypeTreeItemState) {
  const componentName = usePrefixClass('tree').value;

  const renderOperations = (h: TypeCreateElement): TypeVNode => {
    const { node, treeScope } = state;
    const { scopedSlots } = treeScope;
    const treeProps = treeScope?.treeProps || {};
    const { operations } = treeProps;

    let opNode = null;
    if (scopedSlots?.operations) {
      opNode = scopedSlots.operations({
        node: node?.getModel(),
      });
    } else {
      opNode = getTNode(operations, {
        createElement: h,
        node,
      });
    }
    if (opNode) {
      opNode = (
        <span class={`${componentName}__operations`} ignore="active,expand">
          {opNode}
        </span>
      );
    }
    return opNode as TypeVNode;
  };

  return {
    renderOperations,
  };
}
