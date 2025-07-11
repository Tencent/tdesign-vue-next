// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { Table } from '@tdesign/components/table';

// 测试数据
const testData = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

const testColumns = [
  { title: 'Name', colKey: 'name' },
  { title: 'Age', colKey: 'age' },
];

describe('Table Component - Simple Tests', () => {
  describe('Basic Rendering', () => {
    it('should render table with data and columns', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render table with empty data', async () => {
      const wrapper = mount(() => <Table data={[]} columns={testColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render table with empty columns', async () => {
      const wrapper = mount(() => <Table data={testData} columns={[]} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Basic Props', () => {
    it('should render with bordered prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" bordered={true} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with hover prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" hover={true} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with stripe prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" stripe={true} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with size prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" size="small" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with height prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" height={400} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with loading prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" loading={true} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with showHeader prop', async () => {
      const wrapper = mount(() => <Table data={testData} columns={testColumns} rowKey="id" showHeader={false} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Content Props', () => {
    it('should render with empty prop (string)', async () => {
      const wrapper = mount(() => <Table data={[]} columns={testColumns} rowKey="id" empty="暂无数据" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty prop (function)', async () => {
      const wrapper = mount(() => (
        <Table data={[]} columns={testColumns} rowKey="id" empty={() => <div class="custom-empty">自定义空状态</div>} />
      ));
      await nextTick();

      expect(wrapper.find('.custom-empty').exists()).toBeTruthy();
    });

    it('should render with topContent prop (string)', async () => {
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id" topContent="表格顶部内容" />
      ));
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with topContent prop (function)', async () => {
      const wrapper = mount(() => (
        <Table
          data={testData}
          columns={testColumns}
          rowKey="id"
          topContent={() => <div class="custom-top">自定义顶部</div>}
        />
      ));
      await nextTick();

      expect(wrapper.find('.custom-top').exists()).toBeTruthy();
    });

    it('should render with bottomContent prop (string)', async () => {
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id" bottomContent="表格底部内容" />
      ));
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with bottomContent prop (function)', async () => {
      const wrapper = mount(() => (
        <Table
          data={testData}
          columns={testColumns}
          rowKey="id"
          bottomContent={() => <div class="custom-bottom">自定义底部</div>}
        />
      ));
      await nextTick();

      expect(wrapper.find('.custom-bottom').exists()).toBeTruthy();
    });
  });

  describe('Slots', () => {
    it('should render empty slot', async () => {
      const wrapper = mount(() => (
        <Table data={[]} columns={testColumns} rowKey="id">
          {{
            empty: () => <div class="custom-empty-slot">自定义空状态插槽</div>,
          }}
        </Table>
      ));
      await nextTick();

      expect(wrapper.find('.custom-empty-slot').exists()).toBeTruthy();
    });

    it('should render loading slot', async () => {
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id" loading={true}>
          {{
            loading: () => <div class="custom-loading-slot">自定义加载插槽</div>,
          }}
        </Table>
      ));
      await nextTick();

      expect(wrapper.find('.custom-loading-slot').exists()).toBeTruthy();
    });

    it('should render topContent slot', async () => {
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id">
          {{
            topContent: () => <div class="custom-top-slot">自定义顶部插槽</div>,
          }}
        </Table>
      ));
      await nextTick();

      expect(wrapper.find('.custom-top-slot').exists()).toBeTruthy();
    });

    it('should render bottomContent slot', async () => {
      const wrapper = mount(() => (
        <Table data={testData} columns={testColumns} rowKey="id">
          {{
            bottomContent: () => <div class="custom-bottom-slot">自定义底部插槽</div>,
          }}
        </Table>
      ));
      await nextTick();

      expect(wrapper.find('.custom-bottom-slot').exists()).toBeTruthy();
    });
  });

  describe('Column Configuration', () => {
    it('should render with sortable columns', async () => {
      const sortableColumns = [
        { title: 'Name', colKey: 'name', sorter: true },
        { title: 'Age', colKey: 'age', sorter: true },
      ];

      const wrapper = mount(() => <Table data={testData} columns={sortableColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with filterable columns', async () => {
      const filterableColumns = [
        { title: 'Name', colKey: 'name' },
        {
          title: 'Status',
          colKey: 'status',
          filter: {
            type: 'single',
            list: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        },
      ];

      const wrapper = mount(() => <Table data={testData} columns={filterableColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with ellipsis columns', async () => {
      const ellipsisColumns = [
        { title: 'Name', colKey: 'name', ellipsis: true },
        { title: 'Age', colKey: 'age', ellipsis: { title: true } },
      ];

      const wrapper = mount(() => <Table data={testData} columns={ellipsisColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with fixed columns', async () => {
      const fixedColumns = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100, fixed: 'right' },
      ];

      const wrapper = mount(() => <Table data={testData} columns={fixedColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with resizable columns', async () => {
      const resizableColumns = [
        { title: 'Name', colKey: 'name', width: 100, resizable: true },
        { title: 'Age', colKey: 'age', width: 80, resizable: true },
      ];

      const wrapper = mount(() => <Table data={testData} columns={resizableColumns} rowKey="id" resizable={true} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Data Types', () => {
    it('should handle nested data', async () => {
      const nestedData = [
        { id: 1, name: 'Alice', info: { age: 25, city: 'Beijing' } },
        { id: 2, name: 'Bob', info: { age: 30, city: 'Shanghai' } },
      ];

      const nestedColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'info.age' },
        { title: 'City', colKey: 'info.city' },
      ];

      const wrapper = mount(() => <Table data={nestedData} columns={nestedColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle array data', async () => {
      const arrayData = [
        { id: 1, name: 'Alice', tags: ['admin', 'user'] },
        { id: 2, name: 'Bob', tags: ['user'] },
      ];

      const arrayColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Tags', colKey: 'tags' },
      ];

      const wrapper = mount(() => <Table data={arrayData} columns={arrayColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle boolean data', async () => {
      const booleanData = [
        { id: 1, name: 'Alice', active: true },
        { id: 2, name: 'Bob', active: false },
      ];

      const booleanColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Active', colKey: 'active' },
      ];

      const wrapper = mount(() => <Table data={booleanData} columns={booleanColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle date data', async () => {
      const dateData = [
        { id: 1, name: 'Alice', birthday: new Date('1990-01-01') },
        { id: 2, name: 'Bob', birthday: new Date('1995-05-15') },
      ];

      const dateColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Birthday', colKey: 'birthday' },
      ];

      const wrapper = mount(() => <Table data={dateData} columns={dateColumns} rowKey="id" />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Component Integration', () => {
    it('should work with pagination', async () => {
      const paginationData = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
      }));

      const wrapper = mount(() => (
        <Table
          data={paginationData}
          columns={testColumns}
          rowKey="id"
          pagination={{
            current: 1,
            pageSize: 10,
            total: 20,
            showJumper: true,
            showSizer: true,
          }}
        />
      ));
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should work with row selection', async () => {
      const selectColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'age' },
        { title: 'Select', colKey: 'select', type: 'multiple' },
      ];

      const wrapper = mount(() => <Table data={testData} columns={selectColumns} rowKey="id" selectedRowKeys={[1]} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should work with row expansion', async () => {
      const expandColumns = [
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'age' },
        { title: 'Expand', colKey: 'expand', type: 'expand' },
      ];

      const wrapper = mount(() => <Table data={testData} columns={expandColumns} rowKey="id" expandedRowKeys={[1]} />);
      await nextTick();

      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });
});
