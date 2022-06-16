import { ref, watch, Ref } from 'vue';
import { BaseTableCellParams, BaseTableCol, TableRowData, TableRowspanAndColspanFunc } from '../type';

export interface SkipSpansValue {
  colspan?: number;
  rowspan?: number;
  skipped?: boolean;
}

export default function useRowspanAndColspan(
  data: Ref<TableRowData[]>,
  columns: Ref<BaseTableCol<TableRowData>[]>,
  rowspanAndColspan: TableRowspanAndColspanFunc<TableRowData>,
) {
  const skipSpansMap = ref(new Map<string, SkipSpansValue>());

  // 计算单元格是否跳过渲染
  const onTrRowspanOrColspan = (params: BaseTableCellParams<TableRowData>, skipSpansValue: SkipSpansValue) => {
    const { rowIndex, colIndex } = params;
    if (!skipSpansValue.rowspan && !skipSpansValue.colspan) return;
    const maxRowIndex = rowIndex + (skipSpansValue.rowspan || 1);
    const maxColIndex = colIndex + (skipSpansValue.colspan || 1);
    for (let i = rowIndex; i < maxRowIndex; i++) {
      for (let j = colIndex; j < maxColIndex; j++) {
        if (i !== rowIndex || j !== colIndex) {
          const cellKey = [i, j].join();
          const state = skipSpansMap.value.get(cellKey) || {};
          state.skipped = true;
          skipSpansMap.value.set(cellKey, state);
        }
      }
    }
  };

  // 计算单元格是否需要设置 rowspan 和 colspan
  const updateSkipSpansMap = (
    data: TableRowData[],
    columns: BaseTableCol<TableRowData>[],
    rowspanAndColspan: TableRowspanAndColspanFunc<TableRowData>,
  ) => {
    if (!data || !rowspanAndColspan) return;
    for (let i = 0, len = data.length; i < len; i++) {
      const row = data[i];
      for (let j = 0, colLen = columns.length; j < colLen; j++) {
        const params = {
          row,
          col: columns[j],
          rowIndex: i,
          colIndex: j,
        };
        const cellKey = [i, j].join();
        const state = skipSpansMap.value.get(cellKey) || {};
        const o = rowspanAndColspan(params) || {};
        if (o.rowspan > 1 || o.colspan > 1 || state.rowspan || state.colspan) {
          o.rowspan > 1 && (state.rowspan = o.rowspan);
          o.colspan > 1 && (state.colspan = o.colspan);
          skipSpansMap.value.set(cellKey, state);
        }
        onTrRowspanOrColspan?.(params, state);
      }
    }
  };

  watch(
    () => [data.value, columns.value],
    () => {
      if (!data || !rowspanAndColspan) return;
      updateSkipSpansMap(data.value, columns.value, rowspanAndColspan);
    },
    { immediate: true },
  );

  return { skipSpansMap, updateSkipSpansMap };
}
