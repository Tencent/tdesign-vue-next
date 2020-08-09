## Input 输入框

::: demo demos/base 默认
:::

::: demo demos/addon 前后置标签输入框
:::

::: demo demos/group 组合输入框
:::

::: demo demos/icon 带图标的输入框
:::

::: demo demos/clearable 可清空
:::

::: demo demos/disabled 禁用
:::

::: demo demos/status 状态
:::

::: demo demos/size 不同尺寸
:::

### Input Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|value|String| |N|输入框的值
|defaultValue|String| |N|输入框的默认值
|size|'large'/'default'/'small'|'default'|N|控件大小
|clearable|Boolean| |N|是否可清空
|prependIcon|String/Slot/Function| |N|前缀图标
|appendIcon|String/Slot/Function| |N|后缀图标
|showPassword|Boolean|false|N|是否显示切换密码图标

>原生属性默认支持: type/name/disabled/readonly/autofocus

### Input Events
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|keydown-enter| |按下回车|
|原生事件| |默认支持：focus/blur|

### Input Methods
| 方法名称 | 参数 | 说明 |
|-----|-----|-----|
|原生方法| |默认支持：focus/blur|

### Input Slots
| 插槽名称| 说明 |
|-----|-----|
| prefix-icon | 前置图标 |
| suffix-icon | 后置图标 |
