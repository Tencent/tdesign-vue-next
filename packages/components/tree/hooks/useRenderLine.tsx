import { usePrefixClass, TypeCreateElement, TreeNode, TypeVNode } from '../adapt';
import { TypeTreeItemState } from '../tree-types';
import { getTNode } from '../util';

// 渲染节点连线
export default function useRenderLine(state: TypeTreeItemState) {
  const componentName = usePrefixClass('tree').value;

  const renderLine = (h: TypeCreateElement): TypeVNode => {
    const { node, treeScope } = state;
    const { scopedSlots } = treeScope;
    const treeProps = treeScope?.treeProps || {};
    const { line } = treeProps;
    const iconVisible = !!treeProps.icon;

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
        lineClasses.push(`${componentName}__line`);

        // 叶子节点，折线宽度延长，因为没有 icon 呈现
        // 任意节点，icon 不呈现时也是要延长折线宽度
        if (vmIsLeaf || !iconVisible) {
          lineClasses.push(`${componentName}__line--leaf`);
        }

        // 分支首节点，到上一节点的折线高度要缩短，让位给 icon 呈现
        // 如果 icon 隐藏了，则不必缩短折线高度
        if (vmIsFirst && iconVisible) {
          lineClasses.push(`${componentName}__line--first`);
        }

        // 如果节点的父节点，不是最后的节点
        // 则需要绘制节点延长线
        const shadowStyles: string[] = [];
        const parents = node.getParents();
        parents.pop();
        parents.forEach((pnode: TreeNode, index: number) => {
          if (!pnode.vmIsLast) {
            shadowStyles.push(`calc(-${index + 1} * var(--space)) 0 var(--color)`);
          }
        });

        const styles = {
          '--level': level ? String(level) : undefined,
          'box-shadow': shadowStyles.join(','),
        };

        lineNode = <span class={lineClasses} style={styles}></span>;
      }
    } else {
      lineNode = getTNode(line, {
        createElement: h,
        node,
      });
    }
    return lineNode as TypeVNode;
  };

  return {
    renderLine,
  };
}
