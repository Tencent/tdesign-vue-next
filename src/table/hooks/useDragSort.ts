// 表格 行拖拽 + 列拖拽功能
import { SetupContext, computed, toRefs, ref, watch, h, ComputedRef } from 'vue';
import Sortable, { SortableEvent, SortableOptions, MoveEvent } from 'sortablejs';
import isFunction from 'lodash/isFunction';
import { TableRowData, TdPrimaryTableProps, DragSortContext, PrimaryTableCol } from '../type';
import useClassName from './useClassName';
import log from '../../_common/js/log';
import { hasClass } from '../../utils/dom';
import swapDragArrayElement from '../../_common/js/utils/swapDragArrayElement';
import { BaseTableColumns } from '../interface';
import { getColumnDataByKey, getColumnIndexByKey } from '../../_common/js/table/utils';
import { SimplePageInfo } from '../interface';

function removeNode(node: HTMLElement) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode: HTMLElement, node: HTMLElement, position: number) {
  const refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

export default function useDragSort(
  props: TdPrimaryTableProps,
  context: SetupContext,
  params: ComputedRef<{
    showElement: boolean;
    onTableRefresh: () => void;
    tableKey: number;
  }>,
) {
  const { sortOnRowDraggable, dragSort, data } = toRefs(props);
  const innerPagination = ref(props.pagination);
  const { tableDraggableClasses, tableBaseClass, tableFullRowClasses, tableExpandClasses } = useClassName();
  const columns = ref<PrimaryTableCol[]>(props.columns || []);
  const { onTableRefresh } = params.value;
  const primaryTableRef = ref(null);
  // @ts-ignore 判断是否有拖拽列
  const dragCol = computed(() => columns.value.find((item) => item.colKey === 'drag'));
  // 行拖拽判断条件
  const isRowDraggable = computed(
    () => sortOnRowDraggable.value || ['row', 'row-handler-col'].includes(dragSort.value),
  );
  // 行拖拽判断条件-手柄列
  const isRowHandlerDraggable = computed(
    () => ['row-handler', 'row-handler-col'].includes(dragSort.value) && !!dragCol.value,
  );
  // 列拖拽判断条件
  const isColDraggable = computed(() => ['col', 'row-handler-col'].includes(dragSort.value));
  // 列拖拽排序，存储上一次的变化结果
  const lastColList = ref([]);
  // 列拖拽实例
  let dragColInstanceTmp: Sortable = null;

  if (props.sortOnRowDraggable) {
    log.error('Table', "`sortOnRowDraggable` is going to be deprecated, use dragSort='row' instead.");
  }
  watch(
    () => [...columns.value],
    (columns) => {
      lastColList.value = columns ? columns.map((t) => t.colKey) : [];
      onTableRefresh?.();
    },
    // { immediate: true },
  );

  // 本地分页的表格，index 不同，需加上分页计数
  function getDataPageIndex(index: number, pagination: SimplePageInfo) {
    const current = pagination.current ?? pagination.defaultCurrent;
    const pageSize = pagination.pageSize ?? pagination.defaultPageSize;
    // 开启本地分页的场景
    if (!props.disableDataPage && pagination && data.value.length > pageSize) {
      return pageSize * (current - 1) + index;
    }
    return index;
  }

  // 行拖拽排序
  const registerRowDragEvent = (element: HTMLDivElement): void => {
    if (!isRowHandlerDraggable.value && !isRowDraggable.value) return;
    const dragContainer = element?.querySelector('tbody');
    if (!dragContainer) {
      console.error('tbody does not exist.');
      return null;
    }
    const baseOptions: SortableOptions = {
      animation: 150,
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      filter: `.${tableFullRowClasses.base},.${tableExpandClasses.row}`, // 过滤首行尾行固定，过滤展开行
      onMove: (evt: MoveEvent) => !hasClass(evt.related, tableFullRowClasses.base),
      onEnd(evt: SortableEvent) {
        if (evt.newIndex === evt.oldIndex) return;
        // 处理受控：拖拽列表恢复原始排序
        removeNode(evt.item);
        insertNodeAt(evt.from, evt.item, evt.oldIndex);
        let { oldIndex: currentIndex, newIndex: targetIndex } = evt;
        if (
          (isFunction(props.firstFullRow) && props.firstFullRow(h)) ||
          context.slots.firstFullRow ||
          context.slots['first-full-row']
        ) {
          currentIndex -= 1;
          targetIndex -= 1;
        }
        if (innerPagination.value) {
          currentIndex = getDataPageIndex(currentIndex, innerPagination.value);
          targetIndex = getDataPageIndex(targetIndex, innerPagination.value);
        }
        const params: DragSortContext<TableRowData> = {
          data: data.value,
          currentIndex,
          current: data.value[currentIndex],
          targetIndex,
          target: data.value[targetIndex],
          newData: swapDragArrayElement([...props.data], currentIndex, targetIndex),
          e: evt,
          sort: 'row',
        };
        // currentData is going to be deprecated
        params.currentData = params.newData;
        props.onDragSort?.(params);
      },
      ...props.dragSortOptions,
    };

    if (!dragContainer) return;
    if (isRowDraggable.value) {
      new Sortable(dragContainer, { ...baseOptions });
    } else {
      new Sortable(dragContainer, {
        ...baseOptions,
        handle: `.${tableDraggableClasses.handle}`,
      });
    }
  };

  const registerOneLevelColDragEvent = (container: HTMLElement, recover: boolean) => {
    const options: SortableOptions = {
      animation: 150,
      dataIdAttr: 'data-colkey',
      direction: 'vertical',
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      handle: `.${tableBaseClass.thCellInner}`,
      // 存在类名：t-table__th--drag-sort 的列才允许拖拽调整顺序（注意：添加 draggable 之后，固定列的表头 和 吸顶表头 位置顺序会错位，暂时注释）
      // draggable: `th.${tableDraggableClasses.dragSortTh}`,
      onEnd: (evt: SortableEvent) => {
        if (evt.newIndex === evt.oldIndex) return;
        if (recover) {
          // 处理受控：拖拽列表恢复原始排序，等待外部数据 data 变化，更新最终顺序
          dragColInstanceTmp?.sort([...lastColList.value]);
        }
        const { oldIndex, newIndex, target: targetElement } = evt;
        let currentIndex = recover ? oldIndex : newIndex;
        let targetIndex = recover ? newIndex : oldIndex;
        const oldElement = targetElement.children[currentIndex] as HTMLElement;
        const newElement = targetElement.children[targetIndex] as HTMLElement;
        const current = getColumnDataByKey(columns.value, oldElement.dataset.colkey);
        const target = getColumnDataByKey(columns.value, newElement.dataset.colkey);
        if (!current || !current.colKey) {
          log.error('Table', `colKey is missing in ${JSON.stringify(current)}`);
        }
        if (!target || !target.colKey) {
          log.error('Table', `colKey is missing in ${JSON.stringify(target)}`);
        }
        // 寻找外部数据 props.columns 中的真正下标
        currentIndex = getColumnIndexByKey(props.columns, current.colKey);
        targetIndex = getColumnIndexByKey(props.columns, target.colKey);
        const params: DragSortContext<TableRowData> = {
          data: columns.value,
          currentIndex,
          current,
          targetIndex,
          target,
          newData: swapDragArrayElement([...props.columns], currentIndex, targetIndex),
          e: evt,
          sort: 'col',
        };
        // currentData is going to be deprecated
        params.currentData = params.newData;
        props.onDragSort?.(params);
      },
      ...props.dragSortOptions,
    };
    if (!container) return;
    dragColInstanceTmp = new Sortable(container, options);
    return dragColInstanceTmp;
  };

  // 列拖拽排序：涉及到多级表头、自定义显示列 等综合场景
  const registerColDragEvent = (tableElement: HTMLElement) => {
    if (!isColDraggable.value || !tableElement) return;
    const trList = tableElement.querySelectorAll('thead > tr');
    if (trList.length <= 1) {
      const [container] = trList;
      const dragInstanceTmp = registerOneLevelColDragEvent(container as HTMLElement, true);
      lastColList.value = dragInstanceTmp?.toArray();
    } else {
      // 多级表头只抛出事件，不处理其他未知逻辑（如多层表头之间具体如何交换）
      trList?.forEach((container) => {
        registerOneLevelColDragEvent(container as HTMLElement, false);
      });
    }
  };

  function setDragSortPrimaryTableRef(primaryTableElement: any) {
    primaryTableRef.value = primaryTableElement;
  }

  function setDragSortColumns(val: BaseTableColumns) {
    columns.value = val;
  }

  // eslint-disable-next-line
  watch([primaryTableRef, columns, dragSort, params], ([val, columns, dragSort, params]) => {
    register(val, params);
  });

  function register(val: any, params: any) {
    const primaryTableCmp = val as any;
    if (!val || !primaryTableCmp.$el || !params.showElement) return;
    // register after table tr rendered
    const timerA = setTimeout(() => {
      registerRowDragEvent(primaryTableCmp.$el);
      registerColDragEvent(primaryTableCmp.$el);
      /** 待表头节点准备完成后 */
      const timer = setTimeout(() => {
        if (primaryTableCmp.$refs.affixHeaderRef) {
          registerColDragEvent(primaryTableCmp.$refs.affixHeaderRef);
        }
        clearTimeout(timer);
      });

      clearTimeout(timerA);
    }, 60);
  }

  return {
    innerPagination,
    isRowDraggable,
    isRowHandlerDraggable,
    isColDraggable,
    setDragSortPrimaryTableRef,
    setDragSortColumns,
  };
}
