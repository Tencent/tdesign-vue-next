import type { PropType, SetupContext } from '@td/adapter-vue';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { cloneDeep, get, isFunction, set } from 'lodash-es';
import { Edit1Icon as TdEdit1Icon } from 'tdesign-icons-vue';
import type {
  PrimaryTableCol,
  PrimaryTableRowEditContext,
  PrimaryTableRowValidateContext,
  TableEditableCellPropsParams,
  TableRowData,
  TdBaseTableProps,
} from '@td/components/table/type';
import { useGlobalIcon, usePrefixClass } from '@td/adapter-hooks';
import log from '@td/common/js/log';
import type { AllValidateResult } from '@td/components/form/type';
import { off, on } from '@td/utils';
import { validate } from '../../common/form/form-model';
import { renderCell } from './tr';
import type { TableClassName } from './hooks/useClassName';

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
    rowKey: String,
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
    onEditableChange: Function as PropType<EditableCellProps['onEditableChange']>,
  },

  emits: ['update-edited-cell'],

  setup(props: EditableCellProps, context: SetupContext) {
    const { row, col } = toRefs(props);
    const tableEditableCellRef = ref(null);

    const isKeepEditMode = computed(() => col.value.edit?.keepEditMode);

    const isEdit = ref(isKeepEditMode.value || col.value.edit?.defaultEditable || false);
    const editValue = ref();
    const errorList = ref<AllValidateResult[]>();
    const classPrefix = usePrefixClass();

    const { Edit1Icon } = useGlobalIcon({ Edit1Icon: TdEdit1Icon });

    const updateEditedCellValue: TableEditableCellPropsParams<TableRowData>['updateEditedCellValue'] = (obj) => {
      if (typeof obj === 'object' && ('rowValue' in obj || obj.isUpdateCurrentRow)) {
        const newObj = { ...obj };
        const rowValue = newObj.isUpdateCurrentRow ? get(row.value, props.rowKey) : newObj.rowValue;
        delete newObj.rowValue;
        delete newObj.isUpdateCurrentRow;
        context.emit('update-edited-cell', rowValue, row.value, newObj);
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
      const listeners = col.value.edit?.on?.({ ...cellParams.value, editedRow: currentRow.value, updateEditedCellValue }) || {};
      // example: onEnter-> enter
      Object.keys(listeners).forEach((eventName) => {
        if (eventName.slice(0, 2) === 'on') {
          listeners[eventName.slice(2).toLocaleLowerCase()] = listeners[eventName];
          delete listeners[eventName];
        }
      });
      return listeners;
    });

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

    const cellParams = computed(() => ({
      rowIndex: props.rowIndex,
      colIndex: props.colIndex,
      col: props.col,
      row: props.row,
    }));

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
      if (!edit) {
        return {};
      }
      const editProps = isFunction(edit.props)
        ? edit.props({
          ...cellParams.value,
          editedRow: currentRow.value,
          updateEditedCellValue,
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
      if (!edit) {
        return false;
      }
      return Boolean(edit.abortEditOnEvent?.includes('onChange'));
    });

    const validateEdit = (trigger: 'self' | 'parent'): Promise<true | AllValidateResult[]> => new Promise((resolve) => {
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
        const list = result?.filter(t => !t.result);
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

    const isSame = (a: any, b: any) => {
      if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      return a === b;
    };

    const updateAndSaveAbort = (outsideAbortEvent: Function, eventName: string, ...args: any) => {
      validateEdit('self').then((result) => {
        if (result !== true) {
          return;
        }
        const oldValue = get(row.value, col.value.colKey);
        // 相同的值无需触发变化
        if (!isSame(editValue.value, oldValue)) {
          editValue.value = oldValue;
          outsideAbortEvent?.(...args);
        }
        // Use enter for listeners in Vue2, instead of onEnter
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
      if (!isEdit.value || !isCellEditable) {
        return;
      }
      if (!edit?.abortEditOnEvent?.length) {
        return {};
      }
      // 自定义退出编辑态的事件
      const tListeners = {};
      const outsideAbortEvent = edit?.onEdited;
      edit.abortEditOnEvent.forEach((itemEvent) => {
        if (itemEvent === 'onChange') {
          return;
        }
        // Vue2 的事件监听不需要前缀 on，如：onEnter -> enter
        const eventName = itemEvent.slice(2, 3).toLocaleLowerCase() + itemEvent.slice(3);
        tListeners[eventName] = (...args: any) => {
          updateAndSaveAbort(
            outsideAbortEvent,
            eventName,
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
      props.onChange?.(params);
      props.onRuleChange?.(params);
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
      if (!col.value.edit || !col.value.edit.component) {
        return;
      }
      if (!isEdit.value) {
        return;
      }
      // @ts-expect-error some browser is also only support e.path
      const path = e.composedPath?.() || e.path || [];
      const node = path.find((node: HTMLElement) => node.classList?.contains(`${classPrefix.value}-popup__content`));
      if (node) {
        return;
      }
      const outsideAbortEvent = col.value.edit.onEdited;
      updateAndSaveAbort(outsideAbortEvent, '', {
        ...cellParams.value,
        trigger: 'document',
        newRowData: currentRow.value,
      });
    };

    const cellValue = computed(() => get(row.value, col.value.colKey));

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
        if (!col.value.edit || !col.value.edit.component || !isCellEditable) {
          return;
        }
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
        } else {
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

    return {
      editValue,
      isEdit,
      cellNode,
      isAbortEditOnChange,
      listeners,
      componentProps,
      tableEditableCellRef,
      errorList,
      currentRow,
      editOnListeners,
      onEditChange,
      Edit1Icon,
      validateEdit,
      onCellClick,
      cellParams,
    };
  },

  render() {
    if (this.readonly) {
      return <div>{this.cellNode}</div>;
    }
    // props.editable = undefined 表示由组件内部控制编辑状态
    if ((this.editable === undefined && !this.isEdit) || this.editable === false) {
      const { Edit1Icon } = this;
      return (
        <div class={this.tableBaseClass?.cellEditable} onClick={this.onCellClick}>
          {this.cellNode}
          {(this.col as PrimaryTableCol<TableRowData>).edit?.showEditIcon !== false && <Edit1Icon />}
        </div>
      );
    }
    // @ts-expect-error
    const Component = this.col.edit?.component;
    if (!Component) {
      log.error('Table', 'edit.component is required.');
      return null;
    }
    const errorMessage = this.errorList?.[0]?.message;
    const tmpEditOnListeners = { ...this.editOnListeners };
    // remove conflict events
    // @ts-expect-error
    if (this.col.edit?.abortEditOnEvent?.length) {
      // @ts-expect-error
      this.col.edit.abortEditOnEvent.forEach((onEventName) => {
        const vue2EventName = onEventName.slice(2).toLocaleLowerCase();
        if (tmpEditOnListeners[vue2EventName]) {
          delete tmpEditOnListeners[vue2EventName];
        }
      });
    }
    return (
      <div
        class={this.tableBaseClass?.cellEditWrap}
        ref="tableEditableCellRef"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <Component
          status={errorMessage ? this.errorList?.[0]?.type || 'error' : undefined}
          tips={errorMessage}
          props={this.componentProps}
          on={{ ...this.listeners, ...tmpEditOnListeners }}
          value={this.editValue}
          onChange={this.onEditChange}
        />
      </div>
    );
  },
});
