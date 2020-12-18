## progress 

::: demo demos/base 默认进度条
:::

::: demo demos/circle 进度圈
:::

::: demo demos/custom 自定义
:::


### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|string|line   |N    |进度条类型，可选thin plump circle|
|percentage|number|0   |Y    |进度条百分比|
|label|boolean | TNode|true   |N    |是否显示label，为boolean时，默认percent)=>${percent}%|
|status|string| - |N    |进度条当前状态，success、error、warning、active(其中active仅type=line可用）|
|color|string | Object|腾讯蓝 |N    |进度条的颜色，object的时候是渐变色）|
|trackColor|string |#F5F5F5 |N    |进度条未完成的颜色|
|strokeWidth|number|string  |- |N    |进度条线的宽度，默认number单位px|
|size|string  |- |N    |进度条线的尺寸，可选 small、middle、large|
