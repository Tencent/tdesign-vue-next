:: BASE_DOC ::

### 引用
#### 全局方法
Tdesign 为 Vue.prototype 添加了全局方法 $notify。因此在 vue instance 中可以采用本页面中的方式调用 NotificationPlugin。

#### 单独引用
```javascript
import { NotificationPlugin, Notification } from 'tdesign';
```
此时调用方法为 NotificationPlugin(options)。我们也为每个 type 定义了各自的方法，如 NotificationPlugin.success(options)。并且可以调用 NotificationPlugin.closeAll() 手动关闭所有实例。

### Notification Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| title | String | - | N | 通知标题 |
| default | String/Function/Slot | - | N | 自定义内容 |
| theme | String | - | N | 消息类型 info/success/warning/error |
| icon | Function/Solt(icon) | - | N | 自定义图标。当 theme 存在，取默认图标 |
| closeBtn | Boolean/String/Function/Slot(closeBtn) | true | N | 是否显示关闭按钮/自定义关闭图标 |
| footer | Function/Solt(footer) | - | N | 自定义底部详情 |
| duration | Number | 0 | N | 显示时间，毫秒，置 0 则不会自动关闭 |

### Notification Events
| 平台 | 事件名称 | 参数 |  说明 |
| ---- | ---- | ---- | ---- | ---- | ---- | 
| PC | click-close-btn | (e, instance) :（事件，组件实例） | 内部仅触发事件，不处理关闭 |
| 公有 | durationEnd | (instance) :（组件实例） | 内部仅触发事件，不处理关闭 |
| 公有 | opened | - | 打开动画完成后触发（PC 无动画，暂不实现）|
| 公有 | closed | - | 关闭动画完成后触发（PC 无动画，暂不实现）|

### Notification Plugin
 * this.$notify(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$notify.info(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$notify.success(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$notify.warning(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$notify.error(options) // 返回值 `Promise<instance: 组件实例>`
 * const notification = this.$notify(options); notification.then(instance => instance.close()) // 关闭 Notification 实例
 * const notification = this.$notify(options); this.$notify.close(notification) // 关闭 Notification 实例
 * this.$notify.closeAll() // 关闭所有 Notification 实例

options 参数如下: <br/><br/>

| 参数 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| title | String | - | N | 通知标题 |
| content | String/Function/Solt(default) | - | N | 消息正文内容 |
| theme | String | - | N | 消息类型 info/success/warning/error |
| placement | String | top-right | N | 消息提示的位置，top-left/top-right/bottom-left/bottom-right |
| offset | Object | - | N | 偏移量（结合属性 placement ）{left: 0,top: 30, bottom, right} |
| duration | Number | 3000 | N | 显示时间，毫秒，置 0 则不会自动关闭 |
| closeBtn | Boolean/String/Function/Solt(close) | true | N | 是否显示关闭按钮/自定义关闭图标 |
| icon | String/Function/Solt(icon) | - | N | 自定义图标。当 theme 存在，取默认图标 |
| footer | Function/Solt(footer) | - | N | 自定义底部详情 |
| attach | String/Function | - | N | 指定弹框挂载节点。字符串类型表示DOM选择器（querySelector）；函数需返回 DOM 节点，如：() => document.body | 
| zIndex | Number | 6000 | N | 自定义层级 |

<br/>所有参数 Function 优先级大于 Slot。
