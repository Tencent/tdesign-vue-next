// 表格 行拖拽 + 列拖拽功能
import { SetupContext, computed, toRefs, ref, watch, h } from 'vue';
import Sortable, { SortableEvent, SortableOptions, MoveEvent } from 'sortablejs';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { TableRowData, TdPrimaryTableProps, DragSortContext } from '../type';
import useClassName from './useClassName';
import log from '../../_common/js/log';
import { hasClass } from '../../utils/dom';
import swapDragArrayElement from '../../_common/js/utils/swapDragArrayElement';
import { BaseTableColumns } from '../interface';
import { getColumnDataByKey, getColumnIndexByKey } from '../utils';

export default function useDragSort(props: TdPrimaryTableProps, context: SetupContext) {
  const { sortOnRowDraggable, dragSort, data, rowKey } = toRefs(props);
  const { tableDraggableClasses, tableBaseClass, tableFullRowClasses } = useClassName();
  const primaryTableRef = ref(null);
  const columns = ref<BaseTableColumns>(props.columns || []);
  // @ts-ignore 判断是否有拖拽列
  const dragCol = computed(() => columns.value.find((item) => item.colKey === 'drag'));
  // 行拖拽判断条件
  const isRowDraggable = computed(() => sortOnRowDraggable.value || dragSort.value === 'row');
  // 行拖拽判断条件-手柄列
  const isRowHandlerDraggable = computed(
    () => ['row-handler', 'row-handler-col'].includes(dragSort.value) && !!dragCol.value,
  );
  // 列拖拽判断条件
  const isColDraggable = computed(() => ['col', 'row-handler-col'].includes(dragSort.value));
  // 行拖拽排序，存储上一次的变化结果
  const lastRowList = ref([]);
  // 列拖拽排序，存储上一次的变化结果
  const lastColList = ref([]);

  if (props.sortOnRowDraggable) {
    log.error('Table', "`sortOnRowDraggable` is going to be deprecated, use dragSort='row' instead.");
  }

  watch(
    [data],
    ([data]) => {
      lastRowList.value = data?.map((item) => get(item, rowKey.value)) || [];
    },
    { immediate: true },
  );

  watch(
    columns,
    (columns) => {
      lastColList.value = columns ? columns.map((t) => t.colKey) : [];
    },
    { immediate: true },
  );

  // 行拖拽排序
  const registerRowDragEvent = (element: HTMLDivElement): void => {
    if (!isRowHandlerDraggable.value && !isRowDraggable.value) return;
    const dragContainer = element?.querySelector('tbody');
    if (!dragContainer) {
      console.error('tbody does not exist.');
      return null;
    }
    // 拖拽实例
    let dragInstanceTmp: Sortable = null;
    const baseOptions: SortableOptions = {
      animation: 150,
      ...props.dragSortOptions,
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      filter: `.${tableFullRowClasses.base}`, // 过滤首行尾行固定
      onMove: (evt: MoveEvent) => !hasClass(evt.related, tableFullRowClasses.base),
      onEnd(evt: SortableEvent) {
        // 处理受控：拖拽列表恢复原始排序
        dragInstanceTmp?.sort(lastRowList.value);
        let { oldIndex: currentIndex, newIndex: targetIndex } = evt;
        if ((isFunction(props.firstFullRow) && props.firstFullRow(h)) || context.slots.firstFullRow) {
          currentIndex -= 1;
          targetIndex -= 1;
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
    };

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
      ...props.dragSortOptions,
      dataIdAttr: 'data-colkey',
      direction: 'vertical',
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      handle: `.${tableBaseClass.thCellInner}`,
      onEnd: (evt: SortableEvent) => {
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
      },
    };
    dragInstanceTmp = new Sortable(container, options);
    return dragInstanceTmp;
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
      trList.forEach((container) => {
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

  // 注册拖拽事件
  watch([primaryTableRef], ([val]: [any]) => {
    if (!val || !val.$el) return;
    registerRowDragEvent(val.$el);
    registerColDragEvent(val.$el);
    /** 待表头节点准备完成后 */
    const timer = setTimeout(() => {
      if (val.$refs.affixHeaderRef) {
        registerColDragEvent(val.$refs.affixHeaderRef);
      }
      clearTimeout(timer);
    });
  });

  return {
    isRowDraggable,
    isRowHandlerDraggable,
    isColDraggable,
    setDragSortPrimaryTableRef,
    setDragSortColumns,
  };
}
