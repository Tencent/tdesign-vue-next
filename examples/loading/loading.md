## Loading 加载 
定义：显示和提示页面和区块的加载中状态，出现时有动效。

### 何时使用
- 页面全局处于等待数据加载中，合适的加载动效有助于提升用户体验。

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有助于缓解用户的焦虑。

## 1.组件类型
### 1.1.仅图标加载
定义 - 加载过程中只有图标显示

使用场景 - 该组件为基础组件，适用于打开页面、操作完成后等待页面的全局/局部加载的场景。
::: demo demos/base
:::

### 1.2.仅文字加载
定义 - 加载过程中只有文字显示

使用场景 - 该组件使用于用户对加载没有清晰认知的打开页面、操作完成后等待页面的全局/局部加载的场景。

::: demo demos/indicatorFunc function 加载符
:::

### 1.3. 文字和图标共同显示加载
定义 - 加载过程中有文字和图标共同显示

使用场景 - 该组件使用于特殊场景的情况，文字可根据开发者自行更改的打开页面、操作完成后等待页面的全局/局部加载的场景。

::: demo demos/text
:::

### 大小

::: demo demos/size 
:::

### slot 加载符
::: demo demos/indicatorSlot 
:::

### 有包裹
::: demo demos/wrap 
:::

### 有延时
::: demo demos/delay 
:::

### 全屏加载
::: demo demos/fullscreen 
:::

### 函数方式调用
::: demo demos/service 
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|indicator|TNode|圆圈图标|N|加载指示符（支持function、slot。不支持string）|
|text|TNode|无|N|自定义的加载提示文案|
|loading|boolean|false|Y|是否为加载中状态|
|size|string|medium|N|加载组件大小，包括图标和文字。可选值为 large/medium/small|
|delay|number(毫秒)|0|N|延迟显示加载效果的时间（防止闪烁）|
|fullscreen|boolean|false|N|是否全屏遮罩，遮罩会插入至 body 上。开启全屏加载时，loading必须作为包裹元素|
|preventScrollThrough|boolean|false|N|是否需要锁定屏幕的滚动|
|className|string|无|N|包裹器的自定义类名|
|showOverlay|boolean|true|N|是否需要遮罩层，遮罩层对包裹元素才有效|

### Loading Plugin

该插件已默认引入组件库总包。如果项目要按需加载插件，则需要自行装载该插件，示例代码如下：

```js
import Vue from 'vue';
import { LoadingPlugin } from './loading';
const Plugin = {
  install: (Vue) => {
    Vue.prototype.$loading = LoadingPlugin;
  }
};
Vue.use(Plugin);
```

* 调用方式：this.$loading(options)
* options的参数同组件方式调用时的参数，但只支持全屏模式的加载，fullscreen为true，不可配置。

options可配置参数如下：

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|indicator|TNode|圆圈图标|N|加载指示符（支持function、slot。不支持string）|
|text|TNode|无|N|自定义的加载提示文案|
|loading|boolean|false|Y|是否为加载中状态|
|size|string|medium|N|加载组件大小，包括图标和文字。可选值为 large/medium/small|
|delay|number(毫秒)|0|N|延迟显示加载效果的时间（防止闪烁）|
|preventScrollThrough|boolean|false|N|是否需要锁定屏幕的滚动|
|className|string|无|N|包裹器的自定义类名|
|showOverlay|boolean|true|N|是否需要遮罩层，遮罩层对包裹元素才有效|


