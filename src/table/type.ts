/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { PaginationProps, PageInfo } from '../pagination';
import { CheckboxProps } from '../checkbox';
import { RadioProps } from '../radio';
import { InputProps } from '../input';
import { TNode, OptionData, SizeEnum, ClassName } from '../common';

export interface TdBaseTableProps<T extends DataType = DataType> {
  /**
   * 是否显示表格边框
   * @default false
   */
  bordered?: boolean;
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
   * 空表格呈现样式
   * @default ''
   */
  empty?: string | TNode;
  /**
   * 展开行内容，可自定义，泛型 T 指表格数据类型
   */
  expandedRow?: string | TNode<{ row: T; index: number }>;
  /**
   * 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300px'。值为数字类型，会自动加上单位 px
   * @default 'auto'
   */
  height?: string | number;
  /**
   * 是否显示鼠标悬浮状态
   * @default false
   */
  hover?: boolean;
  /**
   * 加载中状态。值为 true 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式
   * @default false
   */
  loading?: boolean | TNode;
  /**
   * 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300px'。值为数字类型，会自动加上单位 px
   */
  maxHeight?: string | number;
  /**
   * 分页配置，值为空则不显示。具体 API 参考分页组件
   */
  pagination?: PaginationProps;
  /**
   * 行类名，泛型 T 指表格数据类型
   */
  rowClassName?: ClassName | ((params: { row: T; rowIndex: number }) => ClassName);
  /**
   * 使用 rowKey 唯一标识一行数据
   * @default ''
   */
  rowKey: string;
  /**
   * 用于自定义合并单元格，泛型 T 指表格数据类型
   */
  rowspanAndColspan?: (params: RowspanAndColspanParams<T>) => RowspanColspan;
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
   * 表格布局方式
   * @default fixed
   */
  tableLayout?: 'auto' | 'fixed';
  /**
   * 行内容上下方向对齐
   * @default middle
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
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
  onRowDbClick?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标悬浮到行时触发，泛型 T 指表格数据类型
   */
  onRowHover?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行按下时触发，泛型 T 指表格数据类型
   */
  onRowMousedown?: (context: RowEventContext<T>) => void;
  /**
   * 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型
   */
  onRowMouseup?: (context: RowEventContext<T>) => void;
  /**
   * 表格内容横向滚动时触发
   */
  onScrollX?: (params: { e: WheelEvent }) => void;
  /**
   * 表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条
   */
  onScrollY?: (params: { e: WheelEvent }) => void;
};

export interface BaseTableCol<T extends DataType = DataType> {
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
  cell?: string | TNode<{ row: T; rowIndex: number; col: BaseTableCol; colIndex: number }>;
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
   * 内容超出时，是否显示省略号
   * @default false
   */
  ellipsis?: boolean;
  /**
   * 固定列显示位置
   * @default left
   */
  fixed?: 'left' | 'right';
  /**
   * 列最小宽度
   */
  minWidth?: string | number;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<{ type: RenderType; row: T; rowIndex: number; col: BaseTableCol<T>; colIndex: number  }>;
  /**
   * 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render
   */
  title?: string | TNode<{ col: BaseTableCol; colIndex: number }>;
  /**
   * 列宽
   */
  width?: string | number;
};

export interface TdPrimaryTableProps<T extends DataType =  DataType> extends Omit<TdBaseTableProps<T>, 'columns'> {
  /**
   * 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容
   */
  asyncLoading?: string | TNode;
  /**
   * 列配置，泛型 T 指表格数据类型
   * @default []
   */
  columns?: Array<PrimaryTableCol<T>>;
  /**
   * 展开行内容，泛型 T 指表格数据类型
   */
  expandedRow?: TNode<{ row: T; index: number }>;
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
   * 是否允许点击行展开
   */
  expandOnRowClick?: boolean;
  /**
   * 自定义过滤图标
   */
  filterIcon?: TNode;
  /**
   * 过滤数据的值
   */
  filterValue?: FilterValue;
  /**
   * 过滤数据的值，非受控属性
   */
  defaultFilterValue?: FilterValue;
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
   * 用于控制是否显示展开图标，支持自定义图标
   * @default true
   */
  showExpandArrow?: boolean | TNode;
  /**
   * 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序
   */
  sort?: TableSort;
  /**
   * 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序，非受控属性
   */
  defaultSort?: TableSort;
  /**
   * 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型
   */
  onChange?: (data: TableChangeData, context: TableChangeContext<Array<T>>) => void;
  /**
   * 展开行发生变化时触发，泛型 T 指表格数据类型
   */
  onExpandChange?: (expandedRowKeys: Array<string | number>, options: ExpandOptions<T>) => void;
  /**
   * 过滤参数发生变化时触发，泛型 T 指表格数据类型
   */
  onFilterChange?: (filterValue: FilterValue, context: { col: PrimaryTableCol<T> }) => void;
  /**
   * 选中行发生变化时触发，泛型 T 指表格数据类型
   */
  onSelectChange?: (selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => void;
  /**
   * 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序
   */
  onSortChange?: (sort: SortInfo | Array<SortInfo>, options: SortOptions<T>) => void;
};

export interface PrimaryTableCol<T extends DataType = DataType> extends BaseTableCol {
  /**
   * 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型
   */
  cell?: string | TNode<{ row: T; rowIndex: number; col: PrimaryTableCol; colIndex: number }>;
  /**
   * 透传参数，colKey 值为 row-select 时，配置有效。具体定义参考 Checkbox 组件 和 Radio 组件。泛型 T 指表格数据类型
   */
  checkProps?: CheckProps<T>;
  /**
   * 是否禁用行选中，colKey 值为 row-select 时，配置有效
   */
  disabled?: (options: {row: T; rowIndex: number }) => boolean;
  /**
   * 过滤规则，支持多选(multiple)、单选(single)、输入框(input)三种形式。
   */
  filter?: Filter;
  /**
   * 自定义表头或单元格，泛型 T 指表格数据类型
   */
  render?: TNode<{ type: 'cell' | 'title'; row: T; rowIndex: number; col: PrimaryTableCol<T>; colIndex: number  }>;
  /**
   * 该列是否支持排序。值为 true 表示该列支持排序；值类型为函数，表示对本地数据 `data` 进行排序。泛型 T 指表格数据类型
   * @default false
   */
  sorter?: boolean | SorterFun<T>;
  /**
   * 当前列支持排序的方式
   * @default all
   */
  sortType?: SortType;
  /**
   * 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render
   */
  title?: string | TNode<{ col: PrimaryTableCol; colIndex: number }>;
  /**
   * 行选中有两种模式：单选和多选
   * @default single
   */
  type?: 'single' | 'multiple';
};

export interface RowspanColspan { colspan: number; rowspan: number };

export interface RowspanAndColspanParams<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number };

export interface RowEventContext<T> { row: T; index: number; e: MouseEvent };

export type DataType = { [key: string]: unknown };

export interface CellData<T> { type: 'th' | 'td'; row: T; col: BaseTableCol; rowIndex: number; colIndex: number };

export type RenderType = 'cell' | 'title';

export type FilterValue = Record<string, FilterItemValue>;

export type FilterItemValue = string | number | Array<string | number>;

export type TableSort = SortInfo | Array<SortInfo>;

export interface SortInfo { sortBy: string; descending: boolean };

export interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps };

export interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T };

export type TableChangeTrigger = 'filter' | 'sorter' | 'pagination';

export interface ExpandOptions<T> { expandedRowData: Array<T> };

export interface SelectOptions<T> { selectedRowData: Array<T> };

export interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol };

export type CheckProps<T> = CheckboxProps | RadioProps | ((options: { row: T; rowIndex: number }) => CheckboxProps | RadioProps);

export interface Filter { type: FilterType; list?: Array<OptionData>; props: FilterProps };

export type FilterType = 'input' | 'single' | 'multiple';

export type FilterProps = RadioProps | CheckboxProps | InputProps;

export type SorterFun<T> = (a: T, b: T, options: { sortType: SortType }) => SortNumber;

export type SortNumber = 1 | -1 | 0;

export type SortType = 'desc' | 'asc' | 'all';
