 ## Dropdown 
 
用于承载过多的操作集合，通过下拉拓展的形式，收纳更多的操作。

### 何时使用
在有限的空间内，需要承载多种操作，并且不影响页面结构

## 1.组件类型
### 1.1.文字下拉菜单
定义：文字按钮触发下拉菜单

使用场景：空间极度受限的收纳操作场景，仅用文字进行操作收纳，一般用于表格内详情操作的收纳

::: demo demos/text
:::


### 1.2.按钮下拉菜单
定义：普通按钮触发下拉菜单

使用场景：常用操作收纳场景，可跟其他按钮保持统一样式

::: demo demos/base
:::

### 1.3.带分割线下拉菜单
定义：通过分割线区分不同的下拉菜单操作

使用场景：常用于需要区分不同操作结果的场景

::: demo demos/status
:::

### 1.4.多层下拉菜单
定义：带逻辑层级关系的操作下拉菜单

使用场景：需要收纳多层逻辑的操作场景

::: demo demos/submenu
:::

::: demo demos/disabled disabled
:::

::: demo demos/custom 自定义其他属性
:::

::: demo demos/long 高尺寸
:::

::: demo demos/event click、visibleChange事件
:::

### 属性配置

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|options|Array|[]|Y|item格式参考下面备注|
|hideAfterItemClick|Boolean|true|N|点击选项后是否自动隐藏弹窗|
|disabled|Boolean|false|N|用于是否禁用显示dropdown|
|placement|String|'bottomLeft'|N|弹窗定位方式，可选值参考**popup**|
|trigger|String|'hover'|N|触发方式，可选值参考**popup**|
|maxColumnHeight|Number|300|N|弹窗最大高度px（超过显示滚动条）|
|minItemWidth|Number|10|N|选项最小宽度px|
|maxItemWidth|Number|100|N|选项最大宽度px（超过显示省略号）|

```json
// options数组中每一个item对象支持字段
{
  disabled: boolean,
  id: string | number,
  text: string,
  iconName: string,
  topSplit: boolean,
  children: OptionItem[],
}
```

### 事件event

| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|visibleChange|visible|弹窗显示或隐藏时触发|
|click|{id,path,text}|点击选项时触发，获取点击对象的相关属性|
