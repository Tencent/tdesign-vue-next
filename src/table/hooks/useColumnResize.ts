import { ref, Ref, reactive, CSSProperties } from 'vue';
import { BaseTableCol, TableRowData } from '../type';

const DEFAULT_MIN_WIDTH = 80;
const DEFAULT_MAX_WIDTH = 600;

export default function useColumnResize(tableContentRef: Ref<HTMLDivElement>, refreshTable: () => void) {
  const resizeLineRef = ref<HTMLDivElement>();

  const resizeLineParams = {
    isDragging: false,
    draggingCol: null as HTMLElement,
    draggingStart: 0,
  };

  const resizeLineStyle = reactive<CSSProperties>({
    display: 'none',
    left: '10px',
    height: '10px',
    bottom: '0',
  });

  // 表格列宽拖拽事件
  // 只在表头显示拖拽图标
  const onColumnMouseover = (e: MouseEvent, col: BaseTableCol<TableRowData>) => {
    if (!resizeLineRef.value) return;

    const target = (e.target as HTMLElement).closest('th');
    const targetBoundRect = target.getBoundingClientRect();
    if (!resizeLineParams.isDragging) {
      const minWidth = col.resize?.minWidth || DEFAULT_MIN_WIDTH;
      const maxWidth = col.resize?.maxWidth || DEFAULT_MAX_WIDTH;
      // 当离右边框的距离不超过 8 时，显示拖拽图标
      const distance = 8;
      if (
        targetBoundRect.width >= minWidth &&
        targetBoundRect.width <= maxWidth &&
        targetBoundRect.right - e.pageX <= distance
      ) {
        target.style.cursor = 'col-resize';
        resizeLineParams.draggingCol = target;
      } else {
        target.style.cursor = '';
        resizeLineParams.draggingCol = null;
      }
    }
  };

  // 调整表格列宽
  const onColumnMousedown = (e: MouseEvent, col: BaseTableCol<TableRowData>) => {
    // 非 resize 的点击，不做处理
    if (!resizeLineParams.draggingCol) return;

    const target = (e.target as HTMLElement).closest('th');
    const targetBoundRect = target.getBoundingClientRect();
    const tableBoundRect = tableContentRef.value?.getBoundingClientRect();
    const resizeLinePos = targetBoundRect.right - tableBoundRect.left;
    const colLeft = targetBoundRect.left - tableBoundRect.left;
    const minColLen = col.resize?.minWidth || DEFAULT_MIN_WIDTH;
    const maxColWidth = col.resize?.maxWidth || DEFAULT_MAX_WIDTH;
    const minResizeLineLeft = colLeft + minColLen;
    const maxResizeLineLeft = colLeft + maxColWidth;

    // 开始拖拽，记录下鼠标起始位置
    resizeLineParams.isDragging = true;
    resizeLineParams.draggingStart = e.x;

    // 初始化 resizeLine 标记线
    if (resizeLineRef?.value) {
      resizeLineStyle.display = 'block';
      resizeLineStyle.left = `${resizeLinePos}px`;
      resizeLineStyle.height = `${tableBoundRect.bottom - targetBoundRect.top}px`;
      const parent = tableContentRef.value.parentElement.getBoundingClientRect();
      resizeLineStyle.bottom = `${parent.bottom - tableBoundRect.bottom}px`;
    }

    // 拖拽时鼠标可能会超出 table 范围，需要给 document 绑定拖拽相关事件
    const onDragEnd = () => {
      if (resizeLineParams.isDragging) {
        // 结束拖拽，更新列宽
        const width = parseInt(resizeLineStyle.left, 10) - colLeft;

        // eslint-disable-next-line
        col.width = `${Math.floor(width)}px`;

        // 恢复设置
        resizeLineParams.isDragging = false;
        resizeLineParams.draggingCol = null;
        target.style.cursor = '';
        resizeLineStyle.display = 'none';
        resizeLineStyle.left = '0';
        document.removeEventListener('mousemove', onDragOver);
        document.removeEventListener('mouseup', onDragEnd);
        document.onselectstart = null;
        document.ondragstart = null;
      }

      refreshTable();
    };

    const onDragOver = (e: MouseEvent) => {
      // 计算新的列宽，新列宽不得小于最小列宽
      if (resizeLineParams.isDragging) {
        const left = resizeLinePos + e.x - resizeLineParams.draggingStart;
        resizeLineStyle.left = `${Math.min(Math.max(left, minResizeLineLeft), maxResizeLineLeft)}px`;
      }
    };

    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('mousemove', onDragOver);

    // 禁用鼠标的选中文字和拖放
    document.onselectstart = () => false;
    document.ondragstart = () => false;
  };

  return {
    resizeLineRef,
    resizeLineStyle,
    onColumnMouseover,
    onColumnMousedown,
  };
}
