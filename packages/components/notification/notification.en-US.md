:: BASE_DOC ::

## API
### Notification Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | String / Boolean / Slot / Function | undefined | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
duration | Number | 3000 | \- | N
footer | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | info | options：info/success/warning/error。Typescript：`NotificationThemeList` `type NotificationThemeList = 'info' \| 'success' \| 'warning' \| 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/notification/type.ts) | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onDurationEnd | Function |  | Typescript：`() => void`<br/> | N

### Notification Events

name | params | description
-- | -- | --
close-btn-click | `(context: { e: MouseEvent })` | \-
duration-end | \- | \-

### NotificationOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
offset | Array | - | Typescript：`Array<string \| number>` | N
placement | String | top-right | options：top-left/top-right/bottom-left/bottom-right。Typescript：`NotificationPlacementList` `type NotificationPlacementList = 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/notification/type.ts) | N
zIndex | Number | 6000 | \- | N
`NotificationProps` | \- | - | \- | N

### NotificationPlugin

同时也支持 `this.$notification`。

name | params | default | description
-- | -- | -- | --
theme | String | info | required。options：info/success/warning/error。Typescript：`NotificationThemeList`
options | Object | - | required。Typescript：`NotificationOptions`

### NotificationPlugin.info

同时也支持 `this.$notification.info`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`NotificationInfoOptions` `type NotificationInfoOptions = Omit<NotificationOptions, 'theme'>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/notification/type.ts)

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.warning

同时也支持 `this.$notification.warning`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.error

同时也支持 `this.$notification.error`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.success

同时也支持 `this.$notification.success`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.close

同时也支持 `this.$notification.close`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`Promise<NotificationInstance>`

### NotificationPlugin.closeAll

同时也支持 `this.$notification.closeAll`。

name | params | default | description
-- | -- | -- | --
-- | \- | - | \-

### NotificationPlugin.config

同时也支持 `this.$notification.config`。

name | params | default | description
-- | -- | -- | --
notify | Object | - | required。Typescript：`NotificationOptions`
