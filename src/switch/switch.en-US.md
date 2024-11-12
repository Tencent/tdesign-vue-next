:: BASE_DOC ::

## API
### Switch Props

name | type | default | description | required
-- | -- | -- | -- | --
beforeChange | Function | - | stop checked change。Typescript：`() => boolean \| Promise<boolean>` | N
customValue | Array | - | Typescript：`Array<SwitchValue>` | N
disabled | Boolean | undefined | \- | N
label | Array / Slot / Function | [] | Typescript：`Array<string \| TNode> \| TNode<{ value: SwitchValue }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
size | String | medium | options: small/medium/large | N
value | String / Number / Boolean | - | `v-model` and `v-model:value` is supported。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/switch/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: { e: MouseEvent }) => void`<br/> | N

### Switch Events

name | params | description
-- | -- | --
change | `(value: T, context: { e: MouseEvent })` | \-
