:: BASE_DOC ::

## API
### Popup Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
delay | Number / Array | - | delay to show or hide popover。Typescript：`number \| Array<number>` | N
destroyOnClose | Boolean | false | \- | N
disabled | Boolean | - | \- | N
hideEmptyPopup | Boolean | false | \- | N
overlayClassName | String / Object / Array | - | Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayInnerClassName | String / Object / Array | - | Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayInnerStyle | Boolean / Object / Function | - | Typescript：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayStyle | Boolean / Object / Function | - | Typescript：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
placement | String | top | Typescript：`PopupPlacement` `type PopupPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts) | N
popperOptions | Object | - | popper initial options，details refer to https://popper.js.org/docs | N
showArrow | Boolean | false | \- | N
trigger | String | hover | options：hover/click/focus/mousedown/context-menu | N
triggerElement | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
visible | Boolean | - | `v-model` is supported。Typescript：`boolean` | N
defaultVisible | Boolean | - | uncontrolled property。Typescript：`boolean` | N
zIndex | Number | - | \- | N
onScroll | Function |  | Typescript：`(context: { e: WheelEvent }) => void`<br/> | N
onScrollToBottom | Function |  | Typescript：`(context: { e: WheelEvent }) => void`<br/> | N
onVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/> | N

### Popup Events

name | params | description
-- | -- | --
scroll | `(context: { e: WheelEvent })` | \-
scroll-to-bottom | `(context: { e: WheelEvent })` | \-
visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/>

### PopupPlugin

support `this.$popup`

name | params | default | description
-- | -- | -- | --
content | String / Slot / Function | - | required。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)
popupProps | Object | - | \-
triggerElement | String | - | required
