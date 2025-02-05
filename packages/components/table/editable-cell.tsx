import { computed, defineComponent, onMounted, PropType, ref, SetupContext, toRefs, watch } from 'vue';
import { get } from 'lodash-es';
import { set } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { cloneDeep } from 'lodash-es';
import { Edit1Icon as TdEdit1Icon } from 'tdesign-icons-vue-next';
import {
  TableRowData,
  PrimaryTableCol,
  PrimaryTableRowEditContext,
  PrimaryTableRowValidateContext,
  TdBaseTableProps,
  TableEditableCellPropsParams,
} from './type';
import { TableClassName } from './hooks/useClassName';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { renderCell } from './tr';
import { validate } from '../form/form-model';
import log from '@tdesign/common/js/log';
import { AllValidateResult } from '../form/type';
import { on, off } from '../utils/dom';
import { isObject } from 'lodash-es';
import { usePrefixClass } from '../hooks/useConfig';

export interface OnEditableChangeContext<T> extends PrimaryTableRowEditContext<T> {
  isEdit: boolean;
  validateEdit: (trigger: 'self' | 'parent') => Promise<true | AllValidateResult[]>;
}

export interface EditableCellProps {
  rowKey: string;
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
  /** 编辑数据时触发 */
  onChange?: (context: PrimaryTableRowEditContext<TableRowData>) => void;
  /** 校验结束后触发 */
  onValidate?: (context: PrimaryTableRowValidateContext<TableRowData>) => void;
  /** 校验规则发生变化时触发 */
  onRuleChange?: (context: PrimaryTableRowEditContext<TableRowData>) => void;
  /** 进入或退出编辑态时触发 */
  onEditableChange?: (context: OnEditableChangeContext<TableRowData>) => void;
}

export default defineComponent({
  name: 'TableEditableCell',
  props: {
    row: Object as PropType<EditableCellProps['row']>,
    rowKey: String,
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
    onEditableChange: Function as PropType<EditableCellProps['onEditableChange']>,
  },

  emits: ['update-edited-cell'],

  setup(props: EditableCellProps, context: SetupContext) {
    const { row, col } = toRefs(props);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tableEditableCellRef = ref(null);
    const isKeepEditMode = computed(() => col.value.edit?.keepEditMode);
    const isEdit = ref(isKeepEditMode.value || props.col.edit?.defaultEditable || false);
    const editValue = ref();
    const errorList = ref<AllValidateResult[]>();
    const classPrefix = usePrefixClass();

    const { Edit1Icon } = useGlobalIcon({ Edit1Icon: TdEdit1Icon });

    const updateEditedCellValue: TableEditableCellPropsParams<TableRowData>['updateEditedCellValue'] = (obj) => {
      if (typeof obj === 'object' && ('rowValue' in obj || obj.isUpdateCurrentRow)) {
        const rowValue = obj.isUpdateCurrentRow ? get(row.value, props.rowKey) : obj.rowValue;
        delete obj.rowValue;
        delete obj.isUpdateCurrentRow;
        context.emit('update-edited-cell', rowValue, row.value, obj);
      } else {
        editValue.value = obj;
      }
    };

    watch([isKeepEditMode], (val) => {
      if (val) {
        isEdit.value = true;
      }
    });

    const editOnListeners = computed(() => {
      return col.value.edit?.on?.({ ...cellParams.value, editedRow: currentRow.value, updateEditedCellValue }) || {};
    });

    const cellParams = computed(() => ({
      rowIndex: props.rowIndex,
      colIndex: props.colIndex,
      col: props.col,
      row: props.row,
    }));

    const currentRow = computed(() => {
      const { colKey } = col.value;
      // handle colKey like a.b.c
      const [firstKey, ...restKeys] = colKey.split('.') || [];
      const newRow = { ...row.value };
      if (restKeys.length) {
        newRow[firstKey] = cloneDeep(row.value[firstKey]);
        set(newRow[firstKey], restKeys.join('.'), editValue.value);
      } else {
        set(newRow, colKey, editValue.value);
      }
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

    const editProps = computed(() => {
      const { edit } = col.value;
      return isFunction(edit.props)
        ? edit.props({
            ...cellParams.value,
            editedRow: currentRow.value,
            updateEditedCellValue,
          })
        : { ...edit.props };
    });

    const componentProps = computed(() => {
      const { edit } = col.value;
      if (!edit) return {};
      const tmpProps = { ...editProps.value };
      // for removing warn: runtime-core.esm-bundler.js:38 [Vue warn]: Invalid prop: type check failed for prop "onChange". Expected Function, got Array
      delete tmpProps.onChange;
      delete tmpProps.value;
      edit.abortEditOnEvent?.forEach((item) => {
        delete tmpProps[item];
      });
      return tmpProps;
    });

    const isAbortEditOnChange = computed(() => {
      const { edit } = col.value;
      if (!edit) return false;
      return Boolean(edit.abortEditOnEvent?.includes('onChange'));
    });

    const validateEdit = (trigger: 'self' | 'parent'): Promise<true | AllValidateResult[]> => {
      return new Promise((resolve) => {
        const params: PrimaryTableRowValidateContext<TableRowData> = {
          result: [
            {
              ...cellParams.value,
              errorList: [],
              value: editValue.value,
            },
          ],
          trigger,
        };
        const rules = isFunction(col.value.edit.rules) ? col.value.edit.rules(cellParams.value) : col.value.edit.rules;
        if (!col.value.edit || !rules || !rules.length) {
          props.onValidate?.(params);
          resolve(true);
          return;
        }
        validate(editValue.value, rules).then((result) => {
          const list = result?.filter((t) => !t.result);
          params.result[0].errorList = list;
          props.onValidate?.(params);
          if (!list || !list.length) {
            errorList.value = [];
            resolve(true);
          } else {
            errorList.value = list;
            resolve(list);
          }
        });
      });
    };

    const isSame = (a: any, b: any) => {
      if (isObject(a) && isObject(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      return a === b;
    };

    const updateAndSaveAbort = (outsideAbortEvent: Function, eventName: string, ...args: any) => {
      validateEdit('self').then((result) => {
        if (result !== true) return;
        const oldValue = get(row.value, col.value.colKey);
        // 相同的值无需触发变化
        if (!isSame(editValue.value, oldValue)) {
          editValue.value = oldValue;
          outsideAbortEvent?.(...args);
        }
        editOnListeners.value[eventName]?.(args[2]);
        // 此处必须在事件执行完成后异步销毁编辑组件，否则会导致事件清除不及时引起的其他问题
        const timer = setTimeout(() => {
          if (!isKeepEditMode.value) {
            isEdit.value = false;
          }
          errorList.value = [];
          props.onEditableChange?.({
            ...cellParams.value,
            value: editValue.value,
            editedRow: { ...props.row, [props.col.colKey]: editValue.value },
            validateEdit,
            isEdit: false,
          });
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
      const tListeners: Record<string, Function> = {};
      const outsideAbortEvent = edit?.onEdited;
      edit.abortEditOnEvent.forEach((itemEvent) => {
        if (itemEvent === 'onChange') return;
        tListeners[itemEvent] = (...args: any) => {
          updateAndSaveAbort(
            outsideAbortEvent,
            itemEvent,
            {
              ...cellParams.value,
              trigger: itemEvent,
              newRowData: currentRow.value,
            },
            ...args,
          );
        };
      });

      return tListeners;
    });

    // 数据输入时触发
    const onEditChange = (val: any, ...args: any) => {
      editValue.value = val;
      const params = {
        ...cellParams.value,
        value: val,
        editedRow: { ...props.row, [props.col.colKey]: val },
      };
      editProps.value?.onChange?.(val, ...args);
      props.onChange?.(params);
      props.onRuleChange?.(params);
      editOnListeners.value?.onChange?.(params);
      const isCellEditable = props.editable === undefined;
      if (isCellEditable && isAbortEditOnChange.value) {
        const outsideAbortEvent = col.value.edit?.onEdited;
        updateAndSaveAbort(
          outsideAbortEvent,
          'change',
          {
            ...cellParams.value,
            trigger: 'onChange',
            newRowData: currentRow.value,
          },
          ...args,
        );
      }
      if (col.value.edit?.validateTrigger === 'change') {
        validateEdit('self');
      }
    };

    const documentClickHandler = (e: MouseEvent) => {
      if (!col.value.edit || !col.value.edit.component) return;
      if (!isEdit.value) return;
      // @ts-ignore some browser is also only support e.path
      const path = e.composedPath?.() || e.path || [];
      const node = path.find((node: HTMLElement) => node.classList?.contains(`${classPrefix.value}-popup__content`));
      if (node) return;
      const outsideAbortEvent = col.value.edit.onEdited;
      updateAndSaveAbort(outsideAbortEvent, '', {
        ...cellParams.value,
        trigger: 'document',
        newRowData: currentRow.value,
      });
    };

    const enterEdit = () => {
      props.onEditableChange?.({
        ...cellParams.value,
        value: editValue.value,
        editedRow: props.row,
        isEdit: true,
        validateEdit,
      });
    };

    const onCellClick = (e: MouseEvent) => {
      isEdit.value = true;
      enterEdit();
      e.stopPropagation();
    };

    onMounted(() => {
      if (props.col.edit?.defaultEditable) {
        enterEdit();
      }
    });

    const cellValue = computed(() => get(row.value, col.value.colKey));

    watch(
      cellValue,
      (cellValue) => {
        editValue.value = cellValue;
      },
      { immediate: true },
    );

    watch(
      isEdit,
      (isEdit) => {
        const isCellEditable = props.editable === undefined;
        if (!col.value.edit || !col.value.edit.component || !isCellEditable) return;
        if (isEdit) {
          on(document, 'click', documentClickHandler);
        } else {
          off(document, 'click', documentClickHandler);
        }
      },
      { immediate: true },
    );

    watch(
      () => [props.editable, props.row, props.col, props.rowIndex, props.colIndex],
      ([editable]: [boolean]) => {
        // 退出编辑态时，恢复原始值，等待父组件传入新的 data 值
        if (editable === false) {
          editValue.value = cellValue.value;
        } else if (editable === true) {
          props.onRuleChange?.({
            ...cellParams.value,
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
          <div class={props.tableBaseClass.cellEditable} onClick={onCellClick}>
            {cellNode.value}
            {col.value.edit?.showEditIcon !== false && <Edit1Icon />}
          </div>
        );
      }
      const Component = col.value.edit?.component;
      if (!Component) {
        log.error('Table', 'edit.component is required.');
        return null;
      }
      const errorMessage = errorList.value?.[0]?.message;
      const tmpEditOnListeners = { ...editOnListeners.value };
      delete tmpEditOnListeners.onChange;
      // remove conflict events
      if (col.value.edit?.abortEditOnEvent?.length) {
        col.value.edit.abortEditOnEvent.forEach((onEventName) => {
          if (tmpEditOnListeners[onEventName]) {
            delete tmpEditOnListeners[onEventName];
          }
        });
      }
      return (
        <div
          class={props.tableBaseClass.cellEditWrap}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
          }}
          ref="tableEditableCellRef"
        >
          <Component
            status={errorMessage ? errorList.value?.[0]?.type || 'error' : undefined}
            tips={errorMessage}
            {...componentProps.value}
            {...listeners.value}
            {...tmpEditOnListeners}
            value={editValue.value}
            onChange={onEditChange}
          />
        </div>
      );
    };
  },
});
