:: BASE_DOC ::

### 斑马纹的列表

当列表内容较多时，可以使用斑马纹样式，便于用户获取信息。

{{ stripe }}

### 异步加载的列表

当数据需要通过二次请求加载展示时，可以通过`asyncLoading`来处理相关的逻辑。

{{ loading }}

### 带头部及尾部的列表

当列表需要展示头部或尾部信息时，可以通过`header`或`footer`来配置。

{{ header-footer }}

### 带滚动事件的列表

当列表较长时，可以配置滚动条及事件来进行滚动处理

{{ scroll }}

## API
### List Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | 自定义加载中。值为空不显示加载中，值为 'loading' 显示加载中状态，值为 'load-more' 显示加载更多状态。值类型为函数，则表示自定义加载状态呈现内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
footer | String / Slot / Function | - | 底部。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | 头部。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 排列方式（待设计稿输出）。可选项：horizontal/vertical | N
size | String | medium | 尺寸。可选项：small/medium/large | N
split | Boolean | false | 是否展示分割线 | N
stripe | Boolean | false | 是否展示斑马纹 | N
onLoadMore | Function |  | TS 类型：`(options: { e: MouseEvent }) => void`<br/>点击加载更多时触发 | N
onScroll | Function |  | TS 类型：`(options: { e: Event \| WheelEvent; scrollTop: number; scrollBottom: number }) => void`<br/>列表滚动时触发，scrollTop 表示顶部滚动距离，scrollBottom 表示底部滚动距离 | N

### List Events

名称 | 参数 | 描述
-- | -- | --
load-more | `(options: { e: MouseEvent })` | 点击加载更多时触发
scroll | `(options: { e: Event \| WheelEvent; scrollTop: number; scrollBottom: number })` | 列表滚动时触发，scrollTop 表示顶部滚动距离，scrollBottom 表示底部滚动距离

### ListItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
action | String / Slot / Function | - | 操作栏。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击时触发 | N

### ListItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 点击时触发


### ListItemMeta Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
avatar | String / Slot / Function | - | 已废弃。列表项图片。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
description | String / Slot / Function | - | 列表项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
image | String / Slot / Function | - | 列表项图片。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | 列表项标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
