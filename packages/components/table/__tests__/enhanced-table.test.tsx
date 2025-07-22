// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, h } from 'vue';
import { EnhancedTable } from '@tdesign/components/table';

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

// 树形数据
const treeData = [
  {
    id: 1,
    name: 'Parent 1',
    age: 40,
    status: 'active',
    email: 'parent1@example.com',
    children: [
      { id: 11, name: 'Child 1-1', age: 20, status: 'active', email: 'child11@example.com' },
      { id: 12, name: 'Child 1-2', age: 22, status: 'inactive', email: 'child12@example.com' },
    ],
  },
  {
    id: 2,
    name: 'Parent 2',
    age: 45,
    status: 'inactive',
    email: 'parent2@example.com',
    children: [{ id: 21, name: 'Child 2-1', age: 25, status: 'active', email: 'child21@example.com' }],
  },
];

describe('EnhancedTable Component', () => {
  describe('Basic Rendering', () => {
    it('should render basic enhanced table', async () => {
      const wrapper = mount(() => <EnhancedTable data={testData} columns={testColumns} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty data', async () => {
      const wrapper = mount(() => <EnhancedTable data={[]} columns={testColumns} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty columns', async () => {
      const wrapper = mount(() => <EnhancedTable data={testData} columns={[]} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Structure', () => {
    it('should render with tree data', async () => {
      const wrapper = mount(() => <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree configuration', async () => {
      const treeConfig = {
        treeNodeColumnIndex: 0,
        expandTreeNodeOnClick: true,
        indent: 20,
      };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with custom tree expand icon', async () => {
      const customExpandIcon = () => <span>+</span>;
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          treeExpandAndFoldIcon={customExpandIcon}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with expanded tree nodes', async () => {
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={{}} expandedTreeNodes={[1]} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with default expanded tree nodes', async () => {
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={{}} defaultExpandedTreeNodes={[1]} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Drag Sort', () => {
    it('should render with before drag sort function', async () => {
      const beforeDragSort = vi.fn(() => true);
      const wrapper = mount(() => (
        <EnhancedTable data={testData} columns={testColumns} rowKey="id" beforeDragSort={beforeDragSort} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle drag sort change', async () => {
      const onDragSort = vi.fn();
      const wrapper = mount(() => (
        <EnhancedTable data={testData} columns={testColumns} rowKey="id" onDragSort={onDragSort} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle abnormal drag sort', async () => {
      const onAbnormalDragSort = vi.fn();
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          onAbnormalDragSort={onAbnormalDragSort}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Events', () => {
    it('should handle expanded tree nodes change', async () => {
      const onExpandedTreeNodesChange = vi.fn();
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          onExpandedTreeNodesChange={onExpandedTreeNodesChange}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle tree expand change (deprecated)', async () => {
      const onTreeExpandChange = vi.fn();
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          onTreeExpandChange={onTreeExpandChange}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Configuration', () => {
    it('should render with tree node column index', async () => {
      const treeConfig = { treeNodeColumnIndex: 1 };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree indent configuration', async () => {
      const treeConfig = { indent: 30 };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with expand tree node on click', async () => {
      const treeConfig = { expandTreeNodeOnClick: true };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree node column index 0', async () => {
      const treeConfig = { treeNodeColumnIndex: 0 };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Complex Tree Scenarios', () => {
    it('should render with deep nested tree data', async () => {
      const deepTreeData = [
        {
          id: 1,
          name: 'Level 1',
          age: 40,
          status: 'active',
          email: 'level1@example.com',
          children: [
            {
              id: 11,
              name: 'Level 2',
              age: 30,
              status: 'active',
              email: 'level2@example.com',
              children: [
                {
                  id: 111,
                  name: 'Level 3',
                  age: 20,
                  status: 'active',
                  email: 'level3@example.com',
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount(() => <EnhancedTable data={deepTreeData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with mixed tree and non-tree data', async () => {
      const mixedData = [
        { id: 1, name: 'Regular Row', age: 25, status: 'active', email: 'regular@example.com' },
        {
          id: 2,
          name: 'Tree Row',
          age: 30,
          status: 'inactive',
          email: 'tree@example.com',
          children: [{ id: 21, name: 'Child', age: 20, status: 'active', email: 'child@example.com' }],
        },
      ];
      const wrapper = mount(() => <EnhancedTable data={mixedData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Enhanced Table Features', () => {
    it('should render with all enhanced features', async () => {
      const treeConfig = {
        treeNodeColumnIndex: 0,
        expandTreeNodeOnClick: true,
        indent: 20,
      };
      const beforeDragSort = vi.fn(() => true);
      const onDragSort = vi.fn();
      const onExpandedTreeNodesChange = vi.fn();
      const customExpandIcon = () => <span>+</span>;

      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={treeConfig}
          expandedTreeNodes={[1]}
          treeExpandAndFoldIcon={customExpandIcon}
          beforeDragSort={beforeDragSort}
          onDragSort={onDragSort}
          onExpandedTreeNodesChange={onExpandedTreeNodesChange}
          bordered={true}
          stripe={true}
          hover={true}
          size="medium"
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree and selection', async () => {
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          selectedRowKeys={[1]}
          rowSelectionType="multiple"
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree and pagination', async () => {
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          pagination={{ total: 2, pageSize: 10 }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree and sorting', async () => {
      const wrapper = mount(() => (
        <EnhancedTable
          data={treeData}
          columns={testColumns}
          rowKey="id"
          tree={{}}
          sort={{ sortBy: 'name', descending: false }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with tree and filtering', async () => {
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={{}} filterValue={{ status: 'active' }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Data Operations', () => {
    it('should handle tree data with custom row key', async () => {
      const customKeyData = [
        {
          customId: 1,
          name: 'Parent',
          age: 40,
          status: 'active',
          email: 'parent@example.com',
          children: [{ customId: 11, name: 'Child', age: 20, status: 'active', email: 'child@example.com' }],
        },
      ];
      const wrapper = mount(() => (
        <EnhancedTable data={customKeyData} columns={testColumns} rowKey="customId" tree={{}} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle tree data with empty children', async () => {
      const emptyChildrenData = [
        {
          id: 1,
          name: 'Parent',
          age: 40,
          status: 'active',
          email: 'parent@example.com',
          children: [],
        },
      ];
      const wrapper = mount(() => (
        <EnhancedTable data={emptyChildrenData} columns={testColumns} rowKey="id" tree={{}} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle tree data with null children', async () => {
      const nullChildrenData = [
        {
          id: 1,
          name: 'Parent',
          age: 40,
          status: 'active',
          email: 'parent@example.com',
          children: null,
        },
      ];
      const wrapper = mount(() => (
        <EnhancedTable data={nullChildrenData} columns={testColumns} rowKey="id" tree={{}} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Column Formatting', () => {
    it('should render with complex column structure', async () => {
      const complexColumns = [
        {
          title: 'Basic Info',
          children: [
            { title: 'Name', colKey: 'name', width: 100 },
            { title: 'Age', colKey: 'age', width: 80 },
          ],
        },
        {
          title: 'Contact Info',
          children: [
            { title: 'Email', colKey: 'email', width: 200 },
            { title: 'Status', colKey: 'status', width: 100 },
          ],
        },
      ];
      const wrapper = mount(() => <EnhancedTable data={treeData} columns={complexColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with column render functions', async () => {
      const columnsWithRender = testColumns.map((col) => ({
        ...col,
        render: ({ row }) => (row ? row[col.colKey] : ''),
      }));
      const wrapper = mount(() => <EnhancedTable data={treeData} columns={columnsWithRender} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Row Interactions', () => {
    it('should handle row click with tree expand', async () => {
      const onRowClick = vi.fn();
      const treeConfig = { expandTreeNodeOnClick: true };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} onRowClick={onRowClick} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle row click without tree expand', async () => {
      const onRowClick = vi.fn();
      const treeConfig = { expandTreeNodeOnClick: false };
      const wrapper = mount(() => (
        <EnhancedTable data={treeData} columns={testColumns} rowKey="id" tree={treeConfig} onRowClick={onRowClick} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Data Validation', () => {
    it('should handle invalid tree data gracefully', async () => {
      const invalidTreeData = [
        {
          id: 1,
          name: 'Parent',
          age: 40,
          status: 'active',
          email: 'parent@example.com',
          children: 'invalid', // 应该是数组
        },
      ];
      const wrapper = mount(() => <EnhancedTable data={invalidTreeData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle tree data with missing properties', async () => {
      const incompleteData = [
        {
          id: 1,
          name: 'Parent',
          // 缺少 age, status, email
          children: [{ id: 11, name: 'Child' }],
        },
      ];
      const wrapper = mount(() => <EnhancedTable data={incompleteData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Tree Performance', () => {
    it('should handle large tree data', async () => {
      const largeTreeData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Node ${index + 1}`,
        age: 20 + (index % 50),
        status: index % 2 === 0 ? 'active' : 'inactive',
        email: `node${index + 1}@example.com`,
        children:
          index % 3 === 0
            ? [
                {
                  id: (index + 1) * 100,
                  name: `Child ${index + 1}`,
                  age: 15,
                  status: 'active',
                  email: `child${index + 1}@example.com`,
                },
              ]
            : undefined,
      }));
      const wrapper = mount(() => <EnhancedTable data={largeTreeData} columns={testColumns} rowKey="id" tree={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });
});
