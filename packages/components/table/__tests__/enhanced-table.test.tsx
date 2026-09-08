import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import type { SortableEvent } from 'sortablejs';
import { EnhancedTable, PrimaryTable } from '@tdesign/components/table';
import type { PrimaryTableCol, TableRowData } from '@tdesign/components/table/type';
import log from '@tdesign/common-js/log/index';

describe('EnhancedTable', () => {
  {
    function getTreeData() {
      return [
        {
          id: 1,
          name: 'node-1',
          children: [
            { id: 11, name: 'node-1-1' },
            {
              id: 12,
              name: 'node-1-2',
              children: [
                { id: 121, name: 'node-1-2-1' },
                { id: 122, name: 'node-1-2-2' },
              ],
            },
          ],
        },
        { id: 2, name: 'node-2' },
      ];
    }

    const columns = [
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
    ];

    const TREE_ICON = '.t-table__tree-op-icon';

    function mountTree(props = {}) {
      return mount(EnhancedTable, {
        props: { rowKey: 'id', data: getTreeData(), columns, tree: { childrenKey: 'children' }, ...props },
      });
    }

    function getRowIds(wrapper: VueWrapper) {
      return wrapper.findAll('tbody tr').map((tr) => tr.findAll('td')[0].text());
    }

    describe('props', () => {
      describe(':tree[object]', () => {
        describe(':tree[object]', () => {
          it('only first level data is rendered by default', () => {
            const wrapper = mountTree();
            expect(getRowIds(wrapper)).toEqual(['1', '2']);
          });

          it('tree expand icon is rendered on the node with children', () => {
            const wrapper = mountTree();
            const trList = wrapper.findAll('tbody tr');
            // 有子节点的行渲染展开图标，叶子节点渲染占位图标
            expect(trList[0].find('.t-table__tree-op-icon svg').exists()).toBe(true);
            expect(trList[1].find('.t-table__tree-leaf-node').exists()).toBe(true);
            expect(trList[1].find('.t-table__tree-op-icon svg').exists()).toBe(false);
          });

          it('tree.treeNodeColumnIndex works fine', () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', treeNodeColumnIndex: 1 } });
            const tdList = wrapper.findAll('tbody tr')[0].findAll('td');
            expect(tdList[0].find(TREE_ICON).exists()).toBe(false);
            expect(tdList[1].find(TREE_ICON).exists()).toBe(true);
          });
          it('tree.defaultExpandAll expands all nodes', () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', defaultExpandAll: true } });
            expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '121', '122', '2']);
          });

          it('tree.indent works fine', () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', defaultExpandAll: true, indent: 40 } });
            // 展开后依次为 1 / 11 / 12 / 121 / 122 / 2
            const trList = wrapper.findAll('tbody tr');
            // 第一层级为固定的 1px，有子节点的行使用 tree-col 类名
            expect(trList[0].find('.t-table__tree-col').attributes('style')).toContain('padding-left: 1px');
            // node-1-2 处于第二层级，缩进 1 * indent
            expect(trList[2].find('.t-table__tree-col').attributes('style')).toContain('padding-left: 40px');
            // node-1-1 为叶子节点，使用 tree-leaf-node 类名，缩进规则一致
            expect(trList[1].find('.t-table__tree-leaf-node').attributes('style')).toContain('padding-left: 40px');
            // node-1-2-1 处于第三层级，缩进 2 * indent
            expect(trList[3].find('.t-table__tree-leaf-node').attributes('style')).toContain('padding-left: 80px');
          });

          it('tree.indent default value is 24', () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', defaultExpandAll: true } });
            const trList = wrapper.findAll('tbody tr');
            expect(trList[2].find('.t-table__tree-col').attributes('style')).toContain('padding-left: 24px');
            expect(trList[3].find('.t-table__tree-leaf-node').attributes('style')).toContain('padding-left: 48px');
          });
        });

        describe('tree node level', () => {
          it('tree node level class works fine', async () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', defaultExpandAll: true } });
            await nextTick();
            const trList = wrapper.findAll('tbody tr');
            expect(trList[0].classes('t-table-tr--level-0')).toBe(true);
            expect(trList[1].classes('t-table-tr--level-1')).toBe(true);
            expect(trList[3].classes('t-table-tr--level-2')).toBe(true);
          });
        });
      });
    });

    describe('events', () => {
      describe(':tree[object]', () => {
        describe('expand and fold tree node', () => {
          it('click tree icon expands children', async () => {
            const wrapper = mountTree();
            await wrapper.find(TREE_ICON).trigger('click');
            expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '2']);
          });

          it('click tree icon again folds children', async () => {
            const wrapper = mountTree();
            await wrapper.find(TREE_ICON).trigger('click');
            expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '2']);

            await wrapper.find(TREE_ICON).trigger('click');
            expect(getRowIds(wrapper)).toEqual(['1', '2']);
          });

          it('nested children could be expanded', async () => {
            const wrapper = mountTree();
            await wrapper.find(TREE_ICON).trigger('click');
            // 展开 node-1-2（第 3 行）
            await wrapper.findAll('tbody tr')[2].find(TREE_ICON).trigger('click');
            expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '121', '122', '2']);
          });

          it('events.onTreeExpandChange works fine', async () => {
            const onTreeExpandChange = vi.fn();
            const wrapper = mountTree({ onTreeExpandChange });
            await wrapper.find(TREE_ICON).trigger('click');

            expect(onTreeExpandChange).toHaveBeenCalledTimes(1);
            expect(onTreeExpandChange.mock.calls[0][0].row.id).toBe(1);
            expect(onTreeExpandChange.mock.calls[0][0].rowState.expanded).toBe(true);
          });

          it('tree.expandTreeNodeOnClick works fine', async () => {
            const wrapper = mountTree({ tree: { childrenKey: 'children', expandTreeNodeOnClick: true } });
            await wrapper.findAll('tbody tr')[0].trigger('click');
            expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '2']);
          });
        });
      });
    });

    describe('instanceFunctions', () => {
      describe('instance methods', () => {
        it('getTreeExpandedRow works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          await wrapper.find(TREE_ICON).trigger('click');
          expect(tableRef.value.getTreeExpandedRow('data')).toHaveLength(1);
          expect(tableRef.value.getTreeExpandedRow('data')[0].id).toBe(1);
          // 'all' 返回包含行状态的完整数据
          expect(tableRef.value.getTreeExpandedRow('all')[0].row.id).toBe(1);
        });

        it('expandAll and foldAll work fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.expandAll();
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '121', '122', '2']);

          tableRef.value.foldAll();
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['1', '2']);
        });

        it('resetData works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.resetData([{ id: 9, name: 'node-9' }]);
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['9']);
        });

        it('getData works fine', () => {
          const tableRef = ref();
          mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          const rowState = tableRef.value.getData(1);
          expect(rowState.row.id).toBe(1);
          expect(rowState.level).toBe(0);
          expect(rowState.expanded).toBe(false);
        });

        it('appendTo works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          await wrapper.find(TREE_ICON).trigger('click');
          tableRef.value.appendTo(1, { id: 13, name: 'node-1-3' });
          await nextTick();
          expect(getRowIds(wrapper)).toContain('13');
        });

        it('insertBefore and insertAfter work fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.insertBefore(1, { id: 0, name: 'node-0' });
          await nextTick();
          expect(getRowIds(wrapper)[0]).toBe('0');

          tableRef.value.insertAfter(2, { id: 3, name: 'node-3' });
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['0', '1', '2', '3']);
        });

        it('remove works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.remove(2);
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['1']);
        });

        it('getTreeNode works fine', () => {
          const tableRef = ref();
          mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          expect(tableRef.value.getTreeNode().map((t: TableRowData) => t.id)).toEqual([1, 2]);
        });

        it('removeChildren works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          await wrapper.find(TREE_ICON).trigger('click');
          expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '2']);

          tableRef.value.removeChildren(1);
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['1', '2']);
        });

        it('toggleExpandData works fine', async () => {
          const tableRef = ref();
          const treeData = getTreeData();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={treeData}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.toggleExpandData({ row: treeData[0], rowIndex: 0 });
          await nextTick();
          expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '2']);
        });

        it('setData of one row works fine', async () => {
          const tableRef = ref();
          const wrapper = mount(() => (
            <EnhancedTable
              ref={tableRef}
              rowKey="id"
              data={getTreeData()}
              columns={columns}
              tree={{ childrenKey: 'children' }}
            />
          ));
          tableRef.value.setData(2, { id: 2, name: 'node-2-updated' });
          await nextTick();
          expect(wrapper.findAll('tbody tr')[1].findAll('td')[1].text()).toBe('node-2-updated');
        });
      });
    });
  }

  {
    function getTreeData() {
      return [
        {
          id: 1,
          name: 'node-1',
          children: [
            { id: 11, name: 'node-1-1' },
            {
              id: 12,
              name: 'node-1-2',
              children: [
                { id: 121, name: 'node-1-2-1' },
                { id: 122, name: 'node-1-2-2' },
              ],
            },
          ],
        },
        { id: 2, name: 'node-2' },
      ];
    }

    const columns: PrimaryTableCol<TableRowData>[] = [
      { colKey: 'row-select', type: 'multiple', width: 50 },
      { colKey: 'id', title: 'id' },
      { colKey: 'name', title: 'name' },
    ];

    const CHECK_INPUT = 'tbody .t-table__cell-check input';

    // 父子联动需显式关闭 checkStrictly
    const RELATED_TREE = { childrenKey: 'children', defaultExpandAll: true, checkStrictly: false };

    function mountTreeSelect(props = {}) {
      return mount(EnhancedTable, {
        props: {
          rowKey: 'id',
          data: getTreeData(),
          columns,
          tree: { childrenKey: 'children', defaultExpandAll: true },
          ...props,
        },
      });
    }

    function getRowIds(wrapper: VueWrapper) {
      return wrapper.findAll('tbody tr').map((tr) => tr.findAll('td')[1].text());
    }

    describe('props', () => {
      describe(':selectedRowKeys[array] + tree[object]', () => {
        it('all tree nodes render checkbox', () => {
          const wrapper = mountTreeSelect();
          expect(getRowIds(wrapper)).toEqual(['1', '11', '12', '121', '122', '2']);
          expect(wrapper.findAll(CHECK_INPUT)).toHaveLength(6);
        });

        it('parent node is indeterminate when part of children are selected', async () => {
          const wrapper = mountTreeSelect({ indeterminateSelectedRowKeys: [1], selectedRowKeys: [11] });
          await nextTick();
          const firstRowCheckbox = wrapper.findAll('tbody .t-table__cell-check .t-checkbox')[0];
          expect(firstRowCheckbox.classes('t-is-indeterminate')).toBe(true);
        });

        it('selected tree row has selected class', () => {
          const wrapper = mountTreeSelect({ selectedRowKeys: [11] });
          const trList = wrapper.findAll('tbody tr');
          expect(trList[1].classes('t-table__row--selected')).toBe(true);
          expect(trList[0].classes('t-table__row--selected')).toBe(false);
        });
      });
    });

    describe('events', () => {
      describe(':selectedRowKeys[array] + tree[object]', () => {
        it('check parent node selects all children', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mountTreeSelect({ tree: RELATED_TREE, onSelectChange });
          await wrapper.findAll(CHECK_INPUT)[0].setValue(true);

          expect(onSelectChange).toHaveBeenCalledTimes(1);
          // 父节点选中后，所有子节点同时选中
          expect([...onSelectChange.mock.calls[0][0]].sort((a, b) => a - b)).toEqual([1, 11, 12, 121, 122]);
        });

        it('uncheck parent node clears all children', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mountTreeSelect({
            tree: RELATED_TREE,
            selectedRowKeys: [1, 11, 12, 121, 122],
            onSelectChange,
          });
          await wrapper.findAll(CHECK_INPUT)[0].setValue(false);
          expect(onSelectChange.mock.calls[0][0]).toEqual([]);
        });

        it('check all children selects the parent node', async () => {
          const selectedRowKeys = ref([]);
          const wrapper = mount(EnhancedTable, {
            props: {
              rowKey: 'id',
              data: getTreeData(),
              columns,
              tree: RELATED_TREE,
              get selectedRowKeys() {
                return selectedRowKeys.value;
              },
              onSelectChange: (val) => {
                selectedRowKeys.value = val;
              },
            },
          });
          // 选中 node-1-1
          await wrapper.findAll(CHECK_INPUT)[1].setValue(true);
          await wrapper.setProps({ selectedRowKeys: selectedRowKeys.value });
          // 选中 node-1-2（会连带其子节点），此时 node-1 的所有叶子节点均已选中
          await wrapper.findAll(CHECK_INPUT)[2].setValue(true);
          expect(selectedRowKeys.value).toContain(1);
        });

        it('tree.checkStrictly disables parent-children relation', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mount(EnhancedTable, {
            props: {
              rowKey: 'id',
              data: getTreeData(),
              columns,
              tree: { childrenKey: 'children', defaultExpandAll: true, checkStrictly: true },
              onSelectChange,
            },
          });
          await wrapper.findAll(CHECK_INPUT)[0].setValue(true);
          // 严格模式下只选中当前节点
          expect(onSelectChange.mock.calls[0][0]).toEqual([1]);
        });

        it('check leaf node works fine', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mountTreeSelect({ onSelectChange });
          // node-1-2-1 是叶子节点
          await wrapper.findAll(CHECK_INPUT)[3].setValue(true);
          expect(onSelectChange.mock.calls[0][0]).toContain(121);
        });

        it('disabled tree node is excluded from parent selection', async () => {
          const onSelectChange = vi.fn();
          const disabledColumns: PrimaryTableCol<TableRowData>[] = [
            {
              colKey: 'row-select',
              type: 'multiple',
              width: 50,
              disabled: ({ row }: { row: TableRowData }) => row.id === 11,
            },
            { colKey: 'id', title: 'id' },
            { colKey: 'name', title: 'name' },
          ];
          const wrapper = mount(EnhancedTable, {
            props: {
              rowKey: 'id',
              data: getTreeData(),
              columns: disabledColumns,
              tree: RELATED_TREE,
              onSelectChange,
            },
          });
          await wrapper.findAll(CHECK_INPUT)[0].setValue(true);
          expect(onSelectChange.mock.calls[0][0]).not.toContain(11);
        });

        it('select all in header works fine with tree data', async () => {
          const onSelectChange = vi.fn();
          const wrapper = mountTreeSelect({ onSelectChange });
          await wrapper.find('thead .t-table__cell-check input').setValue(true);
          expect(onSelectChange.mock.calls[0][0].length).toBeGreaterThan(0);
        });
      });
    });
  }

  describe('props', () => {
    it(':columns[array] recursively formats multi-level tree headers', () => {
      const columns: PrimaryTableCol<TableRowData>[] = [
        {
          colKey: 'group',
          title: 'Group',
          children: [
            { colKey: 'id', title: 'ID' },
            { colKey: 'name', title: 'Name' },
          ],
        },
      ];
      const wrapper = mount(
        <EnhancedTable
          rowKey="id"
          data={[{ id: 1, name: 'parent', children: [{ id: 11, name: 'child' }] }]}
          columns={columns}
          tree={{ childrenKey: 'children', defaultExpandAll: true }}
        />,
      );
      expect(wrapper.findAll('thead tr')).toHaveLength(2);
      expect(wrapper.findAll('thead tr')[1].findAll('th')).toHaveLength(2);
      expect(wrapper.findAll('tbody tr')).toHaveLength(2);
    });
  });

  describe('events', () => {
    it('onDragSort adapts column data and delegates row swaps', () => {
      const onDragSort = vi.fn();
      const beforeDragSort = vi.fn(() => true);
      const data = [{ id: 1 }, { id: 2 }];
      const columns = [
        { colKey: 'id', title: 'ID' },
        { colKey: 'name', title: 'Name' },
      ];
      const wrapper = mount(
        <EnhancedTable
          rowKey="id"
          data={data}
          columns={columns}
          tree={{ childrenKey: 'children' }}
          beforeDragSort={beforeDragSort}
          onDragSort={onDragSort}
        />,
      );
      const handler = wrapper.findComponent(PrimaryTable).props('onDragSort');
      handler({
        data: columns,
        currentIndex: 0,
        targetIndex: 1,
        current: columns[0],
        target: columns[1],
        newData: columns,
        e: new Event('dragend') as unknown as SortableEvent,
        sort: 'col',
      });
      expect(onDragSort.mock.calls[0][0]).toMatchObject({
        data: columns,
        current: columns[0],
        target: columns[1],
        newData: [columns[1], columns[0]],
        currentData: [columns[1], columns[0]],
        sort: 'col',
      });

      handler({
        data,
        currentIndex: 0,
        targetIndex: 1,
        current: data[0],
        target: data[1],
        newData: [data[1], data[0]],
        e: new Event('dragend') as unknown as SortableEvent,
        sort: 'row',
      });
      expect(onDragSort).toHaveBeenCalledTimes(2);
      expect(beforeDragSort).toHaveBeenCalledTimes(2);
    });

    it('beforeDragSort can cancel a drag change', () => {
      const onDragSort = vi.fn();
      const wrapper = mount(
        <EnhancedTable
          rowKey="id"
          data={[{ id: 1 }, { id: 2 }]}
          columns={[{ colKey: 'id', title: 'ID' }]}
          beforeDragSort={() => false}
          onDragSort={onDragSort}
        />,
      );
      wrapper.findComponent(PrimaryTable).props('onDragSort')({
        data: [],
        currentIndex: 0,
        targetIndex: 1,
        current: { id: 1 },
        target: { id: 2 },
        newData: [],
        e: new Event('dragend') as unknown as SortableEvent,
        sort: 'row',
      });
      expect(onDragSort).not.toHaveBeenCalled();
    });
  });

  describe('instanceFunctions', () => {
    it('forwards validation and refresh methods and resolves collapsed tree row indexes', async () => {
      const error = vi.spyOn(log, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        <EnhancedTable
          rowKey="id"
          data={[
            {
              id: 1,
              name: 'parent',
              children: [{ id: 11, name: 'child' }],
            },
          ]}
          columns={[{ colKey: 'name', title: 'Name' }]}
          tree={{ childrenKey: 'children' }}
        />,
      );
      const exposed = wrapper.vm.$.exposed;
      const primaryTable = exposed.primaryTableRef.value;
      const validateRowData = vi.spyOn(primaryTable, 'validateRowData').mockResolvedValue({ row: true });
      const validateTableData = vi.spyOn(primaryTable, 'validateTableData').mockResolvedValue({ table: true });
      const clearValidateData = vi.spyOn(primaryTable, 'clearValidateData').mockImplementation(() => undefined);
      const refreshTable = vi.spyOn(primaryTable, 'refreshTable').mockImplementation(() => undefined);
      const scrollToElement = vi.spyOn(primaryTable, 'scrollToElement').mockImplementation(() => undefined);

      await expect(exposed.validateRowData(1)).resolves.toEqual({ row: true });
      await expect(exposed.validateTableData()).resolves.toEqual({ table: true });
      exposed.clearValidateData();
      exposed.refreshTable();
      expect(validateRowData).toHaveBeenCalledWith(1);
      expect(validateTableData).toHaveBeenCalledTimes(1);
      expect(clearValidateData).toHaveBeenCalledTimes(1);
      expect(refreshTable).toHaveBeenCalledTimes(1);

      exposed.scrollToElement({ key: 11, top: 8 });
      expect(scrollToElement).toHaveBeenCalledWith({ key: 11, top: 8, index: 0 });
      exposed.scrollToElement({ index: 0 });
      expect(scrollToElement).toHaveBeenLastCalledWith({ index: 0 });
      exposed.scrollToElement({});
      exposed.scrollToElement({ key: 'missing' });
      expect(error).toHaveBeenCalledTimes(2);
    });
  });
});
