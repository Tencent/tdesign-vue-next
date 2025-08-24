/**
 * 表格组件测试工具库
 * 提供统一的测试数据、工具函数和断言方法
 */

import { VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { TdPrimaryTableProps } from '@tdesign/components/table';

// 标准测试数据
export const mockData = [
  {
    id: 1,
    name: 'Alice Johnson',
    age: 25,
    email: 'alice@example.com',
    status: 'active',
    department: 'Engineering',
    salary: 75000,
    joinDate: '2022-01-15',
    active: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    age: 30,
    email: 'bob@example.com',
    status: 'inactive',
    department: 'Marketing',
    salary: 65000,
    joinDate: '2021-03-20',
    active: false,
  },
  {
    id: 3,
    name: 'Charlie Brown',
    age: 35,
    email: 'charlie@example.com',
    status: 'active',
    department: 'Engineering',
    salary: 85000,
    joinDate: '2020-05-10',
    active: true,
  },
  {
    id: 4,
    name: 'Diana Prince',
    age: 28,
    email: 'diana@example.com',
    status: 'active',
    department: 'Design',
    salary: 70000,
    joinDate: '2022-07-01',
    active: true,
  },
  {
    id: 5,
    name: 'Edward Wilson',
    age: 42,
    email: 'edward@example.com',
    status: 'inactive',
    department: 'Sales',
    salary: 60000,
    joinDate: '2019-11-12',
    active: false,
  },
];

// 基础列配置
export const basicColumns = [
  { title: 'ID', colKey: 'id', width: 80 },
  { title: 'Name', colKey: 'name', width: 150 },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Email', colKey: 'email', width: 200 },
  { title: 'Status', colKey: 'status', width: 100 },
];

// 带选择列的列配置
export const selectableColumns = [
  { colKey: 'row-select', type: 'multiple' as const, width: 60 },
  { title: 'ID', colKey: 'id', width: 80 },
  { title: 'Name', colKey: 'name', width: 150 },
  { title: 'Age', colKey: 'age', width: 80 },
];

// 带排序的列配置
export const sortableColumns = [
  { title: 'ID', colKey: 'id', width: 80, sorter: true },
  { title: 'Name', colKey: 'name', width: 150, sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
  { title: 'Age', colKey: 'age', width: 80, sorter: true },
  { title: 'Email', colKey: 'email', width: 200 },
  { title: 'Status', colKey: 'status', width: 100 },
];

// 带过滤的列配置
export const filterableColumns: TdPrimaryTableProps['columns'] = [
  { title: 'ID', colKey: 'id', width: 80 },
  { title: 'Name', colKey: 'name', width: 150 },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Email', colKey: 'email', width: 200 },
  {
    title: 'Status',
    colKey: 'status',
    width: 100,
    filter: {
      type: 'single',
      list: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  },
  {
    title: 'Department',
    colKey: 'department',
    width: 120,
    filter: {
      type: 'multiple',
      list: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Design', value: 'Design' },
        { label: 'Sales', value: 'Sales' },
      ],
    },
  },
];

// 固定列配置
export const fixedColumns = [
  { title: 'ID', colKey: 'id', width: 80, fixed: 'left' },
  { title: 'Name', colKey: 'name', width: 150, fixed: 'left' },
  { title: 'Age', colKey: 'age', width: 80 },
  { title: 'Email', colKey: 'email', width: 200 },
  { title: 'Status', colKey: 'status', width: 100 },
  { title: 'Actions', colKey: 'actions', width: 120, fixed: 'right' },
];

// 树形数据
export const treeData = [
  {
    id: 1,
    name: 'Parent 1',
    age: 40,
    email: 'parent1@example.com',
    status: 'active',
    department: 'Management',
    children: [
      { id: 11, name: 'Child 1-1', age: 20, email: 'child11@example.com', status: 'active', department: 'Engineering' },
      { id: 12, name: 'Child 1-2', age: 22, email: 'child12@example.com', status: 'inactive', department: 'Design' },
    ],
  },
  {
    id: 2,
    name: 'Parent 2',
    age: 45,
    email: 'parent2@example.com',
    status: 'inactive',
    department: 'Management',
    children: [
      { id: 21, name: 'Child 2-1', age: 25, email: 'child21@example.com', status: 'active', department: 'Marketing' },
      { id: 22, name: 'Child 2-2', age: 27, email: 'child22@example.com', status: 'active', department: 'Sales' },
    ],
  },
];

// 大数据集（用于分页和虚拟滚动测试）
export const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 50),
  email: `user${index + 1}@example.com`,
  status: index % 3 === 0 ? 'active' : index % 3 === 1 ? 'inactive' : 'pending',
  department: ['Engineering', 'Marketing', 'Design', 'Sales'][index % 4],
  salary: 50000 + (index % 50) * 1000,
  joinDate: `2020-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
}));

/**
 * 等待异步渲染完成
 */
export async function waitForRender(wrapper?: VueWrapper<any>, timeout = 100): Promise<void> {
  await nextTick();
  if (wrapper) {
    await wrapper.vm.$nextTick();
  }
  // 额外等待确保DOM更新完成
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

/**
 * 检查表格基本结构
 */
export function expectTableStructure(wrapper: VueWrapper<any>) {
  expect(wrapper.find('.t-table').exists()).toBeTruthy();
  expect(wrapper.find('table').exists()).toBeTruthy();
  expect(wrapper.find('thead').exists()).toBeTruthy();
  expect(wrapper.find('tbody').exists()).toBeTruthy();
}

/**
 * 检查表格数据行数
 */
export function expectTableRows(wrapper: VueWrapper<any>, expectedRowCount: number) {
  const rows = wrapper.findAll('tbody tr');
  expect(rows).toHaveLength(expectedRowCount);
}

/**
 * 检查表格列数
 */
export function expectTableColumns(wrapper: VueWrapper<any>, expectedColumnCount: number) {
  const headerCells = wrapper.findAll('thead th');
  expect(headerCells).toHaveLength(expectedColumnCount);
}

/**
 * 检查单元格内容
 */
export function expectCellContent(
  wrapper: VueWrapper<any>,
  rowIndex: number,
  columnIndex: number,
  expectedContent: string,
) {
  const rows = wrapper.findAll('tbody tr');
  expect(rows[rowIndex]).toBeTruthy();

  const cells = rows[rowIndex].findAll('td');
  expect(cells[columnIndex]).toBeTruthy();
  expect(cells[columnIndex].text()).toContain(expectedContent);
}

/**
 * 检查CSS类名
 */
export function expectHasClass(wrapper: VueWrapper<any>, className: string) {
  expect(wrapper.classes()).toContain(className);
}

/**
 * 检查样式属性
 */
export function expectHasStyle(wrapper: VueWrapper<any>, property: string, value: string) {
  const element = wrapper.element as HTMLElement;
  expect(element.style.getPropertyValue(property)).toBe(value);
}

/**
 * 模拟表格滚动
 */
export async function simulateScroll(wrapper: VueWrapper<any>, scrollLeft = 0, scrollTop = 0) {
  const scrollElement = wrapper.find('.t-table__content');
  if (scrollElement.exists()) {
    const element = scrollElement.element as HTMLElement;
    element.scrollLeft = scrollLeft;
    element.scrollTop = scrollTop;

    // 触发滚动事件
    await scrollElement.trigger('scroll');
    await waitForRender(wrapper);
  }
}

/**
 * 模拟点击表格行
 */
export async function clickTableRow(wrapper: VueWrapper<any>, rowIndex: number) {
  const rows = wrapper.findAll('tbody tr');
  expect(rows[rowIndex]).toBeTruthy();

  await rows[rowIndex].trigger('click');
  await waitForRender(wrapper);
}

/**
 * 模拟点击表格单元格
 */
export async function clickTableCell(wrapper: VueWrapper<any>, rowIndex: number, columnIndex: number) {
  const rows = wrapper.findAll('tbody tr');
  expect(rows[rowIndex]).toBeTruthy();

  const cells = rows[rowIndex].findAll('td');
  expect(cells[columnIndex]).toBeTruthy();

  await cells[columnIndex].trigger('click');
  await waitForRender(wrapper);
}

/**
 * 模拟点击排序图标
 */
export async function clickSortIcon(wrapper: VueWrapper<any>, columnIndex: number) {
  const headers = wrapper.findAll('thead th');
  expect(headers[columnIndex]).toBeTruthy();

  // 尝试多种可能的排序图标选择器
  const selectors = [
    '.t-table__sort-icon',
    '.t-table__cell--sort-trigger .t-table__sort-icon',
    '.t-table__cell--sort-trigger',
    '[class*="sort-icon"]',
    '.t-table-sort-asc',
    '.t-table-sort-desc',
  ];

  let sortIcon;
  for (const selector of selectors) {
    sortIcon = headers[columnIndex].find(selector);
    if (sortIcon.exists()) {
      // console.log(`找到排序图标，使用选择器: ${selector}`);
      break;
    }
  }

  if (sortIcon && sortIcon.exists()) {
    await sortIcon.trigger('click');
    await waitForRender(wrapper);
  } else {
    // 如果找不到排序图标，直接点击表头单元格
    // console.warn(`排序图标未找到，尝试点击表头单元格，列索引: ${columnIndex}`);
    await headers[columnIndex].trigger('click');
    await waitForRender(wrapper);
  }
}

/**
 * 模拟键盘事件
 */
export async function simulateKeyboard(wrapper: VueWrapper<any>, key: string, options: any = {}) {
  await wrapper.trigger('keydown', { key, ...options });
  await waitForRender(wrapper);
}

/**
 * 检查分页组件
 */
export function expectPaginationExists(wrapper: VueWrapper<any>) {
  expect(wrapper.find('.t-pagination').exists()).toBeTruthy();
}

/**
 * 检查加载状态
 */
export function expectLoadingState(wrapper: VueWrapper<any>, isLoading = true) {
  const loadingElement = wrapper.find('.t-loading');
  if (isLoading) {
    expect(loadingElement.exists()).toBeTruthy();
  } else {
    expect(loadingElement.exists()).toBeFalsy();
  }
}

/**
 * 检查空状态
 */
export function expectEmptyState(wrapper: VueWrapper<any>, expectedText?: string) {
  const emptyElement = wrapper.find('.t-table__empty');
  expect(emptyElement.exists()).toBeTruthy();

  if (expectedText) {
    expect(emptyElement.text()).toContain(expectedText);
  }
}

/**
 * 检查选中行
 */
export function expectSelectedRows(wrapper: VueWrapper<any>, selectedRowCount: number) {
  const selectedRows = wrapper.findAll('tbody tr.t-table__row--selected');
  expect(selectedRows).toHaveLength(selectedRowCount);
}

/**
 * 获取表格数据（从DOM解析）
 */
export function getTableData(wrapper: VueWrapper<any>): string[][] {
  const rows = wrapper.findAll('tbody tr');
  return rows.map((row) => {
    const cells = row.findAll('td');
    return cells.map((cell) => cell.text().trim());
  });
}

// 重新导出常量
export { ADVANCED_COMPONENTS } from './test-constants';

// 重新导出断言函数
export {
  expectSortIcons,
  expectFilterIcons,
  expectEventTriggered,
  expectCheckboxes,
  expectDragHandles,
} from './test-assertions';
