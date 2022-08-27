import { ref, Ref, reactive, CSSProperties } from 'vue';
import isNumber from 'lodash/isNumber';
import { BaseTableCol, TableRowData } from '../type';
import { RecalculateColumnWidthFunc } from '../interface';

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
  const onColumnMousedown = (
    e: MouseEvent,
    col: BaseTableCol<TableRowData>,
    effectNextCol: BaseTableCol<TableRowData>,
    effectPrevCol: BaseTableCol<TableRowData>,
  ) => {
    // 非 resize 的点击，不做处理
    if (!resizeLineParams.draggingCol) return;

    const target = resizeLineParams.draggingCol;
    const targetBoundRect = target.getBoundingClientRect();
    const tableBoundRect = tableContentRef.value?.getBoundingClientRect();
    const resizeLinePos = targetBoundRect.right - tableBoundRect.left;
    const colLeft = targetBoundRect.left - tableBoundRect.left;
    const minColWidth = col.resize?.minWidth || DEFAULT_MIN_WIDTH;
    const maxColWidth = col.resize?.maxWidth || DEFAULT_MAX_WIDTH;
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

    const setThWidthListByColumnDrag = (
      dragCol: BaseTableCol<TableRowData>,
      dragWidth: number,
      nearCol: BaseTableCol<TableRowData>,
    ) => {
      const thWidthList = getThWidthList();

      const propColWidth = isNumber(dragCol.width) ? dragCol.width : parseFloat(dragCol.width);
      const propNearColWidth = isNumber(nearCol.width) ? nearCol.width : parseFloat(nearCol.width);
      const oldWidth = thWidthList[dragCol.colKey] || propColWidth;
      const oldNearWidth = thWidthList[nearCol.colKey] || propNearColWidth;

      updateThWidthList({
        [dragCol.colKey]: dragWidth,
        [nearCol.colKey]: Math.max(nearCol.resize?.minWidth || DEFAULT_MIN_WIDTH, oldWidth + oldNearWidth - dragWidth),
      });

      setNotCalculateWidthCols([dragCol.colKey, nearCol.colKey]);
    };

    // 拖拽时鼠标可能会超出 table 范围，需要给 document 绑定拖拽相关事件
    const onDragEnd = () => {
      if (resizeLineParams.isDragging) {
        // 结束拖拽，更新列宽
        const width = Math.ceil(parseInt(resizeLineStyle.left, 10) - colLeft) || 0;
        // 为了避免精度问题，导致 width 宽度超出 [minColWidth, maxColWidth] 的范围，需要对比目标宽度和最小/最大宽度
        if (resizeLineParams.effectCol === 'next') {
          setThWidthListByColumnDrag(col, width, effectNextCol);
        } else if (resizeLineParams.effectCol === 'prev') {
          setThWidthListByColumnDrag(effectPrevCol, width, col);
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
    let actualWidth = 0;
    const missingWidthCols: BaseTableCol<TableRowData>[] = [];
    const thMap: { [colKey: string]: number } = {};

    // 计算现有列的列宽总和
    columns.forEach((col) => {
      if (!thWidthList[col.colKey]) {
        thMap[col.colKey] = isNumber(col.width) ? col.width : parseFloat(col.width);
      } else {
        thMap[col.colKey] = thWidthList[col.colKey];
      }
      const originWidth = thMap[col.colKey];
      if (originWidth) {
        actualWidth += originWidth;
      } else {
        missingWidthCols.push(col);
      }
    });

    let tableWidth = tableElmWidth;
    let needUpdate = false;
    // 表宽没有初始化时，默认给没有指定列宽的列指定宽度为100px
    if (tableWidth > 0) {
      // 存在没有指定列宽的列
      if (missingWidthCols.length) {
        // 当前列宽总宽度小于表宽，将剩余宽度平均分配给未指定宽度的列
        if (actualWidth < tableWidth) {
          const widthDiff = tableWidth - actualWidth;
          const avgWidth = widthDiff / missingWidthCols.length;
          missingWidthCols.forEach((col) => {
            thMap[col.colKey] = avgWidth;
          });
        } else if (tableLayout === 'fixed') {
          // 当前列表总宽度大于等于表宽，且当前排版模式为fixed，默认填充100px
          missingWidthCols.forEach((col) => {
            const originWidth = thMap[col.colKey] || 100;
            thMap[col.colKey] = isNumber(originWidth) ? originWidth : parseFloat(originWidth);
          });
        } else {
          // 当前列表总宽度大于等于表宽，且当前排版模式为auto，默认填充100px，然后按比例重新分配各列宽度
          const extraWidth = missingWidthCols.length * 100;
          const totalWidth = extraWidth + actualWidth;
          columns.forEach((col) => {
            if (!thMap[col.colKey]) {
              thMap[col.colKey] = (100 / totalWidth) * tableWidth;
            } else {
              thMap[col.colKey] = (thMap[col.colKey] / totalWidth) * tableWidth;
            }
          });
        }
        needUpdate = true;
      } else {
        // 所有列都已经指定宽度
        if (notCalculateWidthCols.value.length) {
          // 存在不允许重新计算宽度的列（一般是resize后的两列），这些列不参与后续计算
          let sum = 0;
          notCalculateWidthCols.value.forEach((colKey) => {
            sum += thMap[colKey];
          });
          actualWidth -= sum;
          tableWidth -= sum;
        }
        // 重新计算其他列的宽度，按表格剩余宽度进行按比例分配
        if (actualWidth !== tableWidth || notCalculateWidthCols.value.length) {
          columns.forEach((col) => {
            if (notCalculateWidthCols.value.includes(col.colKey)) return;
            thMap[col.colKey] = (thMap[col.colKey] / actualWidth) * tableWidth;
          });
          needUpdate = true;
        }
      }
    } else {
      // 表格宽度未初始化，默认填充100px
      missingWidthCols.forEach((col) => {
        const originWidth = thMap[col.colKey] || 100;
        thMap[col.colKey] = isNumber(originWidth) ? originWidth : parseFloat(originWidth);
      });

      needUpdate = true;
    }

    // 列宽转为整数
    if (needUpdate) {
      let addon = 0;
      Object.keys(thMap).forEach((key) => {
        const width = thMap[key];
        addon += width - Math.floor(width);
        thMap[key] = Math.floor(width) + (addon > 1 ? 1 : 0);
        if (addon > 1) {
          addon -= 1;
        }
      });
      if (addon > 0.5) {
        thMap[columns[0].colKey] += 1;
      }
    }

    updateThWidthList(thMap);

    if (notCalculateWidthCols.value.length) {
      notCalculateWidthCols.value = [];
    }
  };

  return {
    resizeLineRef,
    resizeLineStyle,
    onColumnMouseover,
    onColumnMousedown,
    recalculateColWidth,
  };
}
