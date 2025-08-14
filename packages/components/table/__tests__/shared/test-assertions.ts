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
