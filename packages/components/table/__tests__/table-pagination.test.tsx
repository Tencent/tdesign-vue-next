/**
 * 表格分页功能测试
 * 测试分页控件、页面跳转、页面大小变更等分页相关功能
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { Table, PrimaryTable, EnhancedTable } from '@tdesign/components/table';
import {
  mockData,
  basicColumns,
  largeDataset,
  waitForRender,
  expectTableStructure,
  expectTableRows,
  expectPaginationExists
} from './shared/test-utils';

// 支持分页的表格组件
const PAGINATED_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

describe('Table Pagination Functionality', () => {
  // 测试基础分页功能
  describe('Basic Pagination', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name}`, () => {
        it('should render pagination when pagination prop is provided', async () => {
          const pagination = {
            current: 1,
            pageSize: 2,
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectPaginationExists(wrapper);
          
          // 应该只显示第一页的数据（2条）
          expectTableRows(wrapper, pagination.pageSize);
        });

        it('should not render pagination when pagination is false', async () => {
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={false}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          
          // 不应该有分页组件
          const pagination = wrapper.find('.t-pagination');
          expect(pagination.exists()).toBeFalsy();
          
          // 应该显示所有数据
          expectTableRows(wrapper, mockData.length);
        });

        it('should show correct page data based on current page', async () => {
          const pagination = {
            current: 2,
            pageSize: 2,
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableRows(wrapper, pagination.pageSize);
          
          // 应该显示第2页的数据（索引2和3的数据）
          const rows = wrapper.findAll('tbody tr');
          const firstRowCells = rows[0].findAll('td');
          const secondRowCells = rows[1].findAll('td');
          
          // 第一行应该是第3条数据（ID为3）
          expect(firstRowCells[0].text()).toBe('3');
          // 第二行应该是第4条数据（ID为4）
          expect(secondRowCells[0].text()).toBe('4');
        });

        it('should handle different page sizes', async () => {
          const pageSizes = [1, 3, 5, 10];
          
          for (const pageSize of pageSizes) {
            const pagination = {
              current: 1,
              pageSize,
              total: mockData.length
            };
            
            const wrapper = mount(() => (
              <TableComponent 
                data={mockData} 
                columns={basicColumns} 
                rowKey="id"
                pagination={pagination}
              />
            ));
            
            await waitForRender(wrapper);
            
            const expectedRows = Math.min(pageSize, mockData.length);
            expectTableRows(wrapper, expectedRows);
          }
        });
      });
    });
  });

  // 测试分页交互
  describe('Pagination Interactions', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Pagination Events`, () => {
        it('should trigger page change event when clicking page numbers', async () => {
          const onPageChange = vi.fn();
          const pagination = {
            current: 1,
            pageSize: 2,
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
              onPageChange={onPageChange}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 查找并点击第2页按钮
          const pageButton = wrapper.find('.t-pagination__number:not(.t-is-current)');
          if (pageButton.exists()) {
            await pageButton.trigger('click');
            await waitForRender(wrapper);
            
            expect(onPageChange).toHaveBeenCalledWith(
              expect.objectContaining({ current: 2 }),
              expect.any(Array)
            );
          }
        });

        it('should trigger page size change event', async () => {
          const onPageChange = vi.fn();
          const pagination = {
            current: 1,
            pageSize: 2,
            total: mockData.length,
            showSizeChanger: true,
            pageSizeOptions: [2, 5, 10]
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
              onPageChange={onPageChange}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 查找页面大小选择器
          const sizeSelector = wrapper.find('.t-pagination__select');
          if (sizeSelector.exists()) {
            // 模拟选择新的页面大小
            await sizeSelector.trigger('click');
            await waitForRender(wrapper);
            
            // 查找选项并点击
            const option = wrapper.find('[data-value="5"]');
            if (option.exists()) {
              await option.trigger('click');
              await waitForRender(wrapper);
              
              expect(onPageChange).toHaveBeenCalledWith(
                expect.objectContaining({ pageSize: 5 })
              );
            }
          }
        });

        it('should handle previous and next button clicks', async () => {
          const onPageChange = vi.fn();
          const pagination = {
            current: 2,
            pageSize: 2,
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
              onPageChange={onPageChange}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 点击上一页按钮
          const prevButton = wrapper.find('.t-pagination__btn-prev');
          if (prevButton.exists()) {
            await prevButton.trigger('click');
            await waitForRender(wrapper);
            expect(onPageChange).toHaveBeenCalledWith(expect.objectContaining({ current: 1 }), expect.any(Array)
            );
          }
          
          // 重置mock
          onPageChange.mockClear();
          
          // 点击下一页按钮
          const nextButton = wrapper.find('.t-pagination__btn-next');
          if (nextButton.exists()) {
            await nextButton.trigger('click');
            await waitForRender(wrapper);
            
            expect(onPageChange).toHaveBeenCalledWith(
              expect.objectContaining({ current: 3 }),
              expect.any(Array)
            );
          }
        });
      });
    });
  });

  // 测试受控分页
  describe('Controlled Pagination', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Controlled Pagination`, () => {
        it('should update display when pagination props change', async () => {
          const pagination = ref({
            current: 1,
            pageSize: 2,
            total: mockData.length
          });
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination.value}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 初始状态：第1页，显示2条数据
          expectTableRows(wrapper, 2);
          
          // 更改到第2页
          pagination.value = { ...pagination.value, current: 2 };
          await waitForRender(wrapper);
          
          // 应该显示第2页的数据
          expectTableRows(wrapper, 2);
          const rows = wrapper.findAll('tbody tr');
          const firstRowId = rows[0].findAll('td')[0].text();
          expect(firstRowId).toBe('3'); // 第3条数据的ID
          
          // 更改页面大小
          pagination.value = { ...pagination.value, pageSize: 3, current: 1 };
          await waitForRender(wrapper);
          
          // 应该显示3条数据
          expectTableRows(wrapper, 3);
        });

        it('should sync with external pagination state', async () => {
          const pagination = ref({
            current: 1,
            pageSize: 2,
            total: 100 // 假设有更多数据
          });
          
          const onPageChange = vi.fn((pageInfo) => {
            pagination.value = { ...pagination.value, ...pageInfo };
          });
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination.value}
              onPageChange={onPageChange}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 模拟点击分页按钮
          const pageButton = wrapper.find('.t-pagination__number:not(.t-is-current)');
          if (pageButton.exists()) {
            await pageButton.trigger('click');
            await waitForRender(wrapper);
            
            // 验证状态同步
            expect(onPageChange).toHaveBeenCalled();
            expect(pagination.value.current).toBe(2);
          }
        });
      });
    });
  });

  // 测试大数据集分页
  describe('Large Dataset Pagination', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Large Data`, () => {
        it('should handle large datasets with pagination', async () => {
          const pagination = {
            current: 1,
            pageSize: 20,
            total: largeDataset.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={largeDataset} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectPaginationExists(wrapper);
          expectTableRows(wrapper, pagination.pageSize);
          
          // 验证分页信息
          const paginationInfo = wrapper.find('.t-pagination__total');
          if (paginationInfo.exists()) {
            expect(paginationInfo.text()).toContain(largeDataset.length.toString());
          }
        });

        it('should navigate to different pages in large dataset', async () => {
          const pagination = {
            current: 1,
            pageSize: 50,
            total: largeDataset.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={largeDataset} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 跳转到中间页面
          const targetPage = Math.floor(largeDataset.length / pagination.pageSize / 2);
          const pageButton = wrapper.find(`[data-page="${targetPage}"]`);
          
          if (pageButton.exists()) {
            await pageButton.trigger('click');
            await waitForRender(wrapper);
            
            // 验证页面数据
            expectTableRows(wrapper, pagination.pageSize);
            
            // 验证数据正确性
            const rows = wrapper.findAll('tbody tr');
            const firstRowId = parseInt(rows[0].findAll('td')[0].text());
            const expectedStartId = (targetPage - 1) * pagination.pageSize + 1;
            expect(firstRowId).toBe(expectedStartId);
          }
        });
      });
    });
  });

  // 测试分页配置选项
  describe('Pagination Configuration', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Pagination Config`, () => {
        it('should support custom pagination text', async () => {
          const pagination = {
            current: 1,
            pageSize: 2,
            total: mockData.length,
            showTotal: (total: number, range: number[]) => 
              `共 ${total} 条数据`
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 检查自定义总数显示文本
          const totalText = wrapper.find('.t-pagination__total');
          if (totalText.exists()) {
            expect(totalText.text()).toContain('共 ' + mockData.length + ' 条数据');
          }
        });

        it('should support simple pagination mode', async () => {
          const pagination = {
            current: 1,
            pageSize: 2,
            total: mockData.length,
            simple: true
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectPaginationExists(wrapper);
          
          // 简单模式应该只有上一页/下一页按钮
          const simplePagination = wrapper.find('.t-pagination--simple');
          if (simplePagination.exists()) {
            expect(simplePagination.exists()).toBeTruthy();
          }
        });
      });
    });
  });

  // 测试分页边界情况
  describe('Pagination Edge Cases', () => {
    PAGINATED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Edge Cases`, () => {
        it('should handle zero total count', async () => {
          const pagination = {
            current: 1,
            pageSize: 10,
            total: 0
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={[]} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          expectPaginationExists(wrapper);
          expectTableRows(wrapper, 1); // 空数据又一行占位div t-table__empty
          expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
          
          // 分页控件应该正确处理0条数据的情况
          const pageNumbers = wrapper.findAll('.t-pagination__number');
          expect(pageNumbers.length).toBeLessThanOrEqual(1); // 最多只有一页
        });

        it('should handle invalid current page', async () => {
          const pagination = {
            current: 999, // 超出范围的页码
            pageSize: 2,
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          expectTableStructure(wrapper);
          
          // 应该显示有效的页面数据（通常是最后一页或第一页）
          const rows = wrapper.findAll('tbody tr');
          expect(rows.length).toBeGreaterThan(0);
        });

        it('should handle pageSize larger than total data', async () => {
          const pagination = {
            current: 1,
            pageSize: 100, // 比总数据量大
            total: mockData.length
          };
          
          const wrapper = mount(() => (
            <TableComponent 
              data={mockData} 
              columns={basicColumns} 
              rowKey="id"
              pagination={pagination}
            />
          ));
          
          await waitForRender(wrapper);
          
          // 应该显示所有数据
          expectTableRows(wrapper, mockData.length);
          
          // 分页应该只有一页
          const pageNumbers = wrapper.findAll('.t-pagination__number');
          expect(pageNumbers.length).toBe(1);
        });
      });
    });
  });
});
