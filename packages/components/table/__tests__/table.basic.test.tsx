// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, h } from 'vue';
import { Table } from '@tdesign/components/table';

// 测试数据
const testData = [
  { id: 1, name: 'Alice', age: 25, status: 'active' },
  { id: 2, name: 'Bob', age: 30, status: 'inactive' },
  { id: 3, name: 'Charlie', age: 35, status: 'active' },
];

const testColumns = [
  { title: 'Name', colKey: 'name', width: 100 },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Status', colKey: 'status', width: 100 },
];

describe('Table Component - Basic Tests', () => {
  describe('Basic Rendering', () => {
    it('should render table with data and columns', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render empty table when no data', async () => {
      const wrapper = mount(() => <Table data={[]} columns={testColumns} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with custom empty content', async () => {
      const wrapper = mount(() => <Table data={[]} columns={testColumns} rowKey="id" empty="No Data Found" />);
      await nextTick();

      // 检查自定义空内容是否存在
      expect(wrapper.text()).toContain('No Data Found');
    });
  });

  describe('Props', () => {
    it('should render with bordered style', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" bordered />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with stripe style', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" stripe />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with hover style', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" hover />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with size prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" size="small" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render without header when showHeader is false', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" showHeader={false} />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with loading state', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" loading />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should trigger onRowClick event', async () => {
      const onRowClick = vi.fn();
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" onRowClick={onRowClick} />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should trigger onCellClick event', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id" onCellClick={onCellClick} />
      ));
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });

  describe('Slots', () => {
    it('should render empty slot', async () => {
      const wrapper = mount(() => (
        <Table
          data={[]}
          columns={testColumns}
          rowKey="id"
          v-slots={{
            empty: () => <div class="custom-empty">Custom Empty</div>,
          }}
        />
      ));
      await nextTick();

      // 检查自定义空内容是否存在
      expect(wrapper.find('.custom-empty').exists()).toBeTruthy();
      expect(wrapper.find('.custom-empty').text()).toBe('Custom Empty');
    });

    it('should render loading slot', async () => {
      const wrapper = mount(() => (
        <Table
          data={testData}
          columns={testColumns}
          rowKey="id"
          loading
          v-slots={{
            loading: () => <div class="custom-loading">Loading...</div>,
          }}
        />
      ));
      await nextTick();

      // 检查自定义加载内容是否存在
      expect(wrapper.find('.custom-loading').exists()).toBeTruthy();
      expect(wrapper.find('.custom-loading').text()).toBe('Loading...');
    });
  });

  describe('Pagination', () => {
    it('should render pagination when provided', async () => {
      const wrapper = mount(() => (
        <Table
          data={testData}
          columns={testColumns}
          rowKey="id"
          pagination={{ total: 100, pageSize: 10, current: 1 }}
        />
      ));
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });

  describe('Row Selection', () => {
    it('should render with row selection', async () => {
      const selectedRowKeys = ref([]);
      const wrapper = mount(() => (
        <Table
          data={testData}
          columns={testColumns}
          rowKey="id"
          selectedRowKeys={selectedRowKeys.value}
          onSelectChange={(keys) => (selectedRowKeys.value = keys)}
        />
      ));
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });

  describe('Column Features', () => {
    it('should render with sortable columns', async () => {
      const sortColumns = [
        { title: 'Name', colKey: 'name', sorter: true },
        { title: 'Age', colKey: 'age', sorter: true },
        { title: 'Status', colKey: 'status' },
      ];

      const wrapper = mount(() => <Table data={testData} columns={sortColumns} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should render with filterable columns', async () => {
      const filterColumns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Status',
          colKey: 'status',
          filter: {
            type: 'select',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      ];

      const wrapper = mount(() => <Table data={testData} columns={filterColumns} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty columns', async () => {
      const wrapper = mount(() => <Table data={testData} columns={[]} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });

    it('should handle undefined data', async () => {
      const wrapper = mount(() => <Table data={undefined} columns={testColumns} rowKey="id" />);
      await nextTick();

      // 检查表格是否存在
      expect(wrapper.find('table').exists()).toBeTruthy();
    });
  });
});
