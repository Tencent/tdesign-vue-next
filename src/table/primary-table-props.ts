/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdPrimaryTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容 */
  asyncLoading: {
    type: [String, Function] as PropType<TdPrimaryTableProps['asyncLoading']>,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<TdPrimaryTableProps['columns']>,
    default: (): TdPrimaryTableProps['columns'] => [],
  },
  /** 展开行内容，泛型 T 指表格数据类型 */
  expandedRow: {
    type: Function as PropType<TdPrimaryTableProps['expandedRow']>,
  },
  /** 展开行 */
  expandedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['expandedRowKeys']>,
    default: (): TdPrimaryTableProps['expandedRowKeys'] => [],
  },
  /** 展开行，非受控属性 */
  defaultExpandedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['defaultExpandedRowKeys']>,
    default: (): TdPrimaryTableProps['defaultExpandedRowKeys'] => [],
  },
  /** 是否允许点击行展开 */
  expandOnRowClick: Boolean,
  /** 自定义过滤图标 */
  filterIcon: {
    type: Function as PropType<TdPrimaryTableProps['filterIcon']>,
  },
  /** 过滤数据的值 */
  filterValue: {
    type: Object as PropType<TdPrimaryTableProps['filterValue']>,
  },
  /** 过滤数据的值，非受控属性 */
  defaultFilterValue: {
    type: Object as PropType<TdPrimaryTableProps['defaultFilterValue']>,
  },
  /** 是否支持多列排序 */
  multipleSort: Boolean,
  /** 选中的行，控制属性 */
  selectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['selectedRowKeys']>,
  },
  /** 选中的行，控制属性，非受控属性 */
  defaultSelectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['defaultSelectedRowKeys']>,
  },
  /** 用于控制是否显示展开图标，支持自定义图标 */
  showExpandArrow: {
    type: [Boolean, Function] as PropType<TdPrimaryTableProps['showExpandArrow']>,
    default: true,
  },
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序 */
  sort: {
    type: [Object, Array] as PropType<TdPrimaryTableProps['sort']>,
  },
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序，非受控属性 */
  defaultSort: {
    type: [Object, Array] as PropType<TdPrimaryTableProps['defaultSort']>,
  },
  /** 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型 */
  onChange: Function as PropType<TdPrimaryTableProps['onChange']>,
  /** 展开行发生变化时触发，泛型 T 指表格数据类型 */
  onExpandChange: Function as PropType<TdPrimaryTableProps['onExpandChange']>,
  /** 过滤参数发生变化时触发，泛型 T 指表格数据类型 */
  onFilterChange: Function as PropType<TdPrimaryTableProps['onFilterChange']>,
  /** 选中行发生变化时触发，泛型 T 指表格数据类型 */
  onSelectChange: Function as PropType<TdPrimaryTableProps['onSelectChange']>,
  /** 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序 */
  onSortChange: Function as PropType<TdPrimaryTableProps['onSortChange']>,
};
