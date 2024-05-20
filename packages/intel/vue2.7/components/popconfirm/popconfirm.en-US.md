:: BASE_DOC ::

## API
### Popconfirm Props

name | type | default | description | required
-- | -- | -- | -- | --
cancelBtn | String / Object / Slot / Function | '' | Typescript：`string \| ButtonProps \| TNode`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popconfirm/type.ts) | N
confirmBtn | String / Object / Slot / Function | '' | Typescript：`string \| ButtonProps \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | true | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
placement | String | top | options：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popconfirm/type.ts) | N
showArrow | Boolean | true | \- | N
theme | String | default | options：default/warning/danger | N
triggerElement | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
visible | Boolean | - | `.sync` is supported | N
defaultVisible | Boolean | - | uncontrolled property | N
onCancel | Function |  | Typescript：`(options: { e: MouseEvent }) => void`<br/> | N
onConfirm | Function |  | Typescript：`(options: { e: MouseEvent }) => void`<br/> | N
onVisibleChange | Function |  | Typescript：`(visible: boolean, context?: PopconfirmVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popconfirm/type.ts)。<br/>`interface PopconfirmVisibleChangeContext { trigger?: TriggerSource; e?: MouseEvent }`<br/><br/>`type TriggerSource = 'cancel' \| 'confirm' \| 'document' \| 'trigger-element-click'`<br/> | N

### Popconfirm Events

name | params | description
-- | -- | --
cancel | `(options: { e: MouseEvent })` | \-
confirm | `(options: { e: MouseEvent })` | \-
visible-change | `(visible: boolean, context?: PopconfirmVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popconfirm/type.ts)。<br/>`interface PopconfirmVisibleChangeContext { trigger?: TriggerSource; e?: MouseEvent }`<br/><br/>`type TriggerSource = 'cancel' \| 'confirm' \| 'document' \| 'trigger-element-click'`<br/>
