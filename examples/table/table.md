:: BASE_DOC ::

## API

### BaseTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | false | 是否显示表格边框 | N
columns | Array | [] | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<BaseTableCol<T>>` | N
data | Array | [] | 数据源，泛型 T 指表格数据类型。TS 类型：`Array<T>` | N
empty | String / Slot / Function | '' | 空表格呈现样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
expandedRow | String / Slot / Function | - | 展开行内容，可自定义，泛型 T 指表格数据类型。TS 类型：`string | TNode<{ row: T; index: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
height | String / Number | 'auto' | 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300px'。值为数字类型，会自动加上单位 px | N
hover | Boolean | false | 是否显示鼠标悬浮状态 | N
loading | Boolean / Slot / Function | false | 加载中状态。值为 true 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
maxHeight | String / Number | - | 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300px'。值为数字类型，会自动加上单位 px | N
pagination | Object | - | 分页配置，值为空则不显示。具体 API 参考分页组件。TS 类型：`PaginationProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
rowClassName | String / Object / Array / Function | - | 行类名，泛型 T 指表格数据类型。TS 类型：`ClassName | ((params: { row: T; rowIndex: number }) => ClassName)`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
rowKey | String | - | 必需。使用 rowKey 唯一标识一行数据 | Y
rowspanAndColspan | Function | - | 用于自定义合并单元格，泛型 T 指表格数据类型。TS 类型：`(params: RowspanAndColspanParams<T>) => RowspanColspan`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
size | String | medium | 表格尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
stripe | Boolean | false | 是否显示斑马纹 | N
tableLayout | String | fixed | 表格布局方式。可选项：auto/fixed | N
verticalAlign | String | middle | 行内容上下方向对齐。可选项：top/middle/bottom | N
onPageChange | Function |  | 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型。`(pageInfo: PageInfo, newDataSource: Array<T>) => {}` | N
onRowClick | Function |  | 行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(context: RowEventContext<T>) => {}` | N
onRowDbClick | Function |  | 行双击时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onRowHover | Function |  | 鼠标悬浮到行时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onRowMousedown | Function |  | 鼠标在表格行按下时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onRowMouseenter | Function |  | 鼠标在表格行进入时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onRowMouseleave | Function |  | 鼠标在表格行离开时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onRowMouseup | Function |  | 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型。`(context: RowEventContext<T>) => {}` | N
onScrollX | Function |  | 表格内容横向滚动时触发。`(params: { e: WheelEvent }) => {}` | N
onScrollY | Function |  | 表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。`(params: { e: WheelEvent }) => {}` | N

### BaseTable Events

名称 | 参数 | 描述
-- | -- | --
page-change | `(pageInfo: PageInfo, newDataSource: Array<T>)` | 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型
row-click | `(context: RowEventContext<T>)` | 行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
row-db-click | `(context: RowEventContext<T>)` | 行双击时触发，泛型 T 指表格数据类型
row-hover | `(context: RowEventContext<T>)` | 鼠标悬浮到行时触发，泛型 T 指表格数据类型
row-mousedown | `(context: RowEventContext<T>)` | 鼠标在表格行按下时触发，泛型 T 指表格数据类型
row-mouseenter | `(context: RowEventContext<T>)` | 鼠标在表格行进入时触发，泛型 T 指表格数据类型
row-mouseleave | `(context: RowEventContext<T>)` | 鼠标在表格行离开时触发，泛型 T 指表格数据类型
row-mouseup | `(context: RowEventContext<T>)` | 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型
scroll-x | `(params: { e: WheelEvent })` | 表格内容横向滚动时触发
scroll-y | `(params: { e: WheelEvent })` | 表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条

### BaseTableCol

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 列横向对齐方式。可选项：left/right/center | N
attrs | Object | - | 透传 HTML 属性到列元素 | N
cell | String / Function | - | 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型。TS 类型：`string | TNode<BaseTableCellParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
children | Array | - | 用于多级表头，泛型 T 指表格数据类型。TS 类型：`Array<BaseTableCol<T>>` | N
className | String / Object / Array / Function | - | 列类名，值类型是 Function 使用返回值作为列类名；值类型不为 Function 时，值用于整列类名（含表头）。泛型 T 指表格数据类型。TS 类型：`ClassName | ((context: CellData<T>) => ClassName)`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
colKey | String | - | 渲染列所需字段 | N
ellipsis | Boolean / Slot / Function | false | 内容超出时，是否显示省略号。值为 true ，则浮层默认显示单元格内容；值类型为 Function 则显示自定义内容。TS 类型：`boolean | TNode<BaseTableCellParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
fixed | String | left | 固定列显示位置。可选项：left/right | N
minWidth | String / Number | - | 列最小宽度 | N
render | Function | - | 自定义表头或单元格，泛型 T 指表格数据类型。TS 类型：`TNode<BaseTableRenderParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
title | String / Function | - | 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render。TS 类型：`string | TNode<{ col: BaseTableCol; colIndex: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
width | String / Number | - | 列宽 | N

### PrimaryTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容。TS 类型：`'loading' | 'load-more' | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
columns | Array | [] | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<PrimaryTableCol<T>>` | N
expandedRow | String / Slot / Function | - | 展开行内容，泛型 T 指表格数据类型。TS 类型：`TNode<{ row: T; index: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
expandedRowKeys | Array | [] | 展开行。支持语法糖。TS 类型：`Array<string | number>` | N
defaultExpandedRowKeys | Array | [] | 展开行。非受控属性。TS 类型：`Array<string | number>` | N
expandIcon | Boolean / Slot / Function | true | 用于控制是否显示「展开图标列」，值为 false 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容，示例：`(h, { index }) => index === 0 ? false : <icon class='custom-icon' />`。expandedRow 存在时，该参数有效。TS 类型：`TNode<ExpandArrowRenderParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
expandOnRowClick | Boolean | - | 是否允许点击行展开 | N
filterIcon | Slot / Function | - | 自定义过滤图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
filterValue | Object | - | 过滤数据的值。支持语法糖。TS 类型：`FilterValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
defaultFilterValue | Object | - | 过滤数据的值。非受控属性。TS 类型：`FilterValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
multipleSort | Boolean | false | 是否支持多列排序 | N
selectedRowKeys | Array | - | 选中的行，控制属性。支持语法糖。TS 类型：`Array<string | number>` | N
defaultSelectedRowKeys | Array | - | 选中的行，控制属性。非受控属性。TS 类型：`Array<string | number>` | N
showColumnController | Boolean | false | 【开发中】是否显示 自定义显示列控制器 | N
showDragCol | Boolean | false | 【开发中】是否显示为通过拖拽图标进行排序 | N
sort | Object / Array | - | 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。支持语法糖。TS 类型：`TableSort`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
defaultSort | Object / Array | - | 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。非受控属性。TS 类型：`TableSort`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
sortOnRowDraggable | Boolean | false | 允许表格行拖拽时排序 | N
`Omit<BaseTableProps<T>, 'columns'>` | - | - | 继承 `Omit<BaseTableProps<T>, 'columns'>` 中的全部 API | N
onAsyncLoadingClick | Function |  | 异步加载区域被点击时触发。`(context: { status: 'loading' | 'load-more' }) => {}` | N
onChange | Function |  | 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(data: TableChangeData, context: TableChangeContext<Array<T>>) => {}` | N
onDataChange | Function |  | 表格数据发生变化时触发，比如：本地排序方法 sorter。`(data: Array<T>) => {}` | N
onDragSort | Function |  | 拖拽排序时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(context: DragSortContext<T>) => {}` | N
onExpandChange | Function |  | 展开行发生变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(expandedRowKeys: Array<string | number>, options: ExpandOptions<T>) => {}` | N
onFilterChange | Function |  | 过滤参数发生变化时触发，泛型 T 指表格数据类型。`(filterValue: FilterValue, context: { col: PrimaryTableCol<T> }) => {}` | N
onSelectChange | Function |  | 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => {}` | N
onSortChange | Function |  | 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)。`(sort: TableSort, options: SortOptions<T>) => {}` | N

### PrimaryTable Events

名称 | 参数 | 描述
-- | -- | --
async-loading-click | `(context: { status: 'loading' | 'load-more' })` | 异步加载区域被点击时触发
change | `(data: TableChangeData, context: TableChangeContext<Array<T>>)` | 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
data-change | `(data: Array<T>)` | 表格数据发生变化时触发，比如：本地排序方法 sorter
drag-sort | `(context: DragSortContext<T>)` | 拖拽排序时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
expand-change | `(expandedRowKeys: Array<string | number>, options: ExpandOptions<T>)` | 展开行发生变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
filter-change | `(filterValue: FilterValue, context: { col: PrimaryTableCol<T> })` | 过滤参数发生变化时触发，泛型 T 指表格数据类型
select-change | `(selectedRowKeys: Array<string | number>, options: SelectOptions<T>)` | 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
sort-change | `(sort: TableSort, options: SortOptions<T>)` | 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)

### PrimaryTableCol

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
addToColumnController | Boolean | true | 【开发中】是否允许用户选择是否显示当前列，表格属性 `showColumnController` 为真时有效 | N
cell | String / Function | - | 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型。TS 类型：`string | TNode<PrimaryTableCellParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
checkProps | Object | - | 透传参数，colKey 值为 row-select 时，配置有效。具体定义参考 Checkbox 组件 和 Radio 组件。泛型 T 指表格数据类型。TS 类型：`CheckProps<T>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
disabled | Function | - | 是否禁用行选中，colKey 值为 row-select 时，配置有效。TS 类型：`(options: {row: T; rowIndex: number }) => boolean` | N
filter | Object | - | 过滤规则，支持多选(multiple)、单选(single)、输入框(input) 等三种形式。想要自定义过滤组件，可通过 `filter.component` 实现，示例：`(h) => <date-picker></date-picker>`，自定义过滤组件需要包含参数 value 和事件 change。TS 类型：`Filter`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
render | Function | - | 自定义表头或单元格，泛型 T 指表格数据类型。TS 类型：`TNode<PrimaryTableRenderParams<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
sorter | Boolean / Function | false | 该列是否支持排序。值为 true 表示该列支持排序；值类型为函数，表示对本地数据 `data` 进行排序。泛型 T 指表格数据类型。TS 类型：`boolean | SorterFun<T>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
sortType | String | all | 当前列支持排序的方式，desc 表示当前列只能进行降序排列；asc 表示当前列只能进行升序排列；all 表示当前列既可升序排列，又可以降序排列。可选项：desc/asc/all。TS 类型：`SortType`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N
title | String / Function | - | 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render。TS 类型：`string | TNode<{ col: PrimaryTableCol; colIndex: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
type | String | single | 行选中有两种模式：单选和多选。可选项：single/multiple | N
`Omit<BaseTableCol, 'cell' | 'title' | 'render'>` | - | - | 继承 `Omit<BaseTableCol, 'cell' | 'title' | 'render'>` 中的全部 API | N

### EnhancedTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
tree | Object | - | 树形结构相关配置。`tree.indent` 表示树结点缩进距离，单位：px，默认为 24px。`tree.treeNodeColumnIndex` 表示树结点在第几列渲染，默认为 0 ，第一列。`tree.childrenKey` 表示树形结构子节点字段，默认为 children。`tree.checkStrictly` 表示树形结构的行选中（多选），父子行选中是否独立，默认独立，值为 true。TS 类型：`TableTreeConfig`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts) | N

### EnhancedTableInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
getData | `(key: TableRowValue)` | `TableRowState<T>` | 必需。树形结构中，用于获取行数据所有信息。泛型 `T` 表示行数据类型。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/table/type.ts)
remove | `(key: TableRowValue)` | - | 必需。树形结构中，移除指定节点
setData | `(key: TableRowValue, newRowData: T)` | - | 必需。树形结构中，用于更新行数据。泛型 `T` 表示行数据类型

### TableRowState

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 表格行是否禁用选中 | N
expandChildrenLength | Number | - | 当前节点展开的子节点数量 | N
expanded | Boolean | false | 必需。表格行是否展开 | Y
level | Number | - | 当前节点层级。TS 类型：`number` | N
parent | - | - | 父节点。TS 类型：`TableRowState<T>` | N
path | Array | - | 当前节点路径。TS 类型：`TableRowState<T>[]` | N
row | - | - | 必需。原始表格行数据。TS 类型：`T` | Y
rowIndex | Number | - | 必需。表格行下标 | Y
