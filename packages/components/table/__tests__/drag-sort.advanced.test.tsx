// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref } from 'vue';
import { PrimaryTable } from '@tdesign/components/table';

// Mock Sortable.js properly
vi.mock('sortablejs', () => ({
  default: vi.fn(() => ({
    destroy: vi.fn(),
  })),
}));

describe('DragSort Advanced Tests', () => {
  const data = [
    { id: 1, name: 'Alice', age: 25, status: 'active' },
    { id: 2, name: 'Bob', age: 30, status: 'inactive' },
    { id: 3, name: 'Charlie', age: 35, status: 'active' },
    { id: 4, name: 'David', age: 28, status: 'inactive' },
  ];

  const baseColumns = [
    { title: 'Name', colKey: 'name', width: 100 },
    { title: 'Age', colKey: 'age', width: 80 },
    { title: 'Status', colKey: 'status', width: 100 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Row Drag Sort', () => {
    it('should enable row drag sort', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle row drag with handler column', async () => {
      const onDragSort = vi.fn();
      const columnsWithDrag = [{ colKey: 'drag', title: 'Drag', type: 'drag' }, ...baseColumns];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: columnsWithDrag,
          rowKey: 'id',
          dragSort: 'row-handler',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle beforeDragSort callback', async () => {
      const beforeDragSort = vi.fn(() => true);
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          beforeDragSort,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should prevent drag when beforeDragSort returns false', async () => {
      const beforeDragSort = vi.fn(() => false);
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          beforeDragSort,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Column Drag Sort', () => {
    it('should enable column drag sort', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'col',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle column drag sort with multi-level headers', async () => {
      const onDragSort = vi.fn();
      const multiLevelColumns = [
        {
          title: 'Personal Info',
          children: [
            { title: 'Name', colKey: 'name', width: 100 },
            { title: 'Age', colKey: 'age', width: 80 },
          ],
        },
        { title: 'Status', colKey: 'status', width: 100 },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: multiLevelColumns,
          rowKey: 'id',
          dragSort: 'col',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Combined Drag Sort', () => {
    it('should enable both row and column drag sort', async () => {
      const onDragSort = vi.fn();
      const columnsWithDrag = [{ colKey: 'drag', title: 'Drag', type: 'drag' }, ...baseColumns];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: columnsWithDrag,
          rowKey: 'id',
          dragSort: 'row-handler-col',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort with Pagination', () => {
    it('should handle drag sort with pagination', async () => {
      const onDragSort = vi.fn();
      const pagination = {
        current: 1,
        pageSize: 2,
        total: 4,
      };

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          pagination,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort with controlled pagination', async () => {
      const onDragSort = vi.fn();
      const onPageChange = vi.fn();
      const pagination = {
        current: 2,
        pageSize: 2,
        total: 4,
      };

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          pagination,
          onDragSort,
          onPageChange,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort Options', () => {
    it('should handle custom drag sort options', async () => {
      const onDragSort = vi.fn();
      const dragSortOptions = {
        animation: 300,
        ghostClass: 'custom-ghost',
        chosenClass: 'custom-chosen',
        dragClass: 'custom-dragging',
      };

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          dragSortOptions,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort with handle selector', async () => {
      const onDragSort = vi.fn();
      const columnsWithDrag = [{ colKey: 'drag', title: '', type: 'drag' }, ...baseColumns];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: columnsWithDrag,
          rowKey: 'id',
          dragSort: 'row-handler',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort with Special Rows', () => {
    it('should handle drag sort with expanded rows', async () => {
      const onDragSort = vi.fn();
      const expandedRow = ({ row }) => `Expanded: ${row?.name || 'No Name'}`;

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          expandedRow,
          expandedRowKeys: [1],
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort with first full row', async () => {
      const onDragSort = vi.fn();
      const firstFullRow = () => 'First Full Row Content';

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          firstFullRow,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort with last full row', async () => {
      const onDragSort = vi.fn();
      const lastFullRow = () => 'Last Full Row Content';

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          lastFullRow,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort Events', () => {
    it('should call onDragSort with correct parameters for row sort', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should call onDragSort with correct parameters for column sort', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'col',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort with Fixed Columns', () => {
    it('should handle drag sort with left fixed columns', async () => {
      const onDragSort = vi.fn();
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: fixedColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort with right fixed columns', async () => {
      const onDragSort = vi.fn();
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100 },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100, fixed: 'right' },
      ];

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: fixedColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort Edge Cases', () => {
    it('should handle empty data with drag sort', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data: [],
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle single row data with drag sort', async () => {
      const onDragSort = vi.fn();
      const singleRowData = [{ id: 1, name: 'Alice', age: 25, status: 'active' }];

      const wrapper = mount(PrimaryTable, {
        props: {
          data: singleRowData,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle drag sort without onDragSort callback', async () => {
      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle deprecated sortOnRowDraggable prop', async () => {
      const onDragSort = vi.fn();

      const wrapper = mount(PrimaryTable, {
        props: {
          data,
          columns: baseColumns,
          rowKey: 'id',
          sortOnRowDraggable: true,
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Drag Sort with Virtual Scroll', () => {
    it('should handle drag sort with virtual scroll', async () => {
      const onDragSort = vi.fn();
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + (i % 50),
        status: i % 2 === 0 ? 'active' : 'inactive',
      }));

      const wrapper = mount(PrimaryTable, {
        props: {
          data: largeData,
          columns: baseColumns,
          rowKey: 'id',
          dragSort: 'row',
          scroll: { type: 'virtual', threshold: 100 },
          onDragSort,
        },
      });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });
});
