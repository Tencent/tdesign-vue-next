:: BASE_DOC ::

## API

### BaseTable Props

name | type | default | description | required
-- | -- | -- | -- | --
activeRowKeys | Array | [] | keys of highlight rows, used to mock area selection behavior, just like macOS or windows area selection。`v-model:activeRowKeys` is supported。Typescript：`Array<string \| number>` | N
defaultActiveRowKeys | Array | [] | keys of highlight rows, used to mock area selection behavior, just like macOS or windows area selection。uncontrolled property。Typescript：`Array<string \| number>` | N
activeRowType | String | - | make nodes can be highlight on clicked。Typescript：`'single' \| 'multiple'` | N
allowResizeColumnWidth | Boolean | undefined | `deprecated`。allow to resize column width | N
attach | String / Function | - | elements with popup would be attached to `attach`。Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
bordered | Boolean | false | show table bordered | N
bottomContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cellEmptyContent | String / Slot / Function | - | Typescript：`string \| TNode<BaseTableCellParams<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
columns | Array | [] | table column configs。Typescript：`Array<BaseTableCol<T>>` | N
data | Array | [] | table data。Typescript：`Array<T>` | N
disableDataPage | Boolean | false | \- | N
disableSpaceInactiveRow | Boolean | undefined | can not set row to be inactive with Space keydown | N
empty | String / Slot / Function | '' | empty text or empty element。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
firstFullRow | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
fixedRows | Array | - | Typescript：`Array<number>` | N
footData | Array | [] | table foot data。Typescript：`Array<T>` | N
footerAffixProps | Object | - | `deprecated`。affix props。Typescript：`Partial<AffixProps>` | N
footerAffixedBottom | Boolean / Object | false | affix foot to viewport bottom。Typescript：`boolean \| Partial<AffixProps>` | N
footerSummary | String / Slot / Function | - | footer summary content。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
headerAffixProps | Object | - | `deprecated`。affix props。Typescript：`Partial<AffixProps>`，[Affix API Documents](./affix?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
headerAffixedTop | Boolean / Object | false | affix header to viewport top。Typescript：`boolean \| Partial<AffixProps>` | N
height | String / Number | - | table height | N
horizontalScrollAffixedBottom | Boolean / Object | - | affix props。Typescript：`boolean \| Partial<AffixProps>` | N
hover | Boolean | false | show hover style | N
keyboardRowHover | Boolean | true | make table row to be hover by keydown ArrowUp/ArrowDown | N
lastFullRow | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazyLoad | Boolean | false | load table content when it entering the visible area, all elements in table are not rendered before it become visible | N
loading | Boolean / Slot / Function | undefined | loading state table。Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loadingProps | Object | - | Typescript：`Partial<LoadingProps>`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
locale | Object | - | table locale config。Typescript：`TableConfig`，[ConfigProvider API Documents](./config-provider?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
maxHeight | String / Number | - | table max height | N
pagination | Object | - | you can use all props of pagination component with paginationProps。Typescript：`PaginationProps`，[Pagination API Documents](./pagination?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
paginationAffixedBottom | Boolean / Object | - | affix props。Typescript：`boolean \| Partial<AffixProps>` | N
resizable | Boolean | false | allow to resize column width, set `tableLayout=fixed` would be better | N
rowAttributes | Object / Array / Function | - | `tr` attributes。Typescript：`TableRowAttributes<T>` `type TableRowAttributes<T> = HTMLElementAttributes \| ((params: { row: T; rowIndex: number; type: 'body' \| 'foot' }) => HTMLElementAttributes) \| Array<TableRowAttributes<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowClassName | String / Object / Array / Function | - | table `th` classname。Typescript：`ClassName \| ((params: RowClassNameParams<T>) => ClassName)` `interface RowClassNameParams<T> { row: T; rowIndex: number; type?: 'body' \| 'foot' }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowKey | String | 'id' | required。unique key for each row data | Y
rowspanAndColspan | Function | - | rowspan and colspan。Typescript：`TableRowspanAndColspanFunc<T>` `type TableRowspanAndColspanFunc<T> = (params: BaseTableCellParams<T>) => RowspanColspan` `interface RowspanColspan { colspan?: number; rowspan?: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rowspanAndColspanInFooter | Function | - | rowspan and colspan for footer。Typescript：`TableRowspanAndColspanFunc<T>` | N
scroll | Object | - | lazy load and virtual scroll。Typescript：`TScroll`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
showHeader | Boolean | true | show table header | N
size | String | - | table size, support `GlobalConfigProvider`, default value is `medium`。options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
stripe | Boolean | false | show stripe style | N
tableContentWidth | String | - | \- | N
tableLayout | String | fixed | table-layout css properties, [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout). set value to be `fixed` on `resizable=true` please。options: auto/fixed | N
topContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
verticalAlign | String | middle | vertical align。options: top/middle/bottom | N
onActiveChange | Function |  | Typescript：`(activeRowKeys: Array<string \| number>, context: ActiveChangeContext<T>) => void`<br/>trigger on row active change。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ActiveChangeContext<T> { activeRowList: Array<{ row: T, rowIndex: number }>; currentRowData?: T; type: 'active' \| 'inactive' }`<br/> | N
onActiveRowAction | Function |  | Typescript：`(context: ActiveRowActionContext<T>) => void`<br/>keyboard operation event actions. used to mock selection behavior, just like macOS or windows。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ActiveRowActionContext<T> { action: ActiveRowActionType,  activeRowList: Array<{ row: T, rowIndex: number }> }`<br/><br/>`type ActiveRowActionType ='shift-area-selection' \| 'space-one-selection' \| 'clear' \| 'select-all'`<br/> | N
onCellClick | Function |  | Typescript：`(context: BaseTableCellEventContext<T>) => void`<br/>trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onColumnResizeChange | Function |  | Typescript：`(context: { columnsWidth: { [colKey: string]: number }; }) => void`<br/> | N
onPageChange | Function |  | Typescript：`(pageInfo: PageInfo, newDataSource: Array<T>) => void`<br/>trigger on pagination changing | N
onRowClick | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent \| KeyboardEvent }`<br/> | N
onRowDblclick | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on double click | N
onRowMousedown | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row mousedown | N
onRowMouseenter | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row mouseenter | N
onRowMouseleave | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row mouseenter | N
onRowMouseover | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row mouseover | N
onRowMouseup | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row mouseup | N
onScroll | Function |  | Typescript：`(params: { e: WheelEvent }) => void`<br/>trigger on table content scroll | N
onScrollX | Function |  | Typescript：`(params: { e: WheelEvent }) => void`<br/>`deprecated`。trigger on scroll horizontal | N
onScrollY | Function |  | Typescript：`(params: { e: WheelEvent }) => void`<br/>`deprecated`。trigger on scroll vertical | N

### BaseTable Events

name | params | description
-- | -- | --
active-change | `(activeRowKeys: Array<string \| number>, context: ActiveChangeContext<T>)` | trigger on row active change。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ActiveChangeContext<T> { activeRowList: Array<{ row: T, rowIndex: number }>; currentRowData?: T; type: 'active' \| 'inactive' }`<br/>
active-row-action | `(context: ActiveRowActionContext<T>)` | keyboard operation event actions. used to mock selection behavior, just like macOS or windows。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ActiveRowActionContext<T> { action: ActiveRowActionType,  activeRowList: Array<{ row: T, rowIndex: number }> }`<br/><br/>`type ActiveRowActionType ='shift-area-selection' \| 'space-one-selection' \| 'clear' \| 'select-all'`<br/>
cell-click | `(context: BaseTableCellEventContext<T>)` | trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
column-resize-change | `(context: { columnsWidth: { [colKey: string]: number }; })` | \-
page-change | `(pageInfo: PageInfo, newDataSource: Array<T>)` | trigger on pagination changing
row-click | `(context: RowEventContext<T>)` | trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent \| KeyboardEvent }`<br/>
row-dblclick | `(context: RowEventContext<T>)` | trigger on double click
row-mousedown | `(context: RowEventContext<T>)` | trigger on row mousedown
row-mouseenter | `(context: RowEventContext<T>)` | trigger on row mouseenter
row-mouseleave | `(context: RowEventContext<T>)` | trigger on row mouseenter
row-mouseover | `(context: RowEventContext<T>)` | trigger on row mouseover
row-mouseup | `(context: RowEventContext<T>)` | trigger on row mouseup
scroll | `(params: { e: WheelEvent })` | trigger on table content scroll
scroll-x | `(params: { e: WheelEvent })` | `deprecated`。trigger on scroll horizontal
scroll-y | `(params: { e: WheelEvent })` | `deprecated`。trigger on scroll vertical

### BaseTableInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
refreshTable | \- | \- | required
scrollColumnIntoView | `(colKey: string)` | \- | required
scrollToElement | `(params: ComponentScrollToElementParams)` | \- | required

### BaseTableCol

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | align type。options: left/right/center | N
attrs | Object / Function | - | html attributes。Typescript：`BaseTableColumnAttributes<T>` `type BaseTableColumnAttributes<T> = { [key: string]: any } \| ((context: CellData<T>) => { [key: string]: any })`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
cell | String / Function | - | use cell to render table cell。Typescript：`string \| TNode<BaseTableCellParams<T>>` `interface BaseTableCellParams<T> { row: T; rowIndex: number; col: BaseTableCol<T>; colIndex: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
children | Array | - | grouping table head。Typescript：`Array<BaseTableCol<T>>` | N
className | String / Object / Array / Function | - | cell classnames。Typescript：`TableColumnClassName<T> \| TableColumnClassName<T>[]` `type TableColumnClassName<T> = ClassName \| ((context: CellData<T>) => ClassName)` `interface CellData<T> extends BaseTableCellParams<T> { type: 'th' \| 'td' }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
colKey | String | - | unique key for column | N
colspan | Number | - | one line head colspan | N
ellipsis | Boolean / Object / Slot / Function | false | ellipsis cell content。Typescript：`boolean \| TNode<BaseTableCellParams<T>> \| TooltipProps \| { props: TooltipProps; content: TNode<BaseTableCellParams<T>> }`，[Tooltip API Documents](./tooltip?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
ellipsisTitle | Boolean / Object / Slot / Function | undefined | ellipsis title content。Typescript：`boolean \| TNode<BaseTableColParams<T>> \| TooltipProps \| { props: TooltipProps; content: TNode<BaseTableColParams<T>> }` `interface BaseTableColParams<T> { col: BaseTableCol<T>; colIndex: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
fixed | String | left | fixed current column to left or right。options: left/right | N
foot | String / Function | - | tfoot content。Typescript：`string \| TNode<{ col: BaseTableCol; colIndex: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
minWidth | String / Number | - | add CSS property `min-width` to HTML Element `<col>`，Browsers with [TablesNG](https://docs.google.com/document/d/16PFD1GtMI9Zgwu0jtPaKZJ75Q2wyZ9EZnVbBacOfiNA/preview)  support `minWidth` | N
render | Function | - | render function can be used to render cell or head。Typescript：`TNode<BaseTableRenderParams<T>>` `interface BaseTableRenderParams<T> extends BaseTableCellParams<T> { type: RenderType }` `type RenderType = 'cell' \| 'title'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
resizable | Boolean | true | resize current column width, you can set to be false to forbidden resizing current column. `BaseTable.resizable` need set to be true to allow resizing all columns | N
resize | Object | - | Typescript：`TableColumnResizeConfig` `interface TableColumnResizeConfig { minWidth: number; maxWidth: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
stopPropagation | Boolean | - | stop cells of current col to propagation | N
thClassName | String / Object / Array / Function | - | th classnames。Typescript：`TableColumnClassName<T> \| TableColumnClassName<T>[]`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
title | String / Function | - | th content。Typescript：`string \| TNode<{ col: BaseTableCol; colIndex: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
width | String / Number | - | column width | N


### PrimaryTable Props

name | type | default | description | required
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | async loading state。Typescript：`'loading' \| 'load-more' \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
columnController | Object | - | Typescript：`TableColumnController` | N
columnControllerVisible | Boolean | undefined | `v-model:columnControllerVisible` is supported | N
columns | Array | [] | table column configs。Typescript：`Array<PrimaryTableCol<T>>` | N
displayColumns | Array | - | `v-model:displayColumns` is supported。Typescript：`CheckboxGroupValue` | N
defaultDisplayColumns | Array | - | uncontrolled property。Typescript：`CheckboxGroupValue` | N
dragSort | String | - | dag sort。options: row/row-handler/col/row-handler-col/drag-col | N
dragSortOptions | Object | - | drag sort params。Typescript：`SortableOptions` | N
editableCellState | Function | - | Typescript：`EditableCellType<T>` `type EditableCellType<T> = (params: PrimaryTableCellParams<T>) => boolean`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
editableRowKeys | Array | - | editable row keys, row key value is from data[rowKey]。Typescript：`Array<string \| number>` | N
expandIcon | Boolean / Slot / Function | true | to show expand icon. expand icon is set in first column。Typescript：`boolean \| TNode<ExpandArrowRenderParams<T>>` `interface ExpandArrowRenderParams<T> { row: T; index: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
expandOnRowClick | Boolean | - | expand row on click | N
expandedRow | String / Slot / Function | - | table expanded row, to show more detail information。Typescript：`TNode<TableExpandedRowParams<T>>` `interface TableExpandedRowParams<T> { row: T; index: number; columns: PrimaryTableCol<T>[] \| BaseTableCol<T>[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
expandedRowKeys | Array | [] | expanded row keys, row key value is from data[rowKey]。`v-model:expandedRowKeys` is supported。Typescript：`Array<string \| number>` | N
defaultExpandedRowKeys | Array | [] | expanded row keys, row key value is from data[rowKey]。uncontrolled property。Typescript：`Array<string \| number>` | N
filterIcon | Slot / Function | - | filter icon。Typescript：`TNode<{ col: PrimaryTableCol<T>; colIndex: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterRow | String / Slot / Function | - | filter value。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterValue | Object | - | filter value。`v-model:filterValue` is supported。Typescript：`FilterValue` `type FilterValue = { [key: string]: any }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
defaultFilterValue | Object | - | filter value。uncontrolled property。Typescript：`FilterValue` `type FilterValue = { [key: string]: any }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
hideSortTips | Boolean | - | hide sort tips | N
indeterminateSelectedRowKeys | Array | - | indeterminate selected row keys, row key is from data[rowKey]。Typescript：`Array<string \| number>` | N
multipleSort | Boolean | false | support multiple column fields sort | N
reserveSelectedRowOnPaginate | Boolean | true | \- | N
rowSelectionAllowUncheck | Boolean | - | allow to uncheck selection in table with single row selection | N
rowSelectionType | String | - | single row selection, or multiple row selection。options: single/multiple | N
selectOnRowClick | Boolean | - | select row data on row click | N
selectedRowKeys | Array | [] | selected row keys, row key is from data[rowKey]。`v-model:selectedRowKeys` is supported。Typescript：`Array<string \| number>` | N
defaultSelectedRowKeys | Array | [] | selected row keys, row key is from data[rowKey]。uncontrolled property。Typescript：`Array<string \| number>` | N
showSortColumnBgColor | Boolean | false | column shows sort bg color | N
sort | Object / Array | - | sort configs。`v-model:sort` is supported。Typescript：`TableSort` `type TableSort = SortInfo \| Array<SortInfo>` `interface SortInfo { sortBy: string; descending: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
defaultSort | Object / Array | - | sort configs。uncontrolled property。Typescript：`TableSort` `type TableSort = SortInfo \| Array<SortInfo>` `interface SortInfo { sortBy: string; descending: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sortIcon | Slot / Function | - | sort icon。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
sortOnRowDraggable | Boolean | false | `deprecated`。sort on row draggable | N
`Omit<BaseTableProps<T>, 'columns' \| 'onCellClick'>` | \- | - | extends `Omit<BaseTableProps<T>, 'columns' \| 'onCellClick'>` | N
onAsyncLoadingClick | Function |  | Typescript：`(context: { status: 'loading' \| 'load-more' }) => void`<br/>trigger on async loading text clicked | N
onCellClick | Function |  | Typescript：`(context: PrimaryTableCellEventContext<T>) => void`<br/>trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableCellEventContext<T> { row: T; col: PrimaryTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onChange | Function |  | Typescript：`(data: TableChangeData, context: TableChangeContext<T>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps }`<br/><br/>`interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T[] }`<br/><br/>`type TableChangeTrigger = 'filter' \| 'sorter' \| 'pagination'`<br/> | N
onColumnChange | Function |  | Typescript：`(context: PrimaryTableColumnChange<T>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableColumnChange<T> { columns?: CheckboxGroupValue; currentColumn?: PrimaryTableCol<T>; type?: 'check' \| 'uncheck'; e?: Event }`<br/> | N
onColumnControllerVisibleChange | Function |  | Typescript：`(visible: boolean, context: { trigger: 'cancel' \| 'confirm' }) => void`<br/> | N
onDataChange | Function |  | Typescript：`(data: Array<T>, context: TableDataChangeContext) => void`<br/>trigger on data changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableDataChangeContext { trigger: 'sort' }`<br/> | N
onDisplayColumnsChange | Function |  | Typescript：`(value: CheckboxGroupValue) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`import { CheckboxGroupValue } from '@Checkbox'`<br/> | N
onDragSort | Function |  | Typescript：`(context: DragSortContext<T>) => void`<br/>trigger on drag sort。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface DragSortContext<T> { currentIndex: number; current: T; targetIndex: number; target: T; data: T[]; newData: T[]; currentData?: T[]; e: SortableEvent; sort: 'row' \| 'col' }`<br/><br/>`import { SortableEvent, SortableOptions } from 'sortablejs'`<br/> | N
onExpandChange | Function |  | Typescript：`(expandedRowKeys: Array<string \| number>, options: ExpandOptions<T>) => void`<br/>trigger on expand row keys changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ExpandOptions<T> { expandedRowData: Array<T>; currentRowData: T }`<br/> | N
onFilterChange | Function |  | Typescript：`(filterValue: FilterValue, context: TableFilterChangeContext<T>) => void`<br/>trigger on filter value changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableFilterChangeContext<T> { col?: PrimaryTableCol<T>; trigger: 'filter-change' \| 'confirm' \| 'reset' \| 'clear' }`<br/> | N
onRowEdit | Function |  | Typescript：`(context: PrimaryTableRowEditContext<T>) => void`<br/>trigger on row data is editing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type PrimaryTableRowEditContext<T> = PrimaryTableCellParams<T> & { value: any; editedRow: T }`<br/> | N
onRowValidate | Function |  | Typescript：`(context: PrimaryTableRowValidateContext<T>) => void`<br/>trigger after row data validated。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type PrimaryTableRowValidateContext<T> = { result: TableRowValidateResult<T>[]; trigger: TableValidateTrigger }`<br/><br/>`type TableValidateTrigger = 'self' \| 'parent'`<br/><br/>`export type TableRowValidateResult<T> = PrimaryTableCellParams<T> & { errorList: AllValidateResult[]; value: any }`<br/> | N
onSelectChange | Function |  | Typescript：`(selectedRowKeys: Array<string \| number>, options: SelectOptions<T>) => void`<br/>trigger on select changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SelectOptions<T> { selectedRowData: Array<T>; type: 'uncheck' \| 'check'; currentRowKey?: string; currentRowData?: T }`<br/> | N
onSortChange | Function |  | Typescript：`(sort: TableSort, options: SortOptions<T>) => void`<br/>trigger on sort changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol }`<br/> | N
onValidate | Function |  | Typescript：`(context: PrimaryTableValidateContext) => void`<br/>trigger after row data validated。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableValidateContext { result: TableErrorListMap }`<br/><br/>`type TableErrorListMap = { [key: string]: AllValidateResult[] }`<br/> | N

### PrimaryTable Events

name | params | description
-- | -- | --
async-loading-click | `(context: { status: 'loading' \| 'load-more' })` | trigger on async loading text clicked
cell-click | `(context: PrimaryTableCellEventContext<T>)` | trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableCellEventContext<T> { row: T; col: PrimaryTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
change | `(data: TableChangeData, context: TableChangeContext<T>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableChangeData { sorter?: TableSort; filter?: FilterValue; pagination?: PaginationProps }`<br/><br/>`interface TableChangeContext<T> { trigger: TableChangeTrigger; currentData?: T[] }`<br/><br/>`type TableChangeTrigger = 'filter' \| 'sorter' \| 'pagination'`<br/>
column-change | `(context: PrimaryTableColumnChange<T>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableColumnChange<T> { columns?: CheckboxGroupValue; currentColumn?: PrimaryTableCol<T>; type?: 'check' \| 'uncheck'; e?: Event }`<br/>
column-controller-visible-change | `(visible: boolean, context: { trigger: 'cancel' \| 'confirm' })` | \-
data-change | `(data: Array<T>, context: TableDataChangeContext)` | trigger on data changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableDataChangeContext { trigger: 'sort' }`<br/>
display-columns-change | `(value: CheckboxGroupValue)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`import { CheckboxGroupValue } from '@Checkbox'`<br/>
drag-sort | `(context: DragSortContext<T>)` | trigger on drag sort。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface DragSortContext<T> { currentIndex: number; current: T; targetIndex: number; target: T; data: T[]; newData: T[]; currentData?: T[]; e: SortableEvent; sort: 'row' \| 'col' }`<br/><br/>`import { SortableEvent, SortableOptions } from 'sortablejs'`<br/>
expand-change | `(expandedRowKeys: Array<string \| number>, options: ExpandOptions<T>)` | trigger on expand row keys changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface ExpandOptions<T> { expandedRowData: Array<T>; currentRowData: T }`<br/>
filter-change | `(filterValue: FilterValue, context: TableFilterChangeContext<T>)` | trigger on filter value changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableFilterChangeContext<T> { col?: PrimaryTableCol<T>; trigger: 'filter-change' \| 'confirm' \| 'reset' \| 'clear' }`<br/>
row-edit | `(context: PrimaryTableRowEditContext<T>)` | trigger on row data is editing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type PrimaryTableRowEditContext<T> = PrimaryTableCellParams<T> & { value: any; editedRow: T }`<br/>
row-validate | `(context: PrimaryTableRowValidateContext<T>)` | trigger after row data validated。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type PrimaryTableRowValidateContext<T> = { result: TableRowValidateResult<T>[]; trigger: TableValidateTrigger }`<br/><br/>`type TableValidateTrigger = 'self' \| 'parent'`<br/><br/>`export type TableRowValidateResult<T> = PrimaryTableCellParams<T> & { errorList: AllValidateResult[]; value: any }`<br/>
select-change | `(selectedRowKeys: Array<string \| number>, options: SelectOptions<T>)` | trigger on select changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SelectOptions<T> { selectedRowData: Array<T>; type: 'uncheck' \| 'check'; currentRowKey?: string; currentRowData?: T }`<br/>
sort-change | `(sort: TableSort, options: SortOptions<T>)` | trigger on sort changing。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SortOptions<T> { currentDataSource?: Array<T>; col: PrimaryTableCol }`<br/>
validate | `(context: PrimaryTableValidateContext)` | trigger after row data validated。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface PrimaryTableValidateContext { result: TableErrorListMap }`<br/><br/>`type TableErrorListMap = { [key: string]: AllValidateResult[] }`<br/>

### PrimaryTableInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
clearValidateData | \- | \- | required。clear all validated errors
validateRowData | `(rowValue: any)` | `Promise<{ trigger: TableValidateTrigger, result: ErrorListObjectType<T>[] }>` | required。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type ErrorListObjectType<T> = PrimaryTableRowEditContext<T> & { errorList: AllValidateResult[] }`<br/>
validateTableData | \- | `Promise<{ result: TableErrorListMap }>` | required

### PrimaryTableCol

name | type | default | description | required
-- | -- | -- | -- | --
cell | String / Function | - | to render table cell。Typescript：`string \| TNode<PrimaryTableCellParams<T>>` `interface PrimaryTableCellParams<T> { row: T; rowIndex: number; col: PrimaryTableCol<T>; colIndex: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
checkProps | Object / Function | - | checkbox or radio component properties。Typescript：`CheckProps<T>` `type CheckProps<T> = CheckboxProps \| RadioProps \| ((options: { row: T; rowIndex: number }) => CheckboxProps \| RadioProps)` `import { CheckboxProps } from '@Checkbox'`，[Radio API Documents](./radio?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
children | Array | - | grouping table head。Typescript：`Array<PrimaryTableCol<T>>` | N
colKey | String | - | unique key for column | N
disabled | Function | - | disable table select action。Typescript：`(options: {row: T; rowIndex: number }) => boolean` | N
edit | Object | - | Typescript：`TableEditableCellConfig<T>` | N
filter | Object | - | filter rules config。Typescript：`TableColumnFilter` | N
render | Function | - | to render cell or head。Typescript：`TNode<PrimaryTableRenderParams<T>>` `interface PrimaryTableRenderParams<T> extends PrimaryTableCellParams<T> { type: RenderType }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sortType | String | all | sort options。options: desc/asc/all。Typescript：`SortType` `type SortType = 'desc' \| 'asc' \| 'all'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
sorter | Boolean / Function | false | sort configs。Typescript：`boolean \| SorterFun<T>` `type SorterFun<T> = (a: T, b: T) => number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
title | String / Function | - | to render table head。Typescript：`string \| TNode<{ col: PrimaryTableCol; colIndex: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
type | String | single | row select type。options: single/multiple | N
`Omit<BaseTableCol, 'cell' \| 'title' \| 'render' \| 'children'>` | \- | - | extends `Omit<BaseTableCol, 'cell' \| 'title' \| 'render' \| 'children'>` | N


### EnhancedTable Props

name | type | default | description | required
-- | -- | -- | -- | --
beforeDragSort | Function | - | stop to drag sort。Typescript：`(context: DragSortContext<T>) => boolean` | N
expandedTreeNodes | Array | [] | expanded tree node row keys, row key value is from data[rowKey]。`v-model:expandedTreeNodes` is supported。Typescript：`Array<string \| number>` | N
defaultExpandedTreeNodes | Array | [] | expanded tree node row keys, row key value is from data[rowKey]。uncontrolled property。Typescript：`Array<string \| number>` | N
tree | Object | - | tree data configs。Typescript：`TableTreeConfig` | N
treeExpandAndFoldIcon | Function | - | sort icon。Typescript：`TNode<{ type: 'expand' \| 'fold', row: T }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
`PrimaryTableProps<T>` | \- | - | extends `PrimaryTableProps<T>` | N
onAbnormalDragSort | Function |  | Typescript：`(context: TableAbnormalDragSortContext<T>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableAbnormalDragSortContext<T> { code: number; reason: string }`<br/> | N
onExpandedTreeNodesChange | Function |  | Typescript：`(expandedTreeNodes: Array<string \| number>, options: TableTreeNodeExpandOptions <T>) => void`<br/>trigger on tree node expanded or folded。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeNodeExpandOptions<T> { row: T; rowIndex: number; rowState: TableRowState<T>; type: 'fold' \| 'expand'; trigger?: 'expand-fold-icon' \| 'row-click' \| 'default-expand-all' \| 'expand-all' \| 'fold-all' }`<br/> | N
onTreeExpandChange | Function |  | Typescript：`(context: TableTreeExpandChangeContext<T>) => void`<br/>`deprecated`。trigger on tree node expanded or folded, use `expandedTreeNodesChange` please。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T>; trigger?: 'expand-fold-icon' \| 'row-click' }`<br/> | N

### EnhancedTable Events

name | params | description
-- | -- | --
abnormal-drag-sort | `(context: TableAbnormalDragSortContext<T>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableAbnormalDragSortContext<T> { code: number; reason: string }`<br/>
expanded-tree-nodes-change | `(expandedTreeNodes: Array<string \| number>, options: TableTreeNodeExpandOptions <T>)` | trigger on tree node expanded or folded。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeNodeExpandOptions<T> { row: T; rowIndex: number; rowState: TableRowState<T>; type: 'fold' \| 'expand'; trigger?: 'expand-fold-icon' \| 'row-click' \| 'default-expand-all' \| 'expand-all' \| 'fold-all' }`<br/>
tree-expand-change | `(context: TableTreeExpandChangeContext<T>)` | `deprecated`。trigger on tree node expanded or folded, use `expandedTreeNodesChange` please。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface TableTreeExpandChangeContext<T> { row: T; rowIndex: number; rowState: TableRowState<T>; trigger?: 'expand-fold-icon' \| 'row-click' }`<br/>

### EnhancedTableInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
appendTo | `(key: TableRowValue, newData: T)` | \- | required
expandAll | \- | \- | required
foldAll | \- | \- | required
getData | `(key: TableRowValue)` | `TableRowState<T>` | required。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`type TableRowValue = string \| number`<br/>
getTreeExpandedRow | `(type: 'unique' \| 'data' \| 'all')` | \- | required。get expanded row data
getTreeNode | \- | `T[]` | required
insertAfter | `(key: TableRowValue, newData: T)` | \- | required
insertBefore | `(key: TableRowValue, newData: T)` | \- | required
remove | `(key: TableRowValue)` | \- | required
removeChildren | `(key: TableRowValue)` | \- | required。remove all children nodes of one node
resetData | `(newData: T[])` | \- | required
setData | `(key: TableRowValue, newRowData: T)` | \- | required
swapData | `(params: SwapParams<T>)` | \- | required。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts)。<br/>`interface SwapParams<T> { current: T; target: T; currentIndex: number; targetIndex: number }`<br/>
toggleExpandData | `(p: { row: T,  rowIndex: number})` | \- | required

### TableRowState

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | false | \- | N
expandChildrenLength | Number | - | \- | N
expanded | Boolean | false | required | Y
id | String / Number | - | required | Y
level | Number | - | Typescript：`number` | N
parent | \- | - | Typescript：`TableRowState<T>` | N
path | Array | - | Typescript：`TableRowState<T>[]` | N
row | \- | - | required。Typescript：`T` | Y
rowIndex | Number | - | required | Y

### TableColumnFilter

name | type | default | description | required
-- | -- | -- | -- | --
attrs | Object | - | html attributes of component。Typescript：`HTMLElementAttributes`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
classNames | String | - | component class names。Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
component | Slot / Function | - | Typescript：`ComponentType`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
confirmEvents | Array | - | Typescript：`string[]` | N
label | String / Function | - | filter column title text, used to be showed in filter row。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
list | Array | - | Typescript：`Array<OptionData>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
props | Object | - | Typescript：`FilterProps` `type FilterProps = RadioProps \| CheckboxProps \| InputProps \| { [key: string]: any }`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
resetValue | \- | - | Typescript：`any` | N
showConfirmAndReset | Boolean | false | \- | N
style | Object | - | styles of component。Typescript：`Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
type | String | - | Typescript：`FilterType` `type FilterType = 'input' \| 'single' \| 'multiple'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N

### TableColumnController

name | type | default | description | required
-- | -- | -- | -- | --
buttonProps | Object | - | Typescript：`ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
checkboxProps | Object | - | Typescript：`CheckboxGroupProps`，[Checkbox API Documents](./checkbox?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
columnControllerBottomContent | Slot / Function | - | column controller content at bottom of checkbox list。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
columnControllerTopContent | Slot / Function | - | column controller content at top of checkbox list。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
dialogProps | Object | - | Typescript：`DialogProps`，[Dialog API Documents](./dialog?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
displayType | String | auto-width | options: fixed-width/auto-width | N
fields | Array | - | Typescript：`string[]` | N
groupColumns | Array | - | show columns by group。Typescript：`TableColumnGroup[]` `interface TableColumnGroup { label: string; value?: string \| number; columns: string[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
hideTriggerButton | Boolean | false | \- | N
placement | String | top-right | options: top-left/top-right/bottom-left/bottom-right | N

### TableEditableCellConfig

name | type | default | description | required
-- | -- | -- | -- | --
abortEditOnEvent | Array | - | Typescript：`string[]` | N
component | \- | - | component definition。Typescript：`ComponentType`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
defaultEditable | Boolean | false | set default editable once | N
keepEditMode | Boolean | false | set table cell always to be editable | N
on | Function | - | edit component events, you can update any cell value of current row data with param `updateEditedCellValue`。Typescript：`(context: TableEditableCellPropsParams<T>) => { [eventName: string]: Function }` | N
onEdited | Function | - | trigger on finishing editing。Typescript：`(context: PrimaryTableOnEditedContext<T>) => void` `type PrimaryTableOnEditedContext<T> = PrimaryTableCellParams<T> & { trigger: string; newRowData: T; }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
props | Object / Function | - | props of `edit.component`, you can update any cell value of current row with param `updateEditedCellValue`。Typescript：`TableEditableCellProps<T>` `type TableEditableCellProps<T> = TablePlainObject \| ((params: TableEditableCellPropsParams<T>) => TablePlainObject)` `interface TableEditableCellPropsParams<T> extends PrimaryTableCellParams<T> { editedRow: T; updateEditedCellValue: (val: any \| { rowValue?: string \| number; isUpdateCurrentRow?: boolean; [key: string]: any }) => void }` `interface TablePlainObject{ [key: string]: any }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
rules | Array | - | form rules。Typescript：`TableEditableCellRules<T>` `type TableEditableCellRules<T> = FormRule[] \| ((params: PrimaryTableCellParams<T>) => FormRule[])`，[Form API Documents](./form?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/table/type.ts) | N
showEditIcon | Boolean | true | show edit icon | N
validateTrigger | String | 'exit' | when to trigger validate。Typescript：`'exit' \| 'change'` | N

### TableTreeConfig

name | type | default | description | required
-- | -- | -- | -- | --
checkStrictly | Boolean | false | \- | N
childrenKey | String | children | \- | N
defaultExpandAll | Boolean | false | \- | N
expandTreeNodeOnClick | Boolean | false | \- | N
indent | Number | 24 | \- | N
treeNodeColumnIndex | Number | 0 | \- | N

### TScroll

name | type | default | description | required
-- | -- | -- | -- | --
bufferSize | Number | 20 | \- | N
isFixedRowHeight | Boolean | false | \- | N
rowHeight | Number | - | \- | N
threshold | Number | 100 | \- | N
type | String | - | required。options: lazy/virtual | Y
