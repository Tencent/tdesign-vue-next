## Input 输入框

### 组件类型

::: demo demos/base 默认
:::

::: demo demos/addon 前后置标签输入框
:::

::: demo demos/group 组合输入框
:::

::: demo demos/icon 带图标的输入框
:::


### 组件状态

::: demo demos/disabled 禁用
:::

::: demo demos/status 状态
:::

### 组件尺寸

::: demo demos/size 不同尺寸
:::

### Props
| 平台 | 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|-----|
公有|value|String| |N|输入框的值
公有|defaultValue|String| |N|输入框的默认值
公有|size|'large'/'default'/'small'|'default'|N|控件大小
公有|clearable|Boolean| |N|是否可清空
公有|prependIcon|String/Slot/Function| |N|前缀图标
公有|appendIcon|String/Slot/Function| |N|后缀图标
公有|showPassword|Boolean|false|N|是否显示切换密码图标
公有|原生属性| | | |默认支持：type/name/autofocus/disabled/readonly/maxlength|

原生属性默认支持: type/name/disabled/readonly/autofocus

### Events
| 平台 | 事件名称 | 参数 | 说明 |
|-----|-----|-----|-----|
|公有|keydownEnter| |按下回车|
|公有|原生事件| |默认支持：focus/blur|

### Methods
| 平台 | 方法名称 | 参数 | 说明 |
|-----|-----|-----|-----|
|公有|原生方法| |默认支持：focus/blur|
