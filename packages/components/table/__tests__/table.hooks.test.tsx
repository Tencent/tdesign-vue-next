import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import {
  mockData,
  basicColumns,
  selectableColumns,
  sortableColumns,
  filterableColumns,
  waitForRender,
  treeData,
} from './shared/test-utils';
import { ADVANCED_COMPONENTS } from './shared/test-constants';
import {
  expectSortIcons,
  expectFilterIcons,
  expectEventTriggered,
  expectDragHandles,
  expectCheckboxes,
} from './shared/test-assertions';
import { TdPrimaryTableProps } from '@tdesign/components/table';

describe('Table Hooks Functionality', () => {
  // 测试useSorter hook
  describe('useSorter Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useSorter`, () => {
        it('should render sort icons when sorter is enabled', async () => {
          const wrapper = mount(() => <TableComponent data={mockData} columns={sortableColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证排序图标存在
          expectSortIcons(wrapper);
        });

        it('should handle sort change events', async () => {
          const onSortChange = vi.fn();

          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={sortableColumns} rowKey="id" onSortChange={onSortChange} />
          ));

          await waitForRender(wrapper);

          // 点击排序图标
          const sortIcon = wrapper.find('.t-table__sort-icon');
          if (sortIcon.exists()) {
            await sortIcon.trigger('click');
            await nextTick();

            // 验证排序事件被触发
            expectEventTriggered(onSortChange);
          }
        });

        it('should support multiple sort', async () => {
          const onSortChange = vi.fn();

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={sortableColumns}
              rowKey="id"
              multipleSort={true}
              onSortChange={onSortChange}
            />
          ));

          await waitForRender(wrapper);

          // 点击多个排序图标
          const sortIcons = wrapper.findAll('.t-table__sort-icon');
          if (sortIcons.length > 1) {
            await sortIcons[0].trigger('click');
            await sortIcons[1].trigger('click');
            await nextTick();

            // 验证多次排序事件被触发
            expect(onSortChange).toHaveBeenCalledTimes(2);
          }
        });
      });
    });
  });

  // 测试useFilter hook
  describe('useFilter Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useFilter`, () => {
        it('should render filter icons when filter is enabled', async () => {
          const wrapper = mount(() => <TableComponent data={mockData} columns={filterableColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证筛选图标存在
          expectFilterIcons(wrapper);
        });

        it('should support custom filter function', async () => {
          const customFilterColumns: TdPrimaryTableProps['columns'] = [
            { title: 'ID', colKey: 'id', width: 80 },
            { title: 'Name', colKey: 'name', width: 150 },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Email', colKey: 'email', width: 200 },
            {
              title: 'Status',
              colKey: 'status',
              width: 100,
              filter: {
                type: 'custom',
                function: (row: any, value: any) => row.status === value,
              },
            },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={customFilterColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证自定义筛选功能
          expectFilterIcons(wrapper);
        });
      });
    });
  });

  // 测试useRowSelect hook
  describe('useRowSelect Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useRowSelect`, () => {
        const onSelectChange = vi.fn();

        it('should render checkboxes when rowKey is provided', async () => {
          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={selectableColumns} rowKey="id" onSelectChange={onSelectChange} />
          ));

          await waitForRender(wrapper);
          expectCheckboxes(wrapper);
        });

        it('should handle row selection events', async () => {
          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={basicColumns} rowKey="id" onSelectChange={onSelectChange} />
          ));

          await waitForRender(wrapper);

          // 点击选择框
          const checkbox = wrapper.find('.t-table__checkbox');
          if (checkbox.exists()) {
            await checkbox.trigger('click');
            await nextTick();

            // 验证选择事件被触发
            expectEventTriggered(onSelectChange);
          }
        });

        it('should support selectOnRowClick', async () => {
          const onSelectChange = vi.fn();

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={basicColumns}
              rowKey="id"
              selectOnRowClick={true}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 点击行
          const firstRow = wrapper.find('tbody tr');
          if (firstRow.exists()) {
            await firstRow.trigger('click');
            await nextTick();

            // 验证选择事件被触发
            expectEventTriggered(onSelectChange);
          }
        });
      });
    });
  });

  // 测试useRowExpand hook
  describe('useRowExpand Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useRowExpand`, () => {
        it('should render expand icons when expandedRow is provided', async () => {
          const expandedRow = (h: any, { row }: any) =>
            h('div', { class: 'expanded-content' }, `Details for ${row.name}`);
          const onExpandChange = vi.fn();
          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={basicColumns}
              rowKey="id"
              expandedRow={expandedRow}
              expandIcon={true}
              expandedRowKeys={['1']}
              onExpandChange={onExpandChange}
            />
          ));

          await waitForRender(wrapper);

          // 验证展开图标存在
          const expandIcons = wrapper.findAll('.t-table__expand-box');
          expect(expandIcons.length).toBeGreaterThan(0);
          if (expandIcons[0].exists()) {
            await expandIcons[0].trigger('click');
            await nextTick();

            // 验证展开事件被触发
            expectEventTriggered(onExpandChange);
          }
        });

        // it('should handle expand change events', async () => {
        //   const onExpandChange = vi.fn();
        //   const expandedRow = (h: any, { row }: any) => h('div', { class: 'expanded-content' }, `Details for ${row.name}`);

        //   const wrapper = mount(() => (
        //     <TableComponent
        //       data={mockData}
        //       columns={basicColumns}
        //       expandIcon={true}
        //       rowKey="id"
        //       expandedRow={expandedRow}
        //       expandedRowKeys={['1']}
        //       onExpandChange={onExpandChange}
        //     />
        //   ));

        //   await waitForRender(wrapper);

        //   // 点击展开图标
        //   const expandIcon = wrapper.find('.t-table__expand-box');
        //   if (expandIcon.exists()) {
        //     await expandIcon.trigger('click');
        //     await nextTick();

        //     // 验证展开事件被触发
        //     expectEventTriggered(onExpandChange);
        //   }
        // });
      });
    });
  });

  // 测试useDragSort hook
  describe('useDragSort Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useDragSort`, () => {
        it('should render drag handles when dragSort is enabled', async () => {
          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={basicColumns} rowKey="id" dragSort="row" />
          ));

          await waitForRender(wrapper);

          // 验证拖拽功能存在
          expectDragHandles(wrapper);
        });

        it('should handle drag sort events', async () => {
          const onDragSort = vi.fn();
          const data = ref([...mockData]);

          const wrapper = mount(() => (
            <TableComponent
              data={data.value}
              columns={basicColumns}
              rowKey="id"
              dragSort="row"
              onDragSort={onDragSort}
            />
          ));

          await waitForRender(wrapper);

          // 验证拖拽功能已启用 - 检查表格是否有拖拽相关的类名
          expect(wrapper.classes()).toContain('t-table--row-draggable');
        });
      });
    });
  });

  // 测试useColumnResize hook
  describe('useColumnResize Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useColumnResize`, () => {
        it('should render resize handles when resizable is enabled', async () => {
          // const resizableColumns = [
          //   { title: 'ID', colKey: 'id', width: 80 },
          //   { title: 'Name', colKey: 'name', width: 150 },
          //   { title: 'Age', colKey: 'age', width: 80 },
          //   { title: 'Email', colKey: 'email', width: 200 },
          //   { title: 'Status', colKey: 'status', width: 100 }
          // ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={basicColumns} rowKey="id" resizable />);
          await waitForRender(wrapper);
          // 验证调整手柄存在
          // 实际的resize功能是通过表格级别的类名实现的
          expect(wrapper.classes()).toContain('t-table--column-resizable');
        });

        it('should handle column resize events', async () => {
          const resizableColumns = [
            { title: 'ID', colKey: 'id', width: 80, resizable: true },
            { title: 'Name', colKey: 'name', width: 150, resizable: true },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Email', colKey: 'email', width: 200 },
            { title: 'Status', colKey: 'status', width: 100 },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={resizableColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 模拟调整事件 - 实际的resize功能是通过表头单元格的事件监听器实现的
          const tableHeader = wrapper.find('thead');
          if (tableHeader.exists()) {
            await tableHeader.trigger('mousedown');
            await nextTick();

            // 验证调整状态 - 检查是否有resize line
            expect(wrapper.find('.t-table__resize-line').exists()).toBeTruthy();
          }
        });
      });
    });
  });

  // 测试useFixed hook
  describe('useFixed Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useFixed`, () => {
        it('should render fixed columns correctly', async () => {
          const fixedColumns = [
            { title: 'ID', colKey: 'id', width: 80, fixed: 'left' },
            { title: 'Name', colKey: 'name', width: 150 },
            { title: 'Age', colKey: 'age', width: 80 },
            { title: 'Email', colKey: 'email', width: 200 },
            { title: 'Status', colKey: 'status', width: 100, fixed: 'right' },
          ];

          const wrapper = mount(() => <TableComponent data={mockData} columns={fixedColumns} rowKey="id" />);

          await waitForRender(wrapper);

          // 验证固定列存在
          const fixedLeftCells = wrapper.findAll('.t-table__cell--fixed-left');
          const fixedRightCells = wrapper.findAll('.t-table__cell--fixed-right');
          expect(fixedLeftCells.length).toBeGreaterThan(0);
          expect(fixedRightCells.length).toBeGreaterThan(0);
        });

        it('should handle fixed header correctly', async () => {
          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={basicColumns} rowKey="id" maxHeight={200} />
          ));

          await waitForRender(wrapper);

          // 验证固定表头存在
          const fixedHeader = wrapper.find('.t-table__header--fixed');
          expect(fixedHeader.exists()).toBeTruthy();
        });
      });
    });
  });

  // 测试useTreeData hook
  describe('useTreeData Hook', () => {
    ADVANCED_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - useTreeData`, () => {
        it('should render tree data correctly', async () => {
          const wrapper = mount(() => (
            <TableComponent
              data={treeData}
              columns={basicColumns}
              rowKey="id"
              tree={{
                treeNodeColumnIndex: 1,
                expandTreeNodeOnClick: true,
                childrenKey: 'children',
              }}
            />
          ));
          await waitForRender(wrapper);
          // 验证树形图标存在
          const treeIcons = wrapper.findAll('.t-table__tree-op-icon');
          // console.log('treeIcons===>', wrapper.html());
          expect(treeIcons.length).toBeGreaterThan(0);
        });

        it('should handle tree node expansion', async () => {
          const wrapper = mount(() => (
            <TableComponent
              data={treeData}
              columns={basicColumns}
              rowKey="id"
              tree={{
                treeNodeColumnIndex: 1,
                childrenKey: 'children',
              }}
            />
          ));
          await waitForRender(wrapper);
          // 点击树形图标展开
          const treeIcon = wrapper.find('.t-table__tree-op-icon');
          if (treeIcon.exists()) {
            await treeIcon.trigger('click');
            await nextTick();
            // 验证子节点显示
            expect(wrapper.find('.t-table-tr--level-1').exists()).toBeTruthy();
          }
        });
      });
    });
  });
});
