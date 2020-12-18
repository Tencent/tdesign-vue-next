## Progress 进度条

展示操作的当前进度。

### 何时使用

在一个操作需要较长时间才能完成（可能超过 4 秒），且会打断当前界面或者需要在后台运行时，显示该操作的当前进度和状态。

给予用户完成任务的明确预期，如软件安装进度的场景。

## 1. 组件类型

### 1.1. 线形进度条

以线形表示进度的组件，线形外可选择性地配有文字或图标补充显示进度和状态

使用场景：多用于信息量较为丰富的情况

::: demo demos/base
:::

### 1.2. 环形进度条
以线形表示进度的组件，环内可选择性地配有文字或图标补充显示进度和状态

使用场景：多用于需要强调进度百分比的情况

::: demo demos/circle
:::


### 1.3. 自定义进度条
::: demo demos/custom 自定义
:::


### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|String|line   |N    |进度条类型，可选thin plump circle|
|percentage|Number|0   |Y    |进度条百分比|
|label|boolean/TNode|true   |N    |是否显示label，为boolean时，默认percent)=>${percent}%|
|status|String| - |N    |进度条当前状态，success、error、warning、active(其中active仅type=line可用）|
|color|String/Object|腾讯蓝 |N    |进度条的颜色，object的时候是渐变色）|
|trackColor|String |#F5F5F5 |N    |进度条未完成的颜色|
|strokeWidth|Number/String  |- |N    |进度条线的宽度，默认Number单位px|
|size|String  |- |N    |进度条线的尺寸，可选 small、middle、large|
