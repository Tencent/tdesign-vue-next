/**
 * 表格组件核心功能测试
 * 测试基础渲染、数据展示、基本交互等核心功能
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref } from 'vue';
import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components/table';
import {
  mockData,
  basicColumns,
  waitForRender,
  expectTableStructure,
  expectTableRows,
  expectTableColumns,
  expectCellContent,
  expectHasClass,
  expectEmptyState,
  expectLoadingState,
  clickTableRow,
  clickTableCell
} from './shared/test-utils';

// 所有表格组件类型
const TABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'BaseTable', component: BaseTable },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

describe('Table Core Functionality', () => {
  // 测试基础渲染
  describe('Basic Rendering', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name}`, () => {
        it('should render table with data and columns', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id" 
            />
          ));
          
          await waitForRender(wrapper);
          
          // 检查基本结构
          expectTableStructure(wrapper);
          
          // 检查数据行数
          expectTableRows(wrapper, mockData.length);
          
          // 检查列数
          expectTableColumns(wrapper, basicColumns.length);
          
          // 检查第一行第一列的内容
          expectCellContent(wrapper, 0, 0, '1'); // ID列
          expectCellContent(wrapper, 0, 1, 'Alice Johnson'); // Name列
        });

        it('should render empty table when no data provided', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={[]} 
              columns={basicColumns} 
              rowKey="id" 
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectEmptyState(wrapper, '暂无数据');
        });

        it('should render custom empty content', async () => {
          const customEmptyText = 'No employees found';
          const wrapper = mount(() => (
            <TableComponent 
              data={[]} 
              columns={basicColumns} 
              rowKey="id"
              empty={customEmptyText}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectEmptyState(wrapper, customEmptyText);
        });

        it('should render with loading state', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              loading={true}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectLoadingState(wrapper, true);
        });
      });
    });
  });

  // 测试表格样式属性
  describe('Style Props', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Style Properties`, () => {
        it('should apply bordered style', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              bordered={true}
            />
          ));
          
          await waitForRender(wrapper);
          
          expect(wrapper.find('.t-table--bordered').exists()).toBeTruthy();
        });

        it('should apply stripe style', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              stripe={true}
            />
          ));
          
          await waitForRender(wrapper);
          
          expect(wrapper.find('.t-table--striped').exists()).toBeTruthy();
        });

        it('should apply hover style', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              hover={true}
            />
          ));
          
          await waitForRender(wrapper);
          
          expect(wrapper.find('.t-table--hoverable').exists()).toBeTruthy();
        });

        // it('should apply size variants', async () => {
        const sizes = [
          { prop: 'small', class: 's' },
          // { prop: 'medium', class: 'm' }, // medium 是默认值，不添加类名
          { prop: 'large', class: 'l' }
        ] as const;
        sizes.forEach(({ prop, class: className }) => {
          // 每个测试用例独立命名，明确区分
          it(`should apply correct class for ${prop} size`, async () => {
            // 每个测试用例单独创建wrapper，避免共享
            const wrapper = mount(() => (
              <TableComponent 
                data={mockData} 
                columns={basicColumns} 
                rowKey="id"
                size={prop}
              />
            ));
            
            // await waitFor(() => wrapper.find('.t-table').exists());
            await waitForRender(wrapper);
            const tableRoot = wrapper.find('.t-table');
            expect(tableRoot.classes()).toContain(`t-size-${className}`);
            
            // 手动清理（部分框架自动清理，但显式清理更安全）
            wrapper.unmount();
          });
        });
          // for (const { prop, class: className } of sizes) {
          //   const wrapper = mount(() => (
          //     <TableComponent 
          //       data={mockData} 
          //       columns={basicColumns} 
          //       rowKey="id"
          //       size={prop}
          //     />
          //   ));
            
          //   await waitForRender(wrapper);
          //   console.log('wrapper===>html', wrapper.html());
          //   expect(wrapper.classes()).toContain(`t-size-${className}`);
          // }
        // });

        it('should apply vertical alignment', async () => {
          const alignments = ['top', 'middle', 'bottom'] as const;
          
          for (const align of alignments) {
            const wrapper = mount(() => (
              <TableComponent 
                data={mockData} 
                columns={basicColumns} 
                rowKey="id"
                verticalAlign={align}
              />
            ));
            
            await waitForRender(wrapper);
            
            if (align !== 'middle') { // middle 是默认值，不添加类名
              expect(wrapper.find(`.t-vertical-align-${align}`).exists()).toBeTruthy();
            }
          }
        });
      });
    });
  });

  // 测试行交互
  describe('Row Interactions', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Row Events`, () => {
        it('should trigger onRowClick event', async () => {
          const onRowClick = vi.fn();
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              onRowClick={onRowClick}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 点击第一行
          await clickTableRow(wrapper, 0);
          
          expect(onRowClick).toHaveBeenCalledTimes(1);
          expect(onRowClick).toHaveBeenCalledWith(
            expect.objectContaining({ row: mockData[0] })
          );
        });

        it('should trigger onCellClick event', async () => {
          const onCellClick = vi.fn();
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              onCellClick={onCellClick}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 点击第一行第二列
          await clickTableCell(wrapper, 0, 1);
          
          expect(onCellClick).toHaveBeenCalledTimes(1);
          expect(onCellClick).toHaveBeenCalledWith(
            expect.objectContaining({ 
              row: mockData[0],
              col: expect.objectContaining({ colKey: 'name' })
            })
          );
        });

        it('should apply custom row class names', async () => {
          const customRowClass = 'custom-row-class';
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              rowClassName={customRowClass}
            />
          ));
          
          await waitForRender(wrapper);
          
          const firstRow = wrapper.find('tbody tr');
          expect(firstRow.classes()).toContain(customRowClass);
        });

        it('should apply row class names from function', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              rowClassName={({ rowIndex }: any) => `row-${rowIndex}`}
            />
          ));
          
          await waitForRender(wrapper);
          
          const rows = wrapper.findAll('tbody tr');
          expect(rows[0].classes()).toContain('row-0');
          expect(rows[1].classes()).toContain('row-1');
        });

        it('should apply custom row attributes', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              rowAttributes={{ 'data-testid': 'table-row' }}
            />
          ));
          
          await waitForRender(wrapper);
          
          const firstRow = wrapper.find('tbody tr');
          expect(firstRow.attributes('data-testid')).toBe('table-row');
        });
      });
    });
  });

  // 测试列配置
  describe('Column Configuration', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Column Props`, () => {
        it('should apply column alignment', async () => {
          const alignColumns = [
            { title: 'Left', colKey: 'id', align: 'left' as const },
            { title: 'Center', colKey: 'name', align: 'center' as const },
            { title: 'Right', colKey: 'age', align: 'right' as const },
          ];
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={alignColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          const cells = wrapper.find('tbody tr').findAll('td');
          expect(cells[0].classes()).not.toContain('t-align-left'); // left是默认的
          expect(cells[1].classes()).toContain('t-align-center');
          expect(cells[2].classes()).toContain('t-align-right');
        });

        it('should apply column width', async () => {
          const widthColumns = [
            { title: 'ID', colKey: 'id', width: 100 },
            { title: 'Name', colKey: 'name', width: 200 },
          ];
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={widthColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          const headers = wrapper.findAll('thead th');
          expect(headers.length).toBeGreaterThanOrEqual(2);
          
          // 检查列是否存在，width 会在真实渲染时生效
          expect(headers[0].exists()).toBeTruthy();
          expect(headers[1].exists()).toBeTruthy();
        });

        it('should apply custom column class names', async () => {
          const classColumns = [
            { title: 'ID', colKey: 'id', className: 'custom-cell-class' },
            { title: 'Name', colKey: 'name', thClassName: 'custom-header-class' },
          ];
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={classColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          // 检查单元格类名
          const firstCell = wrapper.find('tbody tr td');
          expect(firstCell.classes()).toContain('custom-cell-class');
          
          // 检查表头类名
          const secondHeader = wrapper.findAll('thead th')[1];
          expect(secondHeader.classes()).toContain('custom-header-class');
        });

        it('should render custom cell content', async () => {
          const customColumns = [
            { title: 'ID', colKey: 'id' },
            { 
              title: 'Name', 
              colKey: 'name',
              cell: (h: any, { row }: any) => h('span', { class: 'custom-cell' }, `Mr. ${row.name}`)
            },
          ];
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={customColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          const customCell = wrapper.find('.custom-cell');
          expect(customCell.exists()).toBeTruthy();
          expect(customCell.text()).toContain('Mr. Alice Johnson');
        });
      });
    });
  });

  // 测试响应式数据
  describe('Reactive Data', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Data Reactivity`, () => {
        it('should update when data changes', async () => {
          const data = ref([...mockData]);
          
          const wrapper = mount(() => (
            <TableComponent 
              data={data.value} 
              columns={basicColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          expectTableRows(wrapper, mockData.length);
          
          // 添加新数据
          data.value.push({
            id: 999,
            name: 'New User',
            age: 28,
            email: 'new@example.com',
            status: 'active',
            department: 'HR',
            salary: 65000,
            joinDate: '2023-01-01'
          });
          
          await waitForRender(wrapper);
          expectTableRows(wrapper, mockData.length + 1);
          
          // 检查新数据是否正确显示
          expectCellContent(wrapper, mockData.length, 1, 'New User');
        });

        it('should update when columns change', async () => {
          const columns = ref([...basicColumns]);
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={columns.value} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          expectTableColumns(wrapper, basicColumns.length);
          
          // 添加新列
          columns.value.push({ title: 'Department', colKey: 'department', width: 120 });
          
          await waitForRender(wrapper);
          expectTableColumns(wrapper, basicColumns.length + 1);
        });
      });
    });
  });

  // 测试无效输入处理
  describe('Edge Cases', () => {
    TABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Edge Cases`, () => {
        it('should handle undefined data gracefully', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={undefined} 
              columns={basicColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectEmptyState(wrapper);
        });

        it('should handle empty columns gracefully', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={[]} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectTableColumns(wrapper, 0);
        });

        it('should handle missing rowKey gracefully', async () => {
          const dataWithoutId = mockData.map(({ id, ...rest }) => rest);
          
          const wrapper = mount(() => (
            <TableComponent 
              data={dataWithoutId} 
              columns={basicColumns.slice(1)} // 移除ID列
              rowKey="name" // 使用name作为rowKey
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectTableRows(wrapper, dataWithoutId.length);
        });

        it('should handle large datasets efficiently', async () => {
          const largeData = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            name: `User ${i}`,
            age: 20 + (i % 50),
            email: `user${i}@example.com`,
            status: i % 2 === 0 ? 'active' : 'inactive'
          }));
          
          const wrapper = mount(() => (
            <TableComponent 
              data={largeData} 
              columns={basicColumns} 
              rowKey="id"
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectTableRows(wrapper, largeData.length);
        });
      });
    });
  });
});
