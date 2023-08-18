:: BASE_DOC ::

## API
### Link Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 链接内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 链接内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 禁用链接。优先级：Link.disabled > Form.disabled | N
download | String / Boolean | - | 使得浏览器将链接的 URL 视为可下载资源 | N
hover | String | underline | 链接悬浮态样式，有 文本颜色变化、添加下划线等 2 种方法。可选项：color/underline | N
href | String | - | 跳转链接 | N
prefixIcon | Slot / Function | - | 前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
size | String | medium | 尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
target | String | - | 跳转方式，如：当前页面打开、新页面打开等，同 HTML 属性 target 含义相同 | N
theme | String | default | 组件风格，依次为默认色、品牌色、危险色、警告色、成功色。可选项：default/primary/danger/warning/success | N
underline | Boolean | - | 普通状态是否显示链接下划线 | N
onClick | Function |  | TS 类型：`(e: MouseEvent) => void`<br/>点击事件，禁用状态不会触发点击事件 | N

### Link Events

名称 | 参数 | 描述
-- | -- | --
click | `(e: MouseEvent)` | 点击事件，禁用状态不会触发点击事件
