## list 

::: demo demos/base 基础列表
:::

::: demo demos/multiLines 多行文字列表
:::

::: demo demos/imgText 基础图文列表
:::

::: demo demos/actions 带操作列表
:::

::: demo demos/extra 额外内容
:::

::: demo demos/loading 加载
:::

::: demo demos/headerFooter 头部及尾部
:::

::: demo demos/size 尺寸
:::

### 属性配置
### List Props
`TNode = Function + ReactNode + Slot`

|平台|属性           |类型            |默认值    |必传|说明                                                           |
|--|-------------|--------------|-------|--|-------------------------------------------------------------|
|公有|header\*     |String / TNode|       |N |列表头部                                                         |
|公有|footer\*     |String / TNode|       |N |列表底部                                                         |
|公有|loading      |String / TNode|false  |N |列表是否正在加载( "", "loading", "load-more" )                       |
|公有|size         |String        |default|N |列表尺寸，可选值为 small、large、default                                |
|公有|split        |Boolean       |true   |N |是否展示分割线                                                      |
|公有|stripe       |Boolean       |false  |N |是否展示斑马纹                                                      |
|公有|action-layout|String        |horizontal  |N |设置 action 布局, 可选值为 horizontal, vertical                              |

### List Event
|平台|事件名称    |参数                                 |说明                             |
|--|--------|-----------------------------------|-------------------------------|
|公有|loadMore|\-                                 |点击“加载更多”时触发                    |
|公有|scroll  |$event|列表滚动时触发|

### ListItem Props
|平台|属性     |类型   |默认值|必传|说明                                                                   |
|--|-------|-----|---|--|---------------------------------------------------------------------|
|公有|action |TNode|\- |N |列表操作组，根据 item-layout 的不同, 位置在卡片底部或者最右侧                               |
|公有|extra\*|TNode|\- |N |额外内容, 通常用在 item-layout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧|

### ListItemMeta Props
|平台|属性         |类型            |默认值|必传|说明       |
|--|-----------|--------------|---|--|---------|
|公有|avatar     |String / TNode|   |N |列表元素的图标  |
|公有|title      |String / TNode|   |N |列表元素的标题  |
|公有|description|String / TNode|   |N |列表元素的描述内容|