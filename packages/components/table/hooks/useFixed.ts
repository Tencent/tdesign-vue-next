import {
  ref,
  reactive,
  watch,
  toRefs,
  SetupContext,
  onMounted,
  computed,
  ComputedRef,
  onBeforeUnmount,
  Ref,
  nextTick,
} from 'vue';
import { get, pick, xorWith, debounce } from 'lodash-es';

import log from '@tdesign/common-js/log/index';
import { ClassName, Styles } from '../../common';
import { BaseTableCol, BaseTableInstanceFunctions, TableRowData, TdBaseTableProps } from '../type';
import { getScrollbarWidthWithCSS } from '@tdesign/common-js/utils/getScrollbarWidth';
import { on, off } from '@tdesign/shared-utils';
import { FixedColumnInfo, TableRowFixedClasses, RowAndColFixedPosition, TableColFixedClasses } from '../types';
import { getIEVersion } from '@tdesign/common-js/utils/helper';

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
  // 和虚拟滚动搭配使用时，需要增加 style 的偏移量
  virtualTranslateY = 0,
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
    top: fixedTop ? `${fixedPos.top - virtualTranslateY}px` : undefined,
    bottom: fixedBottom ? `${fixedPos.bottom + virtualTranslateY}px` : undefined,
  };
  return {
    style: rowStyles,
    classes: rowClasses,
  };
}

export default function useFixed(
  props: TdBaseTableProps,
  context: SetupContext,
  finalColumns: ComputedRef<BaseTableCol<TableRowData>[]>,
  affixRef: Record<string, Ref>,
) {
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
    resizable,
    allowResizeColumnWidth,
  } = toRefs(props);
  const data = ref<TableRowData[]>([]);
  const tableRef = ref<HTMLDivElement>();
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

  const columnResizable = computed(() => allowResizeColumnWidth.value ?? resizable.value ?? false);

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
    fixedInfo: { hasFixedColumn: boolean; hasFixedLeft: boolean; hasFixedRight: boolean } = {
      hasFixedColumn: false,
      hasFixedLeft: false,
      hasFixedRight: false,
    },
  ) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (['left', 'right'].includes(col.fixed)) {
        fixedInfo.hasFixedColumn = true;
      }
      if (col.fixed === 'right') {
        fixedInfo.hasFixedRight = true;
      }
      if (col.fixed === 'left') {
        fixedInfo.hasFixedLeft = true;
      }
      const key = col.colKey || i;
      const columnInfo: FixedColumnInfo = { col, parent, index: i };
      map.set(key, columnInfo);
      if (col.children?.length) {
        getColumnMap(col.children, map, levelNodes, level + 1, columnInfo, fixedInfo);
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
      fixedInfo,
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
      if (colInfo) {
        colInfo.left = (lastColInfo?.left || defaultWidth) + (lastColInfo?.width || 0);
      }
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
      if (colInfo) {
        colInfo.right = (lastColInfo?.right || defaultWidth) + (lastColInfo?.width || 0);
      }
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
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr?.getBoundingClientRect().height || 0 });
    }
    for (let i = data.length - 1; i >= data.length - fixedBottomRows; i--) {
      // 当虚拟滚动的时候，尾部固定行并非对应数据的 index，需要进行倒推计算
      const tr = trList[trList.length - (data.length - i)] as HTMLElement;
      const rowId = get(data[i], rowKey);
      const thisRowInfo = initialColumnMap.get(rowId) || {};
      const lastRowId = get(data[i + 1], rowKey);
      const lastRowInfo = initialColumnMap.get(lastRowId) || {};
      let defaultBottom = 0;
      if (i === data.length - 1) {
        defaultBottom = tfoot?.getBoundingClientRect().height || 0;
      }
      thisRowInfo.bottom = (lastRowInfo.bottom || defaultBottom) + (lastRowInfo.height || 0);
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr?.getBoundingClientRect().height || 0 });
    }
  };

  // 比较两个 Map 的内容是否相同
  const isMapEqual = (map1: RowAndColFixedPosition, map2: RowAndColFixedPosition): boolean => {
    if (map1.size !== map2.size) return false;
    for (const [key, value] of map1) {
      const otherValue = map2.get(key);
      if (!otherValue) return false;
      // 比较关键属性
      if (
        value.left !== otherValue.left ||
        value.right !== otherValue.right ||
        value.top !== otherValue.top ||
        value.bottom !== otherValue.bottom ||
        value.width !== otherValue.width ||
        value.height !== otherValue.height ||
        value.lastLeftFixedCol !== otherValue.lastLeftFixedCol ||
        value.firstRightFixedCol !== otherValue.firstRightFixedCol
      ) {
        return false;
      }
    }
    return true;
  };

  const updateRowAndColFixedPosition = (tableContentElm: HTMLElement, initialColumnMap: RowAndColFixedPosition) => {
    if (!tableContentElm) {
      if (rowAndColFixedPosition.value.size > 0) {
        rowAndColFixedPosition.value = new Map();
      }
      return;
    }
    const thead = tableContentElm.querySelector('thead');
    // 处理固定列
    thead && setFixedColPosition(thead.children, initialColumnMap);
    // 处理冻结行
    const tbody = tableContentElm.querySelector('tbody');
    const tfoot = tableContentElm.querySelector('tfoot');
    tbody && setFixedRowPosition(tbody.children, initialColumnMap, thead, tfoot);
    // 只有当内容真正变化时才更新，避免不必要的渲染
    if (!isMapEqual(rowAndColFixedPosition.value, initialColumnMap)) {
      rowAndColFixedPosition.value = initialColumnMap;
    }
  };

  let shadowLastScrollLeft: number;
  const updateColumnFixedShadow = (target: HTMLElement, extra?: { skipScrollLimit?: boolean }) => {
    if (!isFixedColumn.value || !target) return;
    const { scrollLeft } = target;
    // 只有左右滚动，需要更新固定列阴影
    if (shadowLastScrollLeft === scrollLeft && (!extra || !extra.skipScrollLimit)) return;
    shadowLastScrollLeft = scrollLeft;
    const isShowRight = target.clientWidth + scrollLeft < target.scrollWidth;
    const isShowLeft = scrollLeft > 0;
    if (showColumnShadow.left === isShowLeft && showColumnShadow.right === isShowRight) return;
    showColumnShadow.left = isShowLeft && isFixedLeftColumn.value;
    showColumnShadow.right = isShowRight && isFixedRightColumn.value;
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
    const { newColumnsMap, levelNodes, fixedInfo } = getColumnMap(columns.value);
    // 只在值变化时更新，避免触发不必要的响应式更新
    if (isFixedColumn.value !== fixedInfo.hasFixedColumn) {
      isFixedColumn.value = fixedInfo.hasFixedColumn;
    }
    if (isFixedLeftColumn.value !== fixedInfo.hasFixedLeft) {
      isFixedLeftColumn.value = fixedInfo.hasFixedLeft;
    }
    if (isFixedRightColumn.value !== fixedInfo.hasFixedRight) {
      isFixedRightColumn.value = fixedInfo.hasFixedRight;
    }
    setIsLastOrFirstFixedCol(levelNodes);
    // 使用 nextTick 确保 DOM 已更新，同时避免多个 setTimeout 导致多次独立渲染
    nextTick(() => {
      if (fixedInfo.hasFixedColumn || fixedRows.value?.length) {
        updateRowAndColFixedPosition(tableContentRef.value, newColumnsMap);
      }
    });
  };

  const updateFixedHeader = () => {
    // 使用 nextTick 确保 DOM 已更新，同时与其他更新批量处理
    nextTick(() => {
      if (!tableContentRef.value) return;
      const newIsFixedHeader = tableContentRef.value.scrollHeight > tableContentRef.value.clientHeight;
      const newIsWidthOverflow = tableContentRef.value.scrollWidth > tableContentRef.value.clientWidth;
      // 只在值变化时更新，避免触发不必要的响应式更新
      if (isFixedHeader.value !== newIsFixedHeader) {
        isFixedHeader.value = newIsFixedHeader;
      }
      if (isWidthOverflow.value !== newIsWidthOverflow) {
        isWidthOverflow.value = newIsWidthOverflow;
      }
      const pos = tableContentRef.value.getBoundingClientRect();
      // 只有当位置真正变化时才更新，避免不必要的响应式更新
      if (virtualScrollHeaderPos.value.top !== pos.top || virtualScrollHeaderPos.value.left !== pos.left) {
        virtualScrollHeaderPos.value = {
          top: pos.top,
          left: pos.left,
        };
      }
    });
  };

  const setTableElmWidth = (width: number) => {
    if (tableElmWidth.value === width) return;
    tableElmWidth.value = width;
  };

  const updateTableWidth = () => {
    const rect = tableContentRef.value?.getBoundingClientRect();
    if (!rect) return;
    // 存在纵向滚动条，且固定表头时，需去除滚动条宽度
    const reduceWidth = isFixedHeader.value ? scrollbarWidth.value : 0;
    const newTableWidth = rect.width - reduceWidth - (props.bordered ? 1 : 0);
    if (tableWidth.value !== newTableWidth) {
      tableWidth.value = newTableWidth;
    }
    const elmRect = tableElmRef?.value?.getBoundingClientRect();
    elmRect?.width && setTableElmWidth(elmRect.width);
  };

  const updateAffixPosition = () => {
    // 在表格高度变化的时候 需要手动调整affix的位置 因为affix本身无法监听到这些变化触发重新计算
    affixRef.paginationAffixRef.value?.handleScroll?.();
    affixRef.horizontalScrollAffixRef.value?.handleScroll?.();
    affixRef.headerTopAffixRef.value?.handleScroll?.();
    affixRef.footerBottomAffixRef.value?.handleScroll?.();
  };

  const calculateThWidthList = (trList: HTMLCollection) => {
    const widthMap: { [colKey: string]: number } = {};
    for (let i = 0, len = trList.length; i < len; i++) {
      const thList = trList[i].children;
      // second for used for multiple row header
      for (let j = 0, thLen = thList.length; j < thLen; j++) {
        const th = thList[j] as HTMLElement;
        const colKey = th.dataset.colkey;
        widthMap[colKey] = th.getBoundingClientRect().width;
      }
    }
    return widthMap;
  };

  const updateThWidthList = (trList: HTMLCollection | { [colKey: string]: number }) => {
    if (trList instanceof HTMLCollection) {
      if (columnResizable.value) return;
      const newWidthList = calculateThWidthList(trList);
      // 检查是否有变化
      const hasChange = Object.keys(newWidthList).some((key) => thWidthList.value[key] !== newWidthList[key]);
      if (hasChange || Object.keys(thWidthList.value).length !== Object.keys(newWidthList).length) {
        thWidthList.value = newWidthList;
      }
    } else {
      thWidthList.value = thWidthList.value || {};
      Object.entries(trList).forEach(([colKey, width]) => {
        thWidthList.value[colKey] = width;
      });
    }
    return thWidthList.value;
  };

  const updateThWidthListHandler = () => {
    // 使用 nextTick 替代 setTimeout(0)，可以与其他 nextTick 批量处理
    nextTick(() => {
      updateTableWidth();
      if (notNeedThWidthList.value) return;
      const thead = tableContentRef.value?.querySelector('thead');
      if (!thead) return;
      updateThWidthList(thead.children);
    });
  };

  const resetThWidthList = () => {
    thWidthList.value = {};
  };

  const emitScrollEvent = (e: WheelEvent) => {
    props.onScrollX?.({ e });
    props.onScrollY?.({ e });
    props.onScroll?.({ e });
  };

  const getThWidthList = (type?: 'default' | 'calculate') => {
    if (type === 'calculate') {
      const trList = tableContentRef.value?.querySelector('thead')?.children;
      if (!trList) {
        return {};
      }
      return calculateThWidthList(trList);
    }
    return thWidthList.value || {};
  };

  // 注意：isFixedHeader 和 isWidthOverflow 是派生状态，不应该作为触发 updateFixedStatus 的依赖
  // 否则会导致链式触发：updateFixedHeader 更新这些值 -> 触发此 watch -> 再次渲染
  watch(
    [data, columns, bordered, tableLayout, tableContentWidth, fixedRows, firstFullRow, lastFullRow],
    updateFixedStatus,
    { immediate: true },
  );

  watch(
    [isFixedColumn, columns],
    () => {
      nextTick(() => {
        if (isFixedColumn.value) {
          updateColumnFixedShadow(tableContentRef.value);
        }
      });
    },
    { immediate: true },
  );

  watch(
    [maxHeight, data, columns, bordered, tableContentRef],
    () => {
      if (tableContentRef.value) {
        // 如果不监听元素的ref，会出现watch在ref还没ready的时候触发，此时没有触发这个判断的更新，导致表头消失
        updateFixedHeader();
      }
    },
    { immediate: true },
  );

  watch(finalColumns, () => {
    resetThWidthList();
  });

  // 标记是否已经完成初始化
  let isInitialized = false;

  // 影响表头宽度的元素
  // 注意：isFixedHeader 是派生状态，不应该作为触发依赖，否则会导致链式触发
  watch(
    [data, bordered, tableLayout, fixedRows, headerAffixedTop, footerAffixedBottom, tableContentWidth],
    () => {
      // 初始化时使用 nextTick，后续变化使用 debounce
      if (!isInitialized) {
        nextTick(() => {
          updateThWidthListHandler();
          updateAffixPosition();
          isInitialized = true;
        });
      } else {
        // 使用 debounce 合并多次调用，避免多次触发
        const timer = setTimeout(() => {
          updateThWidthListHandler();
          updateAffixPosition();
          clearTimeout(timer);
        }, 60);
      }
    },
    { immediate: true },
  );

  watch([finalColumns], ([finalColumns], [preFinalColumns]) => {
    const finalColKeys = finalColumns.map((t) => t.colKey);
    const preColKeys = preFinalColumns.map((t) => t.colKey);
    if (finalColKeys.length < preColKeys.length) {
      const reduceKeys = xorWith(preColKeys, finalColKeys);
      const thWidthList = getThWidthList('calculate');
      let reduceWidth = 0;
      reduceKeys.forEach((key) => {
        reduceWidth += thWidthList[key];
      });
      const rootThWidthList = pick(thWidthList, preColKeys);
      const oldTotalWidth = Object.values(rootThWidthList).reduce((r = 0, n) => r + n, 0);
      // 保留原有可能编辑过的列宽度，但是当剩余列过小时，表头小于内容宽，需要缩放回内容宽度
      // 使用不包含滚动条的可视化区域宽度，意味着当不再溢出的时候，将宽度设置回完整宽度
      const contentWidth = tableContentRef.value.clientWidth;
      const widthToReserve = oldTotalWidth - reduceWidth;
      setTableElmWidth(Math.max(contentWidth, widthToReserve));
    }
  });

  const refreshTable: BaseTableInstanceFunctions['refreshTable'] = () => {
    // updateTableWidth();
    updateThWidthListHandler();
    updateFixedHeader();
    updateAffixPosition();

    if (isFixedColumn.value || isFixedHeader.value) {
      updateFixedStatus();
      updateColumnFixedShadow(tableContentRef.value, { skipScrollLimit: true });
    }

    // auto 布局下，同步表头列宽，避免 affix 表头列宽不对齐
    if (tableLayout.value === 'auto') {
      updateThWidthList(getThWidthList('calculate'));
    }
  };

  const onResize = debounce(() => {
    refreshTable();
  }, 30);

  let resizeObserver: ResizeObserver = null;
  function addTableResizeObserver(tableElement: HTMLDivElement) {
    if (typeof window === 'undefined') return;
    // IE 11 以下使用 window resize；IE 11 以上使用 ResizeObserver
    if (getIEVersion() < 11 || typeof window.ResizeObserver === 'undefined') return;
    off(window, 'resize', onResize);
    resizeObserver = new window.ResizeObserver(() => {
      const timer = setTimeout(() => {
        refreshTable();
        clearTimeout(timer);
      }, 200);
    });
    resizeObserver.observe(tableElement);
    tableRef.value = tableElement;
  }

  onMounted(() => {
    const scrollWidth = getScrollbarWidthWithCSS();
    scrollbarWidth.value = scrollWidth;
    updateThWidthListHandler();
    const isWatchResize = isFixedColumn.value || isFixedHeader.value || !notNeedThWidthList.value || !data.value.length;
    // IE 11 以下使用 window resize；IE 11 以上使用 ResizeObserver
    const hasWindow = typeof window !== 'undefined';
    const hasResizeObserver = hasWindow && typeof window.ResizeObserver !== 'undefined';
    if ((isWatchResize && getIEVersion() < 11) || !hasResizeObserver) {
      on(window, 'resize', onResize);
    }
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      off(window, 'resize', onResize);
    }
    resizeObserver?.unobserve(tableRef.value);
    resizeObserver?.disconnect();
  });

  const setData = (dataSource: TableRowData[]) => {
    // 只有当数据引用真正变化时才更新，避免不必要的响应式更新
    if (data.value === dataSource) return;
    data.value = dataSource;
  };

  const updateTableAfterColumnResize = () => {
    updateFixedStatus();
    updateFixedHeader();
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
    setTableElmWidth,
    emitScrollEvent,
    updateThWidthListHandler,
    updateColumnFixedShadow,
    setUseFixedTableElmRef,
    getThWidthList,
    updateThWidthList,
    addTableResizeObserver,
    updateTableAfterColumnResize,
  };
}
