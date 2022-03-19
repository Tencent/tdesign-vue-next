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
  /** 【开发中】自定义显示列控制器，值为空不会显示。<br />`columnController.fields` 表示只允许用户对数组里面的列进行显示或隐藏的控制，默认为全部字段。<br />`columnController.displayType` 是指字段呈现方式：`fixed-width` 表示固定宽度，每行固定数量，横向和纵向均对齐，`auto-width` 表示宽度随列标题数量自由显示，横向铺满，纵向不要求对齐，默认为 `auto-width`。<br />支持透传 CheckboxGroup 和 Dialog 组件等全部属性 */
  columnController: {
    type: Object as PropType<TdPrimaryTableProps['columnController']>,
  },
  /** 【开发中】自定义显示列控制器的内容呈现，可以填充任意内容 */
  columnControllerContent: {
    type: [String, Function] as PropType<TdPrimaryTableProps['columnControllerContent']>,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<TdPrimaryTableProps['columns']>,
    default: (): TdPrimaryTableProps['columns'] => [],
  },
  /** 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`drag-col` 表示通过专门的 拖拽列 进行拖拽排序 */
  dragSort: {
    type: String as PropType<TdPrimaryTableProps['dragSort']>,
    default: 'drag-col' as TdPrimaryTableProps['dragSort'],
    validator(val: TdPrimaryTableProps['dragSort']): boolean {
      if (!val) return true;
      return ['row', 'drag-col'].includes(val);
    },
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
    default: (): TdPrimaryTableProps['defaultExpandedRowKeys'] => [],
  },
  /** 用于控制是否显示「展开图标列」，值为 false 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容，示例：`(h, { index }) => index === 0 ? false : <icon class='custom-icon' />`。expandedRow 存在时，该参数有效。支持全局配置 `GlobalConfigProvider` */
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
  /** 是否支持多列排序 */
  multipleSort: Boolean,
  /** 选中的行，控制属性 */
  selectedRowKeys: {
    type: Array as PropType<TdPrimaryTableProps['selectedRowKeys']>,
    default: undefined,
  },
  /** 选中的行，控制属性，非受控属性 */
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
  /** 已废弃。允许表格行拖拽时排序 */
  sortOnRowDraggable: Boolean,
  /** 异步加载区域被点击时触发 */
  onAsyncLoadingClick: Function as PropType<TdPrimaryTableProps['onAsyncLoadingClick']>,
  /** 单元格点击时触发 */
  onCellClick: Function as PropType<TdPrimaryTableProps['onCellClick']>,
  /** 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型 */
  onChange: Function as PropType<TdPrimaryTableProps['onChange']>,
  /** 【开发中】列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列 */
  onColumnChange: Function as PropType<TdPrimaryTableProps['onColumnChange']>,
  /** 表格数据发生变化时触发，比如：本地排序方法 sorter */
  onDataChange: Function as PropType<TdPrimaryTableProps['onDataChange']>,
  /** 拖拽排序时触发 */
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
