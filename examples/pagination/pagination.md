:: BASE_DOC ::

<!-- 可在这里自行添加 demo 展示 -->
## API

### Pagination Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
current | Number | 1 | 当前页。支持语法糖 | N
defaultCurrent | Number | 1 | 当前页。非受控属性 | N
disabled | Boolean | false | 是否禁用分页组件 | N
foldedMaxPageBtn | Number | 5 | 折叠时最多显示页码按钮数 | N
maxPageBtn | Number | 10 | 最多显示页码按钮数 | N
pageSize | Number | 10 | 分页总页数。支持语法糖 | N
defaultPageSize | Number | 10 | 分页总页数。非受控属性 | N
pageSizeOptions | Array | () => [5, 10, 20, 50] | 分页大小控制器，值为 [] 则不显示。TS 类型：`Array<number | { label: string; value: number }>` | N
showJumper | Boolean | false | 是否显示跳转页码控制器 | N
size | String | medium | 分页组件尺寸。可选项：small/medium | N
theme | String | default | 分页组件风格。可选项：default/simple | N
total | Number | 0 | 数据总条数 | N
totalContent | Boolean / Slot / Function | true | 用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
onChange | Function |  | 当前页或分页大小发生变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/pagination/type.ts)。`(pageInfo: PageInfo) => {}` | N
onCurrentChange | Function |  | 当前页发生变化时触发。`(current: number, pageInfo: PageInfo) => {}` | N
onPageSizeChange | Function |  | 分页大小发生变化时触发。`(pageSize: number, pageInfo: PageInfo) => {}` | N

### Pagination Events

名称 | 参数 | 描述
-- | -- | --
change | `(pageInfo: PageInfo)` | 当前页或分页大小发生变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/pagination/type.ts)
current-change | `(current: number, pageInfo: PageInfo)` | 当前页发生变化时触发
page-size-change | `(pageSize: number, pageInfo: PageInfo)` | 分页大小发生变化时触发
