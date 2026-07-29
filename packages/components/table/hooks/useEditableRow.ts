import { ref, computed, watch, toRefs } from 'vue';
import { get, set, cloneDeep, isFunction } from 'lodash-es';

import { PrimaryTableProps } from '../types';
import { getEditableKeysMap } from '@tdesign/common-js/table/utils';
import { validate } from '../../form/utils/form-model';

import {
  PrimaryTableRowEditContext,
  TableRowData,
  TableErrorListMap,
  PrimaryTableInstanceFunctions,
  ErrorListObjectType,
  PrimaryTableCellParams,
  PrimaryTableCol,
} from '../type';
import { AllValidateResult } from '../../form/type';
import { getCellKey, getRowKeyFromCell } from './useRowspanAndColspan';
import { OnEditableChangeContext, EditableCellInstance } from '../components/editable-cell';

export interface TablePromiseErrorData {
  errors: ErrorListObjectType<TableRowData>[];
  errorMap: TableErrorListMap;
}

export default function useRowEdit(props: PrimaryTableProps) {
  const { editableRowKeys } = toRefs(props);
  const cellRuleMap = new Map<any, PrimaryTableRowEditContext<TableRowData>[]>();
  // 校验不通过的错误信息，其中 key 值为 [rowValue, col.colKey].join('__')
  const errorListMap = ref<TableErrorListMap>({});
  // 处于编辑态的表格行
  const editableKeysMap = computed(() => getEditableKeysMap(props.editableRowKeys, props.data, props.rowKey || 'id'));
  // 当前编辑的单元格
  const editingCells = ref<{ [cellKey: string]: OnEditableChangeContext<TableRowData> }>({});
  // 编辑状态的数据
  const editedFormData = ref<{ [rowValue: string]: { [colKey: string]: any } }>({});
  // EditableCell ref 映射
  const editableCellRefMap = ref<{ [cellKey: string]: EditableCellInstance }>({});

  const getErrorListMapByErrors = (errors: ErrorListObjectType<TableRowData>[]): TableErrorListMap => {
    const errorMap: TableErrorListMap = {};
    errors.forEach(({ row, col, errorList }) => {
      const rowValue = get(row, props.rowKey || 'id');
      const key = [rowValue, col.colKey].join('__');
      if (errorList?.length) {
        errorMap[key] = errorList;
      } else {
        delete errorMap[key];
      }
    });
    return errorMap;
  };

  // 校验一行的数据
  const validateOneRowData = (rowValue: any) => {
    const rowRules = cellRuleMap.get(rowValue);
    if (!rowRules) return;
    const list = rowRules.map(
      (item) =>
        new Promise<ErrorListObjectType<TableRowData>>((resolve) => {
          const { editedRow, col } = item;
          const rules = isFunction(col.edit.rules) ? col.edit.rules(item) : col.edit.rules;
          if (!col.edit || !rules || !rules.length) {
            resolve({ ...item, errorList: [] });
            return;
          }
          validate(get(editedRow, col.colKey), rules).then((r) => {
            resolve({ ...item, errorList: r.filter((t) => !t.result) });
          });
        }),
    );
    return new Promise<TablePromiseErrorData>((resolve, reject) => {
      Promise.all(list).then((errors) => {
        resolve({
          errors: errors.filter((t) => t.errorList?.length),
          errorMap: getErrorListMapByErrors(errors),
        });
      }, reject);
    });
  };

  /**
   * 校验表格单行数据（对外开放方法，修改时需慎重）
   * @param rowValue 行唯一标识
   */
  const validateRowData: PrimaryTableInstanceFunctions['validateRowData'] = (rowValue: any) =>
    new Promise((resolve, reject) => {
      validateOneRowData(rowValue).then(({ errors, errorMap }) => {
        errorListMap.value = errorMap;
        // 缺少校验文本显示
        const tTrigger = 'parent';
        props.onRowValidate?.({ trigger: tTrigger, result: errors });
        resolve({ trigger: tTrigger, result: errors });
      }, reject);
    });

  // 收集所有始终保持编辑态（keepEditMode）的可编辑列（含多级表头）
  const getKeepEditColumns = (columns: PrimaryTableCol<TableRowData>[] = []) => {
    const result: PrimaryTableCol<TableRowData>[] = [];
    columns.forEach((col) => {
      if (col.edit?.component && col.edit?.keepEditMode) {
        result.push(col);
      }
      if (col.children?.length) {
        result.push(...getKeepEditColumns(col.children));
      }
    });
    return result;
  };

  type CellValidateResult = { cellKey: string; persistKey: string; errorList: AllValidateResult[] };

  // 校验可编辑单元格
  const validateTableCellData = (): Promise<{ result: TableErrorListMap }> => {
    // 过滤不存在的行，如删除操作
    const existKeys = props.data.map((v) => v[props.rowKey]?.toString());
    const editingCellKeys = Object.keys(editingCells.value).filter((v) => existKeys.includes(getRowKeyFromCell(v)));

    const keepEditColumns = getKeepEditColumns(props.columns as PrimaryTableCol<TableRowData>[]);
    const keepEditColKeys = new Set(keepEditColumns.map((col) => col.colKey));

    const promiseList: Promise<CellValidateResult>[] = [];

    // 1. 校验当前处于编辑态（已挂载）的单元格，使用组件内的实时编辑值。
    //    keepEditMode 列交由步骤 2 基于数据整表校验，避免虚拟滚动下未挂载行漏校验。
    editingCellKeys.forEach((cellKey) => {
      const context = editingCells.value[cellKey];
      if (keepEditColKeys.has(context.col.colKey)) return;
      const rowValue = get(context.row, props.rowKey || 'id');
      promiseList.push(
        context.validateEdit('parent').then((result) => ({
          cellKey,
          persistKey: [rowValue, context.col.colKey].join('__'),
          errorList: result === true ? [] : result,
        })),
      );
    });

    // 2. keepEditMode 场景：虚拟滚动只挂载可视区行，导致未挂载行不参与校验且滚动后校验状态丢失。
    //    这里对所有数据行的 keepEditMode 列基于行数据（含已编辑值）补充校验，保证校验完整且滚动后可恢复。
    keepEditColumns.forEach((col) => {
      props.data.forEach((row, rowIndex) => {
        const rowValue = get(row, props.rowKey || 'id');
        const editedRow = editedFormData.value[rowValue];
        const value = editedRow ? get(editedRow, col.colKey) : get(row, col.colKey);
        const cellKey = getCellKey(row, props.rowKey || 'id', col.colKey, 0, rowIndex);
        const persistKey = [rowValue, col.colKey].join('__');
        const params = { row, col, rowIndex, colIndex: 0 } as PrimaryTableCellParams<TableRowData>;
        const rules = isFunction(col.edit.rules) ? col.edit.rules(params) : col.edit.rules;
        if (!rules || !rules.length) return;
        promiseList.push(
          validate(value, rules).then((r) => ({
            cellKey,
            persistKey,
            errorList: r.filter((t) => !t.result),
          })),
        );
      });
    });

    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then((arr) => {
        const allErrorListMap: TableErrorListMap = {};
        const persistentErrorMap: TableErrorListMap = {};
        arr.forEach(({ cellKey, persistKey, errorList }) => {
          if (errorList?.length) {
            allErrorListMap[cellKey] = errorList;
            persistentErrorMap[persistKey] = errorList;
          }
        });
        // 持久化校验错误信息，供虚拟滚动下单元格重新挂载时通过 errors 属性恢复校验状态
        errorListMap.value = persistentErrorMap;
        props.onValidate?.({ result: allErrorListMap });
        resolve({ result: allErrorListMap });
      }, reject);
    });
  };

  /**
   * 校验整个表格数据（对外开放方法，修改时需慎重）
   */
  const validateTableData: PrimaryTableInstanceFunctions['validateTableData'] = () => {
    if (Object.keys(editingCells.value).length) {
      return validateTableCellData();
    }
    const promiseList: Promise<TablePromiseErrorData>[] = [];

    const data = props.data || [];
    for (let i = 0, len = data.length; i < len; i++) {
      const rowValue = get(data[i], props.rowKey || 'id');
      promiseList.push(validateOneRowData(rowValue));
    }
    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then((rList) => {
        const allErrorListMap: TableErrorListMap = {};
        rList.forEach(({ errorMap } = { errors: [], errorMap: {} }) => {
          errorMap && Object.assign(allErrorListMap, errorMap);
        });
        errorListMap.value = allErrorListMap;
        props.onValidate?.({ result: allErrorListMap });
        resolve({ result: allErrorListMap });
      }, reject);
    });
  };

  /** 更新编辑态单元格数据 */
  const onUpdateEditedCell = (rowValue: any, lastRowData: TableRowData, data: { [key: string]: any }) => {
    if (!editedFormData.value[rowValue]) {
      editedFormData.value[rowValue] = cloneDeep(lastRowData);
    }
    Object.entries(data).forEach(([key, val]) => {
      set(editedFormData.value[rowValue], key, val);
    });
  };

  const onRuleChange = (context: PrimaryTableRowEditContext<TableRowData>) => {
    // 编辑行，预存校验信息，方便最终校验
    if (props.editableRowKeys) {
      const rowValue = get(context.row, props.rowKey || 'id');
      const rules = cellRuleMap.get(rowValue);
      if (rules) {
        const index = rules.findIndex((t) => t.col.colKey === context.col.colKey);
        if (index === -1) {
          rules.push(context);
        } else {
          rules[index] = context;
        }
        cellRuleMap.set(rowValue, rules);
      } else {
        cellRuleMap.set(rowValue, [context]);
      }
    }
  };

  const clearValidateRowData = () => {
    errorListMap.value = {};
  };

  // EditableCell 实例变化回调
  const onCellInstanceChange = (cellKey: string, instance: EditableCellInstance | null) => {
    if (instance) {
      editableCellRefMap.value[cellKey] = instance;
    } else {
      delete editableCellRefMap.value[cellKey];
    }
  };

  // 清除所有 EditableCell 的验证数据
  const clearAllEditableCellData = () => {
    Object.keys(editableCellRefMap.value).forEach((cellKey) => {
      editableCellRefMap.value[cellKey]?.clearValidateCellData?.();
    });
  };

  const onPrimaryTableCellEditChange = (params: OnEditableChangeContext<TableRowData>) => {
    const cellKey = getCellKey(params.row, props.rowKey, params.col.colKey, params.colIndex);

    if (params.isEdit) {
      // @ts-ignore
      editingCells.value[cellKey] = params;
    } else {
      delete editingCells.value[cellKey];
    }
  };

  const getEditRowData = ({ row, col }: PrimaryTableCellParams<TableRowData>) => {
    const rowValue = get(row, props.rowKey || 'id');
    const editedRowData = editedFormData.value[rowValue];
    if (editedRowData && props.editableRowKeys?.includes(rowValue)) {
      const tmpRow = { ...editedRowData };
      set(tmpRow, col.colKey, get(editedRowData, col.colKey));
      return tmpRow;
    }
    return row;
  };

  watch(
    () => editableRowKeys.value?.join(','),
    (keyStr) => {
      const editableRowKeys = keyStr.split(',');
      const rowValueList = Object.keys(editedFormData.value);
      rowValueList.forEach((key) => {
        if (!editableRowKeys.includes(key)) {
          // clear exited editable state row data
          delete editedFormData.value[key];
        }
      });
    },
  );

  return {
    editedFormData,
    errorListMap,
    editableKeysMap,
    validateTableData,
    validateTableCellData,
    validateRowData,
    onRuleChange,
    clearValidateRowData,
    clearAllEditableCellData,
    onCellInstanceChange,
    onUpdateEditedCell,
    getEditRowData,
    onPrimaryTableCellEditChange,
  };
}
