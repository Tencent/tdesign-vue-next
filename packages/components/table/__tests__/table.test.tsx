// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, h } from 'vue';
import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components/table';

// 测试数据
const testData = [
  { id: 1, name: 'Alice', age: 25, status: 'active', email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, status: 'inactive', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, status: 'active', email: 'charlie@example.com' },
];

const testColumns = [
  { title: 'Name', colKey: 'name', width: 100 },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Status', colKey: 'status', width: 100 },
  { title: 'Email', colKey: 'email', width: 200 },
];

// 测试所有表格组件类型
const TABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'BaseTable', component: BaseTable },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

describe('Table Component', () => {
  describe('Basic Rendering', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Basic Props`, () => {
        it('should render with data and columns', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with empty data', async () => {
          const wrapper = mount(() => <component data={[]} columns={testColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with empty columns', async () => {
          const wrapper = mount(() => <component data={testData} columns={[]} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with rowKey prop', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with custom rowKey function', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey={(row) => `row-${row.id}`} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Props - Basic Data Types', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Basic Data Type Props`, () => {
        it('should render with bordered prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" bordered={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with hover prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" hover={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with stripe prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" stripe={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with size prop (string)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" size="small" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with height prop (number)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" height={400} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with height prop (string)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" height="300px" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with maxHeight prop (number)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" maxHeight={500} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with maxHeight prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" maxHeight="400px" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with showHeader prop (boolean)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" showHeader={false} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with loading prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" loading={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with resizable prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" resizable={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with tableLayout prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" tableLayout="auto" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with verticalAlign prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" verticalAlign="top" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with keyboardRowHover prop (boolean)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" keyboardRowHover={false} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with lazyLoad prop (boolean)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" lazyLoad={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with disableDataPage prop (boolean)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" disableDataPage={true} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with disableSpaceInactiveRow prop (boolean)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" disableSpaceInactiveRow={true} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Props - Complex Data Types', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Complex Data Type Props`, () => {
        it('should render with empty prop (string)', async () => {
          const wrapper = mount(() => <component data={[]} columns={testColumns} rowKey="id" empty="暂无数据" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with empty prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={[]}
              columns={testColumns}
              rowKey="id"
              empty={() => <div class="custom-empty">自定义空状态</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-empty').exists()).toBeTruthy();
        });

        it('should render with cellEmptyContent prop (string)', async () => {
          const wrapper = mount(() => (
            <component
              data={[{ id: 1, name: '', age: null, status: undefined }]}
              columns={testColumns}
              rowKey="id"
              cellEmptyContent="--"
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with cellEmptyContent prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={[{ id: 1, name: '', age: null, status: undefined }]}
              columns={testColumns}
              rowKey="id"
              cellEmptyContent={() => <span class="custom-empty-cell">空</span>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with topContent prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" topContent="表格顶部内容" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with topContent prop (function)', async () => {
          const wrapper = mount(() => (
            <component
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
            <component data={testData} columns={testColumns} rowKey="id" bottomContent="表格底部内容" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with bottomContent prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              bottomContent={() => <div class="custom-bottom">自定义底部</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-bottom').exists()).toBeTruthy();
        });

        it('should render with firstFullRow prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" firstFullRow="首行内容" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with firstFullRow prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              firstFullRow={() => <div class="custom-first-row">自定义首行</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-first-row').exists()).toBeTruthy();
        });

        it('should render with lastFullRow prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" lastFullRow="尾行内容" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with lastFullRow prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              lastFullRow={() => <div class="custom-last-row">自定义尾行</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-last-row').exists()).toBeTruthy();
        });

        it('should render with footerSummary prop (string)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" footerSummary="总结行" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with footerSummary prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              footerSummary={() => <div class="custom-summary">自定义总结</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-summary').exists()).toBeTruthy();
        });

        it('should render with loading prop (function)', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              loading={() => <div class="custom-loading">自定义加载</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.custom-loading').exists()).toBeTruthy();
        });

        it('should render with attach prop (string)', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" attach="body" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with attach prop (function)', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" attach={() => document.body} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Slots', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Slots`, () => {
        it('should render empty slot', async () => {
          const wrapper = mount(() => (
            <component data={[]} columns={testColumns} rowKey="id">
              {{
                empty: () => <div class="custom-empty-slot">自定义空状态插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-empty-slot').exists()).toBeTruthy();
        });

        it('should render loading slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" loading={true}>
              {{
                loading: () => <div class="custom-loading-slot">自定义加载插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-loading-slot').exists()).toBeTruthy();
        });

        it('should render topContent slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id">
              {{
                topContent: () => <div class="custom-top-slot">自定义顶部插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-top-slot').exists()).toBeTruthy();
        });

        it('should render bottomContent slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id">
              {{
                bottomContent: () => <div class="custom-bottom-slot">自定义底部插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-bottom-slot').exists()).toBeTruthy();
        });

        it('should render firstFullRow slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id">
              {{
                firstFullRow: () => <div class="custom-first-row-slot">自定义首行插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-first-row-slot').exists()).toBeTruthy();
        });

        it('should render lastFullRow slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id">
              {{
                lastFullRow: () => <div class="custom-last-row-slot">自定义尾行插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-last-row-slot').exists()).toBeTruthy();
        });

        it('should render footerSummary slot', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id">
              {{
                footerSummary: () => <div class="custom-summary-slot">自定义总结插槽</div>,
              }}
            </component>
          ));
          await nextTick();

          expect(wrapper.find('.custom-summary-slot').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Advanced Features', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Advanced Features`, () => {
        it('should render with fixed columns', async () => {
          const fixedColumns = [
            { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Email', colKey: 'email', width: 200, fixed: 'right' },
          ];

          const wrapper = mount(() => <component data={testData} columns={fixedColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with tree data', async () => {
          const treeData = [
            {
              id: 1,
              name: 'Parent',
              age: 40,
              status: 'active',
              children: [{ id: 2, name: 'Child', age: 20, status: 'active' }],
            },
          ];

          const wrapper = mount(() => (
            <component data={treeData} columns={testColumns} rowKey="id" tree={{ treeNodeColumnIndex: 0 }} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with expandable rows', async () => {
          const expandableData = [
            { id: 1, name: 'Alice', age: 25, status: 'active' },
            { id: 2, name: 'Bob', age: 30, status: 'inactive' },
          ];

          const wrapper = mount(() => (
            <component
              data={expandableData}
              columns={testColumns}
              rowKey="id"
              expandIcon={() => <span class="expand-icon">+</span>}
              expandedRow={() => <div class="expanded-content">展开内容</div>}
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with draggable rows', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" dragSort={true} />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with selectable rows', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" selectOnRowClick={true} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with sortable columns', async () => {
          const sortableColumns = [
            { title: 'Name', colKey: 'name', width: 100, sorter: true },
            { title: 'Age', colKey: 'age', width: 80, sorter: true },
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Email', colKey: 'email', width: 200 },
          ];

          const wrapper = mount(() => <component data={testData} columns={sortableColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with filterable columns', async () => {
          const filterableColumns = [
            { title: 'Name', colKey: 'name', width: 100 },
            { title: 'Age', colKey: 'age', width: 80 },
            {
              title: 'Status',
              colKey: 'status',
              width: 100,
              filter: {
                type: 'select',
                list: [
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ],
              },
            },
            { title: 'Email', colKey: 'email', width: 200 },
          ];

          const wrapper = mount(() => <component data={testData} columns={filterableColumns} rowKey="id" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with editable cells', async () => {
          const editableColumns = [
            { title: 'Name', colKey: 'name', width: 100 },
            {
              title: 'Age',
              colKey: 'age',
              width: 80,
              edit: {
                type: 'input',
                rules: [{ required: true, message: '年龄不能为空' }],
              },
            },
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Email', colKey: 'email', width: 200 },
          ];

          const wrapper = mount(() => (
            <component data={testData} columns={editableColumns} rowKey="id" editableRowKeys={[1]} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with virtual scrolling', async () => {
          const largeData = Array.from({ length: 1000 }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            age: 20 + (index % 50),
            status: index % 2 === 0 ? 'active' : 'inactive',
            email: `user${index + 1}@example.com`,
          }));

          const wrapper = mount(() => (
            <component data={largeData} columns={testColumns} rowKey="id" height={400} scroll={{ type: 'virtual' }} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with custom theme', async () => {
          const wrapper = mount(() => <component data={testData} columns={testColumns} rowKey="id" theme="primary" />);
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with custom class', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" class="custom-table-class" />
          ));
          await nextTick();

          expect(wrapper.find('.custom-table-class').exists()).toBeTruthy();
        });

        it('should render with custom style', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" style={{ backgroundColor: '#f5f5f5' }} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Integration Tests', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Integration Tests`, () => {
        it('should work with pagination', async () => {
          const largeData = Array.from({ length: 100 }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            age: 20 + (index % 50),
            status: index % 2 === 0 ? 'active' : 'inactive',
            email: `user${index + 1}@example.com`,
          }));

          const wrapper = mount(() => (
            <component
              data={largeData}
              columns={testColumns}
              rowKey="id"
              pagination={{
                current: 1,
                pageSize: 10,
                total: 100,
                showJumper: true,
                showSizer: true,
                showTotal: true,
              }}
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should work with loading state', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              loading={true}
              loadingProps={{
                text: '加载中...',
                size: 'small',
              }}
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should work with error state', async () => {
          const wrapper = mount(() => (
            <component data={[]} columns={testColumns} rowKey="id" errorMessage="数据加载失败" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should work with responsive design', async () => {
          const responsiveColumns = [
            { title: 'Name', colKey: 'name', width: 100, ellipsis: true },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Email', colKey: 'email', width: 200, ellipsis: true },
          ];

          const wrapper = mount(() => (
            <component data={testData} columns={responsiveColumns} rowKey="id" tableLayout="fixed" />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should work with keyboard navigation', async () => {
          const wrapper = mount(() => (
            <component
              data={testData}
              columns={testColumns}
              rowKey="id"
              keyboardRowHover={true}
              disableSpaceInactiveRow={false}
            />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should work with accessibility features', async () => {
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" showHeader={true} bordered={true} />
          ));
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Advanced Features - Complex Data Types', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Complex Data Type Props`, () => {
        it('should render with rowClassName function', async () => {
          const rowClassName = ({ row, rowIndex }) => {
            return rowIndex === 0 ? 'first-row' : 'other-row';
          };
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" rowClassName={rowClassName} />
          ));
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with rowClassName array', async () => {
          const rowClassName = ['custom-class', ({ row }) => (row.status === 'active' ? 'active-row' : '')];
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" rowClassName={rowClassName} />
          ));
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with rowClassName object', async () => {
          const rowClassName = {
            0: 'first-row',
            1: 'second-row',
            active: 'active-status',
          };
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" rowClassName={rowClassName} />
          ));
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with cellClassName function', async () => {
          const cellClassName = ({ row, col, rowIndex, colIndex }) => {
            return colIndex === 0 ? 'first-col' : 'other-col';
          };
          const columnsWithClassName = testColumns.map((col) => ({
            ...col,
            cellClassName,
          }));
          const wrapper = mount(() => <component data={testData} columns={columnsWithClassName} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with cellClassName array', async () => {
          const cellClassName = ['base-cell', ({ row }) => (row.status === 'active' ? 'active-cell' : '')];
          const columnsWithClassName = testColumns.map((col) => ({
            ...col,
            cellClassName,
          }));
          const wrapper = mount(() => <component data={testData} columns={columnsWithClassName} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with rowAttributes function', async () => {
          const rowAttributes = ({ row, rowIndex }) => ({
            'data-row-id': row.id,
            'data-row-index': rowIndex,
            'data-status': row.status,
          });
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" rowAttributes={rowAttributes} />
          ));
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with rowAttributes array', async () => {
          const rowAttributes = [{ 'data-type': 'table-row' }, ({ row }) => ({ 'data-status': row.status })];
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" rowAttributes={rowAttributes} />
          ));
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with empty render function', async () => {
          const columnsWithRender = testColumns.map((col) => ({
            ...col,
            render: () => null,
          }));
          const wrapper = mount(() => <component data={testData} columns={columnsWithRender} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should render with ellipsisTitle object', async () => {
          const columnsWithEllipsis = testColumns.map((col) => ({
            ...col,
            ellipsisTitle: {
              content: `Tooltip for ${col.title}`,
              placement: 'top',
            },
          }));
          const wrapper = mount(() => <component data={testData} columns={columnsWithEllipsis} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Events and Methods', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Events and Methods`, () => {
        it('should handle data change event', async () => {
          const onDataChange = vi.fn();
          const wrapper = mount(() => (
            <component data={testData} columns={testColumns} rowKey="id" onDataChange={onDataChange} />
          ));
          await nextTick();

          // 模拟数据变化
          await wrapper.setProps({
            data: [...testData, { id: 4, name: 'David', age: 28, status: 'active', email: 'david@example.com' }],
          });
          await nextTick();

          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Boundary Conditions', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Boundary Conditions`, () => {
        it('should handle data with null values', async () => {
          const dataWithNulls = [
            { id: 1, name: null, age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: null, status: 'inactive', email: null },
            { id: 3, name: 'Charlie', age: 35, status: null, email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithNulls} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with undefined values', async () => {
          const dataWithUndefined = [
            { id: 1, name: undefined, age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: undefined, status: 'inactive', email: undefined },
            { id: 3, name: 'Charlie', age: 35, status: undefined, email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithUndefined} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with empty string values', async () => {
          const dataWithEmptyStrings = [
            { id: 1, name: '', age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: '', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: 'active', email: '' },
          ];
          const wrapper = mount(() => <component data={dataWithEmptyStrings} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with special characters', async () => {
          const dataWithSpecialChars = [
            { id: 1, name: 'Alice & Bob', age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob <script>', age: 30, status: 'inactive', email: 'bob@example.com' },
            { id: 3, name: 'Charlie "Test"', age: 35, status: 'active', email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithSpecialChars} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with very long text', async () => {
          const longText = 'A'.repeat(1000);
          const dataWithLongText = [
            { id: 1, name: longText, age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: 'inactive', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: 'active', email: longText },
          ];
          const wrapper = mount(() => <component data={dataWithLongText} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with numeric strings', async () => {
          const dataWithNumericStrings = [
            { id: '1', name: 'Alice', age: '25', status: 'active', email: 'alice@example.com' },
            { id: '2', name: 'Bob', age: '30', status: 'inactive', email: 'bob@example.com' },
            { id: '3', name: 'Charlie', age: '35', status: 'active', email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithNumericStrings} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with boolean values', async () => {
          const dataWithBooleans = [
            { id: 1, name: 'Alice', age: 25, status: true, email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: false, email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: true, email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithBooleans} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with object values', async () => {
          const dataWithObjects = [
            { id: 1, name: 'Alice', age: 25, status: { value: 'active', label: 'Active' }, email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: { value: 'inactive', label: 'Inactive' }, email: 'bob@example.com' },
            {
              id: 3,
              name: 'Charlie',
              age: 35,
              status: { value: 'active', label: 'Active' },
              email: 'charlie@example.com',
            },
          ];
          const wrapper = mount(() => <component data={dataWithObjects} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with array values', async () => {
          const dataWithArrays = [
            { id: 1, name: 'Alice', age: 25, status: ['active', 'verified'], email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: ['inactive'], email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: ['active', 'premium'], email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithArrays} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with function values', async () => {
          const dataWithFunctions = [
            { id: 1, name: 'Alice', age: 25, status: () => 'active', email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: () => 'inactive', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: () => 'active', email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithFunctions} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with Date values', async () => {
          const dataWithDates = [
            {
              id: 1,
              name: 'Alice',
              age: 25,
              status: 'active',
              email: 'alice@example.com',
              createdAt: new Date('2023-01-01'),
            },
            {
              id: 2,
              name: 'Bob',
              age: 30,
              status: 'inactive',
              email: 'bob@example.com',
              createdAt: new Date('2023-02-01'),
            },
            {
              id: 3,
              name: 'Charlie',
              age: 35,
              status: 'active',
              email: 'charlie@example.com',
              createdAt: new Date('2023-03-01'),
            },
          ];
          const columnsWithDate = [...testColumns, { title: 'Created At', colKey: 'createdAt', width: 150 }];
          const wrapper = mount(() => <component data={dataWithDates} columns={columnsWithDate} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with Symbol values', async () => {
          const symbol1 = Symbol('active');
          const symbol2 = Symbol('inactive');
          const dataWithSymbols = [
            { id: 1, name: 'Alice', age: 25, status: symbol1, email: 'alice@example.com' },
            { id: 2, name: 'Bob', age: 30, status: symbol2, email: 'bob@example.com' },
            { id: 3, name: 'Charlie', age: 35, status: symbol1, email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithSymbols} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle data with BigInt values', async () => {
          const dataWithBigInts = [
            { id: 1n, name: 'Alice', age: 25, status: 'active', email: 'alice@example.com' },
            { id: 2n, name: 'Bob', age: 30, status: 'inactive', email: 'bob@example.com' },
            { id: 3n, name: 'Charlie', age: 35, status: 'active', email: 'charlie@example.com' },
          ];
          const wrapper = mount(() => <component data={dataWithBigInts} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });

  describe('Table Performance and Large Data', () => {
    TABLE_COMPONENTS.forEach(({ name, component }) => {
      describe(`${name} - Performance and Large Data`, () => {
        it('should handle large dataset', async () => {
          const largeData = Array.from({ length: 1000 }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            age: 20 + (index % 50),
            status: index % 2 === 0 ? 'active' : 'inactive',
            email: `user${index + 1}@example.com`,
          }));
          const wrapper = mount(() => <component data={largeData} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle many columns', async () => {
          const manyColumns = Array.from({ length: 50 }, (_, index) => ({
            title: `Column ${index + 1}`,
            colKey: `col${index + 1}`,
            width: 100,
          }));
          const dataForManyColumns = testData.map((row) => {
            const newRow = { ...row };
            manyColumns.forEach((col, index) => {
              newRow[col.colKey] = `Value ${index + 1}`;
            });
            return newRow;
          });
          const wrapper = mount(() => <component data={dataForManyColumns} columns={manyColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle deep nested data', async () => {
          const deepNestedData = [
            {
              id: 1,
              name: 'Alice',
              age: 25,
              status: 'active',
              email: 'alice@example.com',
              profile: {
                address: {
                  city: {
                    name: 'New York',
                    country: {
                      name: 'USA',
                      code: 'US',
                    },
                  },
                },
              },
            },
          ];
          const columnsWithNested = [
            { title: 'Name', colKey: 'name', width: 100 },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Status', colKey: 'status', width: 100 },
            { title: 'Email', colKey: 'email', width: 200 },
            { title: 'City', colKey: 'profile.address.city.name', width: 150 },
            { title: 'Country', colKey: 'profile.address.city.country.name', width: 150 },
          ];
          const wrapper = mount(() => <component data={deepNestedData} columns={columnsWithNested} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });

        it('should handle circular reference data', async () => {
          const circularData = [{ id: 1, name: 'Alice', age: 25, status: 'active', email: 'alice@example.com' }];
          // 创建循环引用
          circularData[0].self = circularData[0];
          const wrapper = mount(() => <component data={circularData} columns={testColumns} rowKey="id" />);
          await nextTick();
          expect(wrapper.find('.t-table').exists()).toBeTruthy();
        });
      });
    });
  });
});
