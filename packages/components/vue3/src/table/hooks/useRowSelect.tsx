/**
 * 行选中相关功能：单选 + 多选
 */
import { computed, toRefs, h, ref, watch } from '@td/adapter-vue';
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
import { isRowSelectedDisabled } from '../../_common/js/table/utils';
import { TableClassName } from './useClassName';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import log from '../../_common/js/log';

export default function useRowSelect(
  props: TdPrimaryTableProps,
  tableSelectedClasses: TableClassName['tableSelectedClasses'],
) {
  const { selectedRowKeys, columns, rowKey, data, reserveSelectedRowOnPaginate } = toRefs(props);
  const currentPaginateData = ref<TableRowData[]>(data.value);
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
    if (!singleSelectCol || !selectColumn.value || !('allowUncheck' in selectColumn.value?.checkProps)) return false;
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
    const canSelectedRowKeys = canSelectedRows.value.map((record) => get(record, reRowKey));
    const disabledSelectedRowKeys = selectedRowKeys.value?.filter((id) => !canSelectedRowKeys.includes(id)) || [];
    const allIds = checked ? [...disabledSelectedRowKeys, ...canSelectedRowKeys] : [...disabledSelectedRowKeys];
    setTSelectedRowKeys(allIds, {
      selectedRowData: checked ? allIds.map((t) => selectedRowDataMap.value.get(t)) : [],
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
    [data, rowKey],
    () => {
      for (let i = 0, len = data.value.length; i < len; i++) {
        selectedRowDataMap.value.set(get(data.value[i], rowKey.value || 'id'), data.value[i]);
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

    const areaSelectionKeys = validAreaSelection.map(({ row }) => get(row, props.rowKey));
    const intersectionKeys = intersection(tSelectedRowKeys.value, areaSelectionKeys);
    const toCheck = intersectionKeys.length !== areaSelectionKeys.length;
    const clearedKeys = tSelectedRowKeys.value.filter((key) => !areaSelectionKeys.includes(key));
    const newSelectedRowKeys = toCheck ? [...new Set(tSelectedRowKeys.value.concat(areaSelectionKeys))] : clearedKeys;

    const currentRowData = action === 'space-one-selection' ? activeRowList[0].row : undefined;
    setTSelectedRowKeys(newSelectedRowKeys, {
      selectedRowData: activeRowList,
      currentRowKey: get(currentRowData, props.rowKey),
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
