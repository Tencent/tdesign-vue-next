## Alert 警告提醒

::: demo demos/base 默认
:::

::: demo demos/icon 带图标的警告
:::

::: demo demos/close 带关闭操作
:::

::: demo demos/operation 带相关操作
:::

::: demo demos/title 带相关描述文字
:::

### Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|message|String\|Slot\|Function| |Y| 告警提示框内容|
|title|String\|Slot\|Function| |N| 告警提示框标题|
|theme|String|'info'|N|告警提示框样式，支持'success'/'info'/'warning'/'error'
|icon|Boolean\|Function\|Slot|false|N| 告警提示框前面的图标, 为true时表示使用默认图标|
|close|Boolean\|String\|Function\|Slot|false|N| 告警提示框关闭按钮, 为false时表示无关闭按钮|
|beforeClose|Function| |N|告警提示框关闭前的回调函数，支持返回Promise的异步函数，返回为false或者reject promise时表示停止关闭|


### Events
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|closed| |告警提示框关闭动画结束时触发|

### Slots
| 名称 | 参数 | 说明 |
|-----|-----|-----|
| default | | 等同于message slot，当同时存在时，以message slot为准|
| message | | message内容slot|
| title | |  title slot|
| operation | | 相关操作Slot，会附加在message之后 |
| icon | | icon slot|
| close | | close slot|


