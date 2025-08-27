import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { Table, PrimaryTable, EnhancedTable } from '@tdesign/components/table';

// 基础测试数据
const mockData = [
  {
    id: 1,
    name: 'Alice Johnson',
    age: 25,
    email: 'alice@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    age: 30,
    email: 'bob@example.com',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    age: 35,
    email: 'charlie@example.com',
    status: 'active',
  },
];

// 基础列配置
const basicColumns = [
  { title: 'ID', colKey: 'id', width: 80 },
  { title: 'Name', colKey: 'name', width: 150 },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Email', colKey: 'email', width: 200 },
  { title: 'Status', colKey: 'status', width: 100 },
];

// 表格组件类型
const TABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

describe('Table Basic Functionality', () => {
  // 测试基础渲染功能
  describe('Basic Rendering', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Basic Rendering`, () => {
        it('should render table with basic data', async () => {
          const wrapper = mount(() => <TableComponent data={mockData} columns={basicColumns} rowKey="id" />);

          await nextTick();

          // 验证表格基本结构
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
          expect(wrapper.find('thead').exists()).toBeTruthy();
          expect(wrapper.find('tbody').exists()).toBeTruthy();

          // 验证表头
          const headerCells = wrapper.findAll('thead th');
          expect(headerCells.length).toBe(5);
          expect(headerCells[0].text()).toBe('ID');
          expect(headerCells[1].text()).toBe('Name');

          // 验证数据行
          const dataRows = wrapper.findAll('tbody tr');
          expect(dataRows.length).toBe(3);

          // 验证第一行数据
          const firstRowCells = dataRows[0].findAll('td');
          expect(firstRowCells[0].text()).toBe('1');
          expect(firstRowCells[1].text()).toBe('Alice Johnson');
        });

        it('should render table with custom cell renderer', async () => {
          const customColumns = [
            { title: 'ID', colKey: 'id', width: 80 },
            {
              title: 'Name',
              colKey: 'name',
              width: 150,
              cell: (h: any, { row }: any) => h('span', { class: 'custom-name' }, row.name.toUpperCase()),
            },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Email', colKey: 'email', width: 200 },
            { title: 'Status', colKey: 'status', width: 100 },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={customColumns} rowKey="id" />);

          await nextTick();

          // 验证自定义渲染的单元格
          const customNameCell = wrapper.find('.custom-name');
          expect(customNameCell.exists()).toBeTruthy();
          expect(customNameCell.text()).toBe('ALICE JOHNSON');
        });
      });
    });
  });

  // 测试行事件功能
  describe('Row Events', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Row Events`, () => {
        it('should handle row click events', async () => {
          const onRowClick = vi.fn();

          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={basicColumns} rowKey="id" onRowClick={onRowClick} />
          ));

          await nextTick();

          // 点击第一行
          const firstRow = wrapper.find('tbody tr');
          if (firstRow.exists()) {
            await firstRow.trigger('click');
            await nextTick();

            expect(onRowClick).toHaveBeenCalled();
          }
        });

        it('should handle row double click events', async () => {
          const onRowDblclick = vi.fn();

          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={basicColumns} rowKey="id" onRowDblclick={onRowDblclick} />
          ));

          await nextTick();

          // 双击第一行
          const firstRow = wrapper.find('tbody tr');
          if (firstRow.exists()) {
            await firstRow.trigger('dblclick');
            await nextTick();

            expect(onRowDblclick).toHaveBeenCalled();
          }
        });
      });
    });
  });

  // 测试表格数据变化
  describe('Data Changes', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Data Changes`, () => {
        it('should update when data changes', async () => {
          const data = ref([...mockData]);

          const wrapper = mount(() => <TableComponent data={data.value} columns={basicColumns} rowKey="id" />);

          await nextTick();

          // 初始数据
          let dataRows = wrapper.findAll('tbody tr');
          expect(dataRows.length).toBe(3);

          // 添加新数据
          data.value.push({
            id: 4,
            name: 'New User',
            age: 30,
            email: 'newuser@example.com',
            status: 'active',
          });

          await nextTick();

          // 验证数据更新
          dataRows = wrapper.findAll('tbody tr');
          expect(dataRows.length).toBe(4);

          // 验证新数据
          const lastRowCells = dataRows[3].findAll('td');
          expect(lastRowCells[1].text()).toBe('New User');
        });

        it('should handle data removal', async () => {
          const data = ref([...mockData]);

          const wrapper = mount(() => <TableComponent data={data.value} columns={basicColumns} rowKey="id" />);

          await nextTick();

          // 初始数据
          let dataRows = wrapper.findAll('tbody tr');
          expect(dataRows.length).toBe(3);

          // 移除数据
          data.value = data.value.slice(0, 2);

          await nextTick();

          // 验证数据更新
          dataRows = wrapper.findAll('tbody tr');
          expect(dataRows.length).toBe(2);
        });
      });
    });
  });
});
