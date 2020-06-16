## Button 按钮

::: demo demos/base 默认
:::

::: demo demos/status 状态
:::

::: demo demos/theme 类型
:::

::: demo demos/icon 图标按钮
:::

::: demo demos/size 尺寸
:::

::: demo demos/block 块级
:::

### Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|Enum|default|N|类型可选值为default primary danger text ghost|
|size|Enum|default|N|可选值为 large / default / small /  |
|icon|String/Slot/Function| |N|按钮图标 |
|block|Boolean|false|N|是否为块级元素|
|shape|Enum|square|N|按钮边角类型，square，round，circle|
|loading|Boolean|false|N|是否显示为加载状态|
