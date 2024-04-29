import { ref, reactive } from 'vue';

import { DragSortProps, DragSortInnerProps } from '../interface';

export default function useDragSorter<T>(props: DragSortProps<T>): DragSortInnerProps {
  const { sortOnDraggable, onDragSort, onDragOverCheck } = props;
  const draggingIndex = ref(-1);
  const dragStartData = ref(null);
  const isDropped = ref(null);
  const startInfo = reactive({ nodeX: 0, nodeWidth: 0, mouseX: 0 });

  const onDragOver = (e: DragEvent, index: number, record: T) => {
    e.preventDefault();
    if (draggingIndex.value === index || draggingIndex.value === -1) return;
    const target = e.target as HTMLElement;
    if (onDragOverCheck?.targetClassNameRegExp && !onDragOverCheck?.targetClassNameRegExp.test(target.className)) {
      return;
    }

    if (onDragOverCheck?.x && target) {
      if (!startInfo.nodeWidth) return;

      const { x, width } = target.getBoundingClientRect();
      const targetNodeMiddleX = x + width / 2;
      const draggingNodeLeft = e.clientX - (startInfo.mouseX - startInfo.nodeX);
      const draggingNodeRight = draggingNodeLeft + startInfo.nodeWidth;

      let overlap = false;
      if (draggingNodeLeft > x && draggingNodeLeft < x + width) {
        overlap = draggingNodeLeft < targetNodeMiddleX;
      } else {
        overlap = draggingNodeRight > targetNodeMiddleX;
      }

      if (!overlap) return;
    }

    onDragSort?.({
      currentIndex: draggingIndex.value,
      current: dragStartData,
      target: record,
      targetIndex: index,
    });

    draggingIndex.value = index;
  };

  if (!sortOnDraggable) {
    return {};
  }

  function onDragStart(e: DragEvent, index: number, record: T) {
    draggingIndex.value = index;
    dragStartData.value = record;
    const target = e.target as HTMLElement;
    if (onDragOverCheck && target) {
      const { x, width } = target.getBoundingClientRect();
      startInfo.nodeX = x;
      startInfo.nodeWidth = width;
      startInfo.mouseX = e.clientX;
    }
  }

  function onDrop() {
    isDropped.value = true;
  }

  function onDragEnd() {
    if (!isDropped.value) {
      // 取消排序，待扩展 api，输出 dragStartData
    }
    isDropped.value = false;
    draggingIndex.value = -1;
    dragStartData.value = null;
  }

  function getDragProps(index: number, record: T) {
    if (sortOnDraggable) {
      return {
        draggable: true,
        onDragstart: (e: DragEvent) => {
          onDragStart(e, index, record);
        },
        onDragover: (e: DragEvent) => {
          onDragOver(e, index, record);
        },
        onDrop: () => {
          onDrop();
        },
        onDragend: () => {
          onDragEnd();
        },
      };
    }
    return {};
  }

  return { onDragStart, onDragOver, onDrop, onDragEnd, getDragProps, dragging: draggingIndex.value !== -1 };
}
