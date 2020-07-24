## Message 

::: demo demos/type 类型
:::

::: demo demos/close 可关闭
:::

::: demo demos/plugin 函数式调用
:::

::: demo demos/toggle 自由控制关闭和打开
:::

::: demo demos/closeAll 一次性关闭所有消息
:::

::: demo demos/placement 不同位置
:::

::: demo demos/offset 偏移量
:::


### Message Props

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | info | N | 消息类型 info/success/warning/error/question/loading |
| duration | Number | - | N | 显示时间，毫秒，等于 0 表示一直显示，不消失。 |
| closeBtn | Boolean/String/Function/Slot | false | N | 是否显示关闭按钮，默认不显示。如果是 string 类型，“关闭”。TNode 为自定义关闭按钮形态。|
| icon | Boolean/Function/Slot | true | N | 图标，可自定义，值为 false 表示不显示默认图标。 |
| default | String/Function/Slot | - | N | 自定义内容 |

### Message Events
| 平台 | 事件名称 | 参数 |  说明 |
| ---- | ---- | ---- | ---- | ---- | ---- | 
| PC | click-close-btn | (e, instance) :（事件，组件实例） | 内部仅触发事件，不处理关闭 |
| 公有 | durationEnd | (instance) :（组件实例） | 内部仅触发事件，不处理关闭 |
| 公有 | opened | - | 打开动画完成后触发（PC 无动画，暂不实现）|
| 公有 | closed | - | 关闭动画完成后触发（PC 无动画，暂不实现）|


### Message Plugin

该插件已默认引入组件库总包。如果项目要按需加载插件，则需要自行装载该插件，示例代码如下，

```js
import Vue from 'vue';
import { MessagePlugin } from './message';
const Plugin = {
  install: (Vue) => {
    Vue.prototype.$message = MessagePlugin;
  }
};
Vue.use(Plugin);
```

 * this.$message(theme, options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message(theme, textMsg) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(textMsg) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(textMsg, 3000) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.success(options) // 返回值 `Promise<instance: 组件实例>`
 * const msg = this.$message.success(options); this.$message.close(msg); // 关闭信息

所有参数 Function 优先级大于 Slot。

| 参数 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | info | N | 消息类型 info/success/warning/error/question/loading |
| duration | Number | - | N | 显示时间，毫秒，等于 0 表示一直显示，不消失。 |
| closeBtn | Boolean/String/Function/Slot | false | N | 是否显示关闭按钮，默认不显示。如果是 string 类型，“关闭”。TNode 为自定义关闭按钮形态。|
| icon | Boolean/Function/Slot | true | N | 图标，可自定义，值为 false 表示不显示默认图标。 |
| content | String/Function/Slot | - | N | 自定义内容（别名：default） |
| placement | string | top | N | 消息提示的位置，9个：center/left/left-top/top/right-top/right/right-bottom/bottom/left-bottom |
| offset | object | - | N | 偏移量（结合属性placement）, 如： {left: '30px'}，值为String类型 |
| zIndex | number | 6000 | N | 定位层级 |
| attach | function/string | body | N | 指定弹框挂载节点。字符串类型表示DOM选择器（querySelector）；函数需返回 DOM 节点，如：() => document.body |
