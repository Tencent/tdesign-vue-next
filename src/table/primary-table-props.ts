/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPrimaryTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容 */
  asyncLoading: {
    type: [String, Function] as PropType<TdPrimaryTableProps['asyncLoading']>,
  },
  /** 自定义显示列控制器，值为空不会显示。具体属性请看下方 `TableColumnController` 文档 */
  columnController: {
    type: Object as PropType<TdPrimaryTableProps['columnController']>,
  },
  /** 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制 */
  columnControllerVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制，非受控属性 */
  defaultColumnControllerVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<TdPrimaryTableProps['columns']>,
    default: (): TdPrimaryTableProps['columns'] => [],
  },
  /** 列配置功能中，当前显示的列 */
  displayColumns: {
    type: Array as PropType<TdPrimaryTableProps['displayColumns']>,
    default: undefined,
  },
  /** 列配置功能中，当前显示的列，非受控属性 */
  defaultDisplayColumns: {
    type: Array as PropType<TdPrimaryTableProps['defaultDisplayColumns']>,
  },
  /** 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过专门的 拖拽手柄 进行 行拖拽排序。值为 `col` 表示列顺序拖拽。`drag-col` 已废弃，请勿使用 */
  dragSort: {
    type: String as PropType<TdPrimaryTableProps['dragSort']>,
    validator(val: TdPrimaryTableProps['dragSort']): boolean {
      if (!val) return true;
      return ['row', 'row-handler', 'col', 'drag-col'].includes(val);
    },
  },
  /** 拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable) */
  dragSortOptions: {
    type: Object as PropType<TdPrimaryTableProps['dragSortOptions']>,
  },
  /** 展开行内容，泛型 T 指表格数据类型 */
  expandedRow: {
    type: [String, Function] as PropType<TdPrimaryTableProps['expandedRow']>,
  },
  /** 展开行 */
  expandedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['expandedRowKeys']>,
    default: undefined,
  },
  /** 展开行，非受控属性 */
  defaultExpandedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['defaultExpandedRowKeys']>,
  },
  /** 用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider` */
  expandIcon: {
    type: [Boolean, Function] as PropType<TdPrimaryTableProps['expandIcon']>,
    default: true,
  },
  /** 是否允许点击行展开 */
  expandOnRowClick: Boolean,
  /** 自定义过滤图标，支持全局配置 `GlobalConfigProvider` */
  filterIcon: {
    type: Function as PropType<TdPrimaryTableProps['filterIcon']>,
  },
  /** 自定义过滤状态行及清空筛选等 */
  filterRow: {
    type: [String, Function] as PropType<TdPrimaryTableProps['filterRow']>,
  },
  /** 过滤数据的值 */
  filterValue: {
    type: Object as PropType<TdPrimaryTableProps['filterValue']>,
    default: undefined,
  },
  /** 过滤数据的值，非受控属性 */
  defaultFilterValue: {
    type: Object as PropType<TdPrimaryTableProps['defaultFilterValue']>,
  },
  /** 隐藏排序文本提示，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `false` */
  hideSortTips: Boolean,
  /** 半选状态行。选中行请更为使用 `selectedRowKeys` 控制 */
  indeterminateSelectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['indeterminateSelectedRowKeys']>,
  },
  /** 是否支持多列排序 */
  multipleSort: Boolean,
  /** 选中的行，控制属性。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制 */
  selectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['selectedRowKeys']>,
    default: undefined,
  },
  /** 选中的行，控制属性。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制，非受控属性 */
  defaultSelectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['defaultSelectedRowKeys']>,
  },
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序 */
  sort: {
    type: [Object, Array] as PropType<TdPrimaryTableProps['sort']>,
    default: undefined,
  },
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序，非受控属性 */
  defaultSort: {
    type: [Object, Array] as PropType<TdPrimaryTableProps['defaultSort']>,
  },
  /** 自定义排序图标，支持全局配置 `GlobalConfigProvider` */
  sortIcon: {
    type: Function as PropType<TdPrimaryTableProps['sortIcon']>,
  },
  /** 已废弃。允许表格行拖拽时排序。请更为使用 `dragSort="row"` */
  sortOnRowDraggable: Boolean,
  /** 异步加载区域被点击时触发 */
  onAsyncLoadingClick: Function as PropType<TdPrimaryTableProps['onAsyncLoadingClick']>,
  /** 单元格点击时触发 */
  onCellClick: Function as PropType<TdPrimaryTableProps['onCellClick']>,
  /** 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据 */
  onChange: Function as PropType<TdPrimaryTableProps['onChange']>,
  /** 确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列 */
  onColumnChange: Function as PropType<TdPrimaryTableProps['onColumnChange']>,
  /** 列配置弹窗显示或隐藏变化时触发 */
  onColumnControllerVisibleChange: Function as PropType<TdPrimaryTableProps['onColumnControllerVisibleChange']>,
  /** 本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源 */
  onDataChange: Function as PropType<TdPrimaryTableProps['onDataChange']>,
  /** 确认列配置时触发 */
  onDisplayColumnsChange: Function as PropType<TdPrimaryTableProps['onDisplayColumnsChange']>,
  /** 拖拽排序时触发，`data` 表示排序前的数据，`newData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发 */
  onDragSort: Function as PropType<TdPrimaryTableProps['onDragSort']>,
  /** 展开行发生变化时触发，泛型 T 指表格数据类型 */
  onExpandChange: Function as PropType<TdPrimaryTableProps['onExpandChange']>,
  /** 过滤参数发生变化时触发，泛型 T 指表格数据类型 */
  onFilterChange: Function as PropType<TdPrimaryTableProps['onFilterChange']>,
  /** 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据 */
  onSelectChange: Function as PropType<TdPrimaryTableProps['onSelectChange']>,
  /** 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序 */
  onSortChange: Function as PropType<TdPrimaryTableProps['onSortChange']>,
};
