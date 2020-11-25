## List 列表

列表用一个连续的列来显示多行元素，常用于具有相同构成及内容的模块批量展示，可承载多样化的信息内容，从纯文字到复杂的图文组合

### 何时使用
需批量展示具有相同构成及内容的模块时

需展示多样的结构化的信息时，如同时展示图片、文字、操作等信息

### 1.组件类型
### 1.1 基础文字列表
定义：仅包含简单文字的列表

使用场景：对较简单的信息进行陈列时，如操作列表等

::: demo demos/base
:::

### 1.2 多行文字列表
定义：仅包含主要文字及描述性文字的列表

使用场景：对较复杂的，包含多个字段或内容的信息进行展示时

::: demo demos/multiLines
:::

### 1.3 基础图文列表
定义：包含简单图文的列表

使用场景：需使用图片和文字结合展示信息

::: demo demos/imgText
:::

### 1.4 带操作列表
定义：包含图文信息及操作的列表

使用场景：需展示较复杂的信息结构，表格无法满足时，同时需要对所在列进行操作

::: demo demos/actions
:::

::: demo demos/extra 额外内容
:::

::: demo demos/loading 加载
:::

::: demo demos/headerFooter 头部及尾部
:::

::: demo demos/scroll 滚动事件
:::

::: demo demos/size 尺寸
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