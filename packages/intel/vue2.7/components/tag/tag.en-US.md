:: BASE_DOC ::

## API
### Tag Props

name | type | default | description | required
-- | -- | -- | -- | --
closable | Boolean | false | \- | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
icon | Slot / Function | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
maxWidth | String / Number | - | \- | N
shape | String | square | options: square/round/mark | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | default | options: default/primary/warning/danger/success | N
variant | String | dark | options: dark/light/outline/light-outline | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Tag Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | \-
close | `(context: { e: MouseEvent })` | \-

### CheckTag Props

name | type | default | description | required
-- | -- | -- | -- | --
checked | Boolean | - | `v-model` is supported | N
defaultChecked | Boolean | - | uncontrolled property | N
checkedProps | Object | - | used to set checked tag props。Typescript：`TdTagProps` | N
content | String / Number / Array / Slot / Function | - | Typescript：`string \| number \| string[] \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
uncheckedProps | Object | - | used to set unchecked tag props。Typescript：`TdTagProps` | N
value | String / Number | - | tag unique key | N
onChange | Function |  | Typescript：`(checked: boolean, context: CheckTagChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagChangeContext { e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/> | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### CheckTag Events

name | params | description
-- | -- | --
change | `(checked: boolean, context: CheckTagChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagChangeContext { e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/>
click | `(context: { e: MouseEvent })` | \-

### CheckTagGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
checkedProps | Object | - | used to set checked tag props。Typescript：`TdTagProps` | N
multiple | Boolean | false | allow to select multiple tags | N
options | Array | - | tag list。Typescript：`CheckTagGroupOption[]` `interface CheckTagGroupOption extends TdCheckTagProps { label: string \| TNode; value: string \| number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts) | N
uncheckedProps | Object | - | used to set unchecked tag props。Typescript：`TdTagProps` | N
value | Array | [] | selected tag value list。`v-model` is supported。Typescript：`CheckTagGroupValue` `type CheckTagGroupValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts) | N
defaultValue | Array | [] | selected tag value list。uncontrolled property。Typescript：`CheckTagGroupValue` `type CheckTagGroupValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts) | N
onChange | Function |  | Typescript：`(value: CheckTagGroupValue, context: CheckTagGroupChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagGroupChangeContext { type: 'check' \| 'uncheck'; e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/> | N

### CheckTagGroup Events

name | params | description
-- | -- | --
change | `(value: CheckTagGroupValue, context: CheckTagGroupChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/tag/type.ts)。<br/>`interface CheckTagGroupChangeContext { type: 'check' \| 'uncheck'; e: MouseEvent \| KeyboardEvent; value: string \| number }`<br/>
