import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { h } from 'vue';
import { mockData, waitForRender, basicColumns } from './shared/test-utils';
import { ADVANCED_COMPONENTS } from './shared/test-constants';

describe('Table Advanced Functionality', () => {
  // 测试高级渲染功能
  describe('Advanced Rendering', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Advanced Rendering`, () => {
        it('should render table with complex custom cell renderer', async () => {
          const complexColumns = [
            { title: 'ID', colKey: 'id', width: 80 },
            {
              title: 'Name',
              colKey: 'name',
              width: 150,
              cell: (h: any, { row }: any) =>
                h('div', { class: 'complex-name' }, [
                  h('span', { class: 'name-text' }, row.name),
                  h('span', { class: 'name-badge' }, row.status),
                ]),
            },
            {
              title: 'Actions',
              colKey: 'actions',
              width: 120,
              cell: (h: any, { row }: any) =>
                h('div', { class: 'action-buttons' }, [
                  h('button', { class: 'btn-edit' }, 'Edit'),
                  h('button', { class: 'btn-delete' }, 'Delete'),
                ]),
            },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={complexColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证复杂自定义渲染
          const complexNameCell = wrapper.find('.complex-name');
          expect(complexNameCell.exists()).toBeTruthy();
          expect(complexNameCell.find('.name-text').text()).toBe('Alice Johnson');
          expect(complexNameCell.find('.name-badge').text()).toBe('active');

          // 验证操作按钮
          const actionButtons = wrapper.find('.action-buttons');
          expect(actionButtons.exists()).toBeTruthy();
          expect(actionButtons.find('.btn-edit').text()).toBe('Edit');
          expect(actionButtons.find('.btn-delete').text()).toBe('Delete');
        });

        it('should render table with conditional cell rendering', async () => {
          const conditionalColumns = [
            { title: 'ID', colKey: 'id', width: 80 },
            {
              title: 'Status',
              colKey: 'status',
              width: 100,
              cell: (h: any, { row }: any) => {
                const isActive = row.status === 'active';
                return h(
                  'span',
                  {
                    class: isActive ? 'status-active' : 'status-inactive',
                  },
                  isActive ? '✓ Active' : '✗ Inactive',
                );
              },
            },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={conditionalColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证条件渲染
          const activeStatus = wrapper.find('.status-active');
          const inactiveStatus = wrapper.find('.status-inactive');
          expect(activeStatus.exists()).toBeTruthy();
          expect(inactiveStatus.exists()).toBeTruthy();
          expect(activeStatus.text()).toBe('✓ Active');
          expect(inactiveStatus.text()).toBe('✗ Inactive');
        });

        it('should render table with custom empty state', async () => {
          const customEmpty = () => h('div', { class: 'custom-empty' }, 'No data found');

          const wrapper = mount(() => (
            <TableComponent data={[]} columns={basicColumns} rowKey="id" empty={customEmpty} />
          ));

          await waitForRender(wrapper);

          // 验证自定义空状态
          const emptyElement = wrapper.find('.t-table__empty');
          expect(emptyElement.exists()).toBeTruthy();
          expect(emptyElement.text()).toContain('No data found');
        });
      });
    });
  });

  // 测试复杂交互功能
  describe('Complex Interactions', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Complex Interactions`, () => {
        it('should handle column resize with custom min/max width', async () => {
          const resizableColumns = [
            { title: 'ID', colKey: 'id', width: 80, resizable: true, minWidth: 60, maxWidth: 200 },
            { title: 'Name', colKey: 'name', width: 150, resizable: true, minWidth: 100, maxWidth: 300 },
            { title: 'Age', colKey: 'age', width: 80, resizable: true, minWidth: 60, maxWidth: 150 },
          ];

          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={resizableColumns} rowKey="id" resizable={true} />
          ));

          await waitForRender(wrapper);

          // 验证可调整列宽功能
          expect(wrapper.classes()).toContain('t-table--column-resizable');
        });
      });
    });
  });
});
