import { computed, defineComponent, PropType, ref, SetupContext, toRefs, watch } from 'vue';
import get from 'lodash/get';
import set from 'lodash/set';
import { Edit1Icon } from 'tdesign-icons-vue-next';
import { TableRowData, PrimaryTableCol } from './type';
import useClassName from './hooks/useClassName';
import { renderCell } from './tr';
import { validate } from '../form/form-model';
import log from '../_common/js/log';

export interface EditableCellProps {
  row: TableRowData;
  rowIndex: number;
  col: PrimaryTableCol<TableRowData>;
  colIndex: number;
  oldCell: PrimaryTableCol<TableRowData>['cell'];
}

export default defineComponent({
  name: 'TableEditableCell',
  props: {
    row: Object as PropType<EditableCellProps['row']>,
    rowIndex: Number,
    col: Object as PropType<EditableCellProps['col']>,
    colIndex: Number,
    oldCell: [Function, String] as PropType<EditableCellProps['oldCell']>,
  },

  setup(props: EditableCellProps, context: SetupContext) {
    const { row, col } = toRefs(props);
    const { tableBaseClass } = useClassName();
    const tableEditableCellRef = ref(null);
    const isEdit = ref(false);
    const editValue = ref();
    const errorList = ref();

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
      );
      return node;
    });

    const componentProps = computed(() => {
      const { edit } = col.value;
      if (!edit) return {};
      const editProps = { ...edit.props };
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

    const validateEdit = () => {
      return new Promise((resolve) => {
        if (!col.value.edit?.rules) {
          resolve(true);
          return;
        }
        validate(editValue.value, col.value.edit?.rules).then((result) => {
          errorList.value = result?.filter((t) => !t.result);
          if (!errorList.value || !errorList.value.length) {
            resolve(true);
          } else {
            resolve(errorList);
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
      validateEdit().then((result) => {
        if (result !== true) return;
        // 相同的值无需触发变化
        if (!isSame(editValue.value, get(row.value, col.value.colKey))) {
          outsideAbortEvent?.(...args);
        }
        // 此处必须在事件执行完成后异步销毁编辑组件，否则会导致事件清楚不及时引起的其他问题
        const timer = setTimeout(() => {
          isEdit.value = false;
          clearTimeout(timer);
        }, 0);
      });
    };

    const listeners = computed<{ [key: string]: Function }>(() => {
      const { edit } = col.value;
      if (!isEdit.value) return;
      if (!edit?.abortEditOnEvent?.length) return {};
      // 自定义退出编辑态的事件
      const tListeners = {};
      edit.abortEditOnEvent.forEach((itemEvent) => {
        if (itemEvent === 'onChange') return;
        const outsideAbortEvent = edit.props[itemEvent];
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
      if (isAbortEditOnChange.value) {
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
      if (!isEdit.value || !tableEditableCellRef.value?.$el) return;
      // @ts-ignore
      if (e.path?.includes(tableEditableCellRef.value?.$el)) return;
      const outsideAbortEvent = col.value.edit.onEdited;
      updateAndSaveAbort(outsideAbortEvent, {
        trigger: 'document',
        newRowData: currentRow.value,
        rowIndex: props.rowIndex,
      });
    };

    watch(
      row,
      (row) => {
        let val = get(row, col.value.colKey);
        if (typeof val === 'object') {
          val = val instanceof Array ? [...val] : { ...val };
        }
        editValue.value = val;
      },
      { immediate: true },
    );

    watch(isEdit, (isEdit) => {
      if (!col.value.edit || !col.value.edit.component) return;
      if (isEdit) {
        document.addEventListener('click', documentClickHandler);
      } else {
        document.removeEventListener('click', documentClickHandler);
      }
    });

    return {
      editValue,
      isEdit,
      tableBaseClass,
      cellNode,
      isAbortEditOnChange,
      listeners,
      componentProps,
      tableEditableCellRef,
      errorList,
      onEditChange,
    };
  },

  render() {
    if (!this.isEdit) {
      return (
        <div
          class={this.tableBaseClass.cellEditable}
          onClick={(e: MouseEvent) => {
            this.isEdit = true;
            e.stopPropagation();
          }}
        >
          {this.cellNode}
          <Edit1Icon size="12px" />
        </div>
      );
    }
    // @ts-ignore
    const component = this.col.edit?.component;
    if (!component) {
      log.error('Table', 'edit.component is required.');
      return null;
    }
    const errorMessage = this.errorList?.[0]?.message;
    return (
      <div class={this.tableBaseClass.cellEditWrap}>
        <component
          ref="tableEditableCellRef"
          status={errorMessage ? this.errorList?.[0]?.type || 'error' : undefined}
          tips={errorMessage}
          {...this.componentProps}
          {...this.listeners}
          value={this.editValue}
          onChange={this.onEditChange}
        />
      </div>
    );
  },
});
