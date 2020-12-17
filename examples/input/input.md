:: BASE_DOC ::

### 禁用
::: demo demos/disabled 
:::

### 状态
::: demo demos/status 
:::

### 不同尺寸
::: demo demos/size 
:::

### Input Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|value|String| |N|输入框的值
|defaultValue|String| |N|输入框的默认值
|size|String| medium | N | 输入框尺寸，可选值large、medium、small
|clearable|Boolean| |N|是否可清空
|prefixIcon|Slot/Function| |N|前缀图标
|suffixIcon|Slot/Function| |N|后缀图标

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
