import type { CreateElement, SetupContext } from '@td/adapter-vue';
import {
  computed,
  toRefs,
} from '@td/adapter-vue';
import { ChevronRightCircleIcon as TdChevronRightCircleIcon } from 'tdesign-icons-vue';
import { get } from 'lodash-es';
import { useConfig, useDefaultValue, useGlobalIcon, useTNodeJSX } from '@td/adapter-hooks';
import type {
  PrimaryTableCellParams,
  PrimaryTableCol,
  RowEventContext,
  TableExpandedRowParams,
  TableRowData,
  TdPrimaryTableProps,
} from '@td/intel/components/table/type';
import useClassName from './useClassName';

export default function useRowExpand(props: TdPrimaryTableProps, context: SetupContext) {
  const { expandedRowKeys } = toRefs(props);
  const renderTNode = useTNodeJSX();
  const { t, global } = useConfig('table', props.locale);
  const { ChevronRightCircleIcon } = useGlobalIcon({ ChevronRightCircleIcon: TdChevronRightCircleIcon });
  const { tableExpandClasses, positiveRotate90, tableFullRowClasses } = useClassName();
  // controlled and uncontrolled
  const [tExpandedRowKeys, setTExpandedRowKeys] = useDefaultValue(
    expandedRowKeys,
    props.defaultExpandedRowKeys || [],
    props.onExpandChange,
    'expandedRowKeys',
    'expand-change',
  );

  const showExpandedRow = computed(() => Boolean(props.expandedRow || context.slots.expandedRow || context.slots['expanded-row']));

  const showExpandIconColumn = computed(() => props.expandIcon !== false && showExpandedRow.value);

  const isFirstColumnFixed = computed(() => props.columns?.[0]?.fixed === 'left');

  const onToggleExpand = (e: MouseEvent | KeyboardEvent, row: TableRowData) => {
    props.expandOnRowClick && e.stopPropagation();
    const currentId = get(row, props.rowKey || 'id');
    const index = tExpandedRowKeys.value.indexOf(currentId);
    const newKeys = [...tExpandedRowKeys.value];
    index !== -1 ? newKeys.splice(index, 1) : newKeys.push(currentId);
    setTExpandedRowKeys(newKeys, {
      expandedRowData: props.data.filter(t => newKeys.includes(get(t, props.rowKey || 'id'))),
      currentRowData: row,
    });
  };

  const renderExpandIcon = (h: CreateElement, p: PrimaryTableCellParams<TableRowData>) => {
    const { row, rowIndex } = p;
    const currentId = get(row, props.rowKey || 'id');
    const expanded = tExpandedRowKeys.value.includes(currentId);
    const icon = renderTNode('expandIcon', {
      defaultNode: t(global.value.expandIcon) || <ChevronRightCircleIcon />,
      params: { row, index: rowIndex },
    });
    if (!icon) {
      return null;
    }
    const classes = [
      tableExpandClasses.iconBox,
      tableExpandClasses[expanded ? 'expanded' : 'collapsed'],
      { [positiveRotate90]: expanded },
    ];
    return (
      <span class={classes} onClick={(e: MouseEvent) => onToggleExpand(e, row)}>
        {icon}
      </span>
    );
  };

  // eslint-disable-next-line
  const getExpandColumn = (h: CreateElement) => {
    const expandCol: PrimaryTableCol<TableRowData> = {
      colKey: '__EXPAND_ROW_ICON_COLUMN__',
      width: 64,
      className: tableExpandClasses.iconCell,
      fixed: isFirstColumnFixed.value ? 'left' : undefined,
      cell: renderExpandIcon,
      stopPropagation: true,
    };
    return expandCol;
  };

  const renderExpandedRow = (
    h: CreateElement,
    p: TableExpandedRowParams<TableRowData> & { tableWidth: number; isWidthOverflow: boolean },
  ) => {
    const rowId = get(p.row, props.rowKey || 'id');
    if (!tExpandedRowKeys.value || !tExpandedRowKeys.value.includes(rowId)) {
      return null;
    }
    const isFixedLeft = p.isWidthOverflow && props.columns.find(item => item.fixed === 'left');
    return (
      <tr key={`expand_${rowId}`} class={[tableExpandClasses.row, { [tableFullRowClasses.base]: isFixedLeft }]}>
        <td colspan={p.columns.length}>
          <div
            class={[tableExpandClasses.rowInner, { [tableFullRowClasses.innerFullRow]: isFixedLeft }]}
            style={isFixedLeft ? { width: `${p.tableWidth}px` } : {}}
          >
            <div class={tableFullRowClasses.innerFullElement}>{renderTNode('expandedRow', { params: p })}</div>
          </div>
        </td>
      </tr>
    );
  };

  const onInnerExpandRowClick = (p: RowEventContext<TableRowData>) => {
    onToggleExpand(p.e, p.row);
  };

  return {
    showExpandedRow,
    showExpandIconColumn,
    getExpandColumn,
    renderExpandedRow,
    onInnerExpandRowClick,
  };
}
