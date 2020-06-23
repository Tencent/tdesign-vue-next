## Notification 通知

::: demo demos/base 默认
:::

::: demo demos/type 类型
:::

::: demo demos/placement 方位
:::

::: demo demos/offset 偏移（结合属性placement）
:::

::: demo demos/hideClose 隐藏关闭按钮
:::

::: demo demos/size 尺寸
:::

::: demo demos/footer 自定义底部详情
:::

::: demo demos/component 组件式调用
:::

### 引用
#### 全局方法
Tdesign 为 Vue.prototype 添加了全局方法 $notify。因此在 vue instance 中可以采用本页面中的方式调用 NotificationApi。

#### 单独引用
```javascript
import { NotificationApi, Notification } from 'tdesign';
```
此时调用方法为 NotificationApi(options)。我们也为每个 type 定义了各自的方法，如 NotificationApi.success(options)。并且可以调用 NotificationApi.closeAll() 手动关闭所有实例。

### Options
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| title | String | - | N | 通知标题 |
| content | String/Function/Solt(default) | - | N | 消息正文内容 |
| theme | String | - | N | 消息类型 info/success/warning/error |
| placement | String | top-right | N | 消息提示的位置，top-left/top-right/bottom-left/bottom-right |
| offset | Object | - | N | 偏移量（结合属性 placement ）{left: 0,top: 30, bottom, right} |
| duration | Number | 3000 | N | 显示时间，毫秒，置 0 则不会自动关闭 |
| close | Boolean/String/Function/Solt(close) | true | N | 是否显示关闭按钮/自定义关闭图标 |
| icon | String/Function/Solt(icon) | - | N | 自定义图标。当 theme 存在，取默认图标 |
| footer | Function/Solt(footer) | - | N | 自定义底部详情 |
| attach | String/Function | - | N | 指定弹框挂载节点。字符串类型表示DOM选择器（querySelector）；函数需返回 DOM 节点，如：() => document.body | 
| zIndex | Number | 6000 | N | 自定义层级 |
| opened | Function | - | N | 打开动画完成后触发 |
| closed | Function | - | N | 关闭动画完成后触发 |

### Methods 
| 方法名称 | 参数 |  说明 |
| ---- | ---- | ---- | ---- | ---- | 
| close | (instance: Notification) | 关闭指定的 Notification 实例 |
| closeAll | (afterClosed: Function) | 关闭所有 Notification 后, 执行 afterClosed |
```
调用 Notification 或 this.$notify 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
```