/**
 * 表格组件测试常量
 * 提供测试中使用的常量和配置
 */

import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components/table';

// 支持高级功能的表格组件
export const ADVANCED_COMPONENTS = [
  // { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

// 所有表格组件类型
export const TABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'BaseTable', component: BaseTable },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

// 支持过滤的表格组件
export const FILTERABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

// 支持排序的表格组件
export const SORTABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

// 支持选择的表格组件
export const SELECTABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];

// 支持分页的表格组件
export const PAGINABLE_COMPONENTS = [
  { name: 'Table', component: Table },
  { name: 'PrimaryTable', component: PrimaryTable },
  { name: 'EnhancedTable', component: EnhancedTable },
];
