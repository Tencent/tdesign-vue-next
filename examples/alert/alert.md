## Alert 警告提醒
警告条用于承载需要用户注意的信息。

### 何时使用
需要告知用户需要关注的信息时，提示作用较强。

### 1.组件类型

### 1.1 基础警告
警告条包含四种情况的提示：成功，消息，警示，失败

::: demo demos/base
:::

### 1.2 带图标的警告

::: demo demos/icon
:::

### 1.3 带操作的警告
#### 1.3.1 带关闭操作，可自定义关闭操作

::: demo demos/close
:::

#### 1.3.2 带相关操作

如有必要，可包含一个操作，用户可以采取措施或更详细地了解消息

::: demo demos/operation
:::

### 1.4 带相关描述文字的警告
当信息内容较复杂时，可使用相关描述文字辅助说明

::: demo demos/title
:::

### 1.5 折叠的警告
当信息内容超过2行时，可使用折叠的方式将部分信息隐藏

::: demo demos/collapse
:::

### 1.6 轮播的警告
当一个页面中需要使用多条警告时，可使用轮播的方式逐条展示信息

每条信息停留时长建议为10秒，条数不超过三条，若条数太多，则可以考虑使用2.5的可折叠警告条

::: demo demos/swiper
:::

### Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|message|String\|Slot\|Function|-|Y| 告警提示框内容|
|title|String\|Slot\|Function|-|N| 告警提示框标题|
|theme|String|'info'|N|告警提示框样式，支持'success'/'info'/'warning'/'error'
|icon|Boolean\|Function\|Slot|false|N| 告警提示框前面的图标, 为true时表示使用默认图标|
|operation|Function\|Slot|-|N|相关操作，会附加在message之后|
|close|Boolean\|String\|Function\|Slot|false|N| 告警提示框关闭按钮, 为false时表示无关闭按钮|
|maxLine|Number|0|N|是否使用折叠功能，默认为0，表示不折叠|
|beforeClose|Function|-|N|告警提示框关闭前的回调函数，支持返回Promise的异步函数，返回为false或者reject promise时表示停止关闭|


### Events
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|closed|-|告警提示框关闭动画结束时触发|

### Slots
| 名称 | 参数 | 说明 |
|-----|-----|-----|
| default |-| 等同于message slot，当同时存在时，以message slot为准|


## AlertSwiper

### Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|interval|Number|5000|N|自动轮播周期，默认5000ms。设置为0可以禁用自动轮播|
|close|Boolean\|String\|Function\|Slot|false|N| 告警提示框关闭按钮, 为false时表示无关闭按钮|
|beforeClose|Function|-|N|告警提示框关闭前的回调函数，支持返回Promise的异步函数，返回为false或者reject promise时表示停止关闭|

### Events
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|closed|-|告警提示框关闭动画结束时触发|