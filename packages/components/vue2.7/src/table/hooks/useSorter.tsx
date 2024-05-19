import type {
  CreateElement,
  SetupContext,
} from '@td/adapter-vue';
import {
  computed,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { get, isFunction } from 'lodash-es';
import type {
  PrimaryTableCol,
  SortInfo,
  TableRowData,
  TdPrimaryTableProps,
} from '@td/intel/components/table/type';
import { useDefaultValue } from '@td/adapter-hooks';
import SorterButton from '../sorter-button';

export type SortMap = Record<string, SortInfo & { index: number }>;

export default function useSorter(props: TdPrimaryTableProps, { emit, slots }: SetupContext) {
  const { sort, data } = toRefs(props);
  const originalData = ref();
  // uncontrol and control
  const [tSortInfo, setTSortInfo] = useDefaultValue(sort, props.defaultSort, props.onSortChange, 'sort', 'sort-change');
  const [tData, setTData] = useDefaultValue(data, [], props.onDataChange, 'data', 'data-change');
  // 本地数据排序：用于记录哪些字段是自定义排序函数
  const sorterFuncMap = computed(() => getSorterFuncMap(props.columns));
  const innerSort = ref<SortInfo | SortInfo[]>();

  const sortArray = computed<Array<SortInfo>>(() => {
    const sort = tSortInfo.value;
    if (!sort) {
      return [];
    }
    return Array.isArray(sort) ? sort : [sort];
  });

  const sortMap = computed<SortMap>(() => {
    const sortMap = {};
    sortArray.value.forEach((info, index) => {
      const { sortBy } = info;
      sortMap[sortBy] = { index, ...info };
    });
    return sortMap;
  });

  function getSorterFuncMap(columns: PrimaryTableCol[], map: { [key: string]: Function } = {}) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (isFunction(col.sorter)) {
        map[col.colKey] = col.sorter;
      }
      // 多级表头中的排序功能
      if (col.children?.length) {
        getSorterFuncMap(col.children, map);
      }
    }
    return map;
  }

  function handleDataSort(sortInfo: SortInfo | Array<SortInfo>) {
    const sort = sortInfo;
    if (!Object.keys(sorterFuncMap.value).length) {
      return;
    }
    if (!originalData.value) {
      originalData.value = tData.value;
    }
    const isEmptyArraySort = !sort || (Array.isArray(sort) && !sort.length);
    const isEmptyObjectSort = !(Array.isArray(sort)) && !sort?.sortBy;
    if (isEmptyArraySort || isEmptyObjectSort) {
      setTData(originalData.value, { trigger: 'sort' });
      return originalData.value;
    }
    const formattedSort = Array.isArray(sort) ? sort : [sort];
    // data 为受控属性，data.slice() 浅拷贝，防止 sort 导致原数据变异
    const newData: TableRowData[] = tData.value.slice().sort((a: TableRowData, b: TableRowData) => {
      let sortResult = 0;
      for (let i = 0, len = formattedSort.length; i < len; i++) {
        const item = formattedSort[i];
        const sortFunc = sorterFuncMap.value[item.sortBy];
        // 上一个排序字段值相同时才会进行下一个字段的大小对比
        if (sortResult === 0 && sortFunc) {
          sortResult = item.descending ? sortFunc(b, a) : sortFunc(a, b);
        } else {
          break;
        }
      }
      return sortResult;
    });
    // Data 变化返回的是数据引用，为避免死循环，特此检测排序数据前后是否相同，如果相同则不再触发事件
    if (JSON.stringify(newData) === JSON.stringify(tData.value)) {
      return;
    }
    setTData(newData, { trigger: 'sort' });
    return newData;
  }

  function handleSortHeaderClick(col: PrimaryTableCol<TableRowData>, p: { descending: boolean }) {
    let sortInfo: SortInfo | Array<SortInfo>;
    if (props.multipleSort) {
      sortInfo = getMultipleNextSort(col, p);
    } else {
      const sort = Array.isArray(tSortInfo.value) ? tSortInfo.value[0] : tSortInfo.value;
      sortInfo = getSingleNextSort(col, sort, p);
    }
    // 本地数据 data 排序，需同时抛出 data-change
    const newData = handleDataSort(sortInfo);
    const currentData = newData || tData.value;
    const currentDataSource = currentData;
    setTSortInfo(sortInfo, { currentDataSource, col });
    props.onChange?.({ sorter: sortInfo }, { currentData, trigger: 'sorter' });
    // Vue3 ignore next line
    emit('change', { sorter: sortInfo }, { currentData, col, trigger: 'sorter' });
    innerSort.value = sortInfo;
  }

  function getSortOrder(descending: boolean) {
    if (descending === undefined) {
      return;
    }
    return descending ? 'desc' : 'asc';
  }

  // 点击新排序字段，则默认按照降序排序；点击原字段，则排序字段不变仅切换排序方式
  function getSingleNextSort(col: PrimaryTableCol, sortInfo: SortInfo, p: { descending: boolean }): SortInfo {
    // 排序字段和排序方式均相同，则取消排序
    if (sortInfo && sortInfo.sortBy === col.colKey && sortInfo.descending === p.descending) {
      return undefined;
    }
    return { sortBy: col.colKey, descending: p.descending };
  }

  function getMultipleNextSort(col: PrimaryTableCol<TableRowData>, p: { descending: boolean }): Array<SortInfo> {
    const sort = tSortInfo.value;
    if (!(Array.isArray(sort))) {
      return;
    }
    const { colKey } = col;
    const result = [...sort];
    for (let i = 0, len = sort.length; i < len; i++) {
      if (sort[i].sortBy === colKey) {
        const next = getSingleNextSort(col, sort[i], p);
        next ? (result[i] = next) : result.splice(i, 1);
        return result;
      }
    }
    result.push({ sortBy: colKey, descending: p.descending });
    return result;
  }

  function renderSortIcon(h: CreateElement, { col }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    if (!col.sorter) {
      return null;
    }
    const sorterButtonsProps = {
      sortType: col.sortType,
      sortOrder: getSortOrder(sortMap.value[col.colKey]?.descending),
      sortIcon: props.sortIcon,
      local: props.locale,
      hideSortTips: props.hideSortTips,
    };
    return (
      <SorterButton
        scopedSlots={{ sortIcon: slots.sortIcon }}
        props={sorterButtonsProps}
        on={{
          'sort-icon-click': (_: MouseEvent, p: { descending: boolean }) => handleSortHeaderClick(col, p),
        }}
      />
    );
  }

  const isSortInfoSame = (a: SortInfo | SortInfo[], b: SortInfo | SortInfo[]) => {
    const tmpSortInfo = Array.isArray(a) ? a : [a];
    const tmpInnerSortInfo = Array.isArray(b) ? b : [b];
    if (tmpSortInfo.length && !b) {
      return false;
    }
    // eslint-disable-next-line
    for (let i = 0, len = tmpSortInfo.length; i < len; i++) {
      const item = tmpSortInfo[i];
      const result = tmpInnerSortInfo.find(t => t.sortBy === item.sortBy);
      if (!result) {
        return false;
      }
      return item.descending === result.descending;
    }
  };

  /**
   * 如果外部的排序不为空，且和内部排序字段不同，说明传入的 sortInfo 和 data 可能存在不一致，
   * 此时，需要在组件内部进行排序，并输出事件
   */
  watch(
    tSortInfo,
    () => {
      if (!tSortInfo.value) {
        return;
      }
      // isSortInfoSame 的两个参数顺序不可变
      if (!isSortInfoSame(tSortInfo.value, innerSort.value)) {
        handleDataSort(tSortInfo.value);
      }
    },
    { immediate: true },
  );

  // async data and default data is empty
  watch(
    () => props.data,
    (val = [], previousVal = []) => {
      if (val.map(t => get(t, props.rowKey)).join() !== previousVal.map(t => get(t, props.rowKey)).join()) {
        originalData.value = props.data;
      }
    },
  );

  return {
    renderSortIcon,
  };
}
