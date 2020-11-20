## Notification 通知

轻量级的全局消息提示和确认机制，出现和消失时需要有缓动动画。

## 何时使用

需要提醒用户来自系统的消息，且不打断用户

带有解释描述的提醒内容

需要用户进行相关交互时（如：确认操作等）

## 1.组件类型

### 1.1 基础的消息通知

基础消息通知，可手动关闭也可自动退出。

::: demo demos/base 基础消息通知
:::

### 1.2 带图标的消息通知

带图标的消息通知提供两种情况：普通消息通知和重要消息通知（如：系统错误等）。

::: demo demos/info 带图标消息通知
:::

### 1.3 带操作的消息通知


带有操作的消息通知为用户提供下一步行动点，在消息提示框中进行简要快捷的交互。

<font color=#7A869A>（图例：消息通知中常常带有描述信息，若描述信息较长无法展示，则可以使用链接的形式点击跳转。）</font>


::: demo demos/operation1 带操作消息通知
:::


<font color=#7A869A>（图例：几种操作样式的处理）</font>

::: demo demos/operation2 带操作消息通知
:::


## 2.组件样式

### 2.1.尺寸

具体以视觉规范为准（大，中，小）

### 2.2.颜色

具体以视觉规范为准

### 2.3.标注

具体以视觉规范为准


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