import { SetupContext, computed, toRefs, ref } from 'vue';
import isFunction from 'lodash/isFunction';
import { SortInfo, TdPrimaryTableProps, PrimaryTableCol, TableRowData } from '../type';
import SorterButton from '../sorter-button';
import useDefaultValue from '../../hooks/useDefaultValue';

export type SortMap = Record<string, SortInfo & { index: number }>;

export default function useSorter(props: TdPrimaryTableProps, { emit, slots }: SetupContext) {
  const { sort, data } = toRefs(props);
  const originalData = ref();
  // uncontroll and controll
  const [tSortInfo, setTSortInfo] = useDefaultValue(sort, props.defaultSort, props.onSortChange, 'sort');
  const [tData, setTData] = useDefaultValue(data, [], props.onDataChange, 'data');
  // 本地数据排序：用于记录哪些字段是自定义排序函数
  const sorterFuncMap = computed(() => getSorterFuncMap(props.columns));

  const sortArray = computed<Array<SortInfo>>(() => {
    const sort = tSortInfo.value;
    if (!sort) return [];
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
        // eslint-disable-next-line no-param-reassign
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
    if (!Object.keys(sorterFuncMap.value).length) return;
    if (!originalData.value) {
      originalData.value = tData.value;
    }
    const isEmptyArraySort = !sort || (sort instanceof Array && !sort.length);
    const isEmptyObjectSort = !(sort instanceof Array) && !sort?.sortBy;
    if (isEmptyArraySort || isEmptyObjectSort) {
      setTData(originalData.value);
      return originalData.value;
    }
    const formatedSort = sort instanceof Array ? sort : [sort];
    // data 为受控属性，data.slice() 浅拷贝，防止 sort 导致原数据变异
    const newData: TableRowData[] = tData.value.slice().sort((a: TableRowData, b: TableRowData) => {
      let sortResult = 0;
      for (let i = 0, len = formatedSort.length; i < len; i++) {
        const item = formatedSort[i];
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
    if (JSON.stringify(newData) === JSON.stringify(tData.value)) return;
    setTData(newData);
    return newData;
  }

  function handleSortHeaderClick(col: PrimaryTableCol<TableRowData>) {
    let sortInfo: SortInfo | Array<SortInfo>;
    if (props.multipleSort) {
      sortInfo = getMultipleNextSort(col);
    } else {
      sortInfo = getSingleNextSort(col);
    }
    // 本地数据 data 排序，需同时抛出 data-change
    const newData = handleDataSort(sortInfo);
    const currentData = newData || tData.value;
    const currentDataSource = currentData;
    setTSortInfo(sortInfo, { currentDataSource, col });

    props.onChange?.({ sorter: sortInfo }, { currentData, trigger: 'sorter' });
    // Vue3 ignore next line
    emit('change', { sorter: sortInfo }, { currentData, col, trigger: 'sorter' });
  }

  function getSortOrder(descending: boolean) {
    if (descending === undefined) return;
    return descending ? 'desc' : 'asc';
  }

  // 排序行为：降序 -> 升序 -> 取消排序。只有 sortType 包含的排序方式才能进行排序。
  function getNextDescending(current: SortInfo, col: PrimaryTableCol): boolean {
    const { descending } = current || {};
    const { sortType = 'all' } = col;
    if (descending === true && ['asc', 'all'].includes(sortType)) return false;
    if (descending === undefined && ['desc', 'all'].includes(sortType)) return true;
  }

  // 点击新排序字段，则默认按照降序排序；点击原字段，则排序字段不变仅切换排序方式
  function getSingleNextSort(col: PrimaryTableCol): SortInfo {
    const { colKey } = col;
    const current = sortMap.value[colKey];
    const next = getNextDescending(current, col);
    if (next === undefined) return;
    return { sortBy: colKey, descending: next };
  }

  function getMultipleNextSort(col: PrimaryTableCol<TableRowData>): Array<SortInfo> {
    const sort = tSortInfo.value;
    if (!(sort instanceof Array)) return;
    const { colKey } = col;
    const result = [...sort];
    for (let i = 0, len = sort.length; i < len; i++) {
      if (sort[i].sortBy === colKey) {
        const next = getSingleNextSort(col);
        next ? (result[i] = next) : result.splice(i, 1);
        return result;
      }
    }
    result.push({ sortBy: colKey, descending: true });
    return result;
  }

  function renderSortIcon({ col }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    if (!col.sorter) return null;
    const nextSort = getSingleNextSort(col);
    const sorterButtonsProps = {
      sortType: col.sortType,
      sortOrder: getSortOrder(sortMap.value[col.colKey]?.descending),
      nextSortOrder: getSortOrder(nextSort?.descending),
      sortIcon: props.sortIcon,
    };
    return (
      <SorterButton
        scopedSlots={{ sortIcon: slots.sortIcon }}
        props={sorterButtonsProps}
        onClick={() => handleSortHeaderClick(col)}
      />
    );
  }

  return {
    renderSortIcon,
  };
}
