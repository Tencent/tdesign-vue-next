// 拖拽排序场景中：调整某个元素的顺序
export default function swapDragArrayElement(
  data: any[], currentIndex: number, targetIndex: number
) {
  const newData = [...data];
  if (targetIndex - currentIndex > 0) {
    newData.splice(targetIndex + 1, 0, newData[currentIndex]);
    newData.splice(currentIndex, 1);
  } else {
    newData.splice(targetIndex, 0, newData[currentIndex]);
    newData.splice(currentIndex + 1, 1);
  }
  return newData;
}
