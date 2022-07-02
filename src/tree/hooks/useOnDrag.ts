import { ref, Ref, provide, getCurrentInstance } from 'vue';
import TreeStore from '../../_common/js/tree/tree-store';
import TreeNode from '../../_common/js/tree/tree-node';
import { dragInjectKey } from '../constants';

export default function useOnDrag(treeStore: Ref<TreeStore>) {
  const dragNode = ref<TreeNode>();
  const { emit } = getCurrentInstance();

  const onDragStart = (context: { node: TreeNode; e: DragEvent }) => {
    dragNode.value = context.node;
    emit?.('dragStart', context);
  };

  const onDragEnd = (context: { node: TreeNode; e: DragEvent }) => {
    dragNode.value = context.node;
    emit?.('dragEnd', context);
  };

  const onDragOver = (context: { node: TreeNode; e: DragEvent }) => {
    emit?.('dragOver', context);
  };

  const onDragLeave = (context: { node: TreeNode; e: DragEvent }) => {
    emit?.('dragLeave', context);
  };

  const onDrop = (context: { node: TreeNode; dropPosition: number; e: DragEvent }) => {
    const { node, dropPosition } = context;
    if (node.value === dragNode.value.value || node.getParents().some((_node) => _node.value === dragNode.value.value))
      return;

    const nodes = treeStore.value.getNodes() as TreeNode[];
    nodes.some((_node, _index) => {
      if (_node.value === node.value) {
        if (dropPosition === 0) {
          dragNode.value.appendTo(treeStore.value, _node);
        } else if (dropPosition < 0) {
          node.insertBefore(dragNode.value);
        } else {
          node.insertAfter(dragNode.value);
        }
        return true;
      }
      return false;
    });
    emit?.('drop', context);
  };
  provide(dragInjectKey, {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop,
  });
}
