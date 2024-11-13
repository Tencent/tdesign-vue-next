:: BASE_DOC ::

### Plugin or function invocations

#### Plugin invocations

- `this.$dialog(options)`, or

- `this.$dialog.confirm(options)`, or

- `this.$dialog.alert(options)`

#### Function invocations

- `DialogPlugin(options)`, or

- `DialogPlugin.confirm(options)`, or

- `DialogPlugin.alert(options)`

#### Component instance methods

A component instance refers to `DialogInstance = this.$dialog(options)` or `DialogInstance = DialogPlugin(options)`.

- Destroying a dialog: `DialogInstance.destroy()`

- Hiding a dialog: `DialogInstance.hide()`

- Showing a dialog: `DialogInstance.show()`

- Updating a dialog: `DialogInstance.update()`

Note that in the following demo, there are multiple instances where DOM elements are not being destroyed. In real-world applications, it is important to consider destroying DOM elements. Otherwise, when users repeatedly click and create instances from plugin or function invocations, a large number of DOM elements can accumulate, leading to potential memory leaks.

{{ plugin }}

## API
### Dialog Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | - | TypeScript: `AttachNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
body | String / Slot / Function | - | TypeScript: `string \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | - | TypeScript: `string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api). [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts). [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts) | N
closeBtn | String / Boolean / Slot / Function | true | TypeScript: `string \| boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | true | trigger dialog close event on `ESC` keydown | N
closeOnOverlayClick | Boolean | true | \- | N
confirmBtn | String / Object / Slot / Function | - | TypeScript: `string \| ButtonProps \| TNode \| null`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
confirmLoading | Boolean | undefined | confirm button loading status | N
confirmOnEnter | Boolean | - | confirm on enter | N
default | String / Slot / Function | - | TypeScript: `string \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | \- | N
dialogClassName | String | - | \- | N
dialogStyle | Object | - | Styles that apply to the dialog box itself. TypeScript: `Styles`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
draggable | Boolean | false | \- | N
footer | Boolean / Slot / Function | true | TypeScript: `boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
header | String / Boolean / Slot / Function | true | TypeScript: `string \| boolean \| TNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
mode | String | modal | options: modal/modeless/full-screen | N
placement | String | top | options: top/center | N
preventScrollThrough | Boolean | true | \- | N
showInAttachedElement | Boolean | false | \- | N
showOverlay | Boolean | true | \- | N
theme | String | default | options: default/info/warning/danger/success | N
top | String / Number | - | \- | N
visible | Boolean | - | \- | N
width | String / Number | - | \- | N
zIndex | Number | - | \- | N
onBeforeClose | Function |  | TypeScript: `() => void`<br/> | N
onBeforeOpen | Function |  | TypeScript: `() => void`<br/> | N
onCancel | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | TypeScript: `(context: DialogCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts). <br/>`type DialogEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | TypeScript: `() => void`<br/> | N
onConfirm | Function |  | TypeScript: `(context: { e: MouseEvent \| KeyboardEvent }) => void`<br/> | N
onEscKeydown | Function |  | TypeScript: `(context: { e: KeyboardEvent }) => void`<br/> | N
onOpened | Function |  | TypeScript: `() => void`<br/> | N
onOverlayClick | Function |  | TypeScript: `(context: { e: MouseEvent }) => void`<br/> | N

### Dialog Events

name | params | description
-- | -- | --
before-close | \- | \-
before-open | \- | \-
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DialogCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/dialog/type.ts). <br/>`type DialogEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | \-
closed | \- | \-
confirm | `(context: { e: MouseEvent \| KeyboardEvent })` | \-
esc-keydown | `(context: { e: KeyboardEvent })` | \-
opened | \- | \-
overlay-click | `(context: { e: MouseEvent })` | \-

### DialogOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | TypeScript: `AttachNode`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
className | String | - | \- | N
style | String / Object | - | TypeScript: `string \| Styles`. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
`Omit<DialogProps, 'attach'>` | \- | - | extends `Omit<DialogProps, 'attach'>` | N

### DialogInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | required
hide | \- | \- | required
setConfirmLoading | `(loading: boolean)` | \- | required. set confirm button loading status
show | \- | \- | required
update | `(props: DialogOptions)` | \- | required

### DialogPlugin

Also supports `this.$dialog`. 

name | params | default | description
-- | -- | -- | --
options | \- | - | TypeScript: `DialogOptions`

The plugin returns: `DialogInstance`

### DialogPlugin.confirm

Also supports `this.$dialog.confirm`. 

name | params | default | description
-- | -- | -- | --
options | \- | - | TypeScript: `DialogOptions`

### DialogPlugin.alert

Also supports `this.$dialog.alert`. 

name | params | default | description
-- | -- | -- | --
options | Object | - | TypeScript: `Omit<DialogOptions, 'cancelBtn'>`