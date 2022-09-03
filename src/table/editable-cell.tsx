import { computed, defineComponent, PropType, ref, SetupContext, toRefs, watch } from 'vue';
import get from 'lodash/get';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import { Edit1Icon as TdEdit1Icon } from 'tdesign-icons-vue-next';

import {
  TableRowData,
  PrimaryTableCol,
  PrimaryTableRowEditContext,
  PrimaryTableRowValidateContext,
  TdBaseTableProps,
  PrimaryTableCellParams,
} from './type';
import { TableClassName } from './hooks/useClassName';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { renderCell } from './tr';
import { validate } from '../form/form-model';
import log from '../_common/js/log';
import { AllValidateResult } from '../form/type';

export interface EditableCellProps {
  row: TableRowData;
  rowIndex: number;
  col: PrimaryTableCol<TableRowData>;
  colIndex: number;
  oldCell: PrimaryTableCol<TableRowData>['cell'];
  tableBaseClass?: TableClassName['tableBaseClass'];
  /** 行编辑需要使用 editable。单元格编辑则无需使用，设置为 undefined */
  editable?: boolean;
  readonly?: boolean;
  errors?: AllValidateResult[];
  cellEmptyContent?: TdBaseTableProps['cellEmptyContent'];
  onChange?: (context: PrimaryTableRowEditContext<TableRowData>) => void;
  onValidate?: (context: PrimaryTableRowValidateContext<TableRowData>) => void;
  onRuleChange?: (context: PrimaryTableRowEditContext<TableRowData>) => void;
}

export default defineComponent({
  name: 'TableEditableCell',
  props: {
    row: Object as PropType<EditableCellProps['row']>,
    rowIndex: Number,
    col: Object as PropType<EditableCellProps['col']>,
    colIndex: Number,
    oldCell: [Function, String] as PropType<EditableCellProps['oldCell']>,
    tableBaseClass: Object as PropType<EditableCellProps['tableBaseClass']>,
    cellEmptyContent: [Function, String] as PropType<EditableCellProps['cellEmptyContent']>,
    editable: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
    },
    errors: {
      type: Array as PropType<EditableCellProps['errors']>,
      default: undefined,
    },
    onChange: Function as PropType<EditableCellProps['onChange']>,
    onValidate: Function as PropType<EditableCellProps['onValidate']>,
    onRuleChange: Function as PropType<EditableCellProps['onRuleChange']>,
  },

  setup(props: EditableCellProps, context: SetupContext) {
    const { row, col } = toRefs(props);
    const tableEditableCellRef = ref(null);
    const isEdit = ref(props.col.edit?.defaultEditable || false);
    const editValue = ref();
    const errorList = ref<AllValidateResult[]>();

    const { Edit1Icon } = useGlobalIcon({ Edit1Icon: TdEdit1Icon });

    const currentRow = computed(() => {
      const newRow = { ...row.value };
      set(newRow, col.value.colKey, editValue.value);
      return newRow;
    });

    const cellNode = computed(() => {
      const node = renderCell(
        {
          row: currentRow.value,
          col: { ...col.value, cell: props.oldCell },
          rowIndex: props.rowIndex,
          colIndex: props.colIndex,
        },
        context.slots,
        { cellEmptyContent: props.cellEmptyContent },
      );
      return node;
    });

    const componentProps = computed(() => {
      const { edit } = col.value;
      if (!edit) return {};
      const editProps = isFunction(edit.props)
        ? edit.props({
            col: col.value,
            row: row.value,
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
            editedRow: currentRow.value,
          })
        : { ...edit.props };
      // to remove warn: runtime-core.esm-bundler.js:38 [Vue warn]: Invalid prop: type check failed for prop "onChange". Expected Function, got Array
      delete editProps.onChange;
      delete editProps.value;
      edit.abortEditOnEvent?.forEach((item) => {
        delete editProps[item];
      });
      return editProps;
    });

    const isAbortEditOnChange = computed(() => {
      const { edit } = col.value;
      if (!edit) return false;
      return Boolean(edit.abortEditOnEvent?.includes('onChange'));
    });

    const validateEdit = (trigger: 'self' | 'parent') => {
      return new Promise((resolve) => {
        const cellParams: PrimaryTableCellParams<TableRowData> = {
          col: props.col,
          row: props.row,
          colIndex: props.colIndex,
          rowIndex: props.rowIndex,
        };
        const params: PrimaryTableRowValidateContext<TableRowData> = {
          result: [
            {
              ...cellParams,
              errorList: [],
              value: editValue.value,
            },
          ],
          trigger,
        };
        if (!col.value.edit || !col.value.edit.rules) {
          props.onValidate?.(params);
          resolve(true);
          return;
        }
        const rules = isFunction(col.value.edit.rules) ? col.value.edit.rules(cellParams) : col.value.edit.rules;
        validate(editValue.value, rules).then((result) => {
          const list = result?.filter((t) => !t.result);
          params.result[0].errorList = list;
          props.onValidate?.(params);
          if (!list || !list.length) {
            resolve(true);
          } else {
            errorList.value = list;
            resolve(list);
          }
        });
      });
    };

    const isSame = (a: any, b: any) => {
      if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      return a === b;
    };

    const updateAndSaveAbort = (outsideAbortEvent: Function, ...args: any) => {
      validateEdit('self').then((result) => {
        if (result !== true) return;
        const oldValue = get(row.value, col.value.colKey);
        // 相同的值无需触发变化
        if (!isSame(editValue.value, oldValue)) {
          editValue.value = oldValue;
          outsideAbortEvent?.(...args);
        }
        // 此处必须在事件执行完成后异步销毁编辑组件，否则会导致事件清楚不及时引起的其他问题
        const timer = setTimeout(() => {
          isEdit.value = false;
          errorList.value = [];
          clearTimeout(timer);
        }, 0);
      });
    };

    const listeners = computed<{ [key: string]: Function }>(() => {
      const { edit } = col.value;
      const isCellEditable = props.editable === undefined;
      if (!isEdit.value || !isCellEditable) return;
      if (!edit?.abortEditOnEvent?.length) return {};
      // 自定义退出编辑态的事件
      const tListeners = {};
      const outsideAbortEvent = edit?.onEdited;
      edit.abortEditOnEvent.forEach((itemEvent) => {
        if (itemEvent === 'onChange') return;
        tListeners[itemEvent] = (...args: any) => {
          updateAndSaveAbort(
            outsideAbortEvent,
            {
              trigger: itemEvent,
              newRowData: currentRow.value,
              rowIndex: props.rowIndex,
            },
            ...args,
          );
        };
      });

      return tListeners;
    });

    const onEditChange = (val: any, ...args: any) => {
      editValue.value = val;
      const params = {
        row: props.row,
        rowIndex: props.rowIndex,
        value: val,
        col: props.col,
        colIndex: props.colIndex,
        editedRow: { ...props.row, [props.col.colKey]: val },
      };
      props.onChange?.(params);
      props.onRuleChange?.(params);
      const isCellEditable = props.editable === undefined;
      if (isCellEditable && isAbortEditOnChange.value) {
        const outsideAbortEvent = col.value.edit?.onEdited;
        updateAndSaveAbort(
          outsideAbortEvent,
          {
            trigger: 'onChange',
            newRowData: currentRow.value,
            rowIndex: props.rowIndex,
          },
          ...args,
        );
      }
    };

    const documentClickHandler = (e: PointerEvent) => {
      if (!col.value.edit || !col.value.edit.component) return;
      if (!isEdit.value) return;
      // @ts-ignore
      if (e.path?.includes(tableEditableCellRef.value?.$el)) return;
      // @ts-ignore 如果点击到 Popup 复层也直接返回
      for (let i = 0, len = e.path.length; i < len; i++) {
        // @ts-ignore
        const node = e.path[i];
        if (node.classList?.value?.includes('popup__content')) {
          return;
        }
      }
      const outsideAbortEvent = col.value.edit.onEdited;
      updateAndSaveAbort(outsideAbortEvent, {
        trigger: 'document',
        newRowData: currentRow.value,
        rowIndex: props.rowIndex,
      });
    };

    const cellValue = computed(() => get(row.value, col.value.colKey));

    watch(
      cellValue,
      (cellValue) => {
        let val = cellValue;
        if (typeof val === 'object' && val !== null) {
          val = val instanceof Array ? [...val] : { ...val };
        }
        editValue.value = val;
      },
      { immediate: true },
    );

    watch(
      isEdit,
      (isEdit) => {
        const isCellEditable = props.editable === undefined;
        if (!col.value.edit || !col.value.edit.component || !isCellEditable) return;
        if (isEdit) {
          document.addEventListener('click', documentClickHandler);
        } else {
          document.removeEventListener('click', documentClickHandler);
        }
      },
      { immediate: true },
    );

    watch(
      () => [props.editable, props.rowIndex, props.colIndex],
      ([editable, rowIndex, colIndex]: [boolean, number, number]) => {
        // 退出编辑态时，恢复原始值，等待父组件传入新的 data 值
        if (editable === false) {
          editValue.value = cellValue.value;
        } else if (editable === true) {
          props.onRuleChange?.({
            col: col.value,
            row: row.value,
            rowIndex,
            colIndex,
            value: cellValue.value,
            editedRow: row.value,
          });
        }
      },
      { immediate: true },
    );

    watch(
      () => props.errors,
      (errors) => {
        errorList.value = errors;
      },
    );

    return () => {
      if (props.readonly) {
        return cellNode.value;
      }
      // props.editable = undefined 表示由组件内部控制编辑状态
      if ((props.editable === undefined && !isEdit.value) || props.editable === false) {
        return (
          <div
            class={props.tableBaseClass.cellEditable}
            onClick={(e: MouseEvent) => {
              isEdit.value = true;
              e.stopPropagation();
            }}
          >
            {cellNode.value}
            {col.value.edit?.showEditIcon !== false && <Edit1Icon size="12px" />}
          </div>
        );
      }
      const Component = col.value.edit?.component;
      if (!Component) {
        log.error('Table', 'edit.component is required.');
        return null;
      }
      const errorMessage = errorList.value?.[0]?.message;
      return (
        <div
          class={props.tableBaseClass.cellEditWrap}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <Component
            ref="tableEditableCellRef"
            status={errorMessage ? errorList.value?.[0]?.type || 'error' : undefined}
            tips={errorMessage}
            {...componentProps.value}
            {...listeners.value}
            value={editValue.value}
            onChange={onEditChange}
          />
        </div>
      );
    };
  },
});
