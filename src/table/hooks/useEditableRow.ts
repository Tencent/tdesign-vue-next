import { ref, computed } from 'vue';
import get from 'lodash/get';
import { PrimaryTableProps } from '../interface';
import { getEditableKeysMap } from '../utils';
import { AllValidateResult } from '../../form/type';
import { validate } from '../../form/form-model';
import { PrimaryTableRowEditContext, PrimaryTableRowValidateContext, TableRowData, TableErrorListMap } from '../type';

const cellRuleMap = new Map<any, PrimaryTableRowEditContext<TableRowData>[]>();

export type ErrorListObjectType = PrimaryTableRowEditContext<TableRowData> & { errorList: AllValidateResult[] };

export default function useRowEdit(props: PrimaryTableProps) {
  // 校验不通过的错误信息，其中 key 值为 [rowValue, col.colKey].join('__')
  const errorListMap = ref<TableErrorListMap>({});
  // 处于编辑态的表格行
  const editableKeysMap = computed(() => getEditableKeysMap(props.editableRowKeys, props.data, props.rowKey || 'id'));

  // 校验一行的数据
  const validateOneRowData = (rowValue: any) => {
    const rowRules = cellRuleMap.get(rowValue);
    if (!rowRules) return;
    const list = rowRules.map(
      (item) =>
        new Promise<ErrorListObjectType>((resolve) => {
          const { value, col } = item;
          if (!col.edit || !col.edit.rules || !col.edit.rules.length) {
            resolve({ ...item, errorList: [] });
            return;
          }
          validate(value, col.edit.rules).then((r) => {
            resolve({ ...item, errorList: r.filter((t) => !t.result) });
          });
        }),
    );
    return new Promise<{
      errors: ErrorListObjectType[];
      errorMap: TableErrorListMap;
    }>((resolve, reject) => {
      Promise.all(list).then((errors) => {
        const errorMap: TableErrorListMap = { ...errorListMap.value };
        errors.forEach(({ row, col, errorList }) => {
          const rowValue = get(row, props.rowKey || 'id');
          const key = [rowValue, col.colKey].join('__');
          if (errorList?.length) {
            errorMap[key] = errorList;
          } else {
            delete errorMap[key];
          }
        });
        errorListMap.value = errorMap;
        resolve({
          errors: errors.filter((t) => t.errorList?.length),
          errorMap,
        });
      }, reject);
    });
  };

  /**
   * 校验表格单行数据（对外开放方法，修改时需慎重）
   * @param rowValue 行唯一标识
   */
  const validateRowData = (rowValue: any) => {
    validateOneRowData(rowValue).then(({ errors }) => {
      // 缺少校验文本显示
      const tTrigger = 'parent';
      props.onRowValidate?.({ trigger: tTrigger, result: errors });
    });
  };

  /**
   * 校验整个表格数据（对外开放方法，修改时需慎重）
   */
  const validateTableData = () => {
    const promiseList = [];
    const data = props.data || [];
    for (let i = 0, len = data.length; i < len; i++) {
      const rowValue = get(data[i], props.rowKey || 'id');
      promiseList.push(validateOneRowData(rowValue));
    }
    Promise.all(promiseList).then(() => {
      props.onValidate?.({ result: errorListMap.value });
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
          rules[index].value = context.value;
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

  return {
    errorListMap,
    editableKeysMap,
    validateTableData,
    validateRowData,
    onRuleChange,
    clearValidateData,
  };
}
