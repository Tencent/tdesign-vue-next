import { ref, computed } from 'vue';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { PrimaryTableProps } from '../interface';
import { getEditableKeysMap } from '../utils';
import { validate } from '../../form/form-model';
import {
  PrimaryTableRowEditContext,
  TableRowData,
  TableErrorListMap,
  PrimaryTableInstanceFunctions,
  ErrorListObjectType,
} from '../type';
import { getCellKey } from './useRowspanAndColspan';
import { OnEditableChangeContext } from '../editable-cell';

export interface TablePromiseErrorData {
  errors: ErrorListObjectType<TableRowData>[];
  errorMap: TableErrorListMap;
}

const cellRuleMap = new Map<any, PrimaryTableRowEditContext<TableRowData>[]>();

export default function useRowEdit(props: PrimaryTableProps) {
  // 校验不通过的错误信息，其中 key 值为 [rowValue, col.colKey].join('__')
  const errorListMap = ref<TableErrorListMap>({});
  // 处于编辑态的表格行
  const editableKeysMap = computed(() => getEditableKeysMap(props.editableRowKeys, props.data, props.rowKey || 'id'));
  // 当前编辑的单元格
  const editingCells = ref<{ [cellKey: string]: OnEditableChangeContext<TableRowData> }>({});

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

  // 校验可编辑单元格
  const validateTableCellData = (): Promise<{ result: TableErrorListMap }> => {
    const cellKeys = Object.keys(editingCells.value);
    const promiseList = cellKeys.map((cellKey) => editingCells.value[cellKey].validateEdit('parent'));
    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then((arr) => {
        const allErrorListMap: TableErrorListMap = {};
        arr.forEach((result, index) => {
          if (result === true) return;
          allErrorListMap[cellKeys[index]] = result;
        });
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

  const clearValidateData = () => {
    errorListMap.value = {};
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

  return {
    errorListMap,
    editableKeysMap,
    validateTableData,
    validateRowData,
    onRuleChange,
    clearValidateData,
    onPrimaryTableCellEditChange,
  };
}
