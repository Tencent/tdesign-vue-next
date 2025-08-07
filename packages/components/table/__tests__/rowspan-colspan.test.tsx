import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { BaseTable } from '../index';

// Mock data
const generateData = (count = 5) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i + 1,
      name: `Name ${i + 1}`,
      age: 20 + i,
      email: `name${i + 1}@test.com`,
      status: i % 2 === 0 ? 'active' : 'inactive',
    });
  }
  return result;
};

const columns = [
  { colKey: 'name', title: '姓名', width: 100 },
  { colKey: 'age', title: '年龄', width: 100 },
  { colKey: 'email', title: '邮箱', width: 200 },
  { colKey: 'status', title: '状态', width: 100 },
];

describe('Table - Rowspan and Colspan Tests', () => {
  it('should render cells with rowspan correctly', async () => {
    const rowspanAndColspanFunc = ({ row, col, rowIndex, colIndex }) => {
      if (rowIndex === 0 && colIndex === 0) {
        return { rowspan: 2 };
      }
      return {};
    };

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(),
        columns,
        rowKey: 'id',
        rowspanAndColspan: rowspanAndColspanFunc,
      },
    });

    await nextTick();

    // Check if the first cell has rowspan attribute
    const firstCell = wrapper.find('tbody tr:first-child td:first-child');
    expect(firstCell.attributes('rowspan')).toBe('2');

    // Check if the cell in the second row first column is not rendered
    const secondRowCells = wrapper.findAll('tbody tr:nth-child(2) td');
    expect(secondRowCells.length).toBe(3);
  });

  it('should render cells with colspan correctly', async () => {
    const rowspanAndColspanFunc = ({ row, col, rowIndex, colIndex }) => {
      if (rowIndex === 0 && colIndex === 0) {
        return { colspan: 2 };
      }
      return {};
    };

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(),
        columns,
        rowKey: 'id',
        rowspanAndColspan: rowspanAndColspanFunc,
      },
    });

    await nextTick();
    // Check if the first cell has colspan attribute
    const firstCell = wrapper.find('tbody tr:first-child td:first-child');
    expect(firstCell.attributes('colspan')).toBe('2');
    // Check if the cell in the first row second column is not rendered
    const firstRowCells = wrapper.findAll('tbody tr:first-child td');
    expect(firstRowCells.length).toBe(3);
  });

  it('should render cells with both rowspan and colspan correctly', async () => {
    const rowspanAndColspanFunc = ({ row, col, rowIndex, colIndex }) => {
      if (rowIndex === 0 && colIndex === 0) {
        return { rowspan: 2, colspan: 2 };
      }
      return {};
    };

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(),
        columns,
        rowKey: 'id',
        rowspanAndColspan: rowspanAndColspanFunc,
      },
    });

    await nextTick();

    // Check if the first cell has both rowspan and colspan attributes
    const firstCell = wrapper.find('tbody tr:first-child td:first-child');
    expect(firstCell.attributes('rowspan')).toBe('2');
    expect(firstCell.attributes('colspan')).toBe('2');
    // Check if the affected cells are not rendered 应该是看第一行只有3个td，第二行只有2个td
    const firstRowCells = wrapper.findAll('tbody tr:first-child td');
    expect(firstRowCells.length).toBe(3);
    const secondRowCells = wrapper.findAll('tbody tr:nth-child(2) td');
    expect(secondRowCells.length).toBe(2);
  });

  it('should handle rowspanAndColspan in footer', async () => {
    const rowspanAndColspanInFooterFunc = ({ row, col, rowIndex, colIndex }) => {
      if (rowIndex === 0 && colIndex === 0) {
        return { colspan: 2 };
      }
      return {};
    };

    const footData = [
      { id: 'foot1', name: 'Total', age: 100, email: '', status: '' },
      { id: 'foot2', name: 'Average', age: 25, email: '', status: '' },
    ];

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(),
        columns,
        rowKey: 'id',
        footData,
        rowspanAndColspanInFooter: rowspanAndColspanInFooterFunc,
      },
    });

    await nextTick();

    // Check if the footer exists
    const footer = wrapper.find('tfoot');
    expect(footer.exists()).toBe(true);

    // Check if the first cell in footer has colspan attribute
    const firstFooterCell = wrapper.find('tfoot tr:first-child td:first-child');
    expect(firstFooterCell.attributes('colspan')).toBe('2');
  });

  it('should handle complex rowspan and colspan patterns', async () => {
    const rowspanAndColspanFunc = ({ row, col, rowIndex, colIndex }) => {
      // Create a checkerboard pattern
      if ((rowIndex % 2 === 0 && colIndex % 2 === 0) || (rowIndex % 2 === 1 && colIndex % 2 === 1)) {
        return { rowspan: 2, colspan: 2 };
      }
      return {};
    };

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(6),
        columns,
        rowKey: 'id',
        rowspanAndColspan: rowspanAndColspanFunc,
      },
    });

    await nextTick();

    // The table should render without errors
    expect(wrapper.find('.t-table').exists()).toBe(true);
  });

  it('should handle invalid rowspan and colspan values', async () => {
    const rowspanAndColspanFunc = ({ row, col, rowIndex, colIndex }) => {
      if (rowIndex === 0 && colIndex === 0) {
        return { rowspan: -1, colspan: 0 }; // Invalid values
      }
      return {};
    };

    const wrapper = mount(BaseTable, {
      props: {
        data: generateData(),
        columns,
        rowKey: 'id',
        rowspanAndColspan: rowspanAndColspanFunc,
      },
    });

    await nextTick();

    // The table should render without errors
    expect(wrapper.find('.t-table').exists()).toBe(true);
  });
});
