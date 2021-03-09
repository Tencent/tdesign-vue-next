:: BASE_DOC ::

:: BASE_PROPS ::

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
