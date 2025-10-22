:: BASE_DOC ::

## API

### Message Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | String / Boolean / Slot / Function | undefined | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
duration | Number | 3000 | \- | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | info | options: info/success/warning/error/question/loading。Typescript：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error' \| 'question' \| 'loading'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts) | N
onClose | Function |  | Typescript：`(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent }) => void`<br/>close message event | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onDurationEnd | Function |  | Typescript：`() => void`<br/> | N

### Message Events

name | params | description
-- | -- | --
close | `(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent })` | close message event
close-btn-click | `(context: { e: MouseEvent })` | \-
duration-end | \- | \-

### MessageOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
className | String | - | HTMLElement class | N
offset | Array | - | Typescript：`Array<string \| number>` | N
placement | String | top | options: center/top/left/right/bottom/top-left/top-right/bottom-left/bottom-right。Typescript：`MessagePlacementList` `type MessagePlacementList = 'center' \| 'top' \| 'left' \| 'right' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts) | N
style | Object | - | CSS style。Typescript：`CSSProperties` | N
zIndex | Number | 5000 | \- | N
`MessageProps` | \- | - | extends `MessageProps` | N

### MessagePlugin

同时也支持 `this.$message`。

name | params | default | description
-- | -- | -- | --
theme | String | - | required。Typescript：`MessageThemeList`
message | String / Object | - | required。Typescript：`String \| TNode \| MessageOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.info

同时也支持 `this.$message.info`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions` `type MessageInfoOptions = Omit<MessageOptions, 'theme'>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.error

同时也支持 `this.$message.error`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.warning

同时也支持 `this.$message.warning`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.success

同时也支持 `this.$message.success`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.loading

同时也支持 `this.$message.loading`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.question

同时也支持 `this.$message.question`。

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`String \| TNode \| MessageInfoOptions`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
duration | Number | 3000 | \-
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.close

同时也支持 `this.$message.close`。

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`Promise<MessageInstance>`

### MessagePlugin.closeAll

同时也支持 `this.$message.closeAll`。

name | params | default | description
-- | -- | -- | --
\- | \- | - | \-

### MessagePlugin.config

同时也支持 `this.$message.config`。

name | params | default | description
-- | -- | -- | --
message | Object | - | required。Typescript：`MessageOptions`
