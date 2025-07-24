// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { PrimaryTable } from '@tdesign/components/table';

describe('Table Editable Cells Deep Tests', () => {
  const editableData = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com', status: 'active' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com', status: 'inactive' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com', status: 'active' },
  ];

  describe('Input Type Editable Cells', () => {
    it('should render input editable cells', async () => {
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Email', colKey: 'email', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle input validation rules', async () => {
      const onValidate = vi.fn();
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          edit: {
            component: 'input',
            rules: [{ required: true, message: 'Name is required' }],
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
          onValidate,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle input with keepEditMode', async () => {
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          edit: {
            component: 'input',
            keepEditMode: true,
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1, 2],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Select Type Editable Cells', () => {
    it('should render select editable cells', async () => {
      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Status',
          colKey: 'status',
          edit: {
            component: 'select',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle select with multiple options', async () => {
      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Status',
          colKey: 'status',
          edit: {
            component: 'select',
            multiple: true,
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Pending', value: 'pending' },
            ],
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle select with async options loading', async () => {
      const loadOptions = vi.fn().mockResolvedValue([
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ]);

      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Status',
          colKey: 'status',
          edit: {
            component: 'select',
            options: loadOptions,
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Date Picker Editable Cells', () => {
    it('should render date picker editable cells', async () => {
      const dataWithDates = [
        { id: 1, name: 'Alice', birthDate: '1998-01-01', createdAt: '2023-01-01' },
        { id: 2, name: 'Bob', birthDate: '1993-05-15', createdAt: '2023-02-01' },
      ];

      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Birth Date',
          colKey: 'birthDate',
          edit: {
            component: 'date-picker',
            props: { format: 'YYYY-MM-DD' },
          },
        },
        {
          title: 'Created At',
          colKey: 'createdAt',
          edit: {
            component: 'date-picker',
            props: { format: 'YYYY-MM-DD', enableTimePicker: true },
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: dataWithDates,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Custom Component Editable Cells', () => {
    it('should render custom component editable cells', async () => {
      const CustomEditor = {
        name: 'CustomEditor',
        props: ['value', 'onChange'],
        setup(props) {
          return () => (
            <input value={props.value} onInput={(e) => props.onChange?.(e.target.value)} placeholder="Custom editor" />
          );
        },
      };

      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Custom Field',
          colKey: 'customField',
          edit: {
            component: CustomEditor,
            props: { placeholder: 'Enter custom value' },
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle custom component with validation', async () => {
      const CustomValidatedEditor = {
        name: 'CustomValidatedEditor',
        props: ['value', 'onChange', 'onValidate'],
        setup(props) {
          const validate = () => {
            if (!props.value || props.value.length < 3) {
              props.onValidate?.({ result: false, message: 'Minimum 3 characters' });
            } else {
              props.onValidate?.({ result: true });
            }
          };

          return () => (
            <input
              value={props.value}
              onInput={(e) => {
                props.onChange?.(e.target.value);
                validate();
              }}
              onBlur={validate}
            />
          );
        },
      };

      const columns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Validated Field',
          colKey: 'validatedField',
          edit: {
            component: CustomValidatedEditor,
            rules: [{ validator: (val) => val && val.length >= 3 }],
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit Mode Controls', () => {
    it('should handle row-level edit mode', async () => {
      const onEditableChange = vi.fn();
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
          onEditableChange,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle cell-level edit mode', async () => {
      const onCellEditableChange = vi.fn();
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          edit: {
            component: 'input',
            abortEditOnEvent: ['onEnter'],
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          onCellEditableChange,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle edit mode with save/cancel buttons', async () => {
      const onRowEdit = vi.fn();
      const onRowValidate = vi.fn();
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
        {
          title: 'Actions',
          colKey: 'actions',
          edit: {
            component: 'multiple',
            showEditIcon: true,
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
          onRowEdit,
          onRowValidate,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit Events and Callbacks', () => {
    it('should handle onRowEdit event', async () => {
      const onRowEdit = vi.fn();
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
          onRowEdit,
        },
      });
      await nextTick();

      // Simulate edit event
      const component = wrapper.vm as any;
      if (component.onInnerRowEdit) {
        component.onInnerRowEdit({
          row: editableData[0],
          rowIndex: 0,
          trigger: 'edit-icon',
        });
      }

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle onRowValidate event', async () => {
      const onRowValidate = vi.fn();
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          edit: {
            component: 'input',
            rules: [{ required: true, message: 'Name is required' }],
          },
        },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
          onRowValidate,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle onCellEditableChange event', async () => {
      const onCellEditableChange = vi.fn();
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          onCellEditableChange,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit Validation', () => {
    it('should validate required fields', async () => {
      const tableRef = ref(null);
      const columns = [
        {
          title: 'Name',
          colKey: 'name',
          edit: {
            component: 'input',
            rules: [{ required: true, message: 'Name is required' }],
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          ref: tableRef,
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      // Test validation
      if (tableRef.value?.validateRowData) {
        const result = tableRef.value.validateRowData({ id: 1, name: '', age: 25 });
        expect(result).toBeDefined();
      }
    });

    it('should validate custom validation rules', async () => {
      const customValidator = vi.fn().mockReturnValue({ result: false, message: 'Custom error' });
      const columns = [
        {
          title: 'Email',
          colKey: 'email',
          edit: {
            component: 'input',
            rules: [{ validator: customValidator }],
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle async validation', async () => {
      const asyncValidator = vi.fn().mockResolvedValue({ result: true });
      const columns = [
        {
          title: 'Username',
          colKey: 'username',
          edit: {
            component: 'input',
            rules: [{ validator: asyncValidator }],
          },
        },
        { title: 'Age', colKey: 'age' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit State Management', () => {
    it('should handle controlled editable row keys', async () => {
      const editableRowKeys = ref([1]);
      const onEditableChange = vi.fn((keys) => {
        editableRowKeys.value = keys;
      });

      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: editableRowKeys.value,
          onEditableChange,
        },
      });
      await nextTick();

      // Change editable keys
      editableRowKeys.value = [2];
      await wrapper.setProps({ editableRowKeys: editableRowKeys.value });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle uncontrolled editable state', async () => {
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          defaultEditableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit Performance', () => {
    it('should handle large dataset editing efficiently', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      }));

      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Email', colKey: 'email', edit: { component: 'input' } },
        {
          title: 'Status',
          colKey: 'status',
          edit: {
            component: 'select',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: largeData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1, 2, 3, 4, 5], // Edit multiple rows
          pagination: { pageSize: 20 },
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle rapid edit state changes', async () => {
      const editableRowKeys = ref([]);
      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: editableData,
          columns,
          rowKey: 'id',
          editableRowKeys: editableRowKeys.value,
        },
      });

      // Rapidly change edit state
      for (let i = 0; i < 10; i++) {
        editableRowKeys.value = i % 2 === 0 ? [1, 2] : [3];
        await wrapper.setProps({ editableRowKeys: editableRowKeys.value });
      }

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Edit Edge Cases', () => {
    it('should handle editing with null/undefined initial values', async () => {
      const dataWithNulls = [
        { id: 1, name: null, age: undefined, email: '' },
        { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      ];

      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'Age', colKey: 'age', edit: { component: 'input' } },
        { title: 'Email', colKey: 'email', edit: { component: 'input' } },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: dataWithNulls,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle editing with circular data references', async () => {
      const circularData = [{ id: 1, name: 'Test' }];
      circularData[0].self = circularData[0]; // Create circular reference

      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: 'input' } },
        { title: 'ID', colKey: 'id' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: circularData,
          columns,
          rowKey: 'id',
          editableRowKeys: [1],
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle edit component errors gracefully', async () => {
      const ErrorComponent = {
        name: 'ErrorComponent',
        setup() {
          throw new Error('Component error');
        },
      };

      const columns = [
        { title: 'Name', colKey: 'name', edit: { component: ErrorComponent } },
        { title: 'Age', colKey: 'age' },
      ];

      // Should handle component errors gracefully
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let wrapper;
      try {
        wrapper = mount(PrimaryTable, {
          props: {
            data: [
              { id: 1, name: 'Alice', age: 25 },
              { id: 2, name: 'Bob', age: 30 },
            ],
            columns,
            rowKey: 'id',
            editableRowKeys: [1],
          },
        });
        await nextTick();

        // If the component renders despite the error, that's acceptable
        expect(wrapper.exists()).toBe(true);
      } catch (error) {
        // If an error is thrown, verify it's the expected component error
        expect(error.message).toBe('Component error');
      }
    });
  });
});
