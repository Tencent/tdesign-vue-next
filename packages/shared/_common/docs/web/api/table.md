---
title: Table 表格
description: 表格常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。一般包括表头、数据行和表尾三部分。
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### 表格分类

随着表格功能越来越多，如果把所有的功能都集中在一个组件里面，代码文件会越来越臃肿。既不利于维护，也不利于按需引入必要功能的业务。

因此，表格组件有三个：`BaseTable`（基础表格）、`PrimaryTable`（主表格）、`EnhancedTable`（增强型表格），三种表格都会导出。默认导出 `PrimaryTable`。

- `BaseTable`（基础表格）包含一些基础功能：固定表头、固定列、冻结行、加载态、分页、多级表头、合并单元格、自定义单元格、自定义表头、自定义表尾、文本省略、对齐方式、表格事件、尺寸、行类名、边框、斑马线、悬浮态、空数据等
- `PrimaryTable` 或 `Table`（主表格）包含一些更高级的功能：行选中、行展开/收起、过滤、排序、异步加载、拖拽排序等。`PrimaryTable` 和 `Table` 包含 `BaseTable` 的所有功能。`Table` 和 `PrimaryTable` 完全等价。
- `EnhancedTable`（增强型表格）包含一些更复杂的功能：树形结构等。`EnhancedTable` 包含 `BaseTable` 和 `PrimaryTable` 的所有功能

一般情况下，直接使用 `PrimaryTable` 即可满足 90% 的需求，即默认导出的表格。涉及到非常复杂的需求后，使用 `EnhancedTable`。

### 基础表格

简单表格，使用分页切换数据。使用边框线、斑马纹等清晰呈现各数据单元格边界线，辅助信息区隔。

- 表格宽度模式有两种：`fixed` 和 `auto`，[MDN 详细解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout)，组件默认为 `fixed`。

{{ base }}

### 行高亮表格

支持鼠标点击或者键盘操作高亮表格行，支持仅高亮一行，或者高亮多行。
键盘操作说明：表格聚焦后，上下键操作切换高亮行，ESC 清空所有高亮行，空格键切换当前停留行高亮状态，Shift 连续选中高亮行。

{{ highlight }}

### 可自定义样式的表格

- 使用表格属性 `rowClassName` 设置行类名。
- 使用列属性 `className` 设置列类名，或具体的某一个或某一些单元格类名。
- 使用列属性 `attr: { style: {} }` 设置列内联样式，或具体的某一个或某一些单元格内联样式。

{{ style }}

### 单元格超出省略的表格

支持单元格文本超出省略、单独控制标题超出省略，单独控制超出省略的浮层内容和背景色等特性，一般用于需要悬浮显示单元格详情信息的场景。

- 使用 `ellipsis` 设置列文本超出省略显示，默认会同时控制表头的超出省略显示；只要 `ellipsis` 为真，无论是何种数据类型都会出现超出省略。
- 使用 `ellipsisTitle` 单独设置表头超出省略显示，优先级高于 `ellipsis`。

{{ ellipsis }}

### 固定表头/固定行的表格

表格内容高度超出后，滚动时表头会自动固定。可通过 `height` 或 `maxHeight` 设置表格高度，单位同 CSS 属性。建议使用 `maxHeight` 自适应高度。

表格宽度模式有两种：`fixed` 和 `auto`，[MDN 详细解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout)，组件默认为 `fixed`。如果希望表格列宽自适应，设置 `table-layout: auto` 即可。

刷新表格 DOM 元素请使用组件实例方法 `refreshTable`。

{{ fixed-header }}

### 固定列的表格

列的数量过多时，使用固定列方便表格数据内容呈现，支持固定左侧列和固定右侧列。可通过给列属性设置 `fixed: 'left'` 或 `fixed: right` 以达成固定列效果。固定列线条宽度可以通过 CSS 控制粗细。

表格宽度模式有两种：`fixed` 和 `auto`，[MDN 详细解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout)，组件默认为 `fixed`。如果希望表格列宽自适应，设置 `table-layout: auto` 即可，这种模式下固定列必须指定表格内容的总宽度 `tableContentWidth`，`tableContentWidth` 的值必须大于表格可见宽度。

多级表头中的固定列，必须指定每一个固定列的 `colKey` 和 `fixed` 属性。

⚠️ Windows 操作系统横向滚动操作：按下 Shift 键的同时，鼠标操作滚轮进行滚动。纵向滚动操作：直接鼠标操作滚轮进行滚动。

{{ fixed-column }}

### 固定表头和列的表格

支持同时固定表头和固定列。`fixedRows` 用于设置冻结首行和尾行数量，示例：`[2, 2]`。

表格宽度模式有两种：`fixed` 和 `auto`，[MDN 详细解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout)，组件默认为 `fixed`。如果希望表格列宽自适应，设置 `table-layout: auto` 即可，这种模式下固定列必须指定表格内容的总宽度 `tableContentWidth`，`tableContentWidth` 的值必须大于表格可见宽度。

多级表头中的固定列，必须指定每一个固定列的 `colKey` 和 `fixed` 属性。

{{ fixed-header-col }}

### 自定义单元格的表格

单元格默认使用 `row[colKey]` 渲染数据内容，自定义单元格有以下 3 种方式：

- 使用 `cell` 作为渲染函数，函数参数为：`{col, colIndex, row, rowIndex}`。

- 对于有插槽特性的框架，支持插槽，使用 `cell` 的值作为插槽名称；如果 `cell` 值为空，则默认取 `colKey` 作为插槽名称。注意插槽名称保持 kebab-case 或 camelCase 命名。

- 【不推荐使用】使用 `render` 渲染函数，函数参数为：`{col, colIndex, row, rowIndex, type}`，其中 `type` 的值为 `cell`。

{{ custom-cell }}

### 自定义表头的表格

标题默认使用 `title` 渲染，自定义标题则有以下 3 种方式：

- 使用 `title` 作为渲染函数，函数参数为：`title({ col, colIndex })`。

- 对于有插槽特性的框架，支持插槽，使用 `title` 的值作为插槽名称。注意插槽名称保持 kebab-case 或 camelCase 命名。

- 【不推荐使用】使用 `render` 作为渲染函数，函数参数为：`render({ col, colIndex, row, rowIndex, type })`，其中 `type` 值为 `title`。使用排序、过滤等功能时不能使用该方法。

{{ custom-header }}

### 自定义表尾的表格

表格提供自定义表尾功能，可用于表尾数据统计等场景。使用 `column.foot` 定义每一列的表尾内容。

- 默认输出 `column.foot` 字符串，如果 `foot` 类型为函数，则作为表尾渲染函数自定义表尾内容。
- 对于有插槽特性的框架，支持插槽，使用 `foot` 值作为插槽名称。注意插槽名称保持 kebab-case 或 camelCase 命名。
- 如果想定义通栏表尾，请使用 `footerSummary`
- 如果想自定义表尾合并单元格信息，请使用 `rowspanAndColspanInFooter`，类似表格内容的合并单元格方法 `rowspanAndColspan`。

{{ custom-footer }}

### 可表头吸顶/表尾吸顶的表格

- 表头吸顶，设置 `headerAffixedTop=true` 即可。如果需要调整吸顶位置及更多配置，使用 `headerAffixedTop: { offsetTop: 80 }`。
- 表尾吸底，设置 `footAffixedBottom=true` 即可。如果需要调整吸底位置及更多配置，使用 `footAffixedBottom: { offsetBottom: 60 }`。
- 滚动条吸底，设置 `horizontalScrollAffixedBottom=true` 即可。如果需要调整吸底位置及更多配置，使用 `horizontalScrollAffixedBottom: { offsetBottom: 60 }`。
- 分页器吸底，设置 `paginationAffixedBottom=true` 即可。如果需要调整吸底位置及更多配置，使用 `paginationAffixedBottom: { offsetBottom: 60 }`。

{{ affix }}

### 可展开和收起的表格

表格提供可收纳功能，展开后可以进一步查看详细内容。

- `expandedRowKeys` 用于存储展开行的值，支持非受控属性 `defaultExpandedRowKeys`。
- `expandedRow` 用于定义展开行显示的具体内容，参数有 `{ row, rowIndex }`。
- `expandIcon` 用于自定义展开图标，值为 true 显示默认图标，值为 false 不显示图标，值为函数则表示完全自定义图标。
- `expandOnRowClick` 表示是否允许点击表格行时展开。
- 展开行发生变化时会触发展开行变化事件。

{{ expandable }}

### 可进行列配置的表格

自定义设置需要展示的列，可以通过 `columnController` 字段来设置，更多细节可产看 API 文档中的 `TableColumnController` 描述。

- `displayColumns` 表示当前显示列，支持非受控属性 `defaultDisplayColumns`。
- `onDisplayColumnsChange` 会在列配置确认后触发。
- `onColumnChange` 会在列配置选择时（确认之前）触发。
- `columnController.placement` 用于调整列配置按钮基于表格的放置位置，共有 4 种位置：左上角、右上角、左下角、右下角。
- `columnController.fields` 用于设置哪些列被允许控制显示或隐藏，不传表示全部列可以进行显示或隐藏控制。
- `columnController.displayType` 用来设置列配置弹窗中，列字段排列方式，定宽或自动宽度。可选值： `auto-width` 和 `fixed-width`。
- 支持透传 `CheckboxGroup` 组件全部属性，`columnController.checkboxGroupProps` 用于控制弹框中的复现框相关功能。
- 支持透传 `Dialog` 组件全部属性，`columnController.dialogProps` 用于调整列配置弹框相关功能，如：防止滚动穿透。
- 支持透传 `Button` 组件全部属性，`columnController.buttonProps` 用于控制列配置按钮的全部特性，如：按钮颜色和文本。
- `columnControllerVisible` 自由控制是否显示列配置框，一般用于希望完全自定义列配置按钮的场景。
- `onColumnControllerVisibleChange` 列配置框显示或隐藏时触发。

#### 示例一：包含配置按钮的列配置功能示例

{{ custom-col-button }}

#### 示例二：不包含配置按钮的列配置功能示例

使用 `columnControllerVisible` 控制是否显示列配置弹框，`onColumnControllerVisibleChange` 用于监听相关变化。一般应用于需要完全自定义列配置按钮内容和位置的场景。

{{ custom-col }}

### 可排序的表格

对先后顺序有要求的场景（如安全策略场景），提供表格排序能力，用户可以调整位置。

#### 单字段排序

- 将需要排序的列属性 `sorter` 设置为 `true`，示例：`{ colKey: 'date', title: '日期', sorter: true }`。
- 设置表格排序属性 `sort` 的值为 `{ sortBy: 'date', descending: true }`，其中 `descending` 表示是否为降序排序，值为 `true` 表示降序，值为 `false` 表示升序。
- 排序发生变化时，监听事件 `onSortChange`，在事件处理程序中添加业务逻辑。
- 使用 `showSortColumnBgColor` 控制是否显示排序列背景色，用于更加显示地提醒用户具体的排序列。

提供列属性 `sortType`，用于自定义支持排序方式。可选值有 `desc`/`asc`/`all`，分别表示只能降序徘、只能升序徘、降序和升序。

{{ single-sort }}

#### 多字段排序

- 设置表格属性 `multipleSort` 为 true。
- 将需要排序的列属性 `sorter` 设置为 true，可以设置多个列，示例：`[{ colKey: 'date', title: '日期', sorter: true }, { colKey: 'cost', title: '花费', sorter: true }]`。
- 设置表格排序属性 `sort` 的值为 `[{ sortBy: 'date', descending: true }, { sortBy: 'cost', descending: false }]`

{{ multiple-sort }}

#### 本地数据排序

本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。

- 将需要排序的列属性 `sorter` 设置为排序函数，示例：`{ colKey: 'date', title: '日期', sorter: (a, b) => a.status - b.status }`。
- 设置表格排序属性 `sort` 的值为 `{ sortBy: 'date', descending: true }`。
- 排序发生变化时，监听事件 `onSortChange`，在事件处理程序中添加业务逻辑。
- 排序发生变化时，因为是本地数据排序，因此数据也会发生变化，需要监听 `onDatachange`，事件处理受控数据。

{{ data-sort }}

### 可选中行的表格

在涉及到表单选择、或批量操作场景中，可在数据行前直接单选或多选操作对象。

#### 示例一：单选(Radio)

- `selectedRowKeys` 表示当前选中行的唯一标识数组，支持非受控属性 `defaultSelectedRowKeys`
- `onSelectChange` 会在选中行发生变化时触发
- 设置 `columns: [{ colKey: 'row-select', type: 'single' }]` 可以将任意列定义为行选中操作列。

{{ select-single }}

#### 示例二：多选(Checkbox)

- `selectedRowKeys` 表示当前选中行的唯一标识数组，支持非受控属性 `defaultSelectedRowKeys`
- `onSelectChange` 会在选中行发生变化时触发
- 设置 `columns: [{ colKey: 'row-select', type: 'multiple' }]` 可以将任意列定义为行选中操作列。
- 分页场景下的行选中，默认允许跨分页选中，即翻页时，上一页选中结果依然保存。如果希望每一页单独控制选中，互不影响，可设置 `reserveSelectedRowOnPaginate=false`
- 注意：如果发现点击某一行便选中了全部，说明 `rowKey` 设置不正确，或者没有设置，请确保 `rowKey` 的值为 `data` 中的字段。

{{ select-multiple }}

#### 示例三：没有操作列的行选中

不带操作列的行选中表格，一般用于一些简要选择场景，通过点击行直接选中。可以通过 `rowSelectionType: 'single' | 'multiple'` 控制单选或多选。

{{ select-without-handler }}

### 可分页的表格

#### 远程数据分页

远程数据分页，表示组件内部不会对参数 `data` 进行分页。只输出分页信息，以供远程请求进行分页。

{{ pagination-ajax }}

#### 本地数据分页

当 `data.length` 长度超过 `pageSize`，单页已无法完整地显示数据，此时会自动开启本地数据分页，组件内部会对 `data` 进行分页。
如果希望禁用组件内部分页，可以设置 `disableDataPage=true`。

{{ pagination }}

### 可筛选的表格

组件默认内置：复选框、单选按钮、输入框等类型的筛选器。同时，也可以自定义任何筛选器，如示例中的日期选择器。

- 表格属性 `filterValue` 用于设置过滤功能默认值，示例：`{ firstName: '' }`。
- 表格属性 `filterIcon` 用于设置自定义过滤图标。
- 筛选器值发生变化时，会触发 `filterChange` 事件。
- 列配置 `filter.type` 决定使用哪一种筛选器，可选值有：`single/multiple/input`，分别表示：单选按钮筛选器、复选框筛选器、输入框筛选器。也可以使用 `filter.component` 自定义筛选组件。
- 列配置 `filter.list` 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 single 或 multiple 时有效。
- 列配置 `filter.props` 用于透传筛选器属性，可以对筛选器进行任何原组件支持的属性配置.
- 列配置 `filter.component` 用于自定义筛选器，只要保证自定义筛选器包含 `value` 属性 和 `change` 事件，即可像内置筛选器一样正常使用。
- 列配置 `filter.showConfirmAndReset` 用于控制是否显示“确认”“重置”按钮.
- 列配置 `filter.resetValue` 用于设置点击“重置”按钮时的重置值，并非每个场景都会重置为 `''` 或 `[]` `null`，默认重置为 `''`。
- 表格属性 `filterRow` 可完全自定义过滤结果行显示内容，设置 `filterRow=null` 隐藏过滤行。
- 更多功能属性请查看 API 文档中的 `TableColumnFilter`

{{ filter-controlled }}

### 带合并单元格的表格

根据数据结构，可以将表格中的行列进行合并。

- 使用表格属性 `rowspanAndColspan` 设置表格内容合并元格。
- 使用表格属性 `rowspanAndColspanInFooter` 设置表尾合并单元格。
- 使用列属性 `colspan` 设置表头合并。如果是多行表头，请参考下方「多级表头」示例。

{{ merge-cells }}

### 多级表头的表格

表头数据标签可采用多级呈现，表述信息层级包含关系。

- 多级表头的配置只需要在列配置中添加 `children` 子列配置即可。
- 多级表头中的固定列，必须指定每一个固定列的 `colKey` 和 `fixed` 属性。
- 多级表表头中的列宽设置，只需指定最后一层表头宽度。

{{ multi-header }}

### 加载状态的表格

#### 普通加载

普通加载，会在表格上面显示半透明加载层，表格内容不隐藏。

- `loading=true` 显示默认加载状态；`loading=false` 不显示加载状态；`loading`值类型为函数，则表示自定义加载状态文本内容，对于支持插槽的框架还支持同名插槽（不包含加载图标）。
- `loadingProps` 用于透传加载组件全部属性，可以使用该特性定制化更多个性加载状态。

{{ loading }}

#### 异步加载

使用 `asyncLoading` 定义异步加载状态。

- `asyncLoading=''` 表示非加载状态或加载完成状态；
- `asyncLoading='load-more'` 表格底部显示“加载更多”；
- `asyncLoading='loading'` 表格底部显示“正在加载中，请稍后”；
- `asyncLoading` 值类型为函数，则表示完全自定义底部异步加载内容。

{{ async-loading }}

### 空表格

使用默认空表格样式。

{{ empty }}

### 可拖拽排序的表格

通过拖拽表格行调整顺序，拖拽表头表头调整列顺序。

- `dragSort='row'` 用于设置表格为行拖拽排序。
- `dragSort='row-handler'` 用于设置表格为行拖拽排序，即通过拖拽手柄调控拖拽排序。这种模式，还需同步设置手柄列，`{ colKey: 'drag', cell: () => <MoveIcon /> }`。
- `dragSort='col'` 用于设置表格为列拖拽排序。
- `sortOnRowDraggable` 用于行拖拽排序。已废弃，请更为使用 `dragSort='row'`，兼容支持。

#### 示例一：无手柄列的行拖拽排序

设置参数 `dragSort='row'` 即可。

{{ drag-sort }}

#### 示例二：有手柄列的行拖拽排序

设置参数 `dragSort='row-handler'` 的同时，还需要添加手柄列：`{ colKey: 'sort', cell: () => <MoveIcon /> }`。

{{ drag-sort-handler }}

#### 列拖拽排序

【持续完善中】调整列顺序。设置参数 `dragSort='col'` 即可。列拖拽排序场景中，必须指定列唯一标识 `colKey`。

{{ drag-col-sort }}

### 懒加载的表格

懒加载一般用于数据量较大的场景，设置 `scroll={ type: 'lazy' }` 即可开启懒加载模式，通过 `scroll.bufferSize` 预设加载过程中提前加载的数据数量。

{{ lazy }}

### 虚拟滚动的表格

虚拟滚动场景下，支持表格的几乎全部功能，如：固定列、固定表头、固定表尾、表头吸顶、表尾吸底等。实验场地请参看「多级表头的表格」示例。

- 虚拟滚动一般用于超大数据渲染的场景，以提供更优的前端性能表现，设置 `scroll={ type: 'virtual' }` 即可开启虚拟滚动模式。
- 为保证组件收益最大化，当数据量小于 `threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`threshold` 默认为 `100`。

{{ virtual-scroll }}

### 可编辑的表格

可编辑的表格分为单元格编辑表格和行编辑表格两种。详细完整的接口请查看 API 文档中的 `TableEditableCellConfig`。

#### 可编辑单元格的表格

- `column.edit.component` 表示进行编辑的组件，示例：Input、Select、DatePicker。需保证组件包含 `value` 和 `onChange` 两个属性。如果还需要支持校验规则，则组件还需实现 `tips` 和 `status` 两个 API，实现规则可参考 `Input` 组件。
- `column.edit.props` 表示传给编辑组件 `column.edit.component` 的参数。
- `column.edit.onEdited` 表示编辑完成后，退出编辑模式时触发。
- `column.edit.rules` 指校验规则，和表单的校验规则配置一样 `FormRule`。
- `column.edit.abortEditOnEvent` 表示除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态。如：单选框值变化事件 `onChange`，一般情况无需配置。
- `column.edit.defaultEditable` 默认状态是否为编辑态。
- `editableCellState` 表格全局属性，用于控制单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态

{{ editable-cell }}

#### 可编辑行的表格

可对表格进行整行编辑和保存等操作。

- `editableRowKeys` 用于控制处于编辑状态的行。
- `onRowEdit` 会在行编辑时触发。
- 实例方法 `validateRowData` 用于进行表格行数据校验，`onRowValidate` 在行编辑校验完成时触发。
- 实例方法 `validateTableData` 用于进行表格全部数据校验，`onValidate` 在全部数据校验完成时触发。

{{ editable-row }}


### 树形结构的表格

请使用 `EnhancedTable`，`Table/PrimaryTable/BaseTable` 等不支持树形结构。

⚠️ 树形结构的表格，支持添加节点、删除节点、交换同级节点、查询节点、展开/收起节点等丰富特性。为减少每次计算的递归查询，也为以后虚表做准备，故而内部数据为平铺结构，所有数据变化均通过组件实例方法控制，具体实例方法请查看 API 文档 `EnhancedTableInstanceFunctions`。树形结构细节配置请查看 `tree: TableTreeConfig`。

- `treeExpandAndFoldIcon` 用于设置树形结构折叠/展开图标，支持全局配置。
- 子节点字段默认为 `children`，可以使用 `tree.childrenKey` 定义字段别名，示例：`tree={ childrenKey: 'list' }`。
- `tree.indent` 用于设置树结点缩进距离，叶子结点的距离可以通过类名 `t-table__tree-leaf-node` 单独设置。
- `tree.treeNodeColumnIndex` 用于设置第几列作为树形结构操作列
- `tree.checkStrictly` 表示树形结构的行选中（多选），父子行选中是否独立，默认独立，值为 true。
- `tree.defaultExpandAll=true` 表示默认展开全部节点，后续可通过 `expandAll` 和 `foldAll` 控制全部展开或全部收起。使用 `toggleExpandData` 控制单个节点的展开和收起。
- 刷新表格数据请使用组件实例方法 `resetData`。
- 获取树形结构数据可使用组件实例方法 `getTreeNode`。

#### 树形结构显示

{{ tree }}

#### 树形结构行选中

{{ tree-select }}
