import { ref, reactive, watch, toRefs, SetupContext, onMounted, computed, onBeforeMount } from 'vue';
import get from 'lodash/get';
import log from '../../_common/js/log';
import { ClassName, Styles } from '../../common';
import { BaseTableCol, TableRowData, TdBaseTableProps } from '../type';
import getScrollbarWidth from '../../_common/js/utils/getScrollbarWidth';
import { on, off } from '../../utils/dom';
import { FixedColumnInfo, TableRowFixedClasses, RowAndColFixedPosition, TableColFixedClasses } from '../interface';

// 固定列相关类名处理
export function getColumnFixedStyles(
  col: TdBaseTableProps['columns'][0],
  index: number,
  rowAndColFixedPosition: RowAndColFixedPosition,
  tableColFixedClasses: TableColFixedClasses,
): { style?: Styles; classes?: ClassName } {
  const fixedPos = rowAndColFixedPosition?.get(col.colKey || index);
  if (!fixedPos) return {};
  const thClasses = {
    [tableColFixedClasses.left]: col.fixed === 'left',
    [tableColFixedClasses.right]: col.fixed === 'right',
    [tableColFixedClasses.lastLeft]: col.fixed === 'left' && fixedPos.lastLeftFixedCol,
    [tableColFixedClasses.firstRight]: col.fixed === 'right' && fixedPos.firstRightFixedCol,
  };
  const thStyles = {
    left: col.fixed === 'left' ? `${fixedPos.left}px` : undefined,
    right: col.fixed === 'right' ? `${fixedPos.right}px` : undefined,
  };
  return {
    style: thStyles,
    classes: thClasses,
  };
}

// 固定行相关类名处理
export function getRowFixedStyles(
  rowId: string | number,
  rowIndex: number,
  rowLength: number,
  fixedRows: TdBaseTableProps['fixedRows'],
  rowAndColFixedPosition: RowAndColFixedPosition,
  tableRowFixedClasses: TableRowFixedClasses,
): { style: Styles; classes: ClassName } {
  if (!fixedRows || !fixedRows.length) return { style: undefined, classes: undefined };
  const fixedTop = rowIndex < fixedRows[0];
  const fixedBottom = rowIndex > rowLength - 1 - fixedRows[1];
  const firstFixedBottomRow = rowLength - fixedRows[1];
  const fixedPos = rowAndColFixedPosition?.get(rowId) || {};
  const rowClasses = {
    [tableRowFixedClasses.top]: fixedTop,
    [tableRowFixedClasses.bottom]: fixedBottom,
    [tableRowFixedClasses.firstBottom]: rowIndex === firstFixedBottomRow,
    [tableRowFixedClasses.withoutBorderBottom]: rowIndex === firstFixedBottomRow - 1,
  };
  const rowStyles = {
    top: fixedTop ? `${fixedPos.top}px` : undefined,
    bottom: fixedBottom ? `${fixedPos.bottom}px` : undefined,
  };
  return {
    style: rowStyles,
    classes: rowClasses,
  };
}

export default function useFixed(props: TdBaseTableProps, context: SetupContext) {
  const {
    columns,
    tableLayout,
    tableContentWidth,
    fixedRows,
    firstFullRow,
    lastFullRow,
    maxHeight,
    headerAffixedTop,
    footerAffixedBottom,
    bordered,
  } = toRefs(props);
  const data = ref<TableRowData[]>([]);
  const tableContentRef = ref<HTMLDivElement>();
  const isFixedHeader = ref(false);
  const isWidthOverflow = ref(false);
  const tableElmRef = ref<HTMLTableElement>();
  // CSS 样式设置了固定 6px
  const scrollbarWidth = ref(6);
  // 固定列、固定表头、固定表尾等内容的位置信息
  const rowAndColFixedPosition = ref<RowAndColFixedPosition>(new Map());
  const showColumnShadow = reactive({
    left: false,
    right: false,
  });
  // 虚拟滚动不能使用 CSS sticky 固定表头
  const virtualScrollHeaderPos = ref<{ left: number; top: number }>({ left: 0, top: 0 });
  const tableWidth = ref(0);
  const tableElmWidth = ref(0);
  const thWidthList = ref<{ [colKey: string]: number }>({});

  const isFixedColumn = ref(false);
  const isFixedRightColumn = ref(false);
  const isFixedLeftColumn = ref(false);

  // 没有表头吸顶，没有虚拟滚动，则不需要表头宽度计算
  const notNeedThWidthList = computed(
    () =>
      !(
        props.headerAffixedTop ||
        props.footerAffixedBottom ||
        props.horizontalScrollAffixedBottom ||
        props.scroll?.type === 'virtual'
      ),
  );

  function setUseFixedTableElmRef(val: HTMLTableElement) {
    tableElmRef.value = val;
  }

  function getColumnMap(
    columns: BaseTableCol[],
    map: RowAndColFixedPosition = new Map(),
    levelNodes: FixedColumnInfo[][] = [],
    level = 0,
    parent?: FixedColumnInfo,
  ) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (['left', 'right'].includes(col.fixed)) {
        isFixedColumn.value = true;
      }
      if (col.fixed === 'right') {
        isFixedRightColumn.value = true;
      }
      if (col.fixed === 'left') {
        isFixedLeftColumn.value = true;
      }
      const key = col.colKey || i;
      const columnInfo: FixedColumnInfo = { col, parent, index: i };
      map.set(key, columnInfo);
      if (col.children?.length) {
        getColumnMap(col.children, map, levelNodes, level + 1, columnInfo);
      }
      if (levelNodes[level]) {
        levelNodes[level].push(columnInfo);
      } else {
        // eslint-disable-next-line no-param-reassign
        levelNodes[level] = [columnInfo];
      }
    }
    return {
      newColumnsMap: map,
      levelNodes,
    };
  }

  const setFixedLeftPos = (
    columns: BaseTableCol[],
    initialColumnMap: RowAndColFixedPosition,
    parent: FixedColumnInfo = {},
  ) => {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (col.fixed === 'right') return;
      const colInfo = initialColumnMap.get(col.colKey || i);
      let lastColIndex = i - 1;
      while (lastColIndex >= 0 && columns[lastColIndex].fixed !== 'left') {
        lastColIndex -= 1;
      }
      const lastCol = columns[lastColIndex];
      // 多级表头，使用父元素作为初始基本位置
      const defaultWidth = i === 0 ? parent?.left || 0 : 0;
      const lastColInfo = initialColumnMap.get(lastCol?.colKey || i - 1);
      colInfo.left = (lastColInfo?.left || defaultWidth) + (lastColInfo?.width || 0);
      // 多级表头
      if (col.children?.length) {
        setFixedLeftPos(col.children, initialColumnMap, colInfo);
      }
    }
  };

  const setFixedRightPos = (
    columns: BaseTableCol[],
    initialColumnMap: RowAndColFixedPosition,
    parent: FixedColumnInfo = {},
  ) => {
    for (let i = columns.length - 1; i >= 0; i--) {
      const col = columns[i];
      if (col.fixed === 'left') return;
      const colInfo = initialColumnMap.get(col.colKey || i);
      let lastColIndex = i + 1;
      while (lastColIndex < columns.length && columns[lastColIndex].fixed !== 'right') {
        lastColIndex += 1;
      }
      const lastCol = columns[lastColIndex];
      // 多级表头，使用父元素作为初始基本位置
      const defaultWidth = i === columns.length - 1 ? parent?.right || 0 : 0;
      const lastColInfo = initialColumnMap.get(lastCol?.colKey || i + 1);
      colInfo.right = (lastColInfo?.right || defaultWidth) + (lastColInfo?.width || 0);
      // 多级表头
      if (col.children?.length) {
        setFixedRightPos(col.children, initialColumnMap, colInfo);
      }
    }
  };

  // 获取固定列位置信息。先获取节点宽度，再计算
  const setFixedColPosition = (trList: HTMLCollection, initialColumnMap: RowAndColFixedPosition) => {
    if (!trList) return;
    for (let i = 0, len = trList.length; i < len; i++) {
      const thList = trList[i].children;
      for (let j = 0, thLen = thList.length; j < thLen; j++) {
        const th = thList[j] as HTMLElement;
        const colKey = th.dataset.colkey;
        if (!colKey) {
          log.warn('TDesign Table', `${th.innerText} missing colKey. colKey is required for fixed column feature.`);
        }
        const obj = initialColumnMap.get(colKey || j);
        if (obj?.col?.fixed) {
          initialColumnMap.set(colKey, { ...obj, width: th.getBoundingClientRect().width });
        }
      }
    }
    setFixedLeftPos(columns.value, initialColumnMap);
    setFixedRightPos(columns.value, initialColumnMap);
  };

  // 设置固定行位置信息 top/bottom
  const setFixedRowPosition = (
    trList: HTMLCollection,
    initialColumnMap: RowAndColFixedPosition,
    thead: HTMLTableSectionElement,
    tfoot: HTMLTableSectionElement,
  ) => {
    const [fixedTopRows, fixedBottomRows] = fixedRows.value || [];
    const { data, rowKey = 'id' } = props;
    for (let i = 0; i < fixedTopRows; i++) {
      const tr = trList[i] as HTMLElement;
      const rowId = get(data[i], rowKey);
      const thisRowInfo = initialColumnMap.get(rowId) || {};
      const lastRowId = get(data[i - 1], rowKey);
      const lastRowInfo = initialColumnMap.get(lastRowId) || {};
      let defaultBottom = 0;
      if (i === 0) {
        defaultBottom = thead?.getBoundingClientRect().height || 0;
      }
      thisRowInfo.top = (lastRowInfo.top || defaultBottom) + (lastRowInfo.height || 0);
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr.getBoundingClientRect().height });
    }
    for (let i = data.length - 1; i >= data.length - fixedBottomRows; i--) {
      const tr = trList[i] as HTMLElement;
      const rowId = get(data[i], rowKey);
      const thisRowInfo = initialColumnMap.get(rowId) || {};
      const lastRowId = get(data[i + 1], rowKey);
      const lastRowInfo = initialColumnMap.get(lastRowId) || {};
      let defaultBottom = 0;
      if (i === data.length - 1) {
        defaultBottom = tfoot?.getBoundingClientRect().height || 0;
      }
      thisRowInfo.bottom = (lastRowInfo.bottom || defaultBottom) + (lastRowInfo.height || 0);
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr.getBoundingClientRect().height });
    }
  };

  const updateRowAndColFixedPosition = (tableContentElm: HTMLElement, initialColumnMap: RowAndColFixedPosition) => {
    rowAndColFixedPosition.value.clear();
    if (!tableContentElm) return;
    const thead = tableContentElm.querySelector('thead');
    // 处理固定列
    thead && setFixedColPosition(thead.children, initialColumnMap);
    // 处理冻结行
    const tbody = tableContentElm.querySelector('tbody');
    const tfoot = tableContentElm.querySelector('tfoot');
    tbody && setFixedRowPosition(tbody.children, initialColumnMap, thead, tfoot);
    // 更新最终 Map
    rowAndColFixedPosition.value = initialColumnMap;
  };

  let shadowLastScrollLeft: number;
  const updateColumnFixedShadow = (target: HTMLElement) => {
    if (!isFixedColumn.value || !target) return;
    const { scrollLeft } = target;
    // 只有左右滚动，需要更新固定列阴影
    if (shadowLastScrollLeft === scrollLeft) return;
    shadowLastScrollLeft = scrollLeft;
    const isShowRight = target.clientWidth + scrollLeft < target.scrollWidth;
    showColumnShadow.left = scrollLeft > 0;
    showColumnShadow.right = isShowRight;
  };

  // 多级表头场景较为复杂：为了滚动的阴影效果，需要知道哪些列是边界列，左侧固定列的最后一列，右侧固定列的第一列，每一层表头都需要兼顾
  const setIsLastOrFirstFixedCol = (levelNodes: FixedColumnInfo[][]) => {
    for (let t = 0; t < levelNodes.length; t++) {
      const nodes = levelNodes[t];
      for (let i = 0, len = nodes.length; i < len; i++) {
        const colMapInfo = nodes[i];
        const nextColMapInfo = nodes[i + 1];
        const { parent } = colMapInfo;
        const isParentLastLeftFixedCol = !parent || parent?.lastLeftFixedCol;
        if (isParentLastLeftFixedCol && colMapInfo.col.fixed === 'left' && nextColMapInfo?.col.fixed !== 'left') {
          colMapInfo.lastLeftFixedCol = true;
        }
        const lastColMapInfo = nodes[i - 1];
        const isParentFirstRightFixedCol = !parent || parent?.firstRightFixedCol;
        if (isParentFirstRightFixedCol && colMapInfo.col.fixed === 'right' && lastColMapInfo?.col.fixed !== 'right') {
          colMapInfo.firstRightFixedCol = true;
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateFixedStatus = () => {
    const { newColumnsMap, levelNodes } = getColumnMap(columns.value);
    setIsLastOrFirstFixedCol(levelNodes);
    const timer = setTimeout(() => {
      if (isFixedColumn.value || fixedRows.value?.length) {
        updateRowAndColFixedPosition(tableContentRef.value, newColumnsMap);
      }
      clearTimeout(timer);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  };

  const updateFixedHeader = () => {
    const timer = setTimeout(() => {
      if (!tableContentRef.value) return;
      isFixedHeader.value = tableContentRef.value.scrollHeight > tableContentRef.value.clientHeight;
      isWidthOverflow.value = tableContentRef.value.scrollWidth > tableContentRef.value.clientWidth;
      const pos = tableContentRef.value.getBoundingClientRect();
      virtualScrollHeaderPos.value = {
        top: pos.top,
        left: pos.left,
      };
      clearTimeout(timer);
    }, 0);
  };

  const updateTableWidth = () => {
    const rect = tableContentRef.value?.getBoundingClientRect();
    if (!rect) return;
    // 存在纵向滚动条，且固定表头时，需去除滚动条宽度
    const reduceWidth = isFixedHeader.value ? scrollbarWidth.value : 0;
    tableWidth.value = rect.width - reduceWidth - (props.bordered ? 1 : 0);
    const elmRect = tableElmRef?.value?.getBoundingClientRect();
    tableElmWidth.value = elmRect?.width;
  };

  const updateThWidthList = (trList: HTMLCollection) => {
    const widthMap: { [colKey: string]: number } = {};
    for (let i = 0, len = trList.length; i < len; i++) {
      const thList = trList[i].children;
      for (let j = 0, thLen = thList.length; j < thLen; j++) {
        const th = thList[j] as HTMLElement;
        const colKey = th.dataset.colkey;
        widthMap[colKey] = th.getBoundingClientRect().width;
      }
    }
    thWidthList.value = widthMap;
  };

  const updateThWidthListHandler = () => {
    if (notNeedThWidthList.value) return;
    const timer = setTimeout(() => {
      updateTableWidth();
      const thead = tableContentRef.value?.querySelector('thead');
      if (!thead) return;
      updateThWidthList(thead.children);
      clearTimeout(timer);
    }, 0);
  };

  const emitScrollEvent = (e: WheelEvent) => {
    props.onScrollX?.({ e });
    props.onScrollY?.({ e });
    props.onScroll?.({ e });
  };

  watch(
    [
      data,
      columns,
      bordered,
      tableLayout,
      tableContentWidth,
      isFixedHeader,
      isWidthOverflow,
      isFixedColumn,
      fixedRows,
      firstFullRow,
      lastFullRow,
    ],
    updateFixedStatus,
    { immediate: true },
  );

  watch(
    [isFixedColumn, columns],
    () => {
      const timer = setTimeout(() => {
        if (isFixedColumn.value) {
          updateColumnFixedShadow(tableContentRef.value);
        }
        clearTimeout(timer);
      }, 0);
    },
    { immediate: true },
  );

  watch([maxHeight, data, columns, bordered], updateFixedHeader, { immediate: true });

  // 影响表头宽度的元素
  watch(
    [
      data,
      columns,
      bordered,
      tableLayout,
      fixedRows,
      isFixedHeader,
      headerAffixedTop,
      footerAffixedBottom,
      tableContentWidth,
    ],
    updateThWidthListHandler,
    { immediate: true },
  );

  const refreshTable = () => {
    updateTableWidth();
    updateFixedHeader();
    if (!notNeedThWidthList.value) {
      updateThWidthListHandler();
    }
    if (isFixedColumn.value || isFixedHeader.value) {
      updateFixedStatus();
      updateColumnFixedShadow(tableContentRef.value);
    }
  };

  const onResize = refreshTable;

  onMounted(() => {
    const scrollWidth = getScrollbarWidth();
    scrollbarWidth.value = scrollWidth;
    const timer = setTimeout(() => {
      updateTableWidth();
      clearTimeout(timer);
    });
    if (isFixedColumn.value || isFixedHeader.value || !notNeedThWidthList.value) {
      on(window, 'resize', onResize);
    }
  });

  onBeforeMount(() => {
    if (isFixedColumn.value || isFixedHeader.value || !notNeedThWidthList.value) {
      off(window, 'resize', onResize);
    }
  });

  const setData = (dataSource: TableRowData[]) => {
    data.value = dataSource;
  };

  return {
    tableWidth,
    tableElmWidth,
    thWidthList,
    isFixedHeader,
    isWidthOverflow,
    tableContentRef,
    isFixedColumn,
    showColumnShadow,
    rowAndColFixedPosition,
    virtualScrollHeaderPos,
    scrollbarWidth,
    setData,
    refreshTable,
    emitScrollEvent,
    updateThWidthListHandler,
    updateColumnFixedShadow,
    setUseFixedTableElmRef,
  };
}
