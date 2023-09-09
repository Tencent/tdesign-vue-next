import { ref, Ref, toRefs } from 'vue';
import get from 'lodash/get';
import useDefaultValue from '../../hooks/useDefaultValue';
import { BaseTableProps } from '../interface';
import { RowEventContext, TableRowData } from '../type';
import { on, off } from '../../utils/dom';
import { ARROW_DOWN_REG, ARROW_UP_REG, ESCAPE_REG, SPACE_REG, SHIFT_REG } from '../../_common/js/common';

/**
 * 行高亮功能，支持键盘操作
 */
export function useRowHighlight(props: BaseTableProps, tableRef: Ref<HTMLDivElement>) {
  const { data, activeRowType, activeRowKeys, defaultActiveRowKeys } = toRefs(props);
  const currentClickRowIndex = ref(-1);
  const isShiftPressed = ref(false);

  const [tActiveRow, setTActiveRow] = useDefaultValue(
    activeRowKeys,
    defaultActiveRowKeys.value,
    props.onActiveChange,
    'active-row-keys',
  );

  const handleInactive = (ctx: RowEventContext<TableRowData>) => {
    const { row } = ctx;
    const rowValue = get(row, props.rowKey);
    if (activeRowType.value === 'single') {
      setTActiveRow([], { type: 'inactive', activeRowList: [], currentRowData: row });
    } else if (activeRowType.value === 'multiple') {
      const newActiveRowKeys = tActiveRow.value.filter((t) => t !== rowValue);
      setTActiveRow(newActiveRowKeys, {
        type: 'inactive',
        activeRowList: [],
        currentRowData: row,
      });
    }
  };

  const handleActive = (ctx: RowEventContext<TableRowData>) => {
    const { row } = ctx;
    const rowValue = get(row, props.rowKey);
    if (activeRowType.value === 'single') {
      setTActiveRow([rowValue], {
        activeRowList: [row],
        currentRowData: row,
        type: 'active',
      });
    } else {
      const newActiveRowKeys = tActiveRow.value.concat(rowValue);
      setTActiveRow(newActiveRowKeys, {
        activeRowList: data.value.filter((item) => newActiveRowKeys.includes(get(item, props.rowKey))),
        currentRowData: row,
        type: 'active',
      });
    }
  };

  const handleShiftActive = (ctx: RowEventContext<TableRowData>) => {
    document.getSelection().removeAllRanges();
    const { row, index } = ctx;
    const startIndex = Math.min(currentClickRowIndex.value, index);
    const endIndex = Math.max(currentClickRowIndex.value, index);
    const newActiveRowData = data.value.slice(startIndex, endIndex + 1);
    const newActiveRowKeys = newActiveRowData.map((item) => get(item, props.rowKey));
    setTActiveRow(newActiveRowKeys, {
      activeRowList: newActiveRowData,
      type: 'active',
      currentRowData: row,
    });
  };

  const onHighlightRow = (ctx: RowEventContext<TableRowData>, extra?: { action?: 'active' | 'inactive' }) => {
    if (!activeRowType.value) return;
    const { row, index } = ctx;
    const rowValue = get(row, props.rowKey);
    // 如果是连续选中
    if (isShiftPressed.value) {
      handleShiftActive(ctx);
    } else if (tActiveRow.value.includes(rowValue) && extra?.action !== 'active') {
      // 如果已经高亮，则取消高亮
      handleInactive(ctx);
    } else {
      // 如果没有高亮，则设置高亮
      handleActive(ctx);
    }
    currentClickRowIndex.value = index;
  };

  const clearActive = () => {
    setTActiveRow([], {
      activeRowList: [],
      currentRowData: undefined,
      type: 'inactive',
    });
    currentClickRowIndex.value = -1;
  };

  const keyboardDownListener = (e: KeyboardEvent) => {
    const code = e.key?.trim() || e.code;
    if (ARROW_DOWN_REG.test(code)) {
      const index = Math.min(data.value.length - 1, currentClickRowIndex.value + 1);
      if (activeRowType.value === 'single') {
        onHighlightRow({ row: data.value[index], index, e }, { action: 'active' });
      } else {
        currentClickRowIndex.value = index;
      }
    } else if (ARROW_UP_REG.test(code)) {
      const index = Math.max(0, currentClickRowIndex.value - 1);
      if (activeRowType.value === 'single') {
        onHighlightRow({ row: data.value[index], index, e }, { action: 'active' });
      } else {
        currentClickRowIndex.value = index;
      }
    } else if (SPACE_REG.test(code)) {
      // keydown space to active or inactive
      const index = currentClickRowIndex.value;
      onHighlightRow({ row: data.value[index], index, e });
    } else if (ESCAPE_REG.test(code)) {
      clearActive();
    } else if (SHIFT_REG.test(code)) {
      // shift 连续选中
      isShiftPressed.value = true;
    }
  };

  const keyboardUpListener = (e: KeyboardEvent) => {
    const code = e.key?.trim() || e.code;
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
