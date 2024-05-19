### 表格分类

随着表格功能越来越多，如果把所有的功能都集中在一个组件里面，代码文件会越来越臃肿。既不利于维护，也不利于按需引入必要功能的业务。

因此，表格组件有三个：`BaseTable`（基础表格）、`PrimaryTable`（主表格）、`EnhancedTable`（增强型表格），三种表格都会导出。默认导出 `PrimaryTable`。

- `BaseTable`（基础表格）包含一些基础功能：固定表头、固定列、冻结行、加载态、分页、多级表头、合并单元格、自定义单元格、自定义表头、自定义表尾、文本省略、对齐方式、表格事件、尺寸、行类名、边框、斑马线、悬浮态、空数据等
- `PrimaryTable` 或 `Table`（主表格）包含一些更高级的功能：行展开/收起、过滤、排序、异步加载、拖拽排序等。`PrimaryTable` 和 `Table` 包含 `BaseTable` 的所有功能。`Table` 和 `PrimaryTable` 完全等价。
- `EnhancedTable`（增强型表格）包含一些更复杂的功能：树形结构等。`EnhancedTable` 包含 `BaseTable` 和 `PrimaryTable` 的所有功能

一般情况下，直接使用 `PrimaryTable` 即可满足 90% 的需求，即默认导出的表格。涉及到非常复杂的需求后，使用 `EnhancedTable`。

### 功能文件分类

- hooks/useStyle 基础样式，BaseTable
- hooks/useClassName 全部类名，BaseTable
- hooks/useAffix 吸顶和吸底，BaseTable（表头吸顶、表尾吸底、底部滚动条吸底、分页器吸底）
- hooks/useTableHeader 表头，BaseTable
- hooks/useRowspanAndColspan 合并单元格，BaseTable
- hooks/useColumnResize 列宽可拖动，BaseTable
- hooks/useFixed 固定表头/固定列/固定行，表头吸顶，表尾吸顶，BaseTable
- hooks/useMultiHeader 多级表头，BaseTable
- hooks/usePagination 分页，BaseTable
- hooks/useLazyLoad 懒加载，BaseTable

- hooks/useAsyncLoading 异步加载功能，PrimaryTable
- hooks/useColumnController 自定义列配置，PrimaryTable
- hooks/useFilter 过滤/筛选，PrimaryTable
- hooks/useRowExpand 展开/收起行，PrimaryTable
- hooks/useRowSelect 行选中，PrimaryTable
- hooks/useSorter 排序，PrimaryTable
- hooks/useDragSort 拖拽排序，PrimaryTable

- hooks/useTreeData 树形结构，EnhancedTable
- hooks/useTreeSelect 树形选择，EnhancedTable
