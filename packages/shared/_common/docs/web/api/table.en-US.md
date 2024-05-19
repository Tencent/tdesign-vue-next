---
title: Table
description: Tables are commonly used to display multiple data under the same structure, making it easy to organize, compare, and analyze. They can also be used to search, filter, and sort data. Generally includes three parts:header, data rows, and footer.
isComponent: true
usage: { title: '', description: '' }
spline: data
---


### Table Classification

As the functionality of tables increases, if all the functions are concentrated in one component, the code file will become more and more bloated. This is not conducive to maintenance or to the business of introducing necessary functions on demand.

Therefore, there are three table components: `BaseTable` (basic table), `PrimaryTable` (main table), and `EnhancedTable` (enhanced table). All three types of tables will be exported. `PrimaryTable` is exported by default.

- `BaseTable` (basic table) includes some basic functions: fixed header, fixed column, frozen row, loading state, pagination, multi-level header, merged cells, custom cells, custom header, custom footer, text ellipsis, alignment, table events, size, row class name, border, zebra stripe, hover state, empty data etc.
- `PrimaryTable` or `Table` (main table) includes some more advanced functions: row selection, row expansion/collapse, filtering, sorting, asynchronous loading, drag-and-drop sorting etc. `PrimaryTable` and `Table` include all the functions of `BaseTable`. `Table` and `PrimaryTable` are completely equivalent.
- `EnhancedTable` (enhanced table) includes some more complex functions: tree structure etc. `EnhancedTable` includes all the functions of `BaseTable` and `PrimaryTable`.

In general, using `PrimaryTable`, which is the default exported table, can meet 90% of the requirements. When it comes to very complex requirements, use `EnhancedTable`.


### Basic Table

Simple table with data switched using pagination. Use border lines and zebra stripes to clearly present the boundaries of each data cell and assist in information segmentation.

- There are two table width modes: `fixed` and `auto`, [detailed explanation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout), the component defaults to `fixed`.

{{ base }}

### Highlight Row Table

set table property `activeRowType` to allow table row highlight.
You try it with different keyboards, for example: ArrowUp/ArrowDown/Space/Shift/ESC.

{{ highlight }}

### Customizable Style Table

- Use the table property `rowClassName` to set the row class name.
- Use the column property `className` to set the column class name or the class name of a specific cell or cells.
- Use the column property `attr: { style: {} }` to set the inline style of the column or a specific cell or cells.

{{ style }}

### Table with Ellipsis for Overflowing Cells

Supports ellipsis for overflowing cell text, separate control of title ellipsis, separate control of ellipsis layer content and background color, etc. Generally used in scenarios where cell detail information needs to be displayed on hover.

- Use `ellipsis` to set the ellipsis display for overflowing column text. By default, it will also control the ellipsis display for the header. As long as `ellipsis` is true, ellipsis will appear for any data type.
- Use `ellipsisTitle` to separately set the ellipsis display for the header. It has a higher priority than `ellipsis`.

{{ ellipsis }}

### Table with Fixed Header/Fixed Rows

When the table content height exceeds, the header will automatically be fixed when scrolling. The table height can be set using `height` or `maxHeight`, with units the same as CSS properties. It is recommended to use `maxHeight` for adaptive height.

There are two table width modes: `fixed` and `auto`, [detailed explanation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout), the component defaults to `fixed`. If you want the table columns to be self-adaptive in width, set `table-layout: auto`.

To refresh the table DOM element, use the component instance method `refreshTable`.

{{ fixed-header }}


### Table with Fixed Columns

When there are too many columns, using fixed columns is convenient for presenting table data content. Supports fixed left columns and fixed right columns. The fixed column effect can be achieved by setting the column property to `fixed: 'left'` or `fixed: right`. The width of the fixed column line can be controlled by CSS.

There are two table width modes: `fixed` and `auto`, [detailed explanation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout), the component defaults to `fixed`. If you want the table columns to be self-adaptive in width, set `table-layout: auto`. In this mode, the total width of the table content `tableContentWidth` must be specified for fixed columns. The value of `tableContentWidth` must be greater than the visible width of the table.

In a multi-level header with fixed columns, the `colKey` and `fixed` properties must be specified for each fixed column.

⚠️ Windows operating system horizontal scrolling: Press and hold the Shift key while using the mouse wheel to scroll. Vertical scrolling: Use the mouse wheel to scroll directly.

{{ fixed-column }}

### Table with Fixed Header and Columns

Supports both fixed header and fixed columns. `fixedRows` is used to set the number of frozen first and last rows. Example: `[2, 2]`.

There are two table width modes: `fixed` and `auto`, [detailed explanation on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout), the component defaults to `fixed`. If you want the table columns to be self-adaptive in width, set `table-layout: auto`. In this mode, the total width of the table content `tableContentWidth` must be specified for fixed columns. The value of `tableContentWidth` must be greater than the visible width of the table.

In a multi-level header with fixed columns, the `colKey` and `fixed` properties must be specified for each fixed column.

{{ fixed-header-col }}

### Table with Custom Cells

Cells are rendered using `row[colKey]` by default. There are 3 ways to customize cells:

- Use `cell` as a render function with parameters: `{col, colIndex, row, rowIndex}`.

- For frameworks with slot features, support slots using the value of `cell` as the slot name. If the value of `cell` is empty, the default is to take `colKey` as the slot name. Note that slot names should be kept in kebab-case or camelCase.

- 【Not recommended】Use `render` as a render function with parameters: `{col, colIndex, row, rowIndex, type}`, where the value of `type` is `cell`.

{{ custom-cell }}

### Table with Custom Header

The title is rendered using `title` by default. There are 3 ways to customize titles:

- Use `title` as a render function with parameters: `title({ col, colIndex })`.

- For frameworks with slot features, support slots using the value of `title` as the slot name. Note that slot names should be kept in kebab-case or camelCase.

- 【Not recommended】Use `render` as a render function with parameters: `render({ col, colIndex, row, rowIndex, type })`, where the value of `type` is `title`. This method cannot be used when using sorting, filtering and other functions.

{{ custom-header }}

### Table with Custom Footer

The table provides custom footer functionality that can be used for scenarios such as footer data statistics. Use `column.foot` to define footer content for each column.

- By default outputs string from `column.foot`. If type of foot is a function then it will be used as a footer render function to customize footer content.
- For frameworks with slot features support slots using value of foot as slot name. Note that slot names should be kept in kebab-case or camelCase.
- To define full-width footer use 'footerSummary'.
- To customize footer cell merge information use 'rowspanAndColspanInFooter', similar to table content cell merge method 'rowspanAndColspan'.

{{ custom-footer }}

### Table with Header/Footer Affixed

- Header affixed to top. Set `headerAffixedTop=true`. To adjust the affixed position and more configurations, use `headerAffixedTop: { offsetTop: 80 }`.
- Footer affixed to bottom. Set `footAffixedBottom=true`. To adjust the affixed position and more configurations, use `footAffixedBottom: { offsetBottom: 60 }`.
- Scrollbar affixed to bottom. Set `horizontalScrollAffixedBottom=true`. To adjust the affixed position and more configurations, use `horizontalScrollAffixedBottom: { offsetBottom: 60 }`.
- Paginator affixed to bottom. Set `paginationAffixedBottom=true`. To adjust the affixed position and more configurations, use `paginationAffixedBottom: { offsetBottom: 60 }`.

{{ affix }}

### Expandable and Collapsible Table

The table provides a collapsible function. After expanding, you can further view detailed content.

- `expandedRowKeys` is used to store the values of expanded rows and supports non-controlled attribute `defaultExpandedRowKeys`.
- `expandedRow` is used to define the specific content displayed by the expanded row with parameters `{ row, rowIndex }`.
- `expandIcon` is used to customize the expand icon. The value true displays the default icon, the value false does not display an icon, and a function value means completely customizing the icon.
- `expandOnRowClick` indicates whether to allow expansion when clicking on a table row.
- The expand row change event will be triggered when the expand row changes.

{{ expandable }}

### Column Configurable Table

Customize the columns that need to be displayed. This can be set through the `columnController` field. For more details, see the description of `TableColumnController` in the API documentation.

- `displayColumns` represents the currently displayed columns and supports non-controlled attribute `defaultDisplayColumns`.
- `onDisplayColumnsChange` will be triggered after column configuration confirmation.
- `onColumnChange` will be triggered when column configuration is selected (before confirmation).
- `columnController.placement` is used to adjust the placement of the column configuration button based on the table. There are 4 positions: top left, top right, bottom left, and bottom right.
- `columnController.fields` is used to set which columns are allowed to control display or hide. If not passed, all columns can be controlled for display or hide.
- `columnController.displayType` is used to set the arrangement of column fields in the column configuration pop-up window. Fixed width or automatic width. Optional values: `auto-width` and `fixed-width`.
- Supports passing all properties of the CheckboxGroup component. `columnController.checkboxGroupProps` is used to control related functions of checkboxes in pop-up windows.
- Supports passing all properties of Dialog component. `columnController.dialogProps` is used to adjust related functions of column configuration pop-up window such as preventing scroll penetration.
- Supports passing all properties of Button component. `columnController.buttonProps` is used to control all features of column configuration button such as button color and text.
- `columnControllerVisible` freely controls whether to display column configuration box generally used in scenarios where you want to completely customize column configuration button.
- `onColumnControllerVisibleChange` triggered when column configuration box is shown or hidden.


#### Example 1: Column configuration function example with configuration button

{{ custom-col-button }}

#### Example 2: Column configuration function example without configuration button

Use `columnControllerVisible` to control whether the column configuration pop-up is displayed, and `onColumnControllerVisibleChange` to listen for related changes. Generally used in scenarios where you need to fully customize the content and position of the column configuration button.

{{ custom-col }}

### Sortable table

For scenarios where the order is required (such as security policy scenarios), provide table sorting capabilities so that users can adjust their positions.

#### Single field sorting

- Set the `sorter` attribute of the column that needs to be sorted to `true`, for example: `{ colKey: 'date', title: 'Date', sorter: true }`.
- Set the value of the table sort attribute `sort` to `{ sortBy: 'date', descending: true }`, where `descending` indicates whether it is sorted in descending order, with a value of `true` indicating descending order and a value of `false` indicating ascending order.
- When sorting changes, listen for the `onSortChange` event and add business logic in the event handler.
- Use `showSortColumnBgColor` to control whether to display the background color of the sorted column to remind users of the specific sorted column more prominently.

Provide column attribute `sortType` for customizing supported sorting methods. Optional values are `desc`/`asc`/`all`, which respectively indicate that only descending order, only ascending order, and descending and ascending orders are supported.

{{ single-sort }}

#### Multi-field sorting

- Set the table attribute `multipleSort` to true.
- Set the `sorter` attribute of the column that needs to be sorted to true. Multiple columns can be set, for example: `[{ colKey: 'date', title: 'Date', sorter: true }, { colKey: 'cost', title: 'Cost', sorter: true }]`.
- Set the value of the table sort attribute `sort` to `[{ sortBy: 'date', descending: true }, { sortBy: 'cost', descending: false }]`

{{ multiple-sort }}

#### Local data sorting

Local data sorting means that the component will sort the data parameter internally. If there are 10 data in data, only these 10 data will be sorted.

- Set the `sorter` attribute of the column that needs to be sorted to a sort function, for example: `{ colKey: 'date', title: 'Date', sorter: (a, b) => a.status - b.status }`.
- Set the value of the table sort attribute `sort` to `{ sortBy: 'date', descending: true }`.
- When sorting changes, listen for the `onSortChange` event and add business logic in the event handler.
- When sorting changes, because it is local data sorting, the data will also change. You need to listen for `onDatachange`, and event handling is controlled by data.

{{ data-sort }}

### Table with selectable rows

In scenarios involving form selection or batch operations, you can directly select or deselect operation objects in front of data rows.

### Table with selectable rows

In scenarios involving form selection or batch operations, you can directly select or deselect operation objects in front of data rows.

#### ExampleA: Single selection

- `selectedRowKeys` represents an array of unique identifiers for the currently selected rows and supports the non-controlled attribute `defaultSelectedRowKeys`.
- `onSelectChange` is triggered when the selected row changes.
- Setting `columns: [{ colKey: 'row-select', type: 'single' }]` can define any column as a row selection operation column.

{{ select-single }}

#### ExampleB: Multiple selection

- `selectedRowKeys` represents an array of unique identifiers for the currently selected rows and supports the non-controlled attribute `defaultSelectedRowKeys`.
- `onSelectChange` is triggered when the selected row changes.
- Setting `columns: [{ colKey: 'row-select', type: 'multiple' }]` can define any column as a row selection operation column.
- In the case of pagination, row selection by default allows cross-page selection, that is, when turning pages, the previous page's selection results are still saved. If you want each page to control the selection separately and not affect each other, you can set `reserveSelectedRowOnPaginate=false`.
- Note: If you find that clicking on a row selects all of them, it means that the `rowKey` setting is incorrect or not set. Please make sure that the value of `rowKey` is a field in `data`.

{{ select-multiple }}

#### ExampleC: Row Selection Without Handler

A table with row selection without an action column is generally used in some brief selection scenarios, where selection is made directly by clicking on the row. you can use `rowSelectionType: 'single' | 'multiple'` to set row selection type.

{{ select-without-handler }}

### Paginated table

#### Remote data pagination

Remote data pagination means that the component will not paginate the `data` parameter internally. Only output pagination information for remote requests to paginate.

{{ pagination-ajax }}

#### Local data pagination

When `data.length` exceeds `pageSize`, a single page can no longer display data completely. At this time, local data pagination will be automatically enabled and the component will paginate `data` internally.
If you want to disable internal pagination of the component, you can set `disableDataPage=true`.

{{ pagination }}

### Filterable table

The component comes with built-in filters such as checkboxes, radio buttons, input boxes, etc. At the same time, you can also customize any filter, such as the date picker in the example.

- The table attribute `filterValue` is used to set the default value for filtering functions. For example: `{ firstName: '' }`.
- The table attribute `filterIcon` is used to set custom filter icons.
- When the filter value changes, it will trigger the `filterChange` event.
- Column configuration `filter.type` determines which filter to use. Optional values are: `single/multiple/input`, which respectively represent: radio button filter, checkbox filter, input box filter. You can also use `filter.component` to customize the filter component.
- Column configuration `filter.list` is used to configure what are the optional values for the current filter. It is only valid when `filter.type` equals single or multiple.
- Column configuration `filter.props` is used to pass through filter attributes and can be configured with any attributes supported by the original component.
- Column configuration `filter.component` is used to customize filters. As long as custom filters contain a `value` attribute and a `change` event, they can be used normally like built-in filters.
- Column configuration `filter.showConfirmAndReset` is used to control whether to display "Confirm" and "Reset" buttons.
- Column configuration `filter.resetValue` is used to set the reset value when clicking on "Reset" button. Not every scenario will reset to '' or [] null. The default reset value is ''.
- The table attribute `filterRow` can completely customize the display content of the filtered result row. Set `filterRow=null` to hide the filter row.
- For more functional attributes, please refer to TableColumnFilter in API documentation.

{{ filter-controlled }}

### Table with merged cells

According to data structure, rows and columns in table can be merged.

- Use table attribute `rowspanAndColspan` to set table content merge cells.
- Use table attribute `rowspanAndColspanInFooter` to set footer merge cells.
- Use column attribute `colspan` to set header merge. If it is a multi-row header, please refer to "Multi-level header" example below.

{{ merge-cells }}

### Multi-level Table Headers

Table header data labels can be presented in multiple levels to express the hierarchical relationship of information.

- To configure multi-level headers, simply add `children` sub-column configurations to the column configuration.
- For fixed columns in multi-level headers, the `colKey` and `fixed` attributes must be specified for each fixed column.
- For column width settings in multi-level table headers, only the width of the last level of headers needs to be specified.

{{ multi-header }}

### Loading State Tables

#### Normal Loading

Normal loading will display a translucent loading layer on top of the table, and the table content will not be hidden.

- `loading=true` displays the default loading state; `loading=false` does not display the loading state; if the value of `loading` is a function, it represents custom loading state text content. For frameworks that support slots, it also supports slots with the same name (excluding loading icons).
- `loadingProps` is used to pass all properties of the loading component and can be used to customize more personalized loading states.

{{ loading }}

#### Asynchronous Loading

Use `asyncLoading` to define asynchronous loading states.

- `asyncLoading=''` indicates a non-loading or completed loading state;
- `asyncLoading='load-more'` displays "Load More" at the bottom of the table;
- `asyncLoading='loading'` displays "Loading, please wait" at the bottom of the table;
- If the value of `asyncLoading` is a function, it represents completely custom bottom asynchronous loading content.

{{ async-loading }}

### Empty Table

Use the default empty table style.

{{ empty }}

### Draggable Sorting Table

Adjust the order by dragging table rows and adjust column order by dragging table headers.

- `dragSort='row'` is used to set the table for row drag sorting.
- `dragSort='row-handler'` is used to set the table for row drag sorting, that is, to control drag sorting by dragging the handle. In this mode, you also need to set the handle column synchronously, `{ colKey: 'sort', cell: () => <MoveIcon /> }`.
- `dragSort='col'` is used to set the table for column drag sorting.
- `sortOnRowDraggable` is used for row drag sorting. It has been deprecated. Please use `dragSort='row'` instead. Compatible support.

#### Example 1: Row drag sorting without handle column

Set the parameter `dragSort='row'`.

{{ drag-sort }}

#### Example 2: Row drag sorting with handle column

When setting the parameter `dragSort='row-handler'`, you also need to add a handle column: `{ colKey: 'drag', cell: () => <MoveIcon /> }`.

{{ drag-sort-handler }}

#### Column drag sorting

【Continuous improvement】Adjust column order. Set the parameter `dragSort='col'`. In the column drag sorting scenario, you must specify a unique identifier for the column `colKey`.

{{ drag-col-sort }}

### Lazy loading table

Lazy loading is generally used in scenarios with large amounts of data. Set `scroll={ type: 'lazy' }` to enable lazy loading mode and pre-load data in advance through `scroll.bufferSize`.

{{ lazy }}

### Virtual scrolling table

In virtual scrolling scenarios, almost all table functions are supported, such as fixed columns, fixed headers, fixed footers, header suction top, footer suction bottom, etc. Please refer to the "Multi-level header table" example for experimental sites.

- Virtual scrolling is generally used in scenarios where super-large data is rendered to provide better front-end performance. Set `scroll={ type: 'virtual' }` to enable virtual scrolling mode.
- To ensure maximum component benefits, when the amount of data is less than `threshold`, regardless of whether virtual scrolling configuration exists or not, virtual scrolling will not be turned on internally by the component. The default value of `threshold` is `100`.

{{ virtual-scroll }}

### Editable table

Editable tables are divided into two types: cell editing tables and row editing tables. For detailed and complete interfaces, please refer to `TableEditableCellConfig` in the API documentation.

#### Editable cell table

- `column.edit.component` represents the component for editing, such as Input, Select, DatePicker. It is necessary to ensure that the component contains two properties: `value` and `onChange`. If you also need to support validation rules, the component also needs to implement two APIs: `tips` and `status`. The implementation rules can refer to the `Input` component.
- `column.edit.props` represents the parameters passed to the editing component `column.edit.component`.
- `column.edit.onEdited` is triggered when editing is completed and exiting edit mode.
- `column.edit.rules` refers to validation rules, which are the same as the validation rule configuration of the form `FormRule`.
- `column.edit.abortEditOnEvent` indicates which events exit edit mode in addition to clicking on non-self elements. For example: radio box value change event `onChange`, generally no need to configure.
- `column.edit.defaultEditable` whether the default state is editable.
- `editableCellState` is a global attribute of the table used to control whether cells are allowed to be edited. If the return value is `true`, it means editable; if the return value is `false`, it means not editable and read-only.

{{ editable-cell }}

#### Editable row table

You can perform operations such as editing and saving entire rows of tables.

- `editableRowKeys` is used to control rows in edit mode.
- `onRowEdit` will be triggered during row editing.
- The instance method `validateRowData` is used for table row data validation, and `onRowValidate` is triggered when row editing validation is completed.
- The instance method `validateTableData` is used for table-wide data validation, and `onValidate` is triggered when all data validation is completed.

{{ editable-row }}


### Tree structure table

Please use `EnhancedTable`. `Table/PrimaryTable/BaseTable` does not support tree structure.

⚠️ The tree structure table supports rich features such as adding nodes, deleting nodes, swapping sibling nodes, querying nodes, expanding/collapsing nodes, etc. In order to reduce the recursive query for each calculation and prepare for the virtual table in the future, the internal data is tiled. All data changes are controlled by component instance methods. For specific instance methods, please refer to the API documentation `EnhancedTableInstanceFunctions`. For details of tree structure configuration, please refer to `tree: TableTreeConfig`.

- `treeExpandAndFoldIcon` is used to set the tree structure fold/expand icon and supports global configuration.
- The child node field defaults to `children`, and you can use `tree.childrenKey` to define field aliases. Example: `tree={ childrenKey: 'list' }`.
- `tree.indent` is used to set the tree node indentation distance. The distance of leaf nodes can be set separately by class name `t-table__tree-leaf-node`.
- `tree.treeNodeColumnIndex` is used to set which column is used as the tree structure operation column.
- `tree.checkStrictly` indicates that the row selection (multiple selection) of the tree structure is independent of the parent-child row selection by default and the value is true.
- `tree.defaultExpandAll=true` indicates that all nodes are expanded by default and can be controlled by `expandAll` and `foldAll` later to expand or collapse all. Use `toggleExpandData` to control the expansion and collapse of individual nodes.
- To refresh table data, please use the component instance method `resetData`.
- To obtain tree structure data, you can use the component instance method `getTreeNode`.

#### Tree structure display

{{ tree }}

#### Tree structure row selection

{{ tree-select }}
