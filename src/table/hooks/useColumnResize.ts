import { ref, Ref, reactive, CSSProperties } from 'vue';
import isNumber from 'lodash/isNumber';
import { BaseTableCol, TableRowData } from '../type';
import { RecalculateColumnWidthFunc } from '../interface';
import setThWidthListByColumnDrag from '../../_common/js/table/set-column-width-by-drag';
import recalculateColumnWidth from '../../_common/js/table/recalculate-column-width';

const DEFAULT_MIN_WIDTH = 80;
const DEFAULT_MAX_WIDTH = 600;

export default function useColumnResize(
  tableContentRef: Ref<HTMLDivElement>,
  refreshTable: () => void,
  getThWidthList: () => { [colKeys: string]: number },
  updateThWidthList: (data: { [colKeys: string]: number }) => void,
) {
  const resizeLineRef = ref<HTMLDivElement>();
  const notCalculateWidthCols = ref<string[]>([]);
  const effectColMap = ref<{ [colKey: string]: any }>({});

  // 递归查找列宽度变化后，受影响的相关列
  const setEffectColMap = (nodes: BaseTableCol<TableRowData>[], parent: BaseTableCol<TableRowData> | null) => {
    if (!nodes) return;
    nodes.forEach((n, index) => {
      const parentPrevCol = parent ? effectColMap.value[parent.colKey].prev : nodes[index + 1];
      const parentNextCol = parent ? effectColMap.value[parent.colKey].next : nodes[index - 1];
      const prev = index === 0 ? parentPrevCol : nodes[index - 1];
      const next = index === nodes.length - 1 ? parentNextCol : nodes[index + 1];
      effectColMap.value[n.colKey] = {
        prev,
        next,
      };
      setEffectColMap(n.children, n);
    });
  };

  const resizeLineParams = {
    isDragging: false,
    draggingCol: null as HTMLElement,
    draggingStart: 0,
    effectCol: null as 'next' | 'prev' | null,
  };

  const resizeLineStyle = reactive({
    display: 'none',
    left: '10px',
    height: '10px',
    bottom: '0',
  });

  const setNotCalculateWidthCols = (colKeys: string[]) => {
    notCalculateWidthCols.value = colKeys;
  };

  // 表格列宽拖拽事件
  // 只在表头显示拖拽图标
  const onColumnMouseover = (e: MouseEvent) => {
    if (!resizeLineRef.value) return;

    const target = (e.target as HTMLElement).closest('th');
    const targetBoundRect = target.getBoundingClientRect();
    if (!resizeLineParams.isDragging) {
      // 当离右边框的距离不超过 8 时，显示拖拽图标
      const distance = 8;
      if (targetBoundRect.right - e.pageX <= distance) {
        target.style.cursor = 'col-resize';
        resizeLineParams.draggingCol = target;
        resizeLineParams.effectCol = 'next';
      } else if (e.pageX - targetBoundRect.left <= distance) {
        const prevEl = target.previousElementSibling;
        if (prevEl) {
          target.style.cursor = 'col-resize';
          resizeLineParams.draggingCol = prevEl as HTMLElement;
          resizeLineParams.effectCol = 'prev';
        } else {
          target.style.cursor = '';
          resizeLineParams.draggingCol = null;
          resizeLineParams.effectCol = null;
        }
      } else {
        target.style.cursor = '';
        resizeLineParams.draggingCol = null;
        resizeLineParams.effectCol = null;
      }
    }
  };

  // 调整表格列宽
  const onColumnMousedown = (e: MouseEvent, col: BaseTableCol<TableRowData>) => {
    // 非 resize 的点击，不做处理
    if (!resizeLineParams.draggingCol) return;

    const getMinMaxColWidth = (col: BaseTableCol<TableRowData>, effectPrevCol: BaseTableCol<TableRowData>) => {
      let targetCol = null;
      if (resizeLineParams.effectCol === 'next') {
        targetCol = col;
      } else {
        targetCol = effectPrevCol;
      }
      const propMinWidth = isNumber(targetCol.minWidth) ? targetCol.minWidth : parseFloat(targetCol.minWidth);
      return {
        minColWidth: Math.max(targetCol.resize?.minWidth || DEFAULT_MIN_WIDTH, propMinWidth || DEFAULT_MIN_WIDTH),
        maxColWidth: targetCol.resize?.maxWidth || DEFAULT_MAX_WIDTH,
      };
    };

    const target = resizeLineParams.draggingCol;
    const targetBoundRect = target.getBoundingClientRect();
    const tableBoundRect = tableContentRef.value?.getBoundingClientRect();
    const resizeLinePos = targetBoundRect.right - tableBoundRect.left;
    const colLeft = targetBoundRect.left - tableBoundRect.left;
    const effectNextCol = effectColMap.value[col.colKey].next;
    const effectPrevCol = effectColMap.value[col.colKey].prev;
    const { minColWidth, maxColWidth } = getMinMaxColWidth(col, effectPrevCol);
    const minResizeLineLeft = colLeft + minColWidth;
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
        let width = Math.ceil(parseInt(resizeLineStyle.left, 10) - colLeft) || 0;
        // 为了避免精度问题，导致 width 宽度超出 [minColWidth, maxColWidth] 的范围，需要对比目标宽度和最小/最大宽度
        if (width <= minColWidth) {
          width = minColWidth;
        } else if (width >= maxColWidth) {
          width = maxColWidth;
        }
        // 更新列宽
        if (resizeLineParams.effectCol === 'next') {
          setThWidthListByColumnDrag<BaseTableCol<TableRowData>>(
            col,
            width,
            effectNextCol,
            { getThWidthList, DEFAULT_MIN_WIDTH },
            (updateMap, notCalculateCols) => {
              updateThWidthList(updateMap);
              setNotCalculateWidthCols(notCalculateCols);
            },
          );
        } else if (resizeLineParams.effectCol === 'prev') {
          setThWidthListByColumnDrag<BaseTableCol<TableRowData>>(
            effectPrevCol,
            width,
            col,
            { getThWidthList, DEFAULT_MIN_WIDTH },
            (updateMap, notCalculateCols) => {
              updateThWidthList(updateMap);
              setNotCalculateWidthCols(notCalculateCols);
            },
          );
        }

        // 恢复设置
        resizeLineParams.isDragging = false;
        resizeLineParams.draggingCol = null;
        resizeLineParams.effectCol = null;
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

  const recalculateColWidth: RecalculateColumnWidthFunc = (
    columns: BaseTableCol<TableRowData>[],
    thWidthList: { [colKey: string]: number },
    tableLayout: string,
    tableElmWidth: number,
  ): void => {
    recalculateColumnWidth<BaseTableCol<TableRowData>>(
      columns,
      thWidthList,
      tableLayout,
      tableElmWidth,
      notCalculateWidthCols.value,
      (widthMap) => {
        updateThWidthList(widthMap);
        if (notCalculateWidthCols.value.length) {
          notCalculateWidthCols.value = [];
        }
      },
    );
  };

  return {
    resizeLineRef,
    resizeLineStyle,
    onColumnMouseover,
    onColumnMousedown,
    recalculateColWidth,
    setEffectColMap,
  };
}
