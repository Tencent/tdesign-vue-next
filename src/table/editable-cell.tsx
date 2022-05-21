import { defineComponent, PropType, ref, toRefs, watch } from 'vue';
import get from 'lodash/get';
import { Edit1Icon } from 'tdesign-icons-vue-next';
import { TableRowData, PrimaryTableCol } from './type';
import useClassName from './hooks/useClassName';

export default defineComponent({
  name: 'TableEditableCell',
  props: {
    row: Object as PropType<TableRowData>,
    rowIndex: Number,
    col: Object as PropType<PrimaryTableCol<TableRowData>>,
    colIndex: Number,
  },

  setup(props) {
    const { row, col } = toRefs(props);
    const isEdit = ref(false);
    const editValue = ref();
    const { tableBaseClass } = useClassName();

    watch(
      row,
      (row) => {
        // @ts-ignore
        editValue.value = get(row, col.value.colKey);
      },
      { immediate: true },
    );

    return {
      editValue,
      isEdit,
      tableBaseClass,
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
          {this.editValue}
          <Edit1Icon size="12px" />
        </div>
      );
    }
    // @ts-ignore
    const { edit } = this.col;
    const { component } = edit;
    const componentProps = { ...edit.props };
    // to remove warn: runtime-core.esm-bundler.js:38 [Vue warn]: Invalid prop: type check failed for prop "onChange". Expected Function, got Array
    delete componentProps.onChange;
    delete componentProps.value;
    const isAbortEditOnChange = !edit.abortOnEvent || edit.abortOnEvent === 'onChange';
    const listeners: { [key: string]: Function } = {};
    if (!isAbortEditOnChange && !listeners[edit.abortOnEvent]) {
      delete componentProps[edit.abortOnEvent];
      listeners[edit.abortOnEvent] = (...args: any) => {
        this.isEdit = false;
        edit.props?.[edit.abortOnEvent]?.(...args);
      };
    }
    return (
      <component
        {...componentProps}
        {...listeners}
        value={this.editValue}
        onChange={(val: any) => {
          this.editValue = val;
          edit.props?.onChange?.(val);
          if (isAbortEditOnChange) {
            this.isEdit = false;
          }
        }}
      />
    );
  },
});
