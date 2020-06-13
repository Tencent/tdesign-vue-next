## Notification 通知

::: demo demos/base 默认
:::

::: demo demos/type 类型
:::

::: demo demos/state 状态
:::

::: demo demos/size 尺寸
:::

::: demo demos/fn 函数调用
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| visible | Boolean | false| N | 用于控制消息是否显示（结合事件 visible-change 组合形成 v-model） |
| title | String | - | N | 通知标题 |
| content | String/Function/Solt(default) | - | N | 消息正文内容 |
| theme | String | info | N | 消息类型 info/success/warning/error |
| placement | String | top-right | N | 消息提示的位置，top-left/top-right/bottom-left/bottom-right |
| offset | Object | - | N | 偏移量（结合属性placement）{left: 0,top: 30, bottom, right} |
| duration | Number | 3000 | N | 显示时间，毫秒 |
| showClose | Boolean/String/Function/Solt(close) | true | N | 是否显示关闭按钮/用户可自定义关闭图标 |
| icon | String/Function/Solt(icon) | - | N | 自定义图标。当theme存在，取默认图标 |
| footer | Function/Solt(footer) | - | N | 自定义底部actions |
| attach | String/Function | body | N | 指定弹框挂载节点。字符串类型表示DOM选择器（querySelector）；函数需返回 DOM 节点，如：() => document.body | 
| zIndex | Number | 5000 | N | 定义层级 |

### 事件
| 事件名称 | 参数 |  说明 |
| ---- | ---- | ---- | ---- | ---- | 
| opened | - | 打开动画完成后触发 |
| closed | - | 关闭动画完成后触发 |
| visibleChange | (visible: boolean) | 用于控制消息是否显示（结合属性 visible，可形成 v-model 结构） |