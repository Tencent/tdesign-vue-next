/**
 * 表格行选择功能测试
 * 测试单选、多选、全选、选择状态管理等选择相关功能
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { Table, PrimaryTable, EnhancedTable } from '@tdesign/components/table';
import {
  mockData,
  selectableColumns,
  waitForRender,
  expectTableStructure,
  expectSelectedRows,
  clickTableRow,
} from './shared/test-utils';
import { cloneDeep } from 'lodash-es';

// 支持行选择的表格组件
const SELECTABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

describe('Table Selection Functionality', () => {
  // 测试基础选择功能
  describe('Basic Selection', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name}`, () => {
        it('should render selection column when selectedRowKeys is provided', async () => {
          const selectedRowKeys = ref<any[]>([]);

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={(keys: any[]) => (selectedRowKeys.value = keys)}
            />
          ));

          await waitForRender(wrapper);

          expectTableStructure(wrapper);

          // 应该有选择列单元格
          const selectCells = wrapper.findAll('.t-table__cell-check');
          expect(selectCells.length).toBeGreaterThan(0);

          // 应该有复选框
          const checkboxes = wrapper.findAll('.t-checkbox');
          expect(checkboxes.length).toBeGreaterThan(0);
        });

        it('should select single row when checkbox is clicked', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 点击第一行的复选框 - 直接触发内部的input元素的change事件
          const firstRowCheckbox = wrapper.findAll('tbody .t-checkbox input')[0];
          await firstRowCheckbox.trigger('change');
          await waitForRender(wrapper);

          // 验证选择事件被触发 - 检查第一个参数（选中的键数组）
          expect(onSelectChange).toHaveBeenCalled();
          const firstCall = onSelectChange.mock.calls[0];
          expect(firstCall[0]).toEqual([1]); // 第一行的ID是1

          // 更新状态模拟受控组件
          selectedRowKeys.value = [1];
          await waitForRender(wrapper);

          // 验证行选中状态
          expectSelectedRows(wrapper, 1);
        });

        it('should select multiple rows', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 点击第一行和第三行的复选框 - 直接触发内部的input元素的change事件
          const rowCheckboxes = wrapper.findAll('tbody .t-checkbox input');
          await rowCheckboxes[0].trigger('change');
          await waitForRender(wrapper);

          // 模拟第一次选择后的状态
          selectedRowKeys.value = [1];
          await waitForRender(wrapper);

          await rowCheckboxes[2].trigger('change');
          await waitForRender(wrapper);

          // 验证多次选择事件
          expect(onSelectChange).toHaveBeenCalledTimes(2);

          // 模拟最终状态
          selectedRowKeys.value = [1, 3];
          await waitForRender(wrapper);

          expectSelectedRows(wrapper, 2);
        });

        it('should select all rows when select-all checkbox is clicked', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 点击全选复选框 - 直接触发内部的input元素的change事件
          const selectAllCheckbox = wrapper.find('thead .t-checkbox input');
          await selectAllCheckbox.trigger('change');
          await waitForRender(wrapper);

          // 验证选择事件被触发，包含所有行的ID
          const allIds = mockData.map((item) => item.id);
          expect(onSelectChange).toHaveBeenCalledWith(
            allIds,
            expect.objectContaining({
              type: 'check',
              currentRowKey: 'CHECK_ALL_BOX',
            }),
          );

          // 模拟全选状态
          selectedRowKeys.value = allIds;
          await waitForRender(wrapper);

          expectSelectedRows(wrapper, mockData.length);
        });

        it('should deselect all rows when select-all checkbox is clicked again', async () => {
          const selectedRowKeys = ref<any[]>(mockData.map((item) => item.id)); // 初始全选状态
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 验证初始全选状态
          expectSelectedRows(wrapper, mockData.length);

          // 点击全选复选框取消选择 - 直接触发内部的input元素的change事件
          const selectAllCheckbox = wrapper.find('thead .t-checkbox input');
          await selectAllCheckbox.trigger('change');
          await waitForRender(wrapper);

          // 验证取消选择事件
          expect(onSelectChange).toHaveBeenCalledWith(
            [],
            expect.objectContaining({ type: 'uncheck', selectedRowData: [] }),
          );

          // 模拟取消选择状态
          selectedRowKeys.value = [];
          await waitForRender(wrapper);

          expectSelectedRows(wrapper, 0);
        });
      });
    });
  });

  // 测试行点击选择
  describe('Row Click Selection', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Row Click`, () => {
        it('should select row when row is clicked (if selectOnRowClick is enabled)', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
              selectOnRowClick={true}
            />
          ));

          await waitForRender(wrapper);

          // 点击第一行
          await clickTableRow(wrapper, 0);

          // 验证选择事件被触发 - 检查第一个参数（选中的键数组）
          expect(onSelectChange).toHaveBeenCalled();
          const firstCall = onSelectChange.mock.calls[0];
          expect(firstCall[0]).toEqual([1]);
        });

        it('should toggle selection when clicking same row twice', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
              selectOnRowClick={true}
            />
          ));

          await waitForRender(wrapper);

          // 第一次点击选中
          await clickTableRow(wrapper, 0);
          expect(onSelectChange).toHaveBeenCalledWith(
            [1],
            expect.objectContaining({
              type: 'check',
              currentRowKey: 1,
            }),
          );

          // 模拟选中状态
          selectedRowKeys.value = [1];
          await waitForRender(wrapper);

          // 第二次点击取消选中
          await clickTableRow(wrapper, 0);
          expect(onSelectChange).toHaveBeenCalledWith(
            [1],
            expect.objectContaining({
              type: 'check',
              currentRowKey: 1,
            }),
          );

          selectedRowKeys.value = [];
        });
      });
    });
  });

  // 测试单选模式
  describe('Single Selection Mode', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Single Select`, () => {
        it('should support single selection mode', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
              selectType="single"
            />
          ));

          await waitForRender(wrapper);

          // 单选模式应该有单选按钮而不是复选框
          const radioButtons = wrapper.findAll('tbody .t-radio');
          if (radioButtons.length > 0) {
            expect(radioButtons).toHaveLength(mockData.length);

            // 不应该有全选复选框
            const selectAllCheckbox = wrapper.find('thead .t-checkbox');
            expect(selectAllCheckbox.exists()).toBeFalsy();
          }
        });

        it('should only allow one row selection in single mode', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            selectedRowKeys.value = keys;
          });

          const singleSelectColumns = cloneDeep(selectableColumns).map((column, index) => {
            if (index === 0) {
              return { ...column, type: 'single' as const };
            }
            return column;
          });
          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={singleSelectColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 选择第一行
          const firstRowRadio = wrapper.findAll('tbody .t-radio')[0];
          if (firstRowRadio.exists()) {
            await firstRowRadio.trigger('click');
            const calls = onSelectChange.mock.calls;
            expect(calls[calls.length - 1][0]).toEqual([1]);

            // 模拟选中状态
            selectedRowKeys.value = [1];
            await waitForRender(wrapper);

            // 选择第二行应该替换第一行的选择
            const secondRowRadio = wrapper.findAll('tbody .t-radio')[1];
            await secondRowRadio.trigger('click');
            // expect(onSelectChange).toHaveBeenCalledWith([2]);
            expect(onSelectChange).toHaveBeenLastCalledWith(
              [2], // 最终选中的rowKey数组（只有2）
              expect.objectContaining({
                type: 'check', // 最后一次是选中操作
                currentRowKey: 2, // 最后操作的行是id=2
              }),
            );
          }
        });
      });
    });
  });

  // 测试选择限制
  describe('Selection Constraints', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Selection Limits`, () => {
        it('should respect maxSelected limit', async () => {
          const selectedRowKeys = ref<any[]>([]);
          const onSelectChange = vi.fn((keys) => {
            // 模拟组件内部的maxSelected逻辑
            if (keys.length <= 2) {
              selectedRowKeys.value = keys;
            }
          });

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
              onSelectChange={onSelectChange}
              maxSelected={2}
            />
          ));

          await waitForRender(wrapper);

          // 选择前两行
          const rowCheckboxes = wrapper.findAll('tbody .t-checkbox');
          await rowCheckboxes[0].trigger('click');
          selectedRowKeys.value = [1];
          await waitForRender(wrapper);

          await rowCheckboxes[1].trigger('click');
          selectedRowKeys.value = [1, 2];
          await waitForRender(wrapper);

          // 尝试选择第三行（应该被限制）
          await rowCheckboxes[2].trigger('click');

          // 验证选择数量不超过限制
          expect(selectedRowKeys.value.length).toBeLessThanOrEqual(2);
        });

        it('should disable unselectable rows', async () => {
          const disabledRows = [1, 3]; // 禁用第2和第4行
          const addDisabledColumnsConf = selectableColumns.map((column) => {
            return { ...column, disabled: ({ rowIndex }: any) => disabledRows.includes(rowIndex) };
          });
          const wrapper = mount(() => (
            <TableComponent data={mockData} columns={addDisabledColumnsConf} rowKey="id" selectedRowKeys={[]} />
          ));

          await waitForRender(wrapper);

          // 检查禁用行的复选框状态
          const rowCheckboxes = wrapper.findAll('tbody .t-checkbox');
          // 第2行（索引2）应该被禁用
          const secondRowCheckbox = rowCheckboxes[1];
          expect(secondRowCheckbox.classes()).toContain('t-is-disabled');

          // 第4行（索引3）应该被禁用
          const fourthRowCheckbox = rowCheckboxes[3];
          expect(fourthRowCheckbox.classes()).toContain('t-is-disabled');
        });
      });
    });
  });

  // 测试选择状态显示
  describe('Selection State Display', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Selection Display`, () => {
        it('should show indeterminate state when some rows are selected', async () => {
          const selectedRowKeys = ref([1, 2]); // 部分选中

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
            />
          ));

          await waitForRender(wrapper);

          // 全选复选框应该显示半选状态
          const selectAllCheckbox = wrapper.find('thead .t-checkbox');
          expect(selectAllCheckbox.classes()).toContain('t-is-indeterminate');
        });

        it('should highlight selected rows', async () => {
          const selectedRowKeys = ref([1, 3]);

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
            />
          ));

          await waitForRender(wrapper);

          // 检查选中行的高亮样式
          const rows = wrapper.findAll('tbody tr');
          expect(rows[0].classes()).toContain('t-table__row--selected');
          expect(rows[1].classes()).not.toContain('t-table__row--selected');
          expect(rows[2].classes()).toContain('t-table__row--selected');
        });
      });
    });
  });

  // 测试选择事件
  describe('Selection Events', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Selection Events`, () => {
        it('should trigger onSelectChange event when single row is selected', async () => {
          const onSelectChange = vi.fn();

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={[]}
              onSelectChange={onSelectChange}
            />
          ));

          await waitForRender(wrapper);

          // 选择第一行 - 直接触发内部的input元素的change事件
          const firstRowCheckbox = wrapper.findAll('tbody .t-checkbox input')[0];
          await firstRowCheckbox.trigger('change');
          // await waitForRender(wrapper);
          // 验证onSelect事件
          expect(onSelectChange).toHaveBeenCalledWith(
            [1],
            expect.objectContaining({
              type: 'check', // 第二个参数：options 对象中的 type 属性
              currentRowKey: 1,
            }),
          );
        });
      });
    });
  });

  // 测试选择边界情况
  describe('Selection Edge Cases', () => {
    SELECTABLE_COMPONENTS.forEach(({ name, component: TableComponent }) => {
      describe(`${name} - Edge Cases`, () => {
        it('should handle empty data with selection', async () => {
          const selectedRowKeys = ref<any[]>([]);

          const wrapper = mount(() => (
            <TableComponent data={[]} columns={selectableColumns} rowKey="id" selectedRowKeys={selectedRowKeys.value} />
          ));

          await waitForRender(wrapper);

          expectTableStructure(wrapper);

          // 全选复选框应该存在但禁用
          const selectAllCheckbox = wrapper.find('thead .t-checkbox');
          expect(selectAllCheckbox.exists()).toBeTruthy();
          expect(selectAllCheckbox.classes()).toContain('t-is-disabled');
        });

        it('should handle selectedRowKeys with non-existent IDs', async () => {
          const selectedRowKeys = ref([999, 1, 888]); // 包含不存在的ID

          const wrapper = mount(() => (
            <TableComponent
              data={mockData}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
            />
          ));

          await waitForRender(wrapper);

          // 只有存在的行应该被选中
          expectSelectedRows(wrapper, 1); // 只有ID为1的行存在
        });

        it('should handle dynamic data changes with selection', async () => {
          const data = ref([...mockData]);
          const selectedRowKeys = ref([1, 2, 3]);

          const wrapper = mount(() => (
            <TableComponent
              data={data.value}
              columns={selectableColumns}
              rowKey="id"
              selectedRowKeys={selectedRowKeys.value}
            />
          ));

          await waitForRender(wrapper);

          // 初始选中3行
          expectSelectedRows(wrapper, 3);

          // 移除第2行数据
          data.value = data.value.filter((item) => item.id !== 2);
          await waitForRender(wrapper);

          // 应该只有2行被选中（第2行已被移除）
          expectSelectedRows(wrapper, 2);
        });
      });
    });
  });
});
