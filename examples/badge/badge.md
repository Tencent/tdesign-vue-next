:: BASE_DOC ::

### 形状

::: demo demos/shape
:::

### 尺寸

::: demo demos/size 
:::

### 偏移

::: demo demos/offset
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|color|string|red|N|颜色|
|count|number|-|N|展示的数字|
|dot|boolean|false|N|是否为红点|
|maxCount|number|99|N|封顶的数字值|
|content|string/TNode|-|N|自定义文字(优先于count）|
|size|Enum{medium,small}|medium|N|尺寸|
|shape|Enum{circle,round}|circle|N|形状（圆形或圆角矩形）|
|showZero|boolean|false|N|当数值为0时，是否展示 Badge|
|offset|[number, number]| - |N|设置状态点的位置偏移，格式为[x,y]|
