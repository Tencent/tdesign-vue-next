/**
 * 行选中相关功能：单选 + 多选
 */
import { computed, toRefs, h, ref, watch } from 'vue';
import { intersection } from 'lodash-es';
import { get } from 'lodash-es';
import { isFunction } from 'lodash-es';
import useDefaultValue from '../../hooks/useDefaultValue';
import {
  ActiveRowActionContext,
  PrimaryTableCellParams,
  PrimaryTableCol,
  RowClassNameParams,
  TableRowData,
  TdPrimaryTableProps,
} from '../type';
import { isRowSelectedDisabled } from '@tdesign/common-js/table/utils';
import { TableClassName } from './useClassName';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import log from '@tdesign/common-js/log/index';

export default function useRowSelect(
  props: TdPrimaryTableProps,
  tableSelectedClasses: TableClassName['tableSelectedClasses'],
) {
  const { selectedRowKeys, columns, rowKey, data, reserveSelectedRowOnPaginate, pagination } = toRefs(props);
  const currentPaginateData = ref<TableRowData[]>(
    pagination.value
      ? data.value.slice(
          (pagination.value.current - 1) * pagination.value.pageSize,
          pagination.value.current * pagination.value.pageSize,
        )
      : data.value,
  );
  const isLocalPagination = computed(() => {
    return (
      !!pagination.value &&
      !props.disableDataPage &&
      props.data.length > (pagination.value?.pageSize ?? pagination.value.defaultPageSize)
    );
  });
  const selectedRowClassNames = ref();
  const [tSelectedRowKeys, setTSelectedRowKeys] = useDefaultValue(
    selectedRowKeys,
    props.defaultSelectedRowKeys || [],
    props.onSelectChange,
    'selectedRowKeys',
  );
  const selectedRowDataMap = ref(new Map<string | number, TableRowData>());
  const selectColumn = computed(() => props.columns.find(({ type }) => ['multiple', 'single'].includes(type)));
  const selectionType = computed(() => props.rowSelectionType || selectColumn.value?.type || 'single');
  const canSelectedRows = computed(() => {
    const currentData = reserveSelectedRowOnPaginate.value ? data.value : currentPaginateData.value;
    return currentData.filter((row, rowIndex): boolean => !isDisabled(row, rowIndex));
  });
  // 选中的行，和所有可以选择的行，交集，用于计算 isSelectedAll 和 isIndeterminate
  const intersectionKeys = computed(() =>
    intersection(
      tSelectedRowKeys.value,
      canSelectedRows.value.map((t) => get(t, props.rowKey || 'id')),
    ),
  );

  const allowUncheck = computed(() => {
    if (props.rowSelectionAllowUncheck) return true;
    const singleSelectCol = selectionType.value === 'single';
    if (!singleSelectCol || !selectColumn.value?.checkProps || !('allowUncheck' in selectColumn.value?.checkProps))
      return false;
    return selectColumn.value.checkProps.allowUncheck;
  });

  watch(
    [data, columns, tSelectedRowKeys, selectColumn, rowKey],
    () => {
      const disabledRowFunc = (p: RowClassNameParams<TableRowData>) =>
        selectColumn.value.disabled(p) ? tableSelectedClasses.disabled : '';
      const disabledRowClass = selectColumn.value?.disabled ? disabledRowFunc : undefined;
      const selected = new Set(tSelectedRowKeys.value);
      const selectedRowClassFunc = ({ row }: RowClassNameParams<TableRowData>) => {
        const rowId = get(row, props.rowKey || 'id');
        return selected.has(rowId) ? tableSelectedClasses.selected : '';
      };
      const selectedRowClass = selected.size ? selectedRowClassFunc : undefined;
      selectedRowClassNames.value = [disabledRowClass, selectedRowClass];
    },
    { immediate: true },
  );

  // 在远程分页场景下，当前页全选功能的状态判定需基于当前页数据是否存在进行动态重新计算
  // 同步 currentPaginateData
  watch(
    [data, () => pagination.value?.current, () => pagination.value?.pageSize, () => props.disableDataPage],
    ([currentPropsData, pageCurrent, pageSizeFromPagination]) => {
      if (isLocalPagination.value) {
        // 本地分页
        const current = pageCurrent ?? pagination.value?.defaultCurrent ?? 1;
        const pageSize = pageSizeFromPagination ?? pagination.value?.defaultPageSize ?? 10;
        currentPaginateData.value = (currentPropsData || []).slice((current - 1) * pageSize, current * pageSize);
      } else {
        // 远程分页或无分页
        currentPaginateData.value = Array.isArray(currentPropsData) ? currentPropsData : [];
      }
    },
    { immediate: true },
  );

  function isDisabled(row: Record<string, any>, rowIndex: number): boolean {
    return isRowSelectedDisabled(selectColumn.value, row, rowIndex);
  }

  function getSelectedHeader() {
    return () => {
      const isIndeterminate =
        intersectionKeys.value.length > 0 && intersectionKeys.value.length < canSelectedRows.value.length;
      const isChecked =
        intersectionKeys.value.length !== 0 &&
        canSelectedRows.value.length !== 0 &&
        intersectionKeys.value.length === canSelectedRows.value.length;
      return (
        <Checkbox
          checked={isChecked}
          indeterminate={isIndeterminate}
          disabled={!canSelectedRows.value.length}
          onChange={handleSelectAll}
        />
      );
    };
  }

  function getRowSelectDisabledData(p: PrimaryTableCellParams<TableRowData>) {
    const { col, row, rowIndex } = p;
    const disabled: boolean = isFunction(col.disabled) ? col.disabled({ row, rowIndex }) : col.disabled;
    const checkProps = isFunction(col.checkProps) ? col.checkProps({ row, rowIndex }) : col.checkProps;
    return {
      disabled: disabled || checkProps?.disabled,
      checkProps,
    };
  }

  function renderSelectCell(p: PrimaryTableCellParams<TableRowData>) {
    const { col: column, row = {} } = p;
    const checked = tSelectedRowKeys.value.includes(get(row, props.rowKey || 'id'));
    const { disabled, checkProps } = getRowSelectDisabledData(p);
    const selectBoxProps: Object = {
      checked,
      disabled,
      ...checkProps,
      // 兼容处理不同的参数
      onClick: (e: MouseEvent | { e: MouseEvent }) => {
        // 选中行功能中，点击 checkbox/radio 需阻止事件冒泡，避免触发不必要的 onRowClick
        if (typeof e === 'object' && 'e' in e) {
          e.e?.stopPropagation();
        } else {
          e?.stopPropagation();
        }
      },
      onChange: () => handleSelectChange(row),
    };
    if (column.type === 'single') return <Radio {...selectBoxProps} />;
    if (column.type === 'multiple') {
      const isIndeterminate = props.indeterminateSelectedRowKeys?.length
        ? props.indeterminateSelectedRowKeys.includes(get(row, props.rowKey))
        : false;
      return <Checkbox indeterminate={isIndeterminate} {...selectBoxProps} />;
    }
    return null;
  }

  function handleSelectChange(row: TableRowData = {}) {
    let selectedRowKeys = [...tSelectedRowKeys.value];
    const reRowKey = props.rowKey || 'id';
    const id = get(row, reRowKey);
    const selectedRowIndex = selectedRowKeys.indexOf(id);
    const isExisted = selectedRowIndex !== -1;
    if (selectionType.value === 'multiple') {
      isExisted ? selectedRowKeys.splice(selectedRowIndex, 1) : selectedRowKeys.push(id);
    } else if (selectionType.value === 'single') {
      selectedRowKeys = isExisted && allowUncheck.value ? [] : [id];
    } else {
      log.warn('Table', '`column.type` must be one of `multiple` and `single`');
      return;
    }
    setTSelectedRowKeys(selectedRowKeys, {
      selectedRowData: selectedRowKeys.map((t) => selectedRowDataMap.value.get(t)),
      currentRowKey: id,
      currentRowData: row,
      type: isExisted ? 'uncheck' : 'check',
    });
  }

  function handleSelectAll(checked: boolean) {
    const reRowKey = props.rowKey || 'id';
    const currentPageData = reserveSelectedRowOnPaginate.value ? data.value : currentPaginateData.value;
    const currentPageKeys = currentPageData.map((record) => get(record, reRowKey));

    // 当前页可选row的key
    const canSelectedRowKeys = canSelectedRows.value.map((record) => get(record, reRowKey));

    let newSelectedRowKeys = [...tSelectedRowKeys.value];
    if (checked) {
      // 去重追加当前页可选row的key
      newSelectedRowKeys = [...new Set([...newSelectedRowKeys, ...canSelectedRowKeys])];
    } else {
      // 移除当前页可选row的key
      newSelectedRowKeys = newSelectedRowKeys.filter(
        (key) => !currentPageKeys.includes(key) || !canSelectedRowKeys.includes(key),
      );
    }

    // 非跨页多选，清空非当前页selectedRowKeys
    if (!props.reserveSelectedRowOnPaginate) {
      newSelectedRowKeys = newSelectedRowKeys.filter((key) => currentPageKeys.includes(key));
    }

    setTSelectedRowKeys(newSelectedRowKeys, {
      selectedRowData: newSelectedRowKeys.map((t) => selectedRowDataMap.value.get(t)),
      type: checked ? 'check' : 'uncheck',
      currentRowKey: 'CHECK_ALL_BOX',
    });
  }

  function formatToRowSelectColumn(col: PrimaryTableCol) {
    const isSelection = ['multiple', 'single'].includes(col.type);
    if (!isSelection) return col;
    return {
      ...col,
      width: col.width || 64,
      className: [tableSelectedClasses.checkCell, col.className],
      cell: (_: typeof h, p: PrimaryTableCellParams<TableRowData>) => renderSelectCell(p),
      title: col.type === 'multiple' ? getSelectedHeader() : col.title,
    };
  }

  const onInnerSelectRowClick: TdPrimaryTableProps['onRowClick'] = ({ row, index }) => {
    const selectedColIndex = props.columns.findIndex((item) => item.colKey === 'row-select');
    let disabled = false;
    if (selectedColIndex !== -1) {
      disabled = getRowSelectDisabledData({
        row,
        rowIndex: index,
        col: props.columns[selectedColIndex],
        colIndex: selectedColIndex,
      })?.disabled;
    }
    if (disabled) return;
    handleSelectChange(row);
  };

  watch(
    data,
    (newData) => {
      const reRowKey = props.rowKey || 'id';
      const currentPageData = pagination.value
        ? newData.slice(
            (pagination.value.current - 1) * pagination.value.pageSize,
            pagination.value.current * pagination.value.pageSize,
          )
        : newData;
      // 远程分页预加载当前页数据
      if (!isLocalPagination.value) {
        for (const row of currentPageData) {
          const id = get(row, reRowKey);
          selectedRowDataMap.value.set(id, row);
        }
      }
      // 本地分页预加载全部数据
      else {
        for (const row of newData) {
          const id = get(row, reRowKey);
          selectedRowDataMap.value.set(id, row);
        }
      }
    },
    { immediate: true },
  );

  // 分页切换时取消引用不需要的map
  watch(
    [currentPaginateData, reserveSelectedRowOnPaginate],
    ([val, isReserve]) => {
      const reRowKey = props.rowKey || 'id';
      const currentPageKeys = val.map((row) => get(row, reRowKey));
      const preservedKeys = new Set(tSelectedRowKeys.value);
      // 远程分页非跨页清空其他页dataMap
      if (!isLocalPagination.value && !isReserve) {
        for (const key of selectedRowDataMap.value.keys()) {
          if (!currentPageKeys.includes(key)) {
            selectedRowDataMap.value.delete(key);
          }
        }
        for (const row of val) {
          const id = get(row, reRowKey);
          selectedRowDataMap.value.set(id, row);
        }
      }
      // 远程分页跨页清空其他页未选项dataMap
      else if (!isLocalPagination.value && isReserve) {
        const keysToPreserve = new Set([...currentPageKeys, ...preservedKeys]);

        for (const key of selectedRowDataMap.value.keys()) {
          if (!keysToPreserve.has(key)) {
            selectedRowDataMap.value.delete(key);
          }
        }
        for (const row of val) {
          const id = get(row, reRowKey);
          selectedRowDataMap.value.set(id, row);
        }
      }
      // 本地分页
      else if (isLocalPagination.value) {
        for (const row of val) {
          const id = get(row, reRowKey);
          selectedRowDataMap.value.set(id, row);
        }
      }
    },
    { immediate: true },
  );

  // 是否开启了行选中功能
  const showRowSelect = computed(() => Boolean(selectColumn.value || props.selectOnRowClick || props.selectedRowKeys));

  const clearAllSelectedRowKeys = () => {
    setTSelectedRowKeys([], {
      selectedRowData: [],
      currentRowKey: undefined,
      currentRowData: undefined,
      type: 'uncheck',
    });
  };

  const handleRowSelectWithAreaSelection = ({ activeRowList, action }: ActiveRowActionContext<TableRowData>) => {
    if (!showRowSelect.value) return;

    if (action === 'clear') {
      clearAllSelectedRowKeys();
      return;
    }

    if (action === 'select-all') {
      handleSelectAll(true);
      return;
    }

    if (selectionType.value === 'single') {
      if (action === 'space-one-selection') {
        handleSelectChange(activeRowList[0].row);
      }
      return;
    }

    const validAreaSelection = activeRowList.filter(
      ({ row, rowIndex }) =>
        !getRowSelectDisabledData({
          row,
          rowIndex,
          col: selectColumn.value,
          colIndex: undefined,
        }).disabled,
    );
    if (!validAreaSelection.length) return;

    const reRowKey = props.rowKey || 'id';
    const areaSelectionKeys = validAreaSelection.map(({ row }) => get(row, reRowKey));
    const intersectionKeys = intersection(tSelectedRowKeys.value, areaSelectionKeys);
    const toCheck = intersectionKeys.length !== areaSelectionKeys.length;
    const clearedKeys = tSelectedRowKeys.value.filter((key) => !areaSelectionKeys.includes(key));
    const newSelectedRowKeys = toCheck ? [...new Set([...tSelectedRowKeys.value, ...areaSelectionKeys])] : clearedKeys;

    const currentRowData = action === 'space-one-selection' ? activeRowList[0].row : undefined;
    setTSelectedRowKeys(newSelectedRowKeys, {
      selectedRowData: activeRowList,
      currentRowKey: get(currentRowData, reRowKey),
      currentRowData,
      type: toCheck ? 'check' : 'uncheck',
    });
  };

  return {
    selectColumn,
    showRowSelect,
    selectedRowClassNames,
    currentPaginateData,
    setTSelectedRowKeys,
    formatToRowSelectColumn,
    onInnerSelectRowClick,
    handleRowSelectWithAreaSelection,
  };
}
