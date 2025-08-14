/**
 * 表格组件测试断言函数
 * 提供统一的断言方法来验证表格组件的各种状态
 */

import { VueWrapper } from '@vue/test-utils';

// 验证排序图标
export const expectSortIcons = (wrapper: VueWrapper<any>) => {
  const sortIcons = wrapper.findAll('.t-table__sort-icon');
  expect(sortIcons.length).toBeGreaterThan(0);
};

// 验证筛选图标
export const expectFilterIcons = (wrapper: VueWrapper<any>) => {
  const filterIcons = wrapper.findAll('.t-table__filter-icon');
  expect(filterIcons.length).toBeGreaterThan(0);
};

// 验证事件被触发
export const expectEventTriggered = (mockFn: any, times = 1) => {
  expect(mockFn).toHaveBeenCalledTimes(times);
};

// 验证事件参数
export const expectEventParams = (mockFn: any, expectedParams: any) => {
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(expectedParams));
};

// 验证选择框
export const expectCheckboxes = (wrapper: VueWrapper<any>) => {
  const checkboxes = wrapper.findAll('.t-checkbox');
  expect(checkboxes.length).toBeGreaterThan(0);
};

// 验证拖拽手柄
export const expectDragHandles = (wrapper: VueWrapper<any>) => {
  // 实际的拖拽功能使用的是不同的类名
  // 对于 row-handler 模式，需要检查拖拽手柄列
  const dragHandles = wrapper.findAll('.t-table__handle-draggable');
  if (dragHandles.length === 0) {
    // 对于 row 模式，检查表格是否可拖拽
    expect(wrapper.classes()).toContain('t-table--row-draggable');
  } else {
    expect(dragHandles.length).toBeGreaterThan(0);
  }
};

// 验证调整手柄
export const expectResizeHandles = (wrapper: VueWrapper<any>) => {
  // 实际的resize功能是通过表格级别的类名和表头单元格的事件监听器实现的
  // 没有专门的resize手柄元素
  expect(wrapper.classes()).toContain('t-table--column-resizable');
};

// 验证树形图标
export const expectTreeIcons = (wrapper: VueWrapper<any>) => {
  const treeIcons = wrapper.findAll('.t-table__tree-icon');
  expect(treeIcons.length).toBeGreaterThan(0);
};

// 验证列控制器
export const expectColumnController = (wrapper: VueWrapper<any>) => {
  const columnController = wrapper.find('.t-table__column-controller');
  expect(columnController.exists()).toBeTruthy();
};

// 验证异步加载
export const expectAsyncLoading = (wrapper: VueWrapper<any>) => {
  const loadingElement = wrapper.find('.t-table__async-loading');
  expect(loadingElement.exists()).toBeTruthy();
};

// 验证分页组件
export const expectPagination = (wrapper: VueWrapper<any>) => {
  const pagination = wrapper.find('.t-pagination');
  expect(pagination.exists()).toBeTruthy();
};

// 验证分页按钮
export const expectPaginationButtons = (wrapper: VueWrapper<any>) => {
  const prevButton = wrapper.find('.t-pagination__btn--prev');
  const nextButton = wrapper.find('.t-pagination__btn--next');
  expect(prevButton.exists()).toBeTruthy();
  expect(nextButton.exists()).toBeTruthy();
};

// 验证分页信息
export const expectPaginationInfo = (wrapper: VueWrapper<any>, expectedText: string) => {
  const paginationInfo = wrapper.find('.t-pagination__total');
  expect(paginationInfo.exists()).toBeTruthy();
  expect(paginationInfo.text()).toContain(expectedText);
};

// 验证表格尺寸
export const expectTableSize = (wrapper: VueWrapper<any>, size: string) => {
  const table = wrapper.find('.t-table');
  expect(table.classes()).toContain(`t-table--size-${size}`);
};

// 验证表格主题
export const expectTableTheme = (wrapper: VueWrapper<any>, theme: string) => {
  const table = wrapper.find('.t-table');
  expect(table.classes()).toContain(`t-table--${theme}`);
};

// 验证表格边框
export const expectTableBordered = (wrapper: VueWrapper<any>, bordered: boolean) => {
  const table = wrapper.find('.t-table');
  if (bordered) {
    expect(table.classes()).toContain('t-table--bordered');
  } else {
    expect(table.classes()).not.toContain('t-table--bordered');
  }
};

// 验证表格条纹
export const expectTableStriped = (wrapper: VueWrapper<any>, striped: boolean) => {
  const table = wrapper.find('.t-table');
  if (striped) {
    expect(table.classes()).toContain('t-table--striped');
  } else {
    expect(table.classes()).not.toContain('t-table--striped');
  }
};

// 验证表格悬停
export const expectTableHover = (wrapper: VueWrapper<any>, hover: boolean) => {
  const table = wrapper.find('.t-table');
  if (hover) {
    expect(table.classes()).toContain('t-table--hoverable');
  } else {
    expect(table.classes()).not.toContain('t-table--hoverable');
  }
};

// 验证表格加载
export const expectTableLoading = (wrapper: VueWrapper<any>, loading: boolean) => {
  if (loading) {
    expect(wrapper.find('.t-table__loading').exists()).toBeTruthy();
  } else {
    expect(wrapper.find('.t-table__loading').exists()).toBeFalsy();
  }
};

// 验证表格空状态
export const expectTableEmpty = (wrapper: VueWrapper<any>, empty: boolean) => {
  if (empty) {
    expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
  } else {
    expect(wrapper.find('.t-table__empty').exists()).toBeFalsy();
  }
};

// 验证表格滚动
export const expectTableScroll = (wrapper: VueWrapper<any>, scroll: any) => {
  if (scroll) {
    const scrollContainer = wrapper.find('.t-table__content');
    expect(scrollContainer.exists()).toBeTruthy();
  }
};

// 验证表格固定
export const expectTableFixed = (wrapper: VueWrapper<any>, fixed: boolean) => {
  if (fixed) {
    const fixedHeader = wrapper.find('.t-table__header--fixed');
    expect(fixedHeader.exists()).toBeTruthy();
  }
};

// 验证表格选择
export const expectTableSelection = (wrapper: VueWrapper<any>, selection: boolean) => {
  if (selection) {
    const checkboxes = wrapper.findAll('.t-table__checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  }
};

// 验证表格排序
export const expectTableSort = (wrapper: VueWrapper<any>, sort: boolean) => {
  if (sort) {
    const sortIcons = wrapper.findAll('.t-table__sort-icon');
    expect(sortIcons.length).toBeGreaterThan(0);
  }
};

// 验证表格筛选
export const expectTableFilter = (wrapper: VueWrapper<any>, filter: boolean) => {
  if (filter) {
    const filterIcons = wrapper.findAll('.t-table__filter-icon');
    expect(filterIcons.length).toBeGreaterThan(0);
  }
};

// 验证表格展开
export const expectTableExpand = (wrapper: VueWrapper<any>, expand: boolean) => {
  if (expand) {
    const expandIcons = wrapper.findAll('.t-table__expand-box');
    expect(expandIcons.length).toBeGreaterThan(0);
  }
};

// 验证表格拖拽
export const expectTableDrag = (wrapper: VueWrapper<any>, drag: boolean) => {
  if (drag) {
    // 实际的拖拽功能使用的是不同的类名
    const dragHandles = wrapper.findAll('.t-table__handle-draggable');
    if (dragHandles.length === 0) {
      // 对于 row 模式，检查表格是否可拖拽
      expect(wrapper.classes()).toContain('t-table--row-draggable');
    } else {
      expect(dragHandles.length).toBeGreaterThan(0);
    }
  }
};

// 验证表格调整
export const expectTableResize = (wrapper: VueWrapper<any>, resize: boolean) => {
  if (resize) {
    // 实际的resize功能是通过表格级别的类名实现的
    expect(wrapper.classes()).toContain('t-table--column-resizable');
  }
};

// 验证表格树形
export const expectTableTree = (wrapper: VueWrapper<any>, tree: boolean) => {
  if (tree) {
    const treeIcons = wrapper.findAll('.t-table__tree-icon');
    expect(treeIcons.length).toBeGreaterThan(0);
  }
};

// 验证表格控制器
export const expectTableController = (wrapper: VueWrapper<any>, controller: boolean) => {
  if (controller) {
    const columnController = wrapper.find('.t-table__column-controller');
    expect(columnController.exists()).toBeTruthy();
  }
};

// 验证表格异步加载
export const expectTableAsyncLoading = (wrapper: VueWrapper<any>, asyncLoading: boolean) => {
  if (asyncLoading) {
    const loadingElement = wrapper.find('.t-table__async-loading');
    expect(loadingElement.exists()).toBeTruthy();
  }
};
