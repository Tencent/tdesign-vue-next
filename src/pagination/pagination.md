:: BASE_DOC ::

## API
### Pagination Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
current | Number | 1 | 当前页。支持语法糖 `v-model` 或 `v-model:current` | N
defaultCurrent | Number | 1 | 当前页。非受控属性 | N
disabled | Boolean | - | 是否禁用分页组件 | N
foldedMaxPageBtn | Number | 5 | 折叠时最多显示页码按钮数 | N
maxPageBtn | Number | 10 | 最多显示页码按钮数 | N
pageEllipsisMode | String | mid | 页码数量超出时，前后省略模式, `mid`表示中间省略, `both-ends` 表示两端省略。可选项：mid/both-ends | N
pageSize | Number | 10 | 每一页的数据量。支持语法糖 `v-model:pageSize` | N
defaultPageSize | Number | 10 | 每一页的数据量。非受控属性 | N
pageSizeOptions | Array | [5, 10, 20, 50] | 分页大小控制器，值为 [] 则不显示。TS 类型：`Array<number \| { label: string; value: number }>` | N
selectProps | Object | - | 透传全部属性到 Select 组件，也可使用 `selectProps.popupProps` 透传全部 Popup 组件。TS 类型：`SelectProps`，[Select API Documents](./select?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts) | N
showFirstAndLastPageBtn | Boolean | false | 是否显示跳转首页尾页页码控制器 | N
showJumper | Boolean | false | 是否显示跳转页码控制器 | N
showPageNumber | Boolean | true | 是否显示页码控制器 | N
showPageSize | Boolean | true | 是否显示分页数量控制器 | N
showPreviousAndNextBtn | Boolean | true | 是否显示跳转前后页页码控制器 | N
size | String | medium | 分页组件尺寸。可选项：small/medium | N
theme | String | default | 分页组件风格。可选项：default/simple | N
total | Number | 0 | 数据总条数 | N
totalContent | Boolean / Slot / Function | true | 用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onChange | Function |  | TS 类型：`(pageInfo: PageInfo) => void`<br/>当前页或分页大小发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts)。<br/>`interface PageInfo { current: number; previous: number; pageSize: number }`<br/> | N
onCurrentChange | Function |  | TS 类型：`(current: number, pageInfo: PageInfo) => void`<br/>当前页发生变化时触发 | N
onPageSizeChange | Function |  | TS 类型：`(pageSize: number, pageInfo: PageInfo) => void`<br/>分页大小发生变化时触发 | N

### Pagination Events

名称 | 参数 | 描述
-- | -- | --
change | `(pageInfo: PageInfo)` | 当前页或分页大小发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts)。<br/>`interface PageInfo { current: number; previous: number; pageSize: number }`<br/>
current-change | `(current: number, pageInfo: PageInfo)` | 当前页发生变化时触发
page-size-change | `(pageSize: number, pageInfo: PageInfo)` | 分页大小发生变化时触发

### PaginationMini Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean / Object | - | 按钮禁用配置。TS 类型：`boolean \| JumperDisabledConfig` `type JumperDisabledConfig = { prev?: boolean; current?: boolean; next?: boolean; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts) | N
layout | String | horizontal | 按钮方向。可选项：horizontal/vertical | N
showCurrent | Boolean | true | 是否展示当前按钮。TS 类型：`boolean` | N
size | String | medium | 按钮尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tips | Object | - | 提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容。TS 类型：`boolean \| JumperTipsConfig` `type JumperTipsConfig = { prev?: string; current?: string; next?: string; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts) | N
variant | String | text | 按钮形式。可选项：text/outline | N
onChange | Function |  | TS 类型：`(context: {e: MouseEvent, trigger: JumperTrigger}) => void`<br/>按钮点击事件回调。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts)。<br/>`type JumperTrigger = 'prev' \| 'current' \| 'next'`<br/> | N

### PaginationMini Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: {e: MouseEvent, trigger: JumperTrigger})` | 按钮点击事件回调。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/pagination/type.ts)。<br/>`type JumperTrigger = 'prev' \| 'current' \| 'next'`<br/>
