import { throttle } from 'lodash-es';
import { reactive } from '../adapt';
import type { TypeTreeItemState } from '../tree-types';

export interface TypeDragStates {
  isDragOver: boolean;
  isDragging: boolean;
  dropPosition: number;
}

type TypeDrag = 'dragStart' | 'dragOver' | 'dragLeave' | 'dragEnd' | 'drop';

export default function useDraggable(state: TypeTreeItemState) {
  const { treeItemRef } = state;
  const dragStates = reactive({
    isDragOver: false,
    isDragging: false,
    dropPosition: 0,
  });

  const updateDropPosition = (dragEvent: DragEvent) => {
    const rootNode = treeItemRef.value;
    if (!rootNode) {
      return;
    }

    const rect = rootNode?.getBoundingClientRect?.();
    const offsetY = window.scrollY + rect.top;
    const { pageY } = dragEvent;
    const gapHeight = rect.height / 4;
    const diff = pageY - offsetY;

    if (diff < gapHeight) {
      dragStates.dropPosition = -1;
    } else if (diff < rect.height - gapHeight) {
      dragStates.dropPosition = 0;
    } else {
      dragStates.dropPosition = 1;
    }
  };

  const setDragStatus = (status: TypeDrag, dragEvent: DragEvent) => {
    const { node, treeScope } = state;
    const { drag } = treeScope;
    if (!drag) {
      return;
    }

    switch (status) {
      case 'dragStart':
        dragStates.isDragging = true;
        dragStates.dropPosition = 0;
        drag.handleDragStart?.({ node, dragEvent });
        break;
      case 'dragEnd':
        dragStates.isDragging = false;
        dragStates.isDragOver = false;
        dragStates.dropPosition = 0;
        throttleUpdateDropPosition.cancel();
        drag.handleDragEnd?.({ node, dragEvent });
        break;
      case 'dragOver':
        dragStates.isDragOver = true;
        throttleUpdateDropPosition(dragEvent);
        drag.handleDragOver?.({ node, dragEvent });
        break;
      case 'dragLeave':
        dragStates.isDragOver = false;
        dragStates.dropPosition = 0;
        throttleUpdateDropPosition.cancel();
        drag.handleDragLeave?.({ node, dragEvent });
        break;
      case 'drop':
        drag.handleDrop?.({ node, dropPosition: dragStates.dropPosition, dragEvent });
        dragStates.isDragOver = false;
        throttleUpdateDropPosition.cancel();
        break;
      default:
        break;
    }
  };

  const handleDragStart = (evt: DragEvent) => {
    const { node } = state;
    if (!node.isDraggable()) {
      return;
    }
    evt.stopPropagation();
    setDragStatus('dragStart', evt);

    try {
      // ie throw error firefox-need-it
      evt.dataTransfer?.setData('text/plain', '');
    } catch (e) {
      // empty
    }
  };

  const handleDragEnd = (evt: DragEvent) => {
    const { node } = state;
    if (!node.isDraggable()) {
      return;
    }
    evt.stopPropagation();
    setDragStatus('dragEnd', evt);
  };

  const handleDragOver = (evt: DragEvent) => {
    const { node } = state;
    if (!node.isDraggable()) {
      return;
    }
    evt.stopPropagation();
    evt.preventDefault();
    setDragStatus('dragOver', evt);
  };

  const handleDragLeave = (evt: DragEvent) => {
    const { node } = state;
    if (!node.isDraggable()) {
      return;
    }
    evt.stopPropagation();
    setDragStatus('dragLeave', evt);
  };

  const handleDrop = (evt: DragEvent) => {
    const { node } = state;
    if (!node.isDraggable()) {
      return;
    }
    evt.stopPropagation();
    evt.preventDefault();
    setDragStatus('drop', evt);
  };

  const throttleUpdateDropPosition = throttle((dragEvent: DragEvent) => {
    updateDropPosition(dragEvent);
  });

  return {
    dragStates,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
