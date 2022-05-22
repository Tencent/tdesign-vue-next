import { computed, defineComponent, PropType, ref, SetupContext, toRefs, watch } from 'vue';
import get from 'lodash/get';
import set from 'lodash/set';
import { Edit1Icon } from 'tdesign-icons-vue-next';
import { TableRowData, PrimaryTableCol } from './type';
import useClassName from './hooks/useClassName';
import { renderCell } from './tr';
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
    const isEdit = ref(false);
    const editValue = ref();
    const { tableBaseClass } = useClassName();

    const currentRow = computed(() => {
      const newRow = { ...row.value };
      set(newRow, col.value.colKey, editValue.value);
      return newRow;
    });

    const cellNode = computed(() => {
      const node = renderCell(
        {
          row: currentRow.value,
          // @ts-ignore
          col: { ...col.value, cell: props.oldCell },
          rowIndex: props.rowIndex,
          colIndex: props.colIndex,
        },
        context.slots,
      );
      return node;
    });

    const outsideOnChange = computed(() => col.value.edit?.props?.onChange);
    const componentProps = computed(() => {
      const { edit } = col.value;
      if (!edit) return {};
      const editProps = { ...edit.props };
      // to remove warn: runtime-core.esm-bundler.js:38 [Vue warn]: Invalid prop: type check failed for prop "onChange". Expected Function, got Array
      delete editProps.onChange;
      delete editProps.value;
      delete editProps[edit.abortOnEvent];
      return editProps;
    });

    const isAbortEditOnChange = computed(() => {
      const { edit } = col.value;
      if (!edit) return false;
      return Boolean(!edit.abortOnEvent || edit.abortOnEvent === 'onChange');
    });

    const listeners = computed<{ [key: string]: Function }>(() => {
      const { edit } = col.value;
      if (!isEdit.value || !edit || isAbortEditOnChange.value || !edit.abortOnEvent) return {};
      let outsideAbortEvent = edit.props[edit.abortOnEvent];
      const tListeners = {
        [edit.abortOnEvent]: (...args: any) => {
          listeners.value[edit.abortOnEvent] = null;
          outsideAbortEvent?.(...args);
          outsideAbortEvent = null;
          // 此处必须在事件执行完成后异步销毁编辑组件，否则会导致事件清楚不及时引起的其他问题
          const timer = setTimeout(() => {
            isEdit.value = false;
            clearTimeout(timer);
          }, 0);
        },
      };
      return tListeners;
    });

    watch(
      row,
      (row) => {
        editValue.value = get(row, col.value.colKey);
      },
      { immediate: true },
    );

    return {
      editValue,
      isEdit,
      tableBaseClass,
      cellNode,
      isAbortEditOnChange,
      outsideOnChange,
      listeners,
      componentProps,
    };
  },

  render() {
    if (!this.isEdit) {
      return (
        <div
          class={this.tableBaseClass.cellEditable}
          onClick={() => {
            this.isEdit = true;
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
    return (
      <component
        {...this.componentProps}
        {...this.listeners}
        value={this.editValue}
        onChange={(val: any) => {
          this.editValue = val;
          this.outsideOnChange?.(val);
          if (this.isAbortEditOnChange) {
            this.isEdit = false;
          }
        }}
      />
    );
  },
});
