import { ref, toRefs, inject } from 'vue';
import { throttle } from 'lodash-es';
import { TreeNode } from '../../_common/js/tree/tree-node';
import { DropPosition } from '../interface';
import { dragInjectKey } from '../constants';

export default function useDraggable(props: { nodeRef: HTMLElement | undefined; node: TreeNode }) {
  const { nodeRef, node } = toRefs(props);
  const onDrag = inject(dragInjectKey);

  const isDragOver = ref(false);
  const isDragging = ref(false);
  const dropPosition = ref<DropPosition>(0);

  const updateDropPosition = throttle((e: DragEvent) => {
    if (typeof window === 'undefined') return;
    if (!nodeRef.value) return;

    const rect = nodeRef.value.getBoundingClientRect();
    const offsetY = window.pageYOffset + rect.top;
    const { pageY } = e;
    const gapHeight = rect.height / 4;
    const diff = pageY - offsetY;

    // 其实三元可行
    if (diff < gapHeight) {
      dropPosition.value = -1;
    } else if (diff < rect.height - gapHeight) {
      dropPosition.value = 0;
    } else {
      dropPosition.value = 1;
    }
  });

  const setDragStatus = (status: 'dragStart' | 'dragOver' | 'dragLeave' | 'dragEnd' | 'drop', e: DragEvent) => {
    switch (status) {
      case 'dragStart':
        isDragging.value = true;
        dropPosition.value = 0;
        onDrag.onDragStart?.({ node: node.value, e });
        e.dataTransfer.effectAllowed = 'move';
        break;
      case 'dragEnd':
        isDragging.value = false;
        isDragOver.value = false;
        dropPosition.value = 0;
        updateDropPosition.cancel();
        onDrag.onDragEnd?.({ node: node.value, e });
        break;
      case 'dragOver':
        isDragOver.value = true;
        updateDropPosition(e);
        onDrag.onDragOver?.({ node: node.value, e });
        break;
      case 'dragLeave':
        isDragOver.value = false;
        dropPosition.value = 0;
        updateDropPosition.cancel();
        onDrag.onDragLeave?.({ node: node.value, e });
        break;
      case 'drop':
        onDrag.onDrop?.({ node: node.value, dropPosition: dropPosition.value, e });
        isDragOver.value = false;
        updateDropPosition.cancel();
        break;
      default:
        break;
    }
  };

  return {
    isDragOver,
    isDragging,
    dropPosition,
    setDragStatus,
  };
}
