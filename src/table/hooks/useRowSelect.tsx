// 行选中相关功能：单选 + 多选

import { computed, toRefs, h, ref, watch } from 'vue';
import intersection from 'lodash/intersection';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import useDefaultValue from '../../hooks/useDefaultValue';
import {
  PrimaryTableCellParams,
  PrimaryTableCol,
  RowClassNameParams,
  TableRowData,
  TdPrimaryTableProps,
} from '../type';
import { filterDataByIds, isRowSelectedDisabled } from '../utils';
import useClassName from './useClassName';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import { ClassName } from '../../common';
import log from '../../_common/js/log';

export default function useRowSelect(props: TdPrimaryTableProps) {
  const { selectedRowKeys, columns, data, rowClassName } = toRefs(props);
  const { tableSelectedClasses } = useClassName();
  const selectedRowClassNames = ref();
  const [tSelectedRowKeys, setTSelectedRowKeys] = useDefaultValue(
    selectedRowKeys,
    props.defaultSelectedRowKeys || [],
    props.onSelectChange,
    'selectedRowKeys',
  );
  const selectColumn = computed(() => props.columns.find(({ type }) => ['multiple', 'single'].includes(type)));
  const canSelectedRows = computed(() => props.data.filter((row, rowIndex): boolean => !isDisabled(row, rowIndex)));
  // 选中的行，和所有可以选择的行，交集，用于计算 isSelectedAll 和 isIndeterminate
  const intersectionKeys = computed(() =>
    intersection(
      tSelectedRowKeys.value,
      canSelectedRows.value.map((t) => get(t, props.rowKey || 'id')),
    ),
  );

  watch(
    [data, columns, tSelectedRowKeys],
    () => {
      const disabledRowFunc = (p: RowClassNameParams<TableRowData>): ClassName =>
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
    const isIndeterminate =
      intersectionKeys.value.length > 0 && intersectionKeys.value.length < canSelectedRows.value.length;
    return () => (
      <Checkbox
        checked={intersectionKeys.value.length === canSelectedRows.value.length}
        indeterminate={isIndeterminate}
        disabled={!canSelectedRows.value.length}
        onChange={handleSelectAll}
      />
    );
  }

  function renderSelectCell(p: PrimaryTableCellParams<TableRowData>) {
    const { col: column, row = {}, rowIndex } = p;
    const checked = tSelectedRowKeys.value.includes(get(row, props.rowKey || 'id'));
    const disabled: boolean =
      typeof column.disabled === 'function' ? column.disabled({ row, rowIndex }) : column.disabled;
    const checkProps = isFunction(column.checkProps) ? column.checkProps({ row, rowIndex }) : column.checkProps;
    const selectBoxProps: Object = {
      checked,
      disabled,
      ...checkProps,
      onClick: (e: MouseEvent) => {
        // 选中行功能中，点击 checkbo/radio 需阻止事件冒泡，避免触发不必要的 onRowClick
        e?.stopPropagation();
      },
      onChange: () => handleSelectChange(row),
    };
    if (column.type === 'single') return <Radio {...selectBoxProps} />;
    if (column.type === 'multiple') return <Checkbox {...selectBoxProps} />;
    return null;
  }

  function handleSelectChange(row: TableRowData = {}) {
    let selectedRowKeys = [...tSelectedRowKeys.value];
    const reRowKey = props.rowKey || 'id';
    const id = get(row, reRowKey);
    const selectedRowIndex = selectedRowKeys.indexOf(id);
    const isExisted = selectedRowIndex !== -1;
    if (selectColumn.value.type === 'multiple') {
      isExisted ? selectedRowKeys.splice(selectedRowIndex, 1) : selectedRowKeys.push(id);
    } else if (selectColumn.value.type === 'single') {
      selectedRowKeys = !isExisted ? [id] : [];
    } else {
      log.warn('Table', '`column.type` must be one of `multilpe` and `single`');
      return;
    }
    setTSelectedRowKeys(selectedRowKeys, {
      selectedRowData: filterDataByIds(props.data, selectedRowKeys, reRowKey),
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
      selectedRowData: filterDataByIds(props.data, allIds, reRowKey),
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
      cell: (_: typeof h, p: PrimaryTableCellParams<TableRowData>) => renderSelectCell(p),
      title: col.type === 'multiple' ? getSelectedHeader() : '',
    };
  }

  return {
    selectedRowClassNames,
    formatToRowSelectColumn,
  };
}
