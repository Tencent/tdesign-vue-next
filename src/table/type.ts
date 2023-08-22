/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { AffixProps } from '../affix';
import { LoadingProps } from '../loading';
import { PaginationProps, PageInfo } from '../pagination';
import { TooltipProps } from '../tooltip';
import { CheckboxGroupValue } from '../checkbox';
import { SortableEvent, SortableOptions } from 'sortablejs';
import { CheckboxProps } from '../checkbox';
import { RadioProps } from '../radio';
import { PopupProps } from '../popup';
import { InputProps } from '../input';
import { ButtonProps } from '../button';
import { CheckboxGroupProps } from '../checkbox';
import { DialogProps } from '../dialog';
import { FormRule, AllValidateResult } from '../form';
import {
  TNode,
  OptionData,
  SizeEnum,
  ClassName,
  Styles,
  AttachNode,
  HTMLElementAttributes,
  ComponentType,
  TScroll,
  ScrollToElementParams,
} from '../common';

export interface TdBaseTableProps<T extends TableRowData = TableRowData> {
  /**
   * 是否允许调整列宽。请更为使用 `resizable`
   * @deprecated
   */
  allowResizeColumnWidth?: boolean;
  /**
   * 超出省略等所有浮层元素统一绑定到 `attach`，可根据实际情况调整挂载元素
   */
  attach?: AttachNode;
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
   * 单元格数据为空时呈现的内容
   */
  cellEmptyContent?: string | TNode<BaseTableCellParams<T>>;
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
   * 首行内容，横跨所有列
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
   * 请更为使用 `footerAffixedBottom`。表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性。
   * @deprecated
   */
  footerAffixProps?: Partial<AffixProps>;
  /**
   * 表尾吸底。使用此向功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，则表示相对于整个窗口吸底。如果表格滚动的父元素不是整个窗口，请通过 `footerAffixedBottom.container` 调整固钉的吸顶范围。基于 Affix 组件开发，透传全部 Affix 组件属性
   * @default false
   */
  footerAffixedBottom?: boolean | Partial<AffixProps>;
  /**
   * 表尾总结行
   */
  footerSummary?: string | TNode;
  /**
   * 请更为使用 `headerAffixedTop`。表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性
   * @deprecated
   */
  headerAffixProps?: Partial<AffixProps>;
  /**
   * 表头吸顶。使用该功能，需要非常注意表格是相对于哪一个父元素进行滚动。值为 `true`，表示相对于整个窗口吸顶。如果表格滚动的父元素不是整个窗口，请通过 `headerAffixedTop.container` 调整吸顶的位置。基于 Affix 组件开发，透传全部 Affix 组件属性。
   * @default false
   */
  headerAffixedTop?: boolean | Partial<AffixProps>;
  /**
   * 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`
   */
  height?: string | number;
  /**
   * 滚动条吸底。基于 Affix 组件开发，透传全部 Affix 组件属性
   */
  horizontalScrollAffixedBottom?: boolean | Partial<AffixProps>;
  /**
   * 是否显示鼠标悬浮状态
   * @default false
   */
  hover?: boolean;
  /**
   * 尾行内容，横跨所有列
   */
  lastFullRow?: string | TNode;
  /**
   * 是否启用整个表格元素的懒加载，当页面滚动到可视区域后再渲染表格。注意和表格内部行滚动懒加载的区别，内部行滚动无论表格是否在可视区域都会默认渲染第一屏的行元素
   * @default false
   */
  lazyLoad?: boolean;
  /**
   * 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态
   */
  loading?: boolean | TNode;
  /**
   * 透传加载组件全部属性
   */
  loadingProps?: Partial<LoadingProps>;
  /**
   * 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px
   */
  maxHeight?: string | number;
  /**
   * 分页配置，值为空则不显示。具体 API 参考分页组件。当 `data` 数据长度超过分页大小时，会自动对本地数据 `data` 进行排序，如果不希望对于 `data` 进行排序，可以设置 `disableDataPage = true`
   */
  pagination?: PaginationProps;
  /**
   * 分页吸底。基于 Affix 组件开发，透传全部 Affix 组件属性
   */
  paginationAffixedBottom?: boolean | Partial<AffixProps>;
  /**
   * 是否允许调整列宽，设置 `tableLayout=fixed` 效果更友好，此时不允许通过 CSS 设置 `table`元素宽度，也不允许设置 `tableContentWidth`。一般不建议在列宽调整场景使用 `tableLayout: auto`。如果想要配置宽度可调整的最小值和最大值，请使用 `column.resize`，示例：`columns: [{ resize: { minWidth: 120, maxWidth: 300 } }]`。<br/> 默认规则：因列宽超出存在横向滚动条时，列宽调整仅影响当前列宽和总列宽；表格列较少没有横向滚动条时，列宽调整表现为自身宽度和相邻宽度变化
   * @default false
   */
  resizable?: boolean;
  /**
   * HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: '超出省略显示' }]。<br /> 示例三：() => [{ draggable: true }]
   */
  rowAttributes?: TableRowAttributes<T>;
  /**
   * 行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type= tfoot` 表示类名作用于 `tfoot` 中的元素
   */
  rowClassName?: ClassName | ((params: RowClassNameParams<T>) => ClassName);
  /**
   * 唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法
   * @default 'id'
   */
  rowKey: string;
  /**
   * 用于自定义合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`
   */
  rowspanAndColspan?: TableRowspanAndColspanFunc<T>;
  /**
   * 用于自定义表尾的合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`
   */
  rowspanAndColspanInFooter?: TableRowspanAndColspanFunc<T>;
  /**
   * 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`
   */
  scroll?: TScroll;
  /**
   * 是否显示表头
   * @default true
   */
  showHeader?: boolean;
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
   * 表格布局方式，`<table>` 元素原生属性。[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)。注意，在列宽调整下场景只能使用 `fixed` 模式
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
   * 列调整大小之后触发。`context.columnsWidth` 表示操作后各个列的宽度；
   */
  onColumnResizeChange?: (context: { columnsWidth: { [colKey: string]: number } }) => void;
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

/** 组件实例方法 */
export interface BaseTableInstanceFunctions<T extends TableRowData = TableRowData> {
  /**
   * 全部重新渲染表格
   */
  refreshTable: () => void;
  /**
   * 横向滚动到指定列，呈现在可视范围内
   */
  scrollColumnIntoView: (colKey: string) => void;
  /**
   * 虚拟滚动场景，纵向滚动到指定行。示例：`scrollToElement({ index: 100, top: 80, time: 200, behavior: 'smooth' })`
   */
  scrollToElement: (params: ScrollToElementParams) => void;
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
  attrs?: BaseTableColumnAttributes<T>;
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
  className?: TableColumnClassName<T> | TableColumnClassName<T>[];
  /**
   * 渲染列所需字段，值为 `serial-number` 表示当前列为「序号」列
   * @default ''
   */
  colKey?: string;
  /**
   * 单行表头合并列。多行表头请参考「多级表头」文档示例
   */
  colspan?: number;
  /**
   * 单元格和表头内容超出时，是否显示省略号。如果仅希望单元格超出省略，可设置 `ellipsisTitle = false`。<br/> 值为 `true`，则超出省略浮层默认显示单元格内容；<br/>值类型为 `Function` 则自定义超出省略浮中层显示的内容；<br/>值类型为 `Object`，则自动透传属性到 Tooltip 组件，可用于调整浮层背景色和方向等特性。<br/> 同时透传 Tooltip 属性和自定义浮层内容，请使用 `{ props: { theme: 'light' }, content: () => 'something' }`。<br /> 请注意单元格超出省略的两个基本点：1. 内容元素是内联元素或样式（自定义单元格内容时需特别注意）；2. 内容超出父元素
   * @default false
   */
  ellipsis?:
    | boolean
    | TNode<BaseTableCellParams<T>>
    | TooltipProps
    | { props: TooltipProps; content: TNode<BaseTableCellParams<T>> };
  /**
   * 表头内容超出时，是否显示省略号。优先级高于 `ellipsis`。<br/>值为 `true`，则超出省略的浮层默认显示表头全部内容；<br/>值类型为 `Function` 用于自定义超出省略浮层显示的表头内容；<br/>值类型为 `Object`，则自动透传属性到 Tooltip 组件，则自动透传属性到 Tooltip 组件，可用于调整浮层背景色和方向等特性。<br/> 同时透传 Tooltip 属性和自定义浮层内容，请使用 `{ props: { theme: 'light' }, content: () => 'something' }`
   */
  ellipsisTitle?:
    | boolean
    | TNode<BaseTableColParams<T>>
    | TooltipProps
    | { props: TooltipProps; content: TNode<BaseTableColParams<T>> };
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
   * 透传 CSS 属性 `min-width` 到 `<col>` 元素。⚠️ 仅少部分浏览器支持，如：使用 [TablesNG](https://docs.google.com/document/d/16PFD1GtMI9Zgwu0jtPaKZJ75Q2wyZ9EZnVbBacOfiNA/preview) 渲染的 Chrome 浏览器支持 `minWidth`
   */
  minWidth?: string | number;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<BaseTableRenderParams<T>>;
  /**
   * 是否允许调整当前列列宽
   * @default true
   */
  resizable?: boolean;
  /**
   * 限制拖拽调整的最小宽度和最大宽度。`resize.minWidth` 默认为 `80`，`resize.maxWidth` 默认为 `600`
   */
  resize?: TableColumnResizeConfig;
  /**
   * 是否阻止当列单元格点击事件冒泡
   */
  stopPropagation?: boolean;
  /**
   * 列表头类名，值类型是函数时使用返回值作为列类名。泛型 T 指表格数据类型
   */
  thClassName?: TableColumnClassName<T> | TableColumnClassName<T>[];
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
   * 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过拖拽手柄进行行拖拽排序。值为 `col` 表示列顺序拖拽。值为 `row-handler-col` 表示同时支持行拖拽和列拖拽。⚠️`drag-col` 已废弃，请勿使用。
   */
  dragSort?: 'row' | 'row-handler' | 'col' | 'row-handler-col' | 'drag-col';
  /**
   * 拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable)
   */
  dragSortOptions?: SortableOptions;
  /**
   * 单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态
   */
  editableCellState?: EditableCellType<T>;
  /**
   * 处于编辑状态的行
   */
  editableRowKeys?: Array<string | number>;
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
   * 自定义过滤图标，支持全局配置 `GlobalConfigProvider`
   */
  filterIcon?: TNode<{ col: PrimaryTableCol<T>; colIndex: number }>;
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
   * 半选状态行。选中行请更为使用 `selectedRowKeys` 控制
   */
  indeterminateSelectedRowKeys?: Array<string | number>;
  /**
   * 是否支持多列排序
   * @default false
   */
  multipleSort?: boolean;
  /**
   * 行选中功能，是否在分页时保留上一页选中结果不清空，本地数据分页场景下，会全选所有页数据。值为 `false` 则表示全部选中操作停留在当前页，不跨分页；本地数据分页场景下，全选仅选中当前页
   * @default true
   */
  reserveSelectedRowOnPaginate?: boolean;
  /**
   * 是否在点击整行时选中
   */
  selectOnRowClick?: boolean;
  /**
   * 选中行，控制属性。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制
   * @default []
   */
  selectedRowKeys?: Array<string | number>;
  /**
   * 选中行，控制属性。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制，非受控属性
   * @default []
   */
  defaultSelectedRowKeys?: Array<string | number>;
  /**
   * 当前排序列是否显示背景色
   * @default false
   */
  showSortColumnBgColor?: boolean;
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
   * 允许表格行拖拽时排序。请更为使用 `dragSort=\"row\"`
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
   * 拖拽排序时触发，`data` 表示排序前的数据，`newData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发
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
   * 行编辑时触发
   */
  onRowEdit?: (context: PrimaryTableRowEditContext<T>) => void;
  /**
   * 行编辑校验完成后触发，即组件实例方法 `validateRowData` 执行结束后触发。`result` 表示校验结果，`trigger=self` 表示编辑组件内部触发的校验，`trigger='parent'` 表示表格父组件触发的校验
   */
  onRowValidate?: (context: PrimaryTableRowValidateContext<T>) => void;
  /**
   * 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据
   */
  onSelectChange?: (selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => void;
  /**
   * 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序
   */
  onSortChange?: (sort: TableSort, options: SortOptions<T>) => void;
  /**
   * 可编辑行表格，全部数据校验完成后触发。即组件实例方法 `validateTableData` 执行结束后触发
   */
  onValidate?: (context: PrimaryTableValidateContext) => void;
}

/** 组件实例方法 */
export interface PrimaryTableInstanceFunctions<T extends TableRowData = TableRowData> {
  /**
   * 校验行信息，校验完成后，会触发事件 `onRowValidate`。参数 `rowValue` 表示行唯一标识的值
   */
  validateRowData: (rowValue: any) => Promise<{ trigger: TableValidateTrigger; result: ErrorListObjectType<T>[] }>;
  /**
   * 校验表格全部数据，校验完成后，会触发事件 `onValidate`
   */
  validateTableData: () => Promise<{ result: TableErrorListMap }>;
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
   * 渲染列所需字段，必须唯一。值为 `row-select` 表示当前列为行选中操作列。值为 `drag` 表示当前列为拖拽排序操作列。值为 `serial-number` 表示当前列为「序号」列
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
   * 过滤规则，支持多选(multiple)、单选(single)、输入框(input) 等三种形式。想要自定义过滤组件，可通过 `filter.component` 实现，自定义过滤组件需要包含参数 value 和事件 change。更多信息请查看当前页面中 `TableColumnFilter` 的详细文档
   */
  filter?: TableColumnFilter;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<PrimaryTableRenderParams<T>>;
  /**
   * 当前列支持排序的方式，desc 表示当前列只能进行降序排列；asc 表示当前列只能进行升序排列；all 表示当前列既可升序排列，又可以降序排列
   * @default all
   */
  sortType?: SortType;
  /**
   * 该列是否支持排序。值为 true 表示该列支持排序；值类型为函数，表示对本地数据 `data` 进行排序，返回值参考 [MDN Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。泛型 T 指表格数据类型
   * @default false
   */
  sorter?: boolean | SorterFun<T>;
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
   * 展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑
   * @default []
   */
  expandedTreeNodes?: Array<string | number>;
  /**
   * 展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑，非受控属性
   * @default []
   */
  defaultExpandedTreeNodes?: Array<string | number>;
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
   * 树形结构，展开的树节点发生变化时触发，泛型 T 指表格数据类型
   */
  onExpandedTreeNodesChange?: (
    expandedTreeNodes: Array<string | number>,
    options: TableTreeNodeExpandOptions<T>,
  ) => void;
  /**
   * 树形结构，用户操作引起节点展开或收起时触发。请更为使用 `onExpandedTreeNodesChange`
   * @deprecated
   */
  onTreeExpandChange?: (context: TableTreeExpandChangeContext<T>) => void;
}

/** 组件实例方法 */
export interface EnhancedTableInstanceFunctions<T extends TableRowData = TableRowData> {
  /**
   * 树形结构中，为当前节点添加子节点。如果 `key` 为空，则表示为根节点添加子节点
   */
  appendTo: (key: TableRowValue, newData: T) => void;
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
   * 获取展开的树形节点。`type=unique` 标识获取展开节点的行唯一标识值，`type=data` 表示获取展开节点的数据，`type=all` 表示获取行节点包含展开状态的全部数据
   */
  getTreeExpandedRow: (type: 'unique' | 'data' | 'all') => void;
  /**
   * 树形结构中，获取完整的树形结构
   */
  getTreeNode: () => T[];
  /**
   * 树形结构中，在当前节点之后添加子节点
   */
  insertAfter: (key: TableRowValue, newData: T) => void;
  /**
   * 树形结构中，在当前节点之前添加子节点
   */
  insertBefore: (key: TableRowValue, newData: T) => void;
  /**
   * 树形结构中，移除指定节点
   */
  remove: (key: TableRowValue) => void;
  /**
   * 树形结构中，移除指定节点的所有子节点
   */
  removeChildren: (key: TableRowValue) => void;
  /**
   * 重置或更新整个表格数据
   */
  resetData: (newData: T[]) => void;
  /**
   * 树形结构中，用于更新行数据。泛型 `T` 表示行数据类型
   */
  setData: (key: TableRowValue, newRowData: T) => void;
  /**
   * 树形结构中，交换两个节点的顺序
   */
  swapData: (params: SwapParams<T>) => void;
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
   * 用于透传筛选器属性到自定义组件 `component`，HTML 原生属性
   */
  attrs?: HTMLElementAttributes;
  /**
   * 透传类名到自定义组件 `component`
   * @default ''
   */
  classNames?: ClassName;
  /**
   * 用于自定义筛选器，只要保证自定义筛选器包含 value 属性 和 change 事件，即可像内置筛选器一样正常使用。示例：`component: DatePicker`
   */
  component?: ComponentType;
  /**
   * 哪些事件触发后会进行过滤搜索（确认按钮无需配置，会默认触发搜索）。输入框组件示例：`confirmEvents: ['onEnter']`
   */
  confirmEvents?: string[];
  /**
   * 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 `single` 或 `multiple` 时有效
   */
  list?: Array<OptionData>;
  /**
   * 透传 Popup 组件全部属性到筛选器浮层
   */
  popupProps?: PopupProps;
  /**
   * 用于透传筛选器属性到自定义组件 `component`，可以对筛选器进行任何原组件支持的属性配置
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
   * 透传内联样式到自定义组件 `component`
   */
  style?: Styles;
  /**
   * 用于设置筛选器类型：单选按钮筛选器、复选框筛选器、输入框筛选器。更多复杂组件，请更为使用 `component` 自定义任意组件
   * @default ''
   */
  type?: FilterType;
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
   * 组件定义，如：`Input` `Select`。对于完全自定义的组件（非组件库内的组件），组件需要支持 `value` 和 `onChange` ；如果还需要支持校验规则，则组件还需实现 `tips` 和 `status` 两个 API，实现规则可参考 `Input` 组件
   */
  component?: ComponentType;
  /**
   * 单元格默认状态是否为编辑态
   * @default false
   */
  defaultEditable?: boolean;
  /**
   * 设置当前列的单元格始终保持为编辑态
   * @default false
   */
  keepEditMode?: boolean;
  /**
   * 透传给编辑组件的事件
   */
  on?: (context: TableEditableCellPropsParams<T>) => { [eventName: string]: Function };
  /**
   * 编辑完成后，退出编辑模式时触发
   */
  onEdited?: (context: PrimaryTableOnEditedContext<T>) => void;
  /**
   * 透传给组件 `edit.component` 的属性
   */
  props?: TableEditableCellProps<T>;
  /**
   * 校验规则
   */
  rules?: TableEditableCellRules<T>;
  /**
   * 是否显示编辑图标
   * @default true
   */
  showEditIcon?: boolean;
  /**
   * 触发校验的时机，有 2 种：退出编辑时和数据变化时
   * @default 'exit'
   */
  validateTrigger?: 'exit' | 'change';
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
   * 是否在点击行时展开树形结构节点
   * @default false
   */
  expandTreeNodeOnClick?: boolean;
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

export type BaseTableColumnAttributes<T> = { [key: string]: any } | ((context: CellData<T>) => { [key: string]: any });

export interface BaseTableCellParams<T> {
  row: T;
  rowIndex: number;
  col: BaseTableCol<T>;
  colIndex: number;
}

export type TableColumnClassName<T> = ClassName | ((context: CellData<T>) => ClassName);

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

export interface TableColumnResizeConfig {
  minWidth: number;
  maxWidth: number;
}

export type DataType = TableRowData;

export type EditableCellType<T> = (params: PrimaryTableCellParams<T>) => boolean;

export interface ExpandArrowRenderParams<T> {
  row: T;
  index: number;
}

export interface TableExpandedRowParams<T> {
  row: T;
  index: number;
  columns: PrimaryTableCol<T>[] | BaseTableCol<T>[];
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
  data: T[];
  newData: T[];
  currentData?: T[];
  e: SortableEvent;
  sort: 'row' | 'col';
}

export interface ExpandOptions<T> {
  expandedRowData: Array<T>;
  currentRowData: T;
}

export type PrimaryTableRowEditContext<T> = PrimaryTableCellParams<T> & { value: any; editedRow: T };

export type PrimaryTableRowValidateContext<T> = { result: TableRowValidateResult<T>[]; trigger: TableValidateTrigger };

export type TableValidateTrigger = 'self' | 'parent';

export type TableRowValidateResult<T> = PrimaryTableCellParams<T> & { errorList: AllValidateResult[]; value: any };

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

export interface PrimaryTableValidateContext {
  result: TableErrorListMap;
}

export type TableErrorListMap = { [key: string]: AllValidateResult[] };

export type ErrorListObjectType<T> = PrimaryTableRowEditContext<T> & { errorList: AllValidateResult[] };

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

export type SortType = 'desc' | 'asc' | 'all';

export type SorterFun<T> = (a: T, b: T) => number;

export interface TableAbnormalDragSortContext<T> {
  code: number;
  reason: string;
}

export interface TableTreeNodeExpandOptions<T> {
  row: T;
  rowIndex: number;
  rowState: TableRowState<T>;
  type: 'fold' | 'expand';
  trigger?: 'expand-fold-icon' | 'row-click' | 'default-expand-all' | 'expand-all' | 'fold-all';
}

export interface TableTreeExpandChangeContext<T> {
  row: T;
  rowIndex: number;
  rowState: TableRowState<T>;
  trigger?: 'expand-fold-icon' | 'row-click';
}

export type TableRowValue = string | number;

export interface SwapParams<T> {
  current: T;
  target: T;
  currentIndex: number;
  targetIndex: number;
}

export type FilterProps = RadioProps | CheckboxProps | InputProps | { [key: string]: any };

export type FilterType = 'input' | 'single' | 'multiple';

export type PrimaryTableOnEditedContext<T> = PrimaryTableCellParams<T> & { trigger: string; newRowData: T };

export type TableEditableCellProps<T> =
  | TablePlainObject
  | ((params: TableEditableCellPropsParams<T>) => TablePlainObject);

export interface TableEditableCellPropsParams<T> extends PrimaryTableCellParams<T> {
  editedRow: T;
  updateEditedCellValue: (val: any) => void;
}

export interface TablePlainObject {
  [key: string]: any;
}

export type TableEditableCellRules<T> = FormRule[] | ((params: PrimaryTableCellParams<T>) => FormRule[]);
