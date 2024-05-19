:: BASE_DOC ::

## API
### Pagination Props

name | type | default | description | required
-- | -- | -- | -- | --
current | Number | 1 | `v-model` is supported | N
defaultCurrent | Number | 1 | uncontrolled property | N
disabled | Boolean | - | \- | N
foldedMaxPageBtn | Number | 5 | \- | N
maxPageBtn | Number | 10 | \- | N
pageEllipsisMode | String | mid | options：mid/both-ends | N
pageSize | Number | 10 | each page count。`.sync` is supported | N
defaultPageSize | Number | 10 | each page count。uncontrolled property | N
pageSizeOptions | Array | [5, 10, 20, 50] | Typescript：`Array<number \| { label: string; value: number }>` | N
selectProps | Object | - | Typescript：`SelectProps`，[Select API Documents](./select?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts) | N
showFirstAndLastPageBtn | Boolean | false | \- | N
showJumper | Boolean | false | \- | N
showPageNumber | Boolean | true | \- | N
showPageSize | Boolean | true | \- | N
showPreviousAndNextBtn | Boolean | true | \- | N
size | String | medium | options：small/medium | N
theme | String | default | options：default/simple | N
total | Number | 0 | \- | N
totalContent | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
onChange | Function |  | Typescript：`(pageInfo: PageInfo) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts)。<br/>`interface PageInfo { current: number; previous: number; pageSize: number }`<br/> | N
onCurrentChange | Function |  | Typescript：`(current: number, pageInfo: PageInfo) => void`<br/> | N
onPageSizeChange | Function |  | Typescript：`(pageSize: number, pageInfo: PageInfo) => void`<br/> | N

### Pagination Events

name | params | description
-- | -- | --
change | `(pageInfo: PageInfo)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts)。<br/>`interface PageInfo { current: number; previous: number; pageSize: number }`<br/>
current-change | `(current: number, pageInfo: PageInfo)` | \-
page-size-change | `(pageSize: number, pageInfo: PageInfo)` | \-

### PaginationMini Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean / Object | - | Typescript：`boolean \| JumperDisabledConfig` `type JumperDisabledConfig = { prev?: boolean; current?: boolean; next?: boolean; }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts) | N
layout | String | horizontal | horizontal or vertical。options：horizontal/vertical | N
showCurrent | Boolean | true | Typescript：`boolean` | N
size | String | medium | Button size。options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
tips | Object | - | Typescript：`boolean \| JumperTipsConfig` `type JumperTipsConfig = { prev?: string; current?: string; next?: string; }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts) | N
variant | String | text | options：text/outline | N
onChange | Function |  | Typescript：`(context: {e: MouseEvent, trigger: JumperTrigger}) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts)。<br/>`type JumperTrigger = 'prev' \| 'current' \| 'next'`<br/> | N

### PaginationMini Events

name | params | description
-- | -- | --
change | `(context: {e: MouseEvent, trigger: JumperTrigger})` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/pagination/type.ts)。<br/>`type JumperTrigger = 'prev' \| 'current' \| 'next'`<br/>
