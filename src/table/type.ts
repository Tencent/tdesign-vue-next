/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { AffixProps } from '../affix';
import { LoadingProps } from '../loading';
import { PaginationProps, PageInfo } from '../pagination';
import { PopupProps } from '../popup';
import { CheckboxGroupValue } from '../checkbox';
import { SortableEvent, SortableOptions } from 'sortablejs';
import { CheckboxProps } from '../checkbox';
import { RadioProps } from '../radio';
import { InputProps } from '../input';
import { ButtonProps } from '../button';
import { CheckboxGroupProps } from '../checkbox';
import { DialogProps } from '../dialog';
import { FormRule } from '../form';
import { TNode, OptionData, SizeEnum, ClassName, HTMLElementAttributes, ComponentType } from '../common';

export interface TdBaseTableProps<T extends TableRowData = TableRowData> {
  /**
   * 是否允许调整列宽
   * @default false
   */
  allowResizeColumnWidth?: boolean;
  /**
   * 是否显示表格边框
   * @default false
   */
  bordered?: boolean;
  /**
   * 表格底部内容，可以用于自定义列设置等
   */
  bottomContent?: string | TNode;
  /**
   * 列配置，泛型 T 指表格数据类型
   * @default []
   */
  columns?: Array<BaseTableCol<T>>;
  /**
   * 数据源，泛型 T 指表格数据类型
   * @default []
   */
  data?: Array<T>;
  /**
   * 是否禁用本地数据分页。当 `data` 数据长度超过分页大小时，会自动进行本地数据分页。如果 `disableDataPage` 设置为 true，则无论何时，都不会进行本地数据分页
   * @default false
   */
  disableDataPage?: boolean;
  /**
   * 空表格呈现样式，支持全局配置 `GlobalConfigProvider`
   * @default ''
   */
  empty?: string | TNode;
  /**
   * 首行内容
   */
  firstFullRow?: string | TNode;
  /**
   * 固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行
   */
  fixedRows?: Array<number>;
  /**
   * 表尾数据源，泛型 T 指表格数据类型
   * @default []
   */
  footData?: Array<T>;
  /**
   * 表尾吸底
   * @default false
   */
  footerAffixedBottom?: boolean;
  /**
   * 表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性
   */
  footerAffixProps?: AffixProps;
  /**
   * 表头吸顶
   * @default false
   */
  headerAffixedTop?: boolean;
  /**
   * 表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性
   */
  headerAffixProps?: AffixProps;
  /**
   * 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`
   */
  height?: string | number;
  /**
   * 是否显示鼠标悬浮状态
   * @default false
   */
  hover?: boolean;
  /**
   * 尾行内容
   */
  lastFullRow?: string | TNode;
  /**
   * 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态
   */
  loading?: boolean | TNode;
  /**
   * 透传加载组件全部属性
   */
  loadingProps?: LoadingProps;
  /**
   * 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px
   */
  maxHeight?: string | number;
  /**
   * 分页配置，值为空则不显示。具体 API 参考分页组件。当 `data` 数据长度超过分页大小时，会自动对本地数据 `data` 进行排序，如果不希望对于 `data` 进行排序，可以设置 `disableDataPage = true`
   */
  pagination?: PaginationProps;
  /**
   * HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: '超出省略显示' }]。<br /> 示例三：() => [{ draggable: true }]
   */
  rowAttributes?: TableRowAttributes<T>;
  /**
   * 行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type=body` 表示类名作用于 `tfoot` 中的元素
   */
  rowClassName?: ClassName | ((params: RowClassNameParams<T>) => ClassName);
  /**
   * 使用 rowKey 唯一标识一行数据
   * @default 'id'
   */
  rowKey: string;
  /**
   * 用于自定义合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`
   */
  rowspanAndColspan?: TableRowspanAndColspanFunc<T>;
  /**
   * 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`
   */
  scroll?: TableScroll;
  /**
   * 表格尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 是否显示斑马纹
   * @default false
   */
  stripe?: boolean;
  /**
   * 表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度
   * @default ''
   */
  tableContentWidth?: string;
  /**
   * 表格布局方式
   * @default fixed
   */
  tableLayout?: 'auto' | 'fixed';
  /**
   * 表格顶部内容，可以用于自定义列设置、顶部查询条件等
   */
  topContent?: string | TNode;
  /**
   * 行内容上下方向对齐
   * @default middle
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * 单元格点击时触发
   */
  onCellClick?: (context: BaseTableCellEventContext<T>) => void;
  /**
   * 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型
   */
  onPageChange?: (pageInfo: PageInfo, newDataSource: Array<T>) => void;
  /**
   * 行点击时触发，泛型 T 指表格数据类型
   */
  onRowClick?: (context: RowEventContext<T>) => void;
  /**
   * 行双击时触发，泛型 T 指表格数据类型
   */
  onRowDblclick?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行按下时触发，泛型 T 指表格数据类型
   */
  onRowMousedown?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行进入时触发，泛型 T 指表格数据类型
   */
  onRowMouseenter?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行离开时触发，泛型 T 指表格数据类型
   */
  onRowMouseleave?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标悬浮到行时触发，泛型 T 指表格数据类型
   */
  onRowMouseover?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型
   */
  onRowMouseup?: (context: RowEventContext<T>) => void;
  /**
   * 表格内容滚动时触发
   */
  onScroll?: (params: { e: WheelEvent }) => void;
  /**
   * 表格内容横向滚动时触发。请更为使用 `onScroll` 事件
   * @deprecated
   */
  onScrollX?: (params: { e: WheelEvent }) => void;
  /**
   * 表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 `onScroll` 事件
   * @deprecated
   */
  onScrollY?: (params: { e: WheelEvent }) => void;
}

export interface BaseTableCol<T extends TableRowData = TableRowData> {
  /**
   * 列横向对齐方式
   * @default left
   */
  align?: 'left' | 'right' | 'center';
  /**
   * 透传 HTML 属性到列元素
   */
  attrs?: object;
  /**
   * 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型
   */
  cell?: string | TNode<BaseTableCellParams<T>>;
  /**
   * 用于多级表头，泛型 T 指表格数据类型
   */
  children?: Array<BaseTableCol<T>>;
  /**
   * 列类名，值类型是 Function 使用返回值作为列类名；值类型不为 Function 时，值用于整列类名（含表头）。泛型 T 指表格数据类型
   */
  className?: ClassName | ((context: CellData<T>) => ClassName);
  /**
   * 渲染列所需字段
   * @default ''
   */
  colKey?: string;
  /**
   * 单元格和表头内容超出时，是否显示省略号。如果仅希望单元格超出省略，可设置 `ellipsisTitle = false`。<br/> 值为 `true`，则浮层默认显示单元格内容；<br/>值类型为 `Function` 则自定义浮层显示内容；<br/>值类型为 `Object`，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性
   * @default false
   */
  ellipsis?: boolean | TNode<BaseTableCellParams<T>> | PopupProps;
  /**
   * 表头内容超出时，是否显示省略号。优先级高于 `ellipsis`。<br/>值为 `true`，则浮层默认显示表头全部内容；<br/>值类型为 `Function` 则自定义浮层显示表头内容；<br/>值类型为 `Object`，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性
   */
  ellipsisTitle?: boolean | TNode<BaseTableColParams<T>> | PopupProps;
  /**
   * 固定列显示位置
   * @default left
   */
  fixed?: 'left' | 'right';
  /**
   * 自定义表尾表尾。值类型为 Function 表示以函数形式渲染表尾内容。值类型为 string 表示使用插槽渲染，插槽名称为 `foot` 值
   */
  foot?: string | TNode<{ col: BaseTableCol; colIndex: number }>;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<BaseTableRenderParams<T>>;
  /**
   * 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render
   */
  title?: string | TNode<{ col: BaseTableCol; colIndex: number }>;
  /**
   * 列宽，可以作为最小宽度使用。当列宽总和小于 `table` 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 `table` 元素，表现为定宽。可以同时调整 `table` 元素的宽度来达到自己想要的效果
   */
  width?: string | number;
}

export interface TdPrimaryTableProps<T extends TableRowData = TableRowData>
  extends Omit<TdBaseTableProps<T>, 'columns' | 'onCellClick'> {
  /**
   * 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容
   */
  asyncLoading?: 'loading' | 'load-more' | TNode;
  /**
   * 自定义显示列控制器，值为空不会显示。具体属性请看下方 `TableColumnController` 文档
   */
  columnController?: TableColumnController;
  /**
   * 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制
   */
  columnControllerVisible?: boolean;
  /**
   * 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制，非受控属性
   */
  defaultColumnControllerVisible?: boolean;
  /**
   * 列配置，泛型 T 指表格数据类型
   * @default []
   */
  columns?: Array<PrimaryTableCol<T>>;
  /**
   * 列配置功能中，当前显示的列
   */
  displayColumns?: CheckboxGroupValue;
  /**
   * 列配置功能中，当前显示的列，非受控属性
   */
  defaultDisplayColumns?: CheckboxGroupValue;
  /**
   * 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过专门的 拖拽手柄 进行 行拖拽排序。值为 `col` 表示列顺序拖拽。`drag-col` 已废弃，请勿使用
   */
  dragSort?: 'row' | 'row-handler' | 'col' | 'drag-col';
  /**
   * 拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable)
   */
  dragSortOptions?: SortableOptions;
  /**
   * 展开行内容，泛型 T 指表格数据类型
   */
  expandedRow?: TNode<TableExpandedRowParams<T>>;
  /**
   * 展开行
   * @default []
   */
  expandedRowKeys?: Array<string | number>;
  /**
   * 展开行，非受控属性
   * @default []
   */
  defaultExpandedRowKeys?: Array<string | number>;
  /**
   * 用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider`
   * @default true
   */
  expandIcon?: boolean | TNode<ExpandArrowRenderParams<T>>;
  /**
   * 是否允许点击行展开
   */
  expandOnRowClick?: boolean;
  /**
   * 自定义过滤图标，支持全局配置 `GlobalConfigProvider`
   */
  filterIcon?: TNode;
  /**
   * 自定义过滤状态行及清空筛选等
   */
  filterRow?: string | TNode;
  /**
   * 过滤数据的值
   */
  filterValue?: FilterValue;
  /**
   * 过滤数据的值，非受控属性
   */
  defaultFilterValue?: FilterValue;
  /**
   * 隐藏排序文本提示，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `false`
   */
  hideSortTips?: boolean;
  /**
   * 是否支持多列排序
   * @default false
   */
  multipleSort?: boolean;
  /**
   * 选中的行，控制属性
   */
  selectedRowKeys?: Array<string | number>;
  /**
   * 选中的行，控制属性，非受控属性
   */
  defaultSelectedRowKeys?: Array<string | number>;
  /**
   * 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序
   */
  sort?: TableSort;
  /**
   * 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序，非受控属性
   */
  defaultSort?: TableSort;
  /**
   * 自定义排序图标，支持全局配置 `GlobalConfigProvider`
   */
  sortIcon?: TNode;
  /**
   * 允许表格行拖拽时排序。请更为使用 `dragSort="row"`
   * @default false
   * @deprecated
   */
  sortOnRowDraggable?: boolean;
  /**
   * 异步加载区域被点击时触发
   */
  onAsyncLoadingClick?: (context: { status: 'loading' | 'load-more' }) => void;
  /**
   * 单元格点击时触发
   */
  onCellClick?: (context: PrimaryTableCellEventContext<T>) => void;
  /**
   * 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据
   */
  onChange?: (data: TableChangeData, context: TableChangeContext<T>) => void;
  /**
   * 确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列
   */
  onColumnChange?: (context: PrimaryTableColumnChange<T>) => void;
  /**
   * 列配置弹窗显示或隐藏变化时触发
   */
  onColumnControllerVisibleChange?: (visible: boolean, context: { trigger: 'cancel' | 'confirm' }) => void;
  /**
   * 本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源
   */
  onDataChange?: (data: Array<T>, context: TableDataChangeContext) => void;
  /**
   * 确认列配置时触发
   */
  onDisplayColumnsChange?: (value: CheckboxGroupValue) => void;
  /**
   * 拖拽排序时触发，`currentData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发
   */
  onDragSort?: (context: DragSortContext<T>) => void;
  /**
   * 展开行发生变化时触发，泛型 T 指表格数据类型
   */
  onExpandChange?: (expandedRowKeys: Array<string | number>, options: ExpandOptions<T>) => void;
  /**
   * 过滤参数发生变化时触发，泛型 T 指表格数据类型
   */
  onFilterChange?: (filterValue: FilterValue, context: { col?: PrimaryTableCol<T> }) => void;
  /**
   * 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据
   */
  onSelectChange?: (selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => void;
  /**
   * 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序
   */
  onSortChange?: (sort: TableSort, options: SortOptions<T>) => void;
}

export interface PrimaryTableCol<T extends TableRowData = TableRowData>
  extends Omit<BaseTableCol, 'cell' | 'title' | 'render' | 'children'> {
  /**
   * 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型
   */
  cell?: string | TNode<PrimaryTableCellParams<T>>;
  /**
   * 透传参数，`colKey` 值为 `row-select` 时，配置有效。具体定义参考 Checkbox 组件 和 Radio 组件。泛型 T 指表格数据类型
   */
  checkProps?: CheckProps<T>;
  /**
   * 用于多级表头，泛型 T 指表格数据类型
   */
  children?: Array<PrimaryTableCol<T>>;
  /**
   * 渲染列所需字段，必须唯一。值为 `row-select` 表示当前列为行选中操作列。值为 `drag` 表示当前列为拖拽排序操作列
   * @default ''
   */
  colKey?: string;
  /**
   * 是否禁用行选中，`colKey` 值为 `row-select` 时，配置有效
   */
  disabled?: (options: { row: T; rowIndex: number }) => boolean;
  /**
   * 可编辑单元格配置项，具体属性参考文档 `TableEditableCellConfig` 描述
   */
  edit?: TableEditableCellConfig<T>;
  /**
   * 过滤规则，支持多选(multiple)、单选(single)、输入框(input) 等三种形式。想要自定义过滤组件，可通过 `filter.component` 实现，自定义过滤组件需要包含参数 value 和事件 change
   */
  filter?: TableColumnFilter;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<PrimaryTableRenderParams<T>>;
  /**
   * 该列是否支持排序。值为 true 表示该列支持排序；值类型为函数，表示对本地数据 `data` 进行排序，返回值参考 [MDN Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。泛型 T 指表格数据类型
   * @default false
   */
  sorter?: boolean | SorterFun<T>;
  /**
   * 当前列支持排序的方式，desc 表示当前列只能进行降序排列；asc 表示当前列只能进行升序排列；all 表示当前列既可升序排列，又可以降序排列
   * @default all
   */
  sortType?: SortType;
  /**
   * 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render
   */
  title?: string | TNode<{ col: PrimaryTableCol; colIndex: number }>;
  /**
   * `colKey` 值为 `row-select` 时表示行选中列，有两种模式：单选和多选。 `type=single` 表示单选，`type=multiple` 表示多选
   * @default single
   */
  type?: 'single' | 'multiple';
}

export interface TdEnhancedTableProps<T extends TableRowData = TableRowData> extends TdPrimaryTableProps<T> {
  /**
   * 树形结构中，拖拽排序前控制，返回值为 `true` 则继续排序；返回值为 `false` 则中止排序还原数据
   */
  beforeDragSort?: (context: DragSortContext<T>) => boolean;
  /**
   * 树形结构相关配置。具体属性文档查看 `TableTreeConfig` 相关描述
   */
  tree?: TableTreeConfig;
  /**
   * 自定义树形结构展开图标，支持全局配置 `GlobalConfigProvider`
   */
  treeExpandAndFoldIcon?: TNode<{ type: 'expand' | 'fold' }>;
  /**
   * 异常拖拽排序时触发，如：树形结构中，非同层级之间的交换。`context.code` 指交换异常错误码，固定值；`context.reason` 指交换异常的原因
   */
  onAbnormalDragSort?: (context: TableAbnormalDragSortContext<T>) => void;
  /**
   * 树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发
   */
  onTreeExpandChange?: (context: TableTreeExpandChangeContext<T>) => void;
}

/** 组件实例方法 */
export interface EnhancedTableInstanceFunctions<T extends TableRowData = TableRowData> {
  /**
   * 展开全部行
   */
  expandAll: () => void;
  /**
   * 折叠全部行
   */
  foldAll: () => void;
  /**
   * 树形结构中，用于获取行数据所有信息。泛型 `T` 表示行数据类型
   */
  getData: (key: TableRowValue) => TableRowState<T>;
  /**
   * 树形结构中，移除指定节点
   */
  remove: (key: TableRowValue) => void;
  /**
   * 树形结构中，用于更新行数据。泛型 `T` 表示行数据类型
   */
  setData: (key: TableRowValue, newRowData: T) => void;
  /**
   * 展开或收起树形行
   */
  toggleExpandData: (p: { row: T; rowIndex: number }) => void;
}

export interface TableRowState<T extends TableRowData = TableRowData> {
  /**
   * 表格行是否禁用选中
   * @default false
   */
  disabled?: boolean;
  /**
   * 当前节点展开的子节点数量
   */
  expandChildrenLength?: number;
  /**
   * 表格行是否展开
   * @default false
   */
  expanded: boolean;
  /**
   * 唯一标识
   */
  id: string | number;
  /**
   * 当前节点层级
   */
  level?: number;
  /**
   * 父节点
   */
  parent?: TableRowState<T>;
  /**
   * 当前节点路径
   */
  path?: TableRowState<T>[];
  /**
   * 原始表格行数据
   */
  row: T;
  /**
   * 表格行下标，值为 `-1` 标识当前行未展开显示
   */
  rowIndex: number;
}

export interface TableColumnFilter {
  /**
   * 用于自定义筛选器，只要保证自定义筛选器包含 value 属性 和 change 事件，即可像内置筛选器一样正常使用
   */
  component?: TNode;
  /**
   * 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 `single` 或 `multiple` 时有效
   */
  list?: Array<OptionData>;
  /**
   * 用于透传筛选器属性，可以对筛选器进行任何原组件支持的属性配置
   */
  props?: FilterProps;
  /**
   * 重置时设置的值，示例：'' 或 []
   */
  resetValue?: any;
  /**
   * 是否显示重置和确认。值为真，过滤事件（filter-change）会在确定时触发；值为假，则数据变化时会立即触发过滤事件
   * @default false
   */
  showConfirmAndReset?: boolean;
  /**
   * 用于设置筛选器类型：单选按钮筛选器、复选框筛选器、输入框筛选器
   * @default ''
   */
  type?: FilterType;
}

export interface TableScroll {
  /**
   * 表示表格除可视区域外，额外渲染的行数，避免表格快速滚动过程中，新出现的内容来不及渲染从而出现空白
   * @default 20
   */
  bufferSize?: number;
  /**
   * 表示表格每行内容是否同一个固定高度，仅在 `scroll.type` 为 `virtual` 时有效，该属性设置为 `true` 时，可用于简化虚拟滚动内部计算逻辑，提升性能，此时则需要明确指定 `scroll.rowHeight` 属性的值
   * @default false
   */
  isFixedRowHeight?: boolean;
  /**
   * 表格的行高，不会给`<tr>`元素添加样式高度，仅作为滚动时的行高参考。一般情况不需要设置该属性。如果设置，可尽量将该属性设置为表格每行平均高度，从而使得表格滚动过程更加平滑
   */
  rowHeight?: number;
  /**
   * 启动虚拟滚动的阈值。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动
   * @default 100
   */
  threshold?: number;
  /**
   * 表格滚动加载类型，有两种：懒加载和虚拟滚动。<br />值为 `lazy` ，表示表格滚动时会进行懒加载，非可视区域内的表格内容将不会默认渲染，直到该内容可见时，才会进行渲染，并且已渲染的内容滚动到不可见时，不会被销毁；<br />值为`virtual`时，表示表格会进行虚拟滚动，无论滚动条滚动到哪个位置，同一时刻，表格仅渲染该可视区域内的表格内容，当表格需要展示的数据量较大时，建议开启该特性
   */
  type: 'lazy' | 'virtual';
}

export interface TableColumnController {
  /**
   * 自定义列配置按钮，包括 Button 组件的全部属性。比如：按钮颜色和文本
   */
  buttonProps?: ButtonProps;
  /**
   * 透传复选框组件全部特性
   */
  checkboxProps?: CheckboxGroupProps;
  /**
   * 透传弹框组件全部特性，如：防止滚动穿透
   */
  dialogProps?: DialogProps;
  /**
   * 指列配置弹框中，各列的字段平铺方式：`fixed-width` 表示固定宽度，每行固定数量，横向和纵向均对齐，`auto-width` 表示宽度随列标题数量自由显示，横向铺满，纵向不要求对齐
   * @default auto-width
   */
  displayType?: 'fixed-width' | 'auto-width';
  /**
   * 用于设置允许用户对哪些列进行显示或隐藏的控制，默认为全部字段
   */
  fields?: string[];
  /**
   * 是否隐藏表格组件内置的“列配置”按钮
   * @default false
   */
  hideTriggerButton?: boolean;
  /**
   * 列配置按钮基于表格的放置位置：左上角、右上角、左下角、右下角等
   * @default top-right
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface TableEditableCellConfig<T extends TableRowData = TableRowData> {
  /**
   * 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态。示例：`abortEditOnEvent: ['onChange']`
   */
  abortEditOnEvent?: string[];
  /**
   * 组件定义，如：`Input` `Select`
   */
  component?: ComponentType;
  /**
   * 编辑完成后，退出编辑模式时触发
   */
  onEdited?: (context: { trigger: string; newRowData: T; rowIndex: number }) => void;
  /**
   * 透传给组件 `edit.component` 的属性
   */
  props?: { [key: string]: any };
  /**
   * 校验规则
   */
  rules?: FormRule[];
}

export interface TableTreeConfig {
  /**
   * 表示树形结构的行选中（多选），父子行选中是否独立
   * @default true
   */
  checkStrictly?: boolean;
  /**
   * 树形结构子节点字段，示例：`childrenKey='list'`。一般应用在数据 `data` 的子节点字段不是 `children` 的场景
   * @default children
   */
  childrenKey?: string;
  /**
   * 是否默认展开全部，仅默认情况有效。如果希望自由控制树形结构的展开或收起，可使用实例方法 `expandAll` 和 `foldAll`
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * 树结点缩进距离，单位：px
   * @default 24
   */
  indent?: number;
  /**
   * 树结点在第几列渲染，默认为第一列
   * @default 0
   */
  treeNodeColumnIndex?: number;
}

export type TableRowAttributes<T> =
  | HTMLElementAttributes
  | ((params: { row: T; rowIndex: number; type: 'body' | 'foot' }) => HTMLElementAttributes)
  | Array<TableRowAttributes<T>>;

export interface RowClassNameParams<T> {
  row: T;
  rowIndex: number;
  type?: 'body' | 'foot';
}

export type TableRowspanAndColspanFunc<T> = (params: BaseTableCellParams<T>) => RowspanColspan;

export interface RowspanColspan {
  colspan?: number;
  rowspan?: number;
}

export interface BaseTableCellEventContext<T> {
  row: T;
  col: BaseTableCol;
  rowIndex: number;
  colIndex: number;
  e: MouseEvent;
}

export interface RowEventContext<T> {
  row: T;
  index: number;
  e: MouseEvent;
}

export interface TableRowData {
  [key: string]: any;
  children?: TableRowData[];
}

export interface BaseTableCellParams<T> {
  row: T;
  rowIndex: number;
  col: BaseTableCol<T>;
  colIndex: number;
}

export interface CellData<T> extends BaseTableCellParams<T> {
  type: 'th' | 'td';
}

export interface BaseTableColParams<T> {
  col: BaseTableCol<T>;
  colIndex: number;
}

export interface BaseTableRenderParams<T> extends BaseTableCellParams<T> {
  type: RenderType;
}

export type RenderType = 'cell' | 'title';

export type DataType = TableRowData;

export interface TableExpandedRowParams<T> {
  row: T;
  index: number;
  columns: PrimaryTableCol<T>[] | BaseTableCol<T>[];
}

export interface ExpandArrowRenderParams<T> {
  row: T;
  index: number;
}

export type FilterValue = { [key: string]: any };

export type TableSort = SortInfo | Array<SortInfo>;

export interface SortInfo {
  sortBy: string;
  descending: boolean;
}

export interface PrimaryTableCellEventContext<T> {
  row: T;
  col: PrimaryTableCol;
  rowIndex: number;
  colIndex: number;
  e: MouseEvent;
}

export interface TableChangeData {
  sorter?: TableSort;
  filter?: FilterValue;
  pagination?: PaginationProps;
}

export interface TableChangeContext<T> {
  trigger: TableChangeTrigger;
  currentData?: T[];
}

export type TableChangeTrigger = 'filter' | 'sorter' | 'pagination';

export interface PrimaryTableColumnChange<T> {
  columns?: CheckboxGroupValue;
  currentColumn?: PrimaryTableCol<T>;
  type?: 'check' | 'uncheck';
  e?: Event;
}

export interface TableDataChangeContext {
  trigger: 'sort';
}

export interface DragSortContext<T> {
  currentIndex: number;
  current: T;
  targetIndex: number;
  target: T;
  currentData: T[];
  e: SortableEvent;
  sort: 'row' | 'col';
}

export interface ExpandOptions<T> {
  expandedRowData: Array<T>;
}

export interface SelectOptions<T> {
  selectedRowData: Array<T>;
  type: 'uncheck' | 'check';
  currentRowKey?: string;
  currentRowData?: T;
}

export interface SortOptions<T> {
  currentDataSource?: Array<T>;
  col: PrimaryTableCol;
}

export interface PrimaryTableCellParams<T> {
  row: T;
  rowIndex: number;
  col: PrimaryTableCol<T>;
  colIndex: number;
}

export type CheckProps<T> =
  | CheckboxProps
  | RadioProps
  | ((options: { row: T; rowIndex: number }) => CheckboxProps | RadioProps);

export interface PrimaryTableRenderParams<T> extends PrimaryTableCellParams<T> {
  type: RenderType;
}

export type SorterFun<T> = (a: T, b: T) => number;

export type SortType = 'desc' | 'asc' | 'all';

export interface TableAbnormalDragSortContext<T> {
  code: number;
  reason: string;
}

export interface TableTreeExpandChangeContext<T> {
  row: T;
  rowIndex: number;
  rowState: TableRowState<T>;
  trigger?: 'expand-fold-icon';
}

export type TableRowValue = string | number;

export type FilterProps = RadioProps | CheckboxProps | InputProps | { [key: string]: any };

export type FilterType = 'input' | 'single' | 'multiple';
