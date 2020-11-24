## Message 

对用户的操作作出轻量的全局反馈。

### 何时使用

在完结某个独立页面后的反馈（如：付款成功页面）

在一个操作区域或一系列操作完成之后的总体反馈（如：提交分步骤表单中的某个表单）

在某个操作点之后的反馈（如：针对信息复制操作的结果反馈）


### 1.组件类型

常规全局提示包含：普通信息、成功信息、警示信息、错误信息、帮助信息和loading


（1）提示信息

::: demo demos/info 提示信息
:::


（2）成功信息


::: demo demos/success 成功信息
:::


（3）警示信息

::: demo demos/alarm 警示信息
:::

（4）错误信息

::: demo demos/error 错误信息
:::


（5）帮助信息

提供简短的帮助信息提示

::: demo demos/question 帮助信息
:::

（6）loading

提供全局的加载过程反馈，需要提供加载结果：成功、失败

::: demo demos/loading Loading
:::

### 2.组件样式

### 2.1 尺寸

1.常规全局提示宽度自适应不做限制：

![avatar](https://0729iwiki-75822.gzc.vod.tencent-cloud.com/e4aef1d5965c5c2271b603490c1aee9e.jpg)

2.带关闭操作全局提示最小宽度400px：

![avatar](https://0729iwiki-75822.gzc.vod.tencent-cloud.com/1a198006a84d2b254e6f61a124ca1009.jpg)

### 2.2 颜色

### 2.3 形状

### Message Props

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | info | N | 消息类型 info/success/warning/error/question/loading |
| duration | Number | - | N | 显示时间，毫秒，等于 0 表示一直显示，不消失。 |
| closeBtn | Boolean/String/Function/Slot | false | N | 是否显示关闭按钮，默认不显示。如果是 string 类型，“关闭”。TNode 为自定义关闭按钮形态。|
| icon | Boolean/Function/Slot | true | N | 图标，可自定义，值为 false 表示不显示默认图标。 |
| content | String/Function/Slot(default) | - | N | 自定义内容 |

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

 * this.$message(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(textMsg) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(textMsg, 3000) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.info(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.success(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.warning(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.error(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.question(options) // 返回值 `Promise<instance: 组件实例>`
 * this.$message.loading(options) // 返回值 `Promise<instance: 组件实例>`
 * const msg = this.$message.success(options); this.$message.close(msg); // 关闭信息

options 参数如下: <br/><br/>

| 参数 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | info | N | 消息类型 info/success/warning/error/question/loading |
| duration | Number | - | N | 显示时间，毫秒，等于 0 表示一直显示，不消失。 |
| closeBtn | Boolean/String/Function/Slot | false | N | 是否显示关闭按钮，默认不显示。如果是 string 类型，“关闭”。TNode 为自定义关闭按钮形态。|
| icon | Boolean/Function/Slot | true | N | 图标，可自定义，值为 false 表示不显示默认图标。 |
| content | String/Function/Slot | - | N | 自定义内容（别名：default） |
| placement | string | top | N | 消息提示的位置，9个：center/top/left/right/bottom/top-left/top-right/bottom-left/bottom-right |
| offset | object | - | N | 偏移量（结合属性placement）, 如： {left: '30px'}，值为String类型 |
| zIndex | number | 6000 | N | 定位层级 |
| attach | function/string | body | N | 指定弹框挂载节点。字符串类型表示DOM选择器（querySelector）；函数需返回 DOM 节点，如：() => document.body |

<br/>所有参数 Function 优先级大于 Slot。