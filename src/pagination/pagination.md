## Pagination 分页

::: demo demos/base 基础用法
:::

::: demo demos/customizable 可跳转和可设置每页大小
:::

::: demo demos/simple 简洁模式
:::

::: demo demos/disabled 禁用组件
:::

::: demo demos/size 组件大小
:::

### 属性配置

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|current/v-model|Number|1|Y| 当前页面|
|theme|Enum|default|N|显示模式 'default'/'simple' |
|size|String|default|N|分页组件尺寸 'default'/'small' |
|total|Number|0|N|数据总数 |
|pageSize|Number|10|N|数据总数 |
|showSizer|Boolean|false|N|显示分页大小控制 |
|showJumper|Boolean|false|N|显示页面跳转输入框 |
|showTotal|Boolean|false|N|显示总数，传入 totalContent 后，默认为true |
|disabled|Boolean|false|N|禁用分页功能|
|totalContent|String/Function/slot|共XXX项数据|N|使用返回值作为内容，可用于渲染来自列表的已选中数量|
|pageSizeOption|Array|[5,10,20,50]|N|分页大小|

## 事件配置

| 事件 | 说明 | 参数 |
|-----|-----|-----|
| change | 页码index变换回调|(curr, { curr, prev, pageSize })=> {}|
|pageSizeChange | 页码index变换回调|(pageSize, { curr, prev, pageSize }) => {} |
