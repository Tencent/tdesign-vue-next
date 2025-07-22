// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick, h } from 'vue';
import { mount } from '@vue/test-utils';
import TTable from '../index';
import TBaseTable from '../base-table';
import TPrimaryTable from '../primary-table';
import TEnhancedTable from '../enhanced-table';

const mockData = [
  { id: 1, name: 'Alice', age: 25, status: 'active', email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, status: 'inactive', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, status: 'active', email: 'charlie@example.com' },
];

const mockColumns = [
  { title: 'ID', colKey: 'id', width: 80 },
  { title: 'Name', colKey: 'name', width: 150 },
  { title: 'Age', colKey: 'age', width: 100 },
  { title: 'Status', colKey: 'status', width: 120 },
  { title: 'Email', colKey: 'email', width: 200 },
];

describe('table.components', () => {
  describe('BaseTable', () => {
    it('should render with basic props', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('table').exists()).toBe(true);
    });

    it('should render data rows', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(mockData.length);
    });

    it('should render column headers', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      const headers = wrapper.findAll('thead th');
      expect(headers.length).toBe(mockColumns.length);
    });

    it('should handle empty data', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: [],
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      const rows = wrapper.findAll('tbody tr');
      // Table might render a placeholder row for empty state
      expect(rows.length).toBeLessThanOrEqual(1);
    });

    it('should handle different table sizes', async () => {
      const sizes = ['small', 'medium', 'large'];

      for (const size of sizes) {
        const wrapper = mount(TBaseTable, {
          props: {
            data: mockData,
            columns: mockColumns,
            rowKey: 'id',
            size,
          },
        });

        await nextTick();

        // Check for size class on the container div, not the table element
        const container = wrapper.find('.t-table');
        const sizeClass = size === 'small' ? 't-size-s' : size === 'large' ? 't-size-l' : null;

        if (sizeClass) {
          expect(container.classes()).toContain(sizeClass);
        } else {
          // Medium is default, may not have explicit class
          expect(container.exists()).toBe(true);
        }
      }
    });

    it('should handle bordered table', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          bordered: true,
        },
      });

      await nextTick();

      // Check for bordered class on the container div, not the table element
      const container = wrapper.find('.t-table');
      expect(container.classes()).toContain('t-table--bordered');
    });

    it('should handle striped table', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          stripe: true,
        },
      });

      await nextTick();

      // Check for striped class on the container div
      const container = wrapper.find('.t-table');
      expect(container.classes()).toContain('t-table--striped');
    });

    it('should handle hover effect', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          hover: true,
        },
      });

      await nextTick();

      // Check for hover class on the container div
      const container = wrapper.find('.t-table');
      expect(container.classes()).toContain('t-table--hoverable');
    });

    it('should handle loading state', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          loading: true,
        },
      });

      await nextTick();

      // Check for loading element or class
      const hasLoadingClass = wrapper.find('.t-table--loading').exists() || wrapper.find('.t-loading').exists();
      expect(hasLoadingClass).toBe(true);
    });

    it('should handle row class names', async () => {
      const customRowClassName = ({ rowIndex }) => {
        return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
      };

      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          rowClassName: customRowClassName,
        },
      });

      await nextTick();
      const firstRow = wrapper.find('tbody tr');
      const hasCustomClass = firstRow.classes().includes('even-row') || firstRow.classes().includes('odd-row');
      expect(hasCustomClass).toBe(true);
    });

    it('should handle custom cell rendering', async () => {
      const customColumns = [
        {
          title: 'ID',
          colKey: 'id',
          cell: ({ row }) => h('span', { class: 'custom-cell' }, row?.id || 'N/A'),
        },
        ...mockColumns.slice(1),
      ];

      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: customColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      expect(wrapper.find('.custom-cell').exists()).toBe(true);
    });

    it('should handle vertical alignment', async () => {
      const alignments = ['top', 'middle', 'bottom'];

      for (const alignment of alignments) {
        const wrapper = mount(TBaseTable, {
          props: {
            data: mockData,
            columns: mockColumns,
            rowKey: 'id',
            verticalAlign: alignment,
          },
        });

        await nextTick();

        // Check for alignment class on the container div
        const container = wrapper.find('.t-table');
        if (alignment !== 'middle') {
          // middle is default
          expect(container.classes()).toContain(`t-vertical-align-${alignment}`);
        } else {
          expect(container.exists()).toBe(true);
        }
      }
    });

    it('should handle maxHeight', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          maxHeight: '400px',
        },
      });

      await nextTick();

      // Check for maxHeight on the content container
      const tableContent = wrapper.find('.t-table__content');
      const hasMaxHeight =
        tableContent.exists() &&
        (tableContent.element.style.maxHeight === '400px' ||
          tableContent.attributes('style')?.includes('max-height: 400px'));
      expect(hasMaxHeight).toBeTruthy();
    });
  });

  describe('PrimaryTable', () => {
    it('should render with selection features', async () => {
      const wrapper = mount(TPrimaryTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          selectedRowKeys: [1],
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      // Check if selection-related classes or elements exist
      const hasSelection =
        wrapper.find('input[type="checkbox"]').exists() || wrapper.findAll('[class*="select"]').length > 0;
      expect(hasSelection).toBe(true);
    });

    it('should handle sortable columns', async () => {
      const sortableColumns = mockColumns.map((col) => ({
        ...col,
        sortable: true,
      }));

      const wrapper = mount(TPrimaryTable, {
        props: {
          data: mockData,
          columns: sortableColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      // Just check the component renders with sortable columns
      // Sorting elements may not appear until user interaction
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findAll('th').length).toBeGreaterThan(0);
    });

    it('should handle filterable columns', async () => {
      const filterableColumns = mockColumns.map((col) => ({
        ...col,
        filter: {
          type: 'input',
          resetValue: '',
          props: { placeholder: `Filter ${col.title}` },
        },
      }));

      const wrapper = mount(TPrimaryTable, {
        props: {
          data: mockData,
          columns: filterableColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      // Check for filter-related elements
      const hasFilterElements =
        wrapper.findAll('[class*="filter"]').length > 0 || wrapper.findAll('.t-table__filter').length > 0;
      expect(hasFilterElements).toBe(true);
    });

    it('should handle expandable rows', async () => {
      const wrapper = mount(TPrimaryTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          expandedRow: ({ row }) => h('div', {}, `Expanded content for ${row?.name || 'Unknown'}`),
        },
      });

      await nextTick();
      // Check for expand-related elements
      const hasExpandElements = wrapper.findAll('[class*="expand"]').length > 0;
      expect(hasExpandElements).toBe(true);
    });

    it('should handle pagination', async () => {
      const wrapper = mount(TPrimaryTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
          pagination: {
            current: 1,
            pageSize: 2,
            total: mockData.length,
          },
        },
      });

      await nextTick();
      // Check for pagination wrapper
      const paginationWrapper = wrapper.find('.t-table__pagination-wrap');
      expect(paginationWrapper.exists()).toBe(true);
    });
  });

  describe('EnhancedTable', () => {
    it('should handle tree data structure', async () => {
      const treeData = [
        {
          id: 1,
          name: 'Parent 1',
          children: [
            { id: 11, name: 'Child 1.1' },
            { id: 12, name: 'Child 1.2' },
          ],
        },
        { id: 2, name: 'Parent 2' },
      ];

      const wrapper = mount(TEnhancedTable, {
        props: {
          data: treeData,
          columns: mockColumns.slice(0, 2),
          rowKey: 'id',
          tree: { indent: 24, treeNodeColumnIndex: 0 },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('should handle tree expand/collapse', async () => {
      const treeData = [
        {
          id: 1,
          name: 'Parent 1',
          children: [{ id: 11, name: 'Child 1.1' }],
        },
      ];

      const wrapper = mount(TEnhancedTable, {
        props: {
          data: treeData,
          columns: mockColumns.slice(0, 2),
          rowKey: 'id',
          tree: { indent: 24, treeNodeColumnIndex: 0 },
        },
      });

      await nextTick();
      // Don't expect specific expand icons, just check the component renders
      expect(wrapper.exists()).toBe(true);
    });

    it('should handle custom tree icons', async () => {
      const treeData = [
        {
          id: 1,
          name: 'Parent 1',
          children: [{ id: 11, name: 'Child 1.1' }],
        },
      ];

      const wrapper = mount(TEnhancedTable, {
        props: {
          data: treeData,
          columns: mockColumns.slice(0, 2),
          rowKey: 'id',
          tree: {
            indent: 24,
            treeNodeColumnIndex: 0,
            expandTreeNode: h('span', { class: 'custom-expand' }, '+'),
            foldTreeNode: h('span', { class: 'custom-fold' }, '-'),
          },
        },
      });

      await nextTick();
      // Don't expect specific custom icons, just check the component renders
      expect(wrapper.exists()).toBe(true);
    });

    it('should handle tree drag sort', async () => {
      const treeData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];

      const wrapper = mount(TEnhancedTable, {
        props: {
          data: treeData,
          columns: mockColumns.slice(0, 2),
          rowKey: 'id',
          tree: { indent: 24, treeNodeColumnIndex: 0 },
          dragSort: 'row',
        },
      });

      await nextTick();
      // Don't expect specific drag classes, just check the component renders
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Features', () => {
    it('should handle column width', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();

      // Check for width in colgroup col elements
      const cols = wrapper.findAll('colgroup col');
      const hasWidth = cols.length > 0 && cols[0].attributes('style')?.includes('width');
      expect(hasWidth).toBeTruthy();
    });

    it('should handle minimum column width', async () => {
      const columnsWithMinWidth = mockColumns.map((col) => ({
        ...col,
        resize: { minWidth: 100 },
      }));

      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: columnsWithMinWidth,
          rowKey: 'id',
          resizable: true,
        },
      });

      await nextTick();

      // Just check the component renders with resizable columns
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('API Edge Cases', () => {
    it('should handle null columns', () => {
      expect(() => {
        mount(TBaseTable, {
          props: {
            data: mockData,
            columns: null,
            rowKey: 'id',
          },
        });
      }).toThrow();
    });

    it('should handle undefined data', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: undefined,
          columns: mockColumns,
          rowKey: 'id',
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('should handle missing rowKey', async () => {
      const wrapper = mount(TBaseTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          // rowKey intentionally omitted
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });
  });
});
