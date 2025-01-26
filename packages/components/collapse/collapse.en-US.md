:: BASE_DOC ::

## API

### Collapse Props

name | type | default | description | required
-- | -- | -- | -- | --
borderless | Boolean | false | \- | N
defaultExpandAll | Boolean | false | \- | N
disabled | Boolean | - | \- | N
expandIcon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expandIconPlacement | String | left | options：left/right | N
expandMutex | Boolean | false | \- | N
expandOnRowClick | Boolean | true | \- | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`CollapseValue` `type CollapseValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/collapse/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`CollapseValue` `type CollapseValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/collapse/type.ts) | N
onChange | Function |  | Typescript：`(value: CollapseValue) => void`<br/> | N

### Collapse Events

name | params | description
-- | -- | --
change | `(value: CollapseValue)` | \-

### CollapsePanel Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
destroyOnCollapse | Boolean | false | \- | N
disabled | Boolean | undefined | \- | N
expandIcon | Boolean / Slot / Function | undefined | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
header | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
headerRightContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | required | Y
