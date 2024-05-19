import type {
  CreateElement,
  SetupContext,
} from '@td/adapter-vue';
import { computed, ref, toRefs, watch,
} from '@td/adapter-vue';
import { isFunction } from 'lodash-es';
import { useConfig, useDefaultValue, useTNodeDefault } from '@td/adapter-hooks';
import { Button as TButton } from '@td/component';
import { getColumnsResetValue } from '@td/shared/_common/js/table/utils';
import type {
  FilterValue,
  PrimaryTableCol,
  TableFilterChangeContext,
  TableRowData,
  TdPrimaryTableProps,
} from '@td/intel/components/table/type';
import TableFilterController from '../filter-controller';
import useClassName from './useClassName';
import { renderTitle } from './useTableHeader';

function isFilterValueExist(value: any) {
  const isArrayTrue = Array.isArray(value) && value.length;
  const isObject = typeof value === 'object' && !(Array.isArray(value));
  const isObjectTrue = isObject && Object.keys(value).length;
  return isArrayTrue || isObjectTrue || !['null', '', 'undefined'].includes(String(value));
}

// 筛选条件不为空，才需要显示筛选结果行
function filterEmptyData(data: FilterValue) {
  const newFilterValue: FilterValue = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];
    if (isFilterValueExist(item)) {
      newFilterValue[key] = item;
    }
  });
  return newFilterValue;
}

export default function useFilter(props: TdPrimaryTableProps, context: SetupContext) {
  const primaryTableRef = ref(null);
  const { t, global } = useConfig('table', props.locale);
  const renderTNode = useTNodeDefault();
  const { filterValue, columns } = toRefs(props);
  const { tableFilterClasses, isFocusClass } = useClassName();
  const isTableOverflowHidden = ref<boolean>();

  // unControl and control
  const [tFilterValue, setTFilterValue] = useDefaultValue(
    filterValue,
    props.defaultFilterValue,
    props.onFilterChange,
    'filterValue',
    'filter-change',
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

  function renderFirstFilterRow(h: CreateElement) {
    if (hasEmptyCondition.value) {
      return null;
    }
    const defaultNode = (
      <div class={tableFilterClasses.result}>
        {/* <span>搜索 “{getFilterResultContent()}”，</span>
        <span>找到 {props.pagination?.total || props.data?.length} 条结果</span> */}
        {t(global.value.searchResultText, {
          result: getFilterResultContent(h),
          count: props.pagination?.total || props.data?.length,
        })}
        <TButton theme="primary" variant="text" onClick={onResetAll}>
          {global.value.clearFilterResultButtonText}
        </TButton>
      </div>
    );
    const filterContent = renderTNode('filterRow');
    if ((props.filterRow && !filterContent) || props.filterRow === null) {
      return null;
    }
    return <div class={tableFilterClasses.inner}>{filterContent || defaultNode}</div>;
  }

  // 获取搜索条件内容，存在 options 需要获取其 label 显示
  function getFilterResultContent(h: CreateElement): string {
    const arr: string[] = [];
    props.columns
      .filter(col => col.filter)
      .forEach((col, index) => {
        let value = tFilterValue.value[col.colKey];
        if (col.filter.list && !['null', '', 'undefined'].includes(String(value))) {
          const formattedValue = Array.isArray(value) ? value : [value];
          const label: string[] = [];
          col.filter.list.forEach((option) => {
            if (formattedValue.includes(option.value)) {
              label.push(option.label);
            }
          });
          value = label.join();
        }
        if (isFilterValueExist(value)) {
          const label = isFunction(col.filter?.label) ? col.filter.label(h) : col.filter?.label;
          const title = renderTitle(h, context.slots, col, index);
          arr.push(`${label || title}：${value}`);
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
      emitFilterChange(filterValue, 'filter-change', column);
    }
  }

  function emitFilterChange(
    filterValue: FilterValue,
    trigger: TableFilterChangeContext<TableRowData>['trigger'],
    column?: PrimaryTableCol,
  ) {
    setTFilterValue(filterValue, { col: column, trigger });

    props.onChange?.({ filter: filterValue }, { trigger: 'filter' });
    // Vue3 ignore next line
    context.emit('change', { filter: filterValue }, { trigger: 'filter' });
  }

  function onReset(column: PrimaryTableCol) {
    const filterValue: FilterValue = {
      ...tFilterValue.value,
      [column.colKey]:
        column.filter.resetValue
        ?? {
          single: '',
          multiple: [],
          input: '',
        }[column.filter.type]
        ?? '',
    };
    emitFilterChange(filterValue, 'reset', column);
  }

  function onResetAll() {
    const resetValue = getColumnsResetValue(columns.value);
    emitFilterChange(resetValue, 'clear', undefined);
  }

  function onConfirm(column: PrimaryTableCol) {
    emitFilterChange(innerFilterValue.value, 'confirm', column);
  }

  // 图标：内置图标，组件自定义图标，全局配置图标
  function renderFilterIcon(
    h: CreateElement,
    { col, colIndex }: { col: PrimaryTableCol<TableRowData>; colIndex: number },
  ) {
    return (
      <TableFilterController
        scopedSlots={{ filterIcon: context.slots.filterIcon }}
        local={props.locale}
        column={col}
        colIndex={colIndex}
        filterIcon={props.filterIcon}
        tFilterValue={tFilterValue.value}
        innerFilterValue={innerFilterValue.value}
        tableFilterClasses={tableFilterClasses}
        isFocusClass={isFocusClass}
        popupProps={col.filter.popupProps}
        primaryTableElement={primaryTableRef.value?.$el}
        on={{
          'reset': onReset,
          'confirm': onConfirm,
          'inner-filter-change': onInnerFilterChange,
          'visible-change': onPopupVisibleChange,
        }}
        attach={props.attach}
      >
      </TableFilterController>
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
