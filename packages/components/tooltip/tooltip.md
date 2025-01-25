:: BASE_DOC ::

### 模拟超出省略原生属性

{{ mouse }}

### 定时消失

{{ duration }}

### 搭配 Popup 或 Popconfirm 使用

**Tooltip、Popconfirm、Popover** 都需要劫持 children 的相关事件，使用时需要**在中间添加一层元素**防止事件劫持失效。

{{ with-popup-or-popconfirm }}

## API
### Tooltip Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
delay | Number | - | 【议案讨论中】延迟出现提示，用于异步加载提示信息需要延迟显示的业务场景下 | N
destroyOnClose | Boolean | true | 是否在关闭浮层时销毁浮层 | N
duration | Number | - | 用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒 | N
placement | String | top | 浮层出现位置。TS 类型：`'mouse' \| PopupPlacement`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tooltip/type.ts) | N
showArrow | Boolean | true | 是否显示浮层箭头 | N
theme | String | default | 文字提示风格。可选项：default/primary/success/danger/warning/light | N
`Omit<PopupProps, 'placement'>` | \- | - | 继承 `Omit<PopupProps, 'placement'>` 中的全部 API | N

### TooltipLite Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 文字提示内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placement | String | top | 提示浮层出现的位置。可选项：top/bottom | N
showArrow | Boolean | true | 是否显示箭头 | N
showShadow | Boolean | true | 文字提示浮层是否需要阴影 | N
theme | String | default | 组件风格，有亮色模式和暗色模式两种。可选项：light/default | N
triggerElement | String / Slot / Function | - | 触发元素。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
