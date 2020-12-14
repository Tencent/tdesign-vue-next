# Badge 徽标数
定义：图标或文字右上角的圆形徽标数字。

### 何时使用
出现在图标或文字右上角，表示有待处理的消息或新内容，通过醒目视觉形式吸引用户处理。

## 1.组件类型
### 1.1. 红点样式徽标数
定义：出现在图标或文字右上角的圆点提示

使用场景 ： 弱提示，告知用户有相关的提示消息，不告诉具体的数量，需要用户去手动通过查看详情消除

::: demo demos/type 类型
:::

### 1.2. 数字样式徽标数
定义：出现在图标右上角的圆形提示（含数字）



使用场景 ：较强提醒，让用户知道和用户相关提示信息数量，引导用户处理（例如IM的未读消息、邮箱的未处理邮件）

备注：对有数字的Badge来说，由于界面空间有限，所以要根据使用场景和信息类型来决定最长数字的显示。

（一般情况下极限值为99，超过显示99+ ）

::: demo demos/base 默认
:::

### 1.3. 自定样式徽标数
定义：出现在图标右上角的文字框提示

使用场景：弱提示，告知用户有相关的提示消息（多为热门hot/最新new）

::: demo demos/colors 颜色
:::

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
