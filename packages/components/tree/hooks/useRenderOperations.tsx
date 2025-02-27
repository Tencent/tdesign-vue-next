import { usePrefixClass, TypeCreateElement, TypeVNode } from '../utils/adapt';
import { TypeTreeItemState } from '../types';
import { getTNode } from '../utils';

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
        // TODO: 这里最好修改一下，改成 data-ignore 之类的
        // @ts-ignore
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
