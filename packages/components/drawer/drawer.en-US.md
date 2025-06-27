:: BASE_DOC ::

### Plugin or function invocations

#### Plugin invocations

- `this.$drawer(options)`

#### Function invocations

- `DrawerPlugin(options)`

#### Component instance methods

A component instance refers to `DrawerInstance = this.$drawer(options)` or `DrawerInstance = DrawerPlugin(options)`.

- Destroying a drawer: `DrawerInstance.destroy()`

- Hiding a drawer: `DrawerInstance.hide()`

- Showing a drawer: `DrawerInstance.show()`

- Updating a drawer: `DrawerInstance.update()`

Note that in the following demo, there are multiple instances where DOM elements are not being destroyed. In real-world applications, it is important to consider destroying DOM elements. Otherwise, when users repeatedly click and create instances from plugin or function invocations, a large number of DOM elements can accumulate, leading to potential memory leaks.

{{ plugin }}

## API

### Drawer Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | - | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
body | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
cancelBtn | String / Object / Slot / Function | - | Typescript：`FooterButton` | N
closeBtn | String / Boolean / Slot / Function | - | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeOnEscKeydown | Boolean | true | trigger drawer close event on `ESC` keydown | N
closeOnOverlayClick | Boolean | true | \- | N
confirmBtn | String / Object / Slot / Function | - | Typescript：`FooterButton` `type FooterButton = string \| ButtonProps \| TNode \| null `，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
destroyOnClose | Boolean | false | \- | N
drawerClassName | String | - | \- | N
footer | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
header | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
lazy | Boolean | false | Enable Drawer lazy loading, the contents of the Drawer are not rendered when enable | N
mode | String | overlay | options: overlay/push | N
placement | String | right | options: left/right/top/bottom | N
preventScrollThrough | Boolean | true | \- | N
showInAttachedElement | Boolean | false | \- | N
showOverlay | Boolean | true | \- | N
size | String | 'small' | \- | N
sizeDraggable | Boolean / Object | false | allow resizing drawer width/height, set `max` or `min` to limit size。Typescript：`boolean \| SizeDragLimit` `interface SizeDragLimit { max: number, min: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
visible | Boolean | false | \- | N
zIndex | Number | - | \- | N
onBeforeClose | Function |  | Typescript：`() => void`<br/> | N
onBeforeOpen | Function |  | Typescript：`() => void`<br/> | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: DrawerCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onConfirm | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onEscKeydown | Function |  | Typescript：`(context: { e: KeyboardEvent }) => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onSizeDragEnd | Function |  | Typescript：`(context: { e: MouseEvent; size: number  }) => void`<br/>trigger on size drag end | N

### Drawer Events

name | params | description
-- | -- | --
before-close | \- | \-
before-open | \- | \-
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DrawerCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | \-
confirm | `(context: { e: MouseEvent })` | \-
esc-keydown | `(context: { e: KeyboardEvent })` | \-
overlay-click | `(context: { e: MouseEvent })` | \-
size-drag-end | `(context: { e: MouseEvent; size: number  })` | trigger on size drag end

### DrawerOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
className | String | - | \- | N
style | String / Object | - | Typescript：`string \| Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | extends `Omit<DrawerProps, 'attach'>` | N

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
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
