:: BASE_DOC ::

## API
### Tabs Props

name | type | default | description | required
-- | -- | -- | -- | --
action | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
addable | Boolean | false | \- | N
disabled | Boolean | false | \- | N
dragSort | Boolean | false | \- | N
list | Array | - | Typescript：`Array<TdTabPanelProps>` | N
placement | String | top | options: left/top/bottom/right | N
size | String | medium | options: medium/large | N
theme | String | normal | options: normal/card | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`TabValue` `type TabValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tabs/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`TabValue` `type TabValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tabs/type.ts) | N
onAdd | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TabValue) => void`<br/> | N
onDragSort | Function |  | Typescript：`(context: TabsDragSortContext) => void`<br/>trigger on drag sort。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tabs/type.ts)。<br/>`interface TabsDragSortContext { currentIndex: number; current: TabValue; targetIndex: number; target: TabValue }`<br/> | N
onRemove | Function |  | Typescript：`(options: { value: TabValue; index: number; e: MouseEvent }) => void`<br/> | N

### Tabs Events

name | params | description
-- | -- | --
add | `(context: { e: MouseEvent })` | \-
change | `(value: TabValue)` | \-
drag-sort | `(context: TabsDragSortContext)` | trigger on drag sort。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tabs/type.ts)。<br/>`interface TabsDragSortContext { currentIndex: number; current: TabValue; targetIndex: number; target: TabValue }`<br/>
remove | `(options: { value: TabValue; index: number; e: MouseEvent })` | \-

### TabPanel Props

name | type | default | description | required
-- | -- | -- | -- | --
default | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
destroyOnHide | Boolean | true | \- | N
disabled | Boolean | false | \- | N
draggable | Boolean | true | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazy | Boolean | false | Enable tab lazy loading | N
panel | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
removable | Boolean | false | \- | N
value | String / Number | - | Typescript：`TabValue` | N
onRemove | Function |  | Typescript：`(options: { value: TabValue; e: MouseEvent }) => void`<br/> | N

### TabPanel Events

name | params | description
-- | -- | --
remove | `(options: { value: TabValue; e: MouseEvent })` | \-
