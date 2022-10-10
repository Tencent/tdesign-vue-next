:: BASE_DOC ::

## API

### Message Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | String / Boolean / Slot / Function | undefined | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
duration | Number | 3000 | \- | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | info | options：info/success/warning/error/question/loading。Typescript：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error' \| 'question' \| 'loading'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/message/type.ts) | N
onClose | Function |  | Typescript：`(context?: { trigger: 'duration' \| 'close-click' }) => void`<br/>close message event | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onDurationEnd | Function |  | Typescript：`() => void`<br/> | N

### Message Events

name | params | description
-- | -- | --
close | `(context?: { trigger: 'duration' \| 'close-click' })` | close message event
close-btn-click | `(context: { e: MouseEvent })` | \-
duration-end | \- | \-

### MessageOptions

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
className | String | - | HTMLElement class | N
offset | Array | - | Typescript：`Array<string \| number>` | N
placement | String | top | options：center/top/left/right/bottom/top-left/top-right/bottom-left/bottom-right。Typescript：`MessagePlacementList` `type MessagePlacementList = 'center' \| 'top' \| 'left' \| 'right' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/message/type.ts) | N
style | Object | - | CSS style。Typescript：`CSSProperties` | N
zIndex | Number | 5000 | \- | N
`MessageProps` | \- | - | \- | N

### MessagePlugin

同时也支持 `this.$message`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
theme | String | - | required。Typescript：`MessageThemeList`
message | String / Object | - | required。Typescript：`string \| MessageOptions`
duration | Number | 3000 | \-

### MessagePlugin.info

同时也支持 `this.$message.info`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions` `type MessageInfoOptions = Omit<MessageOptions, 'theme'>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/message/type.ts)
duration | Number | 3000 | \-

### MessagePlugin.error

同时也支持 `this.$message.error`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions`
duration | Number | 3000 | \-

### MessagePlugin.warning

同时也支持 `this.$message.warning`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions`
duration | Number | 3000 | \-

### MessagePlugin.success

同时也支持 `this.$message.success`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions`
duration | Number | 3000 | \-

### MessagePlugin.loading

同时也支持 `this.$message.loading`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions`
duration | Number | 3000 | \-

### MessagePlugin.question

同时也支持 `this.$message.question`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | String / Object | - | required。Typescript：`string \| MessageInfoOptions`
duration | Number | 3000 | \-

### MessagePlugin.close

同时也支持 `this.$message.close`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
options | Object | - | required。Typescript：`Promise<MessageInstance>`

### MessagePlugin.closeAll

同时也支持 `this.$message.closeAll`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
\- | \- | - | \-

### MessagePlugin.config

同时也支持 `this.$message.config`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
message | Object | - | required。Typescript：`MessageOptions`
