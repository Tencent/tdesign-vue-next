:: BASE_DOC ::

## API
### Drawer Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | '' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
body | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | '' | Typescript：`FooterButton` | N
closeBtn | String / Boolean / Slot / Function | - | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | true | \- | N
closeOnOverlayClick | Boolean | true | \- | N
confirmBtn | String / Object / Slot / Function | '' | Typescript：`FooterButton` `type FooterButton = string \| ButtonProps \| TNode`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/drawer/type.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | \- | N
footer | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
header | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
mode | String | overlay | options：overlay/push | N
placement | String | right | options：left/right/top/bottom | N
preventScrollThrough | Boolean | true | \- | N
showInAttachedElement | Boolean | false | \- | N
showOverlay | Boolean | true | \- | N
size | String | 'small' | \- | N
sizeDraggable | Boolean | false | \- | N
visible | Boolean | false | \- | N
zIndex | Number | - | \- | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: DrawerCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onConfirm | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onEscKeydown | Function |  | Typescript：`(context: { e: KeyboardEvent }) => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Drawer Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DrawerCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | \-
confirm | `(context: { e: MouseEvent })` | \-
esc-keydown | `(context: { e: KeyboardEvent })` | \-
overlay-click | `(context: { e: MouseEvent })` | \-

### DrawerOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
className | String | - | \- | N
style | String / Object | - | Typescript：`string \| Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | \- | N

### DrawerInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | \-
hide | \- | \- | \-
show | \- | \- | \-
update | `(props: DrawerOptions)` | \- | \-

### DrawerPlugin

同时也支持 `this.$drawer`。

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DrawerOptions`
