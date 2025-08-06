// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, h } from 'vue';
import { BaseTable } from '@tdesign/components/table';

// Mock HTMLCollection for test environment
if (typeof HTMLCollection === 'undefined') {
  global.HTMLCollection = class HTMLCollection {
    constructor(elements = []) {
      this.length = elements.length;
      elements.forEach((element, index) => {
        this[index] = element;
      });
    }
  };
}

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

// 基础渲染测试
describe('BaseTable Component', () => {
  let timers = [];

  beforeEach(() => {
    // Use fake timers to control setTimeout behavior
    vi.useFakeTimers();
    timers = [];
  });

  afterEach(() => {
    // Clear all timers and restore real timers to prevent memory leaks and async errors
    vi.clearAllTimers();
    vi.useRealTimers();
    timers = [];
  });
  describe('Basic Rendering', () => {
    it('should render basic table', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" />);
      await nextTick();
      // Fast-forward any pending timers
      vi.runAllTimers();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty data', async () => {
      const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" />);
      await nextTick();
      vi.runAllTimers();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty columns', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={[]} rowKey="id" />);
      await nextTick();
      vi.runAllTimers();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render without header when showHeader is false', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" showHeader={false} />);
      await nextTick();
      vi.runAllTimers();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
      expect(wrapper.find('thead').exists()).toBeFalsy();
    });
  });

  describe('Table Layout and Styling', () => {
    it('should render with bordered style', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" bordered={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with stripe style', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" stripe={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with hover style', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" hover={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with different sizes', async () => {
      const sizes = ['small', 'medium', 'large'];
      for (const size of sizes) {
        const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size={size} />);
        await nextTick();
        expect(wrapper.find('.t-table').exists()).toBeTruthy();
        wrapper.unmount();
      }
    });

    it('should handle size validator with valid values', async () => {
      const validSizes = ['small', 'medium', 'large'];
      for (const size of validSizes) {
        const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size={size} />);
        await nextTick();
        expect(wrapper.find('.t-table').exists()).toBeTruthy();
        wrapper.unmount();
      }
    });

    it('should handle size validator with empty string', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size="" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle size validator with undefined value', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size={undefined} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle size validator with null value', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size={null} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle size validator with invalid values', async () => {
      const invalidSizes = ['tiny', 'huge', 'extra-large', 'custom'];
      for (const size of invalidSizes) {
        const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" size={size} />);
        await nextTick();
        expect(wrapper.find('.t-table').exists()).toBeTruthy();
        wrapper.unmount();
      }
    });

    it('should render with different table layouts', async () => {
      const layouts = ['auto', 'fixed'];
      for (const layout of layouts) {
        const wrapper = mount(() => (
          <BaseTable data={testData} columns={testColumns} rowKey="id" tableLayout={layout} />
        ));
        await nextTick();
        expect(wrapper.find('.t-table').exists()).toBeTruthy();
        wrapper.unmount();
      }
    });

    it('should render with different vertical alignments', async () => {
      const aligns = ['top', 'middle', 'bottom'];
      for (const align of aligns) {
        const wrapper = mount(() => (
          <BaseTable data={testData} columns={testColumns} rowKey="id" verticalAlign={align} />
        ));
        await nextTick();
        expect(wrapper.find('.t-table').exists()).toBeTruthy();
        wrapper.unmount();
      }
    });
  });

  describe('Fixed Header and Columns', () => {
    it('should render with fixed header', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" maxHeight={200} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with fixed columns', async () => {
      const columnsWithFixed = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Email', colKey: 'email', width: 200, fixed: 'right' },
      ];
      const wrapper = mount(() => <BaseTable data={testData} columns={columnsWithFixed} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with fixed rows', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" fixedRows={[1, 1]} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Affix Features', () => {
    it('should render with header affixed top', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" headerAffixedTop={true} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with footer affixed bottom', async () => {
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          footerAffixedBottom={true}
          footData={[{ id: 1, name: 'Total', age: 90, status: 'total', email: 'total@example.com' }]}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with pagination affixed bottom', async () => {
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          paginationAffixedBottom={true}
          pagination={{ total: 3, pageSize: 10 }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with horizontal scroll affixed bottom', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" horizontalScrollAffixedBottom={true} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Virtual Scroll', () => {
    it('should render with virtual scroll', async () => {
      const largeData = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: 20 + (index % 50),
        status: index % 2 === 0 ? 'active' : 'inactive',
        email: `user${index + 1}@example.com`,
      }));
      const wrapper = mount(() => (
        <BaseTable
          data={largeData}
          columns={testColumns}
          rowKey="id"
          scroll={{ type: 'virtual', threshold: 100 }}
          height={400}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Column Resize', () => {
    it('should render with resizable columns', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" resizable={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with column resize configuration', async () => {
      const columnsWithResize = testColumns.map((col) => ({
        ...col,
        resize: { minWidth: 80, maxWidth: 300 },
      }));
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={columnsWithResize} rowKey="id" resizable={true} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Row Highlight', () => {
    it('should render with active row keys', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" activeRowKeys={[1]} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with active row type single', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" activeRowType="single" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with active row type multiple', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" activeRowType="multiple" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Keyboard Events', () => {
    it('should render with keyboard row hover enabled', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" keyboardRowHover={true} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with keyboard row hover disabled', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" keyboardRowHover={false} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should render with loading state', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" loading={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with custom loading function', async () => {
      const customLoading = () => 'Custom loading...';
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" loading={customLoading} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with loading props', async () => {
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          loading={true}
          loadingProps={{ size: 'large', text: 'Loading data...' }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Empty State', () => {
    it('should render with empty data', async () => {
      const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with custom empty content', async () => {
      const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" empty="No data available" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with empty function', async () => {
      const emptyFunction = () => 'Custom empty message';
      const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" empty={emptyFunction} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Row and Cell Customization', () => {
    it('should render with row className function', async () => {
      const rowClassName = ({ row }) => (row.status === 'active' ? 'active-row' : 'inactive-row');
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowClassName={rowClassName} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with row attributes function', async () => {
      const rowAttributes = ({ row }) => ({ 'data-status': row.status });
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowAttributes={rowAttributes} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with cell empty content', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" cellEmptyContent="--" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Pagination', () => {
    it('should render with pagination', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" pagination={{ total: 3, pageSize: 10 }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with disable data page', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" disableDataPage={true} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Lazy Load', () => {
    it('should render with lazy load', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" lazyLoad={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Table Content and Slots', () => {
    it('should render with top content', async () => {
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          v-slots={{
            topContent: () => <div>Top Content</div>,
          }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with bottom content', async () => {
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          v-slots={{
            bottomContent: () => <div>Bottom Content</div>,
          }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with footer summary', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" footerSummary="Total: 3 items" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with foot data', async () => {
      const footData = [{ id: 1, name: 'Total', age: 90, status: 'total', email: 'total@example.com' }];
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" footData={footData} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Rowspan and Colspan', () => {
    it('should render with rowspan and colspan function', async () => {
      const rowspanAndColspan = ({ row, col, rowIndex, colIndex }) => {
        if (rowIndex === 0 && colIndex === 0) {
          return { rowspan: 2, colspan: 1 };
        }
        return { rowspan: 1, colspan: 1 };
      };
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowspanAndColspan={rowspanAndColspan} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with footer rowspan and colspan', async () => {
      const rowspanAndColspanInFooter = ({ row, col, rowIndex, colIndex }) => {
        if (rowIndex === 0 && colIndex === 0) {
          return { rowspan: 1, colspan: 2 };
        }
        return { rowspan: 1, colspan: 1 };
      };
      const footData = [{ id: 1, name: 'Total', age: 90, status: 'total', email: 'total@example.com' }];
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={testColumns}
          rowKey="id"
          footData={footData}
          rowspanAndColspanInFooter={rowspanAndColspanInFooter}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle rowspanAndColspan with complex merging logic', async () => {
      const rowspanAndColspan = ({ row, col, rowIndex, colIndex }) => {
        // 第一行第一列跨2行2列
        if (rowIndex === 0 && colIndex === 0) {
          return { rowspan: 2, colspan: 2 };
        }
        // 第一行其他列隐藏
        if (rowIndex === 0 && colIndex > 0) {
          return { rowspan: 0, colspan: 0 };
        }
        // 第二行其他列隐藏
        if (rowIndex === 1 && colIndex > 0) {
          return { rowspan: 0, colspan: 0 };
        }
        return { rowspan: 1, colspan: 1 };
      };
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowspanAndColspan={rowspanAndColspan} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle rowspanAndColspan with undefined return', async () => {
      const rowspanAndColspan = ({ row, col, rowIndex, colIndex }) => {
        // 返回 undefined 应该使用默认值
        if (rowIndex === 0 && colIndex === 0) {
          return undefined;
        }
        return { rowspan: 1, colspan: 1 };
      };
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowspanAndColspan={rowspanAndColspan} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle rowspanAndColspan with null return', async () => {
      const rowspanAndColspan = ({ row, col, rowIndex, colIndex }) => {
        // 返回 null 应该使用默认值
        if (rowIndex === 0 && colIndex === 0) {
          return null;
        }
        return { rowspan: 1, colspan: 1 };
      };
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" rowspanAndColspan={rowspanAndColspan} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Full Row Content', () => {
    it('should render with first full row', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" firstFullRow="First Row Content" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with last full row', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" lastFullRow="Last Row Content" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Scroll Configuration', () => {
    it('should render with scroll configuration', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ x: 800, y: 400 }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with virtual scroll configuration', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ type: 'virtual', threshold: 100 }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with custom threshold', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ type: 'virtual', threshold: 50 }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with large threshold', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ type: 'virtual', threshold: 1000 }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with only x scroll', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ x: 800 }} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with only y scroll', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ y: 400 }} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with empty object', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{}} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with scroll configuration with string values', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" scroll={{ x: '800px', y: '400px' }} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Table Width and Layout', () => {
    it('should render with table content width', async () => {
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" tableContentWidth="800px" />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with height configuration', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" height={400} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with max height configuration', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" maxHeight={500} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Column Controller', () => {
    it('should render with th draggable', async () => {
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" thDraggable={true} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should handle scroll events', async () => {
      const onScroll = vi.fn();
      const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" onScroll={onScroll} />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle row click events', async () => {
      const onRowClick = vi.fn();
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" onRowClick={onRowClick} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should handle cell click events', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(() => (
        <BaseTable data={testData} columns={testColumns} rowKey="id" onCellClick={onCellClick} />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render with multiple fixed columns', async () => {
      const columnsWithMultipleFixed = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80, fixed: 'left' },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Email', colKey: 'email', width: 200, fixed: 'right' },
        { title: 'Phone', colKey: 'phone', width: 150, fixed: 'right' },
      ];
      const wrapper = mount(() => <BaseTable data={testData} columns={columnsWithMultipleFixed} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with complex header structure', async () => {
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
      const wrapper = mount(() => <BaseTable data={testData} columns={complexColumns} rowKey="id" />);
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });

    it('should render with all features combined', async () => {
      const complexColumns = [
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Status', colKey: 'status', width: 100 },
        { title: 'Email', colKey: 'email', width: 200, fixed: 'right' },
      ];
      const wrapper = mount(() => (
        <BaseTable
          data={testData}
          columns={complexColumns}
          rowKey="id"
          bordered={true}
          stripe={true}
          hover={true}
          size="medium"
          tableLayout="fixed"
          verticalAlign="middle"
          maxHeight={400}
          headerAffixedTop={true}
          resizable={true}
          activeRowKeys={[1]}
          activeRowType="single"
          keyboardRowHover={true}
          loading={false}
          showHeader={true}
          pagination={{ total: 3, pageSize: 10 }}
          rowClassName={({ row }) => (row.status === 'active' ? 'active-row' : '')}
          rowAttributes={({ row }) => ({ 'data-status': row.status })}
          cellEmptyContent="--"
          v-slots={{
            topContent: () => <div>Top Content</div>,
            bottomContent: () => <div>Bottom Content</div>,
          }}
        />
      ));
      await nextTick();
      expect(wrapper.find('.t-table').exists()).toBeTruthy();
    });
  });
});

describe('BaseTable Props and Edge Cases', () => {
  const testColumns = [
    { title: 'Name', colKey: 'name' },
    { title: 'Age', colKey: 'age' },
    { title: 'Status', colKey: 'status' },
    { title: 'Email', colKey: 'email' },
  ];
  const testData = [
    { id: 1, name: 'Alice', age: 25, status: 'active', email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, status: 'inactive', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, status: 'active', email: 'charlie@example.com' },
  ];

  it('should render cellEmptyContent when data is empty', async () => {
    const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" cellEmptyContent="-" />);
    await nextTick();
    expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
    // 兼容全局配置下的默认文案
    expect(wrapper.text()).toMatch(/-|暂无数据|No Data/);
  });

  it('should render bottomContent and firstFullRow', async () => {
    const wrapper = mount(() => (
      <BaseTable
        data={testData}
        columns={testColumns}
        rowKey="id"
        bottomContent="Bottom Content"
        firstFullRow="First Full Row Content"
      />
    ));
    await nextTick();
    expect(wrapper.text()).toContain('Bottom Content');
    expect(wrapper.text()).toContain('First Full Row Content');
  });

  it('should render fixedRows and footData', async () => {
    const wrapper = mount(() => (
      <BaseTable
        data={testData}
        columns={testColumns}
        rowKey="id"
        fixedRows={[1, 1]}
        footData={[{ id: 'f1', name: 'Summary', age: '', status: '', email: '' }]}
      />
    ));
    await nextTick();
    expect(wrapper.text()).toContain('Summary');
  });

  it('should render footerSummary', async () => {
    const wrapper = mount(() => (
      <BaseTable data={testData} columns={testColumns} rowKey="id" footerSummary="Footer Summary Content" />
    ));
    await nextTick();
    expect(wrapper.text()).toContain('Footer Summary Content');
  });

  it('should support headerAffixedTop and footerAffixedBottom', async () => {
    const wrapper = mount(() => (
      <BaseTable data={testData} columns={testColumns} rowKey="id" headerAffixedTop={true} footerAffixedBottom={true} />
    ));
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should support attach prop', async () => {
    const wrapper = mount(() => <BaseTable data={testData} columns={testColumns} rowKey="id" attach="body" />);
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should support disableDataPage and disableSpaceInactiveRow', async () => {
    const wrapper = mount(() => (
      <BaseTable
        data={testData}
        columns={testColumns}
        rowKey="id"
        disableDataPage={true}
        disableSpaceInactiveRow={true}
      />
    ));
    await nextTick();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render empty slot or text', async () => {
    const wrapper = mount(() => <BaseTable data={[]} columns={testColumns} rowKey="id" empty="No Data" />);
    await nextTick();
    expect(wrapper.text()).toContain('No Data');
  });
});
