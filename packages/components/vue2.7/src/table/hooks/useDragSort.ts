// 表格 行拖拽 + 列拖拽功能
import type {
  ComputedRef,
  SetupContext,
} from '@td/adapter-vue';
import { computed, h, ref, toRefs, watch,
} from '@td/adapter-vue';
import type { MoveEvent, SortableEvent, SortableOptions } from 'sortablejs';
import Sortable from 'sortablejs';
import { get, isFunction } from 'lodash-es';
import log from '@td/shared/_common/js/log';
import swapDragArrayElement from '@td/shared/_common/js/utils/swapDragArrayElement';
import { getColumnDataByKey, getColumnIndexByKey } from '@td/shared/_common/js/table/utils';
import type {
  DragSortContext,
  PrimaryTableCol,
  TableRowData,
  TdPrimaryTableProps,
} from '@td/intel/table/type';
import { hasClass } from '@td/utils';
import type { TdPaginationProps as PaginationProps } from '@td/intel/pagination/type';
import type { SimplePageInfo } from '../interface';
import useClassName from './useClassName';

export default function useDragSort(
  props: TdPrimaryTableProps,
  context: SetupContext,
  extraParams: ComputedRef<{
    showElement: boolean;
    pagination: PaginationProps;
  }>,
) {
  const { sortOnRowDraggable, dragSort, data } = toRefs(props);
  const { tableDraggableClasses, tableBaseClass, tableFullRowClasses } = useClassName();
  const columns = ref<PrimaryTableCol[]>(props.columns || []);
  const primaryTableRef = ref(null);
  // @ts-expect-error 判断是否有拖拽列
  const dragCol = computed(() => columns.value?.find(item => item.colKey === 'drag'));
  // 行拖拽判断条件
  const isRowDraggable = computed(() => sortOnRowDraggable.value || dragSort.value === 'row');
  // 行手柄列拖拽判断条件
  const isRowHandlerDraggable = computed(
    () => ['drag-col', 'row-handler', 'row-handler-col'].includes(dragSort.value) && !!dragCol.value,
  );
  // 列拖拽排序
  const isColDraggable = computed(() => ['col', 'row-handler-col'].includes(dragSort.value));
  // 行拖拽排序，存储上一次的变化结果
  const lastRowList = ref([]);
  // 列拖拽排序，存储上一次的变化结果
  const lastColList = ref([]);

  if (dragSort.value === 'drag-col') {
    log.error('Table', 'dragSort=\'drag-col\' is going to be deprecated, please use dragSort=\'col\' instead.');
  }

  if (props.sortOnRowDraggable) {
    log.error('Table', '`sortOnRowDraggable` is going to be deprecated, please use dragSort=\'row\' instead.');
  }

  watch(
    data,
    (data) => {
      lastRowList.value = data?.map(item => get(item, props.rowKey));
    },
    { immediate: true },
  );

  watch(
    columns,
    (columns) => {
      lastColList.value = columns ? columns.map(t => t.colKey) : [];
    },
    { immediate: true },
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

  // 行拖拽排序，注意存在 firstFullRow 的情况
  const registerRowDragEvent = (element: HTMLDivElement): void => {
    if (!isRowHandlerDraggable.value && !isRowDraggable.value) {
      return;
    }
    const dragContainer = element?.querySelector('tbody');
    if (!dragContainer) {
      return null;
    }
    // 拖拽实例
    let dragInstanceTmp: Sortable = null;
    const baseOptions: SortableOptions = {
      animation: 150,
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      filter: `.${tableFullRowClasses.base}`, // 过滤首行尾行固定
      onMove: (evt: MoveEvent) => !hasClass(evt.related, tableFullRowClasses.base),
      onEnd(evt: SortableEvent) {
        if (evt.newIndex === evt.oldIndex) {
          return;
        }
        // 处理受控：拖拽列表恢复原始排序
        dragInstanceTmp?.sort(lastRowList.value);
        let { oldIndex: currentIndex, newIndex: targetIndex } = evt;
        if ((isFunction(props.firstFullRow) && props.firstFullRow(h)) || context.slots.firstFullRow) {
          currentIndex -= 1;
          targetIndex -= 1;
        }
        if (extraParams.value.pagination) {
          currentIndex = getDataPageIndex(currentIndex, extraParams.value.pagination);
          targetIndex = getDataPageIndex(targetIndex, extraParams.value.pagination);
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
        // Vue3 ignore next line
        context.emit('drag-sort', params);
      },
      ...props.dragSortOptions,
    };

    if (!dragContainer) {
      return;
    }
    if (isRowDraggable.value) {
      dragInstanceTmp = new Sortable(dragContainer, { ...baseOptions });
    } else {
      dragInstanceTmp = new Sortable(dragContainer, {
        ...baseOptions,
        handle: `.${tableDraggableClasses.handle}`,
      });
    }
    lastRowList.value = dragInstanceTmp.toArray();
  };

  const registerOneLevelColDragEvent = (container: HTMLElement, recover: boolean) => {
    // 拖拽实例
    let dragInstanceTmp: Sortable = null;
    const options: SortableOptions = {
      animation: 150,
      dataIdAttr: 'data-colkey',
      direction: 'vertical',
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      handle: `.${tableBaseClass.thCellInner}`,
      // 存在类名：t-table__th--drag-sort 的列才允许拖拽调整顺序（交换后功能异常）
      // draggable: `th.${tableDraggableClasses.dragSortTh}`,
      onEnd: (evt: SortableEvent) => {
        if (evt.newIndex === evt.oldIndex) {
          return;
        }
        if (recover) {
          // 处理受控：拖拽列表恢复原始排序，等待外部数据 data 变化，更新最终顺序
          dragInstanceTmp?.sort([...lastColList.value]);
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
        // Vue3 ignore next line
        context.emit('drag-sort', params);
      },
      ...props.dragSortOptions,
    };
    if (!container) {
      return;
    }
    dragInstanceTmp = new Sortable(container, options);
    return dragInstanceTmp;
  };

  // 列拖拽排序：涉及到多级表头、自定义显示列 等综合场景
  const registerColDragEvent = (tableElement: HTMLElement) => {
    if (!isColDraggable.value || !tableElement) {
      return;
    }
    const trList = tableElement.querySelectorAll('thead > tr');
    if (trList.length <= 1) {
      const [container] = trList;
      const dragInstanceTmp = registerOneLevelColDragEvent(container as HTMLElement, true);
      lastColList.value = dragInstanceTmp?.toArray();
    } else {
      // 多级表头只抛出事件，不处理其他未知逻辑（如多层表头之间具体如何交换）
      trList.forEach((container) => {
        registerOneLevelColDragEvent(container as HTMLElement, false);
      });
    }
  };

  function setDragSortPrimaryTableRef(primaryTableElement: any) {
    primaryTableRef.value = primaryTableElement;
  }

  function setDragSortColumns(val: PrimaryTableCol[]) {
    columns.value = val;
  }

  // eslint-disable-next-line
  watch([primaryTableRef, columns, dragSort, extraParams], ([val, columns, dragSort, extraParams]) => {
    const primaryTableCmp = val as any;
    if (!val || !primaryTableCmp.$el || !extraParams.showElement) {
      return;
    }
    // regis after table tr rendered
    const timer = setTimeout(() => {
      registerRowDragEvent(primaryTableCmp.$el);
      registerColDragEvent(primaryTableCmp.$el);

      // initial after normal table header
      const timer1 = setTimeout(() => {
        if (primaryTableCmp.$refs.affixHeaderRef) {
          registerColDragEvent(primaryTableCmp.$refs.affixHeaderRef);
          clearTimeout(timer1);
        }
      });
      clearTimeout(timer);
    }, 60);
  });

  return {
    isRowDraggable,
    isRowHandlerDraggable,
    isColDraggable,
    setDragSortPrimaryTableRef,
    setDragSortColumns,
  };
}
