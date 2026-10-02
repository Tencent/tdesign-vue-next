import { defineComponent, markRaw, nextTick } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import EditableCell from '@tdesign/components/table/components/editable-cell';
import type { EditableCellProps } from '@tdesign/components/table/components/editable-cell';
import type {
  PrimaryTableCol,
  TableEditableCellConfig,
  TableEditableCellPropsParams,
  TableRowData,
} from '@tdesign/components/table/type';
import log from '@tdesign/common-js/log/index';

const TestEditor = defineComponent({
  name: 'TestEditor',
  inheritAttrs: false,
  props: {
    value: null,
    status: String,
    tips: String,
    custom: String,
    updateEditedCellValue: Function,
  },
  emits: ['change', 'blur'],
  setup(props, { emit, attrs }) {
    return () => (
      <input
        class="test-editor"
        value={String(props.value ?? '')}
        data-status={props.status}
        data-tips={props.tips}
        data-custom={props.custom}
        data-extra={String(attrs.extra ?? '')}
        onInput={(event) => emit('change', (event.target as HTMLInputElement).value, { event })}
        onBlur={(event) => emit('blur', 'blur-value', { event })}
      />
    );
  },
});

describe('EditableCell', () => {
  const tableBaseClass = {
    cellEditable: 't-table__cell--editable',
    cellEditWrap: 't-table__cell-wrap',
  } as unknown as EditableCellProps['tableBaseClass'];
  const row: TableRowData = { id: 1, name: 'old value', profile: { name: 'nested value' } };

  function getColumn(edit: Partial<TableEditableCellConfig> = {}): PrimaryTableCol<TableRowData> {
    return {
      colKey: 'name',
      title: 'Name',
      edit: {
        component: markRaw(TestEditor),
        ...edit,
      },
    };
  }

  function mountCell(props: Partial<EditableCellProps> = {}) {
    return mount(EditableCell, {
      props: {
        rowKey: 'id',
        row,
        rowIndex: 0,
        col: getColumn(),
        colIndex: 1,
        oldCell: (_h, params) => params.row.name,
        tableBaseClass,
        ...props,
      },
      attachTo: document.body,
    });
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':readonly[boolean]', () => {
      const wrapper = mountCell({ readonly: true });
      expect(wrapper.text()).toBe('old value');
      expect(wrapper.find('.t-table__cell--editable').exists()).toBe(false);
      expect(wrapper.findComponent(TestEditor).exists()).toBe(false);
    });

    it(':editable[boolean] renders read and edit modes', async () => {
      const wrapper = mountCell({ editable: false });
      expect(wrapper.find('.t-table__cell--editable').exists()).toBe(true);

      await wrapper.setProps({ editable: true });
      expect(wrapper.findComponent(TestEditor).exists()).toBe(true);
      expect(wrapper.find('.test-editor').attributes('value')).toBe('old value');
    });

    it(':col[object].edit.defaultEditable enters edit mode on mount', () => {
      const onEditableChange = vi.fn();
      const wrapper = mountCell({ col: getColumn({ defaultEditable: true }), onEditableChange });
      expect(wrapper.findComponent(TestEditor).exists()).toBe(true);
      expect(onEditableChange.mock.calls[0][0]).toMatchObject({ isEdit: true, value: 'old value' });
    });

    it(':col[object].edit.keepEditMode remains editable', async () => {
      vi.useFakeTimers();
      const onEditableChange = vi.fn();
      const wrapper = mountCell({ col: getColumn({ keepEditMode: true }), onEditableChange });
      await wrapper.find('.test-editor').trigger('blur');
      await Promise.resolve();
      vi.runAllTimers();
      await nextTick();

      expect(wrapper.findComponent(TestEditor).exists()).toBe(true);
      expect(onEditableChange.mock.calls.some(([context]) => context.isEdit === false)).toBe(false);
    });

    it(':col[object].edit.showEditIcon[boolean]', () => {
      const wrapper = mountCell({ col: getColumn({ showEditIcon: false }) });
      expect(wrapper.find('.t-icon-edit-1').exists()).toBe(false);
    });

    it(':col[object].edit.props[object/function] forwards component props without conflicting values', async () => {
      const onChange = vi.fn();
      const wrapper = mountCell({
        editable: true,
        col: getColumn({
          props: { custom: 'object', value: 'ignored', onChange, extra: 1 },
        }),
      });
      expect(wrapper.find('.test-editor').attributes()).toMatchObject({
        'data-custom': 'object',
        'data-extra': '1',
        value: 'old value',
      });

      await wrapper.setProps({
        col: getColumn({
          props: ({ editedRow }: { editedRow: typeof row }) => ({ custom: editedRow.name, extra: 2 }),
        }),
      });
      expect(wrapper.find('.test-editor').attributes('data-custom')).toBe('old value');
      expect(wrapper.find('.test-editor').attributes('data-extra')).toBe('2');
    });

    it(':errors[array] restores and updates validation state', async () => {
      const wrapper = mountCell({
        editable: true,
        errors: [{ result: false, message: 'initial error', type: 'warning' }],
      });
      expect(wrapper.find('.test-editor').attributes('data-status')).toBe('warning');
      expect(wrapper.find('.test-editor').attributes('data-tips')).toBe('initial error');

      await wrapper.setProps({ errors: [{ result: false, message: 'next error' }] });
      expect(wrapper.find('.test-editor').attributes('data-status')).toBe('error');
      expect(wrapper.find('.test-editor').attributes('data-tips')).toBe('next error');
    });

    it(':col[object].edit.component is required in edit mode', () => {
      const spy = vi.spyOn(log, 'error').mockImplementation(() => undefined);
      const wrapper = mountCell({ editable: true, col: { colKey: 'name', edit: {} } });
      expect(wrapper.html()).toBe('');
      expect(spy).toHaveBeenCalledWith('Table', 'edit.component is required.');
    });

    it(':col[object].colKey supports nested values', async () => {
      const onChange = vi.fn();
      const wrapper = mountCell({
        editable: true,
        col: { ...getColumn(), colKey: 'profile.name' },
        oldCell: (_h, params) => params.row.profile.name,
        onChange,
      });
      expect(wrapper.find('.test-editor').attributes('value')).toBe('nested value');

      await wrapper.findComponent(TestEditor).vm.$emit('change', 'next nested');
      expect(onChange.mock.calls[0][0].editedRow['profile.name']).toBe('next nested');
      expect(onChange.mock.calls[0][0].editedRow.profile.name).toBe('nested value');
      expect(row.profile.name).toBe('nested value');
    });
  });

  describe('events', () => {
    it('onEditableChange enters internal edit mode after clicking the cell', async () => {
      const onEditableChange = vi.fn();
      const wrapper = mountCell({ onEditableChange });
      await wrapper.find('.t-table__cell--editable').trigger('click');

      expect(wrapper.findComponent(TestEditor).exists()).toBe(true);
      expect(onEditableChange.mock.calls[0][0]).toMatchObject({ isEdit: true, row, colIndex: 1 });
      expect(typeof onEditableChange.mock.calls[0][0].validateEdit).toBe('function');
    });

    it('onChange, onRuleChange and edit.on.onChange receive edited data', async () => {
      const onChange = vi.fn();
      const onRuleChange = vi.fn();
      const editOnChange = vi.fn();
      const wrapper = mountCell({
        editable: true,
        col: getColumn({ on: () => ({ onChange: editOnChange }) }),
        onChange,
        onRuleChange,
      });
      await wrapper.findComponent(TestEditor).vm.$emit('change', 'next value', { source: 'test' });

      expect(onChange.mock.calls[0][0]).toMatchObject({
        value: 'next value',
        editedRow: { ...row, name: 'next value' },
      });
      expect(onRuleChange).toHaveBeenCalledTimes(2);
      expect(editOnChange.mock.calls[0][0]).toMatchObject({ value: 'next value' });
    });

    it('onValidate reports successful and failed validation', async () => {
      const onValidate = vi.fn();
      const wrapper = mountCell({
        editable: true,
        col: getColumn({ rules: [{ required: true, message: 'Name is required' }], validateTrigger: 'change' }),
        onValidate,
      });

      await wrapper.findComponent(TestEditor).vm.$emit('change', '');
      await nextTick();
      await flushPromises();
      expect(onValidate.mock.calls.at(-1)[0].result[0].errorList[0].message).toBe('Name is required');
      expect(wrapper.find('.test-editor').attributes('data-tips')).toBe('Name is required');

      await wrapper.findComponent(TestEditor).vm.$emit('change', 'valid');
      await flushPromises();
      await nextTick();
      expect(onValidate.mock.calls.at(-1)[0].result[0].errorList).toEqual([]);
    });

    it('edit.abortEditOnEvent onChange saves and exits after successful validation', async () => {
      vi.useFakeTimers();
      const onEdited = vi.fn();
      const onEditableChange = vi.fn();
      const wrapper = mountCell({
        col: getColumn({ abortEditOnEvent: ['onChange'], onEdited }),
        onEditableChange,
      });
      await wrapper.find('.t-table__cell--editable').trigger('click');
      await wrapper.findComponent(TestEditor).vm.$emit('change', 'next value', { source: 'change' });
      await Promise.resolve();
      vi.runAllTimers();
      await nextTick();

      expect(onEdited.mock.calls[0][0]).toMatchObject({
        trigger: 'onChange',
        newRowData: { ...row, name: 'next value' },
      });
      expect(onEditableChange.mock.calls.at(-1)[0].isEdit).toBe(false);
      expect(wrapper.find('.t-table__cell--editable').exists()).toBe(true);
    });

    it('custom abort events save first and then forward the ordinary listener', async () => {
      vi.useFakeTimers();
      const onEdited = vi.fn();
      const ordinaryBlur = vi.fn();
      const wrapper = mountCell({
        col: getColumn({ abortEditOnEvent: ['onBlur'], onEdited, on: () => ({ onBlur: ordinaryBlur }) }),
      });
      await wrapper.find('.t-table__cell--editable').trigger('click');
      await wrapper.findComponent(TestEditor).vm.$emit('change', 'next value');
      await wrapper.find('.test-editor').trigger('blur');
      await Promise.resolve();
      vi.runAllTimers();

      expect(onEdited).toHaveBeenCalledTimes(1);
      expect(onEdited.mock.calls[0][0].trigger).toBe('onBlur');
      expect(ordinaryBlur).toHaveBeenCalledTimes(1);
    });

    it('document click exits editing while popup clicks are ignored', async () => {
      vi.useFakeTimers();
      const onEdited = vi.fn();
      const onEditableChange = vi.fn();
      const wrapper = mountCell({ col: getColumn({ onEdited }), onEditableChange });
      await wrapper.find('.t-table__cell--editable').trigger('click');

      const popup = document.createElement('div');
      popup.className = 't-popup__content';
      document.body.appendChild(popup);
      popup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      vi.runAllTimers();
      expect(wrapper.findComponent(TestEditor).exists()).toBe(true);

      await wrapper.findComponent(TestEditor).vm.$emit('change', 'next value');
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
      vi.runAllTimers();
      await nextTick();
      expect(onEdited.mock.calls.at(-1)[0].trigger).toBe('document');
      expect(onEditableChange.mock.calls.at(-1)[0].isEdit).toBe(false);
    });

    it('updateEditedCellValue emits row and nested updates', async () => {
      const wrapper = mountCell({
        editable: true,
        col: getColumn({
          props: ({ updateEditedCellValue }: TableEditableCellPropsParams<TableRowData>) => ({
            updateEditedCellValue,
          }),
        }),
      });
      const update = wrapper.findComponent(TestEditor).props('updateEditedCellValue');
      update({ isUpdateCurrentRow: true, name: 'row update' });
      update('cell update');
      await nextTick();

      expect(wrapper.emitted('update-edited-cell')[0]).toEqual([1, row, { name: 'row update' }]);
      expect(wrapper.find('.test-editor').attributes('value')).toBe('cell update');
    });

    it('onCellInstanceChange registers, clears and unregisters the exposed instance', async () => {
      const onCellInstanceChange = vi.fn();
      const wrapper = mountCell({
        editable: true,
        cellKey: '1__name',
        errors: [{ result: false, message: 'error' }],
        onCellInstanceChange,
      });
      const instance = onCellInstanceChange.mock.calls[0][1];
      expect(typeof instance.clearValidateCellData).toBe('function');
      instance.clearValidateCellData();
      await nextTick();
      expect(wrapper.find('.test-editor').attributes('data-tips')).toBeUndefined();

      wrapper.unmount();
      expect(onCellInstanceChange).toHaveBeenLastCalledWith('1__name', null);
    });
  });
});
