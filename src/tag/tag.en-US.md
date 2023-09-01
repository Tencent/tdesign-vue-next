:: BASE_DOC ::

## API

### Tag Props

| name     | type                     | default   | description                                                                                                                                           | required |
| -------- | ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| closable | Boolean                  | false     | \-                                                                                                                                                    | N        |
| color    | String                   | \-        | \-                                                                                                                                                    | N        |
| content  | String / Slot / Function | -         | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)                       | N        |
| default  | String / Slot / Function | -         | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)                       | N        |
| disabled | Boolean                  | false     | \-                                                                                                                                                    | N        |
| icon     | Slot / Function          | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)                                 | N        |
| maxWidth | String / Number          | -         | \-                                                                                                                                                    | N        |
| shape    | String                   | square    | options：square/round/mark                                                                                                                            | N        |
| size     | String                   | medium    | options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N        |
| theme    | String                   | default   | options：default/primary/warning/danger/success                                                                                                       | N        |
| variant  | String                   | dark      | options：dark/light/outline/light-outline                                                                                                             | N        |
| onClick  | Function                 |           | Typescript：`(context: { e: MouseEvent }) => void`<br/>                                                                                               | N        |
| onClose  | Function                 |           | Typescript：`(context: { e: MouseEvent }) => void`<br/>                                                                                               | N        |

### Tag Events

| name  | params                         | description |
| ----- | ------------------------------ | ----------- |
| click | `(context: { e: MouseEvent })` | \-          |
| close | `(context: { e: MouseEvent })` | \-          |

### CheckTag Props

| name           | type                                      | default | description                                                                                                                                           | required |
| -------------- | ----------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| checked        | Boolean                                   | -       | `v-model` and `v-model:checked` is supported                                                                                                          | N        |
| defaultChecked | Boolean                                   | -       | uncontrolled property                                                                                                                                 | N        |
| content        | String / Number / Array / Slot / Function | -       | Typescript：`string \| number \| string[] \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N        |
| default        | String / Slot / Function                  | -       | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)                       | N        |
| disabled       | Boolean                                   | false   | \-                                                                                                                                                    | N        |
| size           | String                                    | medium  | options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N        |
| onChange       | Function                                  |         | Typescript：`(checked: boolean) => void`<br/>                                                                                                         | N        |
| onClick        | Function                                  |         | Typescript：`(context: { e: MouseEvent }) => void`<br/>                                                                                               | N        |

### CheckTag Events

| name   | params                         | description |
| ------ | ------------------------------ | ----------- |
| change | `(checked: boolean)`           | \-          |
| click  | `(context: { e: MouseEvent })` | \-          |
