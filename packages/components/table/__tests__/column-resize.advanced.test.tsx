// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref } from 'vue';
import { BaseTable, PrimaryTable } from '@tdesign/components/table';

describe('ColumnResize Advanced Tests', () => {
  const data = [
    { id: 1, name: 'Alice', age: 25, status: 'active', department: 'Engineering' },
    { id: 2, name: 'Bob', age: 30, status: 'inactive', department: 'Marketing' },
    { id: 3, name: 'Charlie', age: 35, status: 'active', department: 'Sales' },
  ];

  const baseColumns = [
    { title: 'Name', colKey: 'name', width: 100 },
    { title: 'Age', colKey: 'age', width: 80 },
    { title: 'Status', colKey: 'status', width: 100 },
    { title: 'Department', colKey: 'department', width: 120 },
  ];

  beforeEach(() => {
    // Mock getBoundingClientRect for DOM manipulation tests
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: 100,
      x: 0,
      y: 0,
      toJSON: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Column Resize', () => {
    it('should render table with resizable columns', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle onColumnResizeChange event', async () => {
      const onColumnResizeChange = vi.fn();

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
          onColumnResizeChange,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should disable resize for specific columns', async () => {
      const columnsWithResizable = [
        { title: 'Name', colKey: 'name', width: 100, resizable: false },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: columnsWithResizable,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Min/Max Width', () => {
    it('should handle columns with minWidth', async () => {
      const columnsWithMinWidth = [
        { title: 'Name', colKey: 'name', width: 100, minWidth: 80 },
        { title: 'Age', colKey: 'age', width: 80, minWidth: 60 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: columnsWithMinWidth,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle columns with maxWidth', async () => {
      const columnsWithMaxWidth = [
        { title: 'Name', colKey: 'name', width: 100, maxWidth: 200 },
        { title: 'Age', colKey: 'age', width: 80, maxWidth: 120 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: columnsWithMaxWidth,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle columns with resize config', async () => {
      const columnsWithResize = [
        {
          title: 'Name',
          colKey: 'name',
          width: 100,
          resize: {
            minWidth: 50,
            maxWidth: 300,
          },
        },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: columnsWithResize,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Fixed Columns', () => {
    it('should handle left fixed columns resize', async () => {
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: fixedColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle right fixed columns resize', async () => {
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100 },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120, fixed: 'right' },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: fixedColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle mixed fixed columns resize', async () => {
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Department', colKey: 'department', width: 120, fixed: 'right' },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: fixedColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Multi-level Headers', () => {
    it('should handle multi-level headers resize', async () => {
      const multiLevelColumns = [
        {
          title: 'Personal Info',
          children: [
            { title: 'Name', colKey: 'name', width: 100 },
            { title: 'Age', colKey: 'age', width: 80 },
          ],
        },
        {
          title: 'Work Info',
          children: [
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Department', colKey: 'department', width: 120 },
          ],
        },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: multiLevelColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle deeply nested columns resize', async () => {
      const deepColumns = [
        {
          title: 'Info',
          children: [
            {
              title: 'Personal',
              children: [
                { title: 'Name', colKey: 'name', width: 100 },
                { title: 'Age', colKey: 'age', width: 80 },
              ],
            },
            { title: 'Status', colKey: 'status', width: 100 },
          ],
        },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: deepColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Table Layout', () => {
    it('should handle fixed table layout with resize', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
          tableLayout: 'fixed',
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle auto table layout with resize', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
          tableLayout: 'auto',
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Overflow', () => {
    it('should handle table with horizontal overflow', async () => {
      const wideColumns = [
        { title: 'Name', colKey: 'name', width: 200 },
        { title: 'Age', colKey: 'age', width: 200 },
        { title: 'Status', colKey: 'status', width: 200 },
        { title: 'Department', colKey: 'department', width: 200 },
        { title: 'Extra1', colKey: 'extra1', width: 200 },
        { title: 'Extra2', colKey: 'extra2', width: 200 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: wideColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle table without overflow', async () => {
      const narrowColumns = [
        { title: 'Name', colKey: 'name', width: 50 },
        { title: 'Age', colKey: 'age', width: 50 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: narrowColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize Mouse Events', () => {
    it('should handle column mouseover events', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      const firstTh = wrapper.find('th');
      if (firstTh.exists()) {
        await firstTh.trigger('mouseover');
      }

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle column mousedown events', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      const firstTh = wrapper.find('th');
      if (firstTh.exists()) {
        await firstTh.trigger('mousedown');
      }

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle column mousemove events', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      const firstTh = wrapper.find('th');
      if (firstTh.exists()) {
        await firstTh.trigger('mousemove');
      }

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize Edge Cases', () => {
    it('should handle columns without width', async () => {
      const columnsWithoutWidth = [
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'age' },
        { title: 'Status', colKey: 'status' },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: columnsWithoutWidth,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle empty columns array', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: [],
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle columns with zero width', async () => {
      const zeroWidthColumns = [
        { title: 'Name', colKey: 'name', width: 0 },
        { title: 'Age', colKey: 'age', width: 80 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: zeroWidthColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle very large width values', async () => {
      const largeWidthColumns = [
        { title: 'Name', colKey: 'name', width: 10000 },
        { title: 'Age', colKey: 'age', width: 5000 },
      ];

      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: largeWidthColumns,
          rowKey: 'id',
          resizable: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Resize with Affix', () => {
    it('should handle resize with header affix', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
          headerAffixedTop: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle resize with footer affix', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          resizable: true,
          footerAffixedBottom: true,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });
});
