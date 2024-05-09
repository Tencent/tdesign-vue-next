import { ref, ComputedRef, Ref } from 'vue';

import type { TransferItemOption } from '../interface';
import type { TransferValue } from '../type';
export default function useDragSort(
  currentValue: Ref<Array<TransferValue>>,
  curPageData: ComputedRef<TransferItemOption[]>,
  handleDataChange: (data: Array<TransferValue>, movedValue: Array<TransferValue>) => void,
) {
  const draggingIndex = ref(null);
  const dragoverIndex = ref(null);
  const dragoverPos = ref(null);

  const onDragStart = (e: DragEvent) => {
    const index = Number((e.target as HTMLElement).dataset.index);
    draggingIndex.value = index;
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.currentTarget) {
      const currentElement = e.currentTarget as HTMLElement;
      const index = Number(currentElement.dataset.index);
      const elemHeight = currentElement.offsetHeight;
      const dragY = e.clientY - currentElement.getBoundingClientRect().top;
      const insertAreaPercent = 0.3;
      const insertAreaHeight = elemHeight * insertAreaPercent;

      dragoverIndex.value = index;

      if (dragoverIndex.value === draggingIndex.value) {
        dragoverPos.value = '';
        return;
      }
      if (dragY < insertAreaHeight) {
        dragoverPos.value = 'top';
      } else if (dragY > elemHeight - insertAreaHeight) {
        dragoverPos.value = 'bottom';
      } else {
        dragoverPos.value = 'center';
      }
    }
  };

  const onDragLeave = () => {
    dragoverPos.value = '';
    dragoverIndex.value = null;
  };

  const onDragEnd = () => {
    draggingIndex.value = null;
    dragoverIndex.value = null;
    dragoverPos.value = '';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const currentDraggingIndex = draggingIndex.value;
    const currentDragoverIndex = dragoverIndex.value;

    draggingIndex.value = null;
    dragoverIndex.value = null;
    dragoverPos.value = '';
    if (currentDraggingIndex === currentDragoverIndex) {
      return;
    }

    const newData = [...currentValue.value];

    const sourceItem = curPageData.value[currentDraggingIndex].value;
    const targetItem = curPageData.value[currentDragoverIndex].value;
    const sourceIndex = newData.indexOf(sourceItem);
    let targetIndex = newData.indexOf(targetItem);

    newData.splice(sourceIndex, 1);

    if (currentDraggingIndex < currentDragoverIndex) {
      targetIndex -= 1;
    }

    if (dragoverPos.value === 'bottom') {
      targetIndex += 1;
    }
    newData.splice(targetIndex, 0, sourceItem);
    handleDataChange?.(newData, [sourceItem, targetItem]);
  };

  return {
    onDragStart,
    onDragEnd,
    onDrop,
    onDragOver,
    onDragLeave,
  };
}
