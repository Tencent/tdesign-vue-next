import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import EditableCell from '../components/editable-cell';

// mock input component
const MockInput = {
  name: 'MockInput',
  props: ['value'],
  emits: ['change'],
  template: '<input :value="value" @input="$emit(\'change\', $event.target.value)" />',
};

// 测试数据
const testRow = {
  id: 1,
  name: 'Alice',
  age: 25,
  status: 'active',
  email: 'alice@example.com',
};

const testCol = {
  colKey: 'name',
  title: 'Name',
  width: 100,
  edit: {
    type: 'input',
    component: MockInput,
    props: {
      placeholder: 'Enter name',
    },
    rules: [{ required: true, message: 'Name is required' }],
  },
};

const testColWithNestedKey = {
  colKey: 'user.name',
  title: 'User Name',
  width: 100,
  edit: {
    type: 'input',
    component: MockInput,
    props: {
      placeholder: 'Enter user name',
    },
  },
};

const tableBaseClass = {
  cellEditable: 't-table__cell-editable',
  cell: 't-table__cell',
  cellEditableCell: 't-table__cell-editable-cell',
};

describe('EditableCell Component', () => {
  describe('Basic Rendering', () => {
    it('should render basic editable cell', async () => {
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      // 默认是只读态，断言内容存在
      expect(wrapper.text()).toContain('Alice');
    });

    it('should render in read-only mode', async () => {
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          readonly={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      // 只读态直接渲染内容
      expect(wrapper.text()).toContain('Alice');
    });

    it('should render with editable mode', async () => {
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={{ ...testCol, edit: { ...testCol.edit, component: MockInput } }}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      // 编辑态渲染cellEditWrap
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeFalsy();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with custom cell content', async () => {
      const customCell = () => <span>Custom Content</span>;
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={customCell}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.text()).toContain('Custom Content');
    });
  });

  describe('Edit Configuration', () => {
    it('should render with input edit type', async () => {
      const inputCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={inputCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with select edit type', async () => {
      const selectCol = {
        ...testCol,
        edit: {
          type: 'select',
          component: MockInput,
          props: {
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={selectCol}
          colIndex={0}
          oldCell={() => 'active'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with function edit props', async () => {
      const functionPropsCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: ({ row, col }) => ({
            placeholder: `Enter ${col.title}`,
            disabled: row.status === 'inactive',
          }),
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={functionPropsCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with keep edit mode', async () => {
      const keepEditCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          keepEditMode: true,
          props: {
            placeholder: 'Enter name',
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={keepEditCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with default editable', async () => {
      const defaultEditableCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          defaultEditable: true,
          props: {
            placeholder: 'Enter name',
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={defaultEditableCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Validation', () => {
    it('should render with validation rules', async () => {
      const validationCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
          rules: [
            { required: true, message: 'Name is required' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ],
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={validationCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
          onValidate={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with function validation rules', async () => {
      const functionRulesCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
          rules: ({ row }) => [
            { required: true, message: 'Name is required' },
            {
              validator: (val) => val !== row.name || 'Name cannot be the same',
              message: 'Name cannot be the same as current',
            },
          ],
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={functionRulesCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
          onValidate={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should render with errors', async () => {
      const errors = [{ type: 'error', message: 'Name is required' }];
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          errors={errors}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Event Handling', () => {
    it('should handle edit change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={onChange}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should handle rule change', async () => {
      const onRuleChange = vi.fn();
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onRuleChange={onRuleChange}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Nested Object Keys', () => {
    it('should handle nested object keys', async () => {
      const nestedRow = {
        id: 1,
        user: {
          name: 'Alice',
          age: 25,
        },
        status: 'active',
      };
      const wrapper = mount(() => (
        <EditableCell
          row={nestedRow}
          rowKey="id"
          rowIndex={0}
          col={testColWithNestedKey}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should handle deep nested object keys', async () => {
      const deepNestedRow = {
        id: 1,
        user: {
          profile: {
            name: 'Alice',
            details: {
              age: 25,
            },
          },
        },
      };
      const deepNestedCol = {
        colKey: 'user.profile.details.age',
        title: 'Age',
        width: 80,
        edit: {
          type: 'input-number',
          component: MockInput,
          props: {
            min: 0,
            max: 150,
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={deepNestedRow}
          rowKey="id"
          rowIndex={0}
          col={deepNestedCol}
          colIndex={0}
          oldCell={() => 25}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Abort Edit Events', () => {
    it('should handle abort edit on change', async () => {
      const abortEditCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
          abortEditOnEvent: ['onChange'],
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={abortEditCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('should handle abort edit on blur', async () => {
      const abortEditCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
          abortEditOnEvent: ['onBlur'],
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={abortEditCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Edit Listeners', () => {
    it('should handle edit on listeners', async () => {
      const onListenersCol = {
        ...testCol,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter name',
          },
          on: ({
            row: _row,
            col: _col,
            rowIndex: _rowIndex,
            colIndex: _colIndex,
            editedRow: _editedRow,
            updateEditedCellValue,
          }) => ({
            onFocus: () => {},
            onBlur: () => updateEditedCellValue('New Value'),
          }),
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={onListenersCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Cell Empty Content', () => {
    it('should render with custom cell empty content', async () => {
      const cellEmptyContent = () => <span>No Data</span>;
      const emptyRow = { id: 1, name: null };
      const wrapper = mount(() => (
        <EditableCell
          row={emptyRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => null}
          tableBaseClass={tableBaseClass}
          cellEmptyContent={cellEmptyContent}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeTruthy();
    });

    it('should render with string cell empty content', async () => {
      const emptyRow = { id: 1, name: null };
      const wrapper = mount(() => (
        <EditableCell
          row={emptyRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => null}
          tableBaseClass={tableBaseClass}
          cellEmptyContent="No Data"
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined row', async () => {
      const wrapper = mount(() => (
        <EditableCell
          row={undefined}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeTruthy();
    });

    it('should handle col without edit configuration', async () => {
      const noEditCol = {
        colKey: 'name',
        title: 'Name',
        width: 100,
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={noEditCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeTruthy();
    });

    it('should handle empty string colKey', async () => {
      const emptyKeyCol = {
        colKey: '',
        title: 'Empty',
        width: 100,
        edit: {
          type: 'input',
          component: MockInput,
          props: {
            placeholder: 'Enter value',
          },
        },
      };
      const wrapper = mount(() => (
        <EditableCell
          row={testRow}
          rowKey="id"
          rowIndex={0}
          col={emptyKeyCol}
          colIndex={0}
          oldCell={() => 'Value'}
          tableBaseClass={tableBaseClass}
          editable={true}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('input').exists()).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should handle large data objects', async () => {
      const largeRow = {
        id: 1,
        name: 'Alice',
        ...Array.from({ length: 100 }, (_, index) => ({ [`field${index}`]: `value${index}` })).reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {},
        ),
      };
      const wrapper = mount(() => (
        <EditableCell
          row={largeRow}
          rowKey="id"
          rowIndex={0}
          col={testCol}
          colIndex={0}
          oldCell={() => 'Alice'}
          tableBaseClass={tableBaseClass}
          onChange={vi.fn()}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table__cell-editable').exists()).toBeTruthy();
    });
  });
});
