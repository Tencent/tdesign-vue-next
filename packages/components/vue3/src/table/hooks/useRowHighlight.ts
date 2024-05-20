import type { Ref } from '@td/adapter-vue';
import { ref, toRefs } from '@td/adapter-vue';
import { get } from 'lodash-es';
import useDefaultValue from '../../hooks/useDefaultValue';
import type { BaseTableProps } from '../interface';
import type { RowEventContext, TableRowData } from '../type';
import { off, on } from '../../utils/dom';
import {
  ALL_REG,
  ARROW_DOWN_REG,
  ARROW_UP_REG,
  CLEAR_REG,
  ESCAPE_REG,
  SHIFT_REG,
  SPACE_REG,
} from '@td/shared/_common/js/common';

/**
 * 行高亮功能，支持键盘操作
 */
export function useRowHighlight(props: BaseTableProps, tableRef: Ref<HTMLDivElement>) {
  const { data, activeRowType, activeRowKeys, defaultActiveRowKeys, disableSpaceInactiveRow } = toRefs(props);
  const currentOperationRowIndex = ref(-1);
  const isShiftPressed = ref(false);
  const shiftSelectionState = ref(false);
  const areaSelectionStartIndex = ref(-1);

  const [tActiveRow, setTActiveRow] = useDefaultValue(
    activeRowKeys,
    defaultActiveRowKeys.value,
    props.onActiveChange,
    'activeRowKeys',
  );

  const handleInactive = (ctx: RowEventContext<TableRowData>) => {
    const { row, index } = ctx;
    const rowValue = get(row, props.rowKey);
    if (activeRowType.value === 'single') {
      const newActiveRowKeys = tActiveRow.value.length > 1 ? [rowValue] : [];
      setTActiveRow(newActiveRowKeys, {
        type: 'inactive',
        activeRowList: [{ row, rowIndex: index }],
        currentRowData: row,
      });
    } else if (activeRowType.value === 'multiple') {
      const newActiveRowKeys = tActiveRow.value.filter(t => t !== rowValue);
      const activeRowList: { row: TableRowData; rowIndex: number }[] = [];
      for (let i = 0, len = data.value.length; i < len; i++) {
        const row = data.value[i];
        if (newActiveRowKeys.includes(get(row, props.rowKey))) {
          activeRowList.push({ row, rowIndex: i });
        }
      }
      setTActiveRow(newActiveRowKeys, {
        type: 'inactive',
        activeRowList,
        currentRowData: row,
      });
    }
  };

  const handleActive = (ctx: RowEventContext<TableRowData>) => {
    const { row } = ctx;
    const rowValue = get(row, props.rowKey);
    if (activeRowType.value === 'single') {
      setTActiveRow([rowValue], {
        activeRowList: [{ row, rowIndex: ctx.index }],
        currentRowData: row,
        type: 'active',
      });
    } else {
      const newActiveRowKeys = tActiveRow.value.concat(rowValue);
      const activeRowList: { row: TableRowData; rowIndex: number }[] = [];
      for (let i = 0, len = data.value.length; i < len; i++) {
        const row = data.value[i];
        if (newActiveRowKeys.includes(get(row, props.rowKey))) {
          activeRowList.push({ row, rowIndex: i });
        }
      }
      setTActiveRow(newActiveRowKeys, {
        activeRowList,
        currentRowData: row,
        type: 'active',
      });
    }
  };

  const handleShiftActive = (ctx: RowEventContext<TableRowData>) => {
    document.getSelection().removeAllRanges();
    const { row } = ctx;
    const currentIndex = currentOperationRowIndex.value;
    const startIndex = Math.min(areaSelectionStartIndex.value, currentIndex);
    const endIndex = Math.max(areaSelectionStartIndex.value, currentIndex);
    const newActiveRowData: { row: TableRowData; rowIndex: number }[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      newActiveRowData.push({ row: data.value[i], rowIndex: i });
    }
    const newActiveRowKeys = newActiveRowData.map(item => get(item.row, props.rowKey));
    setTActiveRow(newActiveRowKeys, {
      activeRowList: newActiveRowData,
      type: 'active',
      currentRowData: row,
    });
  };

  const getActiveRowList = () => {
    const list: { row: TableRowData; rowIndex: number }[] = [];
    for (let i = 0, len = data.value.length; i < len; i++) {
      const row = data.value[i];
      const rowValue = get(row, props.rowKey);
      if (tActiveRow.value.includes(rowValue)) {
        list.push({ row, rowIndex: i });
      }
    }
    return list;
  };

  const onHighlightRow = (ctx: RowEventContext<TableRowData>, extra?: { action?: 'active' | 'inactive' }) => {
    if (!activeRowType.value) {
      return;
    }
    const { row, index } = ctx;
    const rowValue = get(row, props.rowKey);
    // 如果是连续选中
    if (isShiftPressed.value) {
      currentOperationRowIndex.value = index;
      handleShiftActive(ctx);
      shiftSelectionState.value = true;
    } else if (tActiveRow.value.includes(rowValue) && extra?.action !== 'active') {
      if (!disableSpaceInactiveRow.value) {
        // 如果已经高亮，则取消高亮
        handleInactive(ctx);
        currentOperationRowIndex.value = index;
      }
    } else {
      // 如果没有高亮，则设置高亮
      handleActive(ctx);
      currentOperationRowIndex.value = index;
    }
  };

  const clearActive = () => {
    setTActiveRow([], {
      activeRowList: [],
      currentRowData: undefined,
      type: 'inactive',
    });
    props.onActiveRowAction?.({ action: 'clear', activeRowList: [] });
    currentOperationRowIndex.value = -1;
  };

  const setAllActive = () => {
    const activeKeys = data.value.map(item => get(item, props.rowKey));
    const activeRowList = data.value.map((row, rowIndex) => ({ row, rowIndex }));
    setTActiveRow(activeKeys, {
      activeRowList,
      currentRowData: undefined,
      type: 'active',
    });
    props.onActiveRowAction?.({ action: 'select-all', activeRowList });
    currentOperationRowIndex.value = -1;
  };

  const clearShiftAreaSelection = () => {
    shiftSelectionState.value = false;
  };

  const keyboardDownListener = (e: KeyboardEvent) => {
    const code = e.code || e.key?.trim();
    if (ARROW_DOWN_REG.test(code)) {
      e.preventDefault();
      const index = Math.min(data.value.length - 1, currentOperationRowIndex.value + 1);
      if (activeRowType.value === 'single') {
        onHighlightRow({ row: data.value[index], index, e }, { action: 'active' });
      } else {
        currentOperationRowIndex.value = index;
      }
    } else if (ARROW_UP_REG.test(code)) {
      e.preventDefault();
      const index = Math.max(0, currentOperationRowIndex.value - 1);
      if (activeRowType.value === 'single') {
        onHighlightRow({ row: data.value[index], index, e }, { action: 'active' });
      } else {
        currentOperationRowIndex.value = index;
      }
    } else if (SPACE_REG.test(code)) {
      e.preventDefault();
      // keydown space to active or inactive
      const index = currentOperationRowIndex.value;
      // area selection can not cancel active with keydown space
      if (shiftSelectionState.value) {
        props.onActiveRowAction?.({
          action: 'shift-area-selection',
          activeRowList: getActiveRowList(),
        });
      } else if (!disableSpaceInactiveRow.value) {
        onHighlightRow({ row: data.value[index], index, e });
      } else {
        props.onActiveRowAction?.({
          action: 'space-one-selection',
          activeRowList: getActiveRowList(),
        });
      }
    } else if (SHIFT_REG.test(code)) {
      // shift 连续选中开始
      isShiftPressed.value = true;
      areaSelectionStartIndex.value = currentOperationRowIndex.value;
    } else if (ESCAPE_REG.test(code) || CLEAR_REG.test(code)) {
      // 清空
      clearActive();
      clearShiftAreaSelection();
    } else if (ALL_REG.test(code)) {
      // 全选
      setAllActive();
    }

    if (!SPACE_REG.test(code)) {
      clearShiftAreaSelection();
    }
  };

  const keyboardUpListener = (e: KeyboardEvent) => {
    const code = e.code || e.key?.trim();
    if (SHIFT_REG.test(code)) {
      isShiftPressed.value = false;
    }
  };

  const addHighlightKeyboardListener = () => {
    on(tableRef.value, 'keydown', keyboardDownListener);
    on(tableRef.value, 'keyup', keyboardUpListener);
  };

  const removeHighlightKeyboardListener = () => {
    off(tableRef.value, 'keydown', keyboardDownListener);
    off(tableRef.value, 'keyup', keyboardUpListener);
  };

  return {
    tActiveRow,
    onHighlightRow,
    addHighlightKeyboardListener,
    removeHighlightKeyboardListener,
  };
}

export default useRowHighlight;
