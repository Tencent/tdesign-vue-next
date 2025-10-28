:: BASE_DOC ::

## API

### Popup Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
delay | Number / Array | - | delay to show or hide popover。Typescript：`number \| Array<number>` | N
destroyOnClose | Boolean | false | \- | N
disabled | Boolean | - | \- | N
hideEmptyPopup | Boolean | false | \- | N
overlayClassName | String / Object / Array | - | Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
overlayInnerClassName | String / Object / Array | - | Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
overlayInnerStyle | Boolean / Object / Function | - | Typescript：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
overlayStyle | Boolean / Object / Function | - | Typescript：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
placement | String | top | Typescript：`PopupPlacement` `type PopupPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/popup/type.ts) | N
popperOptions | Object | - | popper initial options，details refer to https://popper.js.org/docs | N
showArrow | Boolean | false | \- | N
trigger | String | hover | options: hover/click/focus/mousedown/context-menu | N
triggerElement | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
visible | Boolean | - | `v-model` and `v-model:visible` is supported。Typescript：`boolean` | N
zIndex | Number | - | \- | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on popup content click | N
onScroll | Function |  | Typescript：`(context: { e: WheelEvent }) => void`<br/> | N
onScrollToBottom | Function |  | Typescript：`(context: { e: WheelEvent }) => void`<br/> | N
onVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'trigger-element-close' \| 'context-menu' \| 'keydown-esc'`<br/> | N

### Popup Events

name | params | description
-- | -- | --
overlay-click | `(context: { e: MouseEvent })` | trigger on popup content click
scroll | `(context: { e: WheelEvent })` | \-
scroll-to-bottom | `(context: { e: WheelEvent })` | \-
visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'trigger-element-close' \| 'context-menu' \| 'keydown-esc'`<br/>

### PopupInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
getOverlay | \- | `HTMLElement` | used to get overly html element
getOverlayState | \- | `{ hover: boolean }` | get mouseover state of overlay
getPopper | \- | `typeof createPopper` | get the popup component popper instance。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/popup/type.ts)。<br/>`import { createPopper } from '@popperjs/core'`<br/>
update | \- | \- | used to update overlay content
