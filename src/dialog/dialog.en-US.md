:: BASE_DOC ::

## API

### Dialog Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | '' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
body | String / Slot / Function | '' | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | '' | Typescript：`string | ButtonProps | TNode | null`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts) | N
closeBtn | String / Boolean / Slot / Function | true | Typescript：`string | boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | undefined | \- | N
closeOnOverlayClick | Boolean | undefined | \- | N
confirmBtn | String / Object / Slot / Function | '' | Typescript：`string | ButtonProps | TNode | null`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
confirmOnEnter | Boolean | - | confirm on enter | N
default | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | \- | N
draggable | Boolean | false | \- | N
footer | Boolean / Slot / Function | true | Typescript：`boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
fullscreen | Boolean | false | \- | N
header | String / Boolean / Slot / Function | true | Typescript：`string | boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
mode | String | modal | options：modal/modeless/normal | N
placement | String | top | options：top/center | N
preventScrollThrough | Boolean | true | \- | N
showInAttachedElement | Boolean | false | \- | N
showOverlay | Boolean | true | \- | N
theme | String | default | options：default/info/warning/danger/success | N
top | String / Number | - | \- | N
visible | Boolean | false | \- | N
width | String / Number | - | \- | N
zIndex | Number | - | \- | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: DialogCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent | KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/> | N
onConfirm | Function |  | Typescript：`(context: { e: MouseEvent | KeyboardEvent }) => void`<br/> | N
onEscKeydown | Function |  | Typescript：`(context: { e: KeyboardEvent }) => void`<br/> | N
onOpened | Function |  | Typescript：`() => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Dialog Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DialogCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent | KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | \-
closed | \- | \-
confirm | `(context: { e: MouseEvent | KeyboardEvent })` | \-
esc-keydown | `(context: { e: KeyboardEvent })` | \-
opened | \- | \-
overlay-click | `(context: { e: MouseEvent })` | \-

### DialogOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
className | String | - | \- | N
style | String / Object | - | Typescript：`string | Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
`Omit<DialogProps, 'attach'>` | \- | - | \- | N

### DialogInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | \-
hide | \- | \- | \-
show | \- | \- | \-
update | `(props: DialogOptions)` | \- | \-

### DialogPlugin

同时也支持 `this.$dialog`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DialogOptions`

插件返回值：`DialogInstance`

### DialogPlugin.confirm

同时也支持 `this.$dialog.confirm`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DialogOptions`

### DialogPlugin.alert

同时也支持 `this.$dialog.alert`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
options | Object | - | Typescript：`Omit<DialogOptions, 'cancelBtn'>`
