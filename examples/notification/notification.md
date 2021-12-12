:: BASE_DOC ::
### 关闭全部

{{ close-all }}

## API

### Notification Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeBtn | String / Boolean / Slot / Function | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 自定义内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 自定义内容，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示 | N
footer | String / Slot / Function | - | 用于自定义底部内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
icon | Boolean / Slot / Function | true | 用于自定义消息通知前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | info | 消息类型。可选项：info/success/warning/error。TS 类型：`NotificationThemeList`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/notification/type.ts) | N
title | String / Slot / Function | - | 标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
onCloseBtnClick | Function |  | 点击关闭按钮时触发。`(context: { e: MouseEvent }) => {}` | N
onDurationEnd | Function |  | 计时结束时触发。`() => {}` | N

### Notification Events

名称 | 参数 | 描述
-- | -- | --
close-btn-click | `(context: { e: MouseEvent })` | 点击关闭按钮时触发
duration-end | - | 计时结束时触发

### NotificationOptions

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 指定消息通知挂载的父节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
offset | Array | - | 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem']。TS 类型：`Array<string | number>` | N
placement | String | top-right | 消息弹出位置。可选项：top-left/top-right/bottom-left/bottom-right。TS 类型：`NotificationPlacementList`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/notification/type.ts) | N
zIndex | Number | 6000 | 消息通知层级 | N
NotificationProps | - | - | 继承 `NotificationProps` 中的全部 API | N

### NotificationPlugin

同时也支持 `this.$notification`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
theme | String | info | 必需。消息类型。可选项：info/success/warning/error。TS 类型：`NotificationThemeList`
options | Object | - | 必需。消息通知内容。TS 类型：`NotificationOptions`

### NotificationPlugin.info

同时也支持 `this.$notification.info`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 必需。消息通知内容。TS 类型：`NotificationInfoOptions`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/notification/type.ts)

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.warning

同时也支持 `this.$notification.warning`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 必需。消息通知内容。TS 类型：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.error

同时也支持 `this.$notification.error`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 必需。消息通知内容。TS 类型：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.success

同时也支持 `this.$notification.success`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 必需。消息通知内容。TS 类型：`NotificationInfoOptions`

插件返回值：`Promise<NotificationInstance>`

### NotificationPlugin.close

同时也支持 `this.$notification.close`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 必需。该插件参数为 $Notification.info() 等插件执行后的返回值。示例：`const msg = $Notification.info({}); $Notification.close(msg)`。TS 类型：`Promise<NotificationInstance>`

### NotificationPlugin.closeAll

同时也支持 `this.$notification.closeAll`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
- | - | - | -
