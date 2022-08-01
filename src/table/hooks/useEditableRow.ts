import { ref, computed } from 'vue';
import get from 'lodash/get';
import { PrimaryTableProps } from '../interface';
import { getEditableKeysMap } from '../utils';
import { AllValidateResult } from '../../form/type';
import { PrimaryTableRowEditContext, PrimaryTableRowValidateContext, TableRowData } from '../type';
import { validate } from '../../form/form-model';

const cellRuleMap = new Map<any, PrimaryTableRowEditContext<TableRowData>[]>();

export type ErrorListType = { [key: string]: AllValidateResult[] };

export default function useRowEdit(props: PrimaryTableProps) {
  const errorListMap = ref<ErrorListType>({});
  const editableKeysMap = computed(() => getEditableKeysMap(props.editableRowKeys, props.data, props.rowKey || 'id'));

  const validateRowData = (rowValue: any) => {
    const rowRules = cellRuleMap.get(rowValue);
    const list = rowRules.map(
      (item) =>
        new Promise<PrimaryTableRowEditContext<TableRowData> & { errorList: AllValidateResult[] }>((resolve) => {
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
    Promise.all(list).then((results) => {
      const errorMap: ErrorListType = {};
      const errors = results.filter((t) => t.errorList.length);
      errors.forEach(({ row, col, errorList }) => {
        const rowValue = get(row, props.rowKey || 'id');
        const key = [rowValue, col.colKey].join();
        errorMap[key] = errorList;
      });
      errorListMap.value = errorMap;
      // 缺少校验文本显示
      props.onRowValidate?.({ trigger: 'parent', result: errors });
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
          rules.concat(context);
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
    validateRowData,
    onRuleChange,
    clearValidateData,
  };
}
