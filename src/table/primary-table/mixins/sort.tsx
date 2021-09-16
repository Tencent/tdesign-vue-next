import { defineComponent, VNode } from 'vue';
import isFunction from 'lodash/isFunction';
import { PrimaryTableProps } from '@src/table';
import SorterButton from '../sorter-button';
import { prefix } from '../../../config';
import {
  SortInfo, PrimaryTableCol, TdPrimaryTableProps, SortType, DataType,
} from '../../type';
import primaryTableProps from '../../primary-table-props';
import baseTableProps from '../../base-table-props';
import { emitEvent } from '../../../utils/event';
import { getTitle } from '../../util/common';

type Columns = TdPrimaryTableProps['columns'];
type SorterChangeContext = Parameters<TdPrimaryTableProps['onSortChange']>;
type ChangeContext = Parameters<TdPrimaryTableProps['onChange']>;
type TableData = TdPrimaryTableProps['data'];

export default defineComponent({
  name: `${prefix}-primary-table-sort`,
  components: {
    SorterButton,
  },
  props: {
    data: baseTableProps.data,
    columns: primaryTableProps.columns,
    sort: primaryTableProps.sort,
    multipleSort: primaryTableProps.multipleSort,
  },
  emits: ['data-change', 'sort-change', 'change'],
  data() {
    return {
      // 用于记录哪些字段是自定义排序函数
      sorterFuncMap: {},
    };
  },
  computed: {
    sortArray(): Array<SortInfo> {
      const { sort } = this;
      if (!sort) return [];
      return Array.isArray(sort) ? sort : [sort];
    },
    sortMap(): Record<string, SortInfo & { index: number }> {
      const sortMap = {};
      this.sortArray.forEach((info, index) => {
        const { sortBy } = info;
        sortMap[sortBy] = {
          index,
          ...info,
        };
      });
      return sortMap;
    },
    localDataSort(): boolean {
      return (!!Object.keys(this.sorterFuncMap).length);
    },
  },
  methods: {
    // 本地排序功能中，多字段排序需注意优先级
    handleDataSort(): TableData {
      const { data, sort } = this;
      if (!sort || !this.localDataSort) return;
      const formatedSort = sort instanceof Array ? sort : [sort];
      // data为受控的，data.slice()浅拷贝，防止sort导致原数据变异
      const newData: TableData = data.slice().sort((a: TableData[0], b: TableData[0]) => {
        let sortResult = 0;
        for (let i = 0, len = formatedSort.length; i < len; i++) {
          const item = formatedSort[i];
          const sortFunc = this.sorterFuncMap[item.sortBy];
          // 上一个排序字段值相同时才会进行下一个字段的大小对比
          if (sortResult === 0 && sortFunc) {
            sortResult = item.descending ? sortFunc(b, a) : sortFunc(a, b);
            if (sortResult !== 0) {
              sortResult = sortResult > 0 ? 1 : -1;
            }
          } else {
            break;
          }
        }
        return sortResult;
      });
      // Data 变化返回的是数据引用，为避免死循环，特此检测排序数据前后是否相同，如果相同则不再触发事件
      if (JSON.stringify(newData) === JSON.stringify(this.data)) return;
      emitEvent<Parameters<PrimaryTableProps['onDataChange']>>(this, 'data-change', newData);
      return newData;
    },
    needSort(column: PrimaryTableCol): boolean {
      const { sorter, sortType } = column;
      return sorter && (!sortType || (Array.isArray(sortType) && sortType.length > 0) || typeof sortType === 'string');
    },
    getNextSortOrder(currentSortOrder: SortType, sortType: SortType) {
      const sorterTypes: Array<SortType> = (!sortType || sortType === 'all') ? ['desc', 'asc'] : [sortType];
      const idx: number = (sorterTypes.indexOf(currentSortOrder) + 1) % (sorterTypes.length + 1);
      return sorterTypes[idx];
    },
    handleSortHeaderClick(col: PrimaryTableCol) {
      // 本地数据 data 排序，需同时抛出 data-change
      const newData = this.handleDataSort();
      let sortInfo: SortInfo | Array<SortInfo>;
      if (this.multipleSort) {
        sortInfo = this.getMultipleNextSort(col);
      } else {
        sortInfo = this.getSingleNextSort(col);
      }
      emitEvent<SorterChangeContext>(this, 'sort-change', sortInfo, {
        currentDataSource: newData || this.data,
        col,
      });
      emitEvent<ChangeContext>(
        this, 'change',
        { sorter: sortInfo },
        { trigger: 'sorter', currentData: newData || this.data },
      );
    },
    getSortColumn(colKey: string) {
      return this.columns.find((column) => column.colKey === colKey);
    },
    getSortOrder(descending: boolean) {
      if (descending === undefined) return;
      return descending ? 'desc' : 'asc';
    },
    // 排序行为：降序 -> 升序 -> 取消排序。只有 sortType 包含的排序方式才能进行排序。
    getNextDescending(current: SortInfo, col: Columns[0]): boolean {
      const { descending } = current || {};
      const { sortType = 'all' } = col;
      if (descending === true && ['asc', 'all'].includes(sortType)) return false;
      if (descending === undefined && ['desc', 'all'].includes(sortType)) return true;
    },
    // 点击新排序字段，则默认按照降序排序；点击原字段，则排序字段不变仅切换排序方式
    getSingleNextSort(col: Columns[0]): SortInfo {
      const { colKey } = col;
      const current = this.sortMap[colKey];
      const next = this.getNextDescending(current, col);
      if (next === undefined) return;
      return { sortBy: colKey, descending: next };
    },
    getMultipleNextSort(col: PrimaryTableCol<DataType>): Array<SortInfo> {
      if (!(this.sort instanceof Array)) return;
      const { colKey } = col;
      const result = [...this.sort];
      for (let i = 0, len = this.sort.length; i < len; i++) {
        if (this.sort[i].sortBy === colKey) {
          const next = this.getSingleNextSort(col);
          next ? (result[i] = next) : result.splice(i, 1);
          return result;
        }
      }
      result.push({ sortBy: colKey, descending: true });
      return result;
    },
    getSorterColumns(columns: Columns): Columns {
      const r = columns.map((item, index: number) => {
        const column: PrimaryTableCol = { ...item };
        if (isFunction(column.sorter)) {
          this.sorterFuncMap[column.colKey] = column.sorter;
        }
        const needSort = this.needSort(column);
        if (needSort) {
          const { sortType = 'all', colKey } = column;
          const nextSort = this.getSingleNextSort(column);
          const sorterButtonsProps = {
            onClick: () => this.handleSortHeaderClick(column),
            sortType,
            sortOrder: this.getSortOrder(this.sortMap[colKey]?.descending),
            nextSortOrder: this.getSortOrder(nextSort?.descending),
            // class: `${prefix}-table-sort-icon`,
          };
          const title = getTitle(this, column, index);
          column.title = () => (
            <div class={`${prefix}-table__cell--sortable`}>
              <div class={`${prefix}-table__cell--title`}>
                <div>{title}</div>
                {<SorterButton {...sorterButtonsProps} />}
              </div>
            </div>
          );
        }
        return column;
      });
      this.handleDataSort();
      return r;
    },
  },
});
