:: BASE_DOC ::

### 额外内容
::: demo demos/extra 
:::

### 加载
::: demo demos/loading 
:::

### 头部及尾部
::: demo demos/headerFooter 
:::

### 滚动事件
::: demo demos/scroll 
:::

### 尺寸
::: demo demos/size 
:::

### 属性配置
### List Props

|平台|属性           |类型            |默认值    |必传|说明                                                           |
|--|-------------|--------------|-------|--|-------------------------------------------------------------|
|公有|header     |String|       |N |列表头部                                                         |
|公有|footer     |String|       |N |列表底部                                                         |
|公有|loading      |String|false  |N |列表是否正在加载( "", "loading", "load-more" )                       |
|公有|size         |String        |default|N |列表尺寸，可选值为 small、large、default                                |
|公有|split        |Boolean       |true   |N |是否展示分割线                                                      |
|公有|stripe       |Boolean       |false  |N |是否展示斑马纹                                                      |
|公有|action-layout|String        |horizontal  |N |设置 action 布局, 可选值为 horizontal, vertical                              |

### List Event
|平台|事件名称    |参数                                 |说明                             |
|--|--------|-----------------------------------|-------------------------------|
|公有|loadMore|\-                                 |点击“加载更多”时触发                    |
|公有|scroll  |$event|列表滚动时触发|

### List Slots
| 平台| 插槽名称| 类型| 必传 | 说明 |
|-----|-----|-----|-----|-----|
| web| header | String/Function | N | 列表头部 |
| web| footer | String/Function | N | 列表底部 |
| web| loading | String/Function | N | 加载提示 |

### ListItem Slots
| 平台| 插槽名称| 类型| 必传 | 说明 |
|-----|-----|-----|-----|-----|
| web| action | String/Function | N | 列表操作组，根据 item-layout 的不同, 位置在卡片底部或者最右侧 |
| web| extra | String/Function | N | 额外内容, 通常用在 item-layout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧 |

### ListItemMeta Props
|平台|属性         |类型            |默认值|必传|说明       |
|--|-----------|--------------|---|--|---------|
|公有|avatar     |String|   |N |列表元素的图标  |
|公有|title      |String|   |N |列表元素的标题  |
|公有|description|String|   |N |列表元素的描述内容|

### ListItemMeta Slots
| 平台| 插槽名称| 类型| 必传 | 说明 |
|-----|-----|-----|-----|-----|
| web| avatar | String/Function | N | 头像 |
| web| title | String/Function | N | 标题 |