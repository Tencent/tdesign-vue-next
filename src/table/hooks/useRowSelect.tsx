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
  const tRowClassNames = ref();
  const [tSelectedRowKeys, setTSelectedRowKeys] = useDefaultValue(
    selectedRowKeys,
    props.defaultSelectedRowKeys || [],
    props.onSelectChange,
    'selectedRowKeys',
  );
  const selectColumn = computed(() => props.columns.find(({ type }) => ['multiple', 'single'].includes(type)));
  const canSelectedRows = computed(() => props.data.filter((row, rowIndex): boolean => !isDisabled(row, rowIndex)));
  // 选中的行，和所有可以选择的行，交集，用于计算 isSelectedAll 和 isIndeterminate
  const inersectionKeys = computed(() =>
    intersection(
      tSelectedRowKeys.value,
      canSelectedRows.value.map((t) => get(t, props.rowKey || 'id')),
    ),
  );

  watch(
    [data, columns, rowClassName, tSelectedRowKeys],
    () => {
      if (!selectColumn.value) {
        tRowClassNames.value = rowClassName.value;
        return;
      }
      const disabledRowFunc = selectColumn.value.disabled
        ? (p: RowClassNameParams<TableRowData>): ClassName =>
            selectColumn.value.disabled(p) ? tableSelectedClasses.disabled : ''
        : undefined;
      const selected = new Set(tSelectedRowKeys.value);
      const selectedRowClassFunc = ({ row }: RowClassNameParams<TableRowData>) =>
        selected.has(get(row, props.rowKey || 'id')) ? tableSelectedClasses.selected : '';
      tRowClassNames.value = [rowClassName.value, disabledRowFunc, selectedRowClassFunc].filter((v) => v);
    },
    { immediate: true },
  );

  function isDisabled(row: Record<string, any>, rowIndex: number): boolean {
    return isRowSelectedDisabled(selectColumn.value, row, rowIndex);
  }

  function getSelectedHeader() {
    const isIndeterminate =
      inersectionKeys.value.length > 0 && inersectionKeys.value.length < canSelectedRows.value.length;
    return () => (
      <Checkbox
        checked={inersectionKeys.value.length === canSelectedRows.value.length}
        indeterminate={isIndeterminate}
        disabled={!canSelectedRows.value.length}
        {...{ on: { change: handleSelectAll } }}
      />
    );
  }

  function renderSelectCell(p: PrimaryTableCellParams<TableRowData>) {
    const { col: column, row = {}, rowIndex } = p;
    const checked = tSelectedRowKeys.value.includes(get(row, props.rowKey || 'id'));
    const disabled = typeof column.disabled === 'function' ? column.disabled({ row, rowIndex }) : column.disabled;
    const checkProps = isFunction(column.checkProps) ? column.checkProps({ row, rowIndex }) : column.checkProps;
    const selectBoxProps = {
      props: {
        checked,
        ...column,
        type: column.type,
        disabled,
        rowIndex,
        ...checkProps,
      },
      on: {
        click: (e: MouseEvent) => {
          // 选中行功能中，点击 checkbo/radio 需阻止事件冒泡，避免触发不必要的 onRowClick
          e?.stopPropagation();
        },
        // radio 单选框可再点击一次关闭选择，input / change 事件无法监听
        change: () => handleSelectChange(row),
      },
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
    tRowClassNames,
    formatToRowSelectColumn,
  };
}
