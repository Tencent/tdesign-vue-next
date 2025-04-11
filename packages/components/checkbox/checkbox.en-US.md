:: BASE_DOC ::

## API

### Checkbox Props

name | type | default | description | required
-- | -- | -- | -- | --
checkAll | Boolean | false | \- | N
checked | Boolean | false | `v-model` and `v-model:checked` is supported | N
defaultChecked | Boolean | false | uncontrolled property | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | undefined | \- | N
indeterminate | Boolean | false | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
lazyLoad | Boolean | false | load checkbox content when it entering the visible area | N
name | String | - | \- | N
readonly | Boolean | undefined | \- | N
title | String | - | html attribute | N
value | String / Number / Boolean | - | value of checkbox。Typescript：`string \| number \| boolean` | N
onChange | Function |  | Typescript：`(checked: boolean, context: { e: Event }) => void`<br/> | N

### Checkbox Events

name | params | description
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | \-


### CheckboxGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | undefined | \- | N
lazyLoad | Boolean | false | load checkbox content when it entering the visible area | N
max | Number | undefined | \- | N
name | String | - | \- | N
options | Array | - | Typescript：`Array<CheckboxOption>` `type CheckboxOption = string \| number \| CheckboxOptionObj` `interface CheckboxOptionObj extends TdCheckboxProps { text?: string; }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/checkbox/type.ts) | N
readonly | Boolean | undefined | \- | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/checkbox/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/checkbox/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: CheckboxGroupChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number \| boolean; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/> | N

### CheckboxGroup Events

name | params | description
-- | -- | --
change | `(value: T, context: CheckboxGroupChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number \| boolean; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/>
