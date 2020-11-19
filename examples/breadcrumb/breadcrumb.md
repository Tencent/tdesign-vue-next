## Breadcrumb 面包屑

显示当前页面在系统层级结构的位置，并能返回之前任意层级的页面。

## 何时使用
作为辅助和补充的导航方式，显示当前在内容区域层级结构中的位置，并能向上返回。

## 1. 组件类型
在TDesign中，拥有4种不同形式的面包屑：基础面包屑、带图标的面包屑、自定义分隔符的面包屑和带下拉的面包屑。

### 1.1 基础面包屑
定义：适用于广泛的基础用法，系统拥有超过两级以上的层级结构，用于切换向上任意层级的内容。

::: demo demos/base
:::

### 1.2 带图标的面包屑
定义：可自定义每项内容，统一图标加文字，图标放在文字前面。

::: demo demos/with-icon.vue
:::

### 1.3 自定义分隔符的面包屑
定义：通过 separator 的属性来自定义分隔符，建议用图标而非文本符号。

::: demo demos/separatorSlot
:::

### 1.4 带下拉的面包屑
定义：面包屑支持下拉菜单，带下拉的面包屑分隔符不可用 “ > ” ；

使用场景：面包屑中的下拉，除页面一不建议使用外，其他层级均可下拉，具体可根据业务场景自定义。

::: demo demos/with-arrow.vue
:::

::: demo demos/separatorFunction Function分隔符
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|string|light|否|风格|
|size|string|middle|否|尺寸，大，中（默认），小，可选值为 large/middle/small|
|separator|string/TNode|/|否|分隔符自定义,TNode优先级高于string|

## breadcrumb item

### 属性配置

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|to|string/object|无|否|路由跳转对象，同 vue-router 的 to|
|router|string/object|如果存在vue-router，则默认使用vue-router|否|路由对象|
|replace|boolean|false|否|在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录|
|overlay|dropdown|无|否|下拉框内容|

### 事件

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|click|Function(event)|无|否|点击事件|
