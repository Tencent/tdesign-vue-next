import type { SetupContext } from '@td/adapter-vue';
import {
  computed,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { cloneDeep, get, isFunction, set } from 'lodash-es';
import { getEditableKeysMap } from '@td/common/js/table/utils';
import type {
  PrimaryTableCellParams,
  PrimaryTableRowEditContext,
  PrimaryTableRowValidateContext,
  TableErrorListMap,
  TableRowData,
} from '@td/intel/table/type';
import type { AllValidateResult } from '@td/intel/form/type';
import type { PrimaryTableProps } from '../interface';
import { validate } from '../../../common/form/form-model';
import type { OnEditableChangeContext } from '../editable-cell';
import { getCellKey } from './useRowspanAndColspan';

export type ErrorListObjectType = PrimaryTableRowEditContext<TableRowData> & { errorList: AllValidateResult[] };

export interface TablePromiseErrorData {
  errors: ErrorListObjectType[];
  errorMap: TableErrorListMap;
}

export default function useRowEdit(props: PrimaryTableProps, context: SetupContext) {
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

  const getErrorListMapByErrors = (errors: ErrorListObjectType[]): TableErrorListMap => {
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
    if (!rowRules) {
      return;
    }
    const list = rowRules.map(
      item => new Promise<ErrorListObjectType>((resolve) => {
        const { editedRow, col } = item;
        const rules = isFunction(col.edit.rules) ? col.edit.rules(item) : col.edit.rules;
        if (!col.edit || !rules || !rules.length) {
          resolve({ ...item, errorList: [] });
          return;
        }
        validate(get(editedRow, col.colKey), rules).then((r) => {
          resolve({ ...item, errorList: r.filter(t => !t.result) });
        });
      }),
    );
    return new Promise<TablePromiseErrorData>((resolve, reject) => {
      Promise.all(list).then((errors) => {
        resolve({
          errors: errors.filter(t => t.errorList?.length),
          errorMap: getErrorListMapByErrors(errors),
        });
      }, reject);
    });
  };

  /**
   * 校验表格单行数据（对外开放方法，修改时需慎重）
   * @param rowValue 行唯一标识
   */
  const validateRowData = (rowValue: any) => new Promise((resolve, reject) => {
    validateOneRowData(rowValue).then(({ errors, errorMap }) => {
      errorListMap.value = errorMap;
      // 缺少校验文本显示
      const tTrigger = 'parent';
      props.onRowValidate?.({ trigger: tTrigger, result: errors });
      resolve({ trigger: tTrigger, result: errors });
    }, reject);
  });

  // 校验可编辑单元格
  const validateTableCellData = () => {
    const cellKeys = Object.keys(editingCells.value);
    const promiseList = cellKeys.map(cellKey => editingCells.value[cellKey].validateEdit('parent'));
    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then((arr) => {
        const allErrorListMap: TableErrorListMap = {};
        arr.forEach((result, index) => {
          if (result === true) {
            return;
          }
          allErrorListMap[cellKeys[index]] = result;
        });
        resolve({ result: allErrorListMap });
      }, reject);
    });
  };

  /**
   * 校验整个表格数据（对外开放方法，修改时需慎重）
   */
  const validateTableData = () => {
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
    const tmpEditedData = { ...editedFormData.value };
    Object.entries(data).forEach(([key, val]) => {
      set(tmpEditedData[rowValue], key, val);
    });
    editedFormData.value = tmpEditedData;
  };

  const onRuleChange = (context: PrimaryTableRowEditContext<TableRowData>) => {
    // 编辑行，预存校验信息，方便最终校验
    if (props.editableRowKeys) {
      const rowValue = get(context.row, props.rowKey || 'id');
      const rules = cellRuleMap.get(rowValue);
      if (rules) {
        const index = rules.findIndex(t => t.col.colKey === context.col.colKey);
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

  const clearValidateData = () => {
    errorListMap.value = {};
  };

  const onPrimaryTableCellEditChange = (params: OnEditableChangeContext<TableRowData>) => {
    const cellKey = getCellKey(params.row, props.rowKey, params.col.colKey, params.colIndex);
    if (params.isEdit) {
      // @ts-expect-error
      editingCells.value[cellKey] = params;
    } else {
      delete editingCells.value[cellKey];
    }
  };

  // Only Vue2 need this function
  const onPrimaryTableRowEdit = (params: PrimaryTableRowEditContext<TableRowData>) => {
    props.onRowEdit?.(params);
    context.emit('row-edit', params);
  };

  // Only Vue2 need this function
  const onPrimaryTableRowValidate = (params: PrimaryTableRowValidateContext<TableRowData>) => {
    props.onRowValidate?.(params);
    context.emit('row-validate', params);
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
    validateRowData,
    onRuleChange,
    clearValidateData,
    getEditRowData,
    onUpdateEditedCell,
    onPrimaryTableRowEdit,
    onPrimaryTableRowValidate,
    onPrimaryTableCellEditChange,
  };
}
