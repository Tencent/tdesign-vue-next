import { TreeNode } from '../adapt';
import { TreeProps, TypDragEventState, TypeTreeState, TypeDragHandle } from '../tree-types';
import { DragPosition } from './useDraggable';
import { emitEvent } from '../util';

export default function useDragHandle(state: TypeTreeState) {
  const { props, context, scope, store } = state;
  let dragNode: TreeNode = null;

  const handleDragStart = (state: TypDragEventState) => {
    const { dragEvent, node } = state;
    dragNode = node;

    const ctx = {
      node: node.getModel(),
      e: dragEvent,
    };
    emitEvent<Parameters<TreeProps['onDragStart']>>(props, context, 'drag-start', ctx);
  };

  const handleDragEnd = (state: TypDragEventState) => {
    const { dragEvent, node } = state;
    dragNode = node;

    const ctx = {
      node: node.getModel(),
      e: dragEvent,
    };
    emitEvent<Parameters<TreeProps['onDragEnd']>>(props, context, 'drag-end', ctx);
  };

  const handleDragOver = (state: TypDragEventState) => {
    const { dragEvent, node } = state;
    const ctx = {
      node: node.getModel(),
      e: dragEvent,
    };
    emitEvent<Parameters<TreeProps['onDragOver']>>(props, context, 'drag-over', ctx);
  };

  const handleDragLeave = (state: TypDragEventState) => {
    const { dragEvent, node } = state;
    const ctx = {
      node: node.getModel(),
      e: dragEvent,
    };
    emitEvent<Parameters<TreeProps['onDragLeave']>>(props, context, 'drag-leave', ctx);
  };

  const handleDrop = (state: TypDragEventState) => {
    const { dragEvent, node, dropPosition } = state;
    if (node.value === dragNode.value || node.getParents().some((_node) => _node.value === dragNode.value)) return;

    const ctx = {
      dropNode: node.getModel(),
      dragNode: dragNode.getModel(),
      dropPosition,
      e: dragEvent,
    };

    if (props.allowDrop?.(ctx) === false) return;

    const nodes = store.getNodes() as TreeNode[];
    nodes.some((_node) => {
      if (_node.value === node.value) {
        if (dropPosition === DragPosition.Inside) {
          dragNode.appendTo(store, _node);
        } else if (dropPosition === DragPosition.Before) {
          node.insertBefore(dragNode);
        } else {
          node.insertAfter(dragNode);
        }
        return true;
      }
      return false;
    });

    emitEvent<Parameters<TreeProps['onDrop']>>(props, context, 'drop', ctx);
  };

  const drag: TypeDragHandle = {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };

  scope.drag = drag;

  return {
    drag,
  };
}
