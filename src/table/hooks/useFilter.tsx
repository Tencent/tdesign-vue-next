import { toRefs, ref, watch, computed } from 'vue';
import useClassName from './useClassName';
import TButton from '../../button';
import { TdPrimaryTableProps, PrimaryTableCol, TableRowData, FilterValue } from '../type';
import useDefaultValue from '../../hooks/useDefaultValue';
import { useTNodeDefault } from '../../hooks/tnode';
import TableFilterController from '../filter-controller';
import { useConfig } from '../../hooks/useConfig';

// 筛选条件不为空，才需要显示筛选结果行
function filterEmptyData(data: FilterValue) {
  const newFilterValue: FilterValue = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];
    const isArrayTrue = item instanceof Array && item.length;
    const isObject = typeof item === 'object' && !(item instanceof Array);
    const isObjectTrue = isObject && Object.keys(item).length;
    if (isArrayTrue || isObjectTrue || !['null', '', 'undefined'].includes(String(item))) {
      newFilterValue[key] = item;
    }
  });
  return newFilterValue;
}

export default function useFilter(props: TdPrimaryTableProps) {
  const primaryTableRef = ref(null);
  const { t, global } = useConfig('table');
  const renderTNode = useTNodeDefault();
  const { filterValue } = toRefs(props);
  const { tableFilterClasses, isFocusClass } = useClassName();
  const isTableOverflowHidden = ref<boolean>();

  // unControl and control
  const [tFilterValue, setTFilterValue] = useDefaultValue(
    filterValue,
    props.defaultFilterValue,
    props.onFilterChange,
    'filterValue',
  );

  // 过滤内部值
  const innerFilterValue = ref<FilterValue>(tFilterValue.value);

  const hasEmptyCondition = computed(() => {
    const filterEmpty = filterEmptyData(tFilterValue.value || {});
    return !tFilterValue.value || !Object.keys(filterEmpty).length;
  });

  watch([tFilterValue], ([val]) => {
    innerFilterValue.value = val;
  });

  function renderFirstFilterRow() {
    if (hasEmptyCondition.value) return null;
    const defaultNode = (
      <div class={tableFilterClasses.result}>
        <span>
          {/* 搜索 “{getFilterResultContent()}”， */}
          {/* 找到 {props.pagination?.total || props.data?.length} 条结果 */}
          {t(global.value.searchResultText, {
            result: getFilterResultContent(),
            count: props.pagination?.total || props.data?.length,
          })}
        </span>
        <TButton theme="primary" variant="text" onClick={onResetAll}>
          {global.value.clearFilterResultButtonText}
        </TButton>
      </div>
    );
    const filterContent = renderTNode('filterRow');
    if (props.filterRow && !filterContent) return null;
    return <div class={tableFilterClasses.inner}>{filterContent || defaultNode}</div>;
  }

  // 获取搜索条件内容，存在 options 需要获取其 label 显示
  function getFilterResultContent(): string {
    const arr: string[] = [];
    props.columns
      .filter((col) => col.filter)
      .forEach((col) => {
        let value = tFilterValue.value[col.colKey];
        if (col.filter.list && !['null', '', 'undefined'].includes(String(value))) {
          const formattedValue = value instanceof Array ? value : [value];
          const label: string[] = [];
          col.filter.list.forEach((option) => {
            if (formattedValue.includes(option.value)) {
              label.push(option.label);
            }
          });
          value = label.join();
        }
        if (value) {
          arr.push(`${col.title}：${value}`);
        }
      });
    return arr.join('；');
  }

  function onInnerFilterChange(val: any, column: PrimaryTableCol) {
    const filterValue = {
      ...innerFilterValue.value,
      [column.colKey]: val,
    };
    innerFilterValue.value = filterValue;
    if (!column.filter.showConfirmAndReset) {
      emitFilterChange(filterValue, column);
    }
  }

  function emitFilterChange(filterValue: FilterValue, column?: PrimaryTableCol) {
    setTFilterValue(filterValue, { col: column });
    props.onChange?.({ filter: filterValue }, { trigger: 'filter' });
  }

  function onReset(column: PrimaryTableCol) {
    const filterValue: FilterValue = {
      ...tFilterValue.value,
      [column.colKey]:
        {
          single: '',
          multiple: [],
          input: '',
        }[column.filter.type] ||
        column.filter.resetValue ||
        '',
    };
    emitFilterChange(filterValue, column);
  }

  function onResetAll() {
    emitFilterChange({}, undefined);
  }

  function onConfirm(column: PrimaryTableCol) {
    emitFilterChange(innerFilterValue.value, column);
  }

  // 图标：内置图标，组件自定义图标，全局配置图标
  function renderFilterIcon({ col }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    return (
      <TableFilterController
        column={col}
        tFilterValue={tFilterValue.value}
        innerFilterValue={innerFilterValue.value}
        tableFilterClasses={tableFilterClasses}
        isFocusClass={isFocusClass}
        onReset={onReset}
        onConfirm={onConfirm}
        onInnerFilterChange={onInnerFilterChange}
        primaryTableElement={primaryTableRef.value?.$el}
        onVisibleChange={onPopupVisibleChange}
      ></TableFilterController>
    );
  }

  function setFilterPrimaryTableRef(primaryTableElement: any) {
    primaryTableRef.value = primaryTableElement;
  }

  function onPopupVisibleChange(visible: boolean) {
    if (visible && !isTableOverflowHidden.value) {
      isTableOverflowHidden.value = !visible;
    }
  }

  return {
    hasEmptyCondition,
    isTableOverflowHidden,
    renderFilterIcon,
    renderFirstFilterRow,
    setFilterPrimaryTableRef,
  };
}
