:: BASE_DOC ::

## API
### Drawer Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | - | TypeScript: `AttachNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
body | String / Slot / Function | - | TypeScript: `string \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
cancelBtn | String / Object / Slot / Function | - | TypeScript: `FooterButton` | N
closeBtn | String / Boolean / Slot / Function | - | TypeScript: `string \| boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeOnEscKeydown | Boolean | true | trigger drawer close event on `ESC` keydown | N
closeOnOverlayClick | Boolean | true | \- | N
confirmBtn | String / Object / Slot / Function | - | TypeScript: `FooterButton` `type FooterButton = string \| ButtonProps \| TNode`，[Button API Documents](./button?tab=api). [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts). [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
default | String / Slot / Function | - | TypeScript: `string \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
destroyOnClose | Boolean | false | \- | N
footer | Boolean / Slot / Function | true | TypeScript: `boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
header | String / Boolean / Slot / Function | true | TypeScript: `string \| boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
mode | String | overlay | options: overlay/push | N
placement | String | right | options: left/right/top/bottom | N
preventScrollThrough | Boolean | true | \- | N
showInAttachedElement | Boolean | false | \- | N
showOverlay | Boolean | true | \- | N
size | String | 'small' | \- | N
sizeDraggable | Boolean / Object | false | allow resizing drawer width/height, set `max` or `min` to limit size. TypeScript: `boolean \| SizeDragLimit` `interface SizeDragLimit { max: number, min: number }`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
visible | Boolean | false | \- | N
zIndex | Number | - | \- | N
onBeforeClose | Function |  | TypeScript: `() => void`<br/> | N
onBeforeOpen | Function |  | TypeScript: `() => void`<br/> | N
onCancel | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | TypeScript: `(context: DrawerCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts). <br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onConfirm | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onEscKeydown | Function |  | TypeScript: `(context: { e: KeyboardEvent }) => void`<br/> | N
onOverlayClick | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onSizeDragEnd | Function |  | TypeScript: `(context: { e: MouseEvent; size: number  }) => void`<br/>trigger on size drag end | N

### Drawer Events

name | params | description
-- | -- | --
before-close | \- | \-
before-open | \- | \-
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DrawerCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts). <br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | \-
confirm | `(context: { e: MouseEvent })` | \-
esc-keydown | `(context: { e: KeyboardEvent })` | \-
overlay-click | `(context: { e: MouseEvent })` | \-
size-drag-end | `(context: { e: MouseEvent; size: number  })` | trigger on size drag end

### DrawerOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | TypeScript: `AttachNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
className | String | - | \- | N
style | String / Object | - | TypeScript: `string \| Styles`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | extends `Omit<DrawerProps, 'attach'>` | N

### DrawerInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | \-
hide | \- | \- | \-
show | \- | \- | \-
update | `(props: DrawerOptions)` | \- | \-

### DrawerPlugin

Also supports `this.$drawer`. 

name | params | default | description
-- | -- | -- | --
options | \- | - | TypeScript: `DrawerOptions`
