:: BASE_DOC ::

## API
### BaseTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowResizeColumnWidth | Boolean | false | 是否允许调整列宽 | N
bordered | Boolean | false | 是否显示表格边框 | N
bottomContent | String / Slot / Function | - | 表格底部内容，可以用于自定义列设置等。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
columns | Array | [] | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<BaseTableCol<T>>` | N
data | Array | [] | 数据源，泛型 T 指表格数据类型。TS 类型：`Array<T>` | N
disableDataPage | Boolean | false | 是否禁用本地数据分页。当 `data` 数据长度超过分页大小时，会自动进行本地数据分页。如果 `disableDataPage` 设置为 true，则无论何时，都不会进行本地数据分页 | N
empty | String / Slot / Function | '' | 空表格呈现样式，支持全局配置 `GlobalConfigProvider`。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
firstFullRow | String / Slot / Function | - | 首行内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
fixedRows | Array | - | 固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行。TS 类型：`Array<number>` | N
footData | Array | [] | 表尾数据源，泛型 T 指表格数据类型。TS 类型：`Array<T>` | N
footerAffixedBottom | Boolean | false | 表尾吸底 | N
footerAffixProps | Object | - | 表尾吸底基于 Affix 组件开发，透传全部 Affix 组件属性。TS 类型：`AffixProps` | N
headerAffixedTop | Boolean | false | 表头吸顶 | N
headerAffixProps | Object | - | 表头吸顶基于 Affix 组件开发，透传全部 Affix 组件属性。TS 类型：`AffixProps`，[Affix API Documents](./affix?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
height | String / Number | - | 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight` | N
hover | Boolean | false | 是否显示鼠标悬浮状态 | N
lastFullRow | String / Slot / Function | - | 尾行内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean / Slot / Function | undefined | 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loadingProps | Object | - | 透传加载组件全部属性。TS 类型：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
maxHeight | String / Number | - | 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px | N
pagination | Object | - | 分页配置，值为空则不显示。具体 API 参考分页组件。当 `data` 数据长度超过分页大小时，会自动对本地数据 `data` 进行排序，如果不希望对于 `data` 进行排序，可以设置 `disableDataPage = true`。TS 类型：`PaginationProps`，[Pagination API Documents](./pagination?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowAttributes | Object / Array / Function | - | HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: '超出省略显示' }]。<br /> 示例三：() => [{ draggable: true }]。TS 类型：`TableRowAttributes<T>` `type TableRowAttributes<T> = HTMLElementAttributes | ((params: { row: T; rowIndex: number; type: 'body' | 'foot' }) => HTMLElementAttributes) | Array<TableRowAttributes<T>>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowClassName | String / Object / Array / Function | - | 行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type=body` 表示类名作用于 `tfoot` 中的元素。TS 类型：`ClassName | ((params: RowClassNameParams<T>) => ClassName)` `interface RowClassNameParams<T> { row: T; rowIndex: number; type?: 'body' | 'foot' }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowKey | String | 'id' | 必需。使用 rowKey 唯一标识一行数据 | Y
rowspanAndColspan | Function | - | 用于自定义合并单元格，泛型 T 指表格数据类型。示例：`({ row, col, rowIndex, colIndex }) => { rowspan: 2, colspan: 3 }`。TS 类型：`TableRowspanAndColspanFunc<T>` `type TableRowspanAndColspanFunc<T> = (params: BaseTableCellParams<T>) => RowspanColspan` `interface RowspanColspan { colspan?: number; rowspan?: number }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
scroll | Object | - | 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。TS 类型：`TableScroll` | N
size | String | medium | 表格尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
stripe | Boolean | false | 是否显示斑马纹 | N
tableContentWidth | String | - | 表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度 | N
tableLayout | String | fixed | 表格布局方式。可选项：auto/fixed | N
topContent | String / Slot / Function | - | 表格顶部内容，可以用于自定义列设置、顶部查询条件等。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
verticalAlign | String | middle | 行内容上下方向对齐。可选项：top/middle/bottom | N
onCellClick | Function |  | TS 类型：`(context: BaseTableCellEventContext<T>) => void`<br/>单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onPageChange | Function |  | TS 类型：`(pageInfo: PageInfo, newDataSource: Array<T>) => void`<br/>分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型 | N
onRowClick | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/> | N
onRowDblclick | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>行双击时触发，泛型 T 指表格数据类型 | N
onRowMousedown | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>鼠标在表格行按下时触发，泛型 T 指表格数据类型 | N
onRowMouseenter | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>鼠标在表格行进入时触发，泛型 T 指表格数据类型 | N
onRowMouseleave | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>鼠标在表格行离开时触发，泛型 T 指表格数据类型 | N
onRowMouseover | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>鼠标悬浮到行时触发，泛型 T 指表格数据类型 | N
onRowMouseup | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型 | N
onScroll | Function |  | TS 类型：`(params: { e: WheelEvent }) => void`<br/>表格内容滚动时触发 | N
onScrollX | Function |  | TS 类型：`(params: { e: WheelEvent }) => void`<br/>已废弃。表格内容横向滚动时触发。请更为使用 `onScroll` 事件 | N
onScrollY | Function |  | TS 类型：`(params: { e: WheelEvent }) => void`<br/>已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 `onScroll` 事件 | N

### BaseTable Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: BaseTableCellEventContext<T>)` | 单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
page-change | `(pageInfo: PageInfo, newDataSource: Array<T>)` | 分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型
row-click | `(context: RowEventContext<T>)` | 行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/>
row-dblclick | `(context: RowEventContext<T>)` | 行双击时触发，泛型 T 指表格数据类型
row-mousedown | `(context: RowEventContext<T>)` | 鼠标在表格行按下时触发，泛型 T 指表格数据类型
row-mouseenter | `(context: RowEventContext<T>)` | 鼠标在表格行进入时触发，泛型 T 指表格数据类型
row-mouseleave | `(context: RowEventContext<T>)` | 鼠标在表格行离开时触发，泛型 T 指表格数据类型
row-mouseover | `(context: RowEventContext<T>)` | 鼠标悬浮到行时触发，泛型 T 指表格数据类型
row-mouseup | `(context: RowEventContext<T>)` | 鼠标在表格行按下又弹起时触发，泛型 T 指表格数据类型
scroll | `(params: { e: WheelEvent })` | 表格内容滚动时触发
scroll-x | `(params: { e: WheelEvent })` | 已废弃。表格内容横向滚动时触发。请更为使用 `onScroll` 事件
scroll-y | `(params: { e: WheelEvent })` | 已废弃。表格内容纵向滚动时触发。当内容超出高度(height)或最大高度(max-height)时，会出现纵向滚动条。请更为使用 `onScroll` 事件

### BaseTableCol

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 列横向对齐方式。可选项：left/right/center | N
attrs | Object | - | 透传 HTML 属性到列元素 | N
cell | String / Function | - | 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型。TS 类型：`string | TNode<BaseTableCellParams<T>>` `interface BaseTableCellParams<T> { row: T; rowIndex: number; col: BaseTableCol<T>; colIndex: number }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
children | Array | - | 用于多级表头，泛型 T 指表格数据类型。TS 类型：`Array<BaseTableCol<T>>` | N
className | String / Object / Array / Function | - | 列类名，值类型是 Function 使用返回值作为列类名；值类型不为 Function 时，值用于整列类名（含表头）。泛型 T 指表格数据类型。TS 类型：`ClassName | ((context: CellData<T>) => ClassName)` `interface CellData<T> extends BaseTableCellParams<T> { type: 'th' | 'td' }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
colKey | String | - | 渲染列所需字段 | N
ellipsis | Boolean / Object / Slot / Function | false | 单元格和表头内容超出时，是否显示省略号。如果仅希望单元格超出省略，可设置 `ellipsisTitle = false`。<br/> 值为 `true`，则浮层默认显示单元格内容；<br/>值类型为 `Function` 则自定义浮层显示内容；<br/>值类型为 `Object`，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性。TS 类型：`boolean | TNode<BaseTableCellParams<T>> | PopupProps`，[Popup API Documents](./popup?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
ellipsisTitle | Boolean / Object / Slot / Function | undefined | 表头内容超出时，是否显示省略号。优先级高于 `ellipsis`。<br/>值为 `true`，则浮层默认显示表头全部内容；<br/>值类型为 `Function` 则自定义浮层显示表头内容；<br/>值类型为 `Object`，则自动透传属性到 Popup 组件，可用于调整浮层方向等特性。TS 类型：`boolean | TNode<BaseTableColParams<T>> | PopupProps` `interface BaseTableColParams<T> { col: BaseTableCol<T>; colIndex: number }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
fixed | String | left | 固定列显示位置。可选项：left/right | N
foot | String / Function | - | 自定义表尾表尾。值类型为 Function 表示以函数形式渲染表尾内容。值类型为 string 表示使用插槽渲染，插槽名称为 `foot` 值。TS 类型：`string | TNode<{ col: BaseTableCol; colIndex: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
render | Function | - | 自定义表头或单元格，泛型 T 指表格数据类型。TS 类型：`TNode<BaseTableRenderParams<T>>` `interface BaseTableRenderParams<T> extends BaseTableCellParams<T> { type: RenderType }` `type RenderType = 'cell' | 'title'`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
title | String / Function | - | 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render。TS 类型：`string | TNode<{ col: BaseTableCol; colIndex: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
width | String / Number | - | 列宽，可以作为最小宽度使用。当列宽总和小于 `table` 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 `table` 元素，表现为定宽。可以同时调整 `table` 元素的宽度来达到自己想要的效果 | N

### PrimaryTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容。TS 类型：`'loading' | 'load-more' | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
columnController | Object | - | 自定义显示列控制器，值为空不会显示。具体属性请看下方 `TableColumnController` 文档。TS 类型：`TableColumnController` | N
columnControllerVisible | Boolean | undefined | 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制。支持语法糖 `v-model:columnControllerVisible` | N
defaultColumnControllerVisible | Boolean | undefined | 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制。非受控属性 | N
columns | Array | [] | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<PrimaryTableCol<T>>` | N
displayColumns | Array | - | 列配置功能中，当前显示的列。支持语法糖 `v-model:displayColumns`。TS 类型：`CheckboxGroupValue` | N
defaultDisplayColumns | Array | - | 列配置功能中，当前显示的列。非受控属性。TS 类型：`CheckboxGroupValue` | N
dragSort | String | - | 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过专门的 拖拽手柄 进行 行拖拽排序。值为 `col` 表示列顺序拖拽。`drag-col` 已废弃，请勿使用。可选项：row/row-handler/col/drag-col | N
dragSortOptions | Object | - | 拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable)。TS 类型：`SortableOptions` | N
expandedRow | String / Slot / Function | - | 展开行内容，泛型 T 指表格数据类型。TS 类型：`TNode<TableExpandedRowParams<T>>` `interface TableExpandedRowParams<T> { row: T; index: number; columns: PrimaryTableCol<T>[] | BaseTableCol<T>[] }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
expandedRowKeys | Array | [] | 展开行。支持语法糖 `v-model:expandedRowKeys`。TS 类型：`Array<string | number>` | N
defaultExpandedRowKeys | Array | [] | 展开行。非受控属性。TS 类型：`Array<string | number>` | N
expandIcon | Boolean / Slot / Function | true | 用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider`。TS 类型：`boolean | TNode<ExpandArrowRenderParams<T>>` `interface ExpandArrowRenderParams<T> { row: T; index: number }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
expandOnRowClick | Boolean | - | 是否允许点击行展开 | N
filterIcon | Slot / Function | - | 自定义过滤图标，支持全局配置 `GlobalConfigProvider`。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterRow | String / Slot / Function | - | 自定义过滤状态行及清空筛选等。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterValue | Object | - | 过滤数据的值。支持语法糖 `v-model:filterValue`。TS 类型：`FilterValue` `type FilterValue = { [key: string]: any }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
defaultFilterValue | Object | - | 过滤数据的值。非受控属性。TS 类型：`FilterValue` `type FilterValue = { [key: string]: any }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
hideSortTips | Boolean | - | 隐藏排序文本提示，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `false` | N
multipleSort | Boolean | false | 是否支持多列排序 | N
selectedRowKeys | Array | - | 选中的行，控制属性。支持语法糖 `v-model:selectedRowKeys`。TS 类型：`Array<string | number>` | N
defaultSelectedRowKeys | Array | - | 选中的行，控制属性。非受控属性。TS 类型：`Array<string | number>` | N
sort | Object / Array | - | 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。支持语法糖 `v-model:sort`。TS 类型：`TableSort` `type TableSort = SortInfo | Array<SortInfo>` `interface SortInfo { sortBy: string; descending: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
defaultSort | Object / Array | - | 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序。非受控属性。TS 类型：`TableSort` `type TableSort = SortInfo | Array<SortInfo>` `interface SortInfo { sortBy: string; descending: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sortIcon | Slot / Function | - | 自定义排序图标，支持全局配置 `GlobalConfigProvider`。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
sortOnRowDraggable | Boolean | false | 已废弃。允许表格行拖拽时排序。请更为使用 `dragSort="row"` | N
`Omit<BaseTableProps<T>, 'columns' | 'onCellClick'>` | \- | - | 继承 `Omit<BaseTableProps<T>, 'columns' | 'onCellClick'>` 中的全部 API | N
onAsyncLoadingClick | Function |  | TS 类型：`(context: { status: 'loading' | 'load-more' }) => void`<br/>异步加载区域被点击时触发 | N
onCellClick | Function |  | TS 类型：`(context: PrimaryTableCellEventContext<T>) => void`<br/>单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableCellEventContext<T> { row: T; col: PrimaryTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onChange | Function |  | TS 类型：`(data: TableChangeData, context: TableChangeContext<T>) => void`<br/>分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps }`<br/><br/>`interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T[] }`<br/><br/>`type TableChangeTrigger = 'filter' | 'sorter' | 'pagination'`<br/> | N
onColumnChange | Function |  | TS 类型：`(context: PrimaryTableColumnChange<T>) => void`<br/>确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableColumnChange<T> { columns?: CheckboxGroupValue; currentColumn?: PrimaryTableCol<T>; type?: 'check' | 'uncheck'; e?: Event }`<br/> | N
onColumnControllerVisibleChange | Function |  | TS 类型：`(visible: boolean, context: { trigger: 'cancel' | 'confirm' }) => void`<br/>列配置弹窗显示或隐藏变化时触发 | N
onDataChange | Function |  | TS 类型：`(data: Array<T>, context: TableDataChangeContext) => void`<br/>本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableDataChangeContext { trigger: 'sort' }`<br/> | N
onDisplayColumnsChange | Function |  | TS 类型：`(value: CheckboxGroupValue) => void`<br/>确认列配置时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`import { CheckboxGroupValue } from '@Checkbox'`<br/> | N
onDragSort | Function |  | TS 类型：`(context: DragSortContext<T>) => void`<br/>拖拽排序时触发，`currentData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface DragSortContext<T> { currentIndex: number; current: T; targetIndex: number; target: T; currentData: T[]; e: SortableEvent; sort: 'row' | 'col' }`<br/><br/>`import { SortableEvent, SortableOptions } from 'sortablejs'`<br/> | N
onExpandChange | Function |  | TS 类型：`(expandedRowKeys: Array<string | number>, options: ExpandOptions<T>) => void`<br/>展开行发生变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ExpandOptions<T> { expandedRowData: Array<T> }`<br/> | N
onFilterChange | Function |  | TS 类型：`(filterValue: FilterValue, context: { col?: PrimaryTableCol<T> }) => void`<br/>过滤参数发生变化时触发，泛型 T 指表格数据类型 | N
onSelectChange | Function |  | TS 类型：`(selectedRowKeys: Array<string | number>, options: SelectOptions<T>) => void`<br/>选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SelectOptions<T> { selectedRowData: Array<T>; type: 'uncheck' | 'check'; currentRowKey?: string; currentRowData?: T }`<br/> | N
onSortChange | Function |  | TS 类型：`(sort: TableSort, options: SortOptions<T>) => void`<br/>排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol }`<br/> | N

### PrimaryTable Events

名称 | 参数 | 描述
-- | -- | --
async-loading-click | `(context: { status: 'loading' | 'load-more' })` | 异步加载区域被点击时触发
cell-click | `(context: PrimaryTableCellEventContext<T>)` | 单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableCellEventContext<T> { row: T; col: PrimaryTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
change | `(data: TableChangeData, context: TableChangeContext<T>)` | 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps }`<br/><br/>`interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T[] }`<br/><br/>`type TableChangeTrigger = 'filter' | 'sorter' | 'pagination'`<br/>
column-change | `(context: PrimaryTableColumnChange<T>)` | 确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableColumnChange<T> { columns?: CheckboxGroupValue; currentColumn?: PrimaryTableCol<T>; type?: 'check' | 'uncheck'; e?: Event }`<br/>
column-controller-visible-change | `(visible: boolean, context: { trigger: 'cancel' | 'confirm' })` | 列配置弹窗显示或隐藏变化时触发
data-change | `(data: Array<T>, context: TableDataChangeContext)` | 本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableDataChangeContext { trigger: 'sort' }`<br/>
display-columns-change | `(value: CheckboxGroupValue)` | 确认列配置时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`import { CheckboxGroupValue } from '@Checkbox'`<br/>
drag-sort | `(context: DragSortContext<T>)` | 拖拽排序时触发，`currentData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface DragSortContext<T> { currentIndex: number; current: T; targetIndex: number; target: T; currentData: T[]; e: SortableEvent; sort: 'row' | 'col' }`<br/><br/>`import { SortableEvent, SortableOptions } from 'sortablejs'`<br/>
expand-change | `(expandedRowKeys: Array<string | number>, options: ExpandOptions<T>)` | 展开行发生变化时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ExpandOptions<T> { expandedRowData: Array<T> }`<br/>
filter-change | `(filterValue: FilterValue, context: { col?: PrimaryTableCol<T> })` | 过滤参数发生变化时触发，泛型 T 指表格数据类型
select-change | `(selectedRowKeys: Array<string | number>, options: SelectOptions<T>)` | 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SelectOptions<T> { selectedRowData: Array<T>; type: 'uncheck' | 'check'; currentRowKey?: string; currentRowData?: T }`<br/>
sort-change | `(sort: TableSort, options: SortOptions<T>)` | 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol }`<br/>

### PrimaryTableCol

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cell | String / Function | - | 自定义单元格渲染。值类型为 Function 表示以函数形式渲染单元格。值类型为 string 表示使用插槽渲染，插槽名称为 cell 的值。默认使用 colKey 作为插槽名称。优先级高于 render。泛型 T 指表格数据类型。TS 类型：`string | TNode<PrimaryTableCellParams<T>>` `interface PrimaryTableCellParams<T> { row: T; rowIndex: number; col: PrimaryTableCol<T>; colIndex: number }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
checkProps | Object / Function | - | 透传参数，`colKey` 值为 `row-select` 时，配置有效。具体定义参考 Checkbox 组件 和 Radio 组件。泛型 T 指表格数据类型。TS 类型：`CheckProps<T>` `type CheckProps<T> = CheckboxProps | RadioProps | ((options: { row: T; rowIndex: number }) => CheckboxProps | RadioProps)` `import { CheckboxProps } from '@Checkbox'`，[Radio API Documents](./radio?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
children | Array | - | 用于多级表头，泛型 T 指表格数据类型。TS 类型：`Array<PrimaryTableCol<T>>` | N
colKey | String | - | 渲染列所需字段，必须唯一。值为 `row-select` 表示当前列为行选中操作列。值为 `drag` 表示当前列为拖拽排序操作列 | N
disabled | Function | - | 是否禁用行选中，`colKey` 值为 `row-select` 时，配置有效。TS 类型：`(options: {row: T; rowIndex: number }) => boolean` | N
edit | Object | - | 可编辑单元格配置项，具体属性参考文档 `TableEditableCellConfig` 描述。TS 类型：`TableEditableCellConfig<T>` | N
filter | Object | - | 过滤规则，支持多选(multiple)、单选(single)、输入框(input) 等三种形式。想要自定义过滤组件，可通过 `filter.component` 实现，自定义过滤组件需要包含参数 value 和事件 change。TS 类型：`TableColumnFilter` | N
render | Function | - | 自定义表头或单元格，泛型 T 指表格数据类型。TS 类型：`TNode<PrimaryTableRenderParams<T>>` `interface PrimaryTableRenderParams<T> extends PrimaryTableCellParams<T> { type: RenderType }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sorter | Boolean / Function | false | 该列是否支持排序。值为 true 表示该列支持排序；值类型为函数，表示对本地数据 `data` 进行排序，返回值参考 [MDN Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。泛型 T 指表格数据类型。TS 类型：`boolean | SorterFun<T>` `type SorterFun<T> = (a: T, b: T) => number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sortType | String | all | 当前列支持排序的方式，desc 表示当前列只能进行降序排列；asc 表示当前列只能进行升序排列；all 表示当前列既可升序排列，又可以降序排列。可选项：desc/asc/all。TS 类型：`SortType` `type SortType = 'desc' | 'asc' | 'all'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
title | String / Function | - | 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示使用插槽渲染，插槽名称为 title 的值。优先级高于 render。TS 类型：`string | TNode<{ col: PrimaryTableCol; colIndex: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
type | String | single | `colKey` 值为 `row-select` 时表示行选中列，有两种模式：单选和多选。 `type=single` 表示单选，`type=multiple` 表示多选。可选项：single/multiple | N
`Omit<BaseTableCol, 'cell' | 'title' | 'render' | 'children'>` | \- | - | 继承 `Omit<BaseTableCol, 'cell' | 'title' | 'render' | 'children'>` 中的全部 API | N

### EnhancedTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
beforeDragSort | Function | - | 树形结构中，拖拽排序前控制，返回值为 `true` 则继续排序；返回值为 `false` 则中止排序还原数据。TS 类型：`(context: DragSortContext<T>) => boolean` | N
tree | Object | - | 树形结构相关配置。具体属性文档查看 `TableTreeConfig` 相关描述。TS 类型：`TableTreeConfig` | N
treeExpandAndFoldIcon | Function | - | 自定义树形结构展开图标，支持全局配置 `GlobalConfigProvider`。TS 类型：`TNode<{ type: 'expand' | 'fold' }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
`PrimaryTableProps<T>` | \- | - | 继承 `PrimaryTableProps<T>` 中的全部 API | N
onAbnormalDragSort | Function |  | TS 类型：`(context: TableAbnormalDragSortContext<T>) => void`<br/>异常拖拽排序时触发，如：树形结构中，非同层级之间的交换。`context.code` 指交换异常错误码，固定值；`context.reason` 指交换异常的原因。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableAbnormalDragSortContext<T> { code: number; reason: string }`<br/> | N
onTreeExpandChange | Function |  | TS 类型：`(context: TableTreeExpandChangeContext<T>) => void`<br/>树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T>; trigger?: 'expand-fold-icon' }`<br/> | N

### EnhancedTable Events

名称 | 参数 | 描述
-- | -- | --
abnormal-drag-sort | `(context: TableAbnormalDragSortContext<T>)` | 异常拖拽排序时触发，如：树形结构中，非同层级之间的交换。`context.code` 指交换异常错误码，固定值；`context.reason` 指交换异常的原因。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableAbnormalDragSortContext<T> { code: number; reason: string }`<br/>
tree-expand-change | `(context: TableTreeExpandChangeContext<T>)` | 树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T>; trigger?: 'expand-fold-icon' }`<br/>

### EnhancedTableInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
expandAll | \- | \- | 必需。展开全部行
foldAll | \- | \- | 必需。折叠全部行
getData | `(key: TableRowValue)` | `TableRowState<T>` | 必需。树形结构中，用于获取行数据所有信息。泛型 `T` 表示行数据类型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type TableRowValue = string | number`<br/>
remove | `(key: TableRowValue)` | \- | 必需。树形结构中，移除指定节点
setData | `(key: TableRowValue, newRowData: T)` | \- | 必需。树形结构中，用于更新行数据。泛型 `T` 表示行数据类型
toggleExpandData | `(p: { row: T,  rowIndex: number})` | \- | 必需。展开或收起树形行

### TableRowState

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 表格行是否禁用选中 | N
expandChildrenLength | Number | - | 当前节点展开的子节点数量 | N
expanded | Boolean | false | 必需。表格行是否展开 | Y
id | String / Number | - | 必需。唯一标识 | Y
level | Number | - | 当前节点层级。TS 类型：`number` | N
parent | \- | - | 父节点。TS 类型：`TableRowState<T>` | N
path | Array | - | 当前节点路径。TS 类型：`TableRowState<T>[]` | N
row | \- | - | 必需。原始表格行数据。TS 类型：`T` | Y
rowIndex | Number | - | 必需。表格行下标，值为 `-1` 标识当前行未展开显示 | Y

### TableColumnFilter

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
component | Slot / Function | - | 用于自定义筛选器，只要保证自定义筛选器包含 value 属性 和 change 事件，即可像内置筛选器一样正常使用。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
list | Array | - | 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 `single` 或 `multiple` 时有效。TS 类型：`Array<OptionData>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
props | Array | - | 用于透传筛选器属性，可以对筛选器进行任何原组件支持的属性配置。TS 类型：`FilterProps` `type FilterProps = RadioProps | CheckboxProps | InputProps | { [key: string]: any }`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
resetValue | \- | - | 重置时设置的值，示例：'' 或 []。TS 类型：`any` | N
showConfirmAndReset | Boolean | false | 是否显示重置和确认。值为真，过滤事件（filter-change）会在确定时触发；值为假，则数据变化时会立即触发过滤事件 | N
type | String | - | 用于设置筛选器类型：单选按钮筛选器、复选框筛选器、输入框筛选器。TS 类型：`FilterType` `type FilterType = 'input' | 'single' | 'multiple'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N

### TableScroll

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bufferSize | Number | 20 | 表示表格除可视区域外，额外渲染的行数，避免表格快速滚动过程中，新出现的内容来不及渲染从而出现空白 | N
isFixedRowHeight | Boolean | false | 表示表格每行内容是否同一个固定高度，仅在 `scroll.type` 为 `virtual` 时有效，该属性设置为 `true` 时，可用于简化虚拟滚动内部计算逻辑，提升性能，此时则需要明确指定 `scroll.rowHeight` 属性的值 | N
rowHeight | Number | - | 表格的行高，不会给`<tr>`元素添加样式高度，仅作为滚动时的行高参考。一般情况不需要设置该属性。如果设置，可尽量将该属性设置为表格每行平均高度，从而使得表格滚动过程更加平滑 | N
threshold | Number | 100 | 启动虚拟滚动的阈值。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动 | N
type | String | - | 必需。表格滚动加载类型，有两种：懒加载和虚拟滚动。<br />值为 `lazy` ，表示表格滚动时会进行懒加载，非可视区域内的表格内容将不会默认渲染，直到该内容可见时，才会进行渲染，并且已渲染的内容滚动到不可见时，不会被销毁；<br />值为`virtual`时，表示表格会进行虚拟滚动，无论滚动条滚动到哪个位置，同一时刻，表格仅渲染该可视区域内的表格内容，当表格需要展示的数据量较大时，建议开启该特性。可选项：lazy/virtual | Y

### TableColumnController

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
buttonProps | Object | - | 自定义列配置按钮，包括 Button 组件的全部属性。比如：按钮颜色和文本。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
checkboxProps | Object | - | 透传复选框组件全部特性。TS 类型：`CheckboxGroupProps`，[Checkbox API Documents](./checkbox?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
dialogProps | Object | - | 透传弹框组件全部特性，如：防止滚动穿透。TS 类型：`DialogProps`，[Dialog API Documents](./dialog?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
displayType | String | auto-width | 指列配置弹框中，各列的字段平铺方式：`fixed-width` 表示固定宽度，每行固定数量，横向和纵向均对齐，`auto-width` 表示宽度随列标题数量自由显示，横向铺满，纵向不要求对齐。可选项：fixed-width/auto-width | N
fields | Array | - | 用于设置允许用户对哪些列进行显示或隐藏的控制，默认为全部字段。TS 类型：`string[]` | N
hideTriggerButton | Boolean | false | 是否隐藏表格组件内置的“列配置”按钮 | N
placement | String | top-right | 列配置按钮基于表格的放置位置：左上角、右上角、左下角、右下角等。可选项：top-left/top-right/bottom-left/bottom-right | N

### TableEditableCellConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
abortEditOnEvent | Array | - | 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态。示例：`abortEditOnEvent: ['onChange']`。TS 类型：`string[]` | N
component | \- | - | 组件定义，如：`Input` `Select`。TS 类型：`ComponentType`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onEdited | Function | - | 编辑完成后，退出编辑模式时触发。TS 类型：`(context: { trigger: string; newRowData: T; rowIndex: number }) => void` | N
props | Object | - | 透传给组件 `edit.component` 的属性。TS 类型：`{ [key: string]: any }` | N
rules | Array | - | 校验规则。TS 类型：`FormRule[]`，[Form API Documents](./form?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N

### TableTreeConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checkStrictly | Boolean | true | 表示树形结构的行选中（多选），父子行选中是否独立 | N
childrenKey | String | children | 树形结构子节点字段，示例：`childrenKey='list'`。一般应用在数据 `data` 的子节点字段不是 `children` 的场景 | N
defaultExpandAll | Boolean | false | 是否默认展开全部，仅默认情况有效。如果希望自由控制树形结构的展开或收起，可使用实例方法 `expandAll` 和 `foldAll` | N
indent | Number | 24 | 树结点缩进距离，单位：px | N
treeNodeColumnIndex | Number | 0 | 树结点在第几列渲染，默认为第一列 | N
